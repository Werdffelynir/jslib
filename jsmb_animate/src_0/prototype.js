(function () {
    /**
     * @namespace Animate.prototype
     */
    var prototype = {};

    /**
     * @private
     * @returns {Animate.prototype._internal_drawframe|{}}
     */
    prototype._internal_drawframe = function () {
        var i,
            frame,
            frames = this.frameStorageList[this.frameName];

        this.frameCounter++;

        if (this.autoClear === true)
            this.clear();

        if (Array.isArray(frames)) {
            if (!this.isFiltering && frames.length > 0) {
                if (!!this.sorting)
                    frames = frames.sort(function (one, two) {
                        return one['index'] > two['index']
                    });
                if (!!this.filtering)
                    frames = frames.filter(function (val) {
                        return !val['hide']
                    });
                this.isFiltering = true;
            }
            for (i = 0; i < frames.length; i++) {
                frame = frames[i];

                if (typeof this.onFrame === 'function')
                    this.onFrame.call(this, this.context, this.frameCounter);

                frame.runner.call(frame, this.context, this.frameCounter);
            }
        }
    };

    /**
     * Clear canvas area
     * @returns {Animate.prototype.clear|{}}
     */
    prototype.clear = function () {
        this.context.clearRect(0, 0, this.width, this.height);
        return this
    };

    /**
     *
     * @param name
     * @param sceneObject
     * @returns {{index: number, hide: boolean, name: string, runner: null}|*}
     */
    prototype.frame = function (name, sceneObject) {
        if ((typeof name === 'object' || typeof name === 'function') && arguments.length === 1) {
            sceneObject = name;
            name = 'default';
        }

        sceneObject = this.createSceneObject(sceneObject);
        if (!Array.isArray(this.frameStorageList[name]))
            this.frameStorageList[name] = [];
        this.frameStorageList[name].push(sceneObject);

        return sceneObject;
    };

    /**
     *
     * @param sceneObject
     * @returns {{index: number, hide: boolean, name: string, runner: null}}
     */
    prototype.createSceneObject = function (sceneObject) {
        var sceneObjectDefault = {index: 100, hide: false, name: 'scene', runner: null};
        if (typeof sceneObject === 'function') sceneObject = {runner: sceneObject};
        Animate.Util.defaultObject(sceneObjectDefault, sceneObject);
        return sceneObjectDefault;
    };

    /**
     *
     * @param frameName
     * @returns {Animate.prototype.start|{}}
     */
    prototype.start = function (frameName) {
        this.play(frameName || 'default');
        return this
    };

    /**
     *
     * @param frameName
     * @returns {Animate.prototype.play|{}}
     */
    prototype.play = function (frameName) {
        if (!this.isPlay && this.context) {
            this.frameName = frameName;
            if (this.fps === 0 || this.fps === false) {
                this._internal_drawframe.call(this);
            } else if (this.loop === Animate.LOOP_ANIMATE) {
                this._loop_animation_frame();
                this.isPlay = true;
            } else if (this.loop === Animate.LOOP_TIMER) {
                this._loop_timer();
                this.isPlay = true;
            }
        }
        return this
    };

    /**
     *
     * @returns {Animate.prototype.stop|{}}
     */
    prototype.stop = function () {
        if (this.isPlay) {
            if (this.loop === Animate.LOOP_ANIMATE) {
                cancelAnimationFrame(this.requestAnimationFrameIterator);
                this.isPlay = false;
            } else if (this.loop === Animate.LOOP_TIMER) {
                clearTimeout(this.setTimeoutIterator);
                this.isPlay = false;
            }
        }
        return this
    };

    /**
     * @private
     */
    prototype._loop_timer = function () {
        var that = this;
        var fps = this.fps || 30;
        var interval = 1000 / fps;

        return (function loop(time) {
            that.setTimeoutIterator = setTimeout(loop, interval);

            // call the draw method
            that._internal_drawframe.call(that);
        }());
    };

    /**
     * @private
     */
    prototype._loop_animation_frame = function () {
        var that = this;
        var then = new Date().getTime();
        var fps = this.fps || 30;
        var interval = 1000 / fps;

        return (function loop(time) {
            that.requestAnimationFrameIterator = requestAnimationFrame(loop);
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
     * @param properties object { x: 0, y: 0, width: '100px', height: '100px, radius: null, rotate: 0, id: '*' }
     * @param callback
     * @returns {create}
     */
    prototype.clip = function (properties, callback) {
        var key, that = this,
            props = {
                x: 0,
                y: 0,
                width: null,
                height: null,
                radius: null,
                rotate: 0,
                id: 'clip_' + this.clip.count
            };

        if (typeof properties === 'function') {
            callback = properties;
            properties = props;
        } else
            properties = Animate.Util.defaultObject(props, properties);

        var create = function (ctx) {
            var i, args = [];
            for (i = 0; i < arguments.length; i++) {
                args.push(arguments[i]);
            }
            callback.apply(create, args);
        };

        for (key in properties)
            if (!create.hasOwnProperty(key)) create[key] = properties[key]

        this.clip.count++;
        return create;
    };
    prototype.clip.count = 0;


    /**
     * Resize element Canvas on full page, or by params
     * @param {Number} width - default full window width
     * @param {Number} height - default full window height
     */
    prototype.resizeCanvas = function (width, height) {
        this.canvas.style.position = 'absolute';
        this.canvas.width = this.width = width || window.innerWidth;
        this.canvas.height = this.height = height || window.innerHeight;
    };

    /**
     * Simple point
     * @param x
     * @param y
     * @returns {{x: *, y: *}}
     */
    prototype.point = function (x, y) {
        return {x: x, y: y};
    };

    /**
     * Simple rectangle
     * @param x
     * @param y
     * @param width
     * @param height
     * @returns {*[]}
     */
    prototype.rectangle = function (x, y, width, height) {
        return [x, y, width, height];
    };

    /**
     * point hitTest in rectangle
     * @param rectangle
     * @param point
     * @returns {boolean}
     */
    prototype.hitTest = function (rectangle, point) {
        if (typeof rectangle !== "object" || typeof rectangle !== "object") {
            console.error("Error: rectangle - must be Array [x, y, w, h]; point - must be Object { x: , y: }");
            return false;
        }
        return  rectangle[0]                < point.x &&
                rectangle[1]                < point.y &&
                rectangle[0] + rectangle[2] > point.x &&
                rectangle[1] + rectangle[3] > point.y;
    };

    /**
     * toString
     * @returns {string}
     */
    prototype.toString = function () {
        return '[object Animate]'
    };

    return prototype
})()