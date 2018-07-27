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


  var getDistance = function (a, b) {
    return Math.sqrt((b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y));
  };

  function getValidatorForPoints(x1, y1, x2, y2) {
    var slope = (y2 - y1) / (x2 - x1);
    return function (x, y) {
      return (y - y1) === slope * (x - x1);
    }
  }

  var DrawLine = An.Clip({
    startPoint: null,
    endPoint: null,
    acerPoint: null,
    dynamicPoint: null,


    currentStep: 0,
    steps: 100,

  }, function (sPoint, ePoint) {

    console.log('sPoint, ePoint', sPoint, ePoint);
    // // init
    if (this.startPoint === null) {
      this.dynamicPoint = Object.assign(sPoint);
      this.startPoint = sPoint;
      this.endPoint = ePoint;
      this.acerPoint = {
        x: (this.endPoint.x - this.startPoint.x) / 100,
        y: (this.endPoint.y - this.startPoint.y) / 100
      };
    //   // console.log('this', this);
    }

    // if (this.steps > this.currentStep) {
    //   this.currentStep ++;
    //   // this.dynamicPoint.x = this.startPoint.x + (this.endPoint.x - this.startPoint.x) / this.steps * this.currentStep;
    //   // this.dynamicPoint.y = this.startPoint.y + (this.endPoint.y - this.startPoint.y) / this.steps * this.currentStep;
    //
    //   // this.dynamicPoint.x = this.startPoint.x + (this.endPoint.x - this.startPoint.x) / this.steps * this.currentStep;
    //   // this.dynamicPoint.y = this.startPoint.y + (this.endPoint.y - this.startPoint.y) / this.steps * this.currentStep;
    // }
    // console.log('this', this);
    // var x = (this.endPoint.x - this.startPoint.x) / 100;
    // var y = (this.endPoint.y - this.startPoint.y) / 100;

    // console.log('x', x );
    // console.log('y', y );
    // console.log('distanceBetween', Animate.distanceBetween(this.dynamicPoint, this.endPoint) );

    this.dynamicPoint.x += this.acerPoint.x;
    this.dynamicPoint.y += this.acerPoint.y;

    // console.log('startPoint:dynamicPoint', this.startPoint, this.dynamicPoint);
    //console.log('acerPoint:dynamicPoint', this.acerPoint, this.dynamicPoint);
    // console.log('dynamicPoint', this.dynamicPoint);
    console.log('this', this);

    Graphic.line(
      this.startPoint.x,
      this.startPoint.y,
      this.dynamicPoint.x,
      this.dynamicPoint.y

    ).thickness(5).stroke();

    return this;
  });

  // var draw1 = DrawLine({x: 10, y: 10}, {x: 10, y: 210});
  // var draw2 = DrawLine({x: 10, y: 210}, {x: 210, y: 210});
  // var draw3 = DrawLine({x: 210, y: 210}, {x: 210, y: 10});
  // var draw4 = DrawLine({x: 210, y: 10}, {x: 10, y: 10});
  // var draw = Movie.drawline = DrawLine(
  //   {x: 10,  y: 10},
  //   {x: 100, y: 100}
  // );
  //
  // console.log(draw);

  An.frame(function (ctx, i) {
    /** @type CanvasRenderingContext2D */
    ctx = ctx;

    DrawLine(
      {x: 10,  y: 10},
      {x: 100, y: 100}
    );




    // DrawLine({x: 300, y: 0}, {x: 300, y: 300},
    //   DrawLine({x: 300, y: 300}, {x: 30, y: 300}));

  });

  An.onClick(function (event, pos) {
  });

  // start
  An.start();
})();


