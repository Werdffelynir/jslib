(function () {

  var Demo = function (config) {
    if (!(this instanceof Demo)) return new Demo(config);

    var _constructor = (function () {

  console.log('this', this);



});

    this.config = config;

    _constructor.call(this);

  };

  
Demo.prototype.one = function () {};

Demo.prototype.two = function () {};


  
Demo.a = function () {

};

Demo.b = function () {

};

Demo.c = function () {

};




  window.Demo = Demo;

})();

var demo = new Demo({
  name: 'Hello world'
});