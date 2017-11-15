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

    TextField.text('Lorem ipsum dolor.', 10, 10)
      .font('14px sans, sans-serif')
      .fill();

    TextField.text('Accusantium doloribus fugiat nam necebus nobis officis recusandae!', 10, 30)
      .font('bold 16px sans, sans-serif')
      .color('#970000')
      .fill();

    TextField.text("⚔ ", 270, 80)
      .font('140px sans, sans-serif')
      .color('#ff1f00')
      .thickness(3)
      .stroke();

    TextField.text('facilis nobisugiat', 270, 210)
      .font('14px Arial, sans-serif')
      .color('#ff7e5f')
      .thickness(1)
      .stroke();

    TextField.text("⚉ ", 200, 200)
      .font('100px sans, sans-serif')
      .color('#ff1f00')
      .thickness(3)
      .stroke();

    TextField.text("Hello ", 280, 215)
      .font('66px fantasy, sans-serif')
      .color('#ff1f00')
      .thickness(3)
      .stroke();

    TextField.text("Animate-JS her", 10, 290)
      .font('92px fantasy, sans-serif')
      .color('#970000')
      .fill();

  });

  // start
  An.start();
})();