var Point = function (x, y) {
    if ( !(this instanceof Point) ) return new Point(x, y);
    this.x = x;
    this.y = y;

};
Point.prototype.getX = function () {return this.x};
Point.prototype.getY = function () {return this.y};


var Circle = function (x, y, radius) {
    if ( !(this instanceof Circle) ) return new Circle(x, y, radius);
    Point.apply(this, arguments);
    this.radius = radius;
};
Circle.prototype = Object.create(Point.prototype);
Circle.prototype.constructor = Circle;
Circle.prototype.getRadius = function () {return this.radius};




var Rectangle = function (x, y, width, height) {
    if ( !(this instanceof Rectangle) ) return new Rectangle(x, y, width, height);
    Point.apply(this, arguments);
    this.width = width;
    this.height = height;
};
Rectangle.prototype = Object.create(Point.prototype);
Rectangle.prototype.constructor = Rectangle;
Rectangle.prototype.getWidth = function () {return this.width};
Rectangle.prototype.getHeight = function () {return this.height};


var Shape = function (points) {
    if ( !(this instanceof Shape) ) return new Shape(points);
    this.points = points;
};
Shape.prototype.getPoints = function () {return this.points};


var Line = function (x1,y1,x2,y2) {
    if ( !(this instanceof Line) ) return new Line(x1,y1,x2,y2);
    this.pointBegin = new Point(x1,y1);
    this.pointComplate = new Point(x2,y2);
};
Line.prototype.getPointBegin = function () {return this.pointBegin};
Line.prototype.getPointComplat = function () {return this.pointComplate};



// ---------------


var pt = new Point(20, 100);
var cr = new Circle(100, 100, 20);
var rt = new Rectangle(200, 100, 200, 30);
var sp = new Shape([10,10, 100,20, 200,10, 300,20, 400,10, 500,20, 600,10]);
var ln = new Line(10,110, 100,120);

console.log(pt);
console.log(cr);
console.log(rt);
console.log(sp);
console.log(ln);
