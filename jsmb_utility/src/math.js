////////////////////////////////////////////////////////////////////////
// Math Methods
var Ut = window.Ut || {};   // THIS-LINE-WILL-DELETED
Ut.Math = {};

Ut.Math.isNumeric = function (src) {
    return !isNaN(parseFloat(src)) && isFinite(src)
};

Ut.Math.isInteger = function (src) {
    return typeof src === 'number' && !(src % 1)
};

Ut.Math.isIterated = function (src) {
    return src && src.length > 0
};

/**
 * Returns a random integer between min, max, if not specified the default of 0 to 100
 * @param min
 * @param max
 * @returns {number}
 */
Ut.Math.rand = function (min, max) {
    min = min || 0;
    max = max || 100;
    return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * Returns random string color, HEX format
 * @returns {string}
 */
Ut.Math.randColor = function () {
    var letters = '0123456789ABCDEF'.split(''),
        color = '#';
    for (var i = 0; i < 6; i++)
        color += letters[Math.floor(Math.random() * 16)];
    return color;
};

/**
 * Converts degrees to radians
 * @param deg
 * @returns {number}
 */
Ut.Math.degreesToRadians = function (deg) {
    return (deg * Math.PI) / 180;
};

/**
 * Converts radians to degrees
 * @param rad
 * @returns {number}
 */
Ut.Math.radiansToDegrees = function (rad) {
    return (rad * 180) / Math.PI;
};

/**
 * The calculation of the distance between points
 * The point is an object with properties `x` and `y` {x:100,y:100}
 * @param point1
 * @param point2
 * @returns {number}
 */
Ut.Math.distanceBetween = function (point1, point2) {
    var dx = point2.x - point1.x;
    var dy = point2.y - point1.y;
    return Math.sqrt(dx * dx + dy * dy);
};
