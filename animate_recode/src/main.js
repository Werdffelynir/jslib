(function () {

  "use strict";

  window.requestAnimationFrame = function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function (f) {window.setTimeout(f, 1e3 / 60);}
  }();

  var Animate = function (config, width, height, fps) {
    if (!(this instanceof Animate)) return new Animate(config, width, height, fps);

    if (arguments.length > 1) {
      config = {selector: arguments[0], width: parseInt(arguments[1]), height: parseInt(arguments[2]), fps: arguments[3] || 0};
    }

    var _constructor = [[['constructor']]];

    _constructor.call(this, config);
  };

  [[['static']]]

  [[['prototype']]]

  /** Set script version. Property [read-only]*/
  Object.defineProperty(Animate, 'version', {
    enumerable: false, configurable: false, writable: false, value: '0.6.0'
  });

  window.Animate = Animate;

})();



var animateSimple = new Animate('#canvas', 100, 100, 30);
console.log(animateSimple);

/*

var animate = new Animate({
  selector: '#canvas',
  width: 100,
  height: 100,
  fps: 30
});

var animateSimple = new Animate('#canvas', 100, 100, 30);

console.log(animate, animateSimple);

*/
