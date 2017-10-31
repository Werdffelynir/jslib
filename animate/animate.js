(function (window) {

    "use strict";

    window.requestAnimationFrame = function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function (f) {window.setTimeout(f, 1e3 / 60);}
    }();

    var Animate = (function () {

    /**
     * Constructor
     *
     * @param _options  options Object or selector
     * @param width
     * @param height
     * @param fps
     * @returns {Animate}
     * @constructor
     */
    return function (_options, width, height, fps) {

        if (!(this instanceof Animate))
            return new Animate(_options, width, height, fps);

        if (arguments.length > 1)
            _options = {selector: arguments[0], width: parseInt(arguments[1]), height: parseInt(arguments[2]), fps: arguments[3]};

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
                onFrame: null,
                onMousemove: null,
                onMousedown: null,
                onMouseup: null,
                onKeyup: null,
                onKeydown: null,
                onClick: null,

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
        Animate.defaultObject(options, _options);

        for (pk in options)
            this[pk] = options[pk];

        /** @type {HTMLCanvasElement|Element|null} */
        this._canvas = document.querySelector(this.selector);
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

    }
})();
    Animate.prototype = (function () {

  /** @type Animate.prototype */
  var prototype = {};
  /**
   * Return HTMLCanvasElement
   * @type HTMLCanvasElement
   */
  prototype.getCanvas = function () {
    return this._canvas;
  };

  /**
   * Return CanvasRenderingContext2D
   * @type CanvasRenderingContext2D
   */
  prototype.getContext = function () {
    return this._context;
  };

  /**
   * @returns {number}
   */
  prototype.getWidth = function () {
    return this._canvas.width;
  };

  /**
   * @returns {string}
   */
  prototype.getFrameName = function () {
    return this._frame_name;
  };

  /**
   * @returns {number}
   */
  prototype.getHeight = function () {
    return this._canvas.height;
  };

  /**
   * Return current iteration
   * @returns {number}
   */
  prototype.getIteration = function () {
    return this._iterator;
  };

  /**
   * Clear a number of iterations
   */
  prototype.clearIteration = function () {
    this._iterator = 0;
  };

  /**
   * Return `true` if move is playing, or `false`
   * @returns {boolean}
   */
  prototype.isPlay = function () {
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
  prototype.frame = function (frameName, sceneObject) {
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
  prototype.frameRemove = function (frameName) {
    if (this._frames[frameName]) {
      this._frames[frameName] = [];
    }
  };

  /**
   * Start\Restart animation
   * @param frameName
   */
  prototype.start = function (frameName) {
    this.stop();
    this.play(frameName || this._frame_name);
  };

  /**
   * Play animation
   * @param frameName
   */
  prototype.play = function (frameName) {

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
  prototype.stop = function () {
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

  prototype._internal_drawframe = function () {
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

  prototype._loop_timer = function () {
    var that = this;
    var fps = this.fps || 30;
    var interval = 1000 / fps;

    return (function loop(time) {
      that._loop_timer_id = setTimeout(loop, interval);
      // call the draw method
      that._internal_drawframe.call(that);
    }());
  };

  prototype._loop_animation_frame = function () {
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
  prototype.clear = function () {
    this._context.clearRect(0, 0, this.width, this.height);
  };

  /**
   * Set camera position and scales
   * @param x         camera position y
   * @param y         camera position x
   * @param wight     camera wight
   * @param callback  function a clip
   */
  prototype.camera = function (x, y, wight, callback) {
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
  prototype.camera.position = {x: 0, y: 0};

  /**
   * Restore camera position and scales
   */
  prototype.cameraRestore = function () {
    this.getContext().translate(0, 0);
    this.getContext().scale(scale, scale);
  };

  /**
   * Set resize canvas
   * @param width     default: fullscreen 'window.innerWidth'
   * @param height    default: fullscreen 'window.innerHeight'
   * @param position  default: 'absolute'
   */
  prototype.resizeCanvas = function (width, height, position) {
    if (position !== undefined)
      this._canvas.style.position = position || 'absolute';
    this._canvas.width = this.width = parseInt(width) || window.innerWidth;
    this._canvas.height = this.height = parseInt(height) || window.innerHeight;
  };

  /**
   * Set background color for canvas element
   * @param color
   */
  prototype.backgroundColor = function (color) {
    if (this._canvas.style.backgroundColor !== color)
      this._canvas.style.backgroundColor = color;
  };

  /**
   * Set background Image for canvas element
   * @param img Url
   */
  prototype.backgroundImage = function (img, opts) {
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
  prototype.hitTest = function (rectangle, point) {
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
  prototype.hitTestPoint = function (point, y) {
    if (arguments.length == 2) point = {x: point, y: y};
    return this._context.isPointInPath(point.x, point.y);
  };

  /**
   * Return point object
   * @param event     MouseEvent
   * @returns {{x: number, y: number}}
   */
  prototype.mousePosition = function (event) {
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

  prototype.toString = function () {
    return '[object Animate]'
  };

  return prototype
})();
    Animate.prototype.constructor = Animate;

    ( /** @type Animate.prototype */ function (prototype) {

    /**
     * Prototype of Super Objects
     */


    /**
     * Special object for method frame
     * @param sceneObject
     * @returns {{index: number, hide: boolean, name: string, init: null}}
     */
    prototype.createSceneObject = function (sceneObject) {
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
    prototype.createMovieClip = function (options, callback, thisInstance) {
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
    prototype.createSprite = function (options) {
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

            if (arguments.length == 1 && arguments[0] && typeof arguments[0] === 'object')
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

})(Animate.prototype);
    ( /** @type Animate.prototype */ function (prototype) {

    prototype._events_initialize = function () {

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

})(Animate.prototype);
    /**
 * Module of Static Methods
 */

/**
 * Animation types
 * @type {string}
 */
Animate.LOOP_TIMER = 'timer';
Animate.LOOP_ANIMATE = 'animation';

/**
 * Radians as degrees
 * @type {number}
 */
Animate.DEGREES_0   = 0;
Animate.DEGREES_45  = 0.7853981633974483;
Animate.DEGREES_90  = 1.5707963267948966;
Animate.DEGREES_135 = 2.3561944901923450;
Animate.DEGREES_180 = 3.1415926535897930;
Animate.DEGREES_225 = 3.9269908169872414;
Animate.DEGREES_270 = 4.7123889803846900;
Animate.DEGREES_315 = 5.4977871437821380;
Animate.DEGREES_360 = 6.2831853071795860;

/**
 * Storage of extensions
 * @type {Array}
 */
Animate._internal_extensions = [];

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
    var key;
    if (thisInstance === undefined || thisInstance === true) {
        thisInstance = options;
    } else if (typeof thisInstance === 'object') {} else {
        thisInstance = {};
    }

    callback = callback.bind(thisInstance);

    for (key in options) {
        callback[key] = options[key];
    }

    return callback;
};

/**
 * Add extensions in loader
 * @param func
 * @constructor
 */
Animate.Extension = function (func) {
    Animate._internal_extensions.push(func);
};


/**
 * Loads a script element with javascript source
 *
 * @param src
 * @param onload
 * @param onerror
 * @returns {*}
 */
Animate.loadJS = function (src, onload, onerror) {
    if (!src) return null;
    if (Array.isArray(src)) {
        var i;
        for (i = 0; i < src.length; i ++) {
            Animate.loadJS( src[i], onload, onerror );
        }
    } else {
        var script = document.createElement('script'),
            id = "src-" + Math.random().toString(32).slice(2);

        script.src = (src.substr(-3) === '.js') ? src : src + '.js';
        script.type = 'application/javascript';
        script.id = id;
        script.onload = onload;
        script.onerror = onerror;

        document.head.appendChild(script);
        return script
    }
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
 * Clone an Array or Objects
 * @param src
 * @param addProperties
 */
Animate.copy = function (src, addProperties) {
    var copy_object = JSON.parse(JSON.stringify(src));
    if (NamespaceApplication.typeOf(addProperties, 'object') || NamespaceApplication.typeOf(addProperties, 'array'))
        for (var i in addProperties)
            copy_object[i] = addProperties[i];
    return copy_object;
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
    (/** @type Animate.prototype */ function (prototype) {

    /**
     * Module of Expansion
     * Assign static as instance methods
     */
    prototype.createClip = Animate.Clip;
    prototype.point = Animate.Point;
    prototype.rectangle = Animate.Rectangle;
    prototype.loadJS = Animate.loadJS;
    prototype.defaultObject = Animate.defaultObject;
    prototype.copy = Animate.copy;
    prototype.random = Animate.random;
    prototype.randomColor = Animate.randomColor;
    prototype.randomItem = Animate.randomItem;
    prototype.degreesToRadians = Animate.degreesToRadians;
    prototype.radiansToDegrees = Animate.radiansToDegrees;
    prototype.distanceBetween = Animate.distanceBetween;
    prototype.calculateAngle = Animate.calculateAngle;

})(Animate.prototype);
    Animate.Extension(function (instance) {

    if (!(instance instanceof Animate))
        return;

    /**
     * @type CanvasRenderingContext2D
     */
    var context = instance.getContext();

    instance.text = {
        _parameters: false
    };

    /**
     * Create text block
     * @param x
     * @param y
     * @param label
     * @param color
     * @param fill
     */
    instance.text.write = function (x, y, label, color, fill) {

        if (arguments.length === 1) {
            label = x;
            x = instance.text._parameters.x;
            y = instance.text._parameters.y;
        }

        fill = fill === undefined ? instance.text._parameters.fill : fill;
        color = color === undefined ? instance.text._parameters.color : color;

        var _point = instance.text._parameters.point;
        var _alpha = instance.text._parameters.alpha;
        var _scale = instance.text._parameters.scale;
        var _rotate = instance.text._parameters.rotate;
        var _transform = instance.text._parameters.transform;

        context.save();
        context.translate(x, y);
        context.font = instance.text._parameters.font;
        context.textAlign = instance.text._parameters.textAlign;
        context.textBaseline = instance.text._parameters.textBaseline;
        context.direction = instance.text._parameters.direction;
        context.lineWidth = instance.text._parameters.lineWidth;
        context.globalAlpha = instance.text._parameters.alpha;

        //context.lineWidth = instance.text._parameters.lineWidth;
        if (_transform) {
            CanvasRenderingContext2D.prototype.setTransform.apply(context, _transform);}
        if (_rotate) {
            context.rotate(_rotate);}
        if (_scale) {
            CanvasRenderingContext2D.prototype.scale.apply(context, _scale);}
        if (_alpha) {
            context.globalAlpha = _alpha;}

        if (fill === true || fill === undefined) {
            context.fillStyle = color;
            context.fillText(label, _point.x, _point.y);
        }
        else {
            context.strokeStyle = color;
            context.strokeText(label, _point.x, _point.y);
        }
        context.restore();
    };

    instance.text.defaultStyle = {
        font: '12px Arial, sans',
        textAlign: 'start',
        textBaseline: 'top',
        direction: 'inherit',
        lineWidth: 1,
        color: '#000000'
    };

    instance.text.reset = function () {

        if (instance.text._parameters === false)
            instance.text._parameters = {};

        var key, default_parameters = {
            globalAlpha: false,
            transform: false,
            rotate: false,
            scale: false,
            point: {x:0, y:0},
            x: 0,
            y: 0
        };

        for (key in default_parameters) {
            instance.text._parameters[key] = default_parameters[key];
        }

        for (key in instance.text.defaultStyle) {
            instance.text._parameters[key] = instance.text.defaultStyle[key];
        }
    };

    instance.text.font = function (value) {instance.text._parameters.font = value};
    instance.text.textAlign = function (value) {instance.text._parameters.textAlign = value};
    instance.text.textBaseline = function (value) {instance.text._parameters.textBaseline = value};
    instance.text.direction = function (value) {instance.text._parameters.direction = value};
    instance.text.lineWidth = function (value) {instance.text._parameters.lineWidth = value};
    instance.text.color = function (value) {instance.text._parameters.color = value};
    instance.text.alpha = function (value) {instance.text._parameters.globalAlpha = value};
    instance.text.rotate = function (value) {instance.text._parameters.rotate = value};
    instance.text.point = function (value) {instance.text._parameters.point = value};
    instance.text.x = function (value) {instance.text._parameters.x = value};
    instance.text.y = function (value) {instance.text._parameters.y = value};
    instance.text.transform = function (value) {instance.text._parameters.transform = value};
    instance.text.rotate = function (value) {instance.text._parameters.rotate = value};
    instance.text.scale = function (value) {instance.text._parameters.scale = value};

    instance.text.position = function (x, y) {
        if (arguments.length === 1 && arguments[0] && typeof arguments[0] === 'object') {
            instance.text._parameters.x = arguments[0].x;
            instance.text._parameters.y = arguments[0].y;
        } else {
            instance.text._parameters.x = x;
            instance.text._parameters.y = y;
        }
    };

    // init
    if (instance.text._parameters === false) {
        instance.text.reset();
    }

});
    Animate.Extension(function (instance) {

    if (!(instance instanceof Animate))
        return;

    /**
     * @type CanvasRenderingContext2D
     */
    var context = instance.getContext();

    /**
     * @type {{shape: function, rect: function, rectRound: function, circle: function, line: function, lineVertical: function, lineHorizontal: function, shadow: function, clearShadow: function, ellipse: function}}
     */
    instance.graphic = {};

    /**
     * @namespace Animate.prototype.graphic.shape
     * @param points
     * @param color
     * @param fill
     * @param closePath
     * @param lineWidth
     */
    instance.graphic.shape = function (points, color, fill, closePath, lineWidth) {
        var i, temp = {}, positions = [];

        points.map(function (p) {
            if (temp.x === undefined) {
                temp.x = p
            }
            else if (temp.y === undefined) {
                temp.y = p
            }
            if (temp.x !== undefined && temp.y !== undefined) {
                positions.push(temp);
                temp = {};
            }
        });

        context.beginPath();

        for (i = 0; i < positions.length; i++) {
            context.lineTo(positions[i].x, positions[i].y);
        }

        if (fill) {
            if (typeof fill === 'string') {
                instance.graphic.shape(points, color, true);
                instance.graphic.shape(points, fill, false, closePath, lineWidth);
            } else {
                context.closePath();
                context.fillStyle = color || '#000';
                context.fill();
            }
        }
        else {
            if (lineWidth)
                context.lineWidth = lineWidth;

            if (closePath !== false)
                context.closePath();

            context.strokeStyle = color || '#000';
            context.stroke();
        }
    };

    /**
     * @param x
     * @param y
     * @param width
     * @param height
     * @param color
     * @param fill
     */
    instance.graphic.rect = function (x, y, width, height, color, fill) {
        context.beginPath();
        context.rect(x || 0, y || 0, width || 100, height || 100);

        if (fill === undefined || fill === true || fill === 'string') {

            context.fillStyle = color || '#000000';
            context.fill();

            if (typeof fill === 'string') {
                context.strokeStyle = fill || '#000000';
                context.stroke();
            }
        }
        else {
            context.strokeStyle = color || '#000000';
            context.stroke();
        }
        context.closePath();
    };

  /**
   * Set line width, type pixels
   * @param num
   */
  instance.graphic.lineWidth = function (num) {
    context.lineWidth = num;
  };

  /**
   * Set opacity
   * @param num
   */
  instance.graphic.globalAlpha = function (num) {
    context.globalAlpha = num;
  };

    /**
     *
     * @param x
     * @param y
     * @param width
     * @param height
     * @param radius
     * @param color
     * @param fill
     */
    instance.graphic.rectRound = function (x, y, width, height, radius, color, fill) {
        x = x || 0;
        y = y || 0;
        width  = width || 100;
        height = height || 100;
        radius = radius || 5;
        color  = color || '#000';
        fill = fill === undefined ? true : !!fill;

        context.beginPath();
        context.moveTo(x + radius, y);
        context.arcTo(x + width, y, x + width, y + height, radius);
        context.arcTo(x + width, y + height, x, y + height, radius);
        context.arcTo(x, y + height, x, y, radius);
        context.arcTo(x, y, x + width, y, radius);

        if (fill) {
            context.fillStyle = color;
            context.fill();
            if (typeof fill === 'string') {
                context.strokeStyle = fill || '#000';
                context.stroke();
            }
        }
        else {
            context.strokeStyle = color;
            context.stroke();
        }
        context.closePath();
    };

    /**
     *
     * @param x
     * @param y
     * @param radius
     * @param color
     * @param fill
     */
    instance.graphic.circle = function (x, y, radius, color, fill) {
        instance.graphic.rectRound(x - (radius / 2), y - (radius / 2), radius, radius, radius / 2, color, fill);
    };

    /**
     *
     * @param point1
     * @param point2
     * @param lineWidth
     * @param color
     */
    instance.graphic.line = function (point1, point2, lineWidth, color) {
        context.beginPath();
        context.lineWidth = lineWidth || 1;
        context.strokeStyle = color;
        context.moveTo(point1.x, point1.y);
        context.lineTo(point2.x, point2.y);
        context.stroke();
        context.beginPath();
        context.closePath();
    };

    /**
     *
     * @param x
     * @param y
     * @param width
     * @param lineWidth
     * @param color
     */
    instance.graphic.lineVertical = function (x, y, width, lineWidth, color) {
        if (width < 0) {
            x -= Math.abs(width);
            width = Math.abs(width);
        }
        instance.graphic.line(instance.point(x, y), instance.point(x + width, y), lineWidth, color);
    };

    /**
     *
     * @param x
     * @param y
     * @param height
     * @param lineWidth
     * @param color
     */
    instance.graphic.lineHorizontal = function (x, y, height, lineWidth, color) {
        if (height < 0) {
            y -= Math.abs(height);
            height = Math.abs(height);
        }
        instance.graphic.line(instance.point(x, y), instance.point(x, y + height), lineWidth, color);
    };

    /**
     *
     * @param x
     * @param y
     * @param blur
     * @param color
     */
    instance.graphic.shadow = function (x, y, blur, color) {
        context.shadowOffsetX = x;
        context.shadowOffsetY = y;
        context.shadowBlur = blur;
        context.shadowColor = color;
    };

    /**
     * Clear global shadow
     */
    instance.graphic.clearShadow = function () {
        context.shadowOffsetX = context.shadowOffsetY = context.shadowBlur = 0;
    };

    /**
     * Draw ellipse
     * @param x
     * @param y
     * @param radiusX
     * @param radiusY
     * @param rotation
     * @param startAngle
     * @param endAngle
     * @param anticlockwise
     * @param closePath
     * @param fill
     */
    instance.graphic.ellipse = function (x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise, closePath, fill) {
        context.save();
        context.beginPath();
        context.translate(x, y);
        context.rotate(rotation);
        context.scale(radiusX / radiusY, 1);
        context.arc(0, 0, radiusY, startAngle, endAngle, (anticlockwise === undefined ? true : !!anticlockwise));
        context.restore();

        if (!!closePath || closePath === undefined)
            context.closePath();

        if (!!fill) context.fill();
        else context.stroke();
    };

});
    Animate.Extension(function (instance) {

    if (!(instance instanceof Animate))
        return;

    /**
     * @type CanvasRenderingContext2D
     */
    var context = instance.getContext();

    instance.resource = {
        _images: {},
        _audios: {},
        _videos: {}
    };

    instance.resource.loadImage = function (imgs, callback) {
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
                    iterator ++;
                    if (iterator == length) {
                        instance.resource._images = Animate.defaultObject(instance.resource._images, images);
                        callback.call(instance, images);
                    }
                };
            }
        }
    };

    instance.resource.loadAudio = function (srcs, callback) {
        if (srcs && typeof srcs === 'object') {
            var length = Object.keys(srcs).length;
            var audios = {};
            var iterator = 0;
            for (var name in srcs) {
                var audio =  document.createElement('audio');
                audio.src = srcs[name];
                audio.name = name;
                audio.preload = 'auto';
                audios[name] = audio;
                iterator ++;
                if (iterator == length) {
                    instance.resource._audios = Animate.defaultObject(instance.resource._audios, audios);
                    callback.call(instance, audios);
                }
            }
        }
    };

    instance.resource.loadVideo = function (srcs, callback) {
        if (srcs && typeof srcs === 'object') {
            var length = Object.keys(srcs).length;
            var videos = {};
            var iterator = 0;
            for (var name in srcs) {
                var video =  document.createElement('video');
                video.src = srcs[name];
                video.name = name;
                video.preload = 'auto';
                videos[name] = video;
                iterator ++;
                if (iterator == length) {
                    instance.resource._videos = Animate.defaultObject(instance.resource._videos, videos);
                    callback.call(instance, videos);
                }
            }
        }
    };

    instance.resource.getImage = function (name) {
        if (typeof name === 'string')
            return instance.resource._images[name] ? instance.resource._images[name] : false;
        if (Array.isArray(name)) {
            var i, imgs = [];
            for (i = 0; i < name.length; i ++)
                if (instance.resource._images[i]) imgs.push(instance.resource._images[i]);
            return imgs;
        }
    };

    instance.resource.getAudio = function (name) {
        if (typeof name === 'string')
            return instance.resource._audios[name] ? instance.resource._audios[name] : false;
        if (Array.isArray(name)) {
            var i, result = [];
            for (i = 0; i < name.length; i ++)
                if (instance.resource._audios[i]) result.push(instance.resource._audios[i]);
            return result;
        }
    };

    instance.resource.getVideo = function (name) {
        if (typeof name === 'string')
            return instance.resource._videos[name] ? instance.resource._videos[name] : false;
        if (Array.isArray(name)) {
            var i, result = [];
            for (i = 0; i < name.length; i ++)
                if (instance.resource._videos[i]) result.push(instance.resource._videos[i]);
            return result;
        }
    };



});
    Animate.Extension(function (instance) {

    if (!(instance instanceof Animate))
        return;

    /**
     * .keyPress()                              (out loop use) return info about this method
     * .keyPress('ArrowUp')                     (in loop use) return bool. true - when press 'ArrowUp'
     * .keyPress('ArrowUp', function(){})       (in loop use) execute function when press 'ArrowUp'
     * .keyPress(function(){})                  (out loop use) execute function every time when press any key
     * .keyPress(function(){}, function(){})    (out loop use) execute function1 for keyDown and function1 for keyUp
     *
     * @param a
     * @param b
     * @returns {*}
     */
    instance.keyPress = function (a, b) {
        if (instance.keyPress._keys === false)
            instance.keyPress._init_once_click_listener();

        if (arguments.length == 0) {
            return instance.keyPress.info();
        } else
        if (typeof arguments[0] === 'string') {
            if (typeof arguments[1] === 'function') {
                if (instance.keyPress._keys[arguments[0]])
                    arguments[1].call(null, instance.keyPress._keys[arguments[0]]);
            }
            return !!instance.keyPress._keys[arguments[0]];
        } else
        if (typeof arguments[0] === 'function') {
            instance.keyPress._keydown_callbacks.push(arguments[0]);
            if (typeof arguments[1] === 'function')
                instance.keyPress._keyup_callbacks.push(arguments[1]);
        }
    };

    instance.keyPress._init_once_click_listener = function () {
        if (instance.keyPress._keys === false) {
            instance.keyPress._keys = {};

            window.addEventListener('keydown', function (event) {
                if (event.defaultPrevented) {
                    return; // Do nothing if the event was already processed
                }

                for (var i = 0; i < instance.keyPress._keydown_callbacks.length; i ++)
                    if (typeof instance.keyPress._keydown_callbacks[i] === 'function')
                        instance.keyPress._keydown_callbacks[i].call(null, event);

                instance.keyPress._keys[event.keyCode] = event;
                if (event.key) instance.keyPress._keys[event.key] = instance.keyPress._keys[event.keyCode];
                if (event.code) instance.keyPress._keys[event.code] = instance.keyPress._keys[event.keyCode];
            });

            window.addEventListener('keyup', function (event) {
                if (event.defaultPrevented) {
                    return; // Do nothing if the event was already processed
                }

                for (var i = 0; i < instance.keyPress._keyup_callbacks.length; i ++)
                    if (typeof instance.keyPress._keyup_callbacks[i] === 'function')
                        instance.keyPress._keyup_callbacks[i].call(null, event);

                delete instance.keyPress._keys[event.key];
                delete instance.keyPress._keys[event.code];
                delete instance.keyPress._keys[event.keyCode];
            });
        }
    };
    instance.keyPress._keys = false;
    instance.keyPress._keyup_callbacks = [];
    instance.keyPress._keydown_callbacks = [];
    instance.keyPress.info = function () {
        var codes = "" +
            "Event keydown/keyup                                      \n" +
            "key         code        keyCode     Key pressed          \n" +
            "_________________________________________________________\n" +
            "Backspace   Backspace   8           Backspace\n" +
            "Tab         Tab         9           Tab\n" +
            "Enter       Enter       13          Enter\n" +
            "Shift       ShiftLeft   16          Shift\n" +
            "Control     ControlLeft 17          Ctrl\n" +
            "Alt         AltLeft     18          Alt\n" +
            "Pause       Pause       19          Pause, Break\n" +
            "            CapsLock    20          CapsLock\n" +
            "Escape      Escape      27          Esc\n" +
            "' '         Space       32          Space\n" +
            "PageUp      PageUp      33          Page Up\n" +
            "PageDown    PageDown    34          Page Down\n" +
            "End         End         35          End\n" +
            "Home        Home        36          Home\n" +
            "ArrowLeft   ArrowLeft   37          Left arrow\n" +
            "ArrowUp     ArrowUp     38          Up arrow\n" +
            "ArrowRight  ArrowRight  39          Right arrow\n" +
            "ArrowDown   ArrowDown   40          Down arrow\n" +
            "                        44          PrntScrn\n" +
            "                        45          Insert\n" +
            "                        46          Delete\n" +
            "1           Digit1      48-57       0 to 9\n" +
            "a           KeyA        65-90       A to Z\n" +
            "                        91          WIN Key (Start)\n" +
            "                        93          WIN Menu\n" +
            "                        112-123     F1 to F12\n" +
            "                        144         NumLock\n" +
            "                        145         ScrollLock\n" +
            "                        188         , <\n" +
            "                        190         . >\n" +
            "                        191         / ?\n" +
            "`           Backquote   192         ` ~\n" +
            "                        219         [ {\n" +
            "                        220         \ |\n" +
            "                        221         ] }\n" +
            "                        222         ' \"\n";
        console.info(codes);
        return codes;
    }
});
    Animate.Extension(function (instance) {

    if (!(instance instanceof Animate))
        return;

    /**
     * .mousePress()         (in loop use) return position point object if mouse click, or false
     * .mousePress(callback) (in loop use) execute function if mouse click with argument point object
     *
     * @param callback
     * @returns {*}
     */
    instance.mousePress = function (callback) {

        if (instance.mousePress._is_init === false)
            instance.mousePress._init_once_click_listener();

        if (instance.mousePress._position && typeof callback === 'function')
            callback.call(null, instance.mousePress._position);

        return instance.mousePress._position;
    };
    instance.mousePress._position = false;
    instance.mousePress._is_init = false;
    instance.mousePress._init_once_click_listener = function () {
        if (instance.mousePress._is_init === false) {
            instance.mousePress._is_init = true;

            instance._canvas.addEventListener('mousedown', function (event) {
                instance.mousePress._position = instance.mousePosition(event);
            });
            instance._canvas.addEventListener('mouseup', function (event) {
                instance.mousePress._position = false;
            });

        }
    };


    /**
     * .mouseMove()         (in loop use) return position point object when mouse move
     * .mouseMove(callback) (in loop use) execute function when mouse move with argument point object
     *
     * @param callback
     * @returns {*}
     */
    instance.mouseMove = function (callback) {
        if (instance.mouseMove._is_init === false) {
            instance.mouseMove._is_init = true;
            instance._canvas.addEventListener('mousemove', function (event) {
                instance.mouseMove._position = instance.mousePosition(event);
            });
        }
        if (instance.mouseMove._position && typeof callback === 'function')
            callback.call(null, instance.mouseMove._position);
        return instance.mouseMove._position;
    };
    instance.mouseMove._position = false;
    instance.mouseMove._is_init = false;

})
;

    /** Set script version. Property [read-only]*/
    Object.defineProperty(Animate, 'version', {
        enumerable: false, configurable: false, writable: false, value: '0.5.1'
    });

    window.Animate = Animate;

})(window);