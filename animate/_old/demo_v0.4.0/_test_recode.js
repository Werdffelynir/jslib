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

    // * * * * * * * * * * * * * * * * * * * * * * * * *
    Game = {};

    Game.heroClip = an.createMovieClip({
        x: 10
    }, function (ctx, i) {
        /** @type CanvasRenderingContext2D */
        ctx = ctx;

        //console.log(ctx, i);
        // console.log(an.text);
        // an.graphic.rect(this.x, 10, 100, 20, 'red');
        // an.text.position(this.x + 5, 14);
        // an.text.font('12px/14px sans');
        // an.text.write('Hello animate');

        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, 10, 100, 20);
    });

    an.frame('game', function(ctx, i){
        /** @type CanvasRenderingContext2D */
        ctx = ctx;

        // var clip = Game.heroClip(ctx, i);
        // clip.x += 5;
        // console.log(clip);

    });
    
    an.resource.loadImage({
        rocket: '/animate/demo/images/rocket.png',
        flying: '/animate/demo/images/flying.png'
    }, function (list) {
        console.log('loadImage', list);
    });

    an.resource.loadAudio({
        dominictreis: '/animate/demo/images/dominictreis.mp3'
    }, function (list) {
        console.log('loadAudio', list);
    });


    NSA.domLoaded(function () {
        // var a = NSA.createElement('audio');
        // a.src = '/animate/demo/images/dominictreis.mp3';
        // a.load();
        // a.onload = function (e) {
        //     console.log(a, e);
        // };

        //var audio =  document.createElement('audio');




        // audio.play();
        //
        // console.dir( );


    });

/*    Game.img = {};
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
    });*/

    // start
    an.start('game');
})();