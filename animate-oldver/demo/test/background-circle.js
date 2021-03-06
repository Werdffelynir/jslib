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
        height: 280,
        fps: 24
    });

    // * * * * * * * * * * * * * * * * * * * * * * * * *
    Game = {img:{}};
    /*
    Game.movieBg = an.createClip({
        source: null,
        speed: 1.5,
        img1_x: 0,
        img1_y: 0,
        img2_x: false,
        img2_y: 0
    }, function (source, ctx, i) {
        if (!source) return;
        this.source = source;

        if (this.img2_x === false) {
            this.img2_x = img.width ;
        }

        ctx.drawImage(this.source, this.img1_x, this.img1_y);
        ctx.drawImage(this.source, this.img2_x, this.img2_y);

        this.img1_x -= this.speed;
        this.img2_x -= this.speed;

        if (this.img1_x < -img.width ) this.img1_x = img.width ;
        if (this.img2_x < -img.width ) this.img2_x = img.width ;
    });*/

    Game.createBgClip = function (image, x, y, speed, correct) {
        return an.createClip({
            speed: speed || 2,
            img1_x: x,
            img1_y: y,
            img2_x: false,
            img2_y: y,
            correct_x: correct || 0
        }, function (ctx, i) {
            /** @type CanvasRenderingContext2D */
            ctx = ctx;
            if (this.img2_x === false)
                this.img2_x = image.width + this.correct_x ;

            ctx.drawImage(image, this.img1_x, this.img1_y);
            ctx.drawImage(image, this.img2_x, this.img2_y);

            this.img1_x -= this.speed;
            this.img2_x -= this.speed;

            if (this.img1_x < -image.width + this.correct_x ) this.img1_x = image.width + this.correct_x;
            if (this.img2_x < -image.width + this.correct_x ) this.img2_x = image.width + this.correct_x;
                             
            return this;
        });
    };

    an.frame('game', function(ctx, i){
        /** @type CanvasRenderingContext2D */
        ctx = ctx;

        Game.bg3(ctx, i);
        Game.bg2(ctx, i);
        Game.bg1(ctx, i);
        //Game.movieBg(ctx, i);

    });

    NSA.domLoaded(function () {
        an.resource.loadImage({
            bg1: '/animate-oldver/demo/images/bgparallax/1.png',
            bg2: '/animate-oldver/demo/images/bgparallax/2.png',
            bg3: '/animate-oldver/demo/images/bgparallax/3.png',
            flying: '/animate-oldver/demo/images/flying.png'
        }, function (imgs) {
            Game.img = imgs;

            console.log(imgs);
            
            Game.bg1 = Game.createBgClip(imgs['bg1'], 0, 150, 5, 0);
            Game.bg2 = Game.createBgClip(imgs['bg2'], 0, 50, 3, 0);
            Game.bg3 = Game.createBgClip(imgs['bg3'], 0, 0, 1, 0);
            
            //Game.heroStat.image = Game.img['zip3'];
            
            
            
            
            
            
            
            // start
            an.start('game');
        });
    });
    
})();