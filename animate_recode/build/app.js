(function () {

  /**
   * Create Animate object
   *
   * ```
   * Example:
   * var an = new Animate({
   *    selector: '#canvas',
   *    width: 600,
   *    height: 400,
   *    fps: 30
   * });
   *
   * an.frame(function (ctx, i) {
   *    console.log(ctx, i);
   *    if (i > 60)
   *      an.stop();
   * });
   *
   * an.start();
   * ```
   */

  "use strict";

  window.requestAnimationFrame = function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function (f) {window.setTimeout(f, 1e3 / 60);}
  }();

  /**
   * Constructor
   *
   * ```
   * Example:
   * new Animate({ selector: '#canvas', width: 600, height: 400, fps: 30 });
   *
   * // Or
   *
   * new Animate('#canvas', 100, 100, 30);
   * ```
   *
   * @param config
   * @param width
   * @param height
   * @param fps
   * @returns {Animate}
   * @constructor
   */
  var Animate = function (config, width, height, fps) {
    if (!(this instanceof Animate)) return new Animate(config, width, height, fps);

    if (arguments.length > 1) {
      config = {selector: arguments[0], width: parseInt(arguments[1]), height: parseInt(arguments[2]), fps: arguments[3] || 0};
    }

    var _constructor = (function (config) {

  var pk,

    /** @type Animate */
    options = {

      // parameters
      selector: null,
      width: 600,
      height: 400,
      fps: 30,
      loop: Animate.LOOP_ANIMATE,
      fullScreen: false,
      autoStart: true,
      autoClear: true,
      sorting: true,
      filtering: true,

      // events
      onFrame: null,
      onMousemove: null,
      onMousedown: null,
      onMouseup: null,
      onKeyup: null,
      onKeydown: null,
      onClick: null,

      // internal
      _canvas: null,
      _context: null,
      _is_playing: false,
      _is_filtering: false,
      _iterator: 0,
      _frames: {},
      _current_frame_name: 'default',
      _loop_timer_id: null,
      _loop_animation_frame_id: null
    };

  // Set options
  Animate.defaultObject(options, config);

  for (pk in options)
    this[pk] = options[pk];

  /** @type {HTMLCanvasElement|Element|null} */
  this._canvas = document.querySelector(this.selector);

  if (Animate.typeOfStrict(this._canvas) !== 'HTMLCanvasElement')
    new Error('HTMLCanvasElement not found!');

  this._canvas.width = this.width;
  this._canvas.height = this.height;
  /** @type {CanvasRenderingContext2D|null} */
  this._context = this._canvas.getContext('2d');

  // initialize extensions
  if (Animate._internal_extensions.length > 0)
    for (var ei = 0; ei < Animate._internal_extensions.length; ei++)
      if (typeof Animate._internal_extensions[ei] === 'function')
        Animate._internal_extensions[ei].call(this, this);

  // custom settings
  if (this.fullScreen) this.resizeCanvas();

});

    _constructor.call(this, config);
  };

  

/**
 * Animation types
 * @type {string}
 */
Animate.LOOP_TIMER = 'timer';
Animate.LOOP_ANIMATE = 'animation';
Animate.ALIGN = {
  LEFT: 'left',
  RIGHT: 'right',
  CENTER: 'center',
  START: 'start',
  END: 'end',
};
Animate.BASELINE = {
  TOP: 'top',
  HANDING: 'hanging',
  MIDDLE: 'middle',
  ALPHABETIC: 'alphabetic',
  IDEOGRAPHIC: 'ideographic',
  BOTTOM: 'bottom',
};

/**
 * Storage of extensions
 * @type {Array}
 */
Animate._internal_extensions = [];

/**
 * Add extensions in loader
 * @param func
 * @constructor
 */
Animate.Extension = function (func) {
  Animate._internal_extensions.push(func);
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
 * @param addProperties
 */
Animate.copy = function (src, addProperties) {
  var copy_object = JSON.parse(JSON.stringify(src));
  if (NamespaceApplication.typeOf(addProperties, 'object') || NamespaceApplication.typeOf(addProperties, 'array'))
    for (var i in addProperties)
      copy_object[i] = addProperties[i];
  return copy_object;
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
    callback.apply(thisInstance || {}, arguments || {})
  };
};

/**
 * Loads a script element with javascript source
 *
 * @param src
 * @param onload
 * @param onerror
 * @returns {*}
 */
Animate.loadJS = function (src, onload, onerror) {
  if (!src) return null;
  if (Array.isArray(src)) {
    var i;
    for (i = 0; i < src.length; i ++) {
      Animate.loadJS( src[i], onload, onerror );
    }
  } else {
    var script = document.createElement('script'),
      id = "src-" + Math.random().toString(32).slice(2);

    script.src = (src.substr(-3) === '.js') ? src : src + '.js';
    script.type = 'application/javascript';
    script.id = id;
    script.onload = onload;
    script.onerror = onerror;

    document.head.appendChild(script);
    return script
  }
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


  ;

  
/**
 * Radians as degrees
 * @type {number}
 */
Animate.DEGREES_0 = 0;
Animate.DEGREES_1 = 0.017453292519943295;
Animate.DEGREES_2 = 0.03490658503988659;
Animate.DEGREES_3 = 0.05235987755982988;
Animate.DEGREES_4 = 0.06981317007977318;
Animate.DEGREES_5 = 0.08726646259971647;
Animate.DEGREES_6 = 0.10471975511965977;
Animate.DEGREES_7 = 0.12217304763960307;
Animate.DEGREES_8 = 0.13962634015954636;
Animate.DEGREES_9 = 0.15707963267948966;
Animate.DEGREES_10 = 0.17453292519943295;
Animate.DEGREES_11 = 0.19198621771937624;
Animate.DEGREES_12 = 0.20943951023931953;
Animate.DEGREES_13 = 0.22689280275926285;
Animate.DEGREES_14 = 0.24434609527920614;
Animate.DEGREES_15 = 0.2617993877991494;
Animate.DEGREES_16 = 0.2792526803190927;
Animate.DEGREES_17 = 0.29670597283903605;
Animate.DEGREES_18 = 0.3141592653589793;
Animate.DEGREES_19 = 0.3316125578789226;
Animate.DEGREES_20 = 0.3490658503988659;
Animate.DEGREES_21 = 0.3665191429188092;
Animate.DEGREES_22 = 0.3839724354387525;
Animate.DEGREES_23 = 0.40142572795869574;
Animate.DEGREES_24 = 0.41887902047863906;
Animate.DEGREES_25 = 0.4363323129985824;
Animate.DEGREES_26 = 0.4537856055185257;
Animate.DEGREES_27 = 0.47123889803846897;
Animate.DEGREES_28 = 0.4886921905584123;
Animate.DEGREES_29 = 0.5061454830783556;
Animate.DEGREES_30 = 0.5235987755982988;
Animate.DEGREES_31 = 0.5410520681182421;
Animate.DEGREES_32 = 0.5585053606381855;
Animate.DEGREES_33 = 0.5759586531581288;
Animate.DEGREES_34 = 0.5934119456780721;
Animate.DEGREES_35 = 0.6108652381980153;
Animate.DEGREES_36 = 0.6283185307179586;
Animate.DEGREES_37 = 0.6457718232379019;
Animate.DEGREES_38 = 0.6632251157578452;
Animate.DEGREES_39 = 0.6806784082777885;
Animate.DEGREES_40 = 0.6981317007977318;
Animate.DEGREES_41 = 0.715584993317675;
Animate.DEGREES_42 = 0.7330382858376184;
Animate.DEGREES_43 = 0.7504915783575616;
Animate.DEGREES_44 = 0.767944870877505;
Animate.DEGREES_45 = 0.7853981633974483;
Animate.DEGREES_46 = 0.8028514559173915;
Animate.DEGREES_47 = 0.8203047484373349;
Animate.DEGREES_48 = 0.8377580409572781;
Animate.DEGREES_49 = 0.8552113334772214;
Animate.DEGREES_50 = 0.8726646259971648;
Animate.DEGREES_51 = 0.890117918517108;
Animate.DEGREES_52 = 0.9075712110370514;
Animate.DEGREES_53 = 0.9250245035569946;
Animate.DEGREES_54 = 0.9424777960769379;
Animate.DEGREES_55 = 0.9599310885968813;
Animate.DEGREES_56 = 0.9773843811168246;
Animate.DEGREES_57 = 0.9948376736367678;
Animate.DEGREES_58 = 1.0122909661567112;
Animate.DEGREES_59 = 1.0297442586766543;
Animate.DEGREES_60 = 1.0471975511965976;
Animate.DEGREES_61 = 1.064650843716541;
Animate.DEGREES_62 = 1.0821041362364843;
Animate.DEGREES_63 = 1.0995574287564276;
Animate.DEGREES_64 = 1.117010721276371;
Animate.DEGREES_65 = 1.1344640137963142;
Animate.DEGREES_66 = 1.1519173063162575;
Animate.DEGREES_67 = 1.1693705988362006;
Animate.DEGREES_68 = 1.1868238913561442;
Animate.DEGREES_69 = 1.2042771838760873;
Animate.DEGREES_70 = 1.2217304763960306;
Animate.DEGREES_71 = 1.239183768915974;
Animate.DEGREES_72 = 1.2566370614359172;
Animate.DEGREES_73 = 1.2740903539558606;
Animate.DEGREES_74 = 1.2915436464758039;
Animate.DEGREES_75 = 1.3089969389957472;
Animate.DEGREES_76 = 1.3264502315156903;
Animate.DEGREES_77 = 1.3439035240356338;
Animate.DEGREES_78 = 1.361356816555577;
Animate.DEGREES_79 = 1.3788101090755203;
Animate.DEGREES_80 = 1.3962634015954636;
Animate.DEGREES_81 = 1.413716694115407;
Animate.DEGREES_82 = 1.43116998663535;
Animate.DEGREES_83 = 1.4486232791552935;
Animate.DEGREES_84 = 1.4660765716752369;
Animate.DEGREES_85 = 1.4835298641951802;
Animate.DEGREES_86 = 1.5009831567151233;
Animate.DEGREES_87 = 1.5184364492350666;
Animate.DEGREES_88 = 1.53588974175501;
Animate.DEGREES_89 = 1.5533430342749535;
Animate.DEGREES_90 = 1.5707963267948966;
Animate.DEGREES_91 = 1.5882496193148399;
Animate.DEGREES_92 = 1.605702911834783;
Animate.DEGREES_93 = 1.6231562043547263;
Animate.DEGREES_94 = 1.6406094968746698;
Animate.DEGREES_95 = 1.6580627893946132;
Animate.DEGREES_96 = 1.6755160819145563;
Animate.DEGREES_97 = 1.6929693744344996;
Animate.DEGREES_98 = 1.710422666954443;
Animate.DEGREES_99 = 1.7278759594743864;
Animate.DEGREES_100 = 1.7453292519943295;
Animate.DEGREES_101 = 1.7627825445142729;
Animate.DEGREES_102 = 1.780235837034216;
Animate.DEGREES_103 = 1.7976891295541593;
Animate.DEGREES_104 = 1.8151424220741028;
Animate.DEGREES_105 = 1.8325957145940461;
Animate.DEGREES_106 = 1.8500490071139892;
Animate.DEGREES_107 = 1.8675022996339325;
Animate.DEGREES_108 = 1.8849555921538759;
Animate.DEGREES_109 = 1.902408884673819;
Animate.DEGREES_110 = 1.9198621771937625;
Animate.DEGREES_111 = 1.9373154697137058;
Animate.DEGREES_112 = 1.9547687622336491;
Animate.DEGREES_113 = 1.9722220547535922;
Animate.DEGREES_114 = 1.9896753472735356;
Animate.DEGREES_115 = 2.007128639793479;
Animate.DEGREES_116 = 2.0245819323134224;
Animate.DEGREES_117 = 2.0420352248333655;
Animate.DEGREES_118 = 2.0594885173533086;
Animate.DEGREES_119 = 2.076941809873252;
Animate.DEGREES_120 = 2.0943951023931953;
Animate.DEGREES_121 = 2.111848394913139;
Animate.DEGREES_122 = 2.129301687433082;
Animate.DEGREES_123 = 2.1467549799530254;
Animate.DEGREES_124 = 2.1642082724729685;
Animate.DEGREES_125 = 2.1816615649929116;
Animate.DEGREES_126 = 2.199114857512855;
Animate.DEGREES_127 = 2.2165681500327987;
Animate.DEGREES_128 = 2.234021442552742;
Animate.DEGREES_129 = 2.251474735072685;
Animate.DEGREES_130 = 2.2689280275926285;
Animate.DEGREES_131 = 2.286381320112572;
Animate.DEGREES_132 = 2.303834612632515;
Animate.DEGREES_133 = 2.321287905152458;
Animate.DEGREES_134 = 2.3387411976724013;
Animate.DEGREES_135 = 2.356194490192345;
Animate.DEGREES_136 = 2.3736477827122884;
Animate.DEGREES_137 = 2.3911010752322315;
Animate.DEGREES_138 = 2.4085543677521746;
Animate.DEGREES_139 = 2.426007660272118;
Animate.DEGREES_140 = 2.443460952792061;
Animate.DEGREES_141 = 2.4609142453120043;
Animate.DEGREES_142 = 2.478367537831948;
Animate.DEGREES_143 = 2.4958208303518914;
Animate.DEGREES_144 = 2.5132741228718345;
Animate.DEGREES_145 = 2.5307274153917776;
Animate.DEGREES_146 = 2.548180707911721;
Animate.DEGREES_147 = 2.5656340004316647;
Animate.DEGREES_148 = 2.5830872929516078;
Animate.DEGREES_149 = 2.600540585471551;
Animate.DEGREES_150 = 2.6179938779914944;
Animate.DEGREES_151 = 2.6354471705114375;
Animate.DEGREES_152 = 2.6529004630313806;
Animate.DEGREES_153 = 2.670353755551324;
Animate.DEGREES_154 = 2.6878070480712677;
Animate.DEGREES_155 = 2.705260340591211;
Animate.DEGREES_156 = 2.722713633111154;
Animate.DEGREES_157 = 2.740166925631097;
Animate.DEGREES_158 = 2.7576202181510405;
Animate.DEGREES_159 = 2.775073510670984;
Animate.DEGREES_160 = 2.792526803190927;
Animate.DEGREES_161 = 2.8099800957108703;
Animate.DEGREES_162 = 2.827433388230814;
Animate.DEGREES_163 = 2.844886680750757;
Animate.DEGREES_164 = 2.8623399732707;
Animate.DEGREES_165 = 2.8797932657906435;
Animate.DEGREES_166 = 2.897246558310587;
Animate.DEGREES_167 = 2.9146998508305306;
Animate.DEGREES_168 = 2.9321531433504737;
Animate.DEGREES_169 = 2.949606435870417;
Animate.DEGREES_170 = 2.9670597283903604;
Animate.DEGREES_171 = 2.9845130209103035;
Animate.DEGREES_172 = 3.0019663134302466;
Animate.DEGREES_173 = 3.01941960595019;
Animate.DEGREES_174 = 3.036872898470133;
Animate.DEGREES_175 = 3.0543261909900763;
Animate.DEGREES_176 = 3.07177948351002;
Animate.DEGREES_177 = 3.0892327760299634;
Animate.DEGREES_178 = 3.106686068549907;
Animate.DEGREES_179 = 3.12413936106985;
Animate.DEGREES_180 = 3.141592653589793;
Animate.DEGREES_181 = 3.159045946109736;
Animate.DEGREES_182 = 3.1764992386296798;
Animate.DEGREES_183 = 3.193952531149623;
Animate.DEGREES_184 = 3.211405823669566;
Animate.DEGREES_185 = 3.2288591161895095;
Animate.DEGREES_186 = 3.2463124087094526;
Animate.DEGREES_187 = 3.2637657012293966;
Animate.DEGREES_188 = 3.2812189937493397;
Animate.DEGREES_189 = 3.2986722862692828;
Animate.DEGREES_190 = 3.3161255787892263;
Animate.DEGREES_191 = 3.3335788713091694;
Animate.DEGREES_192 = 3.3510321638291125;
Animate.DEGREES_193 = 3.368485456349056;
Animate.DEGREES_194 = 3.385938748868999;
Animate.DEGREES_195 = 3.4033920413889422;
Animate.DEGREES_196 = 3.420845333908886;
Animate.DEGREES_197 = 3.438298626428829;
Animate.DEGREES_198 = 3.455751918948773;
Animate.DEGREES_199 = 3.473205211468716;
Animate.DEGREES_200 = 3.490658503988659;
Animate.DEGREES_201 = 3.5081117965086026;
Animate.DEGREES_202 = 3.5255650890285457;
Animate.DEGREES_203 = 3.543018381548489;
Animate.DEGREES_204 = 3.560471674068432;
Animate.DEGREES_205 = 3.5779249665883754;
Animate.DEGREES_206 = 3.5953782591083185;
Animate.DEGREES_207 = 3.6128315516282616;
Animate.DEGREES_208 = 3.6302848441482056;
Animate.DEGREES_209 = 3.6477381366681487;
Animate.DEGREES_210 = 3.6651914291880923;
Animate.DEGREES_211 = 3.6826447217080354;
Animate.DEGREES_212 = 3.7000980142279785;
Animate.DEGREES_213 = 3.717551306747922;
Animate.DEGREES_214 = 3.735004599267865;
Animate.DEGREES_215 = 3.752457891787808;
Animate.DEGREES_216 = 3.7699111843077517;
Animate.DEGREES_217 = 3.787364476827695;
Animate.DEGREES_218 = 3.804817769347638;
Animate.DEGREES_219 = 3.822271061867582;
Animate.DEGREES_220 = 3.839724354387525;
Animate.DEGREES_221 = 3.8571776469074686;
Animate.DEGREES_222 = 3.8746309394274117;
Animate.DEGREES_223 = 3.8920842319473548;
Animate.DEGREES_224 = 3.9095375244672983;
Animate.DEGREES_225 = 3.9269908169872414;
Animate.DEGREES_226 = 3.9444441095071845;
Animate.DEGREES_227 = 3.9618974020271276;
Animate.DEGREES_228 = 3.979350694547071;
Animate.DEGREES_229 = 3.9968039870670142;
Animate.DEGREES_230 = 4.014257279586958;
Animate.DEGREES_231 = 4.031710572106902;
Animate.DEGREES_232 = 4.049163864626845;
Animate.DEGREES_233 = 4.066617157146788;
Animate.DEGREES_234 = 4.084070449666731;
Animate.DEGREES_235 = 4.101523742186674;
Animate.DEGREES_236 = 4.118977034706617;
Animate.DEGREES_237 = 4.136430327226561;
Animate.DEGREES_238 = 4.153883619746504;
Animate.DEGREES_239 = 4.171336912266447;
Animate.DEGREES_240 = 4.1887902047863905;
Animate.DEGREES_241 = 4.2062434973063345;
Animate.DEGREES_242 = 4.223696789826278;
Animate.DEGREES_243 = 4.241150082346221;
Animate.DEGREES_244 = 4.258603374866164;
Animate.DEGREES_245 = 4.276056667386107;
Animate.DEGREES_246 = 4.293509959906051;
Animate.DEGREES_247 = 4.310963252425994;
Animate.DEGREES_248 = 4.328416544945937;
Animate.DEGREES_249 = 4.34586983746588;
Animate.DEGREES_250 = 4.363323129985823;
Animate.DEGREES_251 = 4.380776422505767;
Animate.DEGREES_252 = 4.39822971502571;
Animate.DEGREES_253 = 4.4156830075456535;
Animate.DEGREES_254 = 4.4331363000655974;
Animate.DEGREES_255 = 4.4505895925855405;
Animate.DEGREES_256 = 4.468042885105484;
Animate.DEGREES_257 = 4.485496177625427;
Animate.DEGREES_258 = 4.50294947014537;
Animate.DEGREES_259 = 4.520402762665313;
Animate.DEGREES_260 = 4.537856055185257;
Animate.DEGREES_261 = 4.5553093477052;
Animate.DEGREES_262 = 4.572762640225144;
Animate.DEGREES_263 = 4.590215932745087;
Animate.DEGREES_264 = 4.60766922526503;
Animate.DEGREES_265 = 4.625122517784973;
Animate.DEGREES_266 = 4.642575810304916;
Animate.DEGREES_267 = 4.6600291028248595;
Animate.DEGREES_268 = 4.677482395344803;
Animate.DEGREES_269 = 4.694935687864747;
Animate.DEGREES_270 = 4.71238898038469;
Animate.DEGREES_271 = 4.729842272904633;
Animate.DEGREES_272 = 4.747295565424577;
Animate.DEGREES_273 = 4.76474885794452;
Animate.DEGREES_274 = 4.782202150464463;
Animate.DEGREES_275 = 4.799655442984406;
Animate.DEGREES_276 = 4.817108735504349;
Animate.DEGREES_277 = 4.834562028024293;
Animate.DEGREES_278 = 4.852015320544236;
Animate.DEGREES_279 = 4.869468613064179;
Animate.DEGREES_280 = 4.886921905584122;
Animate.DEGREES_281 = 4.9043751981040655;
Animate.DEGREES_282 = 4.921828490624009;
Animate.DEGREES_283 = 4.939281783143953;
Animate.DEGREES_284 = 4.956735075663896;
Animate.DEGREES_285 = 4.97418836818384;
Animate.DEGREES_286 = 4.991641660703783;
Animate.DEGREES_287 = 5.009094953223726;
Animate.DEGREES_288 = 5.026548245743669;
Animate.DEGREES_289 = 5.044001538263612;
Animate.DEGREES_290 = 5.061454830783555;
Animate.DEGREES_291 = 5.078908123303498;
Animate.DEGREES_292 = 5.096361415823442;
Animate.DEGREES_293 = 5.113814708343385;
Animate.DEGREES_294 = 5.131268000863329;
Animate.DEGREES_295 = 5.1487212933832724;
Animate.DEGREES_296 = 5.1661745859032155;
Animate.DEGREES_297 = 5.183627878423159;
Animate.DEGREES_298 = 5.201081170943102;
Animate.DEGREES_299 = 5.218534463463045;
Animate.DEGREES_300 = 5.235987755982989;
Animate.DEGREES_301 = 5.253441048502932;
Animate.DEGREES_302 = 5.270894341022875;
Animate.DEGREES_303 = 5.288347633542818;
Animate.DEGREES_304 = 5.305800926062761;
Animate.DEGREES_305 = 5.323254218582705;
Animate.DEGREES_306 = 5.340707511102648;
Animate.DEGREES_307 = 5.358160803622591;
Animate.DEGREES_308 = 5.375614096142535;
Animate.DEGREES_309 = 5.3930673886624785;
Animate.DEGREES_310 = 5.410520681182422;
Animate.DEGREES_311 = 5.427973973702365;
Animate.DEGREES_312 = 5.445427266222308;
Animate.DEGREES_313 = 5.462880558742251;
Animate.DEGREES_314 = 5.480333851262194;
Animate.DEGREES_315 = 5.497787143782138;
Animate.DEGREES_316 = 5.515240436302081;
Animate.DEGREES_317 = 5.532693728822025;
Animate.DEGREES_318 = 5.550147021341968;
Animate.DEGREES_319 = 5.567600313861911;
Animate.DEGREES_320 = 5.585053606381854;
Animate.DEGREES_321 = 5.602506898901797;
Animate.DEGREES_322 = 5.6199601914217405;
Animate.DEGREES_323 = 5.6374134839416845;
Animate.DEGREES_324 = 5.654866776461628;
Animate.DEGREES_325 = 5.672320068981571;
Animate.DEGREES_326 = 5.689773361501514;
Animate.DEGREES_327 = 5.707226654021458;
Animate.DEGREES_328 = 5.7246799465414;
Animate.DEGREES_329 = 5.742133239061344;
Animate.DEGREES_330 = 5.759586531581287;
Animate.DEGREES_331 = 5.777039824101231;
Animate.DEGREES_332 = 5.794493116621174;
Animate.DEGREES_333 = 5.811946409141117;
Animate.DEGREES_334 = 5.829399701661061;
Animate.DEGREES_335 = 5.8468529941810035;
Animate.DEGREES_336 = 5.8643062867009474;
Animate.DEGREES_337 = 5.88175957922089;
Animate.DEGREES_338 = 5.899212871740834;
Animate.DEGREES_339 = 5.916666164260777;
Animate.DEGREES_340 = 5.934119456780721;
Animate.DEGREES_341 = 5.951572749300663;
Animate.DEGREES_342 = 5.969026041820607;
Animate.DEGREES_343 = 5.986479334340551;
Animate.DEGREES_344 = 6.003932626860493;
Animate.DEGREES_345 = 6.021385919380437;
Animate.DEGREES_346 = 6.03883921190038;
Animate.DEGREES_347 = 6.056292504420323;
Animate.DEGREES_348 = 6.073745796940266;
Animate.DEGREES_349 = 6.09119908946021;
Animate.DEGREES_350 = 6.108652381980153;
Animate.DEGREES_351 = 6.126105674500097;
Animate.DEGREES_352 = 6.14355896702004;
Animate.DEGREES_353 = 6.161012259539983;
Animate.DEGREES_354 = 6.178465552059927;
Animate.DEGREES_355 = 6.19591884457987;
Animate.DEGREES_356 = 6.213372137099814;
Animate.DEGREES_357 = 6.230825429619756;
Animate.DEGREES_358 = 6.2482787221397;
Animate.DEGREES_359 = 6.265732014659642;
Animate.DEGREES_360 = 6.283185307179586;

  ;

  
/**
 * Module of Expansion
 * Assign static as instance methods
 */
Animate.prototype.createClip = Animate.Clip;
Animate.prototype.point = Animate.Point;
Animate.prototype.rectangle = Animate.Rectangle;
Animate.prototype.loadJS = Animate.loadJS;
Animate.prototype.defaultObject = Animate.defaultObject;
Animate.prototype.copy = Animate.copy;
Animate.prototype.random = Animate.random;
Animate.prototype.randomColor = Animate.randomColor;
Animate.prototype.randomItem = Animate.randomItem;
Animate.prototype.degreesToRadians = Animate.degreesToRadians;
Animate.prototype.radiansToDegrees = Animate.radiansToDegrees;
Animate.prototype.distanceBetween = Animate.distanceBetween;
Animate.prototype.calculateAngle = Animate.calculateAngle;
Animate.prototype.position = Animate.position;

  ;

  
Animate.prototype.one = function () {};

/**
 * Return HTMLCanvasElement
 * @type HTMLCanvasElement
 */
Animate.prototype.getCanvas = function () {
  return this._canvas;
};


/**
 * Return CanvasRenderingContext2D
 * @type CanvasRenderingContext2D
 */
Animate.prototype.getContext = function () {
  return this._context;
};

/**
 * @returns {number}
 */
Animate.prototype.getWidth = function () {
  return this._canvas.width;
};

/**
 * @returns {string}
 */
Animate.prototype.getFrameName = function () {
  return this._frame_name;
};

/**
 * @returns {number}
 */
Animate.prototype.getHeight = function () {
  return this._canvas.height;
};

/**
 * Return current iteration
 * @returns {number}
 */
Animate.prototype.getIteration = function () {
  return this._iterator;
};

/**
 * Clear a number of iterations
 */
Animate.prototype.clearIteration = function () {
  this._iterator = 0;
};

/**
 * Return `true` if move is playing, or `false`
 * @returns {boolean}
 */
Animate.prototype.isPlay = function () {
  return this._is_playing;
};

/**
 * Add frame in to each iteration.
 * Return instance index
 * .frame (name, sceneObject)
 * .frame (sceneObject)
 * .frame (function (ctx, i) {})
 * @param frameName
 * @param sceneObject
 * @returns {{index: number, hide: boolean, name: string, init: null}|*}
 */
Animate.prototype.frame = function (frameName, sceneObject) {
  if (arguments.length === 1) {
    if (frameName && (typeof frameName === 'function' || typeof frameName === 'object')) {
      sceneObject = frameName;
      frameName = this._frame_name;
    }
  }
  sceneObject = this.createSceneObject(sceneObject);

  if (!Array.isArray(this._frames[frameName]))
    this._frames[frameName] = [];

  this._frames[frameName].push(sceneObject);
  return sceneObject;
};

/**
 * Remove frame by frame name
 * @param frameName
 */
Animate.prototype.frameRemove = function (frameName) {
  if (this._frames[frameName]) {
    this._frames[frameName] = [];
  }
};

/**
 * Start\Restart animation
 * @param frameName
 */
Animate.prototype.start = function (frameName) {
  this.stop();
  this.play(frameName || this._frame_name);
};

/**
 * Play animation
 * @param frameName
 */
Animate.prototype.play = function (frameName) {

  // initialize events
  this._events_initialize();

  if (!this._is_playing && this._context) {

    // set current frame name
    this._frame_name = frameName;

    if (this.fps === 0 || this.fps === false) {
      this._internal_drawframe.call(this);
    } else if (this.loop === Animate.LOOP_ANIMATE) {
      this._loop_animation_frame();
      this._is_playing = true;
    } else if (this.loop === Animate.LOOP_TIMER) {
      this._loop_timer();
      this._is_playing = true;
    }
  }
};

/**
 * Stop animation
 */
Animate.prototype.stop = function () {
  if (this._is_playing) {
    if (this.loop === Animate.LOOP_ANIMATE) {
      cancelAnimationFrame(this._loop_animation_frame_id);
      this._is_playing = false;
    } else if (this.loop === Animate.LOOP_TIMER) {
      clearTimeout(this._loop_timer_id);
      this._is_playing = false;
    }
  }
};

Animate.prototype._internal_drawframe = function () {
  var i,
    frame,
    frames = this._frames[this._frame_name];

  this._iterator++;

  if (this.autoClear === true)
    this.clear();

  // call onFrame
  if (typeof this.onFrame === 'function')
    this.onFrame.call(this, this._context, this._iterator);

  if (Array.isArray(frames)) {
    if (!this._is_filtering && frames.length > 0) {
      if (!!this.sorting)
        frames = frames.sort(function (one, two) {
          return one['index'] > two['index']
        });
      if (!!this.filtering)
        frames = frames.filter(function (val) {
          return !val['hide']
        });
      this._is_filtering = true;
    }
    for (i = 0; i < frames.length; i++) {
      frame = frames[i];

      // call frames
      if (typeof frame.init === 'function')
        frame.init.call(frame, this._context, this._iterator);
    }
  }
};

Animate.prototype._loop_timer = function () {
  var that = this;
  var fps = this.fps || 30;
  var interval = 1000 / fps;

  return (function loop(time) {
    that._loop_timer_id = setTimeout(loop, interval);
    // call the draw method
    that._internal_drawframe.call(that);
  }());
};

Animate.prototype._loop_animation_frame = function () {
  var that = this;
  var then = new Date().getTime();
  var fps = this.fps || 30;
  var interval = 1000 / fps;

  return (function loop(time) {
    that._loop_animation_frame_id = requestAnimationFrame(loop);
    var now = new Date().getTime();
    var delta = now - then;
    if (delta > interval) {
      then = now - (delta % interval);
      that._internal_drawframe.call(that);
    }
  }(0));
};

/**
 * Clear canvas workspace
 */
Animate.prototype.clear = function () {
  this._context.clearRect(0, 0, this.width, this.height);
};

/**
 * Set camera position and scales
 * @param x         camera position y
 * @param y         camera position x
 * @param wight     camera wight
 * @param callback  function a clip
 */
Animate.prototype.camera = function (x, y, wight, callback) {
  /** @type CanvasRenderingContext2D */
  var ctx = this.getContext();
  var i = this.getIteration();
  var scale = this.width / wight;
  ctx.save();
  ctx.translate(-x - this.camera.position.x, -y - this.camera.position.y);
  ctx.scale(scale, scale);
  callback(ctx, i);
  ctx.restore();
  return this.camera.position;
};
Animate.prototype.camera.position = {x: 0, y: 0};

/**
 * Restore camera position and scales
 */
Animate.prototype.cameraRestore = function () {
  this.getContext().translate(0, 0);
  this.getContext().scale(scale, scale);
};

/**
 * Set resize canvas
 * @param width     default: fullscreen 'window.innerWidth'
 * @param height    default: fullscreen 'window.innerHeight'
 * @param position  default: 'absolute'
 */
Animate.prototype.resizeCanvas = function (width, height, position) {
  if (position !== undefined)
    this._canvas.style.position = position || 'absolute';

  this._canvas.width = this.width = parseInt(width) || window.innerWidth;
  this._canvas.height = this.height = parseInt(height) || window.innerHeight;
};

/**
 * Set background color for canvas element
 * @param color
 */
Animate.prototype.backgroundColor = function (color) {
  if (this._canvas.style.backgroundColor !== color)
    this._canvas.style.backgroundColor = color;
};

/**
 * Set background Image for canvas element
 * @param img Url
 */
Animate.prototype.backgroundImage = function (img, opts) {
  if (this._canvas.style.backgroundImage !== img)
    this._canvas.style.backgroundImage = 'url(' + img + ')';

  if (opts && typeof opts === 'object') {
    var n, defOpts = {
      size: 'backgroundSize',
      repeat: 'backgroundRepeat',
      position: 'backgroundPosition',
      positionX: 'backgroundPositionX',
      positionY: 'backgroundPositionY',
      origin: 'backgroundOrigin',
      clip: 'backgroundClip',
      blendMode: 'backgroundBlendMode',
      attachment: 'backgroundAttachment'
    };

    for (n in defOpts) {
      if (opts[n] !== undefined)
        this._canvas.style[defOpts[n]] = opts[n];
    }

  }
};

/**
 * Hit point inside rectangle
 * @param rectangle
 * @param point
 * @returns {boolean}
 */
Animate.prototype.hitTest = function (rectangle, point) {
  var x = parseInt(point.x), y = parseInt(point.y);
  return x > rectangle[0] &&
    y > rectangle[1] &&
    x < rectangle[0] + rectangle[2] &&
    y < rectangle[1] + rectangle[3];
};

/**
 * isPointInPath
 * @param point
 * @param y
 * @returns {boolean}
 */
Animate.prototype.hitTestPoint = function (point, y) {
  if (arguments.length === 2)
    point = {x: point, y: y};

  return this._context.isPointInPath(point.x, point.y);
};

/**
 * Return point object
 * @param event     MouseEvent
 * @returns {{x: number, y: number}}
 */
Animate.prototype.mousePosition = function (event) {
  if (!(event instanceof MouseEvent)) {
    console.error('Error: argument is not type the MouseEvent!');
    return;
  }
  var rect = this._canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
};

Animate.prototype.toString = function () {
  return '[object Animate]'
};


/**
 * Prototype of Super Objects
 */


/**
 * Special object for method frame
 * @param sceneObject
 * @returns {{index: number, hide: boolean, name: string, init: null}}
 */
Animate.prototype.createSceneObject = function (sceneObject) {
  var sceneObjectDefault = {
    index: 100,
    hide: false,
    name: 'scene',
    init: null
  };

  if (typeof sceneObject === 'function')
    sceneObject = {init: sceneObject};

  Animate.defaultObject(sceneObjectDefault, sceneObject);
  return sceneObjectDefault;
};

/**
 *
 * @param options
 * @param callback
 * @param thisInstance      if `true` prototype = options
 * @returns {clip}
 * @constructor
 */
Animate.prototype.createMovieClip = function (options, callback, thisInstance) {
  var clip,
    key,
    ctx = this._context;

  var default_options = {
    x: 0,
    y: 0,
    transform: false,
    composite: false,
    rotate: false,
    rotation: false,
    scale: false,
    alpha: false,
    instance: this
  };

  for (key in default_options) {
    if (options[key] === undefined)
      options[key] = default_options[key];
  }

  var func = function () {
    // draw image
    ctx.save();
    ctx.translate(this.x, this.y);

    if (this.transform) {
      CanvasRenderingContext2D.prototype.setTransform.apply(ctx, this.transform);
    }
    if (this.scale) {
      CanvasRenderingContext2D.prototype.scale.apply(ctx, this.scale);
    }
    if (this.rotate) {
      ctx.rotate(this.rotate);
    }
    if (this.rotation) {
      ctx.rotate(Animate.degreesToRadians(this.rotation));
    }
    if (this.alpha) {
      ctx.globalAlpha = this.alpha;
    }
    if (this.composite) {
      ctx.globalCompositeOperation = this.composite;
    }
    callback.apply(this, arguments);
    ctx.restore();

    this.setTransform = function () {this.transform = arguments};
    this.setScale = function () {this.scale = arguments};
    this.setRotate = function () {this.rotate = arguments[0]};
    this.setRotation = function () {this.rotation = arguments[0]};
    this.setAlpha = function () {this.alpha = arguments[0]};
    this.setComposite = function () {this.composite = arguments[0]};

    // return self context
    return this;
  };

  clip = Animate.Clip(options, func, thisInstance);
  return clip;
};

/**
 * var sprite = an.createSprite({
     *      x: 0,
     *      y: 0,
     *      width: 50,
     *      height: 50,
     *      image: HTMLImageElement,
     *      grid: [3, 2],
     *      indexes: [0,1,2,3,4,5],
     *      delay: 1,
     *      loop: false
     * });
 * sprite();
 * @param options
 * @returns {clip|*}
 */
Animate.prototype.createSprite = function (options) {
  var i, key, movieclip, default_options = {

    // parameters
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    image: null,
    grid: [1, 1],
    indexes: [],
    delay: 0,
    loop: true,
    point: {x: 0, y: 0},

    // internal
    _map: [],
    _image_width: 0,
    _image_height: 0,
    _sprite_width: 0,
    _sprite_height: 0,
    _map_index: false,
    _rea_index: false
  };

  // to default
  for (key in default_options) {
    if (options[key] === undefined)
      options[key] = default_options[key];
  }

  var grid_count = options['grid'][0] * options['grid'][1];

  // verify the 'image'
  if (!(options['image'] instanceof HTMLImageElement) && !(options['image'] instanceof Image))
    throw Error('The source image is not instanceof of [Image]');

  // set default indexes
  if (options['indexes'].length == 0) {
    for (i = 0; i < grid_count; i++)
      options['indexes'][i] = i;
  }

  // create maps
  for (i = 0; i < grid_count; i++) {
    options['_map'][i] = {
      index: i,
      sx: parseInt(i % options['grid'][0]) * options['width'],
      sy: parseInt(i / options['grid'][0]) * options['width']
    };
  }

  // Sprite based on MovieClip
  movieclip = this.createMovieClip(options, function () {
    var i, k,
      ctx = this['instance']._context,
      iterator = this['instance']._iterator;

    if (arguments.length === 1 && arguments[0] && typeof arguments[0] === 'object')
      for (k in arguments[0]) this[k] = arguments[0][k];

    if (this['_image_width'] === 0 && this['_image_height'] === 0) {
      this['_image_width']   = this['image'].naturalWidth || this['image'].width;
      this['_image_height']  = this['image'].naturalHeight || this['image'].height;
      this['_sprite_width']  = this['_image_width'] / this['grid'][0];
      this['_sprite_height'] = this['_image_height'] / this['grid'][1];
      this['_rea_index'] = 0;
    }

    // calc index in map
    this['_map_index'] = this['indexes'][this['_rea_index']];

    // get map part, sprite part
    var source = this['_map'][this['_map_index']];

    // base draw
    ctx.drawImage(this['image'],
      // source
      source.sx, source.sy, this['_sprite_width'], this['_sprite_height'],
      // draw
      this['point'].x, this['point'].y, this['width'], this['height']
    );

    // steps in map
    if (this['indexes'].length > 1 && iterator % this['delay'] === 0) {
      if (this['indexes'][this['_rea_index'] + 1] !== undefined) {
        this['_rea_index'] += 1;
      } else
      if (this['loop'])
        this['_rea_index'] = 0;
    }

    // return self context
    this.getIndex = this['_map_index'];
    this.getIndexsCount = this['_map'].length - 1;
    this.reset = function () {
      this['_rea_index'] = 0;
    };

    return this;
  }, true);

  return movieclip
};

Animate.prototype._events_initialize = function () {

  var that = this;

  // onclick event
  if (typeof this.onClick === 'function' && !this._on_click_init) {
    this._canvas.addEventListener('click', function (event) {
      that.onClick.call(that, event, that.mousePosition(event))
    });
    this._on_click_init = true;
  }

  // onmousemove event
  if (typeof this.onMousemove === 'function' && !this._on_mousemove_init) {
    this._canvas.addEventListener('mousemove', function (event) {
      that.onMousemove.call(that, event, that.mousePosition(event))
    });
    this._on_mousemove_init = true;
  }

  // onmousedown event
  if (typeof this.onMousedown === 'function' && !this._on_mousedown_init) {
    this._canvas.addEventListener('mousedown', function (event) {
      that.onMousedown.call(that, event, that.mousePosition(event))
    });
    this._on_mousedown_init = true;
  }

  // onmouseup event
  if (typeof this.onMouseup === 'function' && !this._on_mouseup_init) {
    this._canvas.addEventListener('mouseup', function (event) {
      that.onMouseup.call(that, event, that.mousePosition(event))
    });
    this._on_mouseup_init = true;
  }

  // onkeydown event
  if (typeof this.onKeydown === 'function' && !this._on_keydown_init) {
    window.addEventListener('keydown', function (event) {
      that.onKeydown.call(that, event)
    });
    this._on_keydown_init = true;
  }

  // onkeyup event
  if (typeof this.onKeyup === 'function' && !this._on_keyup_init) {
    window.addEventListener('keyup', function (event) {
      that.onKeyup.call(that, event)
    });
    this._on_keyup_init = true;
  }
};


  ;

  /**
 * app.keyPress()                              (out loop use) return info about this method
 * app.keyPress('ArrowUp')                     (in loop use) return bool. true - when press 'ArrowUp'
 * app.keyPress('ArrowUp', function(){})       (in loop use) execute function when press 'ArrowUp'
 * app.keyPress(function(){})                  (out loop use) execute function every time when press any key
 * app.keyPress(function(){}, function(){})    (out loop use) execute function1 for keyDown and function1 for keyUp
 *
 * @param key         key (key, code, keyCode) or callback
 * @param callback    callback
 * @returns {*}
 */
Animate.prototype.keyPress = function (key, callback) {
  if (this.keyPress._keys === false)
    this.keyPress._init_once_click_listener();

  if (arguments.length === 0) {
    return this.keyPress.info();
    
  } 
  else if (typeof key === 'string') {
    if (typeof callback === 'function') {
      if (this.keyPress._keys[arguments[0]])
        callback.call(null, this.keyPress._keys[arguments[0]]);
    }
    return !!this.keyPress._keys[arguments[0]];

  } 
  else if (typeof key === 'function') {
    this.keyPress._keydown_callbacks.push(key);
    if (typeof callback === 'function')
      this.keyPress._keyup_callbacks.push(callback);
  }
};

Animate.prototype.keyPress._keys = false;

Animate.prototype.keyPress._keyup_callbacks = [];

Animate.prototype.keyPress._keydown_callbacks = [];

Animate.prototype.keyPress._init_once_click_listener = function () {
  if (this.keyPress._keys === false) {
    this.keyPress._keys = {};

    window.addEventListener('keydown', function (event) {
      if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
      }

      for (var i = 0; i < this.keyPress._keydown_callbacks.length; i++) {
        if (typeof this.keyPress._keydown_callbacks[i] === 'function') {
          this.keyPress._keydown_callbacks[i].call(null, event);
        }
      }

      this.keyPress._keys[event.keyCode] = event;

      if (event.key)
        this.keyPress._keys[event.key]  = this.keyPress._keys[event.keyCode];

      if (event.code)
        this.keyPress._keys[event.code] = this.keyPress._keys[event.keyCode];

    });

    window.addEventListener('keyup', function (event) {
      if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
      }

      for (var i = 0; i < this.keyPress._keyup_callbacks.length; i++) {
        if (typeof this.keyPress._keyup_callbacks[i] === 'function') {
          this.keyPress._keyup_callbacks[i].call(null, event);
        }
      }

      delete this.keyPress._keys[event.key];
      delete this.keyPress._keys[event.code];
      delete this.keyPress._keys[event.keyCode];
    });
  }
};

