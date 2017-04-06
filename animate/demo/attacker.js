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
        width: 600,
        height: 400,
        fps: 1
    });

    // * * * * * * * * * * * * * * * * * * * * * * * * *
    var Game = {
        name: 'Attacker',
        mouse: false
    };

    Game.button = function (lable, position, callback) {
        var x = position[0] * 10,
            y = position[1] * 10,
            w = 100,
            h = 20,
            /** @type CanvasRenderingContext2D */
            ctx = an.getContext();

        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.rect(x, y, w, h);

        if (Game.mouse && an.hitTestPoint(Game.mouse)) {
            if (typeof callback === 'function') callback.call(null);
            ctx.fillStyle = '#cadad8';
        } else
            ctx.fillStyle = '#ddeeeb';

        ctx.fill();

        ctx.strokeStyle = '#737c7b';
        ctx.stroke();

        ctx.font = 'bold 12px/12px sans';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#4c4c4c';
        ctx.fillText(lable, x+w/2, y+h/2);
        ctx.closePath();
    };

    Game.grid_cache = false;
    Game.grid = function (px, lw, ss) {
        /** @type CanvasRenderingContext2D */
        var ctx = an.getContext();

        if (Game.grid_cache) {

            ctx.putImageData(Game.grid_cache, 0, 0);

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

            Game.grid_cache = ctx.getImageData(0, 0, w, h);
        }
    };


    Game.createButter = function (x, y, r, c) {

        var prop = {
            x: x || 100,
            y: y || 100,
            radius: r || 25
        };

        var mc = an.createClip(prop, function (ctx, i) {
            an.graphic.circle(this.x, this.y, this.radius, c || '#ff0000', true);
            return this;
        });

        return mc
    };
    Game.butterDark = Game.createButter(100, 100, 10, '#7f7f7f');
    Game.butterYellow = Game.createButter(100, 200, 15, '#eee400');

    Game.addBall = function () {

        var butD = Game.butterDark();
        var butY = Game.butterYellow();

        butD.x += 5;
        butY.x += 7;



        // ball.x += 100;
        // ball.y = 200;
    };

    // * * * * * * * * * * * * * * * * * * * * * * * * *

    an.frame(function(ctx, i) {
        /** @type CanvasRenderingContext2D */
        ctx = ctx;
        Game.mouse = an.mousePress();
        Game.grid(50, 0.2, 'rgba(0,0,0,0.2)');

        Game.button('START', [1, 1]);

        Game.addBall();

        //var ball = Game.ball()();
        //ball.x ++;

        // Game.button('Attack body', [1, 4]);
        // Game.button('Attack legs', [1, 7]);
        //
        // Game.button('Block head', [20, 1]);
        // Game.button('Block body', [20, 4]);
        // Game.button('Block legs', [20, 7]);




        // ctx.beginPath();
        // ctx.fillStyle = 'red';
        // ctx.rect(10, 50, 100, 20);
        // ctx.fill();
        //
        // if (mouse && an.hitTestPoint(mouse)) {
        //     console.log('btn2');
        // }


        // console.log(ctx, i);
        //
        // if (i > 100)
        //     an.stop();
    });

    // start
    an.start();
})();