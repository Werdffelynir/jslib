
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
    Graphic.circle(Point(Animate.width / 2, Animate.height / 2), 120)
      .color('#c379e5')
      .fill();
  }

}
