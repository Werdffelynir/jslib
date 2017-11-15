/**
 * Examples:
 *
 * .TextField("Simple TextField", 100, 150, '#C00000', true);
 * // or
 * .TextField("Simple TextField")
 *    .x(10)
 *    .y(10)
 *    .color('#dd0')
 *    .font('bold 20px sans, sans-serif')
 *    .fill();
 *
 * @type {{context: null}}
 */

var TextField = {context:null};

TextField.text = function (val, x, y) {
  if (Animate.isset(x)) this._x = x;
  if (Animate.isset(y)) this._y = y;
  this._text = val;
  return this;};
TextField.font = function (val) {
  this._font = val;
  return this;};
TextField.x = function (val) {
  this._x = val;
  return this;};
TextField.y = function (val) {
  this._y = val;
  return this;};
TextField.color = function (val) {
  this._color = val;
  return this;};
TextField.align = function (val) {
  this._align = val;
  return this;};
TextField.baseline = function (val) {
  this._baseline = val;
  return this;};

TextField.fill = function () {
  var
    x = this._x || 0,
    y = this._y || 0,
    text = this._text || '';

  if (this._font)
    this.context.font = this._font;
  if (this._align)
    this.context.textAlign = this._align;
  if (this._baseline)
    this.context.textBaseline = this._baseline;
  if (this._color)
    this.context.fillStyle = this._color;

  this.context.fillText(text, x, y);
};

TextField.stroke = function () {
  var
    x = this._x || 0,
    y = this._y || 0,
    text = this._text || '';

  if (this._font)
    this.context.font = this._font;
  if (this._align)
    this.context.textAlign = this._align;
  if (this._baseline)
    this.context.textBaseline = this._baseline;
  if (this._color)
    this.context.strokeStyle = this._color;

  this.context.strokeText(text, x, y);
};

/**
 *
 * @param text
 * @param x
 * @param y
 * @param color
 * @param fill
 * @returns {TextField}
 */
Animate.prototype.TextField = function (text, x, y, color, fill) {
  TextField.context = this._context;

  if (Animate.isset(text))  TextField.text(text);
  if (Animate.isset(x))     TextField.x(x);
  if (Animate.isset(y))     TextField.y(y);
  if (Animate.isset(color)) TextField.color(color);

  if (fill === true) {
    TextField.fill();
  }
  else if (fill === false) {
    TextField.stroke();
  }

  return TextField;
};