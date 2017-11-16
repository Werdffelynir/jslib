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
    currentScene: '',
    scene: {
      start: 'start',
      boom: 'boom',
      levitation: 'levitation',
      end: 'end'
    },
    images: {}
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


  An.getContext().fillStyle = Movie.baseColor;
  An.getContext().strokeStyle = Movie.baseColor;

  An.resource.loadImage({
    sk: '/animate-oldver/demo/images/sk-ico.png'
  }, function (list) {
    Movie.images = list;

    Movie.icoAnimation = false;
    Movie.ico = An.createMovieClip({
      x: (Movie.width / 2),
      y: (Movie.height / 2),
      alpha: 0.05,
      scale: [3, 3],
      scaleDynamic: [3, 3],
      speed: 0.002,
      speedMax: 0.01,
      speedAccelerate: 0.001,
      speedAccelerateMin: 0.001,
      speedAccelerateMax: 0.01
    }, function (ctx, i) {


      if (this.speed > this.speedMax) {
        this.speed = this.speedMax;
        this.speedAccelerate *= -1;
      }

      if (this.speed < 0) {
        this.speed = 0;
        this.speedAccelerate *= -1;
      }

      if (this.speedAccelerate > this.speedAccelerateMin) {
        this.speedAccelerate -= this.speedAccelerateMin;
      }

      if (Movie.icoAnimation) {
        this.speedAccelerate = (this.speedAccelerate > 0) ? this.speedAccelerateMax : - this.speedAccelerateMax;
        Movie.icoAnimation = false;
      }

      this.rotate += this.speed += this.speedAccelerate;

      ctx.drawImage(
        Movie.images.sk,
        -(Movie.images.sk.width/2),
        -(Movie.images.sk.height/2)
      );

    });

    Movie.currentScene = Movie.scene.start;
  });


  Movie.ico = null;

  An.getCanvas().onclick = function (e) {
    console.log('click');
    Movie.icoAnimation = true;
  };


  An.frame(function (ctx, i) {
    /** @type CanvasRenderingContext2D */
    ctx = ctx;

    ctx.fillText("Frame: " + i, 10, 15);

    if (Movie.currentScene === Movie.scene.start) {
      Movie.ico(ctx, i);



    }


    // ctx.globalAlpha = 0.1;
    //
    // if ( Movie.scale < 1.01) {
    //   Movie.scale += 0.001;
    //   ctx.scale(Movie.scale, Movie.scale);
    // }
    //
    //
    // ctx.drawImage(
    //   Movie.images.sk,
    //   (Movie.width / 2) - (Movie.images.sk.width / 2),
    //   (Movie.height / 2) - (Movie.images.sk.height / 2)
    // );


  });

  An.start();


})();