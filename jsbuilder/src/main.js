(function () {

  var Demo = function (config) {
    if (!(this instanceof Demo)) return new Demo(config);

    var _constructor = [[['constructor']]];

    this.config = config;

    _constructor.call(this);

  };

  [[['prototype']]]

  [[['static']]]

  window.Demo = Demo;

})();

var demo = new Demo({
  name: 'Hello world'
});