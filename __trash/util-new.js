/**
 * Module util.js
 * Its static common helpers methods
 * @version 0.2.2
 */

(function (window) {

    if (!Array.isArray) {
        Array.isArray = function (arg) {
            return Object.prototype.toString.call(arg) === '[object Array]';
        };
    }

    window.Ut = {};
    //////////////////////////////////////////////////////////////////

    Ut.defined = function (param) {
        return typeof(param) != 'undefined';
    };


    Ut.isArray = function (src) {return Ut.Array.is(src)};
    Ut.isObject = function (src) {return Ut.Object.is(src)};


    Ut.Object = {};
    Ut.Object.is = function (src) {
        return src && typeof src == 'object';
    };
    Ut.Object.extend = function(destination, src) {
        var property;
        for (property in src) {
            if (src[property] && src[property].constructor && src[property].constructor === Object) {
                destination[property] = destination[property] || {};
                Util.extend(destination[property], src[property]);
            } else {
                destination[property] = src[property];
            }
        }
        return destination;
    };




    Ut.Array = {};
    Ut.Array.is = function (src) {
        return Array.isArray(src)
    };




})(window)