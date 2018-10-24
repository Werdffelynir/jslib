
class Extension {

  constructor () {
    this.name = this.constructor.name;
    this.animateInstance = null;
    this.gameInstance = null;
  }

  init () {}

  get animate () {
    return this.animateInstance;
  }

  get game () {
    return this.gameInstance;
  }

}
