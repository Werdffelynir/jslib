
class Shard extends Extension {

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
    Graphic.circle(Point(Animate.width / 2, Animate.height / 2), 140)
      .color('#9550e5')
      .fill();
  }

}
