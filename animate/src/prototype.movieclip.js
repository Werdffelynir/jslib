/**
 *
 * @param opts
 * @param callback
 * @param thisInstance      if `true` prototype = options
 * @returns {clip}
 * @constructor
 */
Animate.prototype.MovieClip = function (opts, callback, thisInstance) {

  var
    key,
    context = this.getContext(),
    options = {
      x: undefined,
      y: undefined,
      translate: undefined,
      transform: undefined,
      rotate: undefined,
      rotation: undefined,
      scale: undefined,
      alpha: undefined,
      composite: undefined,
      setTranslate: function () {this.translate = arguments},
      setTransform: function () {this.transform = arguments},
      setScale: function () {this.scale = arguments},
      setRotate: function () {this.rotate = arguments[0]},
      setRotation: function () {this.rotation = arguments[0]},
      setAlpha: function () {this.alpha = arguments[0]},
      setComposite: function () {this.composite = arguments[0]},
      instance: this
    };

  for (key in options) {
    if (opts[key] !== undefined) options[key] = opts[key]}

  for (key in opts) {
    if (options[key] === undefined) options[key] = opts[key]}

  return Animate.Clip(options, function () {
    // save state
    context.save();

    // set dynamic options
    if (this.translate !== undefined) {
      CanvasRenderingContext2D.prototype.translate.apply(context, this.translate)}
    if (this.transform !== undefined) {
      CanvasRenderingContext2D.prototype.setTransform.apply(context, this.transform)}
    if (this.scale !== undefined) {
      CanvasRenderingContext2D.prototype.scale.apply(context, this.scale)}
    if (this.rotate !== undefined) {
      context.rotate(this.rotate)}
    if (this.rotation !== undefined) {
      context.rotate(Animate.degreesToRadians(this.rotation))}
    if (this.alpha !== undefined) {
      context.globalAlpha = this.alpha }
    if (this.composite !== undefined) {
      context.globalCompositeOperation = this.composite}

    callback.apply(this, arguments);

    // restore state
    context.restore();

  }, thisInstance);
};
