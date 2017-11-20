(function () {

  var PageElements = {
    menu: NSA.queryAll('#menu'),
    page: NSA.query('#page'),
    desc: NSA.query('#description'),
    move: NSA.query('#move'),
    after: NSA.query('#after')
  };

  var An = new Animate({
    selector: '#canvas',
    width: 800,
    height: 400,
    fps: 24,
    urimg: '/animate/demo/assets/'
  });

  var Graphic = An.Graphic();
  var TextField = An.TextField();

  // * * * * * * * * * * * * * * * * * * * * * * * * *

  var Game = {
    mc: {},
    key: {up: false, down: false, left: false, right: false, space: false, z: false, x: false, c: false},
    mouse: false,
    images: {},
    mousePosition: {x: 0, y: 0},
  };


  Game.panel = function (ctx, frame) {
    TextField.text('Frame: ' + frame, 5, 5).fill();
  };


  Game.space = function (ctx, frame) {

    TextField.text('Mouse position:' + Game.mousePosition.x + '/' + Game.mousePosition.y, 5, 40).fill();
    TextField.text(Game.key.space ? 'Space is Pressed!' : 'Press Space', 5, 75).fill();

  };

  An.backgroundColor('#03020f');
  TextField.color('#FFFFFF');
  TextField.font('bold 16px/16px sans');

  An.frame(function (ctx, i) {
    /** @type CanvasRenderingContext2D */
    ctx = ctx;

    Game.space(ctx, i);
    Game.panel(ctx, i);
  });

  An.onFrame = function (ctx, i) {
    Game.mouse = An.mouseMove();
    Game.key.up = An.keyPress('KeyW') || An.keyPress('ArrowUp');
    Game.key.down = An.keyPress('KeyS') || An.keyPress('ArrowDown');
    Game.key.left = An.keyPress('KeyA') || An.keyPress('ArrowLeft');
    Game.key.right = An.keyPress('KeyD') || An.keyPress('ArrowRight');
    Game.key.space = An.keyPress('Space');
    Game.key.z = An.keyPress('KeyZ');
    Game.key.x = An.keyPress('KeyX');
    Game.key.c = An.keyPress('KeyC');
  };

  An.Loader.images({
    rocket: An.urimg + 'rocket.png'
  }, function (images) {
    Game.images = images;

    // start
    An.start();
  });

  // * Оперделения нажатие кнопок мыши
  // * Отключения контекстного меню
  // * * * * * * * * * * * * * * * * * * * * * * * *
  document.addEventListener('mousedown', function (event) {
    var which = [];
    which[1] = 'Left Mouse button pressed.';
    which[2] = 'Middle Mouse button pressed.';
    which[3] = 'Right Mouse button pressed.';

    Game.mousePosition = An.mousePosition(event);

    console.log('Which: ' + (which[event.which] ? which[event.which] : 'You have a strange Mouse!'), event);
    return false;
  });

  document.addEventListener('contextmenu', function (event) {
    console.log('Context menu is disabled');
    event.preventDefault();
  }, false);

})();