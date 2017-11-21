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
    fps: 30,
    urimg: '/animate/demo/assets/'
  });

  var Graphic = An.Graphic();
  var TextField = An.TextField();


  // --------------------------------------------------
  // Game object

  var Game = {
    mc: {},
    key: {},
    mouse: false,
    images: {},
    mousePosition: {x: 0, y: 0},
  };


  Game.panel = function (ctx, frame) {
    TextField.text('Frame: ' + frame, 5, 5).fill();
    TextField.text('Mouse position:' + Game.mousePosition.x + '/' + Game.mousePosition.y, 5, 40).fill();
    TextField.text(Game.mouseButtonClick, 5, 75).fill();

    var k, keysString = '';
    for (k in Game.key)
      if (Game.key[k]) keysString += k + ': ' + Game.key[k] + ', ';
    TextField.text(keysString, 5, 100).fill();
  };


  Game.rocket = An.MovieClip ({
    translate: [An.width/2, An.height/2],
    rotation: 0,
    speed: 3
  }, function (ctx, frame) {
    if (Game.key['a']) this.rotation --;
    if (Game.key['d']) this.rotation ++;
    if (Game.key['w']) this.translate[1] --;
    if (Game.key['s']) this.translate[1] ++;

    ctx.drawImage(Game.images.rocket, -(Game.images.rocket.width/2), -(Game.images.rocket.height/2));
  });

  Game.space = function (ctx, frame) {
    Game.rocket(ctx, frame);
  };


  // --------------------------------------------------
  // Animate settings

  An.backgroundColor('#03020f');
  TextField.color('#FFFFFF');
  TextField.font('bold 16px/16px sans');


  An.frame(function (ctx, i) {
    /** @type CanvasRenderingContext2D */
    ctx = ctx;

    Game.space(ctx, i);
    Game.panel(ctx, i);
  });


  // --------------------------------------------------
  // Оперделения нажатие кнопок клавиатуры
  //

  An.onKeydown(function (event) {
    Game.key[event.key] = true;
  });

  An.onKeyup(function (event) {
    delete Game.key[event.key];
  });

  An.onMousemove(function (event) {
    Game.mousePosition = An.mousePosition(event);
  });

  An.onMousedown(function (event) {
    var which = [];
    which[1] = 'Left Mouse button pressed.';
    which[2] = 'Middle Mouse button pressed.';
    which[3] = 'Right Mouse button pressed.';
    Game.mouseButtonClick = 'Which: ' + (which[event.which] ? which[event.which] : 'You have a strange Mouse!');
  });

  An.Loader.images({
    rocket: An.urimg + 'rocket.png'
  }, function (images) {
    Game.images = images;

    // start
    An.start();
  });

  // --------------------------------------------------
  // Отключения контекстного меню
  //
  An.getCanvas().addEventListener('contextmenu', function (event) {
    console.log('Context menu is disabled');
    event.preventDefault();
  }, false);

})();