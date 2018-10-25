
class Extension {

  constructor () {
    this.name = this.constructor.name;
    this._animate = null;
    this._game = null;
  }

  init () {}

  /**
   * @returns {AnimateApplication}
   */
  get animate () {
    return this._animate
  }

  /**
   * @returns {Game}
   */
  get game () {
    return this._game
  }

}
