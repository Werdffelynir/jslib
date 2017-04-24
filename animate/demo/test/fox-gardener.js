(function () {

    var node = {
        menu: NSA.queryAll('#menu'),
        page: NSA.query('#page'),
        desc: NSA.query('#description'),
        move: NSA.query('#move'),
        after: NSA.query('#after')
    };

    var an = new Animate({
        selector: '#canvas',
        width: 400,
        height: 200,
        fps: 60
    });

    var Gm = {
        score: 0,
        apples: {},
        applesSpeed: 1.5,
        npc: {},
        hero: {}
    };

    // add items to Gm.apples
    Gm.apples = new Array(20);
    for (var i = 0; i < Gm.apples.length; i++) {
        Gm.apples[i] = an.createClip({
                x: an.random(0, an.width),
                y: an.random(-10, -500)
            },
            function (ctx, i) {

                this.y = this.y > an.height ? an.random(-10, -500) : this.y + Gm.applesSpeed;

                //an.graphic.circle(this.x, this.y, 10, '#f00', true);

                ctx.beginPath();
                ctx.fillStyle = '#f00';
                ctx.rect(this.x, this.y, 20, 20);
                ctx.fill();
                ctx.stroke();
                ctx.closePath();

                if (ctx.isPointInPath(Gm.hero.stat.x, Gm.hero.stat.y)) {
                    Gm.score += 1;
                    this.y = an.random(-10, -500);
                }

                return this;
            })
    }

    Gm.hero.stat = {
        x: 100,
        y: an.height - 15,
        speed: 2.5
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


    // global text settings
    an.text.font('bold 14px/14px sans');

    an.frame(function(ctx, i) {
        /** @type CanvasRenderingContext2D */
        ctx = ctx;

        // add score text
        an.text.write(0, 0, 'Score: ' + Gm.score);

        Gm.apples.map(function (apple) {
            apple(ctx, i);
        });

        Gm.hero.mc(ctx, i);

        // levels
        if (Gm.score >= 10) {
            an.stop();
            an.clear();
            an.text.write(an.width/2 - 50, an.height/2 - 20, 'Game Over', 'blue');
            an.text.write(an.width/2 - 50, an.height/2, 'Your score ' + Gm.score, 'red');
        } else
        if (Gm.score !== 0 && Gm.applesSpeedCache !== Gm.applesSpeed && Gm.score % 2 == 0) {
            Gm.applesSpeedCache = Gm.applesSpeed += 1;
        }

        // console.log(ctx, i);
        // if (i > 100) an.stop();
    });

    // start
    an.start();
})();