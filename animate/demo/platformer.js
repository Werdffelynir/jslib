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
        fps: 30
    });

    // * Game
    // * * * * * * * * * * * * * * * * * * * * * * * *

    var Game = {
        mc: {},
        key: {up: false, down: false, left: false, right: false, space: false},
        mouse:false
    };

    Game.space = function (ctx, frame) {
        an.addGrid(100, '#61587a');
        an.text.write(10, 10, 'Frame: ' + frame, '#000000');
    };

    Game.car = an.createMovieClip({
        x: 100,
        y: 100,
        speed: 1,
        dx: 0,
        dy: 0,
        r: 0
    }, function (ctx, i) {

        if (Game.key.up) {
            this.dx += 0.3;
        } else {
            this.dx -= 0.3;
            if (this.dx < 0) this.dx = 0;
        }

        if (Game.key.left) this.r += 0.05;
        if (Game.key.right) this.r -= 0.05;

        an.text.write(100, 10, 'R: ' + this.r, '#000000');

        this.x += this.dx;
        this.y += this.dy;
        this.rotate = this.r;
        if (this.x < -100) this.x = an.width;
        if (this.x > an.width) this.x = -100;
        if (this.y < -100) this.y = an.height;
        if (this.y > an.height) this.y = -100;

        an.graphic.rectRound(0, 0, 100, 30, 5);

/*        var a = {
            x: Math.cos(this.rotate),
            y: Math.sin(this.rotate)
        };
        console.log(a);
        this.dx += a.x;
        this.dy += a.y;
        */
/*        if (Game.key.left) {
            this.rotate -= 0.1;
            this.dx += Math.cos(this.rotate);
            //this.dy -= 0.1;
        } else {
            //this.y += 0.1;
        }

        if (Game.key.right) {
            this.rotate += 0.1;
            this.dx += Math.sin(this.rotate);
            //this.dy += 0.1;
        } else {
            //this.dy -= 0.1;
            //if (this.dy < 0) this.dy = 0;
        }*/

        //if (this.dy > -0.3 && this.dy < 0.3) { this.dy = 0; }



        /*
        if (Game.key.left) {
            this.dx -= 0.3
        } else {
            this.dx += 0.3
            if (this.dx < 0) this.dx = 0;
        }
        */

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

        Game.space(ctx, i);
        Game.car(ctx, i);
        //Game.display(ctx, i);
    });

    an.onFrame = function (ctx, i) {
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
    };
    // * Load resources and game start
    // * * * * * * * * * * * * * * * * * * * * * * * *



    an.resource.loadImage({
        cursor : 'demo/images/ppw.png'
    }, function () {








        // * Start Game
        an.start('start');
    });

})();

