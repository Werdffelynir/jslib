(function () {
    var node = {
        menu: NSA.queryAll('#menu'),
        page: NSA.query('#page'),
        desc: NSA.query('#description'),
        move: NSA.query('#move'),
        after: NSA.query('#after')
    };

    var An = new Animate({
        selector: '#canvas',
        width: 600,
        height: 400,
        fps: 30
    });

    // * * * * * * * * * * * * * * * * * * * * * * * * *

    An.frame(function(ctx, i) {
        /** @type CanvasRenderingContext2D */
        ctx = ctx;

        console.log(ctx, i);

        if (i > 100)
            An.stop();
    });

    // start
    An.start();
})();