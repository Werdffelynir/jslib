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
    uri: '/animate/demo/games/onpanet/',
  });

  var Graphic = An.Graphic();
  var TextField = An.TextField();


  // --------------------------------------------------
  // Game object
  var Game = {};

  // --------------------------------------------------
  // Animate settings

  An.backgroundColor('#03020f');
  TextField.color('#FFFFFF');
  TextField.font('bold 16px/16px sans');

  An.frame('loading', function (ctx, i) {
    /** @type CanvasRenderingContext2D */
    ctx = ctx;
    ctx.save();
    ctx.translate(10, 10);
    TextField.text('Loading...', 0, 0).color('#c00000').fill();
    ctx.restore();
  });

  An.frame('mainmenu', function (ctx, i) {
    /** @type CanvasRenderingContext2D */
    ctx = ctx;
    ctx.save();
    ctx.translate(10, 10);
    TextField.text('MainMenu', 0, 0).color('#c00000').fill();

    Graphic.color('#c00000');

    Graphic.rect(0, 50, 200, 40).fill();
    TextField.text('New Game', 10, 60).color('#000').fill();

    Graphic.rect(0, 100, 200, 40).fill();
    TextField.text('Load Game', 10, 110).color('#000').fill();

    Graphic.rect(0, 150, 200, 40).fill();
    TextField.text('Rates', 10, 160).color('#000').fill();

    ctx.restore();
    An.stop();
  });

  An.frame('level', function (ctx, i) {
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

  // Loading resources
  An.Loader.javascript([
    An.uri + 'game.js',
    An.uri + 'enemy.js',
    An.uri + 'hero.js',
    An.uri + 'space.js',
    An.uri + 'weapon.js'
  ], function (list) {
    An.Loader.images({
      rocket: An.uri + 'assets/rocket.png',
      rocket: An.uri + 'assets/rocket.png'
    }, function (images) {


      Game = Animate.Module('Game');

      console.log(Game);
      // Game.init(An);
      // Game.images = images;



      setTimeout(function () {
        An.start(Game.act.mainmenu)
      }, 1000);
    });
  });




  // Animate start
  An.start(Game.act.loading);

  // --------------------------------------------------
  // Отключения контекстного меню
  //
  An.getCanvas().addEventListener('contextmenu', function (event) {
    console.log('Context menu is disabled');
    event.preventDefault();
  }, false);

})();