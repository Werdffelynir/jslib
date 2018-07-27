/**
 * Вернет обобщенный тип передаваемого параметра value,
 * или сравнит тип value с передаваемым type и вернет boolean
 * Поддержуемые значение типов: null, boolean, undefined, function, string, number, date, number, array, object
 * @param value
 * @param type
 * @returns {string}
 */
export function typeOf (value: any, type?: string) {
  const types = ['null','boolean','undefined','function','string','number','date','number','array','object'];
  let t = typeOfStrict(value).toLowerCase();

  if (types.indexOf(t) === -1 && typeof value === 'object')
    t = 'object';

  return type ? type.toLowerCase() === t : t;
}

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
export function typeOfStrict (value: any, type?: string) {
  const t = Object.prototype.toString.call(value).slice(8, -1);
  return type ? type === t : t;
}