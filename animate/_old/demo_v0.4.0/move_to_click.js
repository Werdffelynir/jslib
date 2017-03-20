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

    function anglePoints(p1, p2, step) {
        var xDiff = p2.x - p1.x; //(p2.x > p1.x) ? p2.x - p1.x : p1.x - p2.x;
        var yDiff = p2.y - p1.y; //(p2.y > p1.y) ? p2.y - p1.y : p1.y - p2.y;
        var angle = Math.atan2(yDiff, xDiff);
        return {
            x: (step || 3) * Math.cos(angle),
            y: (step || 3) * Math.sin(angle)
        };
    }

    var mcOptions = {
        point: {
            x: 100,
            y: 100
        }
    };
    var mc = an.moveclip(mcOptions, function (ctx) {
        an.Graphic.circle(mcOptions.point.x, mcOptions.point.y, 10, '#000000',true);
    });

    an.frame({
        to: false,
        init: function(ctx, i){

            var to = an.mousePress();
            if (to) {
                this.to = to;
            }
            if (this.to) {
                an.Graphic.circle(this.to.x, this.to.y, 5, '#ff3311',true);
                var ag = anglePoints(mcOptions.point, this.to, 2);
                mcOptions.point.x += ag.x;
                mcOptions.point.y += ag.y;
            }

            mc(ctx);
        }
    });

    // start
    an.start();

})();