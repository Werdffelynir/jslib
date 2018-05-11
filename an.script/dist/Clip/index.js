"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @param options       Object with properties
 * @param callback      Inside callback
 * @param thisInstance  Default or True copy all properties to `this` context
 * @returns {(function(this:T))|*}
 * @constructor
 */
function Clip(options, callback, thisInstance) {
    return function () {
        return callback.bind(options).apply(thisInstance || {}, arguments || {});
    };
}
exports.Clip = Clip;
//# sourceMappingURL=index.js.map