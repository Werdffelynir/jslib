
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

    this._sceneName = 'default';
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

  draw (sceneName = null) {
    if (sceneName) this._sceneName = sceneName;

    this._iteration ++;
    this._scenes[this._sceneName].map((cb) =>
        cb.bind(this)(this._context, this._iteration));

    if (this._frameCallback && this._frameCallback.init)
      this._frameCallback.bind(this)(this._context, this._iteration)
  };

  clear () {
    this._context.clearRect( 0, 0, this.config.width, this.config.height );
    return this;
  }

  scene (sceneName, params, cb) {
    if (!Array.isArray(this._scenes[sceneName])) this._scenes[sceneName] = [];
    this._sceneName = sceneName;
    this._scenes[sceneName].push(cb.bind(this.sceneObject(params)));
    return this;
  }

  stop () {
    this._paused = true;
    window.cancelAnimationFrame(this._requestanimationframeid);
    return this;
  }

  start (sceneName = null) {
    if (sceneName) this._sceneName = sceneName;
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
        if (isDefined(props[key]))
          this._context[key] = props[key];
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
  };
}


/** Set script version. Property [read-only]*/
Object.defineProperty(AnimateApplication, 'version', {
  enumerable: false, configurable: false, writable: false, value: '0.8.0.0'
});

