/**
 *
 * @param options
 * @param callback
 * @param thisInstance      if `true` prototype = options
 * @returns {clip}
 * @constructor
 */
Animate.prototype.MovieClip = function (options, callback, thisInstance) {
  var clip,
    key,
    ctx = this._context;

  var default_options = {
    x: 0,
    y: 0,
    transform: false,
    composite: false,
    rotate: false,
    rotation: false,
    scale: false,
    alpha: false,
    instance: this
  };

  for (key in default_options) {
    if (options[key] === undefined)
      options[key] = default_options[key];
  }

  var func = function () {
    // draw image
    ctx.save();
    ctx.translate(this.x, this.y);

    if (this.transform) {
      CanvasRenderingContext2D.prototype.setTransform.apply(ctx, this.transform);
    }
    if (this.scale) {
      CanvasRenderingContext2D.prototype.scale.apply(ctx, this.scale);
    }
    if (this.rotate) {
      ctx.rotate(this.rotate);
    }
    if (this.rotation) {
      ctx.rotate(Animate.degreesToRadians(this.rotation));
    }
    if (this.alpha) {
      ctx.globalAlpha = this.alpha;
    }
    if (this.composite) {
      ctx.globalCompositeOperation = this.composite;
    }
    callback.apply(this, arguments);
    ctx.restore();

    this.setTransform = function () {this.transform = arguments};
    this.setScale = function () {this.scale = arguments};
    this.setRotate = function () {this.rotate = arguments[0]};
    this.setRotation = function () {this.rotation = arguments[0]};
    this.setAlpha = function () {this.alpha = arguments[0]};
    this.setComposite = function () {this.composite = arguments[0]};

    // return self context
    return this;
  };

  clip = Animate.Clip(options, func, thisInstance);
  return clip;
};



/**
 *
 * @param options
 * @param callback
 * @param thisInstance      if `true` prototype = options
 * @returns {clip}
 * @constructor
 */
Animate.prototype.MovieClip2 = function (options, callback, thisInstance) {
  var key,
    ctx = this.getContext(),
    defaultOptions = {
    x: 0,
    y: 0,
    transform: false,
    composite: false,
    rotate: false,
    rotation: false,
    scale: false,
    alpha: false,
    instance: this
  };

  for (key in defaultOptions) {
    if (options[key] === undefined)
      options[key] = defaultOptions[key];
  }

  return Animate.Clip(options, function () {
    // draw image
    ctx.save();
    ctx.translate(this.x, this.y);

    if (this.transform) {
      CanvasRenderingContext2D.prototype.setTransform.apply(ctx, this.transform);
    }
    if (this.scale) {
      CanvasRenderingContext2D.prototype.scale.apply(ctx, this.scale);
    }
    if (this.rotate) {
      ctx.rotate(this.rotate);
    }
    if (this.rotation) {
      ctx.rotate(Animate.degreesToRadians(this.rotation));
    }
    if (this.alpha) {
      ctx.globalAlpha = this.alpha;
    }
    if (this.composite) {
      ctx.globalCompositeOperation = this.composite;
    }
    callback.apply(this, arguments);
    ctx.restore();

    this.setTransform = function () {this.transform = arguments};
    this.setScale = function () {this.scale = arguments};
    this.setRotate = function () {this.rotate = arguments[0]};
    this.setRotation = function () {this.rotation = arguments[0]};
    this.setAlpha = function () {this.alpha = arguments[0]};
    this.setComposite = function () {this.composite = arguments[0]};

    // return self context
    return this;
  }, thisInstance);

  //return clip;
};