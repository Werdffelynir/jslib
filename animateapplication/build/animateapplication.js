"use strict";

  
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
const PI = 3.14159265359;
const RAD_TO_DEGREES = 3.14159265359;


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

/**
 * Generate a random number
 * @param min
 * @param max
 * @returns {number}
 */
const random = function (min, max) {
  min = min || 0;
  max = max || 100;
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * Generate a random hex color
 * @returns {string}
 */
const randomColor = function () {
  const letters = '0123456789ABCDEF'.split('');
  let i, color = '#';
  for (i = 0; i < 6; i++)
    color += letters[Math.floor(Math.random() * 16)];
  return color;
};

/**
 * Return random item from array
 * @param arr
 * @returns {*}
 */
const randomItem = function (arr) {
  const i = random(0, arr.length-1);
  return arr[i];
};

/**
 * Convert degrees to radians
 * Formula: degrees * Math.PI / 180
 * @param deg
 * @returns {number}
 */
const degreesToRadians = function (deg) {
  return (deg * Math.PI) / 180;
};
/**
 * Convert radians to degrees
 * Formula: radians * 180 / Math.PI
 * @param rad
 * @returns {number}
 */
const radiansToDegrees = function (rad) {
  return (rad * 180) / Math.PI;
};

/**
 * Calculate distance between two Points
 * @param p1
 * @param p2
 * @returns {number}
 */
const distanceBetween = function (p1, p2) {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
};

/**
 * Calculate angle between two points. return object:
 *  {angle:, x:, y:}
 * @param p1
 * @param p2
 * @returns {{angle: number, x: number, y: number}}
 */
const calculateAngle = function (p1, p2) {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const angle = Math.atan2(dy, dx);
  return {
    angle: angle,
    x: Math.cos(angle),
    y: Math.sin(angle)
  };
};

/**
 * Calculates the position and size of elements.
 *
 * @param elem
 * @returns {{y: number, x: number, width: number, height: number}}
 */
const position = function (elem) {
  const data = {x: 0, y: 0, width: 0, height: 0};

  if (typeof elem === 'string')
    elem = document.querySelector(elem);

  if (elem === undefined || elem === window || elem === document) {
    data.width = window.innerWidth;
    data.height = window.innerHeight;
    data.element = window;
  }
  else
  if (elem && elem.nodeType === Node.ELEMENT_NODE) {
    if (elem.getBoundingClientRect) {
      const rect = elem.getBoundingClientRect(),
        scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop,
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
        clientTop = document.documentElement.clientTop || document.body.clientTop || 0,
        clientLeft = document.documentElement.clientLeft || document.body.clientLeft || 0;

      data.y = Math.round(rect.top + scrollTop - clientTop);
      data.x = Math.round(rect.left + scrollLeft - clientLeft);
      data.width = elem.offsetWidth;
      data.height = elem.offsetHeight;
    }
    else {
      let top = 0, left = 0;
      while (elem) {
        top += parseInt(elem.offsetTop, 10);
        left += parseInt(elem.offsetLeft, 10);
        elem = elem.offsetParent;
      }
      data.y = top;
      data.x = left;
      data.width = elem.offsetWidth;
      data.height = elem.offsetHeight;
    }
    data.element = elem;
  }
  return data;
};

const convertHEXtoRGB = function (hex) {
  hex = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function(m, r, g, b) { return r + r + g + g + b + b });
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16)} : null;
};

