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
        fps: 12
    });

    // * * * * * * * * * * * * * * * * * * * * * * * * *
    var Liner = {
        speed: 2,
        cursor: an.point(0,0)
    };

    Liner.draw = function(fromPoint, toPoint){
        var xDiff = toPoint.x - fromPoint.x;
        var yDiff = toPoint.y - fromPoint.y;
        var angle = Math.atan2(yDiff, xDiff);
        Liner.cursor.x = Liner.speed * Math.cos(angle);
        Liner.cursor.y = Liner.speed * Math.sin(angle);
    };

    Liner.p1 = an.point(100,100);
    Liner.p2 = an.point(200,200);

    an.frame(function(ctx, i){

        Liner.draw(Liner.p1, Liner.p2);

        console.log(Liner.cursor);

        an.Graphic.line(Liner.p1, Liner.p2);


        if (i > 300)
            an.stop();
    });

    // start
    an.start();
})();