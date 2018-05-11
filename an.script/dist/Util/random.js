"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Generate a random number
 * @param min
 * @param max
 * @returns {number}
 */
function random(min, max) {
    min = min || 0;
    max = max || 100;
    return Math.floor(Math.random() * (max - min + 1) + min);
}
exports.random = random;
//# sourceMappingURL=random.js.map