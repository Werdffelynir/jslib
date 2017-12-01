(function () {

  // --------------------------------------------------
  // Page Elements
  var PageElements = {
    menu: NSA.queryAll('#menu'),
    page: NSA.query('#page'),
    desc: NSA.query('#description'),
    move: NSA.query('#move'),
    after: NSA.query('#after')
  };

  // --------------------------------------------------
  // Animate init, and instance objects
  var An = new Animate({
    selector: '#canvas',
    width: 600,
    height: 400,
    fps: 1
  });

  var Graphic = An.Graphic();
  var TextField = An.TextField();



  // --------------------------------------------------
  // Move object
  var Move = {
    key: {},
    mouse: false,
    images: {},
    mousePosition: {x: 0, y: 0},
  };

  Move.mapSource = An.maskmapCreate([
    1, 0, 0, 0, 1,
    0, 1, 0, 1, 0,
    0, 0, 1, 0, 0,
    0, 1, 0, 1, 0,
    1, 0, 0, 0, 1
  ], 5, 25);


  Move.draw = function (ctx, frame) {
    /** @type CanvasRenderingContext2D */
    ctx = ctx;

    An.maskmapRender(Move.mapSource, function (x, y, value, iter, maskmap) {

      if (value === 1)
        if (frame % 10 < 5)
          Graphic.color('black');
        else
          Graphic.color('white');
      else
        Graphic.color('red');

      Graphic.rect(x, y, maskmap['size'], maskmap['size'])
        .fill();
    });
  };

  // --------------------------------------------------
  // Animate frame and global settings

  An.backgroundColor('#FFFFFF');
  TextField.font('bold 14px sans');
  TextField.color('#C00000');

  An.frame(function (ctx, frameCounter) {
    /** @type CanvasRenderingContext2D */
    ctx = ctx;

    Move.draw(ctx, frameCounter);

  });

  // Animate start
  An.start();

})();
