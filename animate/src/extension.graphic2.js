Animate.Extension(function (instance) {

    if (!(instance instanceof Animate))
        return;

    /**
     * @namespace Animate.prototype.Graphic
     * @type Animate.prototype.Graphic
     */
    instance.Graphic = {};

    // Components

    var Point = function (x, y) {
        if ( !(this instanceof Point) ) return new Point(x, y);
        this.x = x;
        this.y = y;
    };


    var Circle = function (x, y, radius, color, fill) {
        if ( !(this instanceof Circle) ) return new Circle(x, y, radius, color, fill);
        Point.apply(this, arguments);
        this.context = instance._context;
        this.radius = radius;
        this.color = color;
        this.fill = (fill === undefined) ? true : !!fill;
    };
    Circle.prototype = Object.create(Point.prototype);
    Circle.prototype.constructor = Circle;
    Circle.prototype.setColor = function (color) {this.color = color;};
    Circle.prototype.draw = function () {
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        if (this.fill) {
            if (this.color) this.context.fillStyle = this.color;
            this.context.fill();
        } else {
            if (this.color) this.context.strokeStyle = this.color;
            this.context.stroke();
        }
    };


    var Rectangle = function (x, y, width, height, color, fill) {
        if ( !(this instanceof Rectangle) ) return new Rectangle(x, y, width, height, color, fill);
        Point.apply(this, arguments);
        this.context = instance._context;
        this.width = width;
        this.height = height;
        this.color = color;
        this.fill = (fill === undefined) ? true : !!fill;
    };
    Rectangle.prototype = Object.create(Point.prototype);
    Rectangle.prototype.constructor = Rectangle;
    Rectangle.prototype.setColor = function (color) {this.color = color;};
    Rectangle.prototype.draw = function () {
        this.context.beginPath();
        this.context.rect(this.x, this.y, this.width, this.height);
        if (this.fill) {
            if (this.color) this.context.fillStyle = this.color;
            this.context.fill();
        } else {
            if (this.color) this.context.strokeStyle = this.color;
            this.context.stroke();
        }
    };


    var RectangleRound = function (x, y, width, height, round, color, fill) {
        Rectangle.call(this, x, y, width, height, color, fill);
        this.context = instance_context;
        this.radius = round;
    };
    RectangleRound.prototype = Object.create(Rectangle.prototype);
    RectangleRound.prototype.constructor = RectangleRound;
    RectangleRound.prototype.draw = function () {
        this.context.beginPath();
        this.context.moveTo(this.x + this.radius, this.y);
        this.context.arcTo(this.x + this.width, this.y, this.x + this.width, this.y + this.height, this.radius);
        this.context.arcTo(this.x + this.width, this.y + this.height, this.x, this.y + this.height, this.radius);
        this.context.arcTo(this.x, this.y + this.height, this.x, this.y, this.radius);
        this.context.arcTo(this.x, this.y, this.x + this.width, this.y, this.radius);
        if (this.fill) {
            if (this.color) this.context.fillStyle = this.color;
            this.context.fill();
        } else {
            if (this.color) this.context.strokeStyle = this.color;
            this.context.stroke();
        }
    };


    var Ellipse = function (x, y, radiusX, radiusY, color, fill) {
        if ( !(this instanceof Ellipse) ) return new Ellipse(x, y, radiusX, radiusY, color, fill);
        Point.apply(this, arguments);
        this.context = instance_context;
        this.radiusX = radiusX;
        this.radiusY = radiusY;
        this.color = color;
        this.fill = (fill === undefined) ? true : !!fill;
    };
    Ellipse.prototype = Object.create(Point.prototype);
    Ellipse.prototype.constructor = Circle;
    Ellipse.prototype.draw = function () {
        this.context.save();
        this.context.beginPath();
        this.context.translate(this.x, this.y);
        this.context.scale(this.radiusX / this.radiusY, 1);
        this.context.arc(0, 0, this.radiusY, 0, Math.PI * 2, true);
        if (this.fill) {
            if (this.color) this.context.fillStyle = this.color;
            this.context.fill();
        } else {
            if (this.color) this.context.strokeStyle = this.color;
            this.context.stroke();
        }
        this.context.restore();
    };


    var Shape = function (points, lineWidth, color, fill, closePath) {
        if ( !(this instanceof Shape) ) return new Shape(points);
        this.context = instance_context;
        this.points = points;
        this.lineWidth = lineWidth;
        this.color = color;
        this.fill = !!fill;
        this.closePath = (closePath === undefined) ? true : !!closePath;
    };
    Shape.prototype = Object.create(null);
    Shape.prototype.constructor = Shape;
    Shape.prototype.setColor = function (color) {this.color = color;};
    Shape.prototype.draw = function () {
        this.context.beginPath();
        if (this.lineWidth) this.context.lineWidth = this.lineWidth;
        if (this.color) this.context.strokeStyle = this.color;

        var i, points = [];
        for (i = 0; i < this.points.length; i += 2)
            points.push({x:this.points[i],y:this.points[i+1]});

        for (i = 0; i < points.length; i ++)
            if (!i) this.context.moveTo(points[i].x, points[i].y);
            else this.context.lineTo(points[i].x, points[i].y);

        if (this.closePath) this.context.closePath();

        if (this.fill) {
            if (this.color) this.context.fillStyle = this.color;
            this.context.fill();
        } else {
            if (this.color) this.context.strokeStyle = this.color;
            this.context.stroke();
        }
    };

    var Line = function (x1,y1,x2,y2,lineWidth,color, fill) {
        if ( !(this instanceof Line) ) return new Line(x1,y1,x2,y2,lineWidth,color);
        this.context = instance_context;
        this.point1 = new Point(x1,y1);
        this.point2 = new Point(x2,y2);
        this.lineWidth = lineWidth;
        this.color = color;
        this.fill = !!fill;
    };
    Line.prototype = Object.create(null);
    Line.prototype.constructor = Line;
    Line.prototype.setColor = function (color) {this.color = color;};
    Line.prototype.draw = function () {
        this.context.beginPath();
        if (this.lineWidth) this.context.lineWidth = this.lineWidth;
        this.context.moveTo(this.point1.x, this.point1.y);
        this.context.lineTo(this.point2.x, this.point2.y);
        if (this.fill) {
            if (this.color) this.context.fillStyle = this.color;
            this.context.fill();
        } else {
            if (this.color) this.context.strokeStyle = this.color;
            this.context.stroke();
        }
    };

    instance.Graphic.Line = Line;
    instance.Graphic.Shape = Shape;
    instance.Graphic.Point = Point;
    instance.Graphic.Circle = Circle;
    instance.Graphic.Ellipse = Ellipse;
    instance.Graphic.Rectangle = Rectangle;
    instance.Graphic.RectangleRound = RectangleRound;
    instance.Graphic.shadow = function (x, y, blur, color) {
        instance._context.shadowOffsetX = x;
        instance._context.shadowOffsetY = y;
        instance._context.shadowBlur = blur;
        instance._context.shadowColor = color;
    };
    instance.Graphic.clearShadow = function () {
        instance._context.shadowOffsetX = context.shadowOffsetY = context.shadowBlur = 0;
    };

})