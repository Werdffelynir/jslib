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
    fps: 12
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



  // --------------------------------------------------
  // Animate frame and global settings

  An.backgroundColor('#FFFFFF');
  TextField.font('bold 14px sans');
  TextField.color('#C00000');

  An.frame(function (ctx, frameCounter) {
    /** @type CanvasRenderingContext2D */
    ctx = ctx;


  });


  // Animate start
  An.start();

})();
