
class AnimateEffect {

  constructor(Animate) {
    if (!(Animate instanceof AnimateApplication)) {
      throw new Error(':constructor argument in not of instance AnimateApplication');
    }

    this.canvas = Animate.getCanvas();
    this.global = Animate.getGlobal();
    this.Animate = Animate;

    /**@type {CanvasRenderingContext2D}*/
    this.context = Animate._context;

    this.fadeSpeed = 2;
  }

  fadeIn() {
    const ctx = this.context;
    const width = this.Animate.width;
    const height = this.Animate.height;
    return this.Animate.movieclip(
      {c: 0, speed: this.fadeSpeed},
      function (callback) {
        if (this.c > 255) {
          callback();
          this.c = 0;
        } else {
          this.c += this.speed;
          const color = `rgba(${this.c}, ${this.c}, ${this.c}, 1)`;
          ctx.beginPath();
          ctx.fillStyle = color;
          ctx.fillRect(0, 0, width, height);
          ctx.closePath();
        }
      });
  }

  fadeOut() {
    const ctx = this.context;
    const width = this.Animate.width;
    const height = this.Animate.height;
    return this.Animate.movieclip(
      {c: 255, speed: this.fadeSpeed},
      function (callback) {
        if (this.c < 0) {
          callback();
          this.c = 255;
        } else {
          this.c -= this.speed;
          const color = `rgba(${this.c}, ${this.c}, ${this.c}, 1)`;
          ctx.beginPath();
          ctx.fillStyle = color;
          ctx.fillRect(0, 0, width, height);
          ctx.closePath();
        }
      });
  }

}