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

    ctx.translate(An.width / 2, An.height / 2);

    Graphic.ellipse(0, 0, 160, 180, 0, 0, Animate.DEGREE * 360, false, true)
      .color('rgba(255, 0, 0, 0.1)')
      .fill();

    Graphic.ellipse(0, 0, 120, 130, 0, 0, Animate.DEGREE * 360, false, true)
      .color('#ff0300')
      .thickness(10)
      .stroke();

    Graphic.ellipse(0, 0, 220, 30, 0, Animate.DEGREE * 110, Animate.DEGREE * 320, true, false)
      .color('#d40300')
      .thickness(20)
      .stroke();

  });

  // start
  An.start();
})();