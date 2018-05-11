"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Calculates the position and size of elements.
 *
 * @param elem  string|HTMLElement
 * @returns {{y: number, x: number, width: number, height: number}}
 */
function position(elem) {
    var data = { x: 0, y: 0, width: 0, height: 0, element: null };
    if (typeof elem === 'string')
        elem = document.querySelector(elem);
    if (elem === undefined || elem === window || elem === document) {
        data.width = window.innerWidth;
        data.height = window.innerHeight;
        data.element = window;
    }
    else if (elem && elem.nodeType === Node.ELEMENT_NODE) {
        if (elem.getBoundingClientRect) {
            var rect = elem.getBoundingClientRect(), scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop, scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft, clientTop = document.documentElement.clientTop || document.body.clientTop || 0, clientLeft = document.documentElement.clientLeft || document.body.clientLeft || 0;
            data.y = Math.round(rect.top + scrollTop - clientTop);
            data.x = Math.round(rect.left + scrollLeft - clientLeft);
            data.width = elem.offsetWidth;
            data.height = elem.offsetHeight;
        }
        else {
            var top_1 = 0, left = 0;
            while (elem) {
                top_1 += parseInt(elem.offsetTop, 10);
                left += parseInt(elem.offsetLeft, 10);
                elem = elem.offsetParent;
            }
            data.y = top_1;
            data.x = left;
            data.width = elem.offsetWidth;
            data.height = elem.offsetHeight;
        }
        data.element = elem;
    }
    return data;
}
exports.position = position;
//# sourceMappingURL=position.js.map