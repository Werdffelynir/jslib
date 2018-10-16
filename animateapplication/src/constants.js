
const LOOP_TIMER = 'timer';
const LOOP_ANIMATE = 'animation';
const RADIAN = 0.017453292519943295;
const DEGREE_AS_RADIAN = 0.017453292519943295;
const DEGREE_360_AS_RADIAN = DEGREE_AS_RADIAN * 360;


/**
 * @param value
 * @param type {null|string} 'null' || 'boolean' || 'undefined' || 'function' || 'string' || 'number' || 'date' || 'number' || 'array' || 'object' ...
 * @returns {*}
 */
const typeOf = function (value, type) {
  const types = ['null','boolean','undefined','function','string','number','date','number','array','object'];
  let t = typeOfStrict(value).toLowerCase();

  if (types.indexOf(t) === -1 && typeof value === 'object') t = 'object';
  return typeof type === 'string' ? type.toLowerCase() === t : t;
};

/**
 * @param value
 * @param type {null|string} Boolean || undefined || Function || String || Number || Date || Number || Array || Object ...
 * @returns {*}
 */
const typeOfStrict = function (value, type) {
  const t = Object.prototype.toString.call(value).slice(8, -1);
  return typeof type === 'string' ? type === t : t;
};

const isDefined = function (src) {
  return src !== undefined;
};


