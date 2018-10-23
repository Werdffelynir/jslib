
class Extension {

  constructor (animate) {
    this.name = this.constructor.name;
    this.gameInstance = null;
    this.animateInstance = animate;
  }

  init (game) {
    this.gameInstance = game;
  }

  animate () {
    return this.animateInstance;
  }

  game () {
    return this.gameInstance;
  }

}