/**
 * Keys info
 * @returns {string}
 */
Animate.prototype.keyPress.info = function () {
  var codes = "" +
    "Event keydown/keyup                                      \n" +
    "key         code        keyCode     Key pressed          \n" +
    "_________________________________________________________\n" +
    "Backspace   Backspace   8           Backspace\n" +
    "Tab         Tab         9           Tab\n" +
    "Enter       Enter       13          Enter\n" +
    "Shift       ShiftLeft   16          Shift\n" +
    "Control     ControlLeft 17          Ctrl\n" +
    "Alt         AltLeft     18          Alt\n" +
    "Pause       Pause       19          Pause, Break\n" +
    "            CapsLock    20          CapsLock\n" +
    "Escape      Escape      27          Esc\n" +
    "' '         Space       32          Space\n" +
    "PageUp      PageUp      33          Page Up\n" +
    "PageDown    PageDown    34          Page Down\n" +
    "End         End         35          End\n" +
    "Home        Home        36          Home\n" +
    "ArrowLeft   ArrowLeft   37          Left arrow\n" +
    "ArrowUp     ArrowUp     38          Up arrow\n" +
    "ArrowRight  ArrowRight  39          Right arrow\n" +
    "ArrowDown   ArrowDown   40          Down arrow\n" +
    "                        44          PrntScrn\n" +
    "                        45          Insert\n" +
    "                        46          Delete\n" +
    "1           Digit1      48-57       0 to 9\n" +
    "a           KeyA        65-90       A to Z\n" +
    "                        91          WIN Key (Start)\n" +
    "                        93          WIN Menu\n" +
    "                        112-123     F1 to F12\n" +
    "                        144         NumLock\n" +
    "                        145         ScrollLock\n" +
    "                        188         , <\n" +
    "                        190         . >\n" +
    "                        191         / ?\n" +
    "`           Backquote   192         ` ~\n" +
    "                        219         [ {\n" +
    "                        220         \ |\n" +
    "                        221         ] }\n" +
    "                        222         ' \"\n";

  console.info(codes);
  return codes;
}

  ;

  
