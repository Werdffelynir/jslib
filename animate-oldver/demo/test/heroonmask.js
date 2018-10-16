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
        width: 800,
        height: 300,
        fps: 60
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
        an.text.write(140, 5, 'HX: ' + Game.mc.hero.x + ' HY: ' + Game.mc.hero.y + ' Hit: ' + (Game.mc.hero.hit?'Yes':'No'));
    };

    Game.mc = {};
    //Game.mc.mask_cache = false;
    Game.mc.mask = an.maskmap.create([
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ], 16, 50);
    Game.mc.mask.cache = false;


    Game.mc.gameBackground = function (ctx) {
        if (!Game.mc.mask.cache) {
            an.maskmap.render(Game.mc.mask, function (x, y, item, i, map) {
                if (item == 0) {
                    an.graphic.rect(x, y, 50, 50, '#efefef');
                }
                if (item == 1) {
                    an.graphic.rect(x, y, 50, 50, '#000');
                }
            });
            Game.mc.mask.cache = ctx.getImageData(0, 0, an.width, an.height);
        } else {
            ctx.putImageData(Game.mc.mask.cache, 0, 0);
        }

        Game.mc.hero.hit = Game.mc.hero.isHit(Game.mc.hero.x, Game.mc.hero.y);
        if (!Game.mc.hero.hit) {
            Game.mc.hero.x_tmp = Game.mc.hero.x;
            Game.mc.hero.y_tmp = Game.mc.hero.y;
        }
    };


    Game.mc.hero = function (ctx, frame) {
        /** @type CanvasRenderingContext2D */
        ctx = ctx;

        // hero control
        if (!Game.mc.hero.hit) {
            if (Game.key.left &&
                !Game.mc.hero.isHit(Game.mc.hero.x - Game.mc.hero.radius - Game.mc.hero.speed, Game.mc.hero.y)) {
                Game.mc.hero.x -= Game.mc.hero.speed;
            } else if (Game.key.right &&
                !Game.mc.hero.isHit(Game.mc.hero.x + Game.mc.hero.radius + Game.mc.hero.speed, Game.mc.hero.y)) {
                Game.mc.hero.x += Game.mc.hero.speed;
            }
            if (Game.key.up &&
                !Game.mc.hero.isHit(Game.mc.hero.x, Game.mc.hero.y - Game.mc.hero.radius - Game.mc.hero.speed))  {
                Game.mc.hero.y -= Game.mc.hero.speed;
            } else if (Game.key.down &&
                !Game.mc.hero.isHit(Game.mc.hero.x, Game.mc.hero.y + Game.mc.hero.radius + Game.mc.hero.speed)) {
                Game.mc.hero.y += Game.mc.hero.speed;
            }
        } else {
            Game.mc.hero.x = Game.mc.hero.x_tmp;
            Game.mc.hero.y = Game.mc.hero.y_tmp;
        }

        ctx.beginPath();
        ctx.fillStyle = '#ea1700';
        ctx.arc(Game.mc.hero.x, Game.mc.hero.y, Game.mc.hero.radius, 0, Math.PI * 2);
        ctx.fill();
    };

    Game.mc.hero.x = 125;
    Game.mc.hero.y = 125;
    Game.mc.hero.speed = 3;
    Game.mc.hero.radius = 20;
    Game.mc.hero.hit = false;
    Game.mc.hero.x_tmp = 0;
    Game.mc.hero.y_tmp = 0;
    Game.mc.hero.isHit = function (x, y) {
        var ctx = an.getContext();
        var bit = ctx.getImageData(x, y, 1, 1);
        return bit.data[0]+bit.data[1]+bit.data[2] < 700;
    };

    Game.mc.item = function () {

    };

    Game.space = function (ctx, frame) {
        /** @type CanvasRenderingContext2D */
        ctx = ctx;
    };

    // an.backgroundColor('#03020f');
    // an.text.color('#FFFFFF');
    an.text.font('bold 16px/16px sans');

    an.frame('map', function(ctx, i) {
        /** @type CanvasRenderingContext2D */
        ctx = ctx;
        // an.addGrid(50, 0.35, '#FFF');

        Game.mc.gameBackground(ctx);
        Game.mc.hero(ctx, i);



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

    an.resource.loadImage({
        rocket: '/animate-oldver/demo/images/rocket_28x50.png'
    }, function (images) {
        Game.images = images;

        // start
        an.start('map');
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