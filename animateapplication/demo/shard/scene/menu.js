
class SceneMenu extends Extension {

  constructor (animate) {
    super();
    this.animate = animate;
  }

  init(game) {
    this.gameInstance = game;


    Animate.scene('menu', {}, (ctx, iter) => {
      this.showMenuList();

      game.getExtension('Player').draw()
    });
  }


  showMenuList () {
    Text.print('MAIN MENU (a)', 10, 10);
    Text.print('GAME (b)', 10, 30);
  }
}
