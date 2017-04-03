(function () {

    var node = {
        menu: NSA.queryAll('#menu'),
        page: NSA.query('#page'),
        desc: NSA.query('#desc'),
        move: NSA.query('#move'),
        after: NSA.query('#after')
    };

    // * * * * * * * * * * * * * * * * * * * * * * * * *

    var Game = {
        scripts: [
            '/animate/demo/space-runner.level.js',
            '/animate/demo/space-runner.player.js',
            '/animate/demo/space-runner.asteroid.js',
        ],
        scriptsLoaded: 0,
        name: 'Space Runner'
    };

    function GameController() {

        var animate = new Animate({
            selector: '#canvas',
            width: 600,
            height: 200,
            fps: 60
        });
        animate.Game = Game;

        animate.resource.loadImage({
            rocket: '/animate/demo/images/rocket-icon-32x100.png',
            asteroid: '/animate/demo/images/asteroid-32x32.png',
            explosion: '/animate/demo/images/explosion.png'
        }, function (images) {
            Game.images = images;

            Game.Level = animate.Level;
            Game.Player = animate.Player;
            Game.Asteroid = animate.Asteroid;

            Game.Level.init(Game);
            Game.Player.init(Game);
            Game.Asteroid.init(Game);

            // start
            animate.start();
        });

        animate.onFrame = function (ctx, i) {

            Game.Level.start();
            Game.Player.start();
            Game.Asteroid.start();

        };


    }
    

    // * * * * * * * * * * * * * * * * * * * * * * * * *
    // Installer
    NSA.loadJS(Game.scripts, function (loader) {
        Game.scriptsLoaded ++;
        if (Game.scriptsLoaded == Game.scripts.length) {
 
            console.log('GameController "'+Game.name+'" Start!');
            GameController();
        }

    });





})();























// Game.animate.frame(function(ctx, i) {
//     /** @type CanvasRenderingContext2D */
//     ctx = ctx;
//
//     console.log(ctx, i);
//
//     if (i > 100)
//         Game.animate.stop();
// });