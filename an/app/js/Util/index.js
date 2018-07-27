
const Util = {};


(function () {

  /**
   * Clone an Array, Object, Function
   * @param src
   * @param params
   */
  Util.clone = function (src, params) {
    if (typeOf(src, 'function')) {
      return src.bind({}, params);

    } else if (typeOf(params, 'object') || typeOf(params, 'array')) {
      let key;
      const reSrc = JSON.parse(JSON.stringify(src));
      for (key in params) {
        reSrc[key] = params[key];
      }
      return reSrc;
    }
  };


  Util.combine = function (srcDefault, src) {
    for (let key in src) {
      srcDefault[ key ] = src[ key ]
    }
    return srcDefault
  };

  /**
   * Convert degrees to radians
   * Formula: degrees * Math.PI / 180
   * @param deg
   * @returns {number}
   */
  Util.degreesToRadians = function (deg) {
    return (deg * Math.PI) / 180;
  }

})(Util);















