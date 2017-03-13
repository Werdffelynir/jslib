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
        fps: 30
    });

    // * * * * * * * * * * * * * * * * * * * * * * * * *
    var Game = {
        key: {
            up: false,
            down: false,
            left: false,
            right: false,
            space: false
        },
        // Game.hero.x
        hero: {
            x: 10,
            y: 10,
            color: '#675e89',
            radius: 15,
            speed: 2,
            speedY: 2,
            accelerationY: 0.25
        },
        mc: {}
    };


    Game.CreateHero = animate.moveclip(Game.hero, function (ctx, i) {
        //console.log(i, this.speed);


        animate.Graphic.circle(this.x, this.y, this.radius, this.color, true);

        // move
        if (Game.key.left) {
            this.x -= this.speed;
        }
        if (Game.key.right) {
            this.x += this.speed;
        }
    });


    
    animate.frame('move', {
        
        init: function (ctx, i) {


            Game.CreateHero(ctx, i);
        }
    });

    animate.onKeydown = function (event) {
        // up 87 down 83 left 65 right 68 space 32
        if (event.keyCode == 87) {Game.key.up = true}
        if (event.keyCode == 83) {Game.key.down = true}
        if (event.keyCode == 65) {Game.key.left = true}
        if (event.keyCode == 68) {Game.key.right = true}
        if (event.keyCode == 32) {Game.key.space = true}
    };
    animate.onKeyup = function (event) {
        // up 87 down 83 left 65 right 68 space 32
        if (event.keyCode == 87) {Game.key.up = false}
        if (event.keyCode == 83) {Game.key.down = false}
        if (event.keyCode == 65) {Game.key.left = false}
        if (event.keyCode == 68) {Game.key.right = false}
        if (event.keyCode == 32) {Game.key.space = false}
    };

    animate.start('move');
})();


