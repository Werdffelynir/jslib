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
        fps: 24
    });

    an.text.font('bold 18px/18px sans');
    an.text.color('#FFFFFF');
    // * * * * * * * * * * * * * * * * * * * * * * * * *

    var Gm = {
        images:{},
        mouse:false
    };

    an.frame(function(ctx, i) {
        /** @type CanvasRenderingContext2D */
        ctx = ctx;
        Gm.mouse = an.mouseMove();

        Gm.noise(ctx, i);
    });

    Gm.niose_imagedata = an.getContext().createImageData(an.width, an.height);
    Gm.niose_i = 0;
    Gm.niose_data = [];
    Gm.noise = function (ctx, frame) {

        an.backgroundColor('#03020f');

        if (Gm.niose_data.length < 50) {
            var i, color;
            for (i = 0; i < Gm.niose_imagedata.data.length; i += 4)
            {
                color = an.random(0,1) ? 255 : 0;
                Gm.niose_imagedata.data[i+0] = color;
                Gm.niose_imagedata.data[i+1] = color;
                Gm.niose_imagedata.data[i+2] = color;
                Gm.niose_imagedata.data[i+3] = 55;
            }
            ctx.putImageData(Gm.niose_imagedata, 0, 0);

            Gm.niose_data.push(ctx.getImageData(0, 0, an.width, an.height));
            an.text.write(10, 10, 'GENERATE: ' +  Gm.niose_data.length);
        }
        else {
            if (Gm.niose_i < Gm.niose_data.length) {
                if (Gm.niose_data[Gm.niose_i] instanceof ImageData) {
                    ctx.putImageData(Gm.niose_data[Gm.niose_i], 0, 0);
                }

                Gm.niose_i ++;
                an.text.write(10, 10, 'FRAME: ' +  Gm.niose_i);

                if (Gm.niose_i >= Gm.niose_data.length) {
                     Gm.niose_i = 0;}
            }
            an.text.write(10, 10, 'FRAME: ' +  Gm.niose_i);
        }
    };

    // start
    an.start();
})();

/*
 var ctx = an.getContext();
 var img = ctx.createImageData(an.width, an.height);
 console.log(img);
 var i, color;
 for (i = 0; i < img.data.length; i += 4)
 {
 color = an.random(0,1) ? 255 : 0;
 img.data[i+0] = color;
 img.data[i+1] = color;
 img.data[i+2] = color;
 img.data[i+3] = 255;
 }
 ctx.putImageData(img,10,10);*/