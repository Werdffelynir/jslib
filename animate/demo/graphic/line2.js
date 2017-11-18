(function () {

  var An = new Animate({
    selector: '#canvas',
    width: 600,
    height: 400,
    fps: 1,

    // Movies
    act: 'start',
    acts: {start: 'start', b: ''}
  });

  // * * * * * * * * * * * * * * * * * * * * * * * * *
  var Graphic = An.Graphic();
  var TextField = An.TextField();

  An.backgroundColor('#cacaca');

  // var alines = (new Array(50)).forEach(function callback(currentValue, index, array) {
  //     return Animate.random(0, 400);
  // });
  var Move = {};
  Move.linesArr = (function () {
    var i, ar = [];
    for (i = 0; i < 100; i++) ar.push(Animate.random(0, 400))
    return ar
  })();

  Move.mcBoll = An.MovieClip({
    // rotation: 0
  }, function (ctx, i) {

    console.log(this, ctx, i);
    // this.rotation ++;
    this.setRotation(i);

    Graphic.line(50,50, 200,50)
      .thickness(5)
      .stroke();
  });

  An.frame(function (ctx, i) {
    /** @type CanvasRenderingContext2D */
    ctx = ctx;


    Move.mcBoll(ctx, i);













    TextField.text('Frame: ' + i, 10, 10)
      .color('#000').fill();

/*
    ctx.save();
    ctx.translate(An.width/2, An.height/2);
    Graphic.line(0,0, 200,0)
      .thickness(5)
      .stroke();
    ctx.restore();
*/

    //ball.setRotation(i);
    //console.log(TextField.formats);























/*    ctx.save();
    ctx.translate(0, 200);
    Graphic.cap(Graphic.CAPS.SQUARE);
    Graphic.color('#262626');

    var ss =  Math.sin(i / 50) * 220;
    TextField.text('sin: ' + ss, 10, 10).color('#000').fill();


    Graphic.line(100, ss, 500, ss)
      .thickness(1)
      .stroke();

    ctx.restore();*/

    /*        Graphic.line(100, 110, 500, 110)
                .thickness(1)
                .stroke();
            Graphic.line(100, 130, 500, 150)
                .thickness(5)
                .stroke();
            Graphic.line(100, 160, 500, 190)
                .thickness(25)
                .stroke();

            Graphic.cap(Graphic.CAPS.ROUND);
            Graphic.color('#414141');

            Graphic.line(10, 10, i * 3.1, 10)
                .thickness(5)
                .stroke();
            Graphic.line(20, 20, i * 3.2, 20)
                .thickness(4)
                .stroke();
            Graphic.line(30, 30, i * 3.3, 30)
                .thickness(3)
                .stroke();

            Graphic.line(10, 10, 10, i * 2.4)
                .thickness(5)
                .stroke();
            Graphic.line(20, 20, 20, i * 2.3)
                .thickness(4)
                .stroke();
            Graphic.line(30, 30, 30, i * 2.2)
                .thickness(3)
                .stroke();

            TextField.text('Frame: ' + i, 10, 380).color('#000').fill();
            if (i > 149)
                An.stop();*/
  });

  // start
  An.start();
})();