const convertRGBtoHEX = function (r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

/**
 * wait({}, (resolve, reject) => resolve() );
 * @param args
 * @param callback
 * @returns {Promise<any>}
 */
const waiter = function (args, callback) {
  return new Promise((resolve, reject) => {
    callback.bind(args)(resolve, reject);
  })
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

    this._sn = 'default';
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
        this.clear();
        this.draw();
        this._fpsTimeThen = this._fpsTimeNow - ( this._fpsDelta % this._fpsInterval );
      }
    }
  }

  draw (sn = null) {
    if (sn) this._sn = sn;

    if (this._sn && this._scenes[this._sn]) {
      this._iteration ++;
      this._scenes[this._sn].map((cb) => {
        if (typeOf(cb, 'function')) cb(this._context, this._iteration)
      });
    }

    if (this._frameCallback && this._frameCallback.init)
      this._frameCallback.bind(this)(this._context, this._iteration)
  }

  clear () {
    this._context.clearRect( 0, 0, this.config.width, this.config.height );
    return this;
  }

  scene (sn, params, cb) {
    if (!typeOf(this._scenes[sn], 'array')) this._scenes[sn] = [];
    this._sn = sn;
    this._scenes[sn].push(cb.bind(this.sceneObject(params)));
    return this;
  }

  stop () {
    this._paused = true;
    window.cancelAnimationFrame(this._requestanimationframeid);
    return this;
  }

  start (sn = null) {
    if (sn) this._sn = sn;
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
  getWidth () {
    return this.config.width
  }
  getHeight () {
    return this.config.height
  }

  /**
   * @returns {null|CanvasRenderingContext2D}
   */
  getContext (props = null) {
    if (props) {
      let key;
      for (key in props)
        if (isDefined(props[key]) && isDefined(this._context[key])) this._context[key] = props[key];
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

  /**
   * Hit point inside rectangle
   * @param rectangle
   * @param point
   * @returns {boolean}
   */
  hitTest (rectangle, point) {
    const x = parseInt(point.x), y = parseInt(point.y);
    return x > rectangle[0] &&
      y > rectangle[1] &&
      x < rectangle[0] + rectangle[2] &&
      y < rectangle[1] + rectangle[3];
  };

  /**
   * isPointInPath
   * hitTestPoint(point)
   * @param point {object}
   * @returns {boolean}
   */
  hitTestPoint (point) {
    return this._context.isPointInPath(point.x, point.y);
  }

  /**
   * @param props
   * @param callback
   * @returns {function()}
   */
  createMovieclip (props, callback) {
    const ctx = this._context;
    return (...propsInside) => {
      ctx.save();
      if (isDefined(props.x)) ctx.translate(props.x, props.y);
      if (isDefined(props.rotate)) ctx.rotate(props.rotate);
      callback.apply(props, propsInside);
      ctx.restore();
    }
  }


  clip (options, callback, thisInstance) {
    return (...args) => callback.bind(options).apply(thisInstance || {}, args || {})
  };

  movieclip (opts, callback, thisInstance) {
    const context = this.getContext();
    const options = { ...{
        x: undefined,
        y: undefined,
        translate: undefined,
        transform: undefined,
        rotate: undefined,
        rotation: undefined,
        scale: undefined,
        alpha: undefined,
        composite: undefined,
        setTranslate: function () {this.translate = arguments},
        setTransform: function () {this.transform = arguments},
        setScale: function () {this.scale = arguments},
        setRotate: function () {this.rotate = arguments[0]},
        setRotation: function () {this.rotation = arguments[0]},
        setAlpha: function () {this.alpha = arguments[0]},
        setComposite: function () {this.composite = arguments[0]},
        instance: this
      }, ...opts};

    return this.clip(options, function (...args) {
        context.save();
        if (this.translate !== undefined) {
          CanvasRenderingContext2D.prototype.translate.apply(context, this.translate)}
        if (this.transform !== undefined) {
          CanvasRenderingContext2D.prototype.setTransform.apply(context, this.transform)}
        if (this.scale !== undefined) {
          CanvasRenderingContext2D.prototype.scale.apply(context, this.scale)}
        if (this.rotate !== undefined) {
          context.rotate(this.rotate)}
        if (this.rotation !== undefined) {
          context.rotate(Animate.degreesToRadians(this.rotation))}
        if (this.alpha !== undefined) {
          context.globalAlpha = this.alpha }
        if (this.composite !== undefined) {
          context.globalCompositeOperation = this.composite}

        callback.apply(this, args);
        context.restore();
      },
      thisInstance);
  }

  backgroundColor (color) {
    if (this._canvas.style.backgroundColor !== color)
      this._canvas.style.backgroundColor = color;
  }


}


/** Set script version. Property [read-only]*/
Object.defineProperty(AnimateApplication, 'version', {
  enumerable: false, configurable: false, writable: false, value: '0.8.0.0'
});



  
const EventKeyCode = 0;
const EventKeyCodeBackspace = 8;
const EventKeyCodeTab = 9;
const EventKeyCodeEnter = 13;
const EventKeyCodeShift = 16;
const EventKeyCodeCtrl = 17;
const EventKeyCodeAlt = 18;
const EventKeyCodePause = 19;
const EventKeyCodeBreak = 19;
const EventKeyCodeCapsLock = 20;
const EventKeyCodeEsc = 27;
const EventKeyCodeSpace = 32;
const EventKeyCodePageUp = 33;
const EventKeyCodePageDown = 34;
const EventKeyCodeEnd = 35;
const EventKeyCodeHome = 36;
const EventKeyCodeArrowLeft = 37;
const EventKeyCodeArrowUp = 38;
const EventKeyCodeArrowRight = 39;
const EventKeyCodeArrowDown = 40;
const EventKeyCodePrntScrn = 44;
const EventKeyCodeInsert = 45;
const EventKeyCodeDelete = 46;
const EventKeyCodeWINStart = 91;
const EventKeyCodeWINMenu = 93;
const EventKeyCodeF1 = 112;
const EventKeyCodeF2 = 113;
const EventKeyCodeF3 = 114;
const EventKeyCodeF4 = 115;
const EventKeyCodeF5 = 116;
const EventKeyCodeF6 = 117;
const EventKeyCodeF7 = 118;
const EventKeyCodeF8 = 119;
const EventKeyCodeF9 = 120;
const EventKeyCodeF10 = 121;
const EventKeyCodeF11 = 122;
const EventKeyCodeF12 = 123;
const EventKeyCodeNumLock = 144;
const EventKeyCodeScrollLock = 145;
const EventKeyCodeComa = 188;
const EventKeyCodeDot = 190;
const EventKeyCodeSlash = 191;
const EventKeyCodeBackquote = 192;
const EventKeyCodeBracketLeft = 219;
const EventKeyCodeBackslash = 220;
const EventKeyCodeBracketRight = 221;
const EventKeyCodeQuote = 222;
const EventKeyCodeDigit0 = 48;
const EventKeyCodeDigit1 = 49;
const EventKeyCodeDigit2 = 50;
const EventKeyCodeDigit3 = 51;
const EventKeyCodeDigit4 = 52;
const EventKeyCodeDigit5 = 53;
const EventKeyCodeDigit6 = 54;
const EventKeyCodeDigit7 = 55;
const EventKeyCodeDigit8 = 56;
const EventKeyCodeDigit9 = 57;
const EventKeyCodeKeyA = 65;
const EventKeyCodeKeyB = 66;
const EventKeyCodeKeyC = 67;
const EventKeyCodeKeyD = 68;
const EventKeyCodeKeyE = 69;
const EventKeyCodeKeyF = 70;
const EventKeyCodeKeyG = 71;
const EventKeyCodeKeyH = 72;
const EventKeyCodeKeyI = 73;
const EventKeyCodeKeyJ = 74;
const EventKeyCodeKeyK = 75;
const EventKeyCodeKeyL = 76;
const EventKeyCodeKeyM = 77;
const EventKeyCodeKeyN = 78;
const EventKeyCodeKeyO = 79;
const EventKeyCodeKeyP = 80;
const EventKeyCodeKeyQ = 81;
const EventKeyCodeKeyR = 82;
const EventKeyCodeKeyS = 83;
const EventKeyCodeKeyT = 84;
const EventKeyCodeKeyU = 85;
const EventKeyCodeKeyV = 86;
const EventKeyCodeKeyW = 87;
const EventKeyCodeKeyX = 88;
const EventKeyCodeKeyY = 89;
const EventKeyCodeKeyZ = 90;
const EventKeyCodeNumpad0 = 96;
const EventKeyCodeNumpad1 = 97;
const EventKeyCodeNumpad2 = 98;
const EventKeyCodeNumpad3 = 99;
const EventKeyCodeNumpad4 = 100;
const EventKeyCodeNumpad5 = 101;
const EventKeyCodeNumpad6 = 102;
const EventKeyCodeNumpad7 = 103;
const EventKeyCodeNumpad8 = 104;
const EventKeyCodeNumpad9 = 105;



class AnimateEvent {

  constructor (Animate) {

    if ( !(Animate instanceof AnimateApplication) )
      throw new Error(':constructor argument in not of instance AnimateApplication');

    this.Animate = Animate;
    this.canvas = Animate.getCanvas();
    this.global = Animate.getGlobal();
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

  mousedown (cb) {
    this.canvas.addEventListener('mousedown', (event) =>
      cb.call(this.Animate, event, this.getMouseEventPosition(event))
    );
  }

  keydown (cb) {
    this.global.addEventListener('keydown', (event) =>
      cb.call(this.Animate, event)
    );
  }

  keyup (cb) {
    this.global.addEventListener('keyup', (event) =>
      cb.call(this.Animate, event)
    );
  }

}


  
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

  isPointInPath (x, y) {
    return this.context.isPointInPath(x, y);
  }


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
      color : null,
    };

    /**@type {CanvasRenderingContext2D}*/
    this.context = Animate._context;
  }

  /**
   *
   * this.format({
   *    x: 0,
   *    y: 0,
   *    text: '',
   *    type: FONT_TYPE_FILL,
   *    size: 12,
   *    align: FONT_ALIGN_LEFT,
   *    family: 'sans, serif',
   *    baseline : FONT_BASELINE_TOP,
   *    color : null,
   * })
   *    .print();
   *
   * @param textConfig
   * @returns {AnimateText}
   */
  format (textConfig) {
    this.config = textConfig ? {...this.config, ...textConfig} : this.config;
    this.context.font = `${this.config.size}px/${(this.config.size + 2)}px ${this.config.family}`;
    this.context.textAlign = this.config.align;
    this.context.textBaseline = this.config.baseline;
    return this;
  }

  text (text) {
    this.config.text = text;
    return this;
  }

  stroke () {
    if (this.config.color) this.context.strokeStyle = this.config.color;
    this.context.strokeText(this.config.text, this.config.x, this.config.y);
    return this;
  }

  fill () {
    if (this.config.color) this.context.fillStyle = this.config.color;
    this.context.fillText(this.config.text, this.config.x, this.config.y);
    return this;
  };

  print (text, posx, posy ) {
    if (isDefined(text)) this.config.text = text;
    if (isDefined(posx)) this.config.x = posx;
    if (isDefined(posy)) this.config.y = posy;

    switch (this.config.type) {
      case FONT_TYPE_FILL:
        this.fill();
        break;
      case FONT_TYPE_STROKE:
        this.stroke();
        break;
      default:
    }
    return this;
  }

  color (src) {
    this.config.color = src;
    return this;
  }

}


  
class AnimateLoader {

