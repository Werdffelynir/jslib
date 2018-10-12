
class AnimateConfig {
  constructor (config) {
    this.config = {...{
        selector: null,
        width: 600,
        height: 400,
        fps: 30,
        loop: ANIMATE_LOOP,
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
    this._events = {
      frames:null,
      click:null,
      mousemove:null,
      mousedown:null,
      mouseup:null,
      keydown:null,
      keyup:null };

    this._canvas = null;
    this._context = null;

    this._fpsTimeNow = 0;
    this._fpsTimeThen = 0;
    this._fpsTimeFirst = 0;
    this._fpsDelta = 0;
    this._fpsInterval = 1000 / this.config.fps;
    this._requestanimationframeid = null;

    this._sceneName = 'default';
    this._paused = false;
    this._iteration = 0;

    try {
      this._canvas = document.querySelector(this.config.selector);
      this._context = this._canvas.getContext('2d');

      this.width = this._canvas.width = this.config.width ;
      this.height = this._canvas.height = this.config.height;
    } catch (err) {
      throw new Error(err);
    }
  }

  // on (name, cb) {
  //   this._events[name] = typeof cb === 'function' ? cb : null;
  //   this._canvas.addEventListener(name, (event) => this._events[name].call(this, event, this.getMouseEventPosition(event)));
  // }

  // _events_init () {
  //   if (this._events['click'] && !(this._events_click_inited = true))
  //     this._canvas.addEventListener('click', (event) => this._events['click'].call(this, event, this.mousePosition(event)));
  //
  //   if (this._events['mousemove'] && !(this._events_mousemove_inited = true))
  //     this._canvas.addEventListener('click', (event) => this._events['click'].call(this, event, this.mousePosition(event)));
  // }
  //
  // _events_remove () {}


  sceneObject (params) {
    if (typeof params === 'function') params = {init: params};
    return {...{animate: this, index: 100, hide: false, name: 'scene', init: null}, ...params};
  }

  loop () {
    if (!this._paused) {
      this._requestanimationframeid = requestAnimationFrame( () => this.loop() );
      this._fpsTimeNow = Date.now();
      this._fpsDelta = this._fpsTimeNow - this._fpsTimeThen;
      if (this._fpsDelta > this._fpsInterval) {
        this._fpsTimeThen = this._fpsTimeNow - ( this._fpsDelta % this._fpsInterval );
        this._iteration ++;
        this.clear();
        this.draw();
      }
    }
  }

  draw () {
    this._scenes[this._sceneName].map((cb) =>
      cb.bind(this)(this._context, this._iteration)) }

  clear () {
    this._context.clearRect( 0, 0, this.config.width, this.config.height ) }

  scene (sceneName, params, cb) {
    if (!Array.isArray(this._scenes[sceneName])) this._scenes[sceneName] = [];
    this._scenes[sceneName].push(cb.bind(this.sceneObject(params))) }

  stop () {
    this._paused = true;
    window.cancelAnimationFrame(this._requestanimationframeid) }

  start (sceneName = null) {
    if (sceneName) this._sceneName = sceneName;
    this.stop();
    this._fpsTimeThen = Date.now();
    this._fpsTimeFirst = this._fpsTimeThen;
    this._paused = false;
    // this._events_init();
    this.loop();
  }

  getFPS () {
    return Math.ceil(this._iteration / ( (this._fpsTimeThen - this._fpsTimeFirst) / 1000)) }

  getIteration () {
    return this._iteration }

}

/** Set script version. Property [read-only]*/
Object.defineProperty(AnimateApplication, 'version', {
  enumerable: false, configurable: false, writable: false, value: '0.8.0.0'
});

