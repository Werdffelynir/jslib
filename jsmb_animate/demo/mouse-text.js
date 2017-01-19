(function(){

    var
        an = new Animate({
            selector: '#canvas',
            width: '600',
            height: '400',
            fps: 30,
            onFrame: onFrameEvent,
            onClick: onClickEvent,
            onMousemove: onMousemoveEvent
        }),

        app = {
            text_click: '',
            text_move: '',

            clipBox: an.clip({
                degrees: 0
            }, function(ctx, i){
                /**
                 * @type CanvasRenderingContext2D
                 */
                ctx = ctx;
                this.degrees = (this.degrees > 360) ? 0 : this.degrees + 1;

                ctx.save();
                ctx.rotate(Animate.Util.degreesToRadians(this.degrees));
                ctx.translate(-25, -25);
                an.graphic.rectRound(0,0, 50, 50);
                ctx.restore();
            })

        };

    function onFrameEvent(ctx, i){
        an.text.font = '16px sans';
        an.text.write(100, 100, ' ITER: ' +i+ ' ' + app.text_move + ' ' +  app.text_click);

        ctx.save();
        ctx.translate(300, 150);
        app.clipBox(ctx, i);
        ctx.restore();
    }

    function onClickEvent(event, point) {
        app.text_click = 'click [X: ' + point.x + '  Y: ' + point.y + ']';
    }

    function onMousemoveEvent(event, point) {
        app.text_move = 'move [X: ' + point.x + '  Y: ' + point.y + '] ';
    }

    an.start();
})();