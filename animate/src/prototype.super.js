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

})(Animate.prototype)