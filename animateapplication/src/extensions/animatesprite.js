
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
    img.spriteName = name;
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
          loadedData[img.spriteName] = img;
          i ++;
          if (i === length) {
            callback.call({}, loadedData);
          }
        })
      }
    }
    return this
  }

  /**
   *
   * Sprite.config('spriteName', imageData, [128, 64], [4, 4])
   * Sprite.config('spriteName', imageData, [64, 64], [4, 4]) === Sprite.config('spriteName', imageData, 64, 4)
   * @param name
   * @param img
   * @param step
   * @param grid
   * @returns {AnimateSprite}
   */
  config (name, img, step, grid) {
    const config = this._config[name] = {};
    config.img = img;
    config.step = typeOf(step, 'array') ? step : [step, step];
    config.grid = typeOf(grid, 'array') ? grid : [grid, grid];
    config.params = {sx: 0, sy: 0, sWidth: config.step[0], sHeight: config.step[1], dx: 0, dy: 0, dWidth: 0, dHeight: 0};
    config.frames = {length: 0};
    let ix = 0, iy = 0, i = 0;
    for (; iy < grid[1]; iy ++ ) {
      for (; ix < grid[0]; ix ++ ) {
        config.frames['frame'+i] = {x: ix * config.step[0], y: iy * config.step[1]};
        i ++;
      }
      ix = 0;
    }
    config.frames.length = i;
    return this
  }

  /**
   * Sprite.draw('spriteName', 0, 0, 0, 50);
   * Sprite.draw('spriteName', 0, 0, 0, [128, 64]);
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
      throw new Error('Frames "'+name+'" not exist!');

    let {sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight} = config.params;
    size = typeOf(size, 'array') ? size : [size, size];
    dx = x;
    dy = y;
    dWidth = size[0];
    dHeight = size[1];
    sx = config.frames['frame'+frame].x;
    sy = config.frames['frame'+frame].y;
    this.context.drawImage(config.img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    return this
  }

  frames (name) {
    return this._config[name].frames;
  }

}