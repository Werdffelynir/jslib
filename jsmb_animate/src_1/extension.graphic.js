Animate.Extension(function (insance) {

    if (!(insance instanceof Animate))
        return;


    var
        /**
         * @type Animate.prototype
         */
        that = insance,
        Graphic = {};

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

        that._context.beginPath();

        for (i = 0; i < positions.length; i++) {
            that._context.lineTo(positions[i].x, positions[i].y);
        }

        if (fill) {
            if (typeof fill === 'string') {
                Graphic.shape(points, color, true);
                Graphic.shape(points, fill, false, closePath, lineWidth);
            } else {
                that._context.closePath();
                that._context.fillStyle = color || '#000';
                that._context.fill();
            }
        }
        else {

            if (lineWidth)
                that._context.lineWidth = lineWidth;

            if (closePath !== false)
                that._context.closePath();

            that._context.strokeStyle = color || '#000';
            that._context.stroke();
        }

    };


    Graphic.rect = function (x, y, width, height, color, fill) {
        that._context.beginPath();
        that._context.rect(x || 0, y || 0, width || 100, height || 100);

        if (fill) {
            that._context.fillStyle = color || '#000';
            that._context.fill();
            if (typeof fill === 'string') {
                that._context.strokeStyle = fill || '#000';
                that._context.strike();
            }
        }
        else {
            that._context.strokeStyle = color || '#000';
            that._context.stroke();
        }
        that._context.closePath();
    };


    Graphic.rectRound = function (x, y, width, height, radius, color, fill) {
        that._context.rectRound(x, y, width, height, radius);
        if (fill) {
            that._context.fillStyle = color || '#000';
            that._context.fill();
            if (typeof fill === 'string') {
                that._context.strokeStyle = fill || '#000';
                that._context.strike();
            }
        }
        else {
            that._context.strokeStyle = color || '#000';
            that._context.stroke();
        }
        that._context.closePath();
    };

    Graphic.circle = function (x, y, radius, color, fill) {
        Graphic.rectRound(x - (radius / 2), y - (radius / 2), radius, radius, radius / 2, color, fill);
    };

    Graphic.line = Graphic.linePoints = function (point1, point2, lineWidth, color) {
        that._context.beginPath();
        that._context.lineWidth = lineWidth || 1;
        that._context.strokeStyle = color;
        that._context.moveTo(point1.x, point1.y);
        that._context.lineTo(point2.x, point2.y);
        that._context.stroke();

        that._context.beginPath();
        that._context.closePath();
    };

    Graphic.lineWidth = function (x, y, width, lineWidth, color) {
        if (width < 0) {
            x -= Math.abs(width);
            width = Math.abs(width);
        }
        Graphic.linePoints(that.point(x, y), that.point(x + width, y), lineWidth, color);
    };

    Graphic.lineHeight = function (x, y, height, lineWidth, color) {
        if (height < 0) {
            y -= Math.abs(height);
            height = Math.abs(height);
        }
        Graphic.linePoints(that.point(x, y), that.point(x, y + height), lineWidth, color);
    };

    insance.Graphic = Graphic;

})