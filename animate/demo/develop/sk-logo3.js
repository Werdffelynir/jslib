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
    speed: 5,
    currentScene: "start",
    scene: {start: "start", boom: "boom", end: "end"}
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


  Movie.arc1 = An.createClip({
    x: Movie.centerPoint.x,
    y: Movie.centerPoint.y,
    radius: 100,
    rotate: 0,
    path: 0,
  }, function (ctx, i) {
    ctx.lineWidth = 18;
    An.graphic.ellipse(
      this.x,
      this.y,
      this.radius,
      this.radius,
      this.rotate,
      0,
      -0.7,
      true, false);
  });

  Movie.arc2 = An.createClip({
    x: Movie.centerPoint.x,
    y: Movie.centerPoint.y,
    radius: 100,
    rotate: 0,
    path: 0,
  }, function (ctx, i) {
    ctx.lineWidth = 18;
    An.graphic.ellipse(
      this.x,
      this.y,
      this.radius,
      this.radius,
      this.rotate,
      -0.8,
      -2.1,
      true, false);
  });

  Movie.arc3 = An.createClip({
    x: Movie.centerPoint.x,
    y: Movie.centerPoint.y,
    radius: 100,
    rotate: 0,
    path: 0,
  }, function (ctx, i) {
    ctx.lineWidth = 18;
    An.graphic.ellipse(
      this.x,
      this.y,
      this.radius,
      this.radius,
      this.rotate,
      -2.2,
      -3.8,
      true, false);
  });


  Movie.arc4 = An.createClip({
    x: Movie.centerPoint.x,
    y: Movie.centerPoint.y,
    radius: 100,
    rotate: 0,
    path: 0,
  }, function (ctx, i) {
    ctx.lineWidth = 18;
    An.graphic.ellipse(
      this.x,
      this.y,
      this.radius,
      this.radius,
      this.rotate,
      -3.9,
      -6.2,
      true, false);
  });

  Movie.image = new Image();
  Movie.imageData = null;
  Movie.logoPart0 = An.loadImage({
    'part-0': '/animate/demo/images/sk-logo-part-0.png',
    'part-0': '/animate/demo/images/sk-logo-part-0.png',
    'part-0': '/animate/demo/images/sk-logo-part-0.png',
    'part-0': '/animate/demo/images/sk-logo-part-0.png',
    'part-0': '/animate/demo/images/sk-logo-part-0.png',
  }, function (list) {

  });

  An.getContext().fillStyle = Movie.baseColor;
  An.getContext().strokeStyle = Movie.baseColor;
  
  An.frame(function (ctx, i) {
    /** @type CanvasRenderingContext2D */
    ctx = ctx;

    if ( Movie.currentScene === Movie.scene.start ) {
      Movie.arc1(ctx, i);
      Movie.arc2(ctx, i);
      Movie.arc3(ctx, i);
      Movie.arc4(ctx, i);

      if (i > 20) {
        Movie.currentScene = Movie.scene.boom;
        Movie.imageData = ctx.getImageData(0, 0, Movie.width, Movie.height);
        Movie.image.src = An.getCanvas().toDataURL("image/png");
      }
    }

    if ( Movie.currentScene === Movie.scene.boom ) {

      ctx.beginPath();

      // ctx.arc(Movie.centerPoint.x, Movie.centerPoint.y, 75, 0, Math.PI * 2, false);
      // ctx.rect(10, 10, 600, 600);
      // ctx.fillRect(0, 0, 80, 80);
      // ctx.putImageData(Movie.imageData, 0, 0);
      // ctx.drawImage(Movie.image, 0, 0);

      ctx.clip();
      ctx.fillRect(Movie.centerPoint.x - 100, Movie.centerPoint.y - 100, 80, 80);
      ctx.closePath();

      // ctx.clearRect(0, 0, Movie.width, Movie.height);

      console.log(Movie.imageData);
    }

  });

  An.start();


})();