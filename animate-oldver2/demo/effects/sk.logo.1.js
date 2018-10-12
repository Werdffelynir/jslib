(function () {

  var An = new Animate({
    selector: '#canvas',
    width: 600,
    height: 400,
    fps: 60
  });

  // * * * * * * * * * * * * * * * * * * * * * * * * *

  var TextField = An.TextField();
  var Graphic = An.Graphic();

  // * * * * * * * * * * * * * * * * * * * * * * * * *
  var Move = {
    center: {
      x: An.getWidth() / 2,
      y: An.getHeight() / 2,
    }
  };

  Move.draw = An.Clip({
    endAngle: 0,
    speed: 3,
  }, function (_radius, _speed) {
    /** @type CanvasRenderingContext2D */
    var ctx = An.getContext();

    this.endAngle += Animate.DEGREE * this.speed;

    if (this.endAngle > Animate.DEGREE_360 && this.speed) {
      this.speed *= -1;
    } else if (this.endAngle < 0) {
      this.endAngle = 0;
      this.speed *= -1;
    }

    ctx.beginPath();
    ctx.lineWidth = 25;
    ctx.arc(Move.center.x, Move.center.y, 100, 0, this.endAngle);
    ctx.stroke();

    TextField.text('Speed: ' + this.speed + ' endAngle:' + this.endAngle, 10, 10)
      .fill();
  });



  // An.backgroundColor('#03020f');
  An.frame(function (ctx, i) {
    Move.draw(ctx, i);
  });

  // start
  An.start();

})();