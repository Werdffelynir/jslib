
var App = new NamespaceApplication({
    path: '/animate-oldver/demo/game-mini/ping-pong/',
    debug: true
});

App.require('modules', [
    App.path + 'game.js',
    App.path + 'ball.js',
    App.path + 'enemy.js',
    App.path + 'player.js',
    App.path + 'control.js'
], function (list) {

    console.log('START ... ', list);

    App.Game.start();

}, function (eve) {console.log('Loading scripts error!', eve)});

App.requireStart('modules');