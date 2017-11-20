(function () {

    var An = new Animate({
        selector: '#canvas',
        width: 600,
        height: 400,
        fps: 0
    });

    // * * * * * * * * * * * * * * * * * * * * * * * * *

  var Graphic = An.Graphic();
  var Elements = {
      mount: [0,100,100,0,200,100,300,0,400,100,400,135,0,135],
      mountTop1: [100,0,135,35,65,35],
      mountTop2: [300,0,335,35,265,35]
  };

    An.frame(function(ctx, i) {
        /** @type CanvasRenderingContext2D */
        ctx = ctx;

      ctx.translate(100, 100);

      Graphic.shape(Elements.mount, true)
        .color('red')
        .fill();

      Graphic.shape(Elements.mountTop1, true)
        .color('white')
        .fill();

      Graphic.shape(Elements.mountTop2, true)
        .color('white')
        .fill();

      Graphic.shape(Elements.mount, true)
        .thickness(6)
        .color('black')
        .stroke();

    });

    // start
    An.start();
})();