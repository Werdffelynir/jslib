/**
 *
 * @returns {Graphic}
 */
Animate.prototype.Graphic = function () {

  var Graphic = {
    context: this._context,
    drawCallback: function () {},
    formats: {
      color: '#000000',
      alpha: false,
    }

    // _x: 0,
    // _y: 0,
    // _width: 0,
    // _height: 0,
    // _color: '#000000',
    // x: function (n) {
    //   this._x = Animate.isset(n) ? n : this._x;
    //   return this;},
    // y: function (n) {
    //   this._y = Animate.isset(n) ? n : this._y;
    //   return this;},
    // width: function (n) {
    //   this._width = Animate.isset(n) ? n : this._width;
    //   return this;},
    // height: function (n) {
    //   this._height = Animate.isset(n) ? n : this._height;
    //   return this;},
    //

    color: function (n) {
      this.formats.color = Animate.isset(n) ? n : this._color;
      return this;
    },

    alpha: function (n) {
      this.formats.alpha = n;
      return this;
    },

    // lineWidth: function (n) {
    //   this.context.lineWidth = n;
    //   return this;},
  };

  Graphic.circle = function (x, y, radius) {
    var that = this;
    this.drawCallback = function () {
      this.drawRectRound(x - (radius / 2), y - (radius / 2), radius, radius, radius / 2);
    };
    return this;
  };

  Graphic.rect = function (x, y, width, height) {
    this.drawCallback = function () {
      this.context.rect(x, y, width, height);
    };
    return this;
  };

  Graphic.drawRectRound = function (x, y, width, height, radius) {
    this.context.beginPath();
    this.context.moveTo(x + radius, y);
    this.context.arcTo(x + width, y, x + width, y + height, radius);
    this.context.arcTo(x + width, y + height, x, y + height, radius);
    this.context.arcTo(x, y + height, x, y, radius);
    this.context.arcTo(x, y, x + width, y, radius);
  };

  Graphic.rectRound = function (x, y, width, height, radius) {
    this.drawCallback = function () {
      this.drawRectRound(x, y, width, height, radius)
    };
    return this;
  };

  Graphic.shape = function (points, closePath, lineWidth) {
    this.drawCallback = function () {
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
          temp = {}
        }
      });

      this.context.beginPath();
      for (i = 0; i < positions.length; i++) {
        this.context.lineTo(positions[i].x, positions[i].y);
      }
      if (closePath !== false)
        this.context.closePath();

      if (lineWidth)
        this.lineWidth(lineWidth);
    };
    return this;
  };


  Graphic.stroke = function () {
    if (this.formats.color)
      this.context.strokeStyle = this.formats.color;

    this.drawCallback.call(this);
    this.context.stroke();
    return this;
  };


  Graphic.fill = function () {
    if (this.formats.color)
      this.context.fillStyle = this.formats.color;

    this.drawCallback.call(this);
    this.context.fill();
    return this;
  };


  return Graphic;

};