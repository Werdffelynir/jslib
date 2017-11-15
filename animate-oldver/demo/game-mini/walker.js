
var App = new NamespaceApplication({
    path: '/animate/demo/game-mini/',
    debug: true
});

App.require('modules', [
    App.path + 'walker/game.js',
    App.path + 'walker/item.js',
    App.path + 'walker/player.js',
    App.path + 'walker/camera.js',
    App.path + 'walker/control.js',
    App.path + 'walker/startmap.js',
    App.path + 'walker/controller.js'
], function (list) {

    console.log('START ... ', list);

    App.Controller.construct();

}, function (eve) {console.log('Loading scripts error!', eve)});

App.requireStart('modules');