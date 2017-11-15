
/**
 * var sprite = an.createSprite({
     *      x: 0,
     *      y: 0,
     *      width: 50,
     *      height: 50,
     *      image: HTMLImageElement,
     *      grid: [3, 2],
     *      indexes: [0,1,2,3,4,5],
     *      delay: 1,
     *      loop: false
     * });
 * sprite();
 * @param options
 * @returns {clip|*}
 */
Animate.prototype.Sprite = function (options) {
  var i, key, movieclip, default_options = {

    // parameters
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    image: null,
    grid: [1, 1],
    indexes: [],
    delay: 0,
    loop: true,
    point: {x: 0, y: 0},

    // internal
    _map: [],
    _image_width: 0,
    _image_height: 0,
    _sprite_width: 0,
    _sprite_height: 0,
    _map_index: false,
    _rea_index: false
  };

  // to default
  for (key in default_options) {
    if (options[key] === undefined)
      options[key] = default_options[key];
  }

  var grid_count = options['grid'][0] * options['grid'][1];

  // verify the 'image'
  if (!(options['image'] instanceof HTMLImageElement) && !(options['image'] instanceof Image))
    throw Error('The source image is not instanceof of [Image]');

  // set default indexes
  if (options['indexes'].length == 0) {
    for (i = 0; i < grid_count; i++)
      options['indexes'][i] = i;
  }

  // create maps
  for (i = 0; i < grid_count; i++) {
    options['_map'][i] = {
      index: i,
      sx: parseInt(i % options['grid'][0]) * options['width'],
      sy: parseInt(i / options['grid'][0]) * options['width']
    };
  }

  // Sprite based on MovieClip
  movieclip = this.MovieClip(options, function () {
    var i, k,
      ctx = this['instance']._context,
      iterator = this['instance']._iterator;

    if (arguments.length === 1 && arguments[0] && typeof arguments[0] === 'object')
      for (k in arguments[0]) this[k] = arguments[0][k];

    if (this['_image_width'] === 0 && this['_image_height'] === 0) {
      this['_image_width']   = this['image'].naturalWidth || this['image'].width;
      this['_image_height']  = this['image'].naturalHeight || this['image'].height;
      this['_sprite_width']  = this['_image_width'] / this['grid'][0];
      this['_sprite_height'] = this['_image_height'] / this['grid'][1];
      this['_rea_index'] = 0;
    }

    // calc index in map
    this['_map_index'] = this['indexes'][this['_rea_index']];

    // get map part, sprite part
    var source = this['_map'][this['_map_index']];

    // base draw
    ctx.drawImage(this['image'],
      // source
      source.sx, source.sy, this['_sprite_width'], this['_sprite_height'],
      // draw
      this['point'].x, this['point'].y, this['width'], this['height']
    );

    // steps in map
    if (this['indexes'].length > 1 && iterator % this['delay'] === 0) {
      if (this['indexes'][this['_rea_index'] + 1] !== undefined) {
        this['_rea_index'] += 1;
      } else
      if (this['loop'])
        this['_rea_index'] = 0;
    }

    // return self context
    this.getIndex = this['_map_index'];
    this.getIndexsCount = this['_map'].length - 1;
    this.reset = function () {
      this['_rea_index'] = 0;
    };

    return this;
  }, true);

  return movieclip
};