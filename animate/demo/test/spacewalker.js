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
        width: 300,
        height: 200,
        fps: 30
    });

    // ------------------------------------------------------------
    var Game = {
        mc: {},
        key: {up:false,down:false,left:false,right:false,space:false,z:false,x:false,c:false},
        name: 'SpaceWalker',
        mouse: false,
        images: {},
        camera: {data: null, x: 0, y: 0, width: an.width, speed: 2.5}
    };
    Game.panel = function (ctx, i) {
        an.text.write(10, 10, 'Frame: ' + i);
    };


    Game.maps = {
        'level-01': [
            1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
            1,0,0,1,1,1,0,0,0,0,0,0,0,0,1,0,0,0,1,1,
            1,0,0,0,0,0,0,0,0,1,1,1,1,0,1,0,1,0,0,1,
            1,1,1,0,0,1,1,0,0,0,0,0,1,0,0,0,1,1,0,1,
            1,0,0,0,0,0,1,0,0,1,1,0,0,0,1,1,1,1,0,1,
            1,0,1,1,1,1,1,0,0,0,1,1,1,0,1,0,0,0,0,1,
            1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,2,
            1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
        ],
        'level-02': [
            1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
            1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
            1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
            1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
            1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
            1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
            1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
            1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
        ]
    };

    Game.maps_cache = {};

    Game.addMaskMap = function (map_name, columns) {
        var ir, ic,
            column_size = 50,
            mask = Game.maps[map_name];

        for (ir = 0; ir < mask.length; ir++) {
            var x = parseInt(ir % columns) * column_size;
            var y = parseInt(ir / columns) * column_size;

            if (mask[ir] == 1) {
                an.graphic.rect(x, y, column_size, column_size);
            }
            if (mask[ir] == 2) {
                an.graphic.rect(x, y, column_size, column_size, '#f00');
            }
        }
    };

    // ctx, i


    Game.mc.shuttle = an.createMovieClip({x: an.width/2, y: an.height/2, speed: 1}, function (ctx, i) {
        an.graphic.circle(0, 0, 20, '#5952bc');
        //an.graphic.rect(-14, -25, 28, 50);

        //ctx.drawImage(Game.images.rocket, -14, -25, 28, 50);
        //if (Game.key.space) {this.rotate += 0.05}

    });

    an.frame(function(ctx, i) {
        /** @type CanvasRenderingContext2D */
        ctx = ctx;

/**/
        Game.camera.data = an.camera(Game.camera.x - 50, Game.camera.y, Game.camera.width, function () {


            if (Game.key.up) {Game.camera.y -= Game.camera.speed}
            if (Game.key.down) {Game.camera.y += Game.camera.speed}
            if (Game.key.left) {Game.camera.x -= Game.camera.speed}
            if (Game.key.right) {Game.camera.x += Game.camera.speed}

            var map = Game.addMaskMap('level-01', 20);
        });


        var shuttle = Game.mc.shuttle(ctx, i);


        Game.panel(ctx, i);

    });

    //an.backgroundColor('#04030e');
    an.text.font('bold 16px/16px sans');
    an.text.color('#4b546f');

    an.onFrame = function (ctx, i) {
        Game.mouse = an.mouseMove();
        Game.key.up = an.keyPress('KeyW') || an.keyPress('ArrowUp');
        Game.key.down = an.keyPress('KeyS') || an.keyPress('ArrowDown');
        Game.key.left = an.keyPress('KeyA') || an.keyPress('ArrowLeft');
        Game.key.right = an.keyPress('KeyD') || an.keyPress('ArrowRight');
        Game.key.space = an.keyPress('Space');
        Game.key.z = an.keyPress('KeyZ');
        Game.key.x = an.keyPress('KeyX');
        Game.key.c = an.keyPress('KeyC');
    };

    an.resource.loadImage({
        target: '/animate/demo/images/arrow_target_light.png',
        rocket: '/animate/demo/images/rocket_28x50.png'
    }, function (images) {
        Game.images = images;
        an.start();
    });
})();