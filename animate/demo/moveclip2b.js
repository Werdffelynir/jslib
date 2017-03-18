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
    var MovieClip2 = function (options, callback, thisInstance) {
        var clip, key, ctx = an.getContext();

        var default_options = {
            x: 0,
            y: 0,
            transform: false,
            rotate: false,
            scale: false
        };

        for (key in default_options) {
            if (options[key] === undefined)
                options[key] = default_options[key];
        }

        var func = function () {

        };

        clip = an.Clip(options, func, thisInstance);

        return clip;
    };


    var mcProperties = {
        accelerate: 0.2,
        hit: false
    };
    var mc = MovieClip2(mcProperties, function (ctx, i) {

    });

    var clip = an.Clip({
        x: 100,
        y: 100,
        speed: 2
    }, function (ctx, i) {
        console.log('clip', this.x, clip.x);
        ctx.fillStyle = '#f7e642';
        ctx.fillRect(10, 10, 50, 50);
    });


    an.frame(function(ctx, i){
        // var mcSelf = mc(ctx, i);
        // console.dir(mc);
        //mcProperties.accelerate += 0.25;
        //console.log(ctx, i);

        clip(ctx, i);
        clip.x ++;

        if (!clip.rotate)
            clip.rotate = 0;
        clip.rotate += (2 * Math.PI / 180);

        if (i > 100)
            an.stop();
    });

    // start
    an.start();
})();