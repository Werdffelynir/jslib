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
        fps: 2
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

    var MovieClip2 = function (options, callback, thisInstance) {
        var _key,
            _ctx = this.context,
            _options = {
                x: 0,
                y: 0,
                transform: false,
                rotate: false,
                scale: false
            };


        for (_key in _options) {
            if (options[_key] === undefined)
                options[_key] = _options[_key];
        }

        var _clip = an.Clip(options, function () {

            //callback
        }, thisInstance);

        console.dir(_clip);

        //for (_key in options) {
            //_clip[_key] = _options[_key] = options[_key];}


        // var _func = function () {
        //     //console.log(this);
        //     _clip.apply(options, arguments);
        // };
        //console.dir(_clip);
        //return _func.bind(options);
        return _clip;//.bind(options);
    };

    Game.birdRunner = function (bird) {
        bird.x += bird.speed;
        if (bird.x > an.width) {
            bird.x = bird.start_x;}
    };

    Game.mcBird = an.MovieClip({}, function (ctx, i) {
        Game.flyingSprites.forEach(function (item) {
            Game.birdRunner(item());
        });
    }, true);

    var mc2Stat = {
        id: 'Jopa',
        x: 100,
        y: 100
    };
    var mc2 = MovieClip2(mc2Stat, function () {
        console.log(this);
        console.log(mc2Stat);
    });
    an.frame(function(ctx, i){

        mc2(ctx, i);
        mc2.x += 10;
        //mc2Stat.x += 10;

        // Game.mcBird(ctx, i);
    });


})();