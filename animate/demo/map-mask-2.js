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
        fps: 0
    });

    // * * * * * * * * * * * * * * * * * * * * * * * * *
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

    // game elements
    var mapSimpleCache = false;
    var mapSimple = Game.map.create([
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0,
        0, 3, 3, 0, 0, 3, 3, 3, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2,
        0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0,
        2, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1
    ], 12, 50);

    an.frame('start', function(ctx, frame) {
        /** @type CanvasRenderingContext2D */
        ctx = ctx;

        if (!mapSimpleCache) {
            Game.map.render(mapSimple, function (x, y, item, i, map) {

                if (item == 0) {
                    ctx.drawImage(Game.images['bgs'], 100, 50, 50, 50, x, y, 50, 50);
                }

                if (item == 1) {
                    ctx.drawImage(Game.images['bgs'], 100, 0, 50, 50, x, y, 50, 50);
                }

                if (item == 2) {
                    ctx.drawImage(Game.images['bgs'], 50, 0, 50, 50, x, y, 50, 50);
                }

                if (item == 3) {
                    ctx.drawImage(Game.images['bgs'], 0, 0, 50, 50, x, y, 50, 50);
                }

            });
            mapSimpleCache = ctx.getImageData(0, 0, an.width, an.height);
        } else if (mapSimpleCache instanceof ImageData) {
            ctx.putImageData(mapSimpleCache, 0, 0);
        }

    });

    an.resource.loadImage({
        bgs : 'demo/images/bg_six-50x50.png'
    }, function (imgs) {
        Game.images = imgs;

        // start
        an.start('start');
    });


})();