"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Marge objects
 * @param defaultObject
 * @param object
 * @returns {*}
 */
function combine(defaultObject, object) {
    for (var key in object) {
        defaultObject[key] = object[key];
    }
    return defaultObject;
}
exports.combine = combine;
//# sourceMappingURL=combine.js.map