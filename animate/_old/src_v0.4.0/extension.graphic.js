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
     * Clear global shadow
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

})