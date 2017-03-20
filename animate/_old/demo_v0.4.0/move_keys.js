(function () {
    var node = {
        menu: NamespaceApplication.queryAll('#menu'),
        page: NamespaceApplication.query('#page'),
        desc: NamespaceApplication.query('#desc'),
        move: NamespaceApplication.query('#move')
    };

    var animate = new Animate({
        selector: '#canvas',
        width: 600,
        height: 200,
        fps: 60
    });

    // * * * * * * * * * * * * * * * * * * * * * * * * *
    var Game = {};

    // * * * * * * * * * * * * * * * * * * * * * * * * *
    Game.Player = function (ctx) {

        if (animate.keyPress('ArrowUp') || animate.keyPress('w')) {
            Game.Player.y -= Game.Player.speed;
        }
        if (animate.keyPress('ArrowDown') || animate.keyPress('s')) {
            Game.Player.y += Game.Player.speed;
        }
        if (animate.keyPress('ArrowLeft') || animate.keyPress('a')) {
            Game.Player.x -= Game.Player.speed;
        }
        if (animate.keyPress('ArrowRight') || animate.keyPress('d')) {
            Game.Player.x += Game.Player.speed;
        }

        animate.Graphic.circle(Game.Player.x, Game.Player.y, 10, '#675e89', true);
    };

    Game.Player.x = 100;
    Game.Player.y = 100;
    Game.Player.speed = 2;

    // * * * * * * * * * * * * * * * * * * * * * * * * *
    animate.frame('start', {
        init: function (ctx, i) {
            Game.Player(ctx);
        }
    });

    // start
    animate.start('start');
})();