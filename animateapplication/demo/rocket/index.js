
const Animate = new AnimateApplication('canvas.canvas', 800, 400, 60);
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
  new Obstacle(),
  new SceneMenu(),
  new SceneGame(),
  new SceneEnd(),
]);


const keys = game.ext('Key');
const player = game.ext('Player');
const obstacle = game.ext('Obstacle');

keys.onKeydown((e) => {
  if (keys.isPress('num1') ) {
    game.gotoScene(Game.SCENE.MENU);
    Animate.backgroundColor('#ffffff');
  }
  if (keys.isPress('num2') ) {
    game.gotoScene(Game.SCENE.GAME);
    Animate.backgroundColor('#e4ff96');
  }
  if (keys.isPress('num3') ) {
    game.gotoScene(Game.SCENE.END);
    Animate.backgroundColor('#d31800');
  }
  if (keys.isPress('num5') ) {
    obstacle.stop = false;
    obstacle.refreshList ();
    game.gotoScene(Game.SCENE.GAME);
    Animate.backgroundColor('#e4ff96');
  }
});

keys.onKeyup((e) => {

});

game.gotoScene(Game.SCENE.MENU);
