(function (window) {

    "use strict";

    window.requestAnimationFrame = function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function (f) {window.setTimeout(f, 1e3 / 60);}
    }();

    var Animate = [[['constructor']]];
    Animate.prototype = [[['prototype']]];
    Animate.prototype.constructor = Animate;

    [[['prototype.super']]];
    [[['prototype.events']]];
    [[['static']]];
    [[['expansion']]];
    [[['extension.text']]];
    [[['extension.graphic']]];
    [[['extension.graphic2']]];
    [[['extension.resource']]];
    [[['extension.keypress']]];
    [[['extension.mousepress']]];

    /** Set script version. Property [read-only]*/
    Object.defineProperty(Animate, 'version', {
        enumerable: false, configurable: false, writable: false, value: '0.5.1'
    });

    window.Animate = Animate;

})(window);