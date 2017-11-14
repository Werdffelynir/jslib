/**
 *
 * @type {{context: CanvasRenderingContext2D, _x: number, _y: number, _width: number, _height: number, x: Graphic.x, y: Graphic.y, width: Graphic.width, height: Graphic.height}}
 */
var Graphic = {

  context: null,
  _x: 0,
  _y: 0,
  _width: 0,
  _height: 0,
  _color: '#000000',

  x: function (n) {
    this._x = Animate.isset(n) ? n : this._x;
    return this;},
  y: function (n) {
    this._y = Animate.isset(n) ? n : this._y;
    return this;},
  width: function (n) {
    this._width = Animate.isset(n) ? n : this._width;
    return this;},
  height: function (n) {
    this._height = Animate.isset(n) ? n : this._height;
    return this;},
  color: function (n) {
    this._color = Animate.isset(n) ? n : this._color;
    return this;},

};



Graphic.rect = function (x, y, width, height) {
  this.x(x);
  this.y(y);
  this.width(width);
  this.height(height);
  this.context.rect(this._x, this._y, this._width, this._height);
  return this;
};

Graphic.abstractDraw = function () {
  return this;
};
Graphic.stroke = function () {
  if (this._color)
    this.context.strokeStyle = this._color;
  this.context.stroke();
  return this;
};
Graphic.fill = function () {
  if (this._color)
    this.context.fillStyle = this._color;
  this.context.fill();
  return this;
};

/**
 *
 * @returns {Graphic}
 */
Animate.prototype.Graphic = function () {

  Graphic.context = this._context;
  return Graphic;


};

/*
Animate.prototype.graphic = {
  shape: Graphic.shape,
  rect: Graphic.rect,
  lineWidth: Graphic.lineWidth,
  globalAlpha: Graphic.globalAlpha,
  rectRound: Graphic.rectRound,
  circle: Graphic.circle,
  line: Graphic.line,
  lineVertical: Graphic.lineVertical,
  lineHorizontal: Graphic.lineHorizontal,
  shadow: Graphic.shadow,
  clearShadow: Graphic.clearShadow,
  ellipse: Graphic.ellipse
};
*/
