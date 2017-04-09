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
        fps: 30
    });

    // * * * * * * * * * * * * * * * * * * * * * * * * *

    var Gm = {
        mouse:false
    };

    // {angle, x, y, dx, dy}
    Gm.bullets = [];
    Gm.bulletRemove = function (b, i) {
        if (b.x < -100 || b.x > an.width + 100 ||
            b.y < -100 || b.y > an.height + 100 ) delete Gm.bullets[i];
    };



    Gm.shut_last = 0;
    Gm.shut = function (ctx, i, mouse, calc, heros) {
        // shut limit 1 in 100 iteration
        if (Gm.shut_last < i) {
            Gm.shut_last = i  + 5;

            var b = an.createMovieClip({
                x: heros.x + calc.x * 90,
                y: heros.y + calc.y * 90,
                dx: calc.x,
                dy: calc.y,
                speed: 10,
                rotate: calc.angle
            }, function () {
                an.graphic.rect(-3, -3, 20, 6, '#A00');
                this.x += this.dx * this.speed;
                this.y += this.dy * this.speed;
            });

            Gm.bullets.push(b);
        }
    };



    Gm.mcHeros = an.createMovieClip({
        x: an.width / 2,
        y: an.height - 15,
        width: 80,
        height: 10,
        rotate: 0,
        calc: {}
    }, function (ctx, i) {
        an.graphic.rect(-5, -5, this.width, this.height, '#3a363f');
        an.graphic.rect(this.width - 6, -10, 20, this.height+10, '#242127');
        an.graphic.circle(0, 0, 40, '#61587a', true);

        if (Gm.mouse) {
            this.calc = an.calculateAngle({x:this.x, y:this.y}, Gm.mouse);
            this.rotate = this.calc.angle;
        }
    });
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
        Gm.grid(50, 0.5);

        var heros = Gm.mcHeros();
        Gm.mouse = an.mousePress();

        if (Gm.mouse || an.keyPress('Space')) {
            Gm.shut(ctx, i, Gm.mouse, heros.calc, {x:heros.x, y:heros.y});
        }

        var _ib;
        for (_ib = 0; _ib < Gm.bullets.length; _ib ++) {
            if (Gm.bullets[_ib]) {
                var b = Gm.bullets[_ib].call(null, ctx, i);
                Gm.bulletRemove(b, _ib);
            }
        }

        if (an.keyPress('KeyA')) {
            heros.x -= 5;
        }
        if (an.keyPress('KeyD')) {
            heros.x += 5;
        }
        if (an.keyPress('KeyW')) {
            heros.y -= 5;
        }
        if (an.keyPress('KeyS')) {
            heros.y += 5;
        }





       // console.log(Gm.bullets, i);

        // her.x = 100;
        // her.y = 100;



        // console.log(ctx, i);
        //
        // if (i > 100)
        //     an.stop();
    });



    // start
    an.start();

/*    function getAngle(p1, p2) {
        var xDiff = p2.x - p1.x;
        var yDiff = p2.y - p1.y;
        return Math.atan2(yDiff, xDiff);

    }
    function calculateAngle(p1, p2) {
        var xDiff = p2.x - p1.x;
        var yDiff = p2.y - p1.y;
        var angle = Math.atan2(yDiff, xDiff);
        return {
            angle: angle,
            x: Math.cos(angle),
            y: Math.sin(angle)
        };
    }
    function anglePoints(p1, p2, step) {
        var xDiff = p2.x - p1.x; //(p2.x > p1.x) ? p2.x - p1.x : p1.x - p2.x;
        var yDiff = p2.y - p1.y; //(p2.y > p1.y) ? p2.y - p1.y : p1.y - p2.y;
        var angle = Math.atan2(yDiff, xDiff);
        return {
            x: (step || 3) * Math.cos(angle),
            y: (step || 3) * Math.sin(angle)
        };
    }*/
})();