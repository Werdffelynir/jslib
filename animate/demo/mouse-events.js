(function(){

    var
        an = new Animate({
            selector: '#canvas',
            width: '600',
            height: '400',
            fps: 12,
            onFrame: function (ctx, i) {
                app.onFrameEvent.call(app, ctx, i);
            },
            onClick: function (event, point) {
                app.onClickEvent.call(app, event, point);
            },
            onMousemove: function (event, point) {
                app.onMousemoveEvent.call(app, event, point);
            }
        }),

        app = {

            // frame iterator
            i: null,

            // canvas context
            /** @type CanvasRenderingContext2D */
            ctx: null,

            pointClick: {x:0,y:0},
            pointMove: {x:0,y:0},

            onFrameEvent: function (ctx, i) {
                this.ctx = ctx;
                this.i = i;

                this.writeIteration(this.i);
                this.writeMousemovePosition(this.pointMove);
                if (this.pointClick.x > 0)
                    this.drawMouseclickObject(this.ctx, this.pointClick);
            },
            onClickEvent: function (event, point) {
                this.pointClick = point;
            },
            onMousemoveEvent: function (event, point) {
                this.pointMove = point;
            },

            drawMouseclickObject: an.Clip({},function (ctx, point) {
                /** @type CanvasRenderingContext2D */
                ctx = ctx;
                this.x = point.x;
                this.y = point.y;

                ctx.save();

                ctx.beginPath();
                ctx.font = '10px sans, sans-serif';
                ctx.textBaseline = 'middle';
                ctx.fillText('(X:' +this.x+ ' Y:' +this.y+ ')', this.x + 15, this.y);
                ctx.closePath();

                ctx.beginPath();
                ctx.lineWidth = 5;
                ctx.strokeStyle = '#CDABC6';
                ctx.fillStyle = '#A06F96';
                ctx.arc(this.x, this.y, 10,  0, Math.PI*2, true);
                ctx.fill();
                ctx.stroke();
                ctx.closePath();

                ctx.restore();
            }),

            writeMousemovePosition: function (point) {
                this.ctx.save();

                this.ctx.beginPath();
                this.ctx.font = '12px sans, sans-serif';
                this.ctx.textBaseline = 'middle';
                this.ctx.fillText('move: X' +point.x+ ' Y:' +point.y, 10, 10);
                this.ctx.closePath();

                this.ctx.restore();
            },

            writeIteration: function (iter) {
                this.ctx.save();

                this.ctx.beginPath();
                this.ctx.font = '12px sans, sans-serif';
                this.ctx.textBaseline = 'middle';
                this.ctx.textAlign = 'right';
                this.ctx.fillText('iteration: ' + iter, an.width - 10, 10);
                this.ctx.closePath();

                this.ctx.restore();
            }
        };


    an.start();
})();