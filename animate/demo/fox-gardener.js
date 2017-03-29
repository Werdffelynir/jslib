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
        fps: 12
    });

    var Gm = {
        npc: {}, // Non-Player Character
        hero: {},
    };



    Gm.hero.stat = {
        x: 100,
        y: an.height - 15,
        speed: 2
    };
    Gm.hero.mc = an.createClip(Gm.hero.stat, function (ctx, i) {
        /** @type CanvasRenderingContext2D */
        ctx = ctx;


        if (an.keyPress('ArrowLeft')) {
            this.x -= this.speed;
        }
        if (an.keyPress('ArrowRight')) {
            this.x += this.speed;
        }

        ctx.fillStyle = '#ccc';
        ctx.fillRect(this.x, this.y, 10, 10);

        // вернуть Gm.hero.stat для возможности манипуляции
        return this;
    });
    // * * * * * * * * * * * * * * * * * * * * * * * * *

    an.frame(function(ctx, i) {
        /** @type CanvasRenderingContext2D */
        ctx = ctx;


        Gm.hero.mc(ctx, i);

        // console.log(ctx, i);
        // if (i > 100) an.stop();
    });

    // start
    an.start();
})();