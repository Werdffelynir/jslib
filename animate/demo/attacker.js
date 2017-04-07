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
        fps: 60
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

    Game.createButter = function (x, y, r, c) {

        var prop = {
            x: x || 100,
            y: y || 100,
            rwx: an.random(100, 1000)/200,
            rwy: an.random(100, 1000)/200,
            radius: r || 25
        };

        if (prop.rwx > 2.5) prop.rwx *= -1;
        if (prop.rwy > 2.5) prop.rwy *= -1;

        //console.log(prop.rwx );
        var mc = an.createClip(prop, function (ctx, i) {

            this.x += this.rwx;
            this.y += this.rwy;

            if (this.x+this.radius/2 > an.width || this.x-this.radius/2 < 0)
                this.rwx *= -1;

            if (this.y+this.radius/2 > an.height || this.y-this.radius/2 < 0)
                this.rwy *= -1;

            an.graphic.circle(this.x, this.y, this.radius, c || '#ff0000', true);
            return this;
        });

        return mc
    };

    Game.butterDark = Game.createButter(100, 100, 25, '#7f7f7f');
    Game.butterYellow = Game.createButter(100, 200, 30, '#eee400');
    Game.butterBlue = Game.createButter(100, 200, 30, '#c7d1ff');



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



    Game.addBall = function () {

        var butD = Game.butterDark();
        var butY = Game.butterYellow();
        var butB = Game.butterBlue();

    };


    an.frame(function(ctx, i) {
        /** @type CanvasRenderingContext2D */
        ctx = ctx;
        Game.mouse = an.mousePress();

        Game.addBall();



    });

    // start
    an.start();
})();