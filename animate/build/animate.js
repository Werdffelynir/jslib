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

    var _constructor = (function (config) {

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

});

    _constructor.call(this, config);
  };

  

/**
 * Animation types
 * @type {string}
 */
Animate.LOOP_TIMER = 'timer';
Animate.LOOP_ANIMATE = 'animation';
Animate.DEGREE = 0.017453292519943295;
Animate.DEGREE_360 = Animate.DEGREE * 360;

/**
 * Storage of extensions
 * @type {Array}
 */
Animate._internal_extensions = [];

/**
 * Storage of static modules
 * @type {Array}
 */
Animate._external_modules = {};

/**
 * Add extensions in list, extensions executed when creating new instance
 *
 * @param func
 * @constructor
 */
Animate.Extension = function (func) {
  Animate._internal_extensions.push(func);
};

/**
 * Getter|Setter
 * Storage for static modules
 *
 * @param name    String
 * @param func    Function | Object
 * @constructor
 */
Animate.Module = function (name, func) {
  if (arguments.length === 1)
    return Animate._external_modules[name];
  if (arguments.length === 2)
    return Animate._external_modules[name] = func;
};

/**
 * Проверяет наличие значения
 * @param value         проверяемое значение
 * @param defaultValue  значение поумолчанию
 * @returns {boolean}
 */
Animate.isset = function (value, defaultValue) {
  var is = value !== undefined;
  return (defaultValue === undefined) ? is : ( is ? is : defaultValue);
};

/**
 * Marge object with defaultObject
 * @param defaultObject
 * @param object
 * @returns {*}
 */
Animate.defaultObject = function (defaultObject, object) {
  for (var key in object) {
    defaultObject[key] = object[key];
  }
  return defaultObject;
};

/**
 * Вернет обобщенный тип передаваемого параметра value,
 * или сравнит тип value с передаваемым type и вернет boolean
 * Поддержуемые значение типов: null, boolean, undefined, function, string, number, date, number, array, object
 * @param value
 * @param type
 * @returns {string}
 */
Animate.typeOf = function (value, type) {
  var types = ['null','boolean','undefined','function','string','number','date','number','array','object'],
      t = Animate.typeOfStrict(value).toLowerCase();

  if (types.indexOf(t) === -1 && typeof value === 'object')
    t = 'object';

  return typeof type === 'string' ? type.toLowerCase() === t : t;
};

/**
 * Вернет строгий/точный тип передаваемого параметра value,
 * или сравнит тип value с передаваемым type и вернет boolean
 * Возможные заначения: null, Boolean, undefined, Function, String, Number, Date, Number, Array, Object ...
 * для HTML елементов / объектов WebAPI возвращает имя объекта, например для <a> вернет HTMLAnchorElement
 * https://developer.mozilla.org/ru/docs/Web/API
 *
 * @param value
 * @param type
 * @returns {*}
 */
Animate.typeOfStrict = function (value, type) {
  var t = Object.prototype.toString.call(value).slice(8, -1);
  return typeof type === 'string' ? type === t : t;
};

/**
 * Clone an Array or Objects
 * @param src
 * @param args
 */
Animate.copy = function (src, args) {
  if (Animate.typeOf(src, 'function')) {
    return src.bind({}, args);
  } else if (Animate.typeOf(args, 'object') || Animate.typeOf(args, 'array')) {
    var cObject = JSON.parse(JSON.stringify(src));
    for (var i in args)
      cObject[i] = args[i];
    return cObject;
  }
};

/**
 * Generate a random number
 * @param min
 * @param max
 * @returns {number}
 */
