"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var random_1 = require("./random");
/**
 * Return random item from array
 * @param arr
 * @returns {*}
 */
function randomItem(arr) {
    var i = random_1.random()(0, arr.length - 1);
    return arr[i];
}
exports.randomItem = randomItem;
//# sourceMappingURL=randomItem.js.map