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
        width: 600,
        height: 400,
        fps: 24
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

            this.update = function () {
                this.x += this.rwx;
                this.y += this.rwy;

                if (this.x+this.radius/2 > an.width || this.x-this.radius/2 < 0)
                    this.rwx *= -1;

                if (this.y+this.radius/2 > an.height || this.y-this.radius/2 < 0)
                    this.rwy *= -1;

                an.graphic.circle(this.x, this.y, this.radius, c || '#ff0000', true);
            };
            return this;
        });

        return mc
    };

    Game.butterDark = Game.createButter(100, 100, 25, '#7f7f7f');
    Game.butterYellow = Game.createButter(100, 200, 30, '#eee400');
    Game.butterBlue = Game.createButter(100, 200, 30, '#c7d1ff');

    Game.boxBlack = new an.Graphic.Rectangle(10, 10, 60, 25, '#333a4d', true);
    Game.boxRed = new an.Graphic.Rectangle(10, 110, 60, 25, '#ff1a00', true);

    Game.addBall = function () {
        var butterDark = Game.butterDark();
        var butterYellow = Game.butterYellow();
        var butterBlue = Game.butterBlue();

        butterDark.update();
        butterYellow.update();
        butterBlue.update();
    };


    console.log( Game.boxBlack);

    an.frame(function(ctx, i) {
        /** @type CanvasRenderingContext2D */
        ctx = ctx;
        Game.mouse = an.mousePress();

        Game.boxBlack.x += 3.2;
        if (Game.boxBlack.x > an.width) Game.boxBlack.x = 0;
        Game.boxBlack.draw();

        Game.boxRed.x += 2.8;
        if (Game.boxRed.x > an.width) Game.boxRed.x = 0;
        Game.boxRed.draw();

        Game.addBall();



    });

    // start
    an.start();
})();