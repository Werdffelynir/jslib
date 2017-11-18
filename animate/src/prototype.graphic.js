
Animate.prototype.Graphic = function () {

  var Graphic = {
    context: this._context,
    drawCallback: function () {},
    formats: {
      color: '#000000',
      alpha: false,
      thickness: false,
      cap: false,
      join: false,
    },

    color: function (n) {
      if (this.formats.color !== n)
        this.formats.color = n;
      return this;
    },

    // 0 - 1
    alpha: function (n) {
      if (this.formats.alpha !== n)
        this.formats.alpha = n;
      return this;
    },

    // 0 - 100
    thickness: function (n) {
      if (this.formats.thickness !== n)
        this.formats.thickness = n;
      return this;
    },

    // butt, round, square
    cap: function (n) {
      if (this.formats.cap !== n)
        this.formats.cap = n;
      return this;
    },

    // round, bevel, miter
    join: function (n) {
      if (this.formats.join !== n)
        this.formats.join = n;
      return this;
    },

    CAPS: {
      BUTT: "butt",
      ROUND: "round",
      SQUARE: "square",
    },

    JOINS: {
      BEVEL: "bevel",
      ROUND: "round",
      MITER: "miter",
    },

  };

  Graphic.formatsApply = function () {
    if (this.formats.alpha !== false)
      this.context.globalAlpha = this.formats.alpha;

    if (this.formats.thickness !== false)
      this.context.lineWidth = this.formats.thickness;

    if (this.formats.cap !== false)
      this.context.lineCap = this.formats.cap;

    if (this.formats.join !== false)
      this.context.lineJoin = this.formats.join;
  };

  Graphic.begin = function () {this.context.beginPath()};
  Graphic.close = function () {this.context.closePath()};
  Graphic.save = function () {this.context.save()};
  Graphic.restore = function () {this.context.restore()};
  Graphic.shadow = function (x, y, blur, color) {
    this.context.shadowOffsetX = x;
    this.context.shadowOffsetY = y;
    this.context.shadowBlur = blur;
    this.context.shadowColor = color;
    return this;
  };
  Graphic.clearShadow = function () {
    this.context.shadowOffsetX =
      this.context.shadowOffsetY =
        this.context.shadowBlur = 0;
    return this;
  };

  Graphic.circle = function (x, y, radius) {
    this.drawCallback = function () {
      this.internalRectRound(x - (radius / 2), y - (radius / 2), radius, radius, radius / 2);
    };
    return this;
  };

  Graphic.rect = function (x, y, width, height) {
    this.drawCallback = function () {
      this.context.beginPath();
      this.context.rect(x, y, width, height);
    };
    return this;
  };

  Graphic.internalRectRound = function (x, y, width, height, radius) {
    this.context.beginPath();
    this.context.moveTo(x + radius, y);
    this.context.arcTo(x + width, y, x + width, y + height, radius);
    this.context.arcTo(x + width, y + height, x, y + height, radius);
    this.context.arcTo(x, y + height, x, y, radius);
    this.context.arcTo(x, y, x + width, y, radius);
  };

  Graphic.rectRound = function (x, y, width, height, radius) {
    this.drawCallback = function () {
      this.internalRectRound(x, y, width, height, radius)
    };
    return this;
  };

  Graphic.shape = function (points, closePath) {
    this.drawCallback = function () {
      var i, temp = {}, positions = [];
      points.map(function (p) {
        if (temp.x === undefined) {temp.x = p}
        else if (temp.y === undefined) {temp.y = p}
        
        if (temp.x !== undefined && temp.y !== undefined) {
          positions.push(temp);temp = {}}
      });

      this.context.beginPath();
      for (i = 0; i < positions.length; i++) {
        this.context.lineTo(positions[i].x, positions[i].y);
      }
      
      if (!!closePath) this.context.closePath();
    };
    return this;
  };

  Graphic.line = function (x1, y1, x2, y2) {
    this.drawCallback = function () {
      this.context.beginPath();
      this.context.moveTo(x1, y1);
      this.context.lineTo(x2, y2);
    };
    return this;
  };
  
  Graphic.ellipse = function (x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise, closePath) {
    this.drawCallback = function () {
      this.context.save();
      this.context.beginPath();
      this.context.translate(x, y);
      this.context.rotate(rotation);
      this.context.scale(radiusX / radiusY, 1);
      this.context.arc(0, 0, radiusY, startAngle, endAngle, Animate.isset(anticlockwise) ? !!anticlockwise : false);
      this.context.restore();
      if (Animate.isset(closePath) && !!closePath) this.context.closePath();
    };
    return this;
  };
  
  Graphic.stroke = function () {
    this.formatsApply();
    this.drawCallback.call(this);

    if (this.formats.color)
      this.context.strokeStyle = this.formats.color;
    this.context.stroke();
    
    return this;
  };
  
  Graphic.fill = function () {
    this.formatsApply();
    this.drawCallback.call(this);

    if (this.formats.color)
      this.context.fillStyle = this.formats.color;
    this.context.fill();
    
    return this;
  };

  return Graphic;

};
