(function () {
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
        return this.canvas;
    };

    /**
     * Return CanvasRenderingContext2D
     * @type CanvasRenderingContext2D
     */
    prototype.getContext = function () {
        return this.context;
    };


    /**
     * Return current iteration
     * @returns {number}
     */
    prototype.getIteration = function () {
        return this._iterator;
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

        if (!this._is_playing && this.context) {

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
            this.onFrame.call(this, this.context, this._iterator);

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
                    frame.init.call(frame, this.context, this._iterator);
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
        this.context.clearRect(0, 0, this.width, this.height);
    };

    /**
     * Set resize canvas
     * @param width
     * @param height
     */
    prototype.resizeCanvas = function (width, height) {
        this.canvas.style.position = 'absolute';
        this.canvas.width = this.width = width || window.innerWidth;
        this.canvas.height = this.height = height || window.innerHeight;
    };

    /**
     * Set background color for canvas element
     * @param color
     */
    prototype.backgroundColor = function (color) {
        this.canvas.style.backgroundColor = color;
    };

    /**
     * Set background Image for canvas element
     * @param img
     */
    prototype.backgroundImage = function (img) {
        this.canvas.style.backgroundImage = img;
    };

    /**
     * Create special object with own properties
     * @param properties
     * @param callback
     * @returns {_moveclip}
     */
    prototype.moveclip = function (properties, callback) {
        var
            key,
            that = this,
            props = {
                x: 0,
                y: 0,
                width: null,
                height: null,
                radius: null,
                rotate: 0,
                id: 'clip_' + this.moveclip.count,
            };

        if (typeof properties === 'function') {
            callback = properties;
            properties = props;
        } else
            properties = Animate.Util.defaultObject(props, properties);

        var _moveclip = function () {
            //that.context.save();
            callback.apply(_moveclip, arguments);
            //that.context.restore();
        };

        for (key in properties)
            if (!_moveclip.hasOwnProperty(key)) _moveclip[key] = properties[key]

        this.moveclip.count ++;
        return _moveclip;
    };

    prototype.moveclip.count = 0;

    /**
     * Create special object to indicate a point
     * @param x
     * @param y
     * @returns {{x: *, y: *}}
     */
    prototype.point = function (x, y) { return {x: x, y: y} };

    /**
     * Create special object to indicate a rectangle
     * @param x
     * @param y
     * @param width
     * @param height
     * @returns {*[]}
     */
    prototype.rectangle = function (x, y, width, height) { return [x, y, width, height] };

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
     * Return point object
     * @param event
     * @returns {{x: number, y: number}}
     */
    prototype.mousePosition = function (event) {
        var rect = this.canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    };

    prototype._events_initialize = function () {
        var that = this;

        // onclick event
        if (typeof this.onClick === 'function' && !this._on_click_init) {
            this.canvas.addEventListener('click', function (event) {
                that.onClick.call(that, event, that.mousePosition(event))
            });
            this._on_click_init = true;
        }

        // onmousemove event
        if (typeof this.onMousemove === 'function' && !this._on_mousemove_init) {
            this.canvas.addEventListener('mousemove', function (event) {
                that.onMousemove.call(that, event, that.mousePosition(event))
            });
            this._on_mousemove_init = true;
        }

        // onmousedown event
        if (typeof this.onMousedown === 'function' && !this._on_mousedown_init) {
            this.canvas.addEventListener('mousedown', function (event) {
                that.onMousedown.call(that, event, that.mousePosition(event))
            });
            this._on_mousedown_init = true;
        }

        // onmouseup event
        if (typeof this.onMouseup === 'function' && !this._on_mouseup_init) {
            this.canvas.addEventListener('mouseup', function (event) {
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
})()