
var Graphic = {};

/**
 * @param points
 * @param color
 * @param fill
 * @param closePath
 * @param lineWidth
 */
Graphic.shape = function (points, color, fill, closePath, lineWidth) {
  var i, temp = {}, positions = [];

  points.map(function (p) {
    if (temp.x === undefined) {
      temp.x = p
    }
    else if (temp.y === undefined) {
      temp.y = p
    }
    if (temp.x !== undefined && temp.y !== undefined) {
      positions.push(temp);
      temp = {};
    }
  });

  this._context.beginPath();

  for (i = 0; i < positions.length; i++) {
    this._context.lineTo(positions[i].x, positions[i].y);
  }

  if (fill) {
    if (typeof fill === 'string') {
      this.graphic.shape(points, color, true);
      this.graphic.shape(points, fill, false, closePath, lineWidth);
    } else {
      this._context.closePath();
      this._context.fillStyle = color || '#000';
      this._context.fill();
    }
  }
  else {
    if (lineWidth)
      this._context.lineWidth = lineWidth;

    if (closePath !== false)
      this._context.closePath();

    this._context.strokeStyle = color || '#000';
    this._context.stroke();
  }
};

/**
 * @param x
 * @param y
 * @param width
 * @param height
 * @param color
 * @param fill
 */
Graphic.rect = function (x, y, width, height, color, fill) {
  this._context.beginPath();
  this._context.rect(x || 0, y || 0, width || 100, height || 100);

  if (fill === undefined || fill === true || fill === 'string') {

    this._context.fillStyle = color || '#000000';
    this._context.fill();

    if (typeof fill === 'string') {
      this._context.strokeStyle = fill || '#000000';
      this._context.stroke();
    }
  }
  else {
    this._context.strokeStyle = color || '#000000';
    this._context.stroke();
  }
  this._context.closePath();
};

/**
 * Set line width, type pixels
 * @param num
 */
Graphic.lineWidth = function (num) {
  this._context.lineWidth = num;
};

/**
 * Set opacity
 * @param num
 */
Graphic.globalAlpha = function (num) {
  this._context.globalAlpha = num;
};

/**
 *
 * @param x
 * @param y
 * @param width
 * @param height
 * @param radius
 * @param color
 * @param fill
 */
Graphic.rectRound = function (x, y, width, height, radius, color, fill) {
  x = x || 0;
  y = y || 0;
  width  = width || 100;
  height = height || 100;
  radius = radius || 5;
  color  = color || '#000';
  fill = fill === undefined ? true : !!fill;

  this._context.beginPath();
  this._context.moveTo(x + radius, y);
  this._context.arcTo(x + width, y, x + width, y + height, radius);
  this._context.arcTo(x + width, y + height, x, y + height, radius);
  this._context.arcTo(x, y + height, x, y, radius);
  this._context.arcTo(x, y, x + width, y, radius);

  if (fill) {
    this._context.fillStyle = color;
    this._context.fill();
    if (typeof fill === 'string') {
      this._context.strokeStyle = fill || '#000';
      this._context.stroke();
    }
  }
  else {
    this._context.strokeStyle = color;
    this._context.stroke();
  }
  this._context.closePath();
};

/**
 *
 * @param x
 * @param y
 * @param radius
 * @param color
 * @param fill
 */
Graphic.circle = function (x, y, radius, color, fill) {
  this.graphic.rectRound(x - (radius / 2), y - (radius / 2), radius, radius, radius / 2, color, fill);
};

/**
 *
 * @param point1
 * @param point2
 * @param lineWidth
 * @param color
 */
Graphic.line = function (point1, point2, lineWidth, color) {
  this._context.beginPath();
  this._context.lineWidth = lineWidth || 1;
  this._context.strokeStyle = color;
  this._context.moveTo(point1.x, point1.y);
  this._context.lineTo(point2.x, point2.y);
  this._context.stroke();
  this._context.beginPath();
  this._context.closePath();
};

/**
 *
 * @param x
 * @param y
 * @param width
 * @param lineWidth
 * @param color
 */
Graphic.lineVertical = function (x, y, width, lineWidth, color) {
  if (width < 0) {
    x -= Math.abs(width);
    width = Math.abs(width);
  }
  this.graphic.line(this.point(x, y), this.point(x + width, y), lineWidth, color);
};

/**
 *
 * @param x
 * @param y
 * @param height
 * @param lineWidth
 * @param color
 */
Graphic.lineHorizontal = function (x, y, height, lineWidth, color) {
  if (height < 0) {
    y -= Math.abs(height);
    height = Math.abs(height);
  }
  this.graphic.line(this.point(x, y), this.point(x, y + height), lineWidth, color);
};

/**
 *
 * @param x
 * @param y
 * @param blur
 * @param color
 */
Graphic.shadow = function (x, y, blur, color) {
  this._context.shadowOffsetX = x;
  this._context.shadowOffsetY = y;
  this._context.shadowBlur = blur;
  this._context.shadowColor = color;
};

/**
 * Clear global shadow
 */
Graphic.clearShadow = function () {
  this._context.shadowOffsetX = this._context.shadowOffsetY = this._context.shadowBlur = 0;
};

/**
 * Draw ellipse
 * @param x
 * @param y
 * @param radiusX
 * @param radiusY
 * @param rotation
 * @param startAngle
 * @param endAngle
 * @param anticlockwise
 * @param closePath
 * @param fill
 */
Graphic.ellipse = function (x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise, closePath, fill) {
  this._context.save();
  this._context.beginPath();
  this._context.translate(x, y);
  this._context.rotate(rotation);
  this._context.scale(radiusX / radiusY, 1);
  this._context.arc(0, 0, radiusY, startAngle, endAngle, (anticlockwise === undefined ? true : !!anticlockwise));
  this._context.restore();

  if (!!closePath || closePath === undefined)
    this._context.closePath();

  if (!!fill)
    this._context.fill();
  else 
    this._context.stroke();
};

/**
 *
 * @returns {Graphic}
 */
Animate.prototype.Graphic = function () {
  Graphic._context = this._context;
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
