(function () {
    var node = {
        menu: NSA.queryAll('#menu'),
        page: NSA.query('#page'),
        desc: NSA.query('#desc'),
        move: NSA.query('#move'),
        after: NSA.query('#after')
    };

    var an = new Animate({
        selector: '#canvas',
        width: 800,
        height: 400,
        fps: 60
    });

    an.text.font('bold 18px/18px sans');
    an.text.color('#FFFFFF');
    // * * * * * * * * * * * * * * * * * * * * * * * * *

    var Gm = {
        mouse:false
    };
    Gm.grid_cache = false;

    Gm.grid = function (px, lw, ss) {
        /** @type CanvasRenderingContext2D */
        var ctx = an.getContext();

        if (Gm.grid_cache) {

            ctx.putImageData(Gm.grid_cache, 0, 0);

        } else {

            var i, j,
                w = an.getWidth(),
                h = an.getHeight();

            ctx.beginPath();

            for (i = 0; i < w; i += px) {
                ctx.moveTo(i, 0);
                ctx.lineTo(i, h);
            }
            for (i = 0; i < h; i += px) {
                ctx.moveTo(0, i);
                ctx.lineTo(w, i);
            }

            ctx.lineWidth = lw || 0.5;
            ctx.strokeStyle = ss || '#efefef';
            ctx.stroke();
            ctx.closePath();

            Gm.grid_cache = ctx.getImageData(0, 0, w, h);
        }
    };

    an.frame(function(ctx, i) {
        /** @type CanvasRenderingContext2D */
        ctx = ctx;
        Gm.mouse = an.mouseMove();

        Gm.grid(50, 0.1, '#FFF');
        Gm.space(ctx, i);

    });

    Gm.space = function (ctx, frame) {
        an.backgroundColor('#03020f');







    };

    // start
    an.start();

    // * Оперделения нажатие кнопок мыши
    // * Отключения контекстного меню
    // * * * * * * * * * * * * * * * * * * * * * * * *
    document.addEventListener('mousedown', function(event) {
        var which = [];
        which[1] = 'Left Mouse button pressed.';
        which[2] = 'Middle Mouse button pressed.';
        which[3] = 'Right Mouse button pressed.';

        console.log('Which: ' + (which[event.which] ? which[event.which] : 'You have a strange Mouse!'), event);
        return false;
    });
    document.addEventListener('contextmenu', function(event) {
        console.log('Context menu is disabled');
        event.preventDefault();
    }, false);

})();




/*        if (an.keyPress('KeyD')) {
 this.rotate += 0.005;
 if (this.rotate > 0.3) this.rotate = 0.3;

 this.x += (this.dx += this.acceleration);

 }

 else if (an.keyPress('KeyA')) {
 this.rotate += -0.005;
 if (this.rotate < -0.3) this.rotate = -0.3;

 this.x -= (this.dx += this.acceleration);

 }
 else {
 this.dx = 0.001;
 }*/