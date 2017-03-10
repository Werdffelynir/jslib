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
        height: 400,
        fps: 30
    });

    // * * * * * * * * * * * * * * * * * * * * * * * * *
    var Game = {
        mc:{}
    };
    //Game.mc.

    // * * * * * * * * * * * * * * * * * * * * * * * * *
    Game.Player = function (ctx) {

        if (Game.Player.stats.up) {
            Game.Player.stats.y -= Game.Player.stats.speed;
        }
        if (Game.Player.stats.down) {
            Game.Player.stats.y += Game.Player.stats.speed;
        }
        if (Game.Player.stats.left) {
            Game.Player.stats.x -= Game.Player.stats.speed;
        }
        if (Game.Player.stats.right) {
            Game.Player.stats.x += Game.Player.stats.speed;
        }

        animate.Graphic.rectRound(
            Game.Player.stats.x,
            Game.Player.stats.y,
            10, 10, 5, '#675e89', true
        );

    };

    Game.Player.stats = {
        x: 100,
        y: 100,
        speed: 2,
        move: { up: false, down: false, left: false, right: false }
    };

    // * * * * * * * * * * * * * * * * * * * * * * * * *
    Game.Gold = function (ctx, i) {

        // generate gold map
        if (!Game.Gold.level_1) {
            Game.Gold.level_1 = [];

            for (i = 0; i < 100; i++ ) {
                animate.Graphic.rectRound(
                    Animate.Util.random(0, animate.width),
                    Animate.Util.random(0, animate.height),
                    10, 10, 5, '#feff94', true
                );
                // Game.Gold.level_1.push({
                //     x: Animate.Util.random(0, animate.width)
                // });
            }
            Game.Gold.level_1_init = true;
        }




    };
    Game.Gold.level_1_init = false;



    // * * * * * * * * * * * * * * * * * * * * * * * * *
    animate.frame('start', {
        init: function (ctx, i) {
            //
            Game.Gold(ctx);
            Game.Player(ctx);
        }
    });




    animate.onKeydown = function (event) {
        // up 87 down 83 left 65 right 68
        if (event.keyCode == 87) {Game.Player.stats.up = true}
        if (event.keyCode == 83) {Game.Player.stats.down = true}
        if (event.keyCode == 65) {Game.Player.stats.left = true}
        if (event.keyCode == 68) {Game.Player.stats.right = true}
    };
    animate.onKeyup = function (event) {
        // up 87 down 83 left 65 right 68
        if (event.keyCode == 87) {Game.Player.stats.up = false}
        if (event.keyCode == 83) {Game.Player.stats.down = false}
        if (event.keyCode == 65) {Game.Player.stats.left = false}
        if (event.keyCode == 68) {Game.Player.stats.right = false}
    };

    // start
    animate.start('start');
})();