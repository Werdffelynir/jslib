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
        fps: 30
    });

    // * * * * * * * * * * * * * * * * * * * * * * * * *
    var Game = {
        name: 'Attacker',
        mouse: false
    };
    Game.button = function (lable, position, callback) {
        /** @type CanvasRenderingContext2D */
        var x = position[0] * 10,
            y = position[1] * 10,
            ctx = an.getContext();

        ctx.beginPath();
        ctx.rect(x, y, 100, 20);

        if (Game.mouse && an.hitTestPoint(Game.mouse)) {
            if (typeof callback === 'function')
                callback.call(null);
            ctx.fillStyle = '#b40c00';
        } else
            ctx.fillStyle = '#ee0f00';

        ctx.fill();

        ctx.font = '12px/16px sans';
        ctx.textBaseline = 'top';
        ctx.fillStyle = '#4c4c4c';
        ctx.fillText(lable, x+3, y+3);

    };
    // * * * * * * * * * * * * * * * * * * * * * * * * *

    an.frame(function(ctx, i) {
        /** @type CanvasRenderingContext2D */
        ctx = ctx;
        Game.mouse = an.mousePress();

        Game.button('Attack head', [1, 1]);
        Game.button('Attack body', [1, 4]);
        Game.button('Attack legs', [1, 7]);

        Game.button('Block head', [20, 1]);
        Game.button('Block body', [20, 4]);
        Game.button('Block legs', [20, 7]);





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