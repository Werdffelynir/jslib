"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Calculate distance between two Points
 * @param p1
 * @param p2
 * @returns {number}
 */
function distanceBetween(p1, p2) {
    var dx = p2.x - p1.x;
    var dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
}
exports.distanceBetween = distanceBetween;
;
//# sourceMappingURL=distanceBetween.js.map