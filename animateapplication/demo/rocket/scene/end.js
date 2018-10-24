
class SceneEnd extends Extension {

  constructor (animate) {
    super();
    this.animate = animate;
    this.status = 'wine';
  }

  init(game) {
    this.gameInstance = game;

    Animate.scene(Game.SCENE.END, {}, (ctx, iter) => {
      Text.print('Game over', 10, 10);
      Text.print('You is ', 10, 30);
    });
  }

}
