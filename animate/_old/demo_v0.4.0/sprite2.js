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
    var Game = {
        images:{},
        preview: null,
        preview_x: an.width - 100,
        preview_y: 0,
    };

    // asteroids
    // flying
    // rocket
    an.frame('start', function(ctx, i){

        Game.rocketSprite();
        Game.rocketStat.x += 3;
        if (!Game.rocketStat.rotate) Game.rocketStat.rotate = 0;
        Game.rocketStat.rotate += (3 * Math.PI / 180);

        // Game.clip(ctx, i);
        // Game.clip.x += 5;
        //
        // Game.mc(ctx, i);
        // Game.mcStat.x += 3;
        //console.dir(Game.mc);

        an.Text.reset();
        an.Text.write(0, 0, 'Frame: ' + i);

        an.Text.x(10);
        an.Text.y(25);
        an.Text.write('Hello 1');

        an.Text.font('bold 18px/20px sans');
        an.Text.write(10, 50, 'Hello 2');

        an.Text.font('bold 16px/18px sans');
        an.Text.write(10, 100, 'Hello 3', 'red');


        an.Text.font('bold 24px/26px sans');
        an.Text.lineWidth(1);
        an.Text.write(Game.preview_x, 150, 'Hello 4', '#868686');
        an.Text.write(Game.preview_x, 150, 'Hello 4', '#b31204', false);

        Game.preview_x -= 2;
        if (Game.preview_x < -100)
            Game.preview_x = an.width;

        if (i == 200) {
            an.stop();
            // reset parameters and replay
            Game.rocketStat.x = 0;
            an.clearIteration();
            an.start('start');

            //if (i == 101) {}
        }
    });

    an.Image.load({
        asteroids: '/animate/demo/images/asteroids.png',
        flying: '/animate/demo/images/flying.png',
        rocket: '/animate/demo/images/rocket.png'
    }, function (images) {
        Game.images = images;
        //console.dir(images['flying']);
        // Game.clip = an.createClip({x:10,y:10}, function (ctx, i) {
        //     ctx.fillRect(Game.clip.x, Game.clip.y, 50, 50);
        // });
        // Game.mcStat = {x:10,y:100};
        // Game.mc = an.createMovieClip(Game.mcStat, function (ctx, i) {
        //     ctx.fillRect(this.x, this.y, 50,50);
        // });


        Game.rocketStat = {
            x: 0,
            y: 200,
            width: 57,
            height: 100,
            point: an.point(-28, -50),
            image: Game.images['rocket'],
            grid: [1, 1],
            indexes: [0,1,2,3],
            delay: 1
        };
        Game.rocketSprite = an.createSprite(Game.rocketStat);







        // start
        an.start('start');
    });
})();