// t: current time, b: beginning value, _c: final value, d: total duration
var tweenFunctions = {
  linear: function(t, b, _c, d) {
    var c = _c - b;
    return c * t / d + b;
  },
  easeInQuad: function(t, b, _c, d) {
    var c = _c - b;
    return c * (t /= d) * t + b;
  },
  easeOutQuad: function(t, b, _c, d) {
    var c = _c - b;
    return -c * (t /= d) * (t - 2) + b;
  },
  easeInOutQuad: function(t, b, _c, d) {
    var c = _c - b;
    if ((t /= d / 2) < 1) {
      return c / 2 * t * t + b;
    } else {
      return -c / 2 * ((--t) * (t - 2) - 1) + b;
    }
  },
  easeInCubic: function(t, b, _c, d) {
    var c = _c - b;
    return c * (t /= d) * t * t + b;
  },
  easeOutCubic: function(t, b, _c, d) {
    var c = _c - b;
    return c * ((t = t / d - 1) * t * t + 1) + b;
  },
  easeInOutCubic: function(t, b, _c, d) {
    var c = _c - b;
    if ((t /= d / 2) < 1) {
      return c / 2 * t * t * t + b;
    } else {
      return c / 2 * ((t -= 2) * t * t + 2) + b;
    }
  },
  easeInQuart: function(t, b, _c, d) {
    var c = _c - b;
    return c * (t /= d) * t * t * t + b;
  },
  easeOutQuart: function(t, b, _c, d) {
    var c = _c - b;
    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
  },
  easeInOutQuart: function(t, b, _c, d) {
    var c = _c - b;
    if ((t /= d / 2) < 1) {
      return c / 2 * t * t * t * t + b;
    } else {
      return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    }
  },
  easeInQuint: function(t, b, _c, d) {
    var c = _c - b;
    return c * (t /= d) * t * t * t * t + b;
  },
  easeOutQuint: function(t, b, _c, d) {
    var c = _c - b;
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
  },
  easeInOutQuint: function(t, b, _c, d) {
    var c = _c - b;
    if ((t /= d / 2) < 1) {
      return c / 2 * t * t * t * t * t + b;
    } else {
      return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    }
  },
  easeInSine: function(t, b, _c, d) {
    var c = _c - b;
    return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
  },
  easeOutSine: function(t, b, _c, d) {
    var c = _c - b;
    return c * Math.sin(t / d * (Math.PI / 2)) + b;
  },
  easeInOutSine: function(t, b, _c, d) {
    var c = _c - b;
    return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
  },
  easeInExpo: function(t, b, _c, d) {
    var c = _c - b;
    return (t === 0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
  },
  easeOutExpo: function(t, b, _c, d) {
    var c = _c - b;
    return (t === d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
  },
  easeInOutExpo: function(t, b, _c, d) {
    var c = _c - b;
    if (t === 0) {
      return b;
    }
    if (t === d) {
      return b + c;
    }
    if ((t /= d / 2) < 1) {
      return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    } else {
      return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }
  },
  easeInCirc: function(t, b, _c, d) {
    var c = _c - b;
    return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
  },
  easeOutCirc: function(t, b, _c, d) {
    var c = _c - b;
    return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
  },
  easeInOutCirc: function(t, b, _c, d) {
    var c = _c - b;
    if ((t /= d / 2) < 1) {
      return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
    } else {
      return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    }
  },
  easeInElastic: function(t, b, _c, d) {
    var c = _c - b;
    var a, p, s;
    s = 1.70158;
    p = 0;
    a = c;
    if (t === 0) {
      return b;
    } else if ((t /= d) === 1) {
      return b + c;
    }
    if (!p) {
      p = d * 0.3;
    }
    if (a < Math.abs(c)) {
      a = c;
      s = p / 4;
    } else {
      s = p / (2 * Math.PI) * Math.asin(c / a);
    }
    return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
  },
  easeOutElastic: function(t, b, _c, d) {
    var c = _c - b;
    var a, p, s;
    s = 1.70158;
    p = 0;
    a = c;
    if (t === 0) {
      return b;
    } else if ((t /= d) === 1) {
      return b + c;
    }
    if (!p) {
      p = d * 0.3;
    }
    if (a < Math.abs(c)) {
      a = c;
      s = p / 4;
    } else {
      s = p / (2 * Math.PI) * Math.asin(c / a);
    }
    return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
  },
  easeInOutElastic: function(t, b, _c, d) {
    var c = _c - b;
    var a, p, s;
    s = 1.70158;
    p = 0;
    a = c;
    if (t === 0) {
      return b;
    } else if ((t /= d / 2) === 2) {
      return b + c;
    }
    if (!p) {
      p = d * (0.3 * 1.5);
    }
    if (a < Math.abs(c)) {
      a = c;
      s = p / 4;
    } else {
      s = p / (2 * Math.PI) * Math.asin(c / a);
    }
    if (t < 1) {
      return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    } else {
      return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
    }
  },
  easeInBack: function(t, b, _c, d, s) {
    var c = _c - b;
    if (s === void 0) {
      s = 1.70158;
    }
    return c * (t /= d) * t * ((s + 1) * t - s) + b;
  },
  easeOutBack: function(t, b, _c, d, s) {
    var c = _c - b;
    if (s === void 0) {
      s = 1.70158;
    }
    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
  },
  easeInOutBack: function(t, b, _c, d, s) {
    var c = _c - b;
    if (s === void 0) {
      s = 1.70158;
    }
    if ((t /= d / 2) < 1) {
      return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
    } else {
      return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
    }
  },
  easeInBounce: function(t, b, _c, d) {
    var c = _c - b;
    var v;
    v = tweenFunctions.easeOutBounce(d - t, 0, c, d);
    return c - v + b;
  },
  easeOutBounce: function(t, b, _c, d) {
    var c = _c - b;
    if ((t /= d) < 1 / 2.75) {
      return c * (7.5625 * t * t) + b;
    } else if (t < 2 / 2.75) {
      return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
    } else if (t < 2.5 / 2.75) {
      return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
    } else {
      return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
    }
  },
  easeInOutBounce: function(t, b, _c, d) {
    var c = _c - b;
    var v;
    if (t < d / 2) {
      v = tweenFunctions.easeInBounce(t * 2, 0, c, d);
      return v * 0.5 + b;
    } else {
      v = tweenFunctions.easeOutBounce(t * 2 - d, 0, c, d);
      return v * 0.5 + c * 0.5 + b;
    }
  }
};




// dPoint = sPoint;
// ePoint = pos;
// Movie.player.dx = Math.cos((pos.x - Movie.player.x));
// Movie.player.dy = Math.sin((pos.y - Movie.player.y));
// Movie.player.dx = (pos.x - Movie.player.x) / 50;
// Movie.player.dy = (pos.y - Movie.player.y) / 50;
//
// Movie.player.moveToX = pos.x;
// Movie.player.moveToY = pos.y;


// Movie.player = Player();
// console.log(Movie.player);
// var deltaTime = (i - startTime) / duration;
// dPoint.x += (ePoint.x - sPoint.x) / 40;
// dPoint.y += (ePoint.y - sPoint.y) / 40;
// Graphic.line(
//   sPoint.x, sPoint.y,
//   ePoint.x, ePoint.y
// ).stroke();
/*    if (this.dX === null && this.dY === null) {
      this.increaseX = this.startX;
      this.increaseY = this.startY;
      this.dX = (this.toX - this.startX) / 100;
      this.dY = (this.toY - this.startY) / 100;
    }
    this.increaseX += this.dX;
    this.increaseY += this.dY;
    console.log(this);
    Graphic.line(this.startX, this.startY, this.increaseX, this.increaseY)
      .thickness(5)
      .stroke();*/

// g.lineTo(startPoint.x+(endPoint.x-startPoint.x)/steps*currentStep,
//   startPoint.y+(endPoint.y-startPoint.y)/steps*currentStep);
// //startPoint.y+(endPoint.y-startPoint.y)*currentStep)
// ;