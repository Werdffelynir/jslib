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

    if (this.delay && this.delay > this.i) return;

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

/*    if (this.clockwise) {
      if (this.startAngle >= Animate.DEGREES_360)
        this.startAngle = Animate.DEGREES_360;
      else if (this.startAngle < Animate.DEGREES_360)
        this.startAngle += this.acceleration;
      this.endAngle = 0;
    } else {
      if (this.startAngle <= -(Animate.DEGREES_360))
        this.startAngle = -(Animate.DEGREES_360);
      else if (this.startAngle > -(Animate.DEGREES_360))
        this.startAngle -= this.acceleration;
      this.endAngle = 0;
    }*/


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

  Movie.arc_center = An.createClip({
    width: 3,
    alpha: 0,
    radius: 40,
    delay: 50
  }, function () {
    this.i = An.getIteration();

    if (this.delay && this.delay > this.i) return;
    if (this.alpha < 1) this.alpha += (this.alpha < 1) ? 0.06 : 0;

    An.getContext().save();
    An.getContext().globalAlpha = this.alpha;
    An.getContext().lineWidth = this.width;

    An.graphic.ellipse(
      Movie.centerPoint.x,
      Movie.centerPoint.y,
      this.radius,
      this.radius,
      0,
      0,
      Animate.DEGREES_360,
      true,
      false);

    An.getContext().restore();

  });

  Movie.arc_inner_slim = An.createClip({}, Movie.drawArc.bind({
    clockwise: true,
    width: 2,
    rotate: 0,
    radius: 68,
    acceleration: 0.1
  }));

  Movie.arc_inner_two = An.createClip({}, Movie.drawArc.bind({
    clockwise: false,
    width: 10,
    rotate: 0,
    radius: 80,
    acceleration: 0.2,
    lineDelay: 20,
    linePath: Animate.DEGREES_45 / 5,
    linesRotate: An.degreesToRadians(90),
    frame: function (i, ctx) {
      if (this.lineDelay < i) {

        ctx.strokeStyle = Movie.bgColor;
        ctx.lineWidth = this.width + 5;

        if (this.linesRotate > -4.595) {
          this.linesRotate -= 0.085;
        }

        An.graphic.ellipse(Movie.centerPoint.x, Movie.centerPoint.y, this.radius, this.radius, this.linesRotate, 0,                  this.linePath,      false, false);
        An.graphic.ellipse(Movie.centerPoint.x, Movie.centerPoint.y, this.radius, this.radius, this.linesRotate, this.linePath * 2,  this.linePath * 3.5,  false, false);
        ctx.strokeStyle = Movie.baseColor;
        ctx.lineWidth = this.width;
      }
    }
  }));

  Movie.arc_inner_one = An.createClip({}, Movie.drawArc.bind({
    clockwise: true,
    width: 10,
    rotate: 0,
    radius: 95,
    acceleration: 0.06,
    lineDelay: 50,
    linePath: Animate.DEGREES_45 / 5,
    linesRotate: 0,
    frame: function (i, ctx) {
      if (this.lineDelay < i) {
        ctx.strokeStyle = Movie.bgColor;
        if (this.linesRotate < 3.8) {
          this.linesRotate += 0.096;
        }
        An.graphic.ellipse(Movie.centerPoint.x, Movie.centerPoint.y, this.radius+2, this.radius+2, this.linesRotate, 0,                  this.linePath,      false, false);
        An.graphic.ellipse(Movie.centerPoint.x, Movie.centerPoint.y, this.radius+2, this.radius+2, this.linesRotate, this.linePath * 2,  this.linePath * 3,  false, false);
        An.graphic.ellipse(Movie.centerPoint.x, Movie.centerPoint.y, this.radius+2, this.radius+2, this.linesRotate, this.linePath * 4,  this.linePath * 5,  false, false);
        ctx.strokeStyle = Movie.baseColor;
      }
    }
  }));

  Movie.arc_outer_bold = An.createClip({}, Movie.drawArc.bind({
    clockwise: true,
    width: 18,
    rotate: An.degreesToRadians(-45),
    radius: 130,
    reverse: 16,
    acceleration: 0.08
  }));

  Movie.arc_outer_slim = An.createClip({}, Movie.drawArc.bind({
    clockwise: false,
    width: 4,
    rotate: An.degreesToRadians(180),
    radius: 145,
    acceleration: 0.2,
    delay: 100
  }));

  Movie.traLeft = An.createMovieClip({
    i: 0,
    x: Movie.centerPoint.x - 170,
    y: Movie.centerPoint.y - 20,
    delay: 110,
    n1: 20,
    n2: 20
  }, function () {
    this.i = Movie.i();

    //
    // // console.log(this.delay, this.i, this.delay > this.i);
    // if (this.delay < this.i && this.x < Movie.centerPoint.x - 170) {
    //   this.x += Movie.speed;
    // }

    if (this.delay < this.i) {
      if (this.n1 > 0) this.n1 -= 0.7;
      if (this.n2 < 40) this.n2 += 0.7;
    }

    An.graphic.shape([0,this.n1,200,20,0,this.n2], Movie.bgColor, true, true);
    // An.graphic.shape([0,0,200,20,0,40], Movie.baseColor, true, true);

  });

  Movie.traRightT = An.createMovieClip({
    x: Movie.centerPoint.x + 10,
    y: Movie.centerPoint.y - 10,
    rotate: Animate.degreesToRadians(-45),
    delay: 110,
    n:  0,
  }, function () {

    // if (Movie.i() > this.delay && this.x - 135 > Movie.centerPoint.x) {
    //   this.x -= Movie.speed / 2;
    //   this.y += Movie.speed / 2;
    // }

    if (this.delay < Movie.i()) {
      if (this.n < 15) this.n += 0.5;

      An.graphic.shape([
        0,    0,
        130, -this.n,
        130,  this.n], Movie.baseColor, false);

      An.graphic.shape([
        0,    0,
        134, -this.n,
        134,  this.n], Movie.bgColor, true, true);

      An.graphic.rectRound(-12, -18, 36, 36, 18, '#ffffff', true)
    }

  });


