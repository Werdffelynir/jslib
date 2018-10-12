(function () {

  var An = new Animate({
    selector: '#canvas',
    width: 600,
    height: 400,
    fps: 24
  });

  // * * * * * * * * * * * * * * * * * * * * * * * * *

  var TextField = An.TextField();
  var Noise = {};

  TextField.color('#919191');

  Noise.imagedata = An.getContext().createImageData(An.width, An.height);
  Noise.i = 0;
  Noise.data = [];
  Noise.draw = function (ctx, frameIteration) {

    if (Noise.data.length < 50) {
      var i, color;
      for (i = 0; i < Noise.imagedata.data.length; i += 4)
      {
        color = An.random(0,1) ? 255 : 0;
        Noise.imagedata.data[i+0] = color;
        Noise.imagedata.data[i+1] = color;
        Noise.imagedata.data[i+2] = color;
        Noise.imagedata.data[i+3] = 55;
      }
      ctx.putImageData(Noise.imagedata, 0, 0);

      Noise.data.push(ctx.getImageData(0, 0, An.width, An.height));

      TextField.text('GENERATE: ' +  Noise.data.length, 10, 10).fill()

    } else {

      if (Noise.i < Noise.data.length) {
        if (Noise.data[Noise.i] instanceof ImageData) {
          ctx.putImageData(Noise.data[Noise.i], 0, 0);
        }

        Noise.i ++;

        if (Noise.i >= Noise.data.length) {
          Noise.i = 0;
        }

      }

      TextField.text('FRAME: ' +  Noise.i, 10, 10).fill();
    }

  };

  An.backgroundColor('#03020f');

  An.frame(function (ctx, i) {
    /** @type CanvasRenderingContext2D */
    ctx = ctx;

    Noise.draw(ctx, i);
  });

  // start
  An.start();

})();