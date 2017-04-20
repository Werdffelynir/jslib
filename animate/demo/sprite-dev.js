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
        var sprite3 = Game.sprite3();
        var sprite4 = Game.sprite4();
        sprite4.rotate += 0.05;

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


        Game.sprite3 = an.createSprite({
            image: Game.images.sprite1,
            x: 290,
            y: 10,
            width: 100,
            height: 100,
            grid: [3, 2],
            indexes: [5,4,3,2,1,0],
            delay: 2,
            loop: true
        });

        Game.sprite4 = an.createSprite({
            image: Game.images.sprite1,
            x: 430 + 50,
            y: 10 + 50,
            width: 100,
            height: 100,
            grid: [3, 2],
            indexes: [3],
            delay: 0,
            loop: true,
            point: an.point(-50,-50)
        });

        // start
        an.start();
    });


})();