Animate.random = function (min, max) {
  min = min || 0;
  max = max || 100;
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * Generate a random hex color
 * @returns {string}
 */
Animate.randomColor = function () {
  var letters = '0123456789ABCDEF'.split(''),
    color = '#';
  for (var i = 0; i < 6; i++)
    color += letters[Math.floor(Math.random() * 16)];
  return color;
};

/**
 * Return random item from array
 * @param arr
 * @returns {*}
 */
Animate.randomItem = function (arr) {
  var i = Animate.random(0, arr.length-1);
  return arr[i];
};

/**
 * Convert degrees to radians
 * Formula: degrees * Math.PI / 180
 * @param deg
 * @returns {number}
 */
Animate.degreesToRadians = function (deg) {
  return (deg * Math.PI) / 180;
};

/**
 * Convert radians to degrees
 * Formula: radians * 180 / Math.PI
 * @param rad
 * @returns {number}
 */
Animate.radiansToDegrees = function (rad) {
  return (rad * 180) / Math.PI;
};

/**
 * Calculate distance between two Points
 * @param p1
 * @param p2
 * @returns {number}
 */
Animate.distanceBetween = function (p1, p2) {
  var dx = p2.x - p1.x;
  var dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
};

/**
 * Calculate angle between two points. return object:
 *  {angle:, x:, y:}
 * @param p1
 * @param p2
 * @returns {{angle: number, x: number, y: number}}
 */
Animate.calculateAngle = function (p1, p2) {
  var dx = p2.x - p1.x;
  var dy = p2.y - p1.y;
  var angle = Math.atan2(dy, dx);
  return {
    angle: angle,
    x: Math.cos(angle),
    y: Math.sin(angle)
  };
};

/**
 * Create special object to indicate a point
 * @param x
 * @param y
 * @returns {{x: *, y: *}}
 */
Animate.Point = function (x, y) {
  var point = [x, y];
  point.x = x;
  point.y = y;
  return point;
};

/**
 * Create special object to indicate a rectangle
 * @param x
 * @param y
 * @param width
 * @param height
 * @returns {[*,*,*,*]}
 */
Animate.Rectangle = function (x, y, width, height) {
  var rect = [x, y, width, height];
  rect.x = x;
  rect.y = y;
  rect.width = width;
  rect.height = height;
  return rect;
};

/**
 * @param options       Object with properties
 * @param callback      Inside callback
 * @param thisInstance  Default or True copy all properties to `this` context
 * @returns {(function(this:T))|*}
 * @constructor
 */
Animate.Clip = function (options, callback, thisInstance) {
  return function () {
    callback.bind(options).apply(thisInstance || {}, arguments || {})
  };
};


/**
 * Calculates the position and size of elements.
 *
 * @param elem
 * @returns {{y: number, x: number, width: number, height: number}}
 */
Animate.position = function (elem) {
  var data = {x: 0, y: 0, width: 0, height: 0};

  if (typeof elem === 'string')
    elem = document.querySelector(elem);

  if (elem === undefined || elem === window || elem === document) {
    data.width = window.innerWidth;
    data.height = window.innerHeight;
    data.element = window;
  }
  else
  if (elem && elem.nodeType === Node.ELEMENT_NODE) {
    if (elem.getBoundingClientRect) {
      var rect = elem.getBoundingClientRect(),
        scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop,
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
        clientTop = document.documentElement.clientTop || document.body.clientTop || 0,
        clientLeft = document.documentElement.clientLeft || document.body.clientLeft || 0;

      data.y = Math.round(rect.top + scrollTop - clientTop);
      data.x = Math.round(rect.left + scrollLeft - clientLeft);
      data.width = elem.offsetWidth;
      data.height = elem.offsetHeight;
    }
    else {
      var top = 0, left = 0;
      while (elem) {
        top += parseInt(elem.offsetTop, 10);
        left += parseInt(elem.offsetLeft, 10);
        elem = elem.offsetParent;
      }
      data.y = top;
      data.x = left;
      data.width = elem.offsetWidth;
      data.height = elem.offsetHeight;
    }
    data.element = elem;
  }
  return data;
};




  
/**
 * Animate.Loader.javascript ( {name: src, name: src}, function (list) {} )
 * Animate.Loader.javascript ( [src, src], function (list) {} )
 * Animate.Loader.images ( {name: src, name: src}, function (list) {} )
 * Animate.Loader.audios ( {name: src, name: src}, function (list) {} )
 * Animate.Loader.videos ( {name: src, name: src}, function (list) {} )
 *
 * Module of Expansion
 * Assign static as instance methods
 */
Animate.Loader = {

  /**
   * Loads a script element with javascript source
   *
   * .javascript ( {
   *      myscript1: '/path/to/myscript1',
   *      myscript2: '/path/to/myscript2',
   *    },
   *    function (list) {})
   *
   * .javascript ( [
   *      '/path/to/myscript1',
   *      '/path/to/myscript2',
   *    ],
   *    function (list) {})
   *
   * @namespace Animate.Loader.javascript
   * @param src       Object, Array. items: key is ID, value is src
   * @param callback  Function called when all srcs is loaded
   * @param onerror   Function called when load is failed
   * @returns {*}
   */
  javascript: function (src, callback, onerror) {
    if (src && typeof src === 'object') {

      if (Array.isArray(src)) {
        var obj = {};
        src.map(function (item) {
          obj[Math.random().toString(32).slice(2)] = item
        });
        src = obj;
      }
      console.log('javascript', src);
      var length = Object.keys(src).length,
        key,
        script,
        scripts = {},
        iterator = 0;
      for (key in src) {
        script = document.createElement('script');
        script.src = (src[key].substr(-3) === '.js') ? src[key] : src[key] + '.js';
        script.type = 'application/javascript';
        script.id = key;
        script.onerror = onerror;
        script.onload = function (e) {
          scripts[this.id] = this;
          iterator++;
          if (iterator === length) {
            callback.call({}, scripts);
          }
        };
        document.head.appendChild(script);
      }
    }
  },

  /**
   * Load an images
   *
   * .images ( {
   *      img1: '/path/to/img1',
   *      img2: '/path/to/img2',
   *    },
   *    function (list) {})
   *
   * @namespace Animate.Loader.images
   * @param imgs
   * @param callback
   */
  images: function (imgs, callback) {
    if (imgs && typeof imgs === 'object') {
      var length = Object.keys(imgs).length;
      var images = {};
      var iterator = 0;
      for (var name in imgs) {
        var img = document.createElement('img');
        img.src = imgs[name];
        img.name = name;
        img.onload = function (e) {
          images[this.name] = this;
          iterator++;
          if (iterator === length) {
            callback.call({}, images);
          }
        };
      }
    }
  },

  /**
   * Load an audio files
   *
   * .audios ( {
   *      audio1: '/path/to/audio1',
   *      audio2: '/path/to/audio2',
   *    },
   *    function (list) {})
   *
   * @namespace Animate.Loader.audios
   * @param srcs
   * @param callback
   */
  audios: function (srcs, callback) {
    if (srcs && typeof srcs === 'object') {
      var length = Object.keys(srcs).length;
      var audios = {};
      var iterator = 0;
      for (var name in srcs) {
        var audio = document.createElement('audio');
        audio.src = srcs[name];
        audio.name = name;
        audio.preload = 'auto';
        audios[name] = audio;
        iterator++;
        if (iterator === length) {
          callback.call({}, audios);
        }
      }
    }
  },

  /**
   * Load an video files
   *
   * .videos ( {
   *      video1: '/path/to/video1',
   *      video2: '/path/to/video2',
   *    },
   *    function (list) {})
   *
   * @namespace Animate.Loader.videos
   * @param srcs
   * @param callback
   */
  videos: function (srcs, callback) {
    if (srcs && typeof srcs === 'object') {
      var length = Object.keys(srcs).length;
      var videos = {};
      var iterator = 0;
      for (var name in srcs) {
        var video = document.createElement('video');
        video.src = srcs[name];
        video.name = name;
        video.preload = 'auto';
        videos[name] = video;
        iterator++;
        if (iterator == length) {
          callback.call({}, videos);
        }
      }
    }
  }

};

  

  
/**
 * Module of Expansion
 * Assign static as instance methods
 */
Animate.prototype.Clip = Animate.Clip;
Animate.prototype.point = Animate.Point;
Animate.prototype.rectangle = Animate.Rectangle;
Animate.prototype.defaultObject = Animate.defaultObject;
Animate.prototype.copy = Animate.copy;
Animate.prototype.random = Animate.random;
Animate.prototype.randomColor = Animate.randomColor;
Animate.prototype.randomItem = Animate.randomItem;
Animate.prototype.degreesToRadians = Animate.degreesToRadians;
Animate.prototype.radiansToDegrees = Animate.radiansToDegrees;
Animate.prototype.distanceBetween = Animate.distanceBetween;
Animate.prototype.calculateAngle = Animate.calculateAngle;
Animate.prototype.position = Animate.position;
Animate.prototype.Loader = Animate.Loader;



  
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
 * @param width     camera width
 * @param callback  function a clip
 */
Animate.prototype.camera = function (x, y, width, callback) {
  /** @type CanvasRenderingContext2D */
  var ctx = this.getContext();
  var i = this.getIteration();
  var scale = this.width / width;
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
    if (opts[key] !== undefined) options[key] = opts[key];
  }

  for (key in opts) {
    if (options[key] === undefined) options[key] = opts[key];
  }

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
Animate.prototype.Sprite = function (options) {
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
    if (options[key] === undefined) options[key] = default_options[key];
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
  movieclip = this.MovieClip(options, function () {
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


  /**
 * Graphic draw methods
 * @returns {{color: color, alpha: alpha, thickness: thickness, cap: cap, join: join, CAPS: {BUTT: string, ROUND: string, SQUARE: string}, JOINS: {BEVEL: string, ROUND: string, MITER: string}, formatsApply: formatsApply, begin: begin, close: close, save: save, restore: restore, shadow: shadow, clearShadow: clearShadow, circle: circle, rect: rect, rectRound: rectRound, shape: shape, line: line, ellipse: ellipse, stroke: stroke, fill: fill}}
 * @constructor
 */
Animate.prototype.Graphic = function () {

  var Graphic = {
    context: this._context,
    drawCallback: function () {},
    formats: {
      color: '#000000',
      alpha: false,
      thickness: false,
      cap: false,
      join: false,
    },

    color: function (n) {
      if (this.formats.color !== n)
        this.formats.color = n;
      return this;
    },

    // 0 - 1
    alpha: function (n) {
      if (this.formats.alpha !== n)
        this.formats.alpha = n;
      return this;
    },

    // 0 - 100
    thickness: function (n) {
      if (this.formats.thickness !== n)
        this.formats.thickness = n;
      return this;
    },

    // butt, round, square
    cap: function (n) {
      if (this.formats.cap !== n)
        this.formats.cap = n;
      return this;
    },

    // round, bevel, miter
    join: function (n) {
      if (this.formats.join !== n)
        this.formats.join = n;
      return this;
    },

    CAPS: {
      BUTT: "butt",
      ROUND: "round",
      SQUARE: "square",
    },

    JOINS: {
      BEVEL: "bevel",
      ROUND: "round",
      MITER: "miter",
    },

  };

  Graphic.formatsApply = function () {
    if (this.formats.alpha !== false)
      this.context.globalAlpha = this.formats.alpha;

    if (this.formats.thickness !== false)
      this.context.lineWidth = this.formats.thickness;

    if (this.formats.cap !== false)
      this.context.lineCap = this.formats.cap;

    if (this.formats.join !== false)
      this.context.lineJoin = this.formats.join;
  };

  Graphic.begin = function () {this.context.beginPath()};
  Graphic.close = function () {this.context.closePath()};
  Graphic.save = function () {this.context.save()};
  Graphic.restore = function () {this.context.restore()};
  Graphic.shadow = function (x, y, blur, color) {
    this.context.shadowOffsetX = x;
    this.context.shadowOffsetY = y;
    this.context.shadowBlur = blur;
    this.context.shadowColor = color;
    return this;
  };
  Graphic.clearShadow = function () {
    this.context.shadowOffsetX =
      this.context.shadowOffsetY =
        this.context.shadowBlur = 0;
    return this;
  };

  Graphic.circle = function (x, y, radius) {
    this.drawCallback = function () {
      this.internalRectRound(x - (radius / 2), y - (radius / 2), radius, radius, radius / 2);
    };
    return this;
  };

  Graphic.rect = function (x, y, width, height) {
    this.drawCallback = function () {
      this.context.beginPath();
      this.context.rect(x, y, width, height);
    };
    return this;
  };

  Graphic.internalRectRound = function (x, y, width, height, radius) {
    this.context.beginPath();
    this.context.moveTo(x + radius, y);
    this.context.arcTo(x + width, y, x + width, y + height, radius);
    this.context.arcTo(x + width, y + height, x, y + height, radius);
    this.context.arcTo(x, y + height, x, y, radius);
    this.context.arcTo(x, y, x + width, y, radius);
  };

  Graphic.rectRound = function (x, y, width, height, radius) {
    this.drawCallback = function () {
      this.internalRectRound(x, y, width, height, radius)
    };
    return this;
  };

  Graphic.shape = function (points, closePath) {
    this.drawCallback = function () {
      var i, temp = {}, positions = [];
      points.map(function (p) {
        if (temp.x === undefined) {temp.x = p}
        else if (temp.y === undefined) {temp.y = p}
        
        if (temp.x !== undefined && temp.y !== undefined) {
          positions.push(temp);temp = {}}
      });

      this.context.beginPath();
      for (i = 0; i < positions.length; i++) {
        this.context.lineTo(positions[i].x, positions[i].y);
      }
      
      if (!!closePath) this.context.closePath();
    };
    return this;
  };

  Graphic.line = function (x1, y1, x2, y2) {
    this.drawCallback = function () {
      this.context.beginPath();
      this.context.moveTo(x1, y1);
      this.context.lineTo(x2, y2);
    };
    return this;
  };
  
  Graphic.ellipse = function (x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise, closePath) {
    this.drawCallback = function () {
      this.context.save();
      this.context.beginPath();
      this.context.translate(x, y);
      this.context.rotate(rotation);
      this.context.scale(radiusX / radiusY, 1);
      this.context.arc(0, 0, radiusY, startAngle, endAngle, Animate.isset(anticlockwise) ? !!anticlockwise : false);
      this.context.restore();
      if (Animate.isset(closePath) && !!closePath) this.context.closePath();
    };
    return this;
  };
  
  Graphic.stroke = function () {
    this.formatsApply();
    this.drawCallback.call(this);

    if (this.formats.color)
      this.context.strokeStyle = this.formats.color;
    this.context.stroke();
    
    return this;
  };
  
  Graphic.fill = function () {
    this.formatsApply();
    this.drawCallback.call(this);

    if (this.formats.color)
      this.context.fillStyle = this.formats.color;
    this.context.fill();
    
    return this;
  };

  return Graphic;

};

  

  /**
 * Examples:
 *
 * .TextField()
 *    .text('Simple TextField', 10, 10)
 *    .color('#dd0')
 *    .align(TextField.ALIGN.CENTER)
 *    .font('bold 20px sans, sans-serif')
 *    .fill();
 *
 * @returns {{context: (CanvasRenderingContext2D|null), ALIGN: {LEFT: string, RIGHT: string, CENTER: string, START: string, END: string}, BASELINE: {TOP: string, HANDING: string, MIDDLE: string, ALPHABETIC: string, IDEOGRAPHIC: string, BOTTOM: string}, font: Function, text: Function, fill: Function, stroke: Function, align: Function, baseline: Function, color: Function, alpha: alpha, thickness: thickness}}
 * @constructor
 */
Animate.prototype.TextField = function () {

  var TextField = {
    context: this._context,
    formats: {
      x: 10,
      y: 10,
      text: '',
      font: '12px sans-serif',
      color: '#000000',
      align: 'left',
      baseline: 'top',
      thickness: false,
      alpha: false,
    },
    ALIGNS: {
      LEFT: "left",
      RIGHT: "right",
      CENTER: "center",
      START: "start",
      END: "end",
    },
    BASELINES: {
      TOP: "top",
      HANDING: "hanging",
      MIDDLE: "middle",
      ALPHABETIC: "alphabetic",
      IDEOGRAPHIC: "ideographic",
      BOTTOM: "bottom",
    }
  };

  /**
   * Set font as CSS property `font`
   *
   * Syntax:
   *  font: [font-style||font-variant||font-weight] font-size [/line-height] font-family | inherit
   *
   * Example:
   * .font ( "12px Arial, sans-serif" )
   * .font ( "bold italic 110% serif" )
   * .font ( "normal small-caps 12px/14px fantasy" )
   *
   * @param value
   * @returns {TextField}
   */
  TextField.font = function (value) {
    this.formats.font = value;
    return this;
  };

  /**
   * Set text string, x y positions
   * @param value
   * @param x
   * @param y
   * @returns {TextField}
   */
  TextField.text = function (value, x, y) {
    this.formats.text = value;
    this.formats.x = x;
    this.formats.y = y;
    return this;
  };

  /**
   * Set color
   * @param value
   * @returns {TextField}
   */
  TextField.color = function (value) {
    this.formats.color = value;
    return this;
  };

  /**
   * Set text align.
   * "left" || "right" || "center" || "start" || "end";
   *
   * Example:
   * .align ( "left" );
   *
   * @param value
   * @returns {TextField}
   */
  TextField.align = function (value) {
    this.formats.align = value;
    return this;
  };

  /**
   * Set align to baseline of text.
   * "top" || "hanging" || "middle" || "alphabetic" || "ideographic" || "bottom";
   *
   * Example:
   * .baseline ( "middle" );
   *
   * @param value
   * @returns {TextField}
   */
  TextField.baseline = function (value) {
    this.formats.baseline = value;
    return this;
  };

  TextField.alpha = function (value) {
    this.formats.alpha = value;
    return this;
  };

  TextField.thickness = function (value) {
    this.formats.thickness = value;
    return this;
  };

  TextField.isCanFormating = function (name) {
    return this.formats[name] !== false && this.formats[name] !== this.context[name]
  };

  TextField.formatsApply = function () {
    if (this.isCanFormating('font')) this.context.font = this.formats.font;
    if (this.isCanFormating('align')) this.context.textAlign = this.formats.align;
    if (this.isCanFormating('baseline')) this.context.textBaseline = this.formats.baseline;
    if (this.isCanFormating('alpha')) this.context.globalAlpha = this.formats.alpha;
    if (this.isCanFormating('thickness')) this.context.lineWidth = this.formats.thickness;
  };

  TextField.fill = function () {
    this.formatsApply();
    if (this.formats.color)
      this.context.fillStyle = this.formats.color;
    this.context.fillText(this.formats.text, this.formats.x, this.formats.y);
    return this;
  };

  TextField.stroke = function () {
    this.formatsApply();
    if (this.formats.color)
      this.context.strokeStyle = this.formats.color;
    this.context.strokeText(this.formats.text, this.formats.x, this.formats.y);
    return this;
  };

  return TextField;
};
  

  /** Set script version. Property [read-only]*/
  Object.defineProperty(Animate, 'version', {
    enumerable: false, configurable: false, writable: false, value: '0.7.0'
  });

  /**
   * @type {Animate}
   */
  window.Animate = Animate;

})();
