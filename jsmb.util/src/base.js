////////////////////////////////////////////////////////////////////////
// Base Methods
var Ut = window.Ut || {}; // THIS-LINE-WILL-DELETED
/**
 * Вернет обобщенный тип передаваемого параметра value,
 * или сравнит тип value с передаваемым type и вернет boolean
 * Поддержуемые значение типов: null, boolean, undefined, function, string, number, date, number, array, object
 * @param value
 * @param type
 * @returns {string}
 */
Ut.typeOf = function (value, type) {
    var simpleTypes = ['null','boolean','undefined','function','string','number','date','number','array','object'],
        t = Ut.typeOfStrict(value).toLowerCase();
    if (simpleTypes.indexOf(t) === -1 && typeof value === 'object' && value.nodeType !== undefined)
        t = 'object';

    return typeof type === 'string' ? type.toLowerCase() === t : t;
};

/**
 * Вернет строгий/точный тип передаваемого параметра value,
 * или сравнит тип value с передаваемым строковым значением type и вернет boolean
 * Возможные заначения: null, Boolean, undefined, Function, String, Number, Date, Number, Array, Object ...
 * для HTML елементов / объектов WebAPI возвращает имя объекта, например для [<a></a>] вернет HTMLAnchorElement
 * https://developer.mozilla.org/ru/docs/Web/API
 *
 * @param value
 * @param type
 * @returns {*}
 */
Ut.typeOfStrict = function (value, type) {
    var t = Object.prototype.toString.call(value).slice(8, -1);
    return typeof type === 'string' ? type === t : t;
};

/**
 * Проверка на пустой элемент
 * @param src
 * @returns {boolean}
 */
Ut.empty = function (src) {
    return (src === "" || src === 0 || src === "0" || src === null || src === undefined || src === false || (Array.isArray(src) && src.length === 0))
};

/**
 * Determine param to undefined type
 * @param src
 * @returns {boolean}
 */
Ut.defined = function (src) {
    return typeof(src) != 'undefined';
};
