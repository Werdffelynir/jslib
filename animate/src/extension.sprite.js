Animate.Extension(function (instance) {

    if (!(instance instanceof Animate))
        return;

    /**
     * mc = createSprite({
     *      image: Image,                   // Image resource
     *      grid_columns: 4,                // columns in Grid Map
     *      grid_rows: 2,
     *      indexes: [0,1,2,3],             // indexes queue for move
     *      delay: 2,                       // delay in animation iteration
     *      x: 100,                         // position X and Y
     *      y: 100,
     *      width: 50,                      // size
     *      height: 30,
     *      rotate: 45 * Math.PI / 180,     // rotation in radians. arguments for CanvasRenderingContext2D.rotate
     *      scale: [1, 1],                  // arguments for CanvasRenderingContext2D.scale
     *      transform: [1, 0, 0, 1, 0, 0],  // arguments for CanvasRenderingContext2D.setTransform
     *      point: {x: -15, y: -25},        // base point position
     * });
     *
     * Grid Map Indexes. example grid_columns: 4; grid_rows: 3
     *  [ 0, 1, 2, 3]
     *  [ 4, 5, 6, 7]
     *  [ 8, 9, 10, 11]
     * @param options
     * @returns {_func}
     * @deprecated
     * @constructor
     */
    instance.Sprite = function (options) {

        var _func = function () {
            /** @type CanvasRenderingContext2D */
            var ctx = instance.getContext();
            var i = instance.getIteration();
            if (_func.image_width === 0 && _func.image_height === 0) {
                _func.image_width = _func.image.naturalWidth || _func.image.width;
                _func.image_height = _func.image.naturalHeight || _func.image.height;
                _func.sprite_width = _func.image_width / _func.grid_columns;
                _func.sprite_height = _func.image_height / _func.grid_rows;
                _func.max_index = _func.grid_columns * _func.grid_rows - 1;
            }

            // cursor reload positions
            if (_func.indexes.length > 1 && _func.delay > 0) {
                if (_func.current_index >= _func.grid_columns - 1) {
                    var next_step = parseInt(_func.current_index / _func.grid_columns) * _func.sprite_height;
                    if (next_step > _func.cursor_y){
                        _func.cursor_x = 0;
                    }
                    else {
                        _func.cursor_x = _func.current_index % _func.grid_columns * _func.sprite_width;
                    }

                    _func.cursor_y = next_step;
                } else {
                    _func.cursor_x = _func.current_index * _func.sprite_width;
                }
            }

            // draw image
            ctx.save();
            ctx.translate(_func.x, _func.y);

            if (_func.transform) {
                CanvasRenderingContext2D.prototype.setTransform.apply(ctx, _func.transform);
            }
            if (_func.rotate) {
                ctx.rotate(_func.rotate);
            }
            if (_func.scale) {
                CanvasRenderingContext2D.prototype.scale.apply(ctx, _func.scale);
            }

            ctx.drawImage(_func.image,
                // source
                _func.cursor_x, _func.cursor_y, _func.sprite_width, _func.sprite_height,
                // draw
                _func.point.x, _func.point.y, _func.width, _func.height
            );

            ctx.restore();

            // change - current_index cursor_x cursor_y
            if (_func.indexes.length > 1 && _func.delay > 0) {
                if (i % _func.delay === 0) {

                    if (_func.indexes[_func.real_index + 1]) {
                        _func.real_index = _func.real_index + 1;
                        _func.current_index = _func.indexes[_func.real_index];
                    } else {
                        _func.real_index = 0;
                        _func.current_index = _func.indexes[0];
                    }
                }
            }
            return _func;
        };

        var _key, _options = {
            // parameters
            image: null,
            grid_columns: null,
            grid_rows: null,
            indexes: [0],
            delay: 0,
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            point: {x:0, y:0},
            scale: false,
            rotate: false,
            transform: false,

            // internal
            cursor_x: 0,
            cursor_y: 0,
            image_width: 0,
            image_height: 0,
            sprite_width: 0,
            sprite_height: 0,
            real_index: 0,
            current_index: 0
        };
        for (_key in options) {
            _options[_key] = options[_key];
        }
        for (_key in _options) {
            _func[_key] = _options[_key];
        }

        _func.current_index = _func.indexes[0];
        return _func;
    };

/*    instance.createSprite = function (options) {
        var key, movieclip, ctx = instance.context, default_options = {
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


        movieclip = instance.createMovieClip(options, function () {
            var grid_row = this.grid[1];
            var grid_col = this.grid[0];
            //
            // console.log(this);
            // console.log(this.x, movieclip.x, options.x);

            if (this._image_width === 0 && this._image_height === 0) {
                this._image_width = this.image.naturalWidth || this.image.width;
                this._image_height = this.image.naturalHeight || this.image.height;
                this._sprite_width = this._image_width / grid_col;
                this._sprite_height = this._image_height / grid_row;
                this._max_index = grid_col * grid_row - 1;
            }

            instance.context.drawImage(this.image,
                // source
                this._cursor_x, this._cursor_y, this._sprite_width, this._sprite_height,
                // draw
                this.point.x, this.point.y, this.width, this.height
            );

            // change - current_index cursor_x cursor_y
            if (this.indexes.length > 1 && this.delay > 0) {
                if (instance._iterator % this.delay === 0) {
                    if (this.indexes[this._real_index + 1]) {
                        this._real_index = this._real_index + 1;
                        this._current_index = this.indexes[this._real_index];
                    } else {
                        this._real_index = 0;
                        this._current_index = this.indexes[0];
                    }
                }
            }
        }, true);

        return movieclip;
    };*/

})