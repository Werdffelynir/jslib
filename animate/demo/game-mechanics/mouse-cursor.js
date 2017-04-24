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
        fps: 60
    });

    an.getCanvas().style.cursor = 'none';

    // * * * * * * * * * * * * * * * * * * * * * * * * *
    var Gm = {};
    Gm.pows = [];
    Gm.onMousemove = function (event) {};
    Gm.onClick = function (event) {
        var point = an.mousePosition(event);
        if (Gm.pows.indexOf(point) === -1)
            Gm.pows.push(point)
    };

    an.frame(function(ctx, i) {
        /** @type CanvasRenderingContext2D */
        ctx = ctx;

        var i;
        for (i = 0; i < Gm.pows.length; i ++) {
            ctx.drawImage(an.resource.getImage('cursor'), Gm.pows[i].x, Gm.pows[i].y )
        }

        var mousePosition = an.mouseMove();

        if (mousePosition)
            ctx.drawImage(an.resource.getImage('cursor'), mousePosition.x, mousePosition.y, 60, 60);

    });


    an.resource.loadImage({
        cursor : '/animate/demo/images/ppw.png'
    }, function (imgs) {

        // console.log(imgs['cursor']);
        // console.log(an.resource.getImage('cursor'));


        // start
        an.onMousemove = Gm.onMousemove;
        an.onClick = Gm.onClick;
        an.start();
    });

})();