/*  Movie.traRightT = An.createMovieClip({
    x: Movie.centerPoint.x + 300,
    y: Movie.centerPoint.y - 280,
    rotate: Animate.degreesToRadians(132.5),
    delay: 20
  }, function () {
    if (Movie.i() > this.delay && this.x - 135 > Movie.centerPoint.x) {
      this.x -= Movie.speed / 2;
      this.y += Movie.speed / 2;
    }
    An.graphic.shape([0,0,200,20,0,40], Movie.baseColor, true, true);
  });*/




  Movie.lineL = An.createMovieClip({
    x: Movie.centerPoint.x + 28,
    y: Movie.centerPoint.y + 28,
    rotate: An.degreesToRadians(-45),
    delay: 60,
    width: 0,
    widthMax: 106
  }, function () {
    if (this.delay && this.delay < Movie.i()) {
      if (this.width < this.widthMax)
        this.width += 2;

      An.graphic.line(Animate.Point(0, 0), Animate.Point(0, this.width), 5);
      An.graphic.line(Animate.Point(0,-2), Animate.Point(0, this.width + 2), 3, '#fff');
    }

    // Movie.context.beginPath();
    // Movie.context.save();
    //
    // Movie.context.arc(Movie.centerPoint.x, Movie.centerPoint.y, 150, 0, Math.PI*2, false);
    // Movie.context.stroke();
    // Movie.context.clip();
    //
    // // Movie.context.rect(50,20,200,120);
    //
    // Movie.context.restore();
    // Movie.context.closePath();

  });

  Movie.lineB = An.createMovieClip({
    x: Movie.centerPoint.x,
    y: Movie.centerPoint.y + 40,
    rotate: An.degreesToRadians(0),
    delay: 80,
    width: 0,
    widthMax: 106
  }, function () {
    if (this.delay && this.delay < Movie.i()) {
      if (this.width < this.widthMax)
        this.width += 3;
      An.graphic.line(Animate.Point(0, 0), Animate.Point(0, this.width), 5);
      An.graphic.line(Animate.Point(0,-2), Animate.Point(0, this.width + 2), 3, '#fff');
    }
  });

  Movie.lineBR = An.createMovieClip({
    x: Movie.centerPoint.x - 28,
    y: Movie.centerPoint.y + 28,
    rotate: An.degreesToRadians(45),
    delay: 100,
    width: 0,
    widthMax: 106
  }, function () {
    if (this.delay && this.delay < Movie.i()) {
      if (this.width < this.widthMax)
        this.width += 3;
      An.graphic.line(Animate.Point(0, 0), Animate.Point(0, this.width), 5);
      An.graphic.line(Animate.Point(0,-2), Animate.Point(0, this.width + 2), 3, '#fff');
    }
  });




  An.getContext().fillStyle = Movie.baseColor;
  An.getContext().strokeStyle = Movie.baseColor;

  // Movie.bgImage = new Image();
  // Movie.bgImage.src = '/animate/demo/images/logosk.png';
  // An.frame(function (ctx, i) {
  //   ctx.drawImage(Movie.bgImage, 0,0, 300,180);
  // });

  An.frame(function (ctx, i) {
    /** @type CanvasRenderingContext2D */
    ctx = ctx;


    Movie.arc_center();

    Movie.arc_outer_bold();
    Movie.arc_outer_slim();
    Movie.arc_inner_one();
    Movie.arc_inner_two();
    Movie.arc_inner_slim();

    Movie.traLeft();
    Movie.traRightT();

    Movie.lineL();
    Movie.lineB();
    Movie.lineBR();




  });

  An.start();


})();