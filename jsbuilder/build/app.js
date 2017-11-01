(function () {

  var Demo = function () {

  };

  
Demo.prototype.one = function () {

};


Demo.prototype.two = function () {

};


Demo.prototype.zzz = function () {

};


  
Demo.typeOf = function () {

};


Demo.defined = function (value, defaults) {
  var is = value === undefined;
  return (defaults === undefined) ? is : (is?is:defaults)
};


Demo.c = function () {

};



  window.Demo = Demo;

})();


