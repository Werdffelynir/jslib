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
            '/animate/demo/space-runner/level.js',
            '/animate/demo/space-runner/player.js',
            '/animate/demo/space-runner/asteroid.js'
        ],
        full_screen: false,
        size_width: false,
        size_height: false,
        scriptsLoaded: 0,
        name: 'Space Runner'
    };

    function GameController() {

        var animate = new Animate({
            selector: '#canvas',
            width: 800,
            height: 400,
            fps: 30
        });
        animate.Game = Game;
        Game.size_width = animate.getWidth();
        Game.size_height = animate.getHeight();
        NSA.on(animate.getCanvas(), 'dblclick', function (event) {
            if (!Game.full_screen) {
                Game.full_screen = true;
                animate.resizeCanvas();
            } else {
                Game.full_screen = false;
                animate.resizeCanvas(Game.size_width, Game.size_height);
            }
        });

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
    console.log(Game.scripts);
    NSA.loadJS(Game.scripts, function (loader) {
        Game.scriptsLoaded ++;
        if (Game.scriptsLoaded == Game.scripts.length) {
 
            console.log('GameController "'+Game.name+'" Start!');
            GameController();
        }

    });

})();