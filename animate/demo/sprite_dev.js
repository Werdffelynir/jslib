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
        fps: 24
    });

    // * * * * * * * * * * * * * * * * * * * * * * * * *
    var Game = {images:{}};

    var Sprite = function (options) {

        var _option = {
            image:          options['image'] || null,
            grid_width:     options['grid_width'] || null,
            grid_height:    options['grid_height'] || null,
            indexs:         options['indexs'] || [0],
            delay:          options['delay'] || 0,
            x:              options['x'] || 0,
            y:              options['y'] || 0,
            width:          options['width'] || 100,
            height:         options['height'] || 100,
            current_index:  2,
            max_index:      0,
            cursor_x:       0,
            cursor_y:       0,
            image_width:    0,
            image_height:   0,
            sprite_width:   0,
            sprite_height:  0
        };

        _option.real_index = 0;
        _option.current_index = _option.indexs[0];

        var _sprite = function (ctx, i) {

            // first data
            if (_option.image_width === 0 && _option.image_height === 0) {
                _option.image_width = _option.image.naturalWidth || _option.image.width;
                _option.image_height = _option.image.naturalHeight || _option.image.height;
                _option.sprite_width = _option.image_width / _option.grid_width;
                _option.sprite_height = _option.image_height / _option.grid_height;
                _option.max_index = _option.grid_width * _option.grid_height - 1;
            }

            // cursor reload positions
            if (_option.current_index >= _option.grid_width - 1) {
                var next_step = parseInt(_option.current_index / _option.grid_width) * _option.sprite_height;
                if (next_step > _option.cursor_y){
                    _option.cursor_x = 0;
                }
                else {
                    _option.cursor_x = _option.current_index % _option.grid_width * _option.sprite_width;
                }

                _option.cursor_y = next_step;
            } else {
                _option.cursor_x = _option.current_index * _option.sprite_width;
            }

            // draw image
            ctx.drawImage(_option.image,
                // source
                _option.cursor_x, _option.cursor_y, _option.sprite_width, _option.sprite_height,
                // draw
                _option.x, _option.y, _option.width, _option.height
            );

            // change - current_index cursor_x cursor_y
            if (_option.indexs.length > 1) {
                if (i % _option.delay === 0) {

                    if (_option.indexs[_option.real_index + 1]) {
                        _option.real_index = _option.real_index + 1;
                        _option.current_index = _option.indexs[_option.real_index];
                    } else {
                        _option.real_index = 0;
                        _option.current_index = _option.indexs[0];
                    }
                }
            }
        };

        return _sprite;
    };


    console.dir();



    // asteroids
    // flying
    // rocket
    an.frame(function(ctx, i){

        //console.log(ctx, i);
        //Game.flying(ctx, i);
        //if (i == 1)
            //Game.spriteFlying(ctx, i);
            Game.spriteAsteroids(ctx, i);
            Game.spriteAsteroids2(ctx, i);

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



        Game.spriteFlying = Sprite({
            image: Game.images['flying'],
            grid_width: 4,
            grid_height: 2,
            indexs: [0,1,2,3],
            delay: 2,
            x: 150,
            y: 150,
            width: 50,
            height: 50
        });

        Game.spriteAsteroids = Sprite({
            image: Game.images['asteroids'],
            grid_width: 8,
            grid_height: 8,
            indexs: [0,1,2,3,4,5,6,7,8],
            delay: 2,
            x: 300,
            y: 100,
            width: 50,
            height: 50
        });

        Game.spriteAsteroids2 = Sprite({
            image: Game.images['asteroids'],
            grid_width: 8,
            grid_height: 8,
            indexs: [8,9,10,11,12,13,14,15,16,15,16,15,16],
            delay: 5,
            x: 360,
            y: 150,
            width: 50,
            height: 50
        });

        //(Array(64).fill(0)).map(function(e,i){return i}),
        //[].fill.call({ length: 15 }, 16),








        // start
        an.start();
    });
})();