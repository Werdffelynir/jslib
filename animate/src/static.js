/**
 * Module of Static Methods
 */
var Animate = window.Animate || {}; // THIS-LINE-WILL-DELETED

/**
 * Animation types
 * @type {string}
 */
Animate.LOOP_TIMER = 'timer';
Animate.LOOP_ANIMATE = 'animation';

/**
 * Storage of extensions
 * @type {Array}
 */
Animate._internal_extensions = [];

/**
 * Create special object to indicate a point
 * @param x
 * @param y
 * @returns {{x: *, y: *}}
 */
Animate.Point = function (x, y) {
    var point = [x, y];
    point.x = x;
    point.y = y;
    return point;
};

/**
 * Create special object to indicate a rectangle
 * @param x
 * @param y
 * @param width
 * @param height
 * @returns {[*,*,*,*]}
 */
Animate.Rectangle = function (x, y, width, height) {
    var rect = [x, y, width, height];
    rect.x = x;
    rect.y = y;
    rect.width = width;
    rect.height = height;
    return rect;
};

/**
 * @param options       Object with properties
 * @param callback      Inside callback
 * @param thisInstance  Default or True copy all properties to `this` context
 * @returns {(function(this:T))|*}
 * @constructor
 */
Animate.Clip = function (options, callback, thisInstance) {
    var key;
    if (thisInstance === undefined || thisInstance === true) {
        thisInstance = options;
    } else if (typeof thisInstance === 'object') {} else {
        thisInstance = {};
    }

    callback = callback.bind(thisInstance);

    for (key in options) {
        callback[key] = options[key];
    }

    return callback;
};

/**
 * Add extensions in loader
 * @param func
 * @constructor
 */
Animate.Extension = function (func) {
    Animate._internal_extensions.push(func);
};

/**
 * Marge object with defaultObject
 * @param defaultObject
 * @param object
 * @returns {*}
 */
Animate.defaultObject = function (defaultObject, object) {
    for (var key in object) {
        defaultObject[key] = object[key];
    }
    return defaultObject;
};

/**
 * Clone an Array or Objects
 * @param src
 * @param addProperties
 */
Animate.copy = function (src, addProperties) {
    var copy_object = JSON.parse(JSON.stringify(src));
    if (NamespaceApplication.typeOf(addProperties, 'object') || NamespaceApplication.typeOf(addProperties, 'array'))
        for (var i in addProperties)
            copy_object[i] = addProperties[i];
    return copy_object;
};

/**
 * Generate a random number
 * @param min
 * @param max
 * @returns {number}
 */
Animate.random = function (min, max) {
    min = min || 0;
    max = max || 100;
    return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * Generate a random hex color
 * @returns {string}
 */
Animate.randomColor = function () {
    var letters = '0123456789ABCDEF'.split(''),
        color = '#';
    for (var i = 0; i < 6; i++)
        color += letters[Math.floor(Math.random() * 16)];
    return color;
};

/**
 * Return random item from array
 * @param arr
 * @returns {*}
 */
Animate.randomItem = function (arr) {
    var i = Animate.random(0, arr.length-1);
    return arr[i];
};

/**
 * Convert degrees to radians
 * Formula: degrees * Math.PI / 180
 * @param deg
 * @returns {number}
 */
Animate.degreesToRadians = function (deg) {
    return (deg * Math.PI) / 180;
};

/**
 * Convert radians to degrees
 * Formula: radians * 180 / Math.PI
 * @param rad
 * @returns {number}
 */
Animate.radiansToDegrees = function (rad) {
    return (rad * 180) / Math.PI;
};

/**
 * Calculate distance between two Points
 * @param p1
 * @param p2
 * @returns {number}
 */
Animate.distanceBetween = function (p1, p2) {
    var dx = p2.x - p1.x;
    var dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
};

/**
 * Calculate angle between two points. return object:
 *  {angle:, x:, y:}
 * @param p1
 * @param p2
 * @returns {{angle: number, x: number, y: number}}
 */
Animate.calculateAngle = function (p1, p2) {
    var dx = p2.x - p1.x;
    var dy = p2.y - p1.y;
    var angle = Math.atan2(dy, dx);
    return {
        angle: angle,
        x: Math.cos(angle),
        y: Math.sin(angle)
    };
}