  constructor(Animate) {
    if (!(Animate instanceof AnimateApplication)) {
      throw new Error(':constructor argument in not of instance AnimateApplication');
    }

    /**@type {CanvasRenderingContext2D}*/
    this.context = Animate._context;
    this.global = Animate.getGlobal();
  }

  /**
   *  ( { myscript1: '/path/to/myscript1', }, function (list) {})
   *  ( [ '/path/to/myscript1', ], function (list) {})
   * @param src       Object, Array. items: key is ID, value is src
   * @param callback  Function called when all srcs is loaded
   * @param onerror   Function called when load is failed
   * @returns {*}
   */
  javascript(src, callback, onerror) {
    if (src && typeof src === 'object') {

      if (Array.isArray(src)) {
        let obj = {};
        src.map(function (item) {
          obj[Math.random().toString(32).slice(2)] = item
        });
        src = obj;
      }

      let length = Object.keys(src).length,
        key,
        script,
        scripts = {},
        iterator = 0;
      for (key in src) {
        script = document.createElement('script');
        script.src = (src[key].substr(-3) === '.js') ? src[key] : src[key] + '.js';
        script.type = 'application/javascript';
        script.id = key;
        script.onerror = onerror;
        script.onload = function (e) {
          scripts[this.id] = this;
          iterator++;
          if (iterator === length) {
            callback.call({}, scripts);
          }
        };
        this.global.head.appendChild(script);
      }
    }
  }

