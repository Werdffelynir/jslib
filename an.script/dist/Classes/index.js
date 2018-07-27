"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Dispatcher = (function () {
    function Dispatcher() {
    }
    Dispatcher.say = function (name) {
        return "ClassA say: " + name;
    };
    return Dispatcher;
}());
exports.Dispatcher = Dispatcher;
var Metro = (function () {
    function Metro(host) {
        this.host = host;
        host.appendChild(document.createElement("canvas"));
    }
    return Metro;
}());
exports.Metro = Metro;
