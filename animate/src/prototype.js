(function () {

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
     * @param width     default: fullscreen 'window.innerWidth'
     * @param height    default: fullscreen 'window.innerHeight'
     * @param position  default: 'absolute'
     */
    prototype.resizeCanvas = function (width, height, position) {
        this._canvas.style.position = position || 'absolute';
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
        var x = parseInt(point.x), y = parseInt(point.y);
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
})()