  /**
   * ({ img1: '/path/to/img1' }, function (list) {})
   * @param list {object}
   * @param callback {function}
   */
  image (list, callback) {
    if (list && typeof list === 'object') {
      const length = Object.keys(list).length;
      const loadedData = {};
      let name, iterator = 0;
      for (name in list) {
        const img = this.global.createElement('img');
        img.src = list[name];
        img.name = name;
        img.onload = function (e) {
          loadedData[this.name] = this;
          iterator++;
          if (iterator === length)
            callback.call({}, loadedData);
        };
      }
    }
  }

  img (src, callback) {
    const img = this.global.createElement("img");
    img.src = src;
    img.addEventListener("load", () => {
      callback.call(this, img)
    });
  }



  /**
   * ( {audio1: '/path/to/audio1', }, function (list) {})
   * @param list
   * @param callback
   */
  audio (list, callback) {
    if (list && typeof list === 'object') {
      const length = Object.keys(list).length;
      const loadedData = {};
      let name, iterator = 0;
      for (name in srcs) {
        const audio = document.createElement('audio');
        audio.src = list[name];
        audio.name = name;
        audio.preload = 'auto';
        loadedData[name] = audio;
        iterator++;
        if (iterator === length) {
          callback.call({}, loadedData);
        }
      }
    }
  }

