
class SceneMenu extends Extension {

  constructor () {
    super();
  }

  init() {
    const {game, animate} = this;
    const keyInstance = game.ext('Key');

    keyInstance.onKeydown((e) => {
      if (keyInstance.isPress('a') ) {
        game.gotoScene(Game.SCENE.MENU);

      }
      if (keyInstance.isPress('b') ) {
        game.gotoScene(Game.SCENE.GAME);
      }
    });

    animate.scene(Game.SCENE.MENU, {}, (ctx, iter) => {

      //this.showMenu();
    });
  }

  showMenu () {
    Text
      .color('#000000')
      .print('MAIN MENU (a)', 10, 10)
      .print('GAME (b)', 10, 30);
  }

}
