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
    height: window.innerHeight - 60
  };

  var An = new Animate({
    selector: '#canvas',
    width: Movie.width,
    height: Movie.height,
    fps: 30,
    centerPoint: {
      x: Movie.width / 2,
      y: Movie.height / 2
    }
  });

  // * * * * * * * * * * * * * * * * * * * * * * * * *


  // Movie.drawOpt = ;
  Movie.drawArc = function () {

    this.i = An.getIteration();
    // this.rotate += this.acceleration;
    if (this.radians < 2 * Math.PI)
      this.radians -= this.acceleration;
    else
      this.radians = 0; //2 * Math.PI;

    // if (this.radians < 0 || this.radians > 2 * Math.PI) {
    //   this.acceleration = this.acceleration * -1;
    //   if (this.radians < 0) this.radians = 0;
    //   else this.radians =  2 * Math.PI;
    // }

    An.graphic.lineWidth(this.width);
    An.graphic.ellipse(
      An.centerPoint.x,
      An.centerPoint.y,
      this.radius,
      this.radius,
      this.rotate,
      (this.startAngle || 0),
      (this.endAngle || this.radians),
      true,
      false);
  };

  Movie.arc_center = An.createClip({
    radians: 0,
    radius: 30,
    rotate: 0
  }, function () {
    An.graphic.ellipse(
      An.centerPoint.x,
      An.centerPoint.y,
      this.radius,
      this.radius,
      this.rotate,
      (0),
      An.degreesToRadians(360), true, true, true);
  });

  Movie.arc_0 = An.createClip({}, Movie.drawArc.bind({
    radians: 0,
    width: 8,
    rotate: 0,
    radius: 60,
    acceleration: 0.01
  }));

  Movie.arc_1 = An.createClip({}, Movie.drawArc.bind({
    radians: 0,
    width: 4,
    rotate: 75,
    radius: 80,
    acceleration: 0.045
  }));

  Movie.arc_2 = An.createClip({}, Movie.drawArc.bind({
    radians: 0,
    width: 1,
    rotate: 75,
    radius: 90,
    acceleration: 0.030
  }));

  Movie.arc_3 = An.createClip({}, Movie.drawArc.bind({
    radians: 0,
    width: 6,
    rotate: 75,
    radius: 100,
    acceleration: 0.075
  }));

  Movie.arc_4 = An.createClip({}, Movie.drawArc.bind({
    radians: 0,
    width: 2,
    rotate: 160,
    radius: 110,
    acceleration: 0.030
  }));

  Movie.arc_5 = An.createClip({}, Movie.drawArc.bind({
    radians: 0,
    width: 12,
    rotate: 35,
    radius: 130,
    acceleration: 0.020
  }));

  Movie.arc_6 = An.createClip({}, Movie.drawArc.bind({
    radians: 0,
    width: 1,
    rotate: 35,
    radius: 140,
    acceleration: 0.080
  }));


  An.getContext().fillStyle = '#2f2f2e';
  An.getContext().strokeStyle = '#2f2f2e';

  An.frame(function (ctx, i) {
    /** @type CanvasRenderingContext2D */
    ctx = ctx;

    Movie.arc_center();
    Movie.arc_0();
    Movie.arc_1();
    Movie.arc_2();
    Movie.arc_3();
    Movie.arc_4();
    Movie.arc_5();
    Movie.arc_6();

  });
  // start
  An.start();


})();