  /**
   * ( { video1: '/path/to/video1', }, function (list) {})
   * @param list
   * @param callback
   */
  video (list, callback) {
    if (list && typeof list === 'object') {
      const length = Object.keys(list).length;
      const loadedData = {};
      let name, iterator = 0;
      for (name in list) {
        const video = this.global.createElement('video');
        video.src = list[name];
        video.name = name;
        video.preload = 'auto';
        loadedData[name] = video;
        iterator++;
        if (iterator === length)
          callback.call({}, loadedData);
      }
    }
  }


}

  
class AnimateGrid {

  constructor (Animate) {
    if ( !(Animate instanceof AnimateApplication) ) {
      throw new Error(':constructor argument in not of instance AnimateApplication');
    }

    this.canvas = Animate.getCanvas();
    this.global = Animate.getGlobal();
    this.Animate = Animate;

    /**@type {CanvasRenderingContext2D}*/
    this.context = Animate._context;

    this.cache = {};
  }

  /**
   * @param size          Grid step size. Default: 50
   * @param lineWidth     Толщина линии. Default: 0.5
   * @param color         Цвет линий. Default: '#efefef'
   */
  add (size, lineWidth, color, fullWidth, fullHeight) {
    const gridname = 'id_' + size +'_'+ lineWidth;

    if (this.cache[gridname]) {
      this.context.putImageData(this.cache[gridname], 0, 0);
    } else {
      let i,
        w = fullWidth || this.Animate.getWidth(),
        h = fullHeight || this.Animate.getHeight();

      size = size || 50;
      this.context.beginPath();

      for (i = 0; i < (w + size); i += size) {
        this.context.moveTo(i, 0);
        this.context.lineTo(i, h); }
      for (i = 0; i < (h + size); i += size) {
        this.context.moveTo(0, i);
        this.context.lineTo(w, i); }

      this.context.lineWidth = lineWidth || 0.5;
      this.context.strokeStyle = color || '#efefef';
      this.context.stroke();
      this.context.closePath();

      this.cache[gridname] = this.context.getImageData(0, 0, w, h);
    }
  }

}


  
class AnimateEffect {

  constructor (Animate) {
    if ( !(Animate instanceof AnimateApplication) ) {
      throw new Error(':constructor argument in not of instance AnimateApplication');
    }

    this.canvas = Animate.getCanvas();
    this.global = Animate.getGlobal();
    this.animate = Animate;

    /**@type {CanvasRenderingContext2D}*/
    this.context = Animate._context;

    this.fadeSpeed = 2;
  }

  fadeIn () {
    const ctx = this.context;
    return this.animate.movieclip(
      {c: 0, speed: this.fadeSpeed},
      function (callback) {
        if (this.c > 255) {
          callback();
          this.c = 0;
        } else {
          this.c += this.speed;
          const color = `rgba(${this.c}, ${this.c}, ${this.c}, 1)`;
          ctx.beginPath();
          ctx.fillStyle = color;
          ctx.fillRect(0, 0, this.animate.width, this.animate.height);
          ctx.closePath();
        }
      });
  }

  fadeOut () {
    const ctx = this.context;
    return this.animate.movieclip(
      {c: 255, speed: this.fadeSpeed},
      function (callback) {
        if (this.c < 0) {
          callback();
          this.c = 255;
        } else {
          this.c -= this.speed;
          const color = `rgba(${this.c}, ${this.c}, ${this.c}, 1)`;
          ctx.beginPath();
          ctx.fillStyle = color;
          ctx.fillRect(0, 0, this.animate.width, this.animate.height);
          ctx.closePath();
        }
      });
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

