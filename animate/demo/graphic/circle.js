(function () {

    var An = new Animate({
        selector: '#canvas',
        width: 600,
        height: 400,
        fps: 0
    });

    // * * * * * * * * * * * * * * * * * * * * * * * * *
    var Graphic = An.Graphic();

    An.frame(function (ctx, i) {
        /** @type CanvasRenderingContext2D */
        ctx = ctx;

        Graphic.thickness(6);

        Graphic.circle(300, 200, 200)
            .color('#ff7000')
            .fill()
            .color('#2a2a32')
            .stroke();

        Graphic.circle(250, 200, 20)
            .color('#ffffff')
            .fill()
            .color('#2a2a32')
            .stroke();

        Graphic.circle(350, 200, 20)
            .color('#ffffff')
            .fill()
            .color('#2a2a32')
            .stroke();

        Graphic.ellipse ( 300, 250, 30, 20, 0, 0, Animate.DEGREE * 360, false, true )
            .color('#ffffff')
            .fill()
            .color('#2a2a32')
            .stroke();


        Graphic.thickness(10);
        Graphic.cap(Graphic.CAPS.ROUND);

        Graphic.ellipse ( 250, 200, 20, 20, 0, 0, Animate.DEGREE * 180, false, false )
            .color('#2a2a32')
            .stroke();

        Graphic.ellipse ( 350, 200, 20, 20, 0, 0, Animate.DEGREE * 180, true, false )
            .color('#2a2a32')
            .stroke();


        Graphic.ellipse ( 300, 200, 120, 100, 0, 0, Animate.DEGREE * 180, true, false )
            .color('#2a2a32')
            .stroke();
        Graphic.ellipse ( 300, 200, 135, 100, 0, 0, Animate.DEGREE * 180, true, false )
            .color('#2a2a32')
            .stroke();
        Graphic.ellipse ( 300, 200, 150, 100, 0, 0, Animate.DEGREE * 180, true, false )
            .color('#2a2a32')
            .stroke();
        Graphic.ellipse ( 300, 200, 165, 100, 0, 0, Animate.DEGREE * 180, true, false )
            .color('#2a2a32')
            .stroke();


        Graphic.ellipse ( 300, 50, 100, 30, 0, 0, Animate.DEGREE * 360, false, true )
            .color('#9797af')
            .stroke();

    });

    // start
    An.start();
})();