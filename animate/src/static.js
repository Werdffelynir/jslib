

/**
 * Animation types
 * @type {string}
 */
Animate.LOOP_TIMER = 'timer';
Animate.LOOP_ANIMATE = 'animation';
Animate.DEGREE = 0.017453292519943295;
Animate.DEGREE_360 = Animate.DEGREE * 360;

/**
 * Storage of extensions
 * @type {Array}
 */
Animate._internal_extensions = [];

/**
 * Storage of static modules
 * @type {Array}
 */
Animate._external_modules = {};

/**
 * Add extensions in list, extensions executed when creating new instance
 *
 * @param func
 * @constructor
 */
Animate.Extension = function (func) {
  Animate._internal_extensions.push(func);
};

/**
 * Getter|Setter
 * Storage for static modules
 *
 * @param name    String
 * @param func    Function | Object
 * @constructor
 */
Animate.Module = function (name, func) {
  if (arguments.length === 1)
    return Animate._external_modules[name];
  if (arguments.length === 2)
    return Animate._external_modules[name] = func;
};

/**
 * Проверяет наличие значения
 * @param value         проверяемое значение
 * @param defaultValue  значение поумолчанию
 * @returns {boolean}
 */
Animate.isset = function (value, defaultValue) {
  var is = value !== undefined;
  return (defaultValue === undefined) ? is : ( is ? is : defaultValue);
};

/**
 * Marge object with defaultObject
 * @param defaultObject
 * @param object
 * @returns {*}
 */
Animate.defaultObject = function (defaultObject, object) {
  for (var key in object) {
    defaultObject[key] = object[key];
  }
  return defaultObject;
};

/**
 * Вернет обобщенный тип передаваемого параметра value,
 * или сравнит тип value с передаваемым type и вернет boolean
 * Поддержуемые значение типов: null, boolean, undefined, function, string, number, date, number, array, object
 * @param value
 * @param type
 * @returns {string}
 */
Animate.typeOf = function (value, type) {
  var types = ['null','boolean','undefined','function','string','number','date','number','array','object'],
      t = Animate.typeOfStrict(value).toLowerCase();

  if (types.indexOf(t) === -1 && typeof value === 'object')
    t = 'object';

  return typeof type === 'string' ? type.toLowerCase() === t : t;
};

/**
 * Вернет строгий/точный тип передаваемого параметра value,
 * или сравнит тип value с передаваемым type и вернет boolean
 * Возможные заначения: null, Boolean, undefined, Function, String, Number, Date, Number, Array, Object ...
 * для HTML елементов / объектов WebAPI возвращает имя объекта, например для <a> вернет HTMLAnchorElement
 * https://developer.mozilla.org/ru/docs/Web/API
 *
 * @param value
 * @param type
 * @returns {*}
 */
Animate.typeOfStrict = function (value, type) {
  var t = Object.prototype.toString.call(value).slice(8, -1);
  return typeof type === 'string' ? type === t : t;
};

/**
 * Clone an Array or Objects
 * @param src
 * @param args
 */
Animate.copy = function (src, args) {
  if (Animate.typeOf(src, 'function')) {
    return src.bind({}, args);

  } else if (Animate.typeOf(args, 'object') || Animate.typeOf(args, 'array')) {
    var cObject = JSON.parse(JSON.stringify(src));
    for (var i in args)
      cObject[i] = args[i];
    return cObject;
  }
};

/**
 * Generate a random number
 * @param min
 * @param max
 * @returns {number}
 */
Animate.random = function (min, max) {
  min = min || 0;
  max = max || 100;
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * Generate a random hex color
 * @returns {string}
 */
Animate.randomColor = function () {
  var letters = '0123456789ABCDEF'.split(''),
    color = '#';
  for (var i = 0; i < 6; i++)
    color += letters[Math.floor(Math.random() * 16)];
  return color;
};

/**
 * Return random item from array
 * @param arr
 * @returns {*}
 */
Animate.randomItem = function (arr) {
  var i = Animate.random(0, arr.length-1);
  return arr[i];
};

/**
 * Convert degrees to radians
 * Formula: degrees * Math.PI / 180
 * @param deg
 * @returns {number}
 */
Animate.degreesToRadians = function (deg) {
  return (deg * Math.PI) / 180;
};

/**
 * Convert radians to degrees
 * Formula: radians * 180 / Math.PI
 * @param rad
 * @returns {number}
 */
Animate.radiansToDegrees = function (rad) {
  return (rad * 180) / Math.PI;
};

/**
 * Calculate distance between two Points
 * @param p1
 * @param p2
 * @returns {number}
 */
Animate.distanceBetween = function (p1, p2) {
  var dx = p2.x - p1.x;
  var dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
};

/**
 * Calculate angle between two points. return object:
 *  {angle:, x:, y:}
 * @param p1
 * @param p2
 * @returns {{angle: number, x: number, y: number}}
 */
Animate.calculateAngle = function (p1, p2) {
  var dx = p2.x - p1.x;
  var dy = p2.y - p1.y;
  var angle = Math.atan2(dy, dx);
  return {
    angle: angle,
    x: Math.cos(angle),
    y: Math.sin(angle)
  };
};

/**
 * Create special object to indicate a point
 * @param x
 * @param y
 * @returns {{x: *, y: *}}
 */
Animate.Point = function (x, y) {
  x = Animate.isset(x, 0);
  y = Animate.isset(y, 0);
  var point = [x, y];
  point.x = x;
  point.y = y;
  return point;
};

/**
 * Create special object to indicate a rectangle
 * @param x
 * @param y
 * @param width
 * @param height
 * @returns {[*,*,*,*]}
 */
Animate.Rectangle = function (x, y, width, height) {
  var rect = [x, y, width, height];
  rect.x = x;
  rect.y = y;
  rect.width = width;
  rect.height = height;
  return rect;
};

/**
 * @param options       Object with properties
 * @param callback      Inside callback
 * @param thisInstance  Default or True copy all properties to `this` context
 * @returns {(function(this:T))|*}
 * @constructor
 */
Animate.Clip = function (options, callback, thisInstance) {
  return function () {
    return callback.bind(options).apply(thisInstance || {}, arguments || {})
  };
};


/**
 * Calculates the position and size of elements.
 *
 * @param elem
 * @returns {{y: number, x: number, width: number, height: number}}
 */
Animate.position = function (elem) {
  var data = {x: 0, y: 0, width: 0, height: 0};

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
      var rect = elem.getBoundingClientRect(),
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
      var top = 0, left = 0;
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

