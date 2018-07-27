Animate.Extension(function (instance) {

  if (!(instance instanceof Animate))
    return;

  /**
   * @type CanvasRenderingContext2D
   */
  var context = instance.getContext();

  /**
   *
   * @param mask_array
   * @param cols
   * @param rect_size   width (auto height)
   * @returns {*}
   */
  instance.maskmapCreate = function (mask_array, cols, rect_size) {
    mask_array['cols'] = cols;
    mask_array['rows'] = cols;
    mask_array['size'] = rect_size;
    return mask_array;
  };

  instance.maskmapRender = function (maskmap, callback) {
    var i, x, y;
    for (i = 0; i < maskmap.length; i++) {
      x = parseInt(i % maskmap['cols']) * maskmap['size'];
      y = parseInt(i / maskmap['cols']) * maskmap['size'];
      callback.call({}, x, y, maskmap[i], i, maskmap);
    }
  };

})