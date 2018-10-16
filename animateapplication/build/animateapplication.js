
  
function isObject(scr) {
  return !!scr
}

function isEmpty(scr) {
  return !!scr
}

function isNumber(scr) {
  return !!scr
}


  
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




  

class AnimateConfig {
  constructor (config) {
    this.config = {...{
        selector: null,
        width: 600,
        height: 400,
        fps: 30,
        loop: LOOP_ANIMATE,
        fullScreen: false,
        autoStart: true,
        autoClear: true,
        sorting: true,
        filtering: true,
      }, ...config };
  }
}


class AnimateApplication extends AnimateConfig {

  constructor (...config) {

    if (config.length > 1) {
      config = {selector: config[0], width: parseInt(config[1]), height: parseInt(config[2]), fps: config[3] || 0};
    }

    super(config);

    this._scenes = {};
    this._canvas = null;
    this._context = null;
    this._frameCallback = null;

    this._fpsTimeNow = 0;
    this._fpsTimeThen = 0;
    this._fpsTimeFirst = 0;
    this._fpsDelta = 0;
    this._fpsInterval = 1000 / this.config.fps;
    this._requestanimationframeid = null;

    this._sceneName = 'default';
    this._paused = false;
    this._iteration = 0;
    this._global = document ? document : {};

    try {
      this._canvas = this._global.querySelector(this.config.selector);
      this._context = this._canvas.getContext('2d');

      this.width = this._canvas.width = this.config.width ;
      this.height = this._canvas.height = this.config.height;
    } catch (err) {
      throw new Error(err);
    }
  }

  sceneObject (params) {
    if (typeof params === 'function') params = {init: params};
    return {...{animate: this, index: 100, hide: false, name: 'scene', init: null}, ...params};
  }

  _loop () {
    if (!this._paused) {
      this._requestanimationframeid = requestAnimationFrame( () => this._loop() );
      this._fpsTimeNow = Date.now();
      this._fpsDelta = this._fpsTimeNow - this._fpsTimeThen;
      if (this._fpsDelta > this._fpsInterval) {
        this._fpsTimeThen = this._fpsTimeNow - ( this._fpsDelta % this._fpsInterval );
        this._iteration ++;
        this.clear();
        this.draw();
      }
    }
  }

  draw () {
    this._scenes[this._sceneName].map((cb) =>
      cb.bind(this)(this._context, this._iteration));

    if (this._frameCallback && this._frameCallback.init)
      this._frameCallback.bind(this)(this._context, this._iteration)
  };

  clear () {
    this._context.clearRect( 0, 0, this.config.width, this.config.height );
    return this;
  }

  scene (sceneName, params, cb) {
    if (!Array.isArray(this._scenes[sceneName]))
      this._scenes[sceneName] = [];
    this._scenes[sceneName].push(cb.bind(this.sceneObject(params)));
    return this;
  }

  stop () {
    this._paused = true;
    window.cancelAnimationFrame(this._requestanimationframeid)
    return this;
  }

  start (sceneName = null) {
    if (sceneName)
      this._sceneName = sceneName;
    this.stop();
    this._fpsTimeThen = Date.now();
    this._fpsTimeFirst = this._fpsTimeThen;
    this._paused = false;
    this._loop();
    return this;
  }

  getFPS () {
    return Math.ceil(this._iteration / ( (this._fpsTimeThen - this._fpsTimeFirst) / 1000))
  }

  getIteration () {
    return this._iteration
  }

  /**
   * @returns {null|CanvasRenderingContext2D}
   */
  getContext (props = null) {
    if (props) {
      let key;
      for (key in props)
        if (isDefined(props[key]))
          this._context[key] = props[key];
    }
      return this._context
  }

  /**
   * @returns {null|HTMLCanvasElement}
   */
  getCanvas () {
    return this._canvas
  }

  /**
   *
   * @returns {Document | *}
   */
  getGlobal () {
    return this._global
  }
}

/** Set script version. Property [read-only]*/
Object.defineProperty(AnimateApplication, 'version', {
  enumerable: false, configurable: false, writable: false, value: '0.8.0.0'
});



  
class AnimateEvent {

