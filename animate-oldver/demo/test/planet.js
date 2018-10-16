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
        height: 600,
        fps: 24
    });

    // * * * * * * * * * * * * * * * * * * * * * * * * *

    var Game = {
        key: {up:false,down:false,left:false,right:false,space:false,z:false,x:false,c:false},
        mouse:false
    };

    Game.panel = function (ctx, frame) {
        an.text.write(5, 5, 'Frame: ' + frame);
        an.text.write(200, 5, 'Planets: ' + Game.planets.length);
        an.text.write(300, 5, 'Asteroids: ' + Game.asteroids.length);
    };

    Game.addStar = an.createMovieClip({x:an.width/2,y:an.height/2,r:30}, function () {
        an.graphic.circle(0, 0, this.r, '#eee400');
    });

    Game.createPlanet = function (d, r, s, c, rt) {
        return an.createMovieClip({x:an.width/2, y:an.height/2, r:r, s:s, d:d, c:c, rt:rt}, function () {
            an.graphic.circle(this.d, 0, this.r, this.c || '#cadad8');
            if (!this.rotate && rt) this.rotate = rt;
            this.rotate += this.s;
        })
    };

    Game.planets = false;
    Game.addPlanets = function () {
        var i, c = '#fcecff';
        if (!Game.planets) {
            Game.planets = [
                Game.createPlanet(30,  4,  -0.065, c),
                Game.createPlanet(60,  6,  -0.040, c),
                Game.createPlanet(100, 8,  -0.038, c),
                Game.createPlanet(120, 6,  -0.027, c),
                Game.createPlanet(160, 8,  -0.016, c),
                Game.createPlanet(180, 10, -0.008, c),
                Game.createPlanet(240, 16, -0.012, c),
                Game.createPlanet(280, 12, -0.003, c)
            ];
        }
        for (i = 0; i < Game.planets.length; i++) {
            if (NSA.typeOf(Game.planets[i], 'function')) {
                Game.planets[i]();
            }
        }
    };

    Game.asteroids = false;
    Game.addAsteroids = function () {
        var i;
        if (!Game.asteroids) {
            Game.asteroids = [];
            for (i = 0; i < 500; i++) {
                var _d = an.random(200,220);
                var _r = an.random(2,5);
                var _s = -(1.1 / an.random(200, 500));
                var _c = '#5d585f';
                var _rt = Math.random() * 6.2;
                Game.asteroids.push(Game.createPlanet(_d,  _r,  _s, _c, _rt));
            }
        }
        for (i = 0; i < Game.asteroids.length; i++) {
            if (NSA.typeOf(Game.asteroids[i], 'function')) {
                Game.asteroids[i]();
            }
        }
    };


    Game.space = function (ctx, frame) {
        /** @type CanvasRenderingContext2D */
        ctx = ctx;

        Game.addStar();
        Game.addPlanets();
        Game.addAsteroids();
    };

    an.backgroundColor('#03020f');
    an.text.color('#FFFFFF');
    an.text.font('bold 16px/16px sans');

    an.frame(function(ctx, i) {
        /** @type CanvasRenderingContext2D */
        ctx = ctx;

        an.addGrid(50, 0.35, '#FFF');

        Game.space(ctx, i);
        Game.panel(ctx, i);

    });

    an.onFrame = function (ctx, i) {
        Game.mouse = an.mouseMove();
        Game.key.up = an.keyPress('KeyW') || an.keyPress('ArrowUp');
        Game.key.down = an.keyPress('KeyS') || an.keyPress('ArrowDown');
        Game.key.left = an.keyPress('KeyA') || an.keyPress('ArrowLeft');
        Game.key.right = an.keyPress('KeyD') || an.keyPress('ArrowRight');
        Game.key.space = an.keyPress('Space');
        Game.key.z = an.keyPress('KeyZ');
        Game.key.x = an.keyPress('KeyX');
        Game.key.c = an.keyPress('KeyC');
    };

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

    an.resource.loadImage({
        rocket: '/animate-oldver/demo/images/rocket_28x50.png'
    }, function (images) {
        Game.images = images;

        // start
        an.start();
    });

})();