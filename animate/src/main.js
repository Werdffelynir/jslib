(function () {

  /**
   * Create Animate object
   *
   * ```
   * Example:
   * var an = new Animate({
   *    selector: '#canvas',
   *    width: 600,
   *    height: 400,
   *    fps: 30
   * });
   *
   * an.frame(function (ctx, i) {
   *    console.log(ctx, i);
   *    if (i > 60)
   *      an.stop();
   * });
   *
   * an.start();
   * ```
   */

  "use strict";

  window.requestAnimationFrame = function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function (f) {window.setTimeout(f, 1e3 / 60);}
  }();

  /**
   * Constructor
   *
   * ```
   * Example:
   * new Animate({ selector: '#canvas', width: 600, height: 400, fps: 30 });
   *
   * // Or
   *
   * new Animate('#canvas', 100, 100, 30);
   * ```
   *
   * @param config
   * @param width
   * @param height
   * @param fps
   * @returns {Animate}
   * @constructor
   */
  var Animate = function (config, width, height, fps) {
    if (!(this instanceof Animate)) return new Animate(config, width, height, fps);

    if (arguments.length > 1) {
      config = {selector: arguments[0], width: parseInt(arguments[1]), height: parseInt(arguments[2]), fps: arguments[3] || 0};
    }

    var _constructor = [[['constructor']]];

    _constructor.call(this, config);
  };

  [[['static']]]
  

  [[['static.to.instance']]]
  

  [[['prototype']]]
  

  [[['prototype.movieclip']]]
  

  [[['prototype.sprite']]]
  

  [[['prototype.keypress']]]
  

  [[['prototype.mousepress']]]
  

  [[['prototype.graphic']]]
  

  [[['prototype.text']]]
  

  /** Set script version. Property [read-only]*/
  Object.defineProperty(Animate, 'version', {
    enumerable: false, configurable: false, writable: false, value: '0.6.0'
  });

  /**
   * @type {Animate}
   */
  window.Animate = Animate;

})();



