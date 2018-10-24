
class Extension {

  constructor () {
    this.name = this.constructor.name;
    this.animateInstance = null;
    this.gameInstance = null;
  }

  init () {}

  /**
   *
   * @returns {Animate}
   */
  get animate () {
    return this.animateInstance;
  }
  /**
   *
   * @returns {Game}
   */
  get game () {
    return this.gameInstance;
  }

}
