"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var clone_1 = require("./Util/clone");
var Animate = /** @class */ (function () {
    function Animate() {
        var o = { a: 0, b: 1, c: 2, e: 3 };
        console.log('Animate Start', clone_1.clone(o, { z: 9 }));
    }
    return Animate;
}());
exports.Animate = Animate;
new Animate();
//# sourceMappingURL=index.js.map