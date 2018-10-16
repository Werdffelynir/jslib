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

  /**
   */
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
    TextField.text('Mouse position: ' + Game.mousePosition.x + '/' + Game.mousePosition.y, 5, 40).fill();
  };


  Game.protoDowner = An.MovieClip ({
    x: 400,
    y: 0,
    size: 50,
    speedX: 0,
    speedY: 0,
    gravity: 0.09,
    gravitySpeed: 0,
    hitBottom: function() {
      var bottom = An.height - this.size;
      if (this.y > bottom) {
        this.y = bottom;
      }
    }
  }, function () {

    this.gravitySpeed += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY + this.gravitySpeed;
    this.hitBottom();

    Graphic.rect(this.x, this.y, this.size, this.size)
      .thickness(5)
      .color('#C00')
      .stroke();
  });

  // --------------------------------------------------
  // Animate settings

  An.backgroundColor('#03020f');
  TextField.color('#FFFFFF');
  TextField.font('bold 16px/16px sans');


  An.frame(function (ctx, i) {
    /** @type CanvasRenderingContext2D */
    ctx = ctx;

    Game.protoDowner();
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