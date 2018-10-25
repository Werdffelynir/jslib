
class Game {

  constructor (animate, exts) {
    this._animate = animate;
    this._extension = {};

    exts.map((ext) => {
      ext._game = this;
      ext._animate = this._animate;
      if (typeOf(ext.init, 'function')) {
        ext.init();
      }
      this._extension[ext.name] = ext;
    });
  }

  getExtension (name) {
    return this._extension[name]
  }

  ext (name) {
    return this.getExtension (name)
  }

  gotoScene (name) {
    this._animate.start(Game.SCENE.CURRENT = name)
  }

}

Game.SCENE = {
  CURRENT: '',
  MAIN: 'main',
  END: 'end',
  MENU: 'menu',
  GAME: 'game',
};
