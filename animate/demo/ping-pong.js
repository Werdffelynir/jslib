(function () {
    var node = {
        menu: NSA.queryAll('#menu'),
        page: NSA.query('#page'),
        desc: NSA.query('#desc'),
        move: NSA.query('#move'),
        after: NSA.query('#after')
    };

    var an = new Animate({
        selector: '#canvas',
        width: 600,
        height: 400,
        fps: 60
    });

    // * * * * * * * * * * * * * * * * * * * * * * * * *
    var Game = {
        name: 'Attacker',
        mouse: false
    };

    Game.grid_cache = false;

    Game.grid = function (px, lw, ss) {
        /** @type CanvasRenderingContext2D */
        var ctx = an.getContext();

        if (Game.grid_cache) {

            ctx.putImageData(Game.grid_cache, 0, 0);

        } else {

            var i, j,
                w = an.getWidth(),
                h = an.getHeight();

            ctx.beginPath();

            for (i = 0; i < w; i += px) {
                ctx.moveTo(i, 0);
                ctx.lineTo(i, h);
            }
            for (i = 0; i < h; i += px) {
                ctx.moveTo(0, i);
                ctx.lineTo(w, i);
            }

            ctx.lineWidth = lw || 0.5;
            ctx.strokeStyle = ss || '#efefef';
            ctx.stroke();
            ctx.closePath();

            Game.grid_cache = ctx.getImageData(0, 0, w, h);
        }
    };

    Game.bg_mounties = function () {
        var sh1 = [100,200,200,100,300,200,400,100,500,200,500,230,100,230];
        var sh_top1 = [200,103,240,143,160,143];
        var sh_top2 = [400,103,440,143,360,143];

        // points, color, fill, closePath, lineWidth
        an.graphic.shape(sh1, '#00e215', true);
        an.graphic.shape(sh1, '#009109', false, true);
        an.graphic.shape(sh_top1, '#ffffff', true);
        an.graphic.shape(sh_top2, '#ffffff', true);

    };

    Game.preview = function () {
        an.text.color('#7f7f7f');
        an.text.textAlign('center');
        an.text.textBaseline('middle');
        an.text.font('bold 26px/26px sans');
        an.text.write(an.width/2, an.height/2 + 50, 'PING-PONG');
        an.text.font('bold 18px/18px sans');
        an.text.write(an.width/2, an.height/2 + 80, 'START');

        var p = an.mousePress();
        if (p && an.getFrameName() !== 'start') {
            if (an.hitTest([an.width/2 - 50, an.height/2 + 60, 100, 30], p)) {
                an.start('start');
            }
        }
    };

    Game.player_stat = {
        x: an.width / 2 - 50,
        y: an.height - 20,
        speed: 4,
        width: 100,
        height: 10,
        balls: 10,
        score: 0
    };

    Game.player = an.createClip(Game.player_stat, function (ctx, i) {

        an.graphic.rect(this.x, this.y, this.width, this.height);

        return this;
    });

    Game.ball_stat = {
        x: an.width / 2,
        y: an.height / 2,
        dx: 2,
        dy: 5,
        speed: 1,
        radius: 30
    };

    Game.ball = an.createClip(Game.ball_stat, function (ctx, i) {
        an.graphic.circle(this.x, this.y, this.radius, '#ff0000', true);

        if (this.x < this.radius/2 ) {
            this.x = this.radius/2;
            this.dx *= -1;
        }
        if (this.x > an.width - this.radius/2) {
            this.x = an.width - this.radius/2;
            this.dx *= -1;
        }

        this.x += this.dx;
        this.y += this.dy;

        return this;
    });


    Game.enemy_stat = {
        x: an.width / 2 - 50,
        y: 10,
        speed: 1.785,
        width: 100,
        height: 10,
        balls: 10,
        score: 0
    };

    Game.enemy = an.createClip(Game.enemy_stat, function (ctx, i) {

        an.graphic.rect(this.x, this.y, this.width, this.height);

        return this;
    });

    Game.renderInform = function () {
        an.text.color('#7f7f7f');
        an.text.textAlign('left');
        an.text.textBaseline('top');
        an.text.font('bold 16px/16px sans');
        var balls = 'Score: ' + Game.player_stat.score;
        var score = ' Balls: ' + Game.player_stat.balls;
        an.text.write(5, 5, balls + score);
    };

    Game.renderPlayer = function () {

        var ball = Game.ball();
        var enemy = Game.enemy();
        var player = Game.player();

        if (an.keyPress('a')) {player.x -= player.speed;}
        if (an.keyPress('d')) {player.x += player.speed;}

        if (enemy.x+50 > ball.x) enemy.x -= enemy.speed;
        else enemy.x += enemy.speed;

        //if (enemy.x+100 < ball.x) enemy.x += enemy.speed;
        //else if (enemy.x+100 > ball.x) enemy.x += enemy.speed;
        //else if (enemy.x+100 > ball.x) enemy.x += enemy.speed;

        // enemy - hit'
        if (ball.y - ball.radius/2 < enemy.y + 10 && ball.x > enemy.x && ball.x < enemy.x + 100) {
            ball.dy *= -1;
            console.log('enemy - hit');
        }

        // player - hit'
        else if (ball.y + ball.radius/2 >= player.y && ball.x >= player.x && ball.x <= player.x + 100) {
            ball.y = player.y - ball.radius/2;
            ball.dy *= -1;
            console.log('player - hit');
        }

        else if (ball.y < ball.radius/2) {
            ball.dy *= -1;
            player.score += 100;
            // restart ();
            // ball.dx = 0;
            // ball.dy = 0;
            // NSA.Timer.timeout(restart, 1000);
            console.log('enemy - lost');
        }

        else if (ball.y > an.height - ball.radius/2) {
            ball.dy *= -1;
            player.balls -= 1;
            //NSA.Timer.timeout(restart, 1000);
            console.log('player - lost');
        }

        function restart () {
            ball.x = an.width / 2;
            ball.y = an.height / 2;
            ball.dx = 2;
            ball.dy = 3;
        }

    };

    /*
        x: an.width / 2,
        y: an.height / 2,
        dx: 2,
        dy: 5,
    */
    // * * * * * * * * * * * * * * * * * * * * * * * * *

    an.frame('start', function(ctx, i) {
        /** @type CanvasRenderingContext2D */
        ctx = ctx;
        Game.mouse = an.mousePress();
        Game.grid(50, 0.2, 'rgba(0,0,0,0.2)');

        Game.renderPlayer();
        Game.renderInform();

    });

    an.frame(function(ctx, i) {
        /** @type CanvasRenderingContext2D */
        ctx = ctx;
        Game.mouse = an.mousePress();

        Game.bg_mounties();
        Game.preview();

    });

    // start
    an.start();
    //an.start('start');
})();