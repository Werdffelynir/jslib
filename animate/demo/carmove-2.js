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

    // * Game
    // * * * * * * * * * * * * * * * * * * * * * * * *

    var Game = {
        mc: {},
        key: {},
        mouse:false
    };

    Game.mc.car = an.createMovieClip({x:50,y:100}, function () {
        an.graphic.rect(-25,-5,50,10,'#3d2a6b')
    });
    Game.mc.city = an.createMovieClip({x:750,y:300,s:2}, function () {
        an.graphic.rect(-15,-15,30,30,'#f7e304')
    });

    Game.space = function (ctx, frame) {
        an.addGrid(100, '#61587a');

        var car = Game.mc.car();
        var city = Game.mc.city();

        if (Game.key.up) city.y -= city.s;
        if (Game.key.down) city.y += city.s;
        if (Game.key.left) city.x -= city.s;
        if (Game.key.right) city.x += city.s;

        var xmove = (city.x - car.x) / 400;
        var ymove = (city.y - car.y) / 400;

        car.x += xmove;
        car.y += ymove;

        car.setRotate(Math.atan2(ymove, xmove));

        an.text.write(10, 10, 'Frame: ' + frame, '#000000');
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


    // * Default
    // * * * * * * * * * * * * * * * * * * * * * * * *
    //an.backgroundColor('#03020f');
    an.text.font('bold 18px/18px sans');
    an.text.color('#FFFFFF');

    // * Frames
    // * * * * * * * * * * * * * * * * * * * * * * * *
    an.frame('start', function(ctx, i) {
        /** @type CanvasRenderingContext2D */
        ctx = ctx;

        Game.space(ctx, i);
    });

    an.onFrame = function (ctx, i) {
        var mouse = an.mousePress();
        if (mouse && mouse !== Game.mouse)
            Game.mouse = mouse;

        Game.key = {
            up: an.keyPress('KeyW') || an.keyPress('ArrowUp'),
            down: an.keyPress('KeyS') || an.keyPress('ArrowDown'),
            left: an.keyPress('KeyA') || an.keyPress('ArrowLeft'),
            right: an.keyPress('KeyD') || an.keyPress('ArrowRight'),
            space: an.keyPress('Space')
        };
    };
    // * Load resources and game start
    // * * * * * * * * * * * * * * * * * * * * * * * *

    an.resource.loadImage({
        cursor : 'demo/images/ppw.png'
    }, function () {

        // * Start Game
        an.start('start');
    });

})();

