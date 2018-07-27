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
    center: {x: An.width/2, y: An.height/2},
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

  Game.mcHero = function (ctx, frame) {
    ctx.save();
    ctx.translate(Game.center.x, Game.center.y);
    ctx.beginPath();
    ctx.arc(-5, -5, 10, 0, Animate.DEGREE_360);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.restore();
  };

  Game.mcBackgroundElements = (function () {
    var i,
      w = 2000,
      h = 2000,
      elems = [];
    for (i = 0; i < 100; i ++) {
      elems.push({
        x: An.random(0, w),
        y: An.random(0, h),
        w: An.random(20, 80),
        h: An.random(20, 80)
      });
    }
    return elems
  })();

  Game.mcBackground = function (ctx, frame) {
    ctx.save();
    ctx.translate(Game.mcBackground.x, Game.mcBackground.y);
    Game.mcBackgroundElements.map(function (t) {
      ctx.beginPath();
      ctx.rect(t.x, t.y, t.w, t.h);
      ctx.fillStyle = '#322540';
      ctx.fill();
    });
    ctx.restore();
  };

  Game.mcBackground.speed = 2;
  Game.mcBackground.x = -1000;
  Game.mcBackground.y = -1000;

  Game.mcBackgroundControl = function () {
    var speed = Game.mcBackground.speed;

    if (Game.key['w']) Game.mcBackground.y += speed;
    if (Game.key['s']) Game.mcBackground.y -= speed;

    if (Game.key['a']) Game.mcBackground.x += speed;
    if (Game.key['d']) Game.mcBackground.x -= speed;
  };


  // --------------------------------------------------
  // Animate settings

  An.backgroundColor('#03020f');
  TextField.color('#FFFFFF');
  TextField.font('bold 16px/16px sans');


  An.frame(function (ctx, i) {
    /** @type CanvasRenderingContext2D */
    ctx = ctx;

    Game.mcHero(ctx, i);
    Game.mcBackgroundControl();
    Game.mcBackground(ctx, i);
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