(function(){

    var
        an = new Animate({
            selector: '#canvas',
            width: '600',
            height: '400',
            fps: 0,
            onFrame: function (ctx, i) {
                app.init.call(app, ctx, i);
            }
        }),

        app = {

            // frame iterator
            i: null,

            // canvas context
            /** @type CanvasRenderingContext2D */
            ctx: null,

            // instead of constructor
            init : function (ctx, i) {
                this.ctx = ctx;
                this.i = i;

                console.log('iteration: ' + this.i);

                // default config
                this.ctx.font = '18px sans, sans-serif';
                this.ctx.textAlign = 'left';
                this.ctx.textBaseline = 'top';

                this.drawPanel();
                this.writePanel();

                this.writeTitle();
                this.writeArticle();
            },

            drawPanel : function () {
                this.ctx.save();
                this.ctx.fillStyle = '#89C1D0';
                this.ctx.fillRect(0, 0, an.width, 30);

                this.ctx.fillStyle = '#5F767C';
                this.ctx.fillRect(0, 30, an.width, 2);
                this.ctx.restore();
            },

            writePanel : function () {
                this.ctx.save();
                this.ctx.fillStyle = '#000';

                this.ctx.fillText('PANEL.', 5, 5);
                this.ctx.fillText('Write text simple', 80, 5);
                this.ctx.restore();
            },

            writeTitle : function () {
                this.ctx.save();
                this.ctx.font = '42px sans, sans-serif';
                this.ctx.textAlign = 'center';

                this.ctx.lineWidth = 3;
                this.ctx.strokeStyle = '#C20008';
                this.ctx.fillStyle = '#EEEC47';

                this.ctx.strokeText('Canvas Power', an.width/2, an.height/2 - 50);
                this.ctx.fillText('Canvas Power', an.width/2, an.height/2 - 50);
                this.ctx.restore();
            },

            writeArticle : function () {
                this.ctx.save();
                this.ctx.textAlign = 'center';

                this.ctx.fillStyle = '#C20008';
                this.ctx.fillText('Lorem ipsum dolor sit amet, consectetur adipisicing elit.', an.width/2, an.height/2);
                this.ctx.restore();
            }
        };

    an.start();
})();