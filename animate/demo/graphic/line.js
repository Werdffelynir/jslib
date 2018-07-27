(function () {

  var An = new Animate({
    selector: '#canvas',
    width: 600,
    height: 400,
    fps: 30,

    // Movies
    act: 'start',
    acts: {start: 'start', b: ''}
  });

  // * * * * * * * * * * * * * * * * * * * * * * * * *
  var Graphic = An.Graphic();
  var TextField = An.TextField();

  An.frame(function (ctx, i) {
    /** @type CanvasRenderingContext2D */
    ctx = ctx;

    ctx.save();
    ctx.translate(100, 150);

    Graphic.cap(Graphic.CAPS.SQUARE);
    Graphic.color('#262626');

    Graphic.line(0, 0, 400, 0)
      .thickness(1)
      .stroke();
    Graphic.line(0, 20, 400, 20)
      .thickness(5)
      .stroke();
    Graphic.line(0, 50, 400, 50)
      .thickness(25)
      .stroke();
    ctx.restore();

    TextField.text('Frame: ' + i, 10, 380).color('#000').fill();
    if (i > 9)
      An.stop();
  });

  // start
  An.start();
})();