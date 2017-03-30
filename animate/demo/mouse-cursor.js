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
        fps: 60
    });

    // * * * * * * * * * * * * * * * * * * * * * * * * *
    an.getCanvas().style.cursor = 'none';

    an.frame(function(ctx, i) {
        /** @type CanvasRenderingContext2D */
        ctx = ctx;

        //var mousePosition = an.mousePosition();
        var mousePosition = an.mousePress();
        //console.log(mousePosition);
        if (mousePosition)
            ctx.drawImage(an.resource.getImage('cursor'), mousePosition.x, mousePosition.y, 60, 60);

        // console.log(ctx, i);
        // if (i > 100)
        //     an.stop();
    });


    an.resource.loadImage({
        cursor : 'demo/images/ppw.png'
    }, function (imgs) {

        console.log(imgs['cursor']);
        console.log(an.resource.getImage('cursor'));

        // start
        an.start();
    });

})();