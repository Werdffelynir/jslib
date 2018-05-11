"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Проверяет наличие значения
 * @param value         проверяемое значение
 * @param defaultValue  значение поумолчанию
 * @returns {boolean}
 */
function isset(value, defaultValue) {
    var is = value !== undefined;
    return (defaultValue === undefined) ? is : (is ? is : defaultValue);
}
exports.isset = isset;
//# sourceMappingURL=isset.js.map