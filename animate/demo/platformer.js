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
        fps: 60
    });

    // * Game
    // * * * * * * * * * * * * * * * * * * * * * * * *

    var Game = {
        mouse:false
    };

    Game.space = function (ctx, frame) {







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
    an.backgroundColor('#03020f');
    an.text.font('bold 18px/18px sans');
    an.text.color('#FFFFFF');


    // * Frames
    // * * * * * * * * * * * * * * * * * * * * * * * *
    an.frame(function(ctx, i) {
        /** @type CanvasRenderingContext2D */
        ctx = ctx;
        Game.mouse = an.mouseMove();

        //Game.grid(50, 0.1, '#FFF');
        //Game.space(ctx, i);
    });

    // * Load resources and game start
    // * * * * * * * * * * * * * * * * * * * * * * * *
    NSA.loadJS([], function () {

    });

    an.loadImage({}, function () {

    });

    // * Start Game
    an.start();
})();

