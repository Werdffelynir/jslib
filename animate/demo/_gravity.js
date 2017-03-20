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
    Game = {};
    Game.mcPreview = an.createClip({
            x: 150,
            y: -50,
            mouse: false
        },
        function (ctx, i) {
            /** @type CanvasRenderingContext2D */
            ctx = ctx;
            ctx.lineWidth = 4;
            an.Graphic.rect(this.x, this.y, 300, 100, '#846ff7', true);
            this.mouse = an.mousePress();
            if (this.mouse) {
                if (an.hitTestPoint(this.mouse)) {
                    an.stop();
                    an.start('game-over');
                }
            }
            an.Graphic.rect(this.x, this.y, 300, 100, '#3a363f', false);

            an.Text.font('bold 20px/22px sans, Arial');
            an.Text.write(this.x + 70, this.y + 20, 'Space Gravity');
            if (this.y < 150) {
                this.y++;
            } else {
                an.Text.font('bold 24px/26px sans, Arial');
                an.Text.write(this.x + 110, this.y + 50, 'START');
            }
        });

    Game.movieBg = an.createClip({
        speed: 1.5,
        img1_x: 0,
        img1_y: 0,
        img2_x: 1195,
        img2_y: 0
    }, function (ctx, i) {
        /** @type CanvasRenderingContext2D */
        ctx = ctx;

        ctx.drawImage(Game.img['bg_run'], this.img1_x, this.img1_y);
        ctx.drawImage(Game.img['bg_run'], this.img2_x, this.img2_y);

        this.img1_x -= this.speed;
        this.img2_x -= this.speed;

        if (this.img1_x < -1195) this.img1_x = 1195;
        if (this.img2_x < -1195) this.img2_x = 1195;
    });

    Game.heroStat = {
        image: null,
        x: 0,
        y: 0,
        width: 40,
        height: 43,
        grid: [10, 8],
        indexes: [70,71,72,73,74,75,76,77,78,79],
        delay: 2,
        point: {x:0, y:0},
    };

    Game.heroClip = an.createClip({}, function (ctx, i) {
        var sp = Game.heroSprite();

    });


    an.frame('preview', function(ctx, i){
        Game.mcPreview(ctx, i);
    });

    an.frame('game', function(ctx, i){
        /** @type CanvasRenderingContext2D */
        ctx = ctx;
        //console.log(ctx, i);
        //Game.mcPreview(ctx, i);
        Game.movieBg(ctx, i);
        Game.heroClip(ctx, i);

        if (i > 100) {
            //console.dir(an.Text);
//           an.stop();
        }
    });


    an.frame('game-over', function(ctx, i){
        console.log('Game Over');
        an.Text.font('bold 24px/26px sans, Arial');
        an.Text.write(220, 170, 'Game Over');
        an.stop();
    });

    Game.img = {};
    NSA.domLoaded(function () {
        an.Image.load({
            bg_run: '/animate/demo/images/bg_pixel.jpg',
            zip3: '/animate/demo/images/zip3.png'
        }, function (list) {
            Game.img = list;

            Game.heroStat.image = Game.img['zip3'];
            //console.log(Game.movieStat);
            Game.heroSprite = an.createSprite(Game.heroStat);

        });
    });
    // start
    an.start('game');
})();