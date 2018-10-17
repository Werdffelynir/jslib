
class AnimateGrid {

  constructor (Animate) {
    if ( !(Animate instanceof AnimateApplication) ) {
      throw new Error(':constructor argument in not of instance AnimateApplication');
    }

    this.canvas = Animate.getCanvas();
    this.global = Animate.getGlobal();
    this.Animate = Animate;

    /**@type {CanvasRenderingContext2D}*/
    this.context = Animate._context;

    this.cache = {};
  }

  /**
   * @param size          Grid step size. Default: 50
   * @param lineWidth     Толщина линии. Default: 0.5
   * @param color         Цвет линий. Default: '#efefef'
   */
  add (size, lineWidth, color, fullWidth, fullHeight) {
    const gridname = 'id_' + size +'_'+ lineWidth;

    if (this.cache[gridname]) {
      this.context.putImageData(this.cache[gridname], 0, 0);
    } else {
      let i,
        w = fullWidth || this.Animate.getWidth(),
        h = fullHeight || this.Animate.getHeight();

      size = size || 50;
      this.context.beginPath();

      for (i = 0; i < (w + size); i += size) {
        this.context.moveTo(i, 0);
        this.context.lineTo(i, h); }
      for (i = 0; i < (h + size); i += size) {
        this.context.moveTo(0, i);
        this.context.lineTo(w, i); }

      this.context.lineWidth = lineWidth || 0.5;
      this.context.strokeStyle = color || '#efefef';
      this.context.stroke();
      this.context.closePath();

      this.cache[gridname] = this.context.getImageData(0, 0, w, h);
    }
  }

}
