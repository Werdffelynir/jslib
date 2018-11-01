
class Animate___ {

  constructor (Animate) {
    if ( !(Animate instanceof AnimateApplication) ) {
      throw new Error(':constructor argument in not of instance AnimateApplication');
    }

    /**@type {HTMLCanvasElement}*/
    this.canvas = Animate.getCanvas();

    /**@type {Document|Global}*/
    this.global = Animate.getGlobal();

    /**@type {AnimateApplication}*/
    this.Animate = Animate;

    /**@type {CanvasRenderingContext2D}*/
    this.context = Animate._context;
  }

}
