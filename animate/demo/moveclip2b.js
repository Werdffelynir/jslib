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
        fps: 24
    });

    // * * * * * * * * * * * * * * * * * * * * * * * * *
/*
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
            // draw image
            ctx.save();
            ctx.translate(this.x, this.y);
            console.log('translate', this.x, this.y);

            if (this.transform) {
                CanvasRenderingContext2D.prototype.setTransform.apply(ctx, this.transform);}
            if (this.rotate) {
                ctx.rotate(this.rotate);}
            if (this.scale) {
                CanvasRenderingContext2D.prototype.scale.apply(ctx, this.scale);}

            callback.apply(this, arguments);
            ctx.restore();
        };

        clip = an.Clip(options, func, thisInstance);

        return clip;
    };
*/


    var movieclipStat = {
        x: 150,
        y: 150,
        accelerate: 0.2,
        hit: false
    };
    var movieclip = an.MovieClip(movieclipStat, function (ctx, i) {
        //console.log('clip', this.rotate);
        ctx.fillStyle = '#5855f7';
        ctx.fillRect(-25, -25, 50, 50);

        ctx.fillStyle = '#f7001a';
        ctx.fillRect(0, 0, 50, 50);

        ctx.fillStyle = '#9ef700';
        ctx.fillRect(-15, 15, 50, 50);
    });

/*    var clipStat = {
        x: 100,
        y: 100,
        speed: 2
    };
    var clip = an.Clip(clipStat, function (ctx, i) {
        console.log('clip', this.x, clip.x);
        ctx.fillStyle = '#f7e642';
        ctx.fillRect(10, 10, 50, 50);
    });*/


    an.frame(function(ctx, i){



        // var c = clip(ctx, i);movieclipStat.rotate +=
        // clip.x ++;          // статическое
        // clipStat.x += 0.1;  // влияет на this

        //movieclipStat.alpha = 0.5;
        movieclip(ctx, i);
        if (!movieclipStat.rotate) movieclipStat.rotate = 0;
        movieclipStat.rotate += (0.5 * Math.PI / 180);

        if (i == 1) {
            movieclipStat.composite = 'multiply';
        }
        if (i == 10) {
            movieclipStat.alpha = 0.1;
        }
        if (i == 20) movieclipStat.alpha = 0.8;
        if (i == 30) movieclipStat.alpha = 0.4;
        if (i == 40) {
            movieclipStat.alpha = 0.6;
            movieclipStat.composite = 'soft-light';
        }
        if (i == 50) {
            movieclipStat.alpha = 0.7;
        }
        if (i == 60) {
            movieclipStat.alpha = 0.2;
        }
        if (i == 70) {
            movieclipStat.alpha = 0.9;
        }

        if (i > 200) {
            //console.log(c);
            an.stop();
        }
    });


    // start
    an.start();





/*    var clip = an.Clip({
        x: 100,
        y: 100,
        speed: 2
    }, function (ctx, i) {
        console.log('clip', this.x, clip.x);
        ctx.fillStyle = '#f7e642';
        ctx.fillRect(10, 10, 50, 50);
    });*/
})();