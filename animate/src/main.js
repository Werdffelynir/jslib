(function (window) {

    "use strict";

    window.requestAnimationFrame = function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function (f) {window.setTimeout(f, 1e3 / 60);}
    }();

    var Animate = [[['constructor']]];

    Animate.prototype = [[['prototype']]];

    Animate.prototype.constructor = Animate;

    [[['static']]];

    [[['utility']]];

    [[['extension.text']]];

    [[['extension.graphic']]];

    [[['extension.image']]];

    /** Set script version. Property [read-only]*/
    Object.defineProperty(Animate, 'version', {
        enumerable: false, configurable: false, writable: false, value: '0.3.0'
    });

    window.Animate = Animate;

})(window);