/**
 * .mousePress()         (in loop use) return position point object if mouse click, or false
 * .mousePress(callback) (in loop use) execute function if mouse click with argument point object
 *
 * @param callback
 * @returns {*}
 */
Animate.prototype.mousePress = function (callback) {

  if (this.mousePress._is_init === false)
    this.mousePress._init_once_click_listener();

  if (this.mousePress._position && typeof callback === 'function')
    callback.call(null, this.mousePress._position);

  return this.mousePress._position;
};

Animate.prototype.mousePress._position = false;
Animate.prototype.mousePress._is_init = false;
Animate.prototype.mousePress._init_once_click_listener = function () {
  if (this.mousePress._is_init === false) {
    var that = this;
    this.mousePress._is_init = true;

    this._canvas.addEventListener('mousedown', function (event) {
      that.mousePress._position = that.mousePosition(event);
    });

    this._canvas.addEventListener('mouseup', function (event) {
      that.mousePress._position = false;
    });

  }
};

/**
 * .mouseMove()         (in loop use) return position point object when mouse move
 * .mouseMove(callback) (in loop use) execute function when mouse move with argument point object
 *
 * @param callback
 * @returns {*}
 */
Animate.prototype.mouseMove = function (callback) {
  if (this.mouseMove._is_init === false) {
    var that = this;
    this.mouseMove._is_init = true;
    this._canvas.addEventListener('mousemove', function (event) {
      that.mouseMove._position = that.mousePosition(event);
    });
  }

  if (this.mouseMove._position && typeof callback === 'function')
    callback.call(null, this.mouseMove._position);

  return this.mouseMove._position;
};

Animate.prototype.mouseMove._position = false;
Animate.prototype.mouseMove._is_init = false;

  ;

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
  console.log(this);
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

  ;

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
  ;

  /** Set script version. Property [read-only]*/
  Object.defineProperty(Animate, 'version', {
    enumerable: false, configurable: false, writable: false, value: '0.6.0'
  });

  /**
   * @type {Animate}
   */
  window.Animate = Animate;

})();



