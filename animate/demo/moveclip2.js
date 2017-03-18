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
        fps: 30
    });

    var Game = {
        images:{}
    };

    NSA.domLoaded(function () {
        an.Image.load({
            'flying':'/animate/demo/images/flying.png'
        }, function (images) {
            Game.images = images;


            Game.flyingSprites = [];
            var r = Animate.Util.random,
                w = an.width - 50,
                h = an.height - 50,
                conf = [
                    [r(0, w), r(0, h), r(1, 1000)/100, r(-300, -50), r(39, 200) / 100],
                    [r(0, w), r(0, h), r(1, 1000)/100, r(-300, -50), r(39, 200) / 100],
                    [r(0, w), r(0, h), r(1, 1000)/100, r(-300, -50), r(39, 200) / 100],
                    [r(0, w), r(0, h), r(1, 1000)/100, r(-300, -50), r(39, 200) / 100],
                    [r(0, w), r(0, h), r(1, 1000)/100, r(-300, -50), r(39, 200) / 100],
                    [r(0, w), r(0, h), r(1, 1000)/100, r(-300, -50), r(39, 200) / 100],
                    [r(0, w), r(0, h), r(1, 1000)/100, r(-300, -50), r(39, 200) / 100],
                    [r(0, w), r(0, h), r(1, 1000)/100, r(-300, -50), r(39, 200) / 100],
                    [r(0, w), r(0, h), r(1, 1000)/100, r(-300, -50), r(39, 200) / 100],
                    [r(0, w), r(0, h), r(1, 1000)/100, r(-300, -50), r(39, 200) / 100],
                    [r(0, w), r(0, h), r(1, 1000)/100, r(-300, -50), r(39, 200) / 100],
                    [r(0, w), r(0, h), r(1, 1000)/100, r(-300, -50), r(39, 200) / 100],
                    [r(0, w), r(0, h), r(1, 1000)/100, r(-300, -50), r(39, 200) / 100]
                ];
            for (var i = 0; i < conf.length; i ++) {
                Game.flyingSprites.push(an.Sprite({
                    image: images['flying'],
                    grid_columns: 4,
                    grid_rows: 2,
                    indexes: [0,1,2,3],
                    delay: 1,
                    x: conf[i][0],
                    y: conf[i][1],
                    width: 50,
                    height: 30,
                    point: an.Point(0, 0),
                    scale: [conf[i][4], conf[i][4]],
                    speed: conf[i][2],
                    start_x: conf[i][3]
                }));
            }


            /*
            Game.spFlying0 = an.Sprite({
                image: images['flying'],
                grid_columns: 4,
                grid_rows: 2,
                indexes: [0,1,2,3],
                delay: 1,
                x: 200,
                y: 50,
                width: 50,
                height: 30,
                point: an.Point(0, 0),
                speed: 3.4,
                start_x: -50
            });
            Game.spFlying1 = an.Sprite({
                image: images['flying'],
                grid_columns: 4,
                grid_rows: 2,
                indexes: [0,1,2,3],
                delay: 1,
                x: 300,
                y: 100,
                width: 50,
                height: 30,
                point: an.Point(0, 0),
                speed: 3,
                start_x: -150
            });

            Game.spFlying2 = an.Sprite({
                image: images['flying'],
                grid_columns: 4,
                grid_rows: 2,
                indexes: [0,1,2,3],
                delay: 1,
                x: 120,
                y: 200,
                width: 50,
                height: 30,
                point: an.Point(0, 0),
                speed: 4,
                start_x: -220
            });

            Game.spFlying3 = an.Sprite({
                image: images['flying'],
                grid_columns: 4,
                grid_rows: 2,
                indexes: [0,1,2,3],
                delay: 1,
                x: 150,
                y: 250,
                width: 50,
                height: 30,
                point: an.Point(0, 0),
                speed: 2.5,
                start_x: -380
            });
            Game.spFlying4 = an.Sprite({
                image: images['flying'],
                grid_columns: 4,
                grid_rows: 2,
                indexes: [0,1,2,3],
                delay: 1,
                x: 350,
                y: 300,
                width: 50,
                height: 30,
                point: an.Point(0, 0),
                speed: 2.85,
                start_x: -180
            });
            Game.spFlying5 = an.Sprite({
                image: images['flying'],
                grid_columns: 4,
                grid_rows: 2,
                indexes: [0,1,2,3],
                delay: 1,
                x: 120,
                y: 350,
                width: 50,
                height: 30,
                point: an.Point(0, 0),
                speed: 3.5,
                start_x: -80
            });
             */

            // start
            an.start();
        });
    });


    // * * * * * * * * * * * * * * * * * * * * * * * * *

    /**
     * mc = MoveClip({
     *      image: Image,                   // Image resource
     *      grid_columns: 4,                // columns in Grid Map
     *      grid_rows: 2,
     *      indexes: [0,1,2,3],             // indexes queue for move
     *      delay: 2,                       // delay in animation iteration
     *      x: 100,                         // position X and Y
     *      y: 100,
     *      width: 50,                      // size
     *      height: 30,
     *      rotate: 45 * Math.PI / 180,     // rotation in radians. arguments for CanvasRenderingContext2D.rotate
     *      scale: [1, 1],                  // arguments for CanvasRenderingContext2D.scale
     *      transform: [1, 0, 0, 1, 0, 0],  // arguments for CanvasRenderingContext2D.setTransform
     *      point: {x: -15, y: -25},        // base point position
     * });
     *
     * Grid Map Indexes. example grid_columns: 4; grid_rows: 3
     *  [ 0, 1, 2, 3]
     *  [ 4, 5, 6, 7]
     *  [ 8, 9, 10, 11]
     * @param options
     * @returns {_moveclip}
     * @constructor

    var MoveClip = function (options) {

        var _moveclip = function () {
            // @type CanvasRenderingContext2D
            var ctx = an.getContext();
            var i = an.getIteration();
            if (_moveclip.image_width === 0 && _moveclip.image_height === 0) {
                _moveclip.image_width = _moveclip.image.naturalWidth || _moveclip.image.width;
                _moveclip.image_height = _moveclip.image.naturalHeight || _moveclip.image.height;
                _moveclip.sprite_width = _moveclip.image_width / _moveclip.grid_columns;
                _moveclip.sprite_height = _moveclip.image_height / _moveclip.grid_rows;
                _moveclip.max_index = _moveclip.grid_columns * _moveclip.grid_rows - 1;
            }

            // cursor reload positions
            if (_moveclip.indexes.length > 1 && _moveclip.delay > 0) {
                if (_moveclip.current_index >= _moveclip.grid_columns - 1) {
                    var next_step = parseInt(_moveclip.current_index / _moveclip.grid_columns) * _moveclip.sprite_height;
                    if (next_step > _moveclip.cursor_y){
                        _moveclip.cursor_x = 0;
                    }
                    else {
                        _moveclip.cursor_x = _moveclip.current_index % _moveclip.grid_columns * _moveclip.sprite_width;
                    }

                    _moveclip.cursor_y = next_step;
                } else {
                    _moveclip.cursor_x = _moveclip.current_index * _moveclip.sprite_width;
                }
            }

            // draw image
            ctx.save();
            ctx.translate(_moveclip.x, _moveclip.y);

            if (_moveclip.transform) {
                CanvasRenderingContext2D.prototype.setTransform.apply(ctx, _moveclip.transform);
            }
            if (_moveclip.rotate) {
                ctx.rotate(_moveclip.rotate);
            }
            if (_moveclip.scale) {
                CanvasRenderingContext2D.prototype.scale.apply(ctx, _moveclip.scale);
            }

            ctx.drawImage(_moveclip.image,
                // source
                _moveclip.cursor_x, _moveclip.cursor_y, _moveclip.sprite_width, _moveclip.sprite_height,
                // draw
                _moveclip.point.x, _moveclip.point.y, _moveclip.width, _moveclip.height
            );

            ctx.restore();

            // change - current_index cursor_x cursor_y
            if (_moveclip.indexes.length > 1 && _moveclip.delay > 0) {
                if (i % _moveclip.delay === 0) {

                    if (_moveclip.indexes[_moveclip.real_index + 1]) {
                        _moveclip.real_index = _moveclip.real_index + 1;
                        _moveclip.current_index = _moveclip.indexes[_moveclip.real_index];
                    } else {
                        _moveclip.real_index = 0;
                        _moveclip.current_index = _moveclip.indexes[0];
                    }
                }
            }
        };

        _moveclip.image = options['image'] || null;
        _moveclip.grid_columns = options['grid_columns'] || null;
        _moveclip.grid_rows = options['grid_rows'] || null;
        _moveclip.indexes = options['indexes'] || [0];
        _moveclip.delay = options['delay'] || 0;
        _moveclip.x = options['x'] || 0;
        _moveclip.y = options['y'] || 0;
        _moveclip.width = options['width'] || 100;
        _moveclip.height = options['height'] || 100;
        _moveclip.rotate = options['rotate'] || false;
        _moveclip.point = options['point'] || {x:0, y:0};
        _moveclip.transform = options['transform'] || false;
        _moveclip.scale = options['scale'] || false;
        _moveclip.cursor_x = 0;
        _moveclip.cursor_y = 0;
        _moveclip.image_width = 0;
        _moveclip.image_height = 0;
        _moveclip.sprite_width = 0;
        _moveclip.sprite_height = 0;
        _moveclip.max_index = 0;
        _moveclip.real_index = 0;
        _moveclip.current_index = _moveclip.indexes[0];

        return _moveclip;
    };*/


    Game.birdRunner = function (bird) {
        bird.x += bird.speed;

        if (bird.x > an.width) {
            bird.x = bird.start_x;
        }

    };


    Game.mcBird = an.MovieClip({
        speed: 4.5
    }, function (ctx, i) {

        Game.flyingSprites.forEach(function (item) {
            Game.birdRunner(item());
        });

    }, true);

    an.frame(function(ctx, i){

        Game.mcBird();

    });


})();