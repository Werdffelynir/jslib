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
    function up (eve) {
        console.log(eve);
    }


    Game.Player = function (ctx) {
        if (Game.Player.dead) {
            animate.start('end');
            return;
        }

        console.log(Key('ArrowUp'), Key('Space'));

        //console.log();

        //console.log(Key('ArrowUp', up));
        //console.log(Key(up));

        //console.log(Key(up));

        /*
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
        }*/


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
    Game.Player.dead = false;


    // * * * * * * * * * * * * * * * * * * * * * * * * *
    animate.frame('start', {
        init: function (ctx, i) {

            Game.Player(ctx);
            //Game.Panel(ctx);

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



    var Key = function (a, b) {
        if (!Key._keys_pressed) Key._init_events_listeners();

        var key, callback;
        if (arguments.length == 2) {
            key = a;
            callback = (typeof b === 'function') ? b : null;
        } else
            if (typeof a === 'function') callback = a;
            else key = a;

        if (key) {
            if (callback && Key._keys_pressed[key])
                 callback.call(null, Key._keys_pressed[key]);
            return !!Key._keys_pressed[key]
        } else if (callback) {
            callback.call(null, Key._keys_pressed);
        }
    };

    Key._init_events_listeners = function (keyCodeName) {
        Key._keys_pressed = {};
        window.addEventListener('keyup', function (event) {
            delete Key._keys_pressed[event.key];
            delete Key._keys_pressed[event.code];
            delete Key._keys_pressed[event.keyCode];
        });
        window.addEventListener('keydown', function (event) {
            Key._keys_pressed[event.key] =
            Key._keys_pressed[event.code] =
            Key._keys_pressed[event.keyCode] = event;
            //console.log(event)
        });
    };

    Key._keys_pressed = false;



    // start
    animate.start('start');
})();