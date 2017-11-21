
/**
 * Return HTMLCanvasElement
 * @type HTMLCanvasElement
 */
Animate.prototype.getCanvas = function () {
  return this._canvas;
};


/**
 * Return CanvasRenderingContext2D
 * @type CanvasRenderingContext2D
 */
Animate.prototype.getContext = function () {
  return this._context;
};

/**
 * @returns {number}
 */
Animate.prototype.getWidth = function () {
  return this._canvas.width;
};

/**
 * @returns {string}
 */
Animate.prototype.getFrameName = function () {
  return this._frame_name;
};

/**
 * @returns {number}
 */
Animate.prototype.getHeight = function () {
  return this._canvas.height;
};

/**
 * Return current iteration
 * @returns {number}
 */
Animate.prototype.getIteration = function () {
  return this._iterator;
};

/**
 * Clear a number of iterations
 */
Animate.prototype.clearIteration = function () {
  this._iterator = 0;
};

/**
 * Return `true` if move is playing, or `false`
 * @returns {boolean}
 */
Animate.prototype.isPlay = function () {
  return this._is_playing;
};

/**
 * Add frame in to each iteration.
 * Return instance index
 * .frame (name, sceneObject)
 * .frame (sceneObject)
 * .frame (function (ctx, i) {})
 * @param frameName
 * @param sceneObject
 * @returns {{index: number, hide: boolean, name: string, init: null}|*}
 */
Animate.prototype.frame = function (frameName, sceneObject) {
  if (arguments.length === 1) {
    if (frameName && (typeof frameName === 'function' || typeof frameName === 'object')) {
      sceneObject = frameName;
      frameName = this._frame_name;
    }
  }
  sceneObject = this.createSceneObject(sceneObject);

  if (!Array.isArray(this._frames[frameName]))
    this._frames[frameName] = [];

  this._frames[frameName].push(sceneObject);
  return sceneObject;
};

/**
 * Remove frame by frame name
 * @param frameName
 */
Animate.prototype.frameRemove = function (frameName) {
  if (this._frames[frameName]) {
    this._frames[frameName] = [];
  }
};

/**
 * Start\Restart animation
 * @param frameName
 */
Animate.prototype.start = function (frameName) {
  this.stop();
  this.play(frameName || this._frame_name);
};

/**
 * Play animation
 * @param frameName
 */
Animate.prototype.play = function (frameName) {

  // initialize events
  this._events_initialize();

  if (!this._is_playing && this._context) {

    // set current frame name
    this._frame_name = frameName;

    if (this.fps === 0 || this.fps === false) {
      this._internal_drawframe.call(this);
    } else if (this.loop === Animate.LOOP_ANIMATE) {
      this._loop_animation_frame();
      this._is_playing = true;
    } else if (this.loop === Animate.LOOP_TIMER) {
      this._loop_timer();
      this._is_playing = true;
    }
  }
};

/**
 * Stop animation
 */
Animate.prototype.stop = function () {
  if (this._is_playing) {
    if (this.loop === Animate.LOOP_ANIMATE) {
      cancelAnimationFrame(this._loop_animation_frame_id);
      this._is_playing = false;
    } else if (this.loop === Animate.LOOP_TIMER) {
      clearTimeout(this._loop_timer_id);
      this._is_playing = false;
    }
  }
};

Animate.prototype._internal_drawframe = function () {
  var i,
    frame,
    frames = this._frames[this._frame_name];

  this._iterator++;

  if (this.autoClear === true)
    this.clear();

  // call onFrame
  if (typeof this.onFrameCallback === 'function')
    this.onFrameCallback.call(this, this._context, this._iterator);

  if (Array.isArray(frames)) {
    if (!this._is_filtering && frames.length > 0) {
      if (!!this.sorting)
        frames = frames.sort(function (one, two) {
          return one['index'] > two['index']
        });
      if (!!this.filtering)
        frames = frames.filter(function (val) {
          return !val['hide']
        });
      this._is_filtering = true;
    }
    for (i = 0; i < frames.length; i++) {
      frame = frames[i];

      // call frames
      if (typeof frame.init === 'function')
        frame.init.call(frame, this._context, this._iterator);
    }
  }
};

Animate.prototype._loop_timer = function () {
  var that = this;
  var fps = this.fps || 30;
  var interval = 1000 / fps;

  return (function loop(time) {
    that._loop_timer_id = setTimeout(loop, interval);
    // call the draw method
    that._internal_drawframe.call(that);
  }());
};

Animate.prototype._loop_animation_frame = function () {
  var that = this;
  var then = new Date().getTime();
  var fps = this.fps || 30;
  var interval = 1000 / fps;

  return (function loop(time) {
    that._loop_animation_frame_id = requestAnimationFrame(loop);
    var now = new Date().getTime();
    var delta = now - then;
    if (delta > interval) {
      then = now - (delta % interval);
      that._internal_drawframe.call(that);
    }
  }(0));
};

/**
 * Clear canvas workspace
 */
Animate.prototype.clear = function () {
  this._context.clearRect(0, 0, this.width, this.height);
};

/**
 * Set camera position and scales
 * @param x         camera position y
 * @param y         camera position x
 * @param wight     camera wight
 * @param callback  function a clip
 */
Animate.prototype.camera = function (x, y, wight, callback) {
  /** @type CanvasRenderingContext2D */
  var ctx = this.getContext();
  var i = this.getIteration();
  var scale = this.width / wight;
  ctx.save();
  ctx.translate(-x - this.camera.position.x, -y - this.camera.position.y);
  ctx.scale(scale, scale);
  callback(ctx, i);
  ctx.restore();
  return this.camera.position;
};
Animate.prototype.camera.position = {x: 0, y: 0};

