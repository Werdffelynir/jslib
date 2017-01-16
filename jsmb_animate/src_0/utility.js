/** Static Methods * */
var Animate = window.Animate || {}; // THIS-LINE-WILL-DELETED

Animate.Util = {};

Animate.Util.defaultObject = function (defaultObject, object) {
    for (var key in object) {
        defaultObject[key] = object[key];
    }
    return defaultObject;
};

Animate.Util.random = function (min, max) {
    min = min || 0;
    max = max || 100;
    return Math.floor(Math.random() * (max - min + 1) + min);
};

Animate.Util.randomColor = function () {
    var letters = '0123456789ABCDEF'.split(''),
        color = '#';
    for (var i = 0; i < 6; i++)
        color += letters[Math.floor(Math.random() * 16)];
    return color;
};

Animate.Util.degreesToRadians = function (deg) {
    return (deg * Math.PI) / 180;
};

Animate.Util.radiansToDegrees = function (rad) {
    return (rad * 180) / Math.PI;
};

Animate.Util.distanceBetween = function (p1, p2) {
    var dx = p2.x - p1.x;
    var dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
};


