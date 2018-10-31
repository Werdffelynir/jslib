
const Animate = new AnimateApplication('canvas.canvas', 800, 400, 30);
const Text = new AnimateText(Animate);
const Event = new AnimateEvent(Animate);
const Graphic = new AnimateGraphic(Animate);
const Loader = new AnimateLoader(Animate);
const Grid = new AnimateGrid(Animate);


const game = new Game(Animate, [
  new Key(),
  new Player(),
  // new Shard(Animate),
  new SceneMenu(Animate),
  // new SceneGame(Animate),
  // new SceneEnd(Animate),
]);


game.gotoScene(Game.SCENE.MENU);
