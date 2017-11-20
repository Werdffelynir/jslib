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

    ctx.translate(10, 10);

    TextField.text('Accusantium doloribus fugiat nam necebus nobis officis recusandae!', 0, 0)
      .font('bold 12px sans, sans-serif')
      .color('#970000')
      .fill();

    TextField.text('Lorem ipsum dolor.', 0, 20)
      .font('16px sans, sans-serif')
      .fill();

    TextField.text("Animate-JS her", 0, 140)
      .font('72px fantasy, sans-serif')
      .thickness(3)
      .color('#ff7e5f')
      .fill()
      .color('#970000')
      .stroke();

    TextField.text('facilis nobisugiat', 0, 220)
      .font('28px Arial, sans-serif')
      .thickness(1)
      .color('#970000')
      .stroke();

  });

  // start
  An.start();
})();