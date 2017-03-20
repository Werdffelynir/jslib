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
    Game = {img:{}, bgFileName:null};
    Game.movieBg = an.createClip({
        speed: 1.5,
        img1_x: 0,
        img1_y: 0,
        img2_x: false,
        img2_y: 0,
        correct_x: 0
    }, function (ctx, i) {
        /** @type CanvasRenderingContext2D */
        ctx = ctx;
        var img = Game.img[Game.bgFileName];
        if (!img) return;
        if (this.img2_x === false) {
            this.img2_x = img.width + this.correct_x ;
        }

        ctx.drawImage(img, this.img1_x, this.img1_y);
        ctx.drawImage(img, this.img2_x, this.img2_y);

        this.img1_x -= this.speed;
        this.img2_x -= this.speed;

        if (this.img1_x < -img.width + this.correct_x ) this.img1_x = img.width + this.correct_x ;
        if (this.img2_x < -img.width + this.correct_x ) this.img2_x = img.width + this.correct_x ;
    });


    an.frame('game', function(ctx, i){
        /** @type CanvasRenderingContext2D */
        ctx = ctx;

        Game.movieBg(ctx, i);

    });

    NSA.domLoaded(function () {
        an.Image.load({
            bg_run: '/animate/demo/images/bg_pixel.jpg',
            zip3: '/animate/demo/images/zip3.png'
        }, function (list) {
            Game.img = list;

            Game.heroStat.image = Game.img['zip3'];

        });
    });
    // start
    an.start('game');
})();