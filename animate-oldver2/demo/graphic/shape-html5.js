(function () {

  var An = new Animate({
    selector: '#canvas',
    width: 600,
    height: 400,
    fps: 0
  });

  // * * * * * * * * * * * * * * * * * * * * * * * * *

  var Graphic = An.Graphic();
  var TextField = An.TextField();
  var Elements = {
    shield: [120,250,220,200,240,0,0,0,20,200],
    shieldHalf: [120,247,218,199,238,2,120,2]
  };


  An.frame(function (ctx, i) {
    /** @type CanvasRenderingContext2D */
    ctx = ctx;

    ctx.translate(175, 70);

    Graphic.shape(Elements.shield, true)
      .color('red')
      .fill();

    Graphic.shape(Elements.shieldHalf, true)
      .color('rgba(250,250,250,0.3)')
      .fill();

    Graphic.shape(Elements.shield, true)
      .thickness(18)
      .color('black')
      .stroke();

    TextField.text('HTML5', 60, 100)
      .font('bold 34px sans')
      .color('black')
      .fill();

  });

  // start
  An.start();
})();