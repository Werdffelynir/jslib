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
        fps: 0
    });

    // * * * * * * * * * * * * * * * * * * * * * * * * *
    var Game = {};

    Game.map_array = [
        0, 0, 0, 1, 1,
        1, 1, 1, 1, 0,
        0, 0, 1, 0, 0,
        0, 1, 1, 1, 1,
        1, 1, 0, 0, 0
    ];
    Game.map_array['_size'] = 50;
    Game.map_array['_cols'] = 5;
    Game.map_array['_rows'] = 5;

    Game.drawMap = function (ctx, frame) {
        /** @type CanvasRenderingContext2D */
        ctx = ctx;

        var i, x, y, p, map = Game.map_array;
        for (i = 0; i < map.length; i++) {
            x = parseInt(i % map['_cols']) * map['_size'];
            y = parseInt(i / map['_cols']) * map['_size'];
            if (map[i] == 1) {
                an.graphic.rect(x, y, map['_size'], map['_size']);
            }
        }
    };

    an.frame('menu', function(ctx, frame) {
        /** @type CanvasRenderingContext2D */
        ctx = ctx;

        Game.drawMap(ctx, frame);

    });

    // start
    an.start('menu');
})();