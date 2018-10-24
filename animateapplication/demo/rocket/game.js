
class Game {

  constructor (animate, exts) {
    this.animate = animate;
    this.extension = {};

    exts.map((ext) => {
      if (typeOf(ext.init, 'function')) {
        ext.gameInstance = this;
        ext.animateInstance = animate;
        ext.init();
      }
      this.extension[ext.name] = ext;
    });
  }

  getExtension (name) {
    return this.extension[name]
  }

  ext (name) { return this.getExtension (name) }

  gotoScene (name) {
    this.animate.start(Game.SCENE.CURRENT = name);
  }

}

Game.SCENE = {
  CURRENT: '',
  MAIN: 'main',
  END: 'end',
  MENU: 'menu',
  GAME: 'game',
};
