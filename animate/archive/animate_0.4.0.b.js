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

            var
                pk,
                options = {
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

                    //resources
                    _canvas: null,
                    _context: null,

                    // events
                    onFrame: null,
                    onMousemove: null,
                    onMousedown: null,
                    onMouseup: null,
                    onKeyup: null,
                    onKeydown: null,
                    onClick: null,

                    // internal
                    _is_playing: false,
                    _is_filtering: false,
                    _iterator: 0,
                    _frames: {},
                    _current_frame_name: 'default',
                    _loop_timer_id: null,
                    _loop_animation_frame_id: null
                };

            // Set options
            Animate.Util.defaultObject(options, _options);
            for (pk in options)
                this[pk] = options[pk];

            /** @type {HTMLCanvasElement|Element|null} */
            this._canvas = document.querySelector(this.selector);
            this._canvas.width = this.width;
            this._canvas.height = this.height;
            /** @type {CanvasRenderingContext2D|null} */
            this._context = this._canvas.getContext('2d');

            // initialize extensions
            if (Animate._internal_extensions.length > 0) {
                for (var ei = 0; ei < Animate._internal_extensions.length; ei++)
                    if (typeof Animate._internal_extensions[ei] === 'function')
                        Animate._internal_extensions[ei].call(this, this);
            }

            // custom settings
            if (!!this.fullScreen)
                this.resizeCanvas();

        }
    })();

    Animate.prototype = (function () {
        /**
         * @namespace Animate.prototype
         */
        var prototype = {};

        /**
         * Empty objects
         * @type {{}}
         */
        prototype.mc = {};
        prototype.data = {};

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

            Animate.Util.defaultObject(sceneObjectDefault, sceneObject);

            return sceneObjectDefault;
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

            this._iterator ++;

            if (this.autoClear === true)
                this.clear();

            // call onFrame
            if (typeof this.onFrame === 'function')
                this.onFrame.call(this, this._context, this._iterator);

            if (Array.isArray(frames)) {
                if (!this._is_filtering && frames.length > 0) {
                    if (!!this.sorting)
                        frames = frames.sort(function (one, two) {
                            return one['index'] > two['index']});
                    if (!!this.filtering)
                        frames = frames.filter(function (val) {
                            return !val['hide']});
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
         * Set resize canvas
         * @param width
         * @param height
         */
        prototype.resizeCanvas = function (width, height) {
            this._canvas.style.position = 'absolute';
            this._canvas.width = this.width = width || window.innerWidth;
            this._canvas.height = this.height = height || window.innerHeight;
        };

        /**
         * Set background color for canvas element
         * @param color
         */
        prototype.backgroundColor = function (color) {
            this._canvas.style.backgroundColor = color;
        };

        /**
         * Set background Image for canvas element
         * @param img
         */
        prototype.backgroundImage = function (img) {
            this._canvas.style.backgroundImage = img;
        };

        /**
         * Hit point inside rectangle
         * @param rectangle
         * @param point
         * @returns {boolean}
         */
        prototype.hitTest = function (rectangle, point) {
            var x = parseInt(point.x),
                y = parseInt(point.y);
            return  x > rectangle[0] &&
                y > rectangle[1] &&
                x < rectangle[0]+rectangle[2] &&
                y < rectangle[1]+rectangle[3];
        };

        /**
         * isPointInPath
         * @param point
         * @param y
         * @returns {boolean}
         */
        prototype.hitTestPoint = function (point, y) {
            if (arguments.length == 2) point = {x:point,y:y};
            return this._context.isPointInPath(point.x, point.y);
        };

        /**
         * Return point object
         * @param event
         * @returns {{x: number, y: number}}
         */
        prototype.mousePosition = function (event) {
            var rect = this._canvas.getBoundingClientRect();
            return {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
            };
        };

        // SUPER OBJECTS

        /**
         * Create special object with own properties
         * @param properties
         * @param callback
         * @returns {_moveclip}
         * @deprecated
         */
        prototype.moveclip = function (properties, callback) {
            var key;
            var defaultProperties = JSON.parse(JSON.stringify(prototype.moveclip.properties));

            if (typeof properties === 'function') {
                callback = properties;
                properties = {};
            }

            for (key in defaultProperties) {
                if (properties[key] === undefined)
                    properties[key] = defaultProperties[key];
                properties.id = 'clip_' + this.moveclip.count;
            }

            function _moveclip () {
                callback.apply(properties, arguments)
            }

            this.moveclip.count ++;
            return _moveclip;
        };
        prototype.moveclip.count = 0;
        prototype.moveclip.properties = {x: 0, y: 0, width: null, height: null, radius: null, rotate: null};

        /**
         * @deprecated
         */
        prototype.point = function (x, y) { return {x: x, y: y} };

        /**
         * Create special object to indicate a point
         * @param x
         * @param y
         * @returns {{x: *, y: *}}
         */
        prototype.Point = function (x, y) {
            var point = [x, y];
            point.x = x;
            point.y = y;
            return point;
        };

        /**
         * @deprecated
         */
        prototype.rectangle = function (x, y, width, height) { return [x, y, width, height] };

        /**
         * Create special object to indicate a rectangle
         * @param x
         * @param y
         * @param width
         * @param height
         * @returns {[*,*,*,*]}
         */
        prototype.Rectangle = function (x, y, width, height) {
            var rect = [x, y, width, height];
            rect.x = x;
            rect.y = y;
            rect.width = width;
            rect.height = height;
            return rect;
        };

        /**
         *
         * @param options       Object with properties
         * @param callback      Inside callback
         * @param thisInstance  Default or True copy all properties to `this` context
         * @returns {(function(this:T))|*}
         * @constructor
         */
        prototype.createClip = prototype.Clip = function (options, callback, thisInstance) {
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
         *
         * @param options
         * @param callback
         * @param thisInstance      if `true` prototype = options
         * @returns {clip}
         * @constructor
         */
        prototype.createMovieClip = prototype.MovieClip = function (options, callback, thisInstance) {
            var clip, key, ctx = this._context;

            var default_options = {
                x: 0,
                y: 0,
                transform: false,
                composite: false,
                rotate: false,
                scale: false,
                alpha: false
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
                    CanvasRenderingContext2D.prototype.setTransform.apply(ctx, this.transform);}
                if (this.rotate) {
                    ctx.rotate(this.rotate);}
                if (this.scale) {
                    CanvasRenderingContext2D.prototype.scale.apply(ctx, this.scale);}
                if (this.alpha) {
                    ctx.globalAlpha = this.alpha;}
                if (this.composite) {
                    ctx.globalCompositeOperation = this.composite;}
                callback.apply(this, arguments);
                ctx.restore();
                //return this;
            };

            clip = this.createClip(options, func, thisInstance);
            return clip;
        };

        prototype.createSprite = prototype.Sprite = function (options) {
            var key, movieclip, ctx = this._context, iterator = this._iterator, default_options = {
                // parameters
                x: 0,
                y: 0,
                width: 100,
                height: 100,
                image: null,
                grid: [4, 2],
                indexes: [0],
                delay: 0,
                point: {x:0, y:0},
                // internal
                _cursor_x: 0,
                _cursor_y: 0,
                _image_width: 0,
                _image_height: 0,
                _sprite_width: 100,
                _sprite_height: 100,
                _real_index: 0,
                _current_index: 0,
                _max_index: 0
            };

            for (key in default_options) {
                if (options[key] === undefined)
                    options[key] = default_options[key];
            }


            movieclip = this.createMovieClip(options, function () {
                var grid_row = this.grid[1];
                var grid_col = this.grid[0];
                // console.log(this._cursor_x);
                // console.log(this.x, movieclip.x, options.x);

                if (this._image_width === 0 && this._image_height === 0) {
                    this._image_width = this.image.naturalWidth || this.image.width;
                    this._image_height = this.image.naturalHeight || this.image.height;
                    this._sprite_width = this._image_width / grid_col;
                    this._sprite_height = this._image_height / grid_row;
                    this._max_index = grid_col * grid_row - 1;
                    this._current_index = this.indexes[0];
                }

                // cursor reload positions
                if (this.indexes.length > 1 && this.delay > 0) {
                    if (this._current_index >= grid_col - 1) {
                        var next_step = parseInt(this._current_index / grid_col) * this._sprite_height;
                        if (next_step > this._cursor_y)
                            this._cursor_x = 0;
                        else
                            this._cursor_x = this._current_index % grid_col * this._sprite_width;
                        this._cursor_y = next_step;
                    } else {
                        this._cursor_x = this._current_index * this._sprite_width;
                    }
                }

                ctx.drawImage(this.image,
                    // source
                    this._cursor_x, this._cursor_y, this._sprite_width, this._sprite_height,
                    // draw
                    this.point.x, this.point.y, this.width, this.height
                );
                // change - current_index cursor_x cursor_y
                if (this.indexes.length > 1 && this.delay > 0) {
                    if (iterator % this.delay === 0) {
                        if (this.indexes[this._real_index + 1]) {
                            this._real_index = this._real_index + 1;
                            this._current_index = this.indexes[this._real_index];
                        } else {
                            this._real_index = 0;
                            this._current_index = this.indexes[0];
                        }
                    }
                }
                return this;
            }, true);

            return movieclip;
        };

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

        prototype.toString = function () {
            return '[object Animate]'
        };

        return prototype
    })();

    Animate.prototype.constructor = Animate;

    /** Static Methods * */

    /**
     * Animation types
     * @type {string}
     */
    Animate.LOOP_TIMER = 'timer';

    Animate.LOOP_ANIMATE = 'animation';

    /**
     * Storage of extensions
     * @type {Array}
     */
    Animate._internal_extensions = [];

    /**
     * Add extensions in loader
     * @param func
     * @constructor
     */
    Animate.Extension = function (func) {
        Animate._internal_extensions.push(func);
    };

    /** Static Methods * */

    Animate.Util = {};

    Animate.Util.defaultObject = function (defaultObject, object) {
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
    Animate.Util.copy = function (src, addProperties) {
        var copy_object = JSON.parse(JSON.stringify(src));
        if (NamespaceApplication.typeOf(addProperties, 'object') || NamespaceApplication.typeOf(addProperties, 'array'))
            for (var i in addProperties)
                copy_object[i] = addProperties[i];
        return copy_object;
    };

    Animate.Util.random = function (min, max) {
        min = min || 0;
        max = max || 100;
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    Animate.Util.randomColor = function () {
        var letters = '0123456789ABCDEF'.split(''),
            color = '#';
        for (var i = 0; i < 6; i++)
            color += letters[Math.floor(Math.random() * 16)];
        return color;
    };

//  degrees*Math.PI/180.
    Animate.Util.degreesToRadians = function (deg) {
        return (deg * Math.PI) / 180;
    };

    Animate.Util.radiansToDegrees = function (rad) {
        return (rad * 180) / Math.PI;
    };

    Animate.Util.distanceBetween = function (p1, p2) {
        var dx = p2.x - p1.x;
        var dy = p2.y - p1.y;
        return Math.sqrt(dx * dx + dy * dy);
    };

    Animate.Extension(function (instance) {

        if (!(instance instanceof Animate))
            return;

        /**
         * Global text options
         * @type {{font: string, textAlign: string, textBaseline: string, direction: string, lineWidth: number, color: string, write: function}}

         instance.Text = {
        font: '12px Arial, sans',
        textAlign: 'start',
        textBaseline: 'top',
        direction: 'inherit',
        lineWidth: 1,
        color: '#000000',


        write: function (x, y, label, color, fill) {
            var context = instance.getContext();

            if (instance.Text.font)          context.font = instance.Text.font;
            if (instance.Text.textAlign)     context.textAlign = instance.Text.textAlign;
            if (instance.Text.textBaseline)  context.textBaseline = instance.Text.textBaseline;
            if (instance.Text.direction)     context.direction = instance.Text.direction;
            if (instance.Text.lineWidth)     context.lineWidth = instance.Text.lineWidth;
            if (instance.Text.color)         color = instance.Text.color;

            context.beginPath();

            if (fill === true || fill === undefined) {
                context.fillStyle = color || '#dddddd';
                context.fillText(label, x, y);

                if (typeof fill === 'string') {
                    context.strokeStyle = fill || '#000000';
                    context.strokeText(label, x, y);
                }
            }
            else {
                context.strokeStyle = color || '#000000';
                context.strokeText(label, x, y);
            }

            context.closePath();
        }
    };
         */

        instance.Text = {};
        instance.Text._text_parameters = false;

        /**
         * Create text block
         * @param x
         * @param y
         * @param label
         * @param color
         * @param fill
         */
        instance.Text.write = function (x, y, label, color, fill) {
            if (arguments.length === 1) {
                label = x;
                x = instance.Text._text_parameters.x;
                y = instance.Text._text_parameters.y;
            }
            fill = fill === undefined ? instance.Text._text_parameters.fill : fill;
            color = color === undefined ? instance.Text._text_parameters.color : color;

            var ctx = instance.getContext();
            var _point = instance.Text._text_parameters.point;
            var _alpha = instance.Text._text_parameters.alpha;
            var _scale = instance.Text._text_parameters.scale;
            var _rotate = instance.Text._text_parameters.rotate;
            var _transform = instance.Text._text_parameters.transform;


            ctx.save();
            ctx.translate(x, y);
            ctx.font = instance.Text._text_parameters.font;
            ctx.textAlign = instance.Text._text_parameters.textAlign;
            ctx.textBaseline = instance.Text._text_parameters.textBaseline;
            ctx.direction = instance.Text._text_parameters.direction;
            ctx.lineWidth = instance.Text._text_parameters.lineWidth;
            ctx.globalAlpha = instance.Text._text_parameters.alpha;

            //ctx.lineWidth = instance.Text._text_parameters.lineWidth;
            if (_transform) {
                CanvasRenderingContext2D.prototype.setTransform.apply(ctx, _transform);}
            if (_rotate) {
                ctx.rotate(_rotate);}
            if (_scale) {
                CanvasRenderingContext2D.prototype.scale.apply(ctx, _scale);}
            if (_alpha) {
                ctx.globalAlpha = _alpha;}

            if (fill === true || fill === undefined) {
                ctx.fillStyle = color;
                ctx.fillText(label, _point.x, _point.y);
            }
            else {
                ctx.strokeStyle = color;
                ctx.strokeText(label, _point.x, _point.y);
            }
            ctx.restore();
        };

        instance.Text.defaultStyle = {
            font: '12px Arial, sans',
            textAlign: 'start',
            textBaseline: 'top',
            direction: 'inherit',
            lineWidth: 1,
            color: '#000000'
        };

        instance.Text.reset = function () {
            if (instance.Text._text_parameters === false)
                instance.Text._text_parameters = {};

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
                instance.Text._text_parameters[key] = default_parameters[key];
            }
            for (key in instance.Text.defaultStyle) {
                instance.Text._text_parameters[key] = instance.Text.defaultStyle[key];
            }
        };

        instance.Text.font = function (value) {instance.Text._text_parameters.font = value};
        instance.Text.textAlign = function (value) {instance.Text._text_parameters.textAlign = value};
        instance.Text.textBaseline = function (value) {instance.Text._text_parameters.textBaseline = value};
        instance.Text.direction = function (value) {instance.Text._text_parameters.direction = value};
        instance.Text.lineWidth = function (value) {instance.Text._text_parameters.lineWidth = value};
        instance.Text.color = function (value) {instance.Text._text_parameters.color = value};
        instance.Text.alpha = function (value) {instance.Text._text_parameters.globalAlpha = value};
        instance.Text.rotate = function (value) {instance.Text._text_parameters.rotate = value};
        instance.Text.point = function (value) {instance.Text._text_parameters.point = value};
        instance.Text.x = function (value) {instance.Text._text_parameters.x = value};
        instance.Text.y = function (value) {instance.Text._text_parameters.y = value};
        instance.Text.transform = function (value) {instance.Text._text_parameters.transform = value};
        instance.Text.rotate = function (value) {instance.Text._text_parameters.rotate = value};
        instance.Text.scale = function (value) {instance.Text._text_parameters.scale = value};

        if (instance.Text._text_parameters === false) {
            instance.Text.reset();
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
         *
         * @type {{shape: function, rect: function, rectRound: function, circle: function, line: function, lineVertical: function, lineHorizontal: function, shadow: function, clearShadow: function, ellipse: function}}
         */
        instance.Graphic = {};

        /**
         * @namespace Animate.prototype.Graphic.shape
         * @param points
         * @param color
         * @param fill
         * @param closePath
         * @param lineWidth
         */
        instance.Graphic.shape = function (points, color, fill, closePath, lineWidth) {
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
                    instance.Graphic.shape(points, color, true);
                    instance.Graphic.shape(points, fill, false, closePath, lineWidth);
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
        instance.Graphic.rect = function (x, y, width, height, color, fill) {
            context.beginPath();
            context.rect(x || 0, y || 0, width || 100, height || 100);

            if (fill === undefined || fill === true || fill === 'string') {
                context.fillStyle = color || '#000';
                context.fill();
                if (typeof fill === 'string') {
                    context.strokeStyle = fill || '#000';
                    context.stroke();
                }
            }
            else {
                context.strokeStyle = color || '#000';
                context.stroke();
            }
            context.closePath();
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
        instance.Graphic.rectRound = function (x, y, width, height, radius, color, fill) {
            x = x || 0;
            y = y || 0;
            width  = width || 100;
            height = height || 100;
            radius = radius || 5;
            color  = color || '#000';

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
        instance.Graphic.circle = function (x, y, radius, color, fill) {
            instance.Graphic.rectRound(x - (radius / 2), y - (radius / 2), radius, radius, radius / 2, color, fill);
        };

        /**
         *
         * @param point1
         * @param point2
         * @param lineWidth
         * @param color
         */
        instance.Graphic.line = function (point1, point2, lineWidth, color) {
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
        instance.Graphic.lineVertical = function (x, y, width, lineWidth, color) {
            if (width < 0) {
                x -= Math.abs(width);
                width = Math.abs(width);
            }
            instance.Graphic.line(instance.point(x, y), instance.point(x + width, y), lineWidth, color);
        };

        /**
         *
         * @param x
         * @param y
         * @param height
         * @param lineWidth
         * @param color
         */
        instance.Graphic.lineHorizontal = function (x, y, height, lineWidth, color) {
            if (height < 0) {
                y -= Math.abs(height);
                height = Math.abs(height);
            }
            instance.Graphic.line(instance.point(x, y), instance.point(x, y + height), lineWidth, color);
        };

        /**
         *
         * @param x
         * @param y
         * @param blur
         * @param color
         */
        instance.Graphic.shadow = function (x, y, blur, color) {
            context.shadowOffsetX = x;
            context.shadowOffsetY = y;
            context.shadowBlur = blur;
            context.shadowColor = color;
        };

        /**
         *
         */
        instance.Graphic.clearShadow = function () {
            context.shadowOffsetX = context.shadowOffsetY = context.shadowBlur = 0;
        };

        /**
         *
         * @param x
         * @param y
         * @param radiusX
         * @param radiusY
         * @param rotation
         * @param startAngle
         * @param endAngle
         * @param anticlockwise
         */
        instance.Graphic.ellipse = function (x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise) {
            context.save();
            context.beginPath();
            context.translate(x, y);
            context.rotate(rotation);
            context.scale(radiusX / radiusY, 1);
            context.arc(0, 0, radiusY, startAngle, endAngle, (anticlockwise || true));
            context.restore();
            context.closePath();
            context.stroke();
        };

    });

    Animate.Extension(function (instance) {

        if (!(instance instanceof Animate))
            return;

        /**
         * @type {{images: {}, load: load, get: get}}
         */
        instance.Image = {
            images: {},
            load: function (imgs, callback) {},
            get: function (name) {}
        };

        /**
         * Load Image Resource
         * Object imgs:
         *      key     - is the name for the access, assigned after loading
         *      value   - is the URL of the resource to load
         *
         * @param imgs
         * @param callback
         */
        instance.Image.load = function (imgs, callback) {
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
                            instance.Image.images = Animate.Util.defaultObject(instance.Image.images, images);
                            callback.call(instance, images);
                        }
                    };
                }
            }
        };

        /**
         * Get image`s
         * @param name
         * @returns {*}
         */
        instance.Image.get = function (name) {
            if (typeof name === 'string')
                return instance.Image.images[name] ? instance.Image.images[name] : false;
            if (Array.isArray(name)) {
                var i, imgs = [];
                for (i = 0; i < name.length; i ++)
                    if (instance.Image.images[i]) imgs.push(instance.Image.images[i]);
                return imgs;
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
        instance.mousePress._init_once_click_listener = function () {
            if (instance.mousePress._is_init === false) {
                instance.mousePress._is_init = true;

                instance._canvas.addEventListener('mousedown', function (event) {
                    instance.mousePress._position = instance.mousePosition(event);
                });
                instance._canvas.addEventListener('mouseup', function (event) {
                    instance.mousePress._position = false;
                });
                instance._canvas.addEventListener('mousemove', function (event) {
                    if (instance.mousePress._position)
                        instance.mousePress._position = instance.mousePosition(event);
                });
            }
        };
        instance.mousePress._position = false;
        instance.mousePress._is_init = false;
    });

    /** Set script version. Property [read-only]*/
    Object.defineProperty(Animate, 'version', {
        enumerable: false, configurable: false, writable: false, value: '0.4.0'
    });

    window.Animate = Animate;

})(window);