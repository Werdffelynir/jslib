(function () {

  // --------------------------------------------------
  // Page Elements
  var PageElements = {
    menu: NSA.queryAll('#menu'),
    page: NSA.query('#page'),
    desc: NSA.query('#description'),
    move: NSA.query('#move'),
    after: NSA.query('#after')
  };

  // --------------------------------------------------
  // Animate init, and instance objects
  var An = new Animate({
    selector: '#canvas',
    width: 800,
    height: 400,
    fps: 0,
    urimg: '/animate/demo/assets/'
  });

  var Graphic = An.Graphic();
  var TextField = An.TextField();


  // --------------------------------------------------
  // Game object

  var Game = {
    mc: {},
  };

/*
region
part
transition
path
location
entrance
room
road
width
height
*/



  var RoomsGenerator = function (config) {
    if (!(this instanceof RoomsGenerator)) {
      return new RoomsGenerator(config)}

    //
    this.rooms = [];
    this.config = config;



  };

  RoomsGenerator.prototype.config = {
    canvas: {width: null, height: null},
    part: {width: null, height: null},
    start: {x: 0, y: 0}
  };
  RoomsGenerator.prototype.rooms = [];
  RoomsGenerator.prototype.generateRoom = function () {

  };
  RoomsGenerator.prototype.generatePath = function () {

  };


  /*{

    config: {
      canvas: {width: 800, height: 400},
      part: {width: 10, height: 10},
    },

    roomOption: {
      width: 0,
      height: 0
    },

    createRoom: function () {
      opts = {
        width: 10,
        height: 10,
      };
      return opts;
    },

    createPath: function () {
    }

  };*/



  var room1 = new RoomsGenerator({
    canvas: {width: 800, height: 400},
    part: {width: 10, height: 10},
  });

  console.log(room1);


  An.frame(function (ctx, i) {

    //Graphic.rect(100, 100, 50, 120)
    //  .fill();

  });

  An.start();
})();