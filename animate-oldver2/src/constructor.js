(function (config) {

  var pk,

    /** @type Animate */
    options = {

      // parameters
      selector: null,
      width: 600,
      height: 400,
      fps: 30,
      loop: Animate.LOOP_ANIMATE,
      fullScreen: false,
      autoStart: true,
      autoClear: true,
      sorting: true,
      filtering: true,

      // events
      onFrame: function (callback) {this.onFrameCallback = callback;},
      onClick: function (callback) {this.onClickCallback = callback;},
      onMousemove: function (callback) {this.onMousemoveCallback = callback;},
      onMousedown: function (callback) {this.onMousedownCallback = callback;},
      onMouseup: function (callback) {this.onMouseupCallback = callback;},
      onKeydown: function (callback) {this.onKeydownCallback = callback;},
      onKeyup: function (callback) {this.onKeyupCallback = callback;},

      onFrameCallback: null,
      onClickCallback: null,
      onMousemoveCallback: null,
      onMousedownCallback: null,
      onMouseupCallback: null,
      onKeydownCallback: null,
      onKeyupCallback: null,

      // internal
      _canvas: null,
      _context: null,
      _is_playing: false,
      _is_filtering: false,
      _iterator: 0,
      _frames: {},
      _current_frame_name: 'default',
      _loop_timer_id: null,
      _loop_animation_frame_id: null
    };

  // Set options
  Animate.defaultObject(options, config);

  for (pk in options)
    this[pk] = options[pk];

  /** @type {HTMLCanvasElement|Element|null} */
  this._canvas = document.querySelector(this.selector);

  if (Animate.typeOfStrict(this._canvas) !== 'HTMLCanvasElement')
    new Error('HTMLCanvasElement not found!');

  this._canvas.width = this.width;
  this._canvas.height = this.height;
  /** @type {CanvasRenderingContext2D|null} */
  this._context = this._canvas.getContext('2d');

  // initialize extensions
  if (Animate._internal_extensions.length > 0)
    for (var ei = 0; ei < Animate._internal_extensions.length; ei++)
      if (typeof Animate._internal_extensions[ei] === 'function')
        Animate._internal_extensions[ei].call(this, this);

  // custom settings
  if (this.fullScreen) this.resizeCanvas();

})