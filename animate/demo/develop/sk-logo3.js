(function () {
  var node = {
    menu: NSA.queryAll('#menu'),
    page: NSA.query('#page'),
    desc: NSA.query('#description'),
    move: NSA.query('#move'),
    after: NSA.query('#after')
  };

  var Movie = {
    width: window.innerWidth - 200,
    height: window.innerHeight - 60,
    baseColor: '#2f2f2e',
    bgColor: '#ffffff',
    speed: 5
  };

  var An = new Animate({
    selector: '#canvas',
    width: Movie.width,
    height: Movie.height,
    fps: 24
  });

  Movie.centerPoint = {
    x: Movie.width / 2,
    y: Movie.height / 2
  };
  /** @type {CanvasRenderingContext2D|WebGLRenderingContext} */
  Movie.context = An.getContext();
  Movie.i = function () {
    return An.getIteration();
  };



  // * * * * * * * * * * * * * * * * * * * * * * * * *

  Movie.drawArc = function () {
    this.i = An.getIteration();

    if (!this.startAngle) this.startAngle = 0;
    if (!this.endAngle) this.endAngle = 0;

    if (this.clockwise) {

      if (this.reversed && this.reverse !== undefined) {
        if (this.reverse > 0) {
          this.startAngle -= this.acceleration;
          this.reverse --;
        }
      } else {
        if (this.startAngle >= Animate.DEGREES_360) {
          this.startAngle = Animate.DEGREES_360;

          if (this.reverse !== undefined) {
            this.acceleration = 0.04;
            this.reversed = true;
          }
        }
        else if (this.startAngle < Animate.DEGREES_360)
          this.startAngle += this.acceleration;
      }

      this.endAngle = 0;

    } else {

      if (this.startAngle <= -(Animate.DEGREES_360))
        this.startAngle = -(Animate.DEGREES_360);
      else if (this.startAngle > -(Animate.DEGREES_360))
          this.startAngle -= this.acceleration;

      this.endAngle = 0;
    }

    An.graphic.lineWidth(this.width);
    An.graphic.ellipse(
      Movie.centerPoint.x,
      Movie.centerPoint.y,
      this.radius,
      this.radius,
      this.rotate,
      this.startAngle,
      this.endAngle,
      this.clockwise,
      false);

    if (typeof this.frame === 'function') {
      this.frame.call(this, Movie.i(), Movie.context);
    }
  };

  Movie.arcBase = An.createClip({
    x: Movie.centerPoint.x,
    y: Movie.centerPoint.y,
    radius: 30,
    rotate: 0,
    path: 0,
  }, function (ctx, i) {

    ctx.lineWidth = 10;

    this.x += Math.sin( i / 5 ) * 3;
    this.y += Math.cos( i / 5 ) * 3;

    An.graphic.ellipse(
      this.x,
      this.y,
      this.radius,
      this.radius,
      this.rotate,
      -0.5,
      -2.4,
      true, false);

  });


  An.getContext().fillStyle = Movie.baseColor;
  An.getContext().strokeStyle = Movie.baseColor;
  
  An.frame(function (ctx, i) {
    /** @type CanvasRenderingContext2D */
    ctx = ctx;

    Movie.arcBase(ctx, i);


  });

  An.start();


})();