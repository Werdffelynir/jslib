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

    // * * * * * * * * * * * * * * * * * * * * * * * * *
    var Game = {images:{}};

    var Sprite = function (options) {



        var _sprite = function (ctx, i) {
            /**
             * @type CanvasRenderingContext2D
             */
            ctx = ctx;
            // first data
            if (_sprite.image_width === 0 && _sprite.image_height === 0) {
                _sprite.image_width = _sprite.image.naturalWidth || _sprite.image.width;
                _sprite.image_height = _sprite.image.naturalHeight || _sprite.image.height;
                _sprite.sprite_width = _sprite.image_width / _sprite.grid_columns;
                _sprite.sprite_height = _sprite.image_height / _sprite.grid_rows;
                _sprite.max_index = _sprite.grid_columns * _sprite.grid_rows - 1;
            }

            // cursor reload positions
            if (_sprite.indexs.length > 1 && _sprite.delay > 0) {
                if (_sprite.current_index >= _sprite.grid_columns - 1) {
                    var next_step = parseInt(_sprite.current_index / _sprite.grid_columns) * _sprite.sprite_height;
                    if (next_step > _sprite.cursor_y){
                        _sprite.cursor_x = 0;
                    }
                    else {
                        _sprite.cursor_x = _sprite.current_index % _sprite.grid_columns * _sprite.sprite_width;
                    }

                    _sprite.cursor_y = next_step;
                } else {
                    _sprite.cursor_x = _sprite.current_index * _sprite.sprite_width;
                }
            }

            // draw image
            ctx.save();
            ctx.translate(_sprite.x, _sprite.y);

            if (_sprite.transform) {
                CanvasRenderingContext2D.prototype.setTransform.apply(ctx, _sprite.transform);
                _sprite.transform = false;
            }
            if (_sprite.rotate) {
                ctx.rotate(parseFloat(_sprite.rotate * Math.PI / 180));
            }
            if (_sprite.scale) {
                CanvasRenderingContext2D.prototype.scale.apply(ctx, _sprite.scale);
            }

            ctx.drawImage(_sprite.image,
                // source
                _sprite.cursor_x, _sprite.cursor_y, _sprite.sprite_width, _sprite.sprite_height,
                // draw
                _sprite.point.x, _sprite.point.y, _sprite.width, _sprite.height
            );

            // if (_sprite.transform)
            //     ctx.setTransform(1,0,0,1,0,0);

            ctx.restore();

            // change - current_index cursor_x cursor_y
            if (_sprite.indexs.length > 1 && _sprite.delay > 0) {
                if (i % _sprite.delay === 0) {

                    if (_sprite.indexs[_sprite.real_index + 1]) {
                        _sprite.real_index = _sprite.real_index + 1;
                        _sprite.current_index = _sprite.indexs[_sprite.real_index];
                    } else {
                        _sprite.real_index = 0;
                        _sprite.current_index = _sprite.indexs[0];
                    }
                }
            }
        };

        _sprite.image = options['image'] || null;
        _sprite.grid_columns = options['grid_columns'] || null;
        _sprite.grid_rows = options['grid_rows'] || null;
        _sprite.indexs = options['indexs'] || [0];
        _sprite.delay = options['delay'] || 0;
        _sprite.x = options['x'] || 0;
        _sprite.y = options['y'] || 0;
        _sprite.width = options['width'] || 100;
        _sprite.height = options['height'] || 100;
        _sprite.rotate = options['rotate'] || false;
        _sprite.point = options['point'] || {x:0, y:0};
        _sprite.transform = options['transform'] || false;
        _sprite.scale = options['scale'] || false;
        _sprite.cursor_x = 0;
        _sprite.cursor_y = 0;
        _sprite.image_width = 0;
        _sprite.image_height = 0;
        _sprite.sprite_width = 0;
        _sprite.sprite_height = 0;
        _sprite.max_index = 0;
        _sprite.real_index = 0;
        _sprite.current_index = _sprite.indexs[0];

        return _sprite;
    };


    // asteroids
    // flying
    // rocket
    an.frame(function(ctx, i){

        //mc(ctx, i);

        //console.log(ctx, i);
        //console.log(Game.spriteFlying.rotate);
        //Game.flying(ctx, i);
        //if (i == 1)




        //Game.spriteFlying.y += 0.35;

        if (an.keyPress('ArrowLeft')){
            //ctx.translate(Game.spriteFlying.x, Game.spriteFlying.y);
            //ctx.setTransform(-1, 0, 0, 1, 100, 0);
            Game.spriteFlying.x -= 2;
            Game.spriteFlying.scale = [-1, 1];
            //Game.spriteFlying.transform = [-1, 0, 0, 1, 100, 0];
            //Game.spriteFlying.rotate -= 2;
            //Game.spriteFlying.point = an.point(-25, -18);
        }
        if (an.keyPress('ArrowRight')) {
            //ctx.setTransform(1, 0, 0, 1, 0, 0);
            //Game.spriteFlying.transform = false;

            //Game.spriteFlying.rotate += 2;
            Game.spriteFlying.x += 2;
            Game.spriteFlying.scale = [1, 1];
        }
        if (an.keyPress('ArrowDown'))
            Game.spriteFlying.y += 2;
        if (an.keyPress('ArrowUp'))
            Game.spriteFlying.y -= 3;

        Game.spriteFlying(ctx, i);

        //ctx.setTransform(1, 0, 0, 1, 0, 0);

        // Game.spriteAsteroids(ctx, i);
        // Game.spriteAsteroids2(ctx, i);


        if (i > 100) {
            //an.stop();
        }

    });

    an.Image.load({
        asteroids: '/animate/demo/images/asteroids.png',
        flying: '/animate/demo/images/flying.png',
        rocket: '/animate/demo/images/rocket.png'
    }, function (images) {
        Game.images = images;
        //console.dir(images['flying']);

        // var svg1 = document.getElementById('svg1');
        // var matrix = svg1.createSVGMatrix();
        // console.log(an.getContext());
        // var pattern = an.getContext().createPattern(Game.images['flying'], 'repeat');
        // pattern.setTransform(matrix.rotate(-45).scale(1.5));

        Game.spriteFlying = Sprite({
            image: Game.images['flying'],
            grid_columns: 4,
            grid_rows: 2,
            indexs: [0,1,2,3],
            delay: 1,
            x: 200,
            y: 150,
            width: 50,
            height: 35,
            point: an.point(-25, -18)
        });

        Game.spriteAsteroids = Sprite({
            image: Game.images['asteroids'],
            grid_columns: 8,
            grid_rows: 8,
            indexs: [0,1,2,3,4,5,6,7,8],
            delay: 2,
            x: 300,
            y: 100,
            width: 50,
            height: 50
        });

        Game.spriteAsteroids2 = Sprite({
            image: Game.images['asteroids'],
            grid_columns: 8,
            grid_rows: 8,
            indexs: [8,9,10,11,12,13,14,15,16,15,16,15,16],
            delay: 4,
            x: 360,
            y: 150,
            width: 50,
            height: 50
        });

       // var ctx = an.getContext();
       // var i = an.getIteration();
       // mc(ctx, i);

        //(Array(64).fill(0)).map(function(e,i){return i}),
        //[].fill.call({ length: 15 }, 16),








        // start
        an.start();
    });
})();