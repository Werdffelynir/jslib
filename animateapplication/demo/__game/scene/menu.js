
class SceneMenu extends Extension {

  constructor (animate) {
    super();
    this.animate = animate;
  }

  init(game) {
    this.gameInstance = game;

    game.getExtension('Key').onKeydown((e) => {
      if (game.getExtension('Key').isPress('a')) {
        this.animate.start('menu');
      }
      if (game.getExtension('Key').isPress('b')) {
        this.animate.start('game');
      }
    });

    Animate.scene('menu', {}, (ctx, iter) => {
      this.showMenuList();
    });
  }


  showMenuList () {
    Text.print('MAIN MENU (a)', 10, 10);
    Text.print('GAME (b)', 10, 30);
  }
}
