(function (window) {

  var CallbackManager = function () {
    if (!(this instanceof CallbackManager))
      return new CallbackManager();

    this._registered = {};
  };

  CallbackManager.prototype.register = function (name, callback) {
    this._registered[name] = callback
  };

  CallbackManager.prototype.dispatch = function (name) {
    if (this._registered[name]) {
      var i, args = [];
      for (i = 1; i < arguments.length; i ++) args.push(arguments[i]);
      this._registered[name].apply({}, args)
    }
  };

  window.CallbackManager = CallbackManager;

})(window);