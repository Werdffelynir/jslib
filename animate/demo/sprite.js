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
        width: 800,
        height: 400,
        fps: 24
    });

    // * * * * * * * * * * * * * * * * * * * * * * * * *

    var Game = {
        mc: {},
        key: {up:false,down:false,left:false,right:false,space:false,z:false,x:false,c:false},
        mouse:false,
        images: {}
    };


    Game.panel = function (ctx, frame) {
        an.text.write(5, 5, 'Frame: ' + frame);
    };


    Game.space = function (ctx, frame) {

    };



    an.backgroundColor('#03020f');
    an.text.color('#FFFFFF');
    an.text.font('bold 16px/16px sans');

    an.frame(function(ctx, i) {
        /** @type CanvasRenderingContext2D */
        ctx = ctx;

        an.addGrid(50, 0.35, '#FFF');

        Game.space(ctx, i);
        Game.panel(ctx, i);
    });

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

    var createSprite = function (prop) {
        
    };

    //58x210
    Game.ufo = an.createSprite({
        x: 100,
        y: 100,
        image: Game.images.ufo,
        width: 58,
        height: 210,
        grid: [12, 1],
        indexes: [0,1,2,3,4,5,6,7,8,9,10,11],
        delay: 2
    });

    Game.sp = an.createSprite({
        x: 100,
        y: 100,
        image: Game.images.sprite,
        width: 100,
        height: 100,
        grid: [3, 3],
        indexes: [0,1,2,3,4,5,6,7,8],
        delay: 1
    });

    Game.sp = an.createSprite({
        x: 100,
        y: 100,
        image: Game.images.sprite,
        width: 100,
        height: 100,
        grid: [3, 3],
        delay: 1,
        loop: false
    });
    
    an.resource.loadImage({
        ufo: '/animate/demo/images/ufo.gif',
        sprite: '/animate/demo/images/sprite-3x3.png',
        rocket: '/animate/demo/images/rocket_28x50.png'
    }, function (images) {
        Game.images = images;

        // start
        an.start();
    });

    // * Оперделения нажатие кнопок мыши
    // * Отключения контекстного меню
    // * * * * * * * * * * * * * * * * * * * * * * * *
    document.addEventListener('mousedown', function(event) {
        var which = [];
        which[1] = 'Left Mouse button pressed.';
        which[2] = 'Middle Mouse button pressed.';
        which[3] = 'Right Mouse button pressed.';

        console.log('Which: ' + (which[event.which] ? which[event.which] : 'You have a strange Mouse!'), event);
        return false;
    });
    document.addEventListener('contextmenu', function(event) {
        console.log('Context menu is disabled');
        event.preventDefault();
    }, false);

})();