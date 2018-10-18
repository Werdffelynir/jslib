
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


// Animate.getCanvas().style.backgroundColor = '#210625';

Text.format({
  size: 12,
  family: 'Ubuntu',
});

const Canvas = {};
const Mainmanu = function (animate) {
  return {
    showButtons: () => {}
  }
};

const sceneMainmanu = Mainmanu(Animate);

Animate.scene('mainmanu', {}, function (ctx, iter) {
  Text.print('mainmanu', 10, 10);
});

Animate.scene('intro', {}, function (ctx, iter) {
  Text.print('intro', 10, 10);
});

Animate.scene('game', {}, function (ctx, iter) {
  Text.print('game', 10, 10);
});

Animate.scene('settings', {}, function (ctx, iter) {
  Text.print('settings', 10, 10);
});









Animate.start('mainmanu');