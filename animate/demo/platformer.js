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
        mouse:false,
        images: {}
    };

    Game.map = {};
    Game.map.create = function (mask_array, cols, rect_size) {
        mask_array['cols'] = cols;
        mask_array['rows'] = cols;
        mask_array['size'] = rect_size;
        return mask_array;
    };
    Game.map.render = function (map, callback) {
        var i, x, y;
        for (i = 0; i < map.length; i++) {
            x = parseInt(i % map['cols']) * map['size'];
            y = parseInt(i / map['cols']) * map['size'];
            callback.call(null, x, y, map[i], i, map);
        }
    };

    var mapSimpleCache = false;
    var mapSimple = Game.map.create([
        0, 0, 0, 0, 0, 0, 1, 1, 1, 0,
        0, 1, 1, 1, 0, 1, 1, 0, 1, 1,
        1, 1, 0, 1, 1, 1, 0, 0, 0, 1,
        1, 0, 0, 0, 1, 0, 0, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 0, 0
    ], 10, 50);

    Game.space = function (ctx, frame) {
        an.addGrid(100, '#61587a');

        if (!mapSimpleCache) {
            Game.map.render(mapSimple, function (x, y, item, i, map) {
                if (item == 1)
                    an.graphic.rect(x, y, map['size'], map['size']);
            });
            mapSimpleCache = ctx.getImageData(0,0,an.width,an.height);
        } else {
            ctx.putImageData(mapSimpleCache, 0, 0);
        }



        an.text.write(10, 10, 'Frame: ' + frame, '#61587a');
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
    an.text.font('bold 16px/16px sans');
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