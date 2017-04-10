
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

    // ------------------------------------------------------------
    var Game = {
        name: 'SpaceWalker Game'
    };

    Game.changeAngle = function (rotate, deg) {
        var a = 0;
        if (an.radiansToDegrees(rotate) > deg) {
            a = -0.04;
        } else {
            a =  0.04;
        }
        //console.log(an.radiansToDegrees(rotate) > deg, a);
        rotate += a;
        return rotate;
    };

    // ##### shuttle
    Game.shuttle = an.createMovieClip({
        x: an.width/2,
        y: an.height/2,
        r: 0,
        dr: 0,
        dspeed: 0.0525,
        rotate: 0,
        space_point: {}
    },
        function (ctx, frame) {
            var pp = [-30,30,0,-35,25,30,0,10];




            if (Game.go_left) {
                this.rotate = Game.changeAngle(this.rotate, -90)
            } else if (Game.go_right) {
                this.rotate = Game.changeAngle(this.rotate, 90)
            }

            if (Game.go_up) {
                this.rotate = Game.changeAngle(this.rotate, 0)
            } else if (Game.go_down) {
                this.rotate = Game.changeAngle(this.rotate, 180)
            }

            if (this.rotate > Math.PI*2) this.rotate = 0;
            else if (this.rotate < -Math.PI*2) this.rotate = 0;


            an.graphic.shape(pp, 'rgba(75,85,115,0.1)', 'rgba(75,85,115,1)', true, 4);
            //console.log(Game.changeAngle(this.rotate, 90));

            //[-35,-25,25,0,-35,25,-25,0];//

            // console.log(this.rotate, Math.PI / 2);
            // if (this.dr > Math.PI*2 || this.dr < -Math.PI*2 ) {this.dr = 0;}

             if (Game.go_left) {
                 //if (this.dr) Game.mcMove
                 //console.log(Game.mcMove);
                // if (this.dr > Math.PI);
                //    this.dr -= this.dspeed;
             } else if (Game.go_right) {
                // if (this.dr < -Math.PI);
                 //   this.dr += this.dspeed;
             }/**/
            if (Game.mcMove) {}

                //var pps = an.calculateAngle(
                //    an.point(Game.mcMove.x, Game.mcMove.y),
                //    an.point(this.x, this.y)
                //);
                //this.rotate =  pps.angle;

                //console.log('mcMove',Game.mcMove);
            //console.log(Game.Camera.x, Game.Camera.y);
            // this.x = angle.x;
            // this.y = angle.y;
            //if ()
            // //.angle > Math.PI*2 || angle.angle < -Math.PI*2 ? ;
            //
            // console.log(pps.angle);


/*            if (this.rotate > Math.PI*2) this.rotate = 0;
            else if (this.rotate < -Math.PI*2) this.rotate = 0;

            if (this.dr > 0.15) this.dr = 0.15;
            if (this.dr < -0.15) this.dr = -0.15;

            this.rotate += this.dr; //Math.PI;*/

            //this.dr;
            //var a = an.calculateAngle({x:this.x, y:this.y}, Game.Camera);
            //this.space_point = Game.moveConf;
            //console.log(a);
            //this.rotate = a.angle;
            //Game.suttle.space_point = false;

           // an.graphic.shape(pp, 'rgba(75,85,115,0,1)', 'rgba(75,85,115,0,1)', true, true);
        }
    );



    // ##### move
    // ------------------------------------------------------------
    Game.moveConf = {
        x: 0,
        y: 0,
        dx: 0,
        dy: 0,
        speed: 0.15
    };
    Game.move = an.createClip (Game.moveConf, function () {

        if (Game.go_up) {
            this.dy -= this.speed;
        }
        if (Game.go_down) {
            this.dy += this.speed;
        }
        if (Game.go_left) {
            this.dx -= this.speed;
        }
        if (Game.go_right) {
            this.dx += this.speed;
        }

        if (this.dx > 5) this.dx = 5;
        if (this.dx < -5) this.dx = -5;
        if (this.dy > 5) this.dy = 5;
        if (this.dy < -5) this.dy = -5;

        Game.Camera.x += this.dx;
        Game.Camera.y += this.dy;
        return this;
    });



    // ##### space
    // ------------------------------------------------------------


    Game.space = an.createMovieClip({
        x: an.width/2,
        y: an.height/2,
        //minSize: -500,
        //maxSize: 1000,
        objects: false
    }, function (ctx, frame) {
        var i;
        var c_obj = function (x, y) {
            return an.createClip({
                    x:x,
                    y:y,
                    color:'#4b546f',
                    radius: an.random(5, 100)
                },
                function (ctx, i) {

                    //ctx.beginPath();
                    an.graphic.circle(this.x, this.y, this.radius, this.color, true);


                    var rect = [
                        (this.x ) - Game.Camera.x,
                        (this.y ) - Game.Camera.y,
                        this.radius,
                        this.radius
                    ];
                    //ctx.rect(this.x, this.y, this.radius/2, this.radius);
                    if (an.hitTest(rect, {x:0, y:0})) {
                        this.color = '#9fb2eb';
                    }
       /*             console.log('R',
                        this.radius,
                        this.x - Game.Camera.x ,
                        this.y - Game.Camera.y
                    );*/
                    // console.log(this.x - 1000 - (an.width/2), this.y - 1000 - (an.height/2) );

                    // ctx.beginPath();
                    //ctx.fillStyle = this.color;
                    //ctx.fillRect(this.x, this.y, this.radius, this.radius);
                    // //ctx.stroke();
                    // ctx.fill();
                    // ctx.closePath();

                    //console.log('>>>', this.x, this.y, Game.Camera.x, Game.Camera.y);

                    // if (an.hitTest(
                    //         [this.x-this.radius + Game.Camera.x, this.y-this.radius + Game.Camera.y, this.radius, this.radius],
                    //         {x:this.x, y:this.y})) {
                    //     this.color = '#9fb2eb';
                    // }
                    return this;
                });
        };
        if (!this.objects) {
            this.objects = [];
            for (i = 0; i < 200; i ++) {
                this.objects.push(c_obj(
                    an.random(0, 3000),
                    an.random(0, 3000)
                ));
            }
        }

        for (i = 0; i < this.objects.length; i ++) {
            if (typeof this.objects[i] === 'function'){
                this.objects[i](ctx, frame);
            }
        }


    });



    // ##### Camera
    // ------------------------------------------------------------
    Game.Camera = {
        x:500,
        y:500,
        width:
        an.width,
        data: null
    };

    Game.mcMove = null;
    Game.mcSpace = null;
    Game.mcShuttle = null;

    an.frame(function(ctx, i) {
        /** @type CanvasRenderingContext2D */
        ctx = ctx;

        Game.i = i;
        Game.mcShuttle = Game.shuttle();
        Game.go_left = an.keyPress('KeyA');
        Game.go_right = an.keyPress('KeyD');
        Game.go_up = an.keyPress('KeyW');
        Game.go_down = an.keyPress('KeyS');

        Game.Camera.data = an.camera(Game.Camera.x, Game.Camera.y, Game.Camera.width, function () {
            //console.log(Game.Camera.width);
            Game.mcMove = Game.move();
            Game.mcSpace = Game.space();

            //console.log(Game.Camera);
        });

        an.text.write(10, 10, 'Angle: ' + Game.mcShuttle.rotate);

    });

    an.text.font('bold 16px/16px sans');
    an.text.color('#4b546f');
    //an.backgroundColor('#04030e');
    an.resource.loadImage({
        target: '/animate/demo/images/arrow_target_light.png',
        rocket: '/animate/demo/images/rocket.png'
    }, function (images) {
        Game.images = images;
        an.start();
    });
})();