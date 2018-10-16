(function () {

  var An = new Animate({
    selector: '#canvas',
    width: 600,
    height: 400,
    fps: 12,
    urimg: '/animate/demo/assets/'
  });


  // * * * * * * * * * * * * * * * * * * * * * * * * *
  var Move = {images: false};

  Animate.Loader.images({
    meteor1:     An.urimg + 'meteor-1.png',
    meteor2:     An.urimg + 'meteor-2.png',
    rocket:      An.urimg + 'rocket.png'
  }, function (list) {
    Move.images = list;
  });

  An.frame(function (ctx, frameCounter) {
    /** @type CanvasRenderingContext2D */
    ctx = ctx;

    if (Move.images) {
      ctx.drawImage(Move.images.meteor1, 80, 80);
      ctx.drawImage(Move.images.meteor2, 400, 160);
      ctx.drawImage(Move.images.rocket, 280, 150);
    }

  });


  An.getContext().globalAlpha = 0.1;
  // start
  An.start();

})();
