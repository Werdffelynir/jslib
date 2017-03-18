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
    var Game = {images:{}};

    // asteroids
    // flying
    // rocket
    an.frame(function(ctx, i){

        Game.sprite();
        Game.sprite.y -= 5;

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

        Game.sprite = an.createSprite({
            x: 200,
            y: 300,
            width: 57,
            height: 100,
            point: an.point(-28, -50),
            image: Game.images['rocket'],
            grid: [1, 1],
            indexes: [0,1,2,3],
            delay: 1
        });

        //console.dir(Game.sprite);






        // start
        an.start();
    });
})();