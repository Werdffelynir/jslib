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

    ctx.translate(100, 60);

    Graphic.rect(0, 0, 300, 200)
      .thickness(4)
      .color('#c5ccd8')
      .fill();

    Graphic.rect(0, 0, 150, 150)
      .thickness(4)
      .color('#8f0000')
      .stroke();

    ctx.save();
    ctx.rotate(Animate.DEGREE * 45);
    Graphic.rect(0, 0, 150, 150)
      .color('rgba(143, 0, 0, 0.5)')
      .fill();
    ctx.restore();

    Graphic.rect(20, 20, 150, 150)
      .color('#23202a')
      .thickness(4)
      .stroke();

    Graphic.rect(30, 30, 150, 150)
      .color('#363240')
      .thickness(4)
      .stroke();

    Graphic.rect(40, 40, 150, 150)
      .color('#494457')
      .thickness(4)
      .stroke();

    Graphic.rect(200, 150, 50, 50)
      .thickness(10)
      .color('#7b7391')
      .fill()
      .color('#494457')
      .stroke();

    Graphic.rect(300, 150, 50, 50)
      .thickness(10)
      .color('#494457')
      .stroke()
      .color('#7b7391')
      .fill();

  });

  // start
  An.start();
})();