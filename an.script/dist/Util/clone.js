"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeOf_1 = require("./typeOf");
/**
 * Clone an Array, Object, Function
 * @param src
 * @param args
 */
function clone(src, args) {
    if (typeOf_1.typeOf(src, 'function')) {
        return src.bind({}, args);
    }
    else if (typeOf_1.typeOf(args, 'object') || typeOf_1.typeOf(args, 'array')) {
        var c = JSON.parse(JSON.stringify(src));
        for (var i in args) {
            c[i] = args[i];
        }
        return c;
    }
}
exports.clone = clone;
//# sourceMappingURL=clone.js.map