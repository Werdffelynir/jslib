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
        width: 800,
        height: 400,
        fps: 24
    });

    // * * * * * * * * * * * * * * * * * * * * * * * * *

    var Game = {
        mc: {},
        key: {up:false,down:false,left:false,right:false,space:false,z:false,x:false,c:false},
        mouse:false,
        images: {}
    };

    // * * * * * * * * * * * * * * * * * * * * * * * * *
    Game.heroStat = {
        x: 50,
        y: 150,
        speed: 1.2
    };
    Game.hero = an.createMovieClip(Game.heroStat, function (ctx, frame) {

        if (Game.key.left) {this.x -= this.speed}
        if (Game.key.right) {this.x += this.speed}
        if (Game.key.up) {this.y -= this.speed}
        if (Game.key.down) {this.y += this.speed}

        ctx.drawImage(Game.images['cat'], 0, 0);
    });

    Game.cars_mc = [];

    Game.runCars = function (ctx, frame) {
        var i, limit = 4, padding = 100, params;

        if (Game.cars_mc.length == 0) {
            for (i = 0; i < limit; i ++) {
                params = {
                    x: padding + (i * 50),
                    y: -Animate.random(0, 400),
                    speed: Animate.random(200, 700) / 200,
                    dx: 0,
                    dy: 0
                };
                Game.cars_mc.push(an.createMovieClip(params, function () {

                    ctx.drawImage(Game.images['cars'], 75, 0, 75, 100, this.x, this.y, 75, 100);

                    this.y += this.speed;

                    if (this.y > an.height)
                         this.y = -Animate.random(0, 400);
                }));
            }
        }


        for (i = 0; i < Game.cars_mc.length; i ++) {
            Game.cars_mc[i]();
        }
    };
    // * * * * * * * * * * * * * * * * * * * * * * * * *

    Game.panel = function (ctx, frame) {
        an.text.write(5, 5, 'Frame: ' + frame);
    };

    Game.preview = function (ctx, frame) {
        an.text.write(150, 150, 'Cat on Road');
    };

    Game.start = function (ctx, frame) {
        Game.hero(ctx, frame);
        Game.runCars(ctx, frame);




    };


    // * * * * * * * * * * * * * * * * * * * * * * * * *
    an.backgroundColor('#03020f');
    an.text.color('#FFFFFF');
    an.text.font('bold 16px/16px sans');

    an.frame(function(ctx, i) {
        /** @type CanvasRenderingContext2D */
        ctx = ctx;

        an.addGrid(50, 0.35, '#FFF');

        Game.start(ctx, i);
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


    an.resource.loadImage({
        cars: '/animate/demo/images/cars-300x200.png',
        cat: '/animate/demo/images/cat_1_face.65x50.png',
        rocket: '/animate/demo/images/rocket_28x50.png'
    }, function (images) {
        Game.images = images;

        // start
        an.start();
    });

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

})();