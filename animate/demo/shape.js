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
        fps: 1
    });

    // * * * * * * * * * * * * * * * * * * * * * * * * *




/*
    var Point = function (x, y) {
        var point = {x: x, y: y, index:null};
        point.index = Point._list.push(point);
        return point;
    };
    Point._list = [];*/

    var p1 = an.Point(10,10);
    var p2 = an.Point(50,100);
    var p3 = an.Point(100,150);
    //console.log(p1,p2,p3);

    var r1 = an.Rectangle(0,   10, 90, 20);
    var r2 = an.Rectangle(100, 10, 90, 30);
    var r3 = an.Rectangle(200, 10, 90, 40);
    //console.log(r1,r2,r3);


/*    var mc = Shape({
        x: 100,
        y: 100,
        speed: 2,
        move: { up: false, down: false, left: false, right: false },
        gold: 0,
        health: 100
    }, function (ctx, i) {
        console.dir('MoveClip',ctx, i);
    });*/

    //console.dir(mc);

    var Shape = function (options, callback) {
        callback = callback.bind({});

        for (var key in options) {
            callback[key] = options[key];
        }

        return callback;
    };

    var sh = Shape({
        x: 100,
        y: 100,
        speed: 2
    }, function (ctx, i) {
        //console.log(this.x);
        //console.log(sh1.x);
        //console.log(ctx, i);
        ctx.fillStyle = '#f7e642';
        ctx.fillRect(10, 10, 50, 50);
    });


    //var callback = callback.bind(options);
    var Sprite = function (options, callback) {
        var key, ctx = an.getContext();

        var _options = {
            x: 0,
            y: 0,
            transform: false,
            rotate: false,
            scale: false
        };

        for (key in options) {
            _options[key] = options[key];
        }

        var _sprite = function () {

            // draw image
            ctx.save();
            ctx.translate(_sprite.x, _sprite.y);

            if (_sprite.transform) {
                CanvasRenderingContext2D.prototype.setTransform.apply(ctx, _sprite.transform);
            }
            if (_sprite.rotate) {
                ctx.rotate(_sprite.rotate);
            }
            if (_sprite.scale) {
                CanvasRenderingContext2D.prototype.scale.apply(ctx, _sprite.scale);
            }

            callback.apply({}, arguments);

            ctx.restore();
        };

        for (key in _options) {
            _sprite[key] = _options[key];
        }

        return _sprite;
    };

    var sp1 = Sprite({
        x: 100,
        y: 100,
        speed: 2
    }, function (ctx, i) {
        /** @type CanvasRenderingContext2D */
        ctx = ctx;
        ctx.fillStyle = 'red';
        ctx.fillRect(0,0,200,20);
        ctx.fillStyle = 'black';
        ctx.fillRect(-10,0,10,20);


        //console.log(ctx);
        //console.log(this);
        //console.log(this.x);
        //console.log(sh1.x);
        //console.log(ctx, i);
    });
    console.dir(sp1);

    // * * * * * * * * * * * * * * * * * * * * * * * * *
    an.frame(function(ctx, i){

        //console.log(ctx, i);
        //sh1(ctx, i);
        sh(ctx, i);
        sp1(ctx, i);


        sp1.x ++;
        if (!sp1.rotate) sp1.rotate = 0;
        sp1.rotate += (2 * Math.PI / 180);
        //sh1.x += 3;

        if (i > 100)
            an.stop();
    });

    // start
    an.start();
})();