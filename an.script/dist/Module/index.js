"use strict";
/**
 * Getter|Setter
 * Storage for static modules
 *
 * @param name    String
 * @param func    Function | Object
 * @constructor
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Module = /** @class */ (function () {
    function Module(name, func) {
        this.modules = {};
        if (!Module.instance) {
            Module.instance = this;
        }
        if (arguments.length === 1)
            return this.modules[name];
        if (arguments.length === 2)
            return this.modules[name] = func;
        return Module.instance;
    }
    return Module;
}());
exports.Module = Module;
//# sourceMappingURL=index.js.map