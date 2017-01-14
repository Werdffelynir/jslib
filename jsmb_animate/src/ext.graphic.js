/**
 * Extension of simple graphic shapes
 */
Animate.Extension(function (insance) {

    /**
     * @type Animate insance
     * @type CanvasRenderingContext2D insance.context
     */

    if (!(insance instanceof Animate))
        return;

    var Graphic = {};

    /**
     *
     * @param points
     * @param color
     * @param fill
     * @param closePath
     * @param lineWidth
     */
    Graphic.shape = function (points, color, fill, closePath, lineWidth) {

        var positions = [];
        var i, temp = {};

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

        insance.context.beginPath();

        for (i = 0; i < positions.length; i++) {
            insance.context.lineTo(positions[i].x, positions[i].y);
        }

        if (fill) {
            if (typeof fill === 'string') {
                Graphic.shape(points, color, true);
                Graphic.shape(points, fill, false, closePath, lineWidth);
            } else {
                insance.context.closePath();
                insance.context.fillStyle = color || '#000';
                insance.context.fill();
            }
        }
        else {

            if (lineWidth)
                insance.context.lineWidth = lineWidth;

            if (closePath !== false)
                insance.context.closePath();

            insance.context.strokeStyle = color || '#000';
            insance.context.stroke();
        }

    };

    /**
     *
     * @param x
     * @param y
     * @param width
     * @param height
     * @param color
     * @param fill
     */
    Graphic.rect = function (x, y, width, height, color, fill) {
        insance.context.beginPath();
        insance.context.rect(x || 0, y || 0, width || 100, height || 100);

        if (fill) {
            insance.context.fillStyle = color || '#000';
            insance.context.fill();
            if (typeof fill === 'string') {
                insance.context.strokeStyle = fill || '#000';
                insance.context.strike();
            }
        }
        else {
            insance.context.strokeStyle = color || '#000';
            insance.context.stroke();
        }
        insance.context.closePath();
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
    Graphic.rectRound = function (x, y, width, height, radius, color, fill) {
        insance.context.rectRound(x, y, width, height, radius);
        if (fill) {
            insance.context.fillStyle = color || '#000';
            insance.context.fill();
            if (typeof fill === 'string') {
                insance.context.strokeStyle = fill || '#000';
                insance.context.strike();
            }
        }
        else {
            insance.context.strokeStyle = color || '#000';
            insance.context.stroke();
        }
        insance.context.closePath();
    };

    /**
     *
     * @param x
     * @param y
     * @param radius
     * @param color
     * @param fill
     */
    Graphic.circle = function (x, y, radius, color, fill) {
        Graphic.rectRound(x - (radius / 2), y - (radius / 2), radius, radius, radius / 2, color, fill);
    };

    // line.line(10, 10, 100, 2, 'blue');

    /**
     *
     * @param point1
     * @param point2
     * @param lineWidth
     * @param color
     */
    Graphic.line = Graphic.linePoints = function (point1, point2, lineWidth, color) {
        insance.context.beginPath();
        insance.context.lineWidth = lineWidth || 1;
        insance.context.strokeStyle = color;
        insance.context.moveTo(point1.x, point1.y);
        insance.context.lineTo(point2.x, point2.y);
        insance.context.stroke();

        insance.context.beginPath();
        insance.context.closePath();
    };

    /**
     *
     * @param x
     * @param y
     * @param width
     * @param lineWidth thickness
     * @param color
     */
    Graphic.lineWidth = function (x, y, width, lineWidth, color) {
        if (width < 0) {
            x -= Math.abs(width);
            width = Math.abs(width);
        }
        Graphic.linePoints(insance.point(x, y), insance.point(x + width, y), lineWidth, color);
    };

    Graphic.lineHeight = function (x, y, height, lineWidth, color) {
        if (height < 0) {
            y -= Math.abs(height);
            height = Math.abs(height);
        }
        Graphic.linePoints(insance.point(x, y), insance.point(x, y + height), lineWidth, color);
    };

    insance.Graphic = Graphic;

})