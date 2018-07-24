"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Classes_1 = require("./Classes");
var Dispatcher = Classes_1.Classes.Dispatcher;
var App = (function () {
    function App() {
        var say = Dispatcher.say('Domain');
        console.log('App: ', say);
    }
    return App;
}());
exports.App = App;
new App();
