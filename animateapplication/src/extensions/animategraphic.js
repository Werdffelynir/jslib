
const LINE_CAPS_BUTT = 'butt';
const LINE_CAPS_ROUND = 'round';
const LINE_CAPS_SQUARE = 'square';

const LINE_JOIN_BEVEL = 'bevel';
const LINE_JOIN_ROUND = 'round';
const LINE_JOIN_MITER = 'miter';

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

    this.formatProperties= {
      color: '#000000',
      alpha: null,
      thickness: null,
      cap: null,
      join: null,
    };
  }

  apply () {
    if (this.formatProperties.alpha) this.context.globalAlpha = this.formatProperties.alpha;
    if (this.formatProperties.thickness) this.context.lineWidth = this.formatProperties.thickness;
    if (this.formatProperties.cap) this.context.lineCap = this.formatProperties.cap;
    if (this.formatProperties.join) this.context.lineJoin = this.formatProperties.join;
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

  save () {this.context.save()}

  restore () {this.context.restore()}

  begin () {this.context.beginPath()}

  close () {this.context.closePath()}

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

  rect (point, width = 100, height = 100) {
    this.drawContextFunction = (ctx) => {
      const {x, y} = point;
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
}
