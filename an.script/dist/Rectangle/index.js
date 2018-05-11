"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Create special object to indicate a rectangle
 * @param x
 * @param y
 * @param width
 * @param height
 * @returns {[*,*,*,*]}
 */
function Rectangle(x, y, width, height) {
    if (x === void 0) { x = 0; }
    if (y === void 0) { y = 0; }
    if (width === void 0) { width = 100; }
    if (height === void 0) { height = 100; }
    var rect = [x, y, width, height];
    rect['x'] = x;
    rect['y'] = y;
    rect['width'] = width;
    rect['height'] = height;
    return rect;
}
exports.Rectangle = Rectangle;
//# sourceMappingURL=index.js.map