(function () {

  var An = new Animate({
    selector: '#canvas',
    width: 600,
    height: 400,
    fps: 24,
    urlAssets: '/animate/demo/assets/'
  });

  var Graphic = An.Graphic();
  var TextField = An.TextField();

  // DEMO - DEMO - DEMO - DEMO - DEMO - DEMO - DEMO

  var Move = {
    audioList: false,
    ready: false,
    played: false
  };

  Move.drawButton = An.Clip({}, function (ctx, frameCounter) {

    ctx.save();
    ctx.translate(200, 100);

    Graphic.rect(0,0, 200,50)
      .color(Move.played ? '#e7e7e7' : '#d4d4d4')
      .fill();

    if (Move.mouseEvent && !Move.played) {
      if (An.hitTestPoint(An.mousePosition(Move.mouseEvent))) {

        Move.played = true;

        setTimeout(function () {
          // Reset audio
          Move.played = false;
          Move.audioList['dominictreis'].pause();
          Move.audioList['dominictreis'].currentTime = 0
        }, Move.audioList['dominictreis'].duration * 500);

        Move.audioList['dominictreis'].play();
      }
    }

    Graphic.shape([10,10, 40,25, 10, 40], true)
      .color(Move.played ? '#848484' : '#343434')
      .fill();

    ctx.restore();

  });




  An.Loader.audios({
    dominictreis: An.urlAssets + 'dominictreis.mp3'
  }, function (list) {
    Move.audioList = list;
    Move.ready = true;
  });

  An.onMousedown = function (event) {
    Move.mouseEvent = event;
  };

  An.onMouseup = function (event) {
    Move.mouseEvent = false;
  };

  An.frame(function (ctx, frameCounter) {
    /** @type CanvasRenderingContext2D */
    ctx = ctx;

    if (Move.ready) {
      Move.drawButton(ctx, frameCounter);
    }

  });


  // start
  An.start();

})();