/**
 * Restore camera position and scales
 */
Animate.prototype.cameraRestore = function () {
  this.getContext().translate(0, 0);
  this.getContext().scale(scale, scale);
};

/**
 * Set resize canvas
 * @param width     default: fullscreen 'window.innerWidth'
 * @param height    default: fullscreen 'window.innerHeight'
 * @param position  default: 'absolute'
 */
Animate.prototype.resizeCanvas = function (width, height, position) {
  if (position !== undefined)
    this._canvas.style.position = position || 'absolute';

  this._canvas.width = this.width = parseInt(width) || window.innerWidth;
  this._canvas.height = this.height = parseInt(height) || window.innerHeight;
};

/**
 * Set background color for canvas element
 * @param color
 */
Animate.prototype.backgroundColor = function (color) {
  if (this._canvas.style.backgroundColor !== color)
    this._canvas.style.backgroundColor = color;
};

/**
 * Set background Image for canvas element
 * @param img Url
 */
Animate.prototype.backgroundImage = function (img, opts) {
  if (this._canvas.style.backgroundImage !== img)
    this._canvas.style.backgroundImage = 'url(' + img + ')';

  if (opts && typeof opts === 'object') {
    var n, defOpts = {
      size: 'backgroundSize',
      repeat: 'backgroundRepeat',
      position: 'backgroundPosition',
      positionX: 'backgroundPositionX',
      positionY: 'backgroundPositionY',
      origin: 'backgroundOrigin',
      clip: 'backgroundClip',
      blendMode: 'backgroundBlendMode',
      attachment: 'backgroundAttachment'
    };

    for (n in defOpts) {
      if (opts[n] !== undefined)
        this._canvas.style[defOpts[n]] = opts[n];
    }

  }
};

/**
 * Hit point inside rectangle
 * @param rectangle
 * @param point
 * @returns {boolean}
 */
Animate.prototype.hitTest = function (rectangle, point) {
  var x = parseInt(point.x), y = parseInt(point.y);
  return x > rectangle[0] &&
         y > rectangle[1] &&
         x < rectangle[0] + rectangle[2] &&
         y < rectangle[1] + rectangle[3];
};

/**
 * isPointInPath
 * hitTestPoint(x, y)
 * hitTestPoint(point)
 * @param point
 * @param y
 * @returns {boolean}
 */
Animate.prototype.hitTestPoint = function (point, y) {
  if (arguments.length === 2)
    point = {x: point, y: y};

  return this._context.isPointInPath(point.x, point.y);
};

/**
 * Return point object
 * @param event     MouseEvent
 * @returns {{x: number, y: number}}
 */
Animate.prototype.mousePosition = function (event) {
  if (!(event instanceof MouseEvent)) {
    console.error('Error: argument is not type the MouseEvent!');
    return;
  }
  var rect = this._canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
};

Animate.prototype.toString = function () {
  return '[object Animate]'
};


/**
 * Prototype of Super Objects
 */


/**
 * Special object for method frame
 * @param sceneObject
 * @returns {{index: number, hide: boolean, name: string, init: null}}
 */
Animate.prototype.createSceneObject = function (sceneObject) {
  var sceneObjectDefault = {
    index: 100,
    hide: false,
    name: 'scene',
    init: null
  };

  if (typeof sceneObject === 'function')
    sceneObject = {init: sceneObject};

  Animate.defaultObject(sceneObjectDefault, sceneObject);
  return sceneObjectDefault;
};




Animate.prototype._events_initialize = function () {

  var that = this;

  // onclick event
  if (typeof this.onClickCallback === 'function' && !this._on_click_callback_init) {
    this._canvas.addEventListener('click', function (event) {
      that.onClickCallback.call(that, event, that.mousePosition(event))
    });
    this._on_click_callback_init = true;
  }

  // onmousemove event
  if (typeof this.onMousemoveCallback === 'function' && !this._on_mousemove_callback_init) {
    this._canvas.addEventListener('mousemove', function (event) {
      that.onMousemoveCallback.call(that, event, that.mousePosition(event))
    });
    this._on_mousemove_callback_init = true;
  }

  // onmousedown event
  if (typeof this.onMousedownCallback === 'function' && !this._on_mousedown_callback_init) {
    this._canvas.addEventListener('mousedown', function (event) {
      that.onMousedownCallback.call(that, event, that.mousePosition(event))
    });
    this._on_mousedown_callback_init = true;
  }

  // onmouseup event
  if (typeof this.onMouseupCallback === 'function' && !this._on_mouseup_callback_init) {
    this._canvas.addEventListener('mouseup', function (event) {
      that.onMouseupCallback.call(that, event, that.mousePosition(event))
    });
    this._on_mouseup_callback_init = true;
  }

  // onkeydown event
  if (typeof this.onKeydownCallback === 'function' && !this._on_keydown_callback_init) {
    window.addEventListener('keydown', function (event) {
      that.onKeydownCallback.call(that, event)
    });
    this._on_keydown_callback_init = true;
  }

  // onkeyup event
  if (typeof this.onKeyupCallback === 'function' && !this._on_keyup_callback_init) {
    window.addEventListener('keyup', function (event) {
      that.onKeyupCallback.call(that, event)
    });
    this._on_keyup_callback_init = true;
  }
};

