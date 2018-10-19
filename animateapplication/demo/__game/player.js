
class Player extends Extension {

  constructor (animate) {
    super();
    this.animateInstance = animate;
  }

  animate () {
    return this.animateInstance;
  }

  init (game) {
    this.gameInstance = game;
  }

}
