
const Animate = new AnimateApplication('canvas.canvas', 1200, 400, 60);
const Text = new AnimateText(Animate);
const Event = new AnimateEvent(Animate);
const Graphic = new AnimateGraphic(Animate);
const Loader = new AnimateLoader(Animate);
const Grid = new AnimateGrid(Animate);


const {
  Point,
  Rectangle
} = AnimateApplication;


const game = new Game(Animate, [
  new Key(),
  new Player(),
  new Obstacle(Animate),
  new SceneMenu(Animate),
  // new SceneGame(Animate),
  // new SceneEnd(Animate),
]);


game.gotoScene(Game.SCENE.MENU);
