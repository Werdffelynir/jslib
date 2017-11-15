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
        height: 600,
        fps: 12
    });

    // * * * * * * * * * * * * * * * * * * * * * * * * *
    var Game = {
        mc: {},
        key: {up:false,down:false,left:false,right:false,space:false,z:false,x:false,c:false},
        mouse:false,
        images: {},
        mod: 1
    };

    // * * * * * * * * * * * * * * * * * * * * * * * * *
    var Filter = {};
    Filter.sepia = function(context) {
        //get image data
        var imgData = context.getImageData(0, 0, an.width, an.height),
            pxData = imgData.data,
            length = pxData.length;
        for(var x = 0; x < length; x+=4) {
            //convert to grayscale
            var r = pxData[x],
                g = pxData[x + 1],
                b = pxData[x + 2],
                sepiaR = r * .393 + g * .769 + b * .189,
                sepiaG = r * .349 + g * .686 + b * .168,
                sepiaB = r * .272 + g * .534 + b * .131;
            pxData[x] = sepiaR;
            pxData[x + 1] = sepiaG;
            pxData[x + 2] = sepiaB;
        }

        //paint sepia image back
        context.putImageData(imgData, 0, 0);
    };

    Filter.greyscale = function(context) {
        //get image data
        var imgData = context.getImageData(0, 0, an.width, an.height),
            pxData = imgData.data,
            length = pxData.length;
        for(var x = 0; x < length; x+=4) {
            //convert to grayscale
            var r = pxData[x],
                g = pxData[x + 1],
                b = pxData[x + 2],
                grey = r * .3 + g * .59 + b * .11;
            pxData[x] = grey;
            pxData[x + 1] = grey;
            pxData[x + 2] = grey;
        }
        //paint grayscale image back
        context.putImageData(imgData, 0, 0);
    };


    // * * * * * * * * * * * * * * * * * * * * * * * * *

    an.frame(function(ctx, i) {
        /** @type CanvasRenderingContext2D */
        ctx = ctx;

        ctx.drawImage(Game.images.tree, 0, 0);

        if (Game.mod === 2)
            Filter.greyscale(ctx);
        else if (Game.mod === 3)
            Filter.sepia(ctx);

    });


    an.resource.loadImage({
        tree: '/animate/demo/images/tree.jpg'
    }, function (images) {
        Game.images = images;

        // start
        an.start();
    });

    an.onKeyup = function (eve) {
        if (eve.code == "Space") {
            Game.mod ++;
            if (Game.mod > 3)
                Game.mod = 1;
        }
    };

})();