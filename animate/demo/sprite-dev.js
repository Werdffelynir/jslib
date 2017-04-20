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

    var Game = {
        mc: {},
        key: {up:false,down:false,left:false,right:false,space:false,z:false,x:false,c:false},
        mouse:false,
        images: {}
    };

    an.frame(function(ctx, i) {
        /** @type CanvasRenderingContext2D */
        ctx = ctx;

        var sprite1 = Game.sprite1();
        var sprite2 = Game.sprite2();

    });

    an.resource.loadImage({
        sprite1: '/animate/demo/images/sprite-3x2.png',
        sprite2: '/animate/demo/images/sprite-3x3.png'
    }, function (images) {
        Game.images = images;


        //58x210
        Game.sprite1 = an.createSprite({
            image: Game.images.sprite1,
            x: 10,
            y: 10,
            width: 100,
            height: 100,
            grid: [3, 2],
            indexes: [2,1,0],
            delay: 1,
            loop: true
        });

        Game.sprite2 = an.createSprite({
            image: Game.images.sprite2,
            x: 150,
            y: 10,
            width: 100,
            height: 100,
            grid: [3, 3],
            indexes: [],
            delay: 1,
            loop: false
        });

        // start
        an.start();
    });


})();