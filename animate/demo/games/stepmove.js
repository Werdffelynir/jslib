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
    autoClear: true,
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
  };

  Game.step = 25;
  Game.mcHero = function (ctx, frame) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(Game.mcHero.x, Game.mcHero.y, Game.step, Game.step);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.restore();
  };
  Game.mcHero.x = 400;
  Game.mcHero.y = 200;

  Game.mcHeroControl = function () {
    if (Game.key['w']) Game.mcHero.y -= Game.step;
    if (Game.key['s']) Game.mcHero.y += Game.step;
    if (Game.key['a']) Game.mcHero.x -= Game.step;
    if (Game.key['d']) Game.mcHero.x += Game.step;

    if (Game.mcHero.x >= An.width) Game.mcHero.x = 0;
    if (Game.mcHero.x < 0) Game.mcHero.x = An.width - Game.step;
    if (Game.mcHero.y >= An.height) Game.mcHero.y = 0;
    if (Game.mcHero.y < 0) Game.mcHero.y = An.height - Game.step;
    An.play();
  };

  // --------------------------------------------------
  // Animate settings

  An.backgroundColor('#150f1f');
  TextField.color('#FFFFFF');
  TextField.font('bold 16px/16px sans');

  An.frame(function (ctx, i) {
    /** @type CanvasRenderingContext2D */
    ctx = ctx;

    An.addGrid(Game.step, 0.1, '#625082');

    Game.mcHero(ctx, i);
    Game.panel(ctx, i);
  });


  // --------------------------------------------------
  // Оперделения нажатие кнопок клавиатуры
  //

  An.onKeydown(function (event) {
    Game.key[event.key] = true;
    Game.mcHeroControl();
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