  constructor (Animate) {

    if ( !(Animate instanceof AnimateApplication) )
      throw new Error(':constructor argument in not of instance AnimateApplication');

    this.canvas = Animate.getCanvas();
    this.global = Animate.getGlobal();
    this.Animate = Animate;
  }

  getMouseEventPosition (mouseEvent) {
    if (mouseEvent instanceof MouseEvent) {
      const rect = this.canvas.getBoundingClientRect();
      return {
        x: mouseEvent.clientX - rect.left,
        y: mouseEvent.clientY - rect.top }
    }
  };

  click (cb) {
    this.canvas.addEventListener('click', (event) =>
      cb.call(this.Animate, event, this.getMouseEventPosition(event))
    );
  }

  move (cb) {
    this.canvas.addEventListener('mousemove', (event) =>
      cb.call(this.Animate, event, this.getMouseEventPosition(event))
    );
  }

  mousemove (cb) {
    this.move(cb);
  }

  keydown (cb) {
    this.global.addEventListener('keydown', (event) =>
      cb.call(this.Animate, event, this.getMouseEventPosition(event))
    );
  }

  keyup (cb) {
    this.global.addEventListener('keyup', (event) =>
      cb.call(this.Animate, event, this.getMouseEventPosition(event))
    );
  }

}


  
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


  

const FONT_TYPE_FILL = 'fill';
const FONT_TYPE_STROKE = 'stroke';
const FONT_FAMILY = 'sans-serif';
const FONT_BASELINE_TOP = 'top';
const FONT_BASELINE_BOTTOM = 'bottom';
const FONT_BASELINE_MIDDLE = 'middle';
const FONT_BASELINE_HANGING = 'hanging';
const FONT_BASELINE_TLPHABETIC = 'alphabetic';
const FONT_BASELINE_IDEOGRAPHIC = 'ideographic';
const FONT_ALIGN_LEFT = 'left';
const FONT_ALIGN_RIGHT = 'right';
const FONT_ALIGN_CENTER = 'center';
const FONT_ALIGN_START = 'start';
const FONT_ALIGN_END = 'end';
const FONT_WEIGHT_NORMAL = 'normal';
const FONT_WEIGHT_BOLD = 'bold';
const FONT_WEIGHT_100 = '100';
const FONT_WEIGHT_400 = '400';
const FONT_WEIGHT_600 = '600';

class AnimateText {

  constructor (Animate) {
    if ( !(Animate instanceof AnimateApplication) ) {
      throw new Error(':constructor argument in not of instance AnimateApplication');
    }

    this.config = {
      x: 0,
      y: 0,
      text: '',
      type: FONT_TYPE_FILL,
      size: 12,
      align: FONT_ALIGN_LEFT,
      family: 'sans-serif',
      baseline : FONT_BASELINE_TOP,
    };

    /**@type {CanvasRenderingContext2D}*/
    this.context = Animate._context;
  }

  format (textConfig) {
    const conf = textConfig ? {...this.config, ...textConfig} : this.config;
    this.context.font = `${conf.size}px/${(conf.size + 2)}px ${conf.family}`;
    this.context.textAlign = conf.align;
    this.context.textBaseline = conf.baseline;
    return this;
  }

  text (text) {
    this.config.text = text;
    return this;
  }

  stroke () {
    this.context.strokeText(this.config.text, this.config.x, this.config.y);
    return this;
  }

  fill () {
    this.context.fillText(this.config.text, this.config.x, this.config.y);
    return this;
  };

  print (text, posx, posy ) {
    if (isDefined(text)) this.config.text = text;
    if (isDefined(posx)) this.config.x = posx;
    if (isDefined(posy)) this.config.y = posy;

    switch (this.config.type) {
      case FONT_TYPE_FILL:this.fill();break;
      case FONT_TYPE_STROKE:this.stroke();break;
      default:
    }
    return this;
  }

}


  

AnimateApplication.Point = function (x = 0, y = 0) {
  const src = [x, y];
  src.x = x;
  src.y = y;
  return src;
};

AnimateApplication.Rectangle = function (x = 0, y = 0, width = 0, height = 0) {
  const src = [x, y, width, height];
  src.x = x;
  src.y = y;
  src.width = width;
  src.height = height;
  return src;
};

