
class SceneEnd extends Extension {

  constructor () {
    super();
    this.status = 'wine';
  }

  init() {

    Animate.scene(Game.SCENE.END, {}, (ctx, iter) => {
      Text.print('Game over', Animate.getWidth() / 2, Animate.getHeight() / 2);
      Text.print('You is ', Animate.getWidth() / 2, Animate.getHeight() / 2 + 30);
    });

  }

}
