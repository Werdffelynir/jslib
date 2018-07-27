(function () {

  var An = new Animate({
    selector: '#canvas',
    width: 600,
    height: 400,
    fps: 0
  });

  // * * * * * * * * * * * * * * * * * * * * * * * * *

  var TextField = An.TextField();

  An.frame(function (ctx, i) {
    /** @type CanvasRenderingContext2D */
    ctx = ctx;

    ctx.translate(150, 0);

    TextField.text("⚔ ", 120, 40)
      .font('140px sans, sans-serif')
      .color('#ff1f00')
      .thickness(3)
      .stroke();

    TextField.text("⚉ ", 0, 150)
      .font('100px sans, sans-serif')
      .thickness(5)
      .color('#ff1f00')
      .stroke();

    TextField.text("Icons", 90, 170)
      .font('bold 66px fantasy, sans-serif')
      .thickness(2)
      .color('#e6ff77')
      .fill()
      .color('#ff1f00')
      .stroke();

  });

  // start
  An.start();
})();