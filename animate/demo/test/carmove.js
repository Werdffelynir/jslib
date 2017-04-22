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
        height: 400,
        fps: 30
    });

    // * Game
    // * * * * * * * * * * * * * * * * * * * * * * * *

    var Game = {
        mc: {},
        key: {},
        mouse:false
    };

    Game.mc.car = an.createMovieClip({
        x: 100,
        y: 100,
        xmov: 0,
        ymov: 0,
        width: 60,
        height: 20,
        speed: 1.5
    }, function (ctx, box) {
        /** @type CanvasRenderingContext2D */
        ctx = ctx;
        if (Game.mouse)
            box = Game.mouse;

        an.graphic.rect(-(this.width/2), -(this.height/2), this.width, this.height, '#626e91');
        an.graphic.rect(this.width/3, -(this.height/2), this.width/5, this.height, '#524a67');

        this.rotate = Math.atan2(box.y-this.y, box.x-this.x);
        this.xmov = Math.cos(this.rotate);
        this.ymov = Math.sin(this.rotate);
        if (an.distanceBetween(this, box) > 5) {
            this.x += this.xmov * this.speed;
            this.y += this.ymov * this.speed;
        }
    });

    Game.mc.box = an.createMovieClip({
        x: 750,
        y: 350,
        r: 20,
        c: '#abb5da'
    }, function (ctx) {
        if (Game.mouse) {
            this.x = Game.mouse.x;
            this.y = Game.mouse.y;
        }
        an.graphic.circle(0, 0, this.r-10, this.c);
        an.graphic.circle(0, 0, this.r, this.c, false);
        an.graphic.circle(0, 0, this.r+10, this.c, false);
        an.graphic.circle(0, 0, this.r+20, this.c, false);
    });

    Game.space = function (ctx, frame) {
        an.addGrid(100, '#61587a');

        if (Game.mcCar &&  Game.mcBox) {
            ctx.strokeStyle = '#abb5da';
            ctx.beginPath();
            ctx.moveTo(Game.mcBox.x, Game.mcBox.y);
            ctx.lineTo(Game.mcCar.x, Game.mcCar.y);
            ctx.stroke();
        }

        Game.mcBox = Game.mc.box(ctx);
        Game.mcCar = Game.mc.car(ctx, Game.mcBox);


        an.text.write(10, 10, 'Frame: ' + frame, '#000000');
    };

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


    // * Default
    // * * * * * * * * * * * * * * * * * * * * * * * *
    //an.backgroundColor('#03020f');
    an.text.font('bold 18px/18px sans');
    an.text.color('#FFFFFF');

    // * Frames
    // * * * * * * * * * * * * * * * * * * * * * * * *
    an.frame('start', function(ctx, i) {
        /** @type CanvasRenderingContext2D */
        ctx = ctx;
        var mouse = an.mousePress();
        if (mouse && mouse !== Game.mouse)
            Game.mouse = mouse;

        Game.key = {
            up: an.keyPress('KeyW') || an.keyPress('ArrowUp'),
            down: an.keyPress('KeyS') || an.keyPress('ArrowDown'),
            left: an.keyPress('KeyA') || an.keyPress('ArrowLeft'),
            right: an.keyPress('KeyD') || an.keyPress('ArrowRight'),
            space: an.keyPress('Space')
        };

        Game.space(ctx, i);
    });

    // * Load resources and game start
    // * * * * * * * * * * * * * * * * * * * * * * * *

    an.resource.loadImage({
        cursor : '/animate/demo/images/ppw.png'
    }, function () {

        // * Start Game
        an.start('start');
    });

})();

