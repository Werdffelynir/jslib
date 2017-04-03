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

            // return self context
            return this;
        };

        clip = Animate.Clip(options, func, thisInstance);
        return clip;
    };

    prototype.createSprite = function (options) {
        var key,
            movieclip,
            ctx = this._context,
            iterator = this._iterator;

        var default_options = {
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
            loop: true,

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

            if (arguments.length == 1 && arguments[0] && typeof arguments[0] === 'object') {
                for (var ik in arguments[0]) {
                    this[ik] = arguments[0][ik];
                }
            }

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

                    } else if (this.loop) {
                        this._real_index = 0;
                        this._current_index = this.indexes[0];
                    }
                }
            }

            // return self context
            this.getCurrentIndex = this._current_index;
            this.getRealIndex = this._real_index;
            this.getMaxIndex = this._max_index;
            this.reset = function () {
                this._real_index = 0;
                this._current_index = this.indexes[0];
            };

            return this;
        }, true);

        return movieclip;
    };


})(Animate.prototype)