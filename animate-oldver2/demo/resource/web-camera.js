(function () {

  var PageElements = {
    menu: NSA.queryAll('#menu'),
    page: NSA.query('#page'),
    desc: NSA.query('#description'),
    move: NSA.query('#move'),
    after: NSA.query('#after')
  };

  var An = new Animate({
    selector: '#canvas',
    width: 600,
    height: 400,
    fps: 12
  });


  // * * * * * * * * * * * * * * * * * * * * * * * * *
  var Graphic = An.Graphic();
  var TextField = An.TextField();


  An.frame(function (ctx, frameCounter) {
    /** @type CanvasRenderingContext2D */
    ctx = ctx;


  });


  // start
  An.start();

})();
