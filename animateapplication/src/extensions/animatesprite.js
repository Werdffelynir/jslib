
class AnimateSprite {

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

    this._config = {}; // {img: null, step: 0, grid: [], params: {}, frames: {length: 0}};
  }

  uploadImage (name, url, callback) {
    const img = this.global.createElement('img');
    img.src = url;
    img.onload = event => callback.call({}, img, event);
    return this
  }

  /**
   * {img: 'url/to/img'}
   * @param list
   * @param callback
   * @returns {AnimateSprite}
   */
  upload (list, callback) {
    const length = Object.keys(list).length;
    const loadedData = {};
    let name, i = 0;
    for (name in list) {
      if (list.hasOwnProperty(name) && typeOf(list[name], 'string')) {
        this.uploadImage(name, list[name], (img, event) => {
          img.event = event;
          loadedData[name] = img;
          i ++;
          if (i === length) callback.call({}, loadedData);
        })
      }
    }
    return this
  }

  /**
   * Sprite.config(imageData, 50, [6, 4]);
   * @param name
   * @param img
   * @param step
   * @param grid
   * @returns {AnimateSprite}
   */
  config (name, img, step, grid) {
    const config = this._config[name] = {};
    config.img = img;
    config.step = step;
    config.grid = grid;
    config.params = {sx: 0, sy: 0, sWidth: step, sHeight: step, dx: 0, dy: 0, dWidth: 0, dHeight: 0};
    config.frames = {length: 0};
    let ix = 0, iy = 0, i = 0;
    for (; iy < grid[1]; iy ++ ) {
      for (; ix < grid[0]; ix ++ ) {
        config.frames['frame'+i] = {x: ix * step, y: iy * step};
        i ++;
      }
      ix = 0;
    }
    config.frames.length = i;
    return this
  }

  /**
   * Sprite.draw(100, 100, 0, 50);
   * @param name
   * @param x
   * @param y
   * @param frame
   * @param size
   * @returns {AnimateSprite}
   */
  draw (name, x, y, frame, size) {
    const config = this._config[name];
    if (!config.frames['frame'+frame])
      throw new Error('Frame number not exist!');
    let {sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight} = config.params;
    dx = x;
    dy = y;
    dWidth = dHeight = size;
    sx = config.frames['frame'+frame].x;
    sy = config.frames['frame'+frame].y;
    this.context.drawImage(config.img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    return this
  }

  frames (name) {
    return this._config[name].frames;
  }

}
