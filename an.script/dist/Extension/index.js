"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Getter|Setter
 * Storage for static modules
 *
 * @param name    String
 * @param func    Function | Object
 * @constructor
 */
var ExtensionsState = /** @class */ (function () {
    function ExtensionsState() {
        this.extensions = [];
        if (!ExtensionsState.instance) {
            ExtensionsState.instance = this;
        }
        return ExtensionsState.instance;
    }
    ExtensionsState.prototype.push = function (func) {
        this.extensions.push(func);
    };
    ExtensionsState.prototype.pull = function () {
        return this.extensions;
    };
    return ExtensionsState;
}());
exports.ExtensionsState = ExtensionsState;
function Extension(func) {
    (new ExtensionsState()).push(func);
}
exports.Extension = Extension;
//# sourceMappingURL=index.js.map