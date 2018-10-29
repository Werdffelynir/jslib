
const LINE_CAPS_BUTT = 'butt';
const LINE_CAPS_ROUND = 'round';
const LINE_CAPS_SQUARE = 'square';
const LINE_JOIN_BEVEL = 'bevel';
const LINE_JOIN_ROUND = 'round';
const LINE_JOIN_MITER = 'miter';

const FILL_RULE_NONZERO = 'nonzero';
const FILL_RULE_EVENODD = 'evenodd';

class AnimateGraphic {

  constructor (Animate) {
    if ( !(Animate instanceof AnimateApplication) ) {
      throw new Error(':constructor argument in not of instance AnimateApplication');
    }

    /**@type {AnimateApplication}*/
    this.Animate = Animate;

    /**@type {CanvasRenderingContext2D}*/
    this.context = Animate._context;

    /**@type {Document}*/
    this.global = Animate.getGlobal();

    /**@type {function|null}*/
    this.drawContextFunction = null;

    this.formatProperties = {
      color: '#000000',
      alpha: 1,
      thickness: null,
      cap: LINE_CAPS_ROUND,
      join: LINE_JOIN_ROUND,
    };
  }

  apply () {
    if (this.formatProperties.alpha) this.context.globalAlpha = this.formatProperties.alpha;
    if (this.formatProperties.thickness) this.context.lineWidth = this.formatProperties.thickness;
    if (this.formatProperties.cap) this.context.lineCap = this.formatProperties.cap;
    if (this.formatProperties.join) this.context.lineJoin = this.formatProperties.join;;
    return this;
  }

  color (src) {
    this.formatProperties.color = src;
    return this;
  }

  alpha (src = 100) {
    this.context.globalAlpha = this.formatProperties.alpha = src / 100;
    return this;
  }

  thickness (src) {
    this.context.lineWidth = this.formatProperties.thickness = src;
    return this;
  }

  /**
   * @param src {string} butt || round || square
   * @returns {AnimateGraphic}
   */
  cap (src) {
    this.context.lineCap = this.formatProperties.cap = src;
    return this;
  }

  /**
   * @param src {string} round || bevel || miter
   * @returns {AnimateGraphic}
   */
  join (src) {
    this.context.lineJoin = this.formatProperties.join = src;
    return this;
  }

  save () {
    this.context.save();
    return this;
  }

  translate (x, y) {
    this.context.translate(x, y);
    return this;
  }

  rotate (angle) {
    this.context.rotate(angle);
    return this;
  }

  restore () {
    this.context.restore();
    return this;
  }

  begin () {
    this.context.beginPath();
    return this;
  }

  close () {
    this.context.closePath();
    return this;
  }

  shadow (x, y, blur, color) {
    this.context.shadowOffsetX = x;
    this.context.shadowOffsetY = y;
    this.context.shadowBlur = blur;
    this.context.shadowColor = color;
    return this;
  };

  clearShadow () {
    this.context.shadowOffsetX = this.context.shadowOffsetY = this.context.shadowBlur = 0;
    return this;
  };

  /**
   * @returns {AnimateGraphic}
   */
  line (point1, point2) {
    this.drawContextFunction = (ctx) => {
      ctx.beginPath();
      ctx.moveTo(point1.x, point1.y);
      ctx.lineTo(point2.x, point2.y);
    };
    return this;
  }

  internalRectRound (point, width, height, radius) {
    this.drawContextFunction = (ctx) => {
      const {x, y} = point;
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.arcTo(x + width, y, x + width, y + height, radius);
      ctx.arcTo(x + width, y + height, x, y + height, radius);
      ctx.arcTo(x, y + height, x, y, radius);
      ctx.arcTo(x, y, x + width, y, radius);
    };
    return this;
  };

  ellipse (point, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise = true, closePath = false) {
    this.drawContextFunction = (ctx) => {
      const {x, y} = point;
      ctx.save();
      ctx.beginPath();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.scale(radiusX / radiusY, 1);
      ctx.arc(0, 0, radiusY, startAngle, endAngle, anticlockwise);
      ctx.restore();
      if (closePath)
        ctx.closePath();
    };
    return this;
  };

