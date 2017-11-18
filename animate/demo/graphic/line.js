(function () {

    var An = new Animate({
        selector: '#canvas',
        width: 600,
        height: 400,
        fps: 30,

        // Movies
        act: 'start',
        acts: {start: 'start', b:''}
    });

    // * * * * * * * * * * * * * * * * * * * * * * * * *
    var Graphic = An.Graphic();
    var TextField = An.TextField();

    An.backgroundColor('#cacaca');

    An.frame(function(ctx, i) {
        /** @type CanvasRenderingContext2D */
        ctx = ctx;

        Graphic.cap(Graphic.CAPS.SQUARE);
        Graphic.color('#262626');

        Graphic.line(100, 110, 500, 110)
            .thickness(1)
            .stroke();
        Graphic.line(100, 130, 500, 150)
            .thickness(5)
            .stroke();
        Graphic.line(100, 160, 500, 190)
            .thickness(25)
            .stroke();

        Graphic.cap(Graphic.CAPS.ROUND);
        Graphic.color('#414141');

        Graphic.line(10, 10, i * 3.1, 10)
            .thickness(5)
            .stroke();
        Graphic.line(20, 20, i * 3.2, 20)
            .thickness(4)
            .stroke();
        Graphic.line(30, 30, i * 3.3, 30)
            .thickness(3)
            .stroke();

        Graphic.line(10, 10, 10, i * 2.4)
            .thickness(5)
            .stroke();
        Graphic.line(20, 20, 20, i * 2.3)
            .thickness(4)
            .stroke();
        Graphic.line(30, 30, 30, i * 2.2)
            .thickness(3)
            .stroke();

        TextField.text('Frame: ' + i, 10, 380).color('#000').fill();
        if (i > 149)
            An.stop();
    });

    // start
    An.start();
})();