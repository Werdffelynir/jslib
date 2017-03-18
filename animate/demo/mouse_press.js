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
        fps: 12
    });

    // * * * * * * * * * * * * * * * * * * * * * * * * *
    var Game = {};

    var onMouseMove = function (point) {
        animate.Text.font = '18px sans, sans-serif';
        animate.Text.color = '#000000';
        animate.Text.lineWidth = 5;
        animate.Text.textAlign = 'left';
        animate.Text.textBaseline = 'top';
        animate.Graphic.rect(5, 5, 360, 30, '#FFE5BE', '#000000');
        animate.Text.write(10, 10, 'MOUSE POSITION x:' + point.x + ' y:' + point.y);

        animate.Graphic.circle(point.x, point.y, 10, '#FFE5BE');
    };

    // * * * * * * * * * * * * * * * * * * * * * * * * *
    Game.Player = function (ctx) {

        var point = animate.mousePress();
        animate.mousePress(onMouseMove);

        if (point) {
            if (Game.Player.x < point.x) Game.Player.x += Game.Player.speed;
            else Game.Player.x -= Game.Player.speed;

            if (Game.Player.y < point.y) Game.Player.y += Game.Player.speed;
            else Game.Player.y -= Game.Player.speed;
        }

        animate.Graphic.circle(Game.Player.x, Game.Player.y, 25, '#675e89', true);
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