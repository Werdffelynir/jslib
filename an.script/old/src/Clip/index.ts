/**
 * @param options       Object with properties
 * @param callback      Inside callback
 * @param thisInstance  Default or True copy all properties to `this` context
 * @returns {(function(this:T))|*}
 * @constructor
 */
export function Clip (options: Object, callback: Function, thisInstance: Object) {
  return function () {
    return callback.bind(options).apply(thisInstance || {}, arguments || {})
  };
}