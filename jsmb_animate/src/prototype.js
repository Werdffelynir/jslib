(function () {
    /**
     * @namespace Animate.prototype
     */
    var prototype = {};

    /**
     * @type HTMLCanvasElement
     */
    prototype.getCanvas = function () {
        return this._canvas;
    };

    /**
     * @type CanvasRenderingContext2D
     */
    prototype.getContext = function () {
        return this._context;
    };

    /**
     *
     * @returns {number}
     */
    prototype.getIteration = function () {
        return this._frame_iterator;
    };

    /**
     *
     * @returns {boolean}
     */
    prototype.isPlayed = function () {
        return this._is_play;
    };

    /**
     *
     * @param name
     * @param sceneObject
     * @returns {{index: number, hide: boolean, name: string, init: null}|*}
     */
    prototype.frame = function (name, sceneObject) {

        if (arguments.length === 1) {
            if (name && (typeof name === 'function' || typeof name === 'object')) {
                sceneObject = name;
                name = this._frame_name;
            }
        }
        sceneObject = this.createSceneObject(sceneObject);

        if (!Array.isArray(this._frames[name]))
            this._frames[name] = [];

        this._frames[name].push(sceneObject);
        return sceneObject;
    };

    /**
     *
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
     *
     * @type {Animate.prototype.restart}
     */
    prototype.start = function (frameName) {
        this.stop();
        this.play(frameName || this._frame_name);
    };

    /**
     *
     * @param frameName
     */
    prototype.play = function (frameName) {

        if (!this._is_play && this._context) {

            // initialize events
            this._events_initialize();

            // set current frame name
            this._frame_name = frameName;

            if (this.fps === 0 || this.fps === false) {
                this._internal_drawframe.call(this);
            } else if (this.loop === Animate.LOOP_ANIMATE) {
                this._loop_animation_frame();
                this._is_play = true;
            } else if (this.loop === Animate.LOOP_TIMER) {
                this._loop_timer();
                this._is_play = true;
            }
        }
    };

    prototype.stop = function () {
        if (this._is_play) {
            if (this.loop === Animate.LOOP_ANIMATE) {
                cancelAnimationFrame(this._loop_animation_frame_id);
                this._is_play = false;
            } else if (this.loop === Animate.LOOP_TIMER) {
                clearTimeout(this._loop_timer_id);
                this._is_play = false;
            }
        }
    };

    prototype._internal_drawframe = function () {
        var i,
            frame,
            frames = this._frames[this._frame_name];

        this._frame_iterator ++;

        if (this.autoClear === true)
            this.clear();

        if (Array.isArray(frames)) {
            if (!this._is_filter && frames.length > 0) {
                if (!!this.sorting)
                    frames = frames.sort(function (one, two) {
                        return one['index'] > two['index']
                    });
                if (!!this.filtering)
                    frames = frames.filter(function (val) {
                        return !val['hide']
                    });
                this._is_filter = true;
            }
            for (i = 0; i < frames.length; i++) {
                frame = frames[i];

                // call onFrame
                if (typeof this._on_frame === 'function')
                    this._on_frame.call(this, this._context, this._frame_iterator);

                // call frames
                if (typeof frame.init === 'function')
                    frame.init.call(frame, this._context, this._frame_iterator);
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
     *
     * @param callback
     */
    prototype.onFrame = function (callback) {
        this._on_frame = callback };

    prototype.onMousemove = function (callback) {
        this._on_mousemove = callback };

    prototype.onKeydown = function (callback) {
        this._on_keydown = callback };

    prototype.onKeyup = function (callback) {
        this._on_keyup = callback };

    prototype.onClick = function (callback) {
        this._on_click = callback };

    prototype.mousePosition = function (event) {
        var rect = this._canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    };



    prototype._events_initialize = function () {
        var that = this;

        if (typeof this._on_click === 'function' && !this._on_click_is) {
            this._canvas.addEventListener('click', function (event) {
                that._on_click.call(that, event, that.mousePosition(event))
            });
            this._on_click_is = true;
        }

        if (typeof this._on_mousemove === 'function' && !this._on_mousemove_is) {
            this._canvas.addEventListener('mousemove', function (event) {
                that._on_mousemove.call(that, event, that.mousePosition(event))
            });
            this._on_mousemove_is = true;
        }

        if (typeof this._on_keydown === 'function' && !this._on_keydown_is) {
            window.addEventListener('keydown', function (event) {
                that._on_keydown.call(that, event)
            });
            this._on_keydown_is = true;
        }

        if (typeof this._on_keyup === 'function' && !this._on_keyup_is) {
            window.addEventListener('keyup', function (event) {
                that._on_keyup.call(that, event)
            });
            this._on_keyup_is = true;
        }
    };

    return prototype
})()