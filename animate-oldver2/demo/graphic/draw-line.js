(function () {

  var An = new Animate({
    selector: '#canvas',
    width: 600,
    height: 400,
    fps: 24
  });

  // * * * * * * * * * * * * * * * * * * * * * * * * *
  var Graphic = An.Graphic();
  var TextField = An.TextField();

  // * * * * * * * * * * * * * * * * * * * * * * * * *

  var createDrawLineClip = function () {

    return An.Clip({
      dynamicPoint: null,
      startPoint: null,
      endPoint: null,
      acerPoint: null,
      steps: 100,
      stepCurrent: 0
    }, function (sp, ep) {

      if (!this.dynamicPoint) {
        this.dynamicPoint = {x: sp.x, y: sp.y};
        this.startPoint = {x: sp.x, y: sp.y};
        this.endPoint = {x: ep.x, y: ep.y};
        this.acerPoint = {
          x: (this.endPoint.x - this.startPoint.x) / this.steps,
          y: (this.endPoint.y - this.startPoint.y) / this.steps
        };
      }

      if (this.steps > this.stepCurrent) {
        this.stepCurrent ++;
        this.dynamicPoint.x += this.acerPoint.x;
        this.dynamicPoint.y += this.acerPoint.y;
      }

      Graphic.line(
        this.startPoint.x,
        this.startPoint.y,
        this.dynamicPoint.x,
        this.dynamicPoint.y
      ).thickness(5).stroke();

      return this;
    });

  };

  var drawLine01 = createDrawLineClip();
  var drawLine02 = createDrawLineClip();
  var drawLine03 = createDrawLineClip();
  var drawLine04 = createDrawLineClip();

  An.frame(function (ctx, i) {
    /** @type CanvasRenderingContext2D */
    ctx = ctx;

    An.addGrid(100, 0.5);

    drawLine01({x: 10,  y: 10},  {x: 310, y: 10});
    drawLine02({x: 310,  y: 10},  {x: 310, y: 310});
    drawLine03({x: 310,  y: 310},  {x: 10, y: 310});
    drawLine04({x: 10,  y: 310},  {x: 10, y: 10});

  });

  An.onClick(function (event, pos) {
  });

  // start
  An.start();
})();
