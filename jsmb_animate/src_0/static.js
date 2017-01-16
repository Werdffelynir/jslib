/** Static Methods * */
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
Animate.internalExtensions = [];

/**
 * Add extensions in loader
 * @param func
 * @constructor
 */
Animate.Extension = function (func) {
    Animate.internalExtensions.push(func);
};
