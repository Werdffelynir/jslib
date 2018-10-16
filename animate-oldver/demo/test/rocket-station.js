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
        width: 960,
        height: 600,
        fps: 24
    });

    an.text.font('bold 18px/18px sans');
    an.text.color('#FFFFFF');
    // * * * * * * * * * * * * * * * * * * * * * * * * *

    var Gm = {
        mouse:false
    };
    Gm.cache = {};
    Gm.cache.start = false;
    Gm.cache.shuttle = false;

    Gm.space = function (ctx, frame) {
        an.backgroundColor('#03020f');

        Gm.ground();





    };

    Gm.ground = an.createMovieClip({}, function () {
        var g = [30,505,60,480,105,530,170,530,195,505,210,420,260,475,270,530,300,445,325,545,360,395,420,580,500,580,485,440,580,490,670,470,625,530,700,520,740,535,730,440,780,485,800,535,880,505,905,535,910,465,960,465,955,410,1020,280,1020,605,-5,605,-5,320];
        var g2 = [40,515,65,490,90,540,175,540,200,515,215,430,220,485,225,540,305,570,330,555,365,405,410,590,505,590,490,450,585,515,645,500,630,540,705,540,755,560,735,450,755,495,805,560,885,515,900,560,920,515,965,475,970,420,1025,290,1025,615,0,615,0,330];

        an.graphic.shape(g, '#f7e642', true, true, 5);
        an.graphic.shape(g2, '#bf2511', true, true, 5);

    });

    Gm.mcShuttle = an.createMovieClip({
        x:100,
        dx:0.001,
        dx_max:1.5,
        y:100,
        rotate:0,
        dr:0,
        acceleration: 0.01,
        da:0,
        da_def:0.1,
        speed:0.04
    }, function (ctx, frame) {

        if (!Gm.images || !Gm.images['rocket']) return;

        var img = Gm.images['rocket'];

        if (this.y > an.height) {
            this.y = 0;
            this.da = this.da_def;
        }
        if (this.x > an.width) {
            this.x = 0;
        }
        if (this.x < -100) {
            this.x = an.width;
        }

        // - - - - - - - - - - - - - - - - - - - - - - - - - -
        if (an.keyPress('KeyW')) {
            this.da -= this.speed;
        }
        else if (an.keyPress('KeyS')) {
            this.da += this.speed;
        }

        if (an.keyPress('KeyD')) {
            this.dx += this.acceleration * 0.95;
            this.dr += this.acceleration / 200;
        }
        else if (an.keyPress('KeyA')) {
            this.dx -= this.acceleration * 0.95;
            this.dr -= this.acceleration / 200;
        }

        // - - - - - - - - - - - - - - - - - - - - - - - - - -

        //console.log(this.dx / 30);

        if (this.dx > this.dx_max) this.dx = this.dx_max;
        if (this.dx < -this.dx_max) this.dx = -this.dx_max;

        if (this.da > this.dx_max) this.da = this.dx_max;
        if (this.da < -this.dx_max) this.da = -this.dx_max;

        this.y += (this.da += this.acceleration);
        this.x += this.dx;

        this.rotate += this.dr;
        if (this.rotate < -0.3) {
            this.rotate = -0.3;
            if (this.dr != 0) this.dr = 0;
        }
        if (this.rotate > 0.3) {
            this.rotate = 0.3;
            if (this.dr != 0) this.dr = 0;
        }

        // run RIGHT/LEFT
        if ( this.rotate > 0 ) {
            this.dx += 0.005;
        } else {
            this.dx -= 0.005;
        }

        //if (this.rotate < 0.001 || this.rotate > -0.001) this.rotate = 0;

        // - - - - - - - - - - - - - - - - - - - - - - - - - -
        ctx.drawImage(img, - img.width/2, -img.height/2);
    });

    Gm.shuttle = function (ctx, frame) {
        var sht =  Gm.mcShuttle(ctx, frame);









    };

    // Gm.cursor = function (ctx, frame) {
    //
    //     if (Gm.images && Gm.images['target']) {
    //         var img = Gm.images['target'];
    //         ctx.drawImage(img, Gm.mouse.x - img.width/2, Gm.mouse.y - img.height/2);
    //     }
    //
    // };


    an.frame(function(ctx, i) {
        /** @type CanvasRenderingContext2D */
        ctx = ctx;
        Gm.mouse = an.mouseMove();

        Gm.space(ctx, i);
        Gm.shuttle(ctx, i);
        //Gm.cursor(ctx, i);
    });

    an.resource.loadImage({
        target: '/animate-oldver/demo/images/arrow_target_light.png',
        rocket: '/animate-oldver/demo/images/rocket.png'
    }, function (images) {
        Gm.images = images;

        console.log('IMAGES >> ', Gm.images);

        //an.getCanvas().style.cursor = 'none';

        // start
        an.start();
    });

    // start
    //an.start();



/*    document.addEventListener('mousedown', function(event) {
        var whichs = [];
        whichs[1] = 'Left Mouse button pressed.';
        whichs[2] = 'Middle Mouse button pressed.';
        whichs[3] = 'Right Mouse button pressed.';
        console.log('Which: ' + (whichs[event.which] ? whichs[event.which] : 'You have a strange Mouse!'), event);
        return false;
    });
    document.addEventListener('contextmenu', function(event) {
        console.log('Context menu is disabled');
        event.preventDefault();
    }, false);*/

})();




/*        if (an.keyPress('KeyD')) {
 this.rotate += 0.005;
 if (this.rotate > 0.3) this.rotate = 0.3;

 this.x += (this.dx += this.acceleration);

 }

 else if (an.keyPress('KeyA')) {
 this.rotate += -0.005;
 if (this.rotate < -0.3) this.rotate = -0.3;

 this.x -= (this.dx += this.acceleration);

 }
 else {
 this.dx = 0.001;
 }*/