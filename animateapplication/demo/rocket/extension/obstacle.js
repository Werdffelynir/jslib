
class Obstacle extends Extension {

  constructor () {
    super();
  }

  init () {}

  draw () {
    /** @type Graphic {AnimateGraphic} **/
    this.animate.movieclip();

    Graphic
      .color('blue').rect(0, 0, 100, 50).fill();

    // Graphic
    //   .color().rect().fill()
    //   .color().rect().fill()
    //   .color().rect().fill();
  }

}
