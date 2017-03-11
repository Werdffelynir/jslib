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

    // * * * * * * * * * * * * * * * * * * * * * * * * *
    Game.Panel = function (ctx, i) {
        animate.Graphic.rect(0, 0, animate.width, 26, 'black', true);
        animate.Text.font = 'bold 14px/30px sans';
        animate.Text.color = '#ffffff';
        animate.Text.lineWidth = 2;
        var text = 'Health ' + (Game.Player.stats.health) + '  Gold ' + (Game.Player.stats.gold);
        animate.Text.write(10, 5, text);
    };

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

        animate.Graphic.circle(Game.Player.stats.x, Game.Player.stats.y, 10, '#675e89', true);
    };

    Game.Player.stats = {
        x: 100,
        y: 100,
        speed: 2,
        move: { up: false, down: false, left: false, right: false },
        gold: 0,
        health: 100
    };

    // * * * * * * * * * * * * * * * * * * * * * * * * *
    Game.Gold = function (ctx, i) {

        // generate gold map
        if (!Game.Gold.map) {
            Game.Gold.map = [];
            for (i = 0; i < 50; i++ ) {
                Game.Gold.map.push({
                    x: Animate.Util.random(10, animate.width - 10),
                    y: Animate.Util.random(35, animate.height - 10),
                    color: '#f7e642'
                });
            }
        }
        // add golds
        for (i = 0; i < 50; i++ ) {
            var g = Game.Gold.map[i];
            if (NSA.typeOf(g, 'object')) {

                ctx.lineWidth = 3;
                animate.Graphic.circle(g.x, g.y, 20, g.color, true);

                if (ctx.isPointInPath(Game.Player.stats.x, Game.Player.stats.y)){

                    animate.Graphic.circle(g.x, g.y, 23, '#f00', false);
                    delete Game.Gold.map[i];
                    Game.Gold.chatched ++;
                    Game.Player.stats.gold += 10;
                }
            }
        }




    };
    Game.Gold.map = false;
    Game.Gold.chatched = 0;



    // * * * * * * * * * * * * * * * * * * * * * * * * *
    animate.frame('start', {
        init: function (ctx, i) {
            //
            Game.Gold(ctx);
            Game.Player(ctx);
            Game.Panel(ctx);
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