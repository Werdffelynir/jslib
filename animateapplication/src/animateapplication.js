
class AnimateConfig {
  constructor (config) {
    this.config = {...{
        selector: null,
        width: 600,
        height: 400,
        fps: 30,
        loop: LOOP_ANIMATE,
        fullScreen: false,
        autoStart: true,
        autoClear: true,
        sorting: true,
        filtering: true,
      }, ...config };
  }
}

class AnimateApplication extends AnimateConfig {

  constructor (...config) {

    if (config.length > 1) {
      config = {selector: config[0], width: parseInt(config[1]), height: parseInt(config[2]), fps: config[3] || 0};
    }

    super(config);

    this._scenes = {};
    this._canvas = null;
    this._context = null;
    this._frameCallback = null;

    this._fpsTimeNow = 0;
    this._fpsTimeThen = 0;
    this._fpsTimeFirst = 0;
    this._fpsDelta = 0;
    this._fpsInterval = 1000 / this.config.fps;
    this._requestanimationframeid = null;

    this._sn = 'default';
    this._paused = false;
    this._iteration = 0;
    this._global = document ? document : {};

    try {
      this._canvas = this._global.querySelector(this.config.selector);
      this._context = this._canvas.getContext('2d');

      this.width = this._canvas.width = this.config.width ;
      this.height = this._canvas.height = this.config.height;
    } catch (err) {
      throw new Error(err);
    }
  }

  sceneObject (params) {
    if (typeof params === 'function') params = {init: params};
    return {...{animate: this, index: 100, hide: false, name: 'scene', init: null}, ...params};
  }

  _loop () {
    if (!this._paused) {
      this._requestanimationframeid = requestAnimationFrame( () => this._loop() );
      this._fpsTimeNow = Date.now();
      this._fpsDelta = this._fpsTimeNow - this._fpsTimeThen;
      if (this._fpsDelta > this._fpsInterval) {
        this.clear();
        this.draw();
        this._fpsTimeThen = this._fpsTimeNow - ( this._fpsDelta % this._fpsInterval );
      }
    }
  }

  draw (sn = null) {
    if (sn) this._sn = sn;

    if (this._sn && this._scenes[this._sn]) {
      this._iteration ++;
      this._scenes[this._sn].map((cb) => {
        if (typeOf(cb, 'function')) cb(this._context, this._iteration)
      });
    }

    if (this._frameCallback && this._frameCallback.init)
      this._frameCallback.bind(this)(this._context, this._iteration)
  }

  clear () {
    this._context.clearRect( 0, 0, this.config.width, this.config.height );
    return this;
  }

  scene (sn, params, cb) {
    if (!typeOf(this._scenes[sn], 'array')) this._scenes[sn] = [];
    this._sn = sn;
    this._scenes[sn].push(cb.bind(this.sceneObject(params)));
    return this;
  }

  stop () {
    this._paused = true;
    window.cancelAnimationFrame(this._requestanimationframeid);
    return this;
  }

  start (sn = null) {
    if (sn) this._sn = sn;
    this.stop();
    this._fpsTimeThen = Date.now();
    this._fpsTimeFirst = this._fpsTimeThen;
    this._paused = false;
    this._loop();
    return this;
  }

  getFPS () {
    return Math.ceil(this._iteration / ( (this._fpsTimeThen - this._fpsTimeFirst) / 1000))
  }

  getIteration () {
    return this._iteration
  }
  getWidth () {
    return this.config.width
  }
  getHeight () {
    return this.config.height
  }

  /**
   * @returns {null|CanvasRenderingContext2D}
   */
  getContext (props = null) {
    if (props) {
      let key;
      for (key in props)
        if (isDefined(props[key]) && isDefined(this._context[key])) this._context[key] = props[key];
    }
    return this._context
  }

  /**
   * @returns {null|HTMLCanvasElement}
   */
  getCanvas () {
    return this._canvas
  }

  /**
   *
   * @returns {Document | *}
   */
  getGlobal () {
    return this._global
  }

  /**
   * Hit point inside rectangle
   * @param rectangle
   * @param point
   * @returns {boolean}
   */
  hitTest (rectangle, point) {
    const x = parseInt(point.x), y = parseInt(point.y);
    return x > rectangle[0] &&
      y > rectangle[1] &&
      x < rectangle[0] + rectangle[2] &&
      y < rectangle[1] + rectangle[3];
  };

  /**
   * isPointInPath
   * hitTestPoint(point)
   * @param point {object}
   * @returns {boolean}
   */
  hitTestPoint (point) {
    return this._context.isPointInPath(point.x, point.y);
  }

  /**
   * @param props
   * @param callback
   * @returns {function()}
   */
  createMovieclip (props, callback) {
    const ctx = this._context;
    return (...propsInside) => {
      ctx.save();
      if (isDefined(props.x)) ctx.translate(props.x, props.y);
      if (isDefined(props.rotate)) ctx.rotate(props.rotate);
      callback.apply(props, propsInside);
      ctx.restore();
    }
  }


  clip (options, callback, thisInstance) {
    return (...args) => callback.bind(options).apply(thisInstance || {}, args || {})
  };

  movieclip (opts, callback, thisInstance) {
    const context = this.getContext();
    const options = { ...{
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
      }, ...opts};

    return this.clip(options, function (...args) {
        context.save();
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

        callback.apply(this, args);
        context.restore();
      },
      thisInstance);
  }



}


/** Set script version. Property [read-only]*/
Object.defineProperty(AnimateApplication, 'version', {
  enumerable: false, configurable: false, writable: false, value: '0.8.0.0'
});

