(function (prototype) {

    /**
     * @type Animate.prototype
     * @var prototype
     */

    /**
     *
     */
    prototype.clear = function () {
        this._context.clearRect(0, 0, this.width, this.height);
    };

    prototype.resizeCanvas = function (width, height) {
        this._canvas.style.position = 'absolute';
        this._canvas.width = this.width = width || window.innerWidth;
        this._canvas.height = this.height = height || window.innerHeight;
    };

    /**
     *
     * @param properties
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
                id: 'clip_' + this.clip.count,
            };

        if (typeof properties === 'function') {
            callback = properties;
            properties = props;
        } else
            properties = Animate.Util.defaultObject(props, properties);

        var create = function (ctx) {
            var i, args = [];
            for (i = 0; i < arguments.length; i ++) {
                args.push(arguments[i]);
            }
            callback.apply(create, args);
        };

        for (key in properties)
            if (!create.hasOwnProperty(key)) create[key] = properties[key]

        this.clip.count ++;
        return create;
    };

    prototype.clip.count = 0;

    prototype.point = function (x, y) { return {x: x, y: y} };

    prototype.rectangle = function (x, y, width, height) { return [x, y, width, height] };

    prototype.hitTest = function (rectangle, point) {
        if (typeof rectangle !== "object" || typeof rectangle !== "object") {
            console.error("Error: rectangle - not Array [x,y,w,h]; point - not Object {x:,y:}");
            return false;
        }
        return  rectangle[0]                < point.x &&
                rectangle[1]                < point.y &&
                rectangle[0] + rectangle[2] > point.x &&
                rectangle[1] + rectangle[3] > point.y;
    };

    prototype._context.rectRound = function (x, y, width, height, radius) {
        x = x || 0;
        y = y || 0;
        width = width || 100;
        height = height || 100;
        radius = radius || 5;
        this._context.beginPath();
        this._context.moveTo(x + radius, y);
        this._context.arcTo(x + width, y, x + width, y + height, radius);
        this._context.arcTo(x + width, y + height, x, y + height, radius);
        this._context.arcTo(x, y + height, x, y, radius);
        this._context.arcTo(x, y, x + width, y, radius);
    };

    prototype._context.shadow = function (x, y, blur, color) {
        this._context.shadowOffsetX = x;
        this._context.shadowOffsetY = y;
        this._context.shadowBlur = blur;
        this._context.shadowColor = color;
    };

    prototype._context.clearShadow = function () {
        this._context.shadowOffsetX = this._context.shadowOffsetY = this._context.shadowBlur = 0;
    };

    if (!prototype._context.ellipse) {
        /**
         * Draw ellipse - cross-browser function
         * @param x
         * @param y
         * @param radiusX
         * @param radiusY
         * @param rotation
         * @param startAngle
         * @param endAngle
         * @param anticlockwise
         */
        prototype._context.ellipse = function (x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise) {
            this._context.save();
            this._context.beginPath();
            this._context.translate(x, y);
            this._context.rotate(rotation);
            this._context.scale(radiusX / radiusY, 1);
            this._context.arc(0, 0, radiusY, startAngle, endAngle, (anticlockwise || true));
            this._context.restore();
            this._context.closePath();
            this._context.stroke();
        }
    }

})(Animate.prototype)