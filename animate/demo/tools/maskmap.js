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
    fps: 4
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

  Move.mapSource = [
    1, 0, 0, 0, 1,
    0, 1, 0, 1, 0,
    0, 0, 1, 0, 0,
    0, 1, 0, 1, 0,
    1, 0, 0, 0, 1
  ];
  Move.mapSource['size'] = 50;
  Move.mapSource['cols'] = 5;
  Move.mapSource['rows'] = 5;

  Move.draw = function (ctx, frame) {
    /** @type CanvasRenderingContext2D */
    ctx = ctx;

    var i, x, y, p, map = Move.mapSource;
    for (i = 0; i < map.length; i++) {
      x = parseInt(i % map['cols']) * map['size'];
      y = parseInt(i / map['cols']) * map['size'];
      if (map[i] === 1) {
        Graphic.rect(x, y, map['size'], map['size'])
          .fill();
      }
    }
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

    if (frameCounter % 10 < 5)
      Graphic.color('black');
    else
      Graphic.color('red');
  });


  // Animate start
  An.start();

})();
