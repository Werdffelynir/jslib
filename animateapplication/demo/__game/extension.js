
class Extension {

  constructor () {
    this.name = this.constructor.name;
    this.gameInstance = null;
  }

  init (game) {
    this.gameInstance = game;
  }

  game () {
    return this.gameInstance;
  }

}
