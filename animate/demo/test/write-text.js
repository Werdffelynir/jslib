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
        width: 600,
        height: 400,
        fps: 0
    });

    // * * * * * * * * * * * * * * * * * * * * * * * * *

    an.frame(function(ctx, i) {
        /** @type CanvasRenderingContext2D */
        ctx = ctx;

        // var style = {
        //
        // };
        // an.Text.style('mango');
        // an.Text.style('linux');
        // an.Text.style('simple');
        an.Text.write(10, 10, 'Hello Canvas Text');

        // var textHello = an.Text(10,10,'Hello Canvas Text').write();
        // textHello.x = 100;
        // textHello.y = 100;
        // textHello.write();
        // console.log(ctx, i);
        if (i > 100)
            an.stop();
    });

    // start
    an.start();
})();