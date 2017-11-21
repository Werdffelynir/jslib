
var ooo = function () {

  var __ = {
    mc: {},
    key: {},
    mouse: false,
    images: {},
    mousePosition: {x: 0, y: 0},
    act: {loading: 'loading', mainmenu: 'mainmenu', level: 'level'},
    actCurrent: 'loading'
  };

  var An, TextField, Graphic;

  __.init = function (an) {
    An = an;
    Graphic = An.Graphic();
    TextField = An.TextField();
  };



}();

console.log('ooo:\n', ooo);


Animate.Module('Game', {});