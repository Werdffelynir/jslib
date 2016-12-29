////////////////////////////////////////////////////////////////////////
// Base Methods
var Ut = window.Ut || {}; // THIS-LINE-WILL-DELETED
/**
 * Вернет тип передаваемого параметра value, или сравнит тип value с передаваемым type и вернет boolean
 * Возможные заначения: null, boolean, undefined, function, string, number, date, number, array, object
 * @param src
 * @param type_is
 * @returns {*}
 */
Ut.typeOf = function (src, type_is) {
    var type = Object.prototype.toString.call(src).slice(8, -1).toLowerCase();
    type = type.toLowerCase();
    return typeof type_is === 'string' ? type_is.toLowerCase() === type : type;
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
