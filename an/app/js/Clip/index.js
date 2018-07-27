/**
 * @param options       Object with properties
 * @param callback      Inside callback
 * @param thisInstance  Default or True copy all properties to `this` context
 * @returns {(function(this:T))|*}
 * @constructor
 */

class Clip {

  constructor  (options, callback, thisInstance) {
    return function () {
      return callback.bind(options).apply(thisInstance || {}, arguments || {})
    };
  }

}