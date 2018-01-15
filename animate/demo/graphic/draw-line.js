(function () {

  var An = new Animate({
    selector: '#canvas',
    width: 600,
    height: 400,
    fps: 12,

    // Movies
    act: 'start',
    acts: {start: 'start', b: ''}
  });

  // * * * * * * * * * * * * * * * * * * * * * * * * *
  var Graphic = An.Graphic();
  var TextField = An.TextField();

  var DrawLine = Animate.Clip({
    animated: true,
    ep: false,
    speed: 1
  }, function (sp, ep, s) {

    if (!this.ep) this.ep = sp;

    if (this.animated) {
      var f = function (n1, n2) {
        return n1 < n2 ? 1 : -1;
      };

      this.ep.x += f(sp.x, ep.x);
      this.ep.y += f(sp.y, ep.y);

      console.log(this.ep);

      Graphic.line(sp.x, sp.y, this.ep.x, this.ep.y)
        .stroke();
    }
  });

  // var line_1 = DrawLine(Animate.Point(0, 0), Animate.Point(100, 100));
  // console.log(R1.start());

  An.frame(function (ctx, i) {
    /** @type CanvasRenderingContext2D */
    ctx = ctx;

    DrawLine(Animate.Point(0, 0), Animate.Point(300, 100));

  });

  // start
  An.start();
})();