  circle (point, radius) {
    const {x, y} = point;
    this.internalRectRound({x: x - (radius / 2), y: y - (radius / 2)}, radius, radius, radius / 2);
    return this;
  };

  /**
   * .rect(100, 150, 150, 40)
   * .rect(Point(100, 150), 150, 40)
   * @returns {AnimateGraphic}
   */
  rect (...args) {
    let x, y, width, height;

    if (args.length === 1) {
      x = args[0].x;
      y = args[0].y;
      width = args[0].width;
      height = args[0].height;
    }
    else if (args.length === 3) {
      x = args[0].x;
      y = args[0].y;
      width = args[1];

      height = args[2];
    }
    else if (args.length === 4) {
      x = args[0];
      y = args[1];
      width = args[2];
      height = args[3];
    }

    this.drawContextFunction = (ctx) => {
      ctx.beginPath();
      ctx.rect(x, y, width, height);
    };
    return this;
  };

  rectRound (point, width, height, radius = 10) {
    this.internalRectRound(point, width, height, radius);
    return this;
  };

  shape (points, closePath) {
    this.drawContextFunction = (ctx) => {
      let i, temp = {}, positions = [];

      points.map(function (p) {
        if (temp.x === undefined) temp.x = p;
        else if (temp.y === undefined) temp.y = p;

        if (temp.x !== undefined && temp.y !== undefined) {
          positions.push(temp);
          temp = {}
        }
      });

      ctx.beginPath();
      for (i = 0; i < positions.length; i++) {
        ctx.lineTo(positions[i].x, positions[i].y);
      }

      if (!!closePath)
        ctx.closePath();
    };
    return this;
  };

  stroke () {
    this.context.strokeStyle = this.formatProperties.color;
    this.drawContextFunction.call(this, this.context);
    this.context.stroke();
    return this;
  };

  fill () {
    this.context.fillStyle = this.formatProperties.color;
    this.drawContextFunction.call(this, this.context);
    this.context.fill();
    return this;
  };

  isPointInPath (x, y) {
    return this.context.isPointInPath(x, y);
  }


}




const Point = function (x = 0, y = 0) {
  const src = [x, y];
  src.x = x;
  src.y = y;
  src.animateType = 'Point';
  return src;
};

Point.isPoint = function (src) {
  return src && src.animateType === 'Point';
};

Point.toPointArguments = function (...args) {
  args = (args.length === 2) ? [args[0], args[1], 0, 0] : args;
  const rectangle = Rectangle.toRectangleArguments(...args);
  return Point(rectangle.x, rectangle.y);
};





const Rectangle = function (x = 0, y = 0, width = 100, height = 100) {
  const src = [x, y, width, height];
  src.x = x;
  src.y = y;
  src.width = width;
  src.height = height;
  src.animateType = 'Rectangle';
  return src;
};

Rectangle.isRectangle = function (src) {
  return src && src.animateType === 'Rectangle';
};

Rectangle.toRectangleArguments = function (...args) {
  let src, x = 0, y = 0, width = 0, height = 0;

  if (args.length === 1) {
    src = args[0];
    if (typeOf(args[0], 'array')) {
      x = src[0] ? src[0] : x;
      y = src[1] ? src[1] : y;
      width = src[2] ? src[2] : width;
      height = src[3] ? src[3] : height;
    } else {
      x = src.x ? src.x : x;
      y = src.y ? src.y : y;
      width = src.width ? src.width : width;
      height = src.height ? src.height : height;
    }
  } else if (args.length === 3) {
    src = args[0];
    x = src.x;
    y = src.y;
    width = args[1];
    height = args[2];
  } else if (args.length === 4) {
    x = args[0];
    y = args[1];
    width = args[2];
    height = args[3];
  }
  return Rectangle(x, y, width, height)
};
