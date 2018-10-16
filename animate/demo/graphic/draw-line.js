(function () {

  var An = new Animate({
    selector: '#canvas',
    width: 600,
    height: 400,
    fps: 1
  });

  // * * * * * * * * * * * * * * * * * * * * * * * * *
  var Graphic = An.Graphic();
  var TextField = An.TextField();

  // * * * * * * * * * * * * * * * * * * * * * * * * *
  var Movie = {
    player: {},
    drawline: {},

  };

  // var sPoint = {
  //   x: 10,
  //   y: 10
  // };
  //
  // var ePoint = {
  //   x: 100,
  //   y: 300
  // };
  // var dPoint = {
  //   x: 0,
  //   y: 0
  // };

  var Player = An.Clip({
    // x: 0,
    // y: 0,
    // dx: 0,
    // dy: 0,
    // moveToX: 0,
    // moveToY: 0,
    // speed: 3,
    // acceleration: 0.1
  }, function (ctx, i) {

    // this.dx = (this.moveToX - this.x) / 50;
    // this.dy = (this.moveToY - this.y) / 50;

    // if (An.distanceBetween(Animate.Point(this.x, this.y), Animate.Point(this.moveToX, this.moveToY)) > 5) {
    //   this.x += this.dx;
    //   this.y += this.dy;
    // }

    /*
    if (this.x > this.dx) {
      this.dx += this.speed;
    }
    if (this.x < this.dx) {
      this.dx -= this.speed;
    }

    if (this.y > this.dy) {
      this.dy += this.speed;
    }
    if (this.y < this.dy) {
      this.dy -= this.speed;
    }*/

    // Graphic.circle(this.x, this.y, 25)
    //   .thickness(5)
    //   .stroke();

    return this;
  });



  var getDistance = function (a, b) {
    return Math.sqrt((b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y));
  };

  var DrawLine = An.Clip({
    startX: 300,
    startY: 10,
    toX: 300,
    toY: 300,
    dX: null,
    dY: null,
    speed: 3
  }, function (ctx, i) {

    if (this.dX === null && this.dY === null) {
      this.dX = this.startX;
      this.dY = this.startY;
    }

    // var dist = getDistance(
    //   Animate.Point(this.startX, this.startY),
    //   Animate.Point(this.toX, this.toY)
    // );
    //
    // var angle = Animate.calculateAngle(
    //   Animate.Point(this.startX, this.startY),
    //   Animate.Point(this.toX, this.toY)
    // );
    //
    //

    this.dX = (this.toX - this.dX) / 5;
    this.dY = (this.toY - this.dY) / 5;


    console.log(this);

    Graphic.line(this.startX, this.startY, this.dX, this.dY)
      .thickness(5)
      .stroke();

    return this;
  });

    An.frame(function (ctx, i) {
    /** @type CanvasRenderingContext2D */
    ctx = ctx;

      Movie.drawline = DrawLine();


    // Movie.player = Player();
    // console.log(Movie.player);
    // var deltaTime = (i - startTime) / duration;
    // dPoint.x += (ePoint.x - sPoint.x) / 40;
    // dPoint.y += (ePoint.y - sPoint.y) / 40;
    // Graphic.line(
    //   sPoint.x, sPoint.y,
    //   ePoint.x, ePoint.y
    // ).stroke();

  });

  An.onClick(function (event, pos) {

    // dPoint = sPoint;
    // ePoint = pos;
    // Movie.player.dx = Math.cos((pos.x - Movie.player.x));
    // Movie.player.dy = Math.sin((pos.y - Movie.player.y));
    // Movie.player.dx = (pos.x - Movie.player.x) / 50;
    // Movie.player.dy = (pos.y - Movie.player.y) / 50;
    //
    // Movie.player.moveToX = pos.x;
    // Movie.player.moveToY = pos.y;
  });

  // start
  An.start();
})();