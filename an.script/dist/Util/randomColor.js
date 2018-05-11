"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Generate a random hex color
 * @returns {string}
 */
function randomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++)
        color += letters[Math.floor(Math.random() * 16)];
    return color;
}
exports.randomColor = randomColor;
//# sourceMappingURL=randomColor.js.map