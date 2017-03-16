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
    var Liner = {
        speed: 2,
        cursor: an.point(0,0)
    };


    var drawLinePoints = function(fromPoint, toPoint) {
        var i, d, p, between = Animate.Util.distanceBetween(fromPoint, toPoint);
        var speed = 2;
        var points = [fromPoint];

        var angle = function (p1, p2) {
            var xDiff = p1.x - p2.x;
            var yDiff = p1.y - p2.y;
            var angle = Math.atan2(yDiff, xDiff);
            return {x: speed * Math.cos(angle), y: speed * Math.sin(angle)}
        };

        d = angle(fromPoint, toPoint);

        for (i = 0; i < 1000; i ++) {
            p = {
                x: points[points.length-1].x + d.x * -1 ,
                y: points[points.length-1].y + d.y * -1
            };
            if (Animate.Util.distanceBetween(fromPoint, p) >= between) {
                p.x = toPoint.x;
                p.y = toPoint.y;
                break;
            }
            points.push(p);
        }

        return points;

    };


    var drawLine = function (p1, p2, lineWidth, color, callback) {
        var p, n = p1.x +'_'+ p1.y +'_'+ p2.x +'_'+ p2.y;
        if (!drawLine._list[n]) {
            drawLine._list[n] = {
                from: p1,
                to: p2,
                points: drawLinePoints(p1, p2),
                i: 0
            };
        }
        if (drawLine._list[n]) {
            p = drawLine._list[n];
            if (p.points[p.i]) {
                an.Graphic.line(p1, p.points[p.i], lineWidth || 1, color || 'red');
                p.i += 1;
                return true;
            } else {
                an.Graphic.line(p1, p2, lineWidth || 1, color || 'red');
                if (typeof callback === 'function')
                    callback.call(null);
                return false;
            }
        }
    };
    drawLine._list = {};

    var arrow = {
        body: [an.point(100,150), an.point(225,150)],
        larr: [an.point(225,150), an.point(200,110)],
        rarr: [an.point(225,150), an.point(200,190)]
    };

    an.frame({
        points: false,
        draw1: true,
        pointsIterator: 0,
        pointsIterator2: 0,
        init: function (ctx, i) {

            this.draw1 = drawLine(arrow.body[0], arrow.body[1], 3, 'blue');
            if (!this.draw1)
                drawLine(arrow.larr[0], arrow.larr[1], 3, 'blue');
            if (!this.draw1)
                drawLine(arrow.rarr[0], arrow.rarr[1], 3, 'blue');

/*            this.draw1 = drawLine(Liner.p1, Liner.p2);

            if (!this.draw1)
                this.draw2 = drawLine(Liner.p3, Liner.p4);

            if (!this.draw2)
                this.draw3 = drawLine(Liner.p5, Liner.p6);*/

            // drawLine(Liner.p1, Liner.p2,
            //     drawLine.bind(null, Liner.p3, Liner.p4,
            //         drawLine.bind(null, Liner.p5, Liner.p6)));



            // if (linePoints2[this.pointsIterator2]) {
            //     an.Graphic.line(Liner.p3, linePoints2[this.pointsIterator2]);
            //     this.pointsIterator2 += 1;
            // } else
            //     an.Graphic.line(Liner.p3, Liner.p4);
            //
            // if (linePoints1[this.pointsIterator]) {
            //     an.Graphic.line(Liner.p1, linePoints1[this.pointsIterator]);
            //     this.pointsIterator += 1;
            // } else {
            //     an.Graphic.line(Liner.p1, Liner.p2);

                // if (linePoints2[this.pointsIterator2]) {
                //     an.Graphic.line(Liner.p3, linePoints2[this.pointsIterator2]);
                //     this.pointsIterator2 += 1;
                // } else
                //     an.Graphic.line(Liner.p3, Liner.p4);
           // }

            if (i > 300)
                an.stop();
        }
    });

    // start
    an.start();
})();