/** @type HTMLCanvasElement */
var CANVAS = document.querySelector('canvas');
CANVAS.width = 600;
CANVAS.height = 400;

/** @type CanvasRenderingContext2D */
var CONTEXT = CANVAS.getContext('2d');
var WIDTH = CANVAS.width;
var HEIGHT = CANVAS.height;
var HALFWIDTH = WIDTH / 2;
var HALFHEIGHT = HEIGHT / 2;

//
// var Graphic = function (x, y) {
//     if ( !(this instanceof Point) ) return new Point(x, y);
//     this.x = x;
//     this.y = y;
// };


var Point = function (x, y) {
    if ( !(this instanceof Point) ) return new Point(x, y);
    this.x = x;
    this.y = y;
};


var Circle = function (x, y, radius, color, fill) {
    if ( !(this instanceof Circle) ) return new Circle(x, y, radius, color, fill);
    Point.apply(this, arguments);
    this.context = CONTEXT;
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
    this.context = CONTEXT;
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
    this.context = CONTEXT;
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
    this.context = CONTEXT;
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

    // this.context.translate(this.x, this.y);
    // this.context.rotate(this.rotation);
    // this.context.scale(this.radiusX / this.radiusY, 1);
    // this.context.arc(0, 0, this.radiusY, this.startAngle, this.endAngle, this.anticlockwise);
    // this.context.restore();
    // this.context.stroke();
};



var Shape = function (points, lineWidth, color, fill, closePath) {
    if ( !(this instanceof Shape) ) return new Shape(points);
    this.context = CONTEXT;
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
    //[10,10, 20,100, 10,200, 20,300]
    var i, points = [];
    for (i = 0; i < this.points.length; i += 2)
        points.push({x:this.points[i],y:this.points[i+1]});

    for (i = 0; i < points.length; i ++)
        if (!i) this.context.moveTo(points[i].x, points[i].y);
        else this.context.lineTo(points[i].x, points[i].y);

    if (this.closePath) this.context.closePath();

    console.log(points);
    //var to = new Point();
    // this.context.moveTo(this.point1.x, this.point1.y);
    // this.context.lineTo(this.point2.x, this.point2.y);
    // this.context.stroke();

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
    this.context = CONTEXT;
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


// var Graphic = {
//     Line: Line,
//     line: Line,
// };




// ---------------


//var pt = new Point(20, 100);
var cr = new Circle(100, 50, 20, '#4da3ff', false);
var rt = new Rectangle(10, 150, 150, 30, '#F00', false);
var rr = new RectangleRound(10, 200, 150, 30, 5, '#887fa0');
var sp1 = new Shape([500,120,500,65,520,80,530,20,545,20,555,80,575,65,575,120,555,100,545,110,530,110,520,100], 0, '#bebebe', true);
var sp2 = new Shape([500,120,500,65,520,80,530,20,545,20,555,80,575,65,575,120,555,100,545,110,530,110,520,100], 4, '#202020', false, false);
var ln1 = new Line(10,110, 100,120);
var ln2 = new Line(100,120, 200,110, 4);
var ln3 = new Line(200,110, 300,120, 6, '#333a4d');
var els = new Ellipse(300,300, 25, 55, '#ffc373', true);
var elp = new Circle(300,300, 3, '#202020', true);

//
// console.log(pt);
// console.log(cr);
// console.log(rt);
// console.log(sp);
// console.log(ln);

CONTEXT.lineWidth = 5;

rt.draw();
cr.draw();

CONTEXT.lineWidth = 1;
rr.draw();

ln1.draw();
ln2.draw();
ln3.draw();


els.draw();
elp.draw();

sp1.draw();
sp2.draw();




