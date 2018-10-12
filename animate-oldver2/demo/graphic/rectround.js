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

    ctx.translate(160, 80);

    Graphic.rectRound(0, 0, 300, 100, 10)
      .color('#2a272f')
      .stroke();

    Graphic.rectRound(10, 10, 280, 80, 10)
      .color('#615a6b')
      .thickness(5)
      .stroke();

    Graphic.rectRound(20, 20, 260, 60, 10)
      .color('#d3c4db')
      .fill();

    Graphic.rectRound(0, 130, 150, 50, 50)
      .color('#2a272f')
      .fill();

    Graphic.rectRound(180, 130, 50, 150, 50)
      .color('#2a272f')
      .fill();

    Graphic.rectRound(70, 200, 80, 80, 80)
      .color('#615a6b')
      .fill();

  });

  // start
  An.start();
})();