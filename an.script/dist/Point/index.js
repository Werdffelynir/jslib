"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Create special object to indicate a point
 * @param x
 * @param y
 * @returns {{x: *, y: *}}
 */
function Point(x, y) {
    if (x === void 0) { x = 0; }
    if (y === void 0) { y = 0; }
    var point = [x, y];
    point['x'] = x;
    point['y'] = y;
    return point;
}
exports.Point = Point;
//# sourceMappingURL=index.js.map