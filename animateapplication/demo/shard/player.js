
class Player extends Extension {

  constructor (animate) {
    super(animate);
  }

  animate () {
    return this.animateInstance;
  }

  init (game) {
    this.gameInstance = game;
  }

  draw () {
    Graphic.rect(Point(100, 100), 20, 20).fill();
  }

}
