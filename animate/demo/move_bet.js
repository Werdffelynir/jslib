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
        fps: 12
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
        speed: 2.8,
        move: { up: false, down: false, left: false, right: false },
        gold: 0,
        health: 100
    };

    // * * * * * * * * * * * * * * * * * * * * * * * * *
    Game.Enemy = function (ctx) {




    };

    Game.Enemy.mc = animate.moveclip({
        x: false,
        y: false,
        speed: 1.1,
        distance: 0
    }, function (ctx, x, y) {

        if (this.x === false) this.x = x || 0;
        if (this.y === false) this.y = y || 0;

        //console.log(x);

        var pu = {x: Game.Player.stats.x, y: Game.Player.stats.y};
        var pe = {x: this.x, y: this.y};

        this.distance = Animate.Util.distanceBetween(pu, pe);

        if (this.distance < 50) {
            if (pe.x < pu.x) {
                this.x += this.speed;
            } else {
                //if (this.x - this.speed < this.x)
                this.x -= this.speed;
            }

            if (pe.y < pu.y) {
                this.y += this.speed;
            } else {
                this.y -= this.speed;
            }
        }

        //ctx.beginPath();
        animate.Graphic.circle(this.x, this.y, 13, '#ff0011', true);
        //ctx.closePath();

    });
    Game.Enemy.scope = [];
    Game.box = animate.moveclip({
        x: false,
        y: false,
    }, function (ctx, x, y) {
        if (this.x === false) this.x = x || 0;
        if (this.y === false) this.y = y || 0;

        animate.Graphic.rect(this.x, this.y, 10, 10, '#ff0011', true);
    });

    // * * * * * * * * * * * * * * * * * * * * * * * * *
    animate.frame('start', {
        init: function (ctx, i) {
            //
            //Game.Enemy(ctx);
            //Game.Enemy(ctx);
            Game.box(ctx, 200, 100);
            Game.box(ctx, 250, 100);
            Game.box(ctx, 300, 100);
            //Game.Enemy.mc(ctx, 200, 100);
            //Game.Enemy.mc(ctx, 250, 100);

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