
Animate.prototype.one = function () {};

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
  if (typeof this.onFrame === 'function')
    this.onFrame.call(this, this._context, this._iterator);

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

/**
 *
 * @param options
 * @param callback
 * @param thisInstance      if `true` prototype = options
 * @returns {clip}
 * @constructor
 */
Animate.prototype.createMovieClip = function (options, callback, thisInstance) {
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
 * var sprite = an.createSprite({
     *      x: 0,
     *      y: 0,
     *      width: 50,
     *      height: 50,
     *      image: HTMLImageElement,
     *      grid: [3, 2],
     *      indexes: [0,1,2,3,4,5],
     *      delay: 1,
     *      loop: false
     * });
 * sprite();
 * @param options
 * @returns {clip|*}
 */
Animate.prototype.createSprite = function (options) {
  var i, key, movieclip, default_options = {

    // parameters
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    image: null,
    grid: [1, 1],
    indexes: [],
    delay: 0,
    loop: true,
    point: {x: 0, y: 0},

    // internal
    _map: [],
    _image_width: 0,
    _image_height: 0,
    _sprite_width: 0,
    _sprite_height: 0,
    _map_index: false,
    _rea_index: false
  };

  // to default
  for (key in default_options) {
    if (options[key] === undefined)
      options[key] = default_options[key];
  }

  var grid_count = options['grid'][0] * options['grid'][1];

  // verify the 'image'
  if (!(options['image'] instanceof HTMLImageElement) && !(options['image'] instanceof Image))
    throw Error('The source image is not instanceof of [Image]');

  // set default indexes
  if (options['indexes'].length == 0) {
    for (i = 0; i < grid_count; i++)
      options['indexes'][i] = i;
  }

  // create maps
  for (i = 0; i < grid_count; i++) {
    options['_map'][i] = {
      index: i,
      sx: parseInt(i % options['grid'][0]) * options['width'],
      sy: parseInt(i / options['grid'][0]) * options['width']
    };
  }

  // Sprite based on MovieClip
  movieclip = this.createMovieClip(options, function () {
    var i, k,
      ctx = this['instance']._context,
      iterator = this['instance']._iterator;

    if (arguments.length === 1 && arguments[0] && typeof arguments[0] === 'object')
      for (k in arguments[0]) this[k] = arguments[0][k];

    if (this['_image_width'] === 0 && this['_image_height'] === 0) {
      this['_image_width']   = this['image'].naturalWidth || this['image'].width;
      this['_image_height']  = this['image'].naturalHeight || this['image'].height;
      this['_sprite_width']  = this['_image_width'] / this['grid'][0];
      this['_sprite_height'] = this['_image_height'] / this['grid'][1];
      this['_rea_index'] = 0;
    }

    // calc index in map
    this['_map_index'] = this['indexes'][this['_rea_index']];

    // get map part, sprite part
    var source = this['_map'][this['_map_index']];

    // base draw
    ctx.drawImage(this['image'],
      // source
      source.sx, source.sy, this['_sprite_width'], this['_sprite_height'],
      // draw
      this['point'].x, this['point'].y, this['width'], this['height']
    );

    // steps in map
    if (this['indexes'].length > 1 && iterator % this['delay'] === 0) {
      if (this['indexes'][this['_rea_index'] + 1] !== undefined) {
        this['_rea_index'] += 1;
      } else
      if (this['loop'])
        this['_rea_index'] = 0;
    }

    // return self context
    this.getIndex = this['_map_index'];
    this.getIndexsCount = this['_map'].length - 1;
    this.reset = function () {
      this['_rea_index'] = 0;
    };

    return this;
  }, true);

  return movieclip
};

Animate.prototype._events_initialize = function () {

  var that = this;

  // onclick event
  if (typeof this.onClick === 'function' && !this._on_click_init) {
    this._canvas.addEventListener('click', function (event) {
      that.onClick.call(that, event, that.mousePosition(event))
    });
    this._on_click_init = true;
  }

  // onmousemove event
  if (typeof this.onMousemove === 'function' && !this._on_mousemove_init) {
    this._canvas.addEventListener('mousemove', function (event) {
      that.onMousemove.call(that, event, that.mousePosition(event))
    });
    this._on_mousemove_init = true;
  }

  // onmousedown event
  if (typeof this.onMousedown === 'function' && !this._on_mousedown_init) {
    this._canvas.addEventListener('mousedown', function (event) {
      that.onMousedown.call(that, event, that.mousePosition(event))
    });
    this._on_mousedown_init = true;
  }

  // onmouseup event
  if (typeof this.onMouseup === 'function' && !this._on_mouseup_init) {
    this._canvas.addEventListener('mouseup', function (event) {
      that.onMouseup.call(that, event, that.mousePosition(event))
    });
    this._on_mouseup_init = true;
  }

  // onkeydown event
  if (typeof this.onKeydown === 'function' && !this._on_keydown_init) {
    window.addEventListener('keydown', function (event) {
      that.onKeydown.call(that, event)
    });
    this._on_keydown_init = true;
  }

  // onkeyup event
  if (typeof this.onKeyup === 'function' && !this._on_keyup_init) {
    window.addEventListener('keyup', function (event) {
      that.onKeyup.call(that, event)
    });
    this._on_keyup_init = true;
  }
};

