
class SceneMenu extends Extension {

  constructor () {
    super();
  }

  init() {
    this.animate.scene(Game.SCENE.MENU, {}, (ctx, iter) => {
      Text.format({
        x: 10,
        y: 10,
        text: '1. MAIN MENU; 2. GAME; 3. END;',
        size: 12,
        color : '#000000',
      }) .print();
    });
  }

}
