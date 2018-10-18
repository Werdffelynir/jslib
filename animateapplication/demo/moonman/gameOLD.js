
const Animate = new AnimateApplication('canvas.canvas', 800, 400, 30);
const Text = new AnimateText(Animate);
const Event = new AnimateEvent(Animate);
const Graphic = new AnimateGraphic(Animate);
const Loader = new AnimateLoader(Animate);
const Grid = new AnimateGrid(Animate);
const {
  Point,
  Rectangle
} = AnimateApplication;


Animate.getCanvas().style.backgroundColor = '#210625';

Text.format({
  size: 12,
  family: 'Ubuntu',
});

const Canvas = {};

Canvas.hero = Point(0, 0);

Canvas.speed = 1;

Canvas.cursor = Point(0, 0);

Canvas.keys = {top: false, down: false, left: false, right: false, space: false};

Canvas.keysBinder = (function (types) {
  Animate.getGlobal().addEventListener('keydown', function (e) {
    switch (e.keyCode) {
      case types.top:
        Canvas.keys.top = true;
        break;
      case types.down:
        Canvas.keys.down = true;
        break;
      case types.left:
        Canvas.keys.left = true;
        break;
      case types.right:
        Canvas.keys.right = true;
        break;
      case types.space:
        Canvas.keys.space = true;
        break;
      default:
    }
  });
  Animate.getGlobal().addEventListener('keyup', function (e) {
    switch (e.keyCode) {
      case types.top:
        Canvas.keys.top = false;
        break;
      case types.down:
        Canvas.keys.down = false;
        break;
      case types.left:
        Canvas.keys.left = false;
        break;
      case types.right:
        Canvas.keys.right = false;
        break;
      case types.space:
        Canvas.keys.space = false;
        break;
      default:
    }
  });
})({top: 87, down: 83, left: 65, right: 68, space: 32});

Animate.scene('main', {}, function (ctx, iter) {

  if (Canvas.keys.top) Canvas.hero.y -= Canvas.speed;
  if (Canvas.keys.down) Canvas.hero.y += Canvas.speed;
  if (Canvas.keys.left) Canvas.hero.x -= Canvas.speed;
  if (Canvas.keys.right) Canvas.hero.x += Canvas.speed;

  // Map
  // Graphic.color('#4a2872');
  Graphic.shadow(0, 0, 10, '#5d328f');
  Graphic.shape(
    [85, 80, 85, 115, 140, 115, 140, 165, 305, 165, 305, 110, 425, 110, 425, 215, 335, 215, 335, 330, 160, 330, 160, 275, 200, 275, 200, 225, 75, 225, 75, 275, 120, 275, 120, 380, 455, 380, 455, 285, 575, 285, 575, 70, 400, 70, 400, 25, 245, 25, 245, 85, 175, 85, 175, 15, 20, 15, 20, 80, 50, 80],
    true
  )
    .thickness(5)
    .color('#6e3caa').stroke()
    .color('#4a2872').fill();

  // hit
  if (!Animate.hitTestPoint(Canvas.hero)) {
    Canvas.hero = Point(50, 50);
  }

  // Player
  Graphic.shadow(0, 0, 10, '#6e3caa');
  Graphic.circle(Canvas.hero, 10)
    .thickness(1)
    .color('#9550e5').stroke()
    .color('#6e3caa').fill();


  // ...
  // Graphic.circle(Point(100, 120), 10)
  //   .color('#d31800').fill();

}).start('main');