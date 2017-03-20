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

        if (Game.Player.stats.jump && Game.Player.stats.y > Game.Player.stats.ground_y) {
            Game.Player.stats.y = Game.Player.stats.ground_y;
            Game.Player.stats.jump = false;
            Game.Player.stats.jump_speed = 2.5;
        }
        else if (Game.Player.stats.jump) {
            Game.Player.stats.y -= Game.Player.stats.jump_speed -= Game.Player.stats.jump_acceleration;
        }
        if (Game.Player.stats.left) {
            Game.Player.stats.x -= Game.Player.stats.speed;
        }
        if (Game.Player.stats.right) {
            Game.Player.stats.x += Game.Player.stats.speed;
        }

        animate.Graphic.circle(Game.Player.stats.x, Game.Player.stats.y, 20, '#675e89', true);
    };

    Game.Player.stats = {
        x: 50,
        y: animate.height - 10,
        ground_y: animate.height - 10,
        jump_acceleration: 0.085,
        jump_speed: 2.5,
        speed: 2,
        move: { up: false, down: false, left: false, right: false },
        gold: 0,
        health: 100
    };






    var itemContext = {
        x: false,
        y: false,
        hide: false,
        color: '#ffd65f',
        speed: 1,
        speed_dynamic: 0,
        speed_acceleration: 0.28
    };

    var itemCallback = function (ctx, x, y) {
        if (this.hide) return;
        /** @type CanvasRenderingContext2D */
        ctx == ctx;

        this.y += (this.speed += this.speed_acceleration);

        if (this.y < 0 || this.y > animate.height - 30)
            this.speed = this.speed * -1;

        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, 30, 30);


        // if (animate.hitTestPoint(this.x, this.y)){
        //     console.log('hitTest')
        //     this.hide = true;
        // }

        if (animate.hitTest([this.x, this.y, 30, 30], {x:Game.Player.stats.x, y:Game.Player.stats.y})){
            console.log('hitTest');
            this.hide = true;
        }
        ctx.closePath();
    };

    // * * * * * * * * * * * * * * * * * * * * * * * * *
    animate.frame('start', {

        enemies: [
            animate.moveclip(Animate.Util.copy(itemContext, {x:100,y:10,color:'#ffd65f'}), itemCallback),
            animate.moveclip(Animate.Util.copy(itemContext, {x:150,y:10,color:'#ffd65f'}), itemCallback),
            animate.moveclip(Animate.Util.copy(itemContext, {x:200,y:10,color:'#ffd65f'}), itemCallback),
            animate.moveclip(Animate.Util.copy(itemContext, {x:250,y:10,color:'#ffd65f'}), itemCallback),
            animate.moveclip(Animate.Util.copy(itemContext, {x:300,y:10,color:'#ffd65f'}), itemCallback)
        ],

        init: function (ctx, i) {

            Game.Player(ctx);

            this.enemies.map (function (enm) {
                enm(ctx);
            });

        }
    });




    animate.onKeydown = function (event) {
        // up 87 down 83 left 65 right 68
        if (event.keyCode == 87) {Game.Player.stats.up = true}
        if (event.keyCode == 83) {Game.Player.stats.down = true}

        if (event.keyCode == 65) {Game.Player.stats.left = true}
        if (event.keyCode == 68) {Game.Player.stats.right = true}

        if (!Game.Player.stats.jump) {
        }
        // jump
        if (event.keyCode == 32) {Game.Player.stats.jump = true}
    };
    animate.onKeyup = function (event) {
        console.log(event.keyCode);
        // up 87 down 83 left 65 right 68
        if (event.keyCode == 87) {Game.Player.stats.up = false}
        if (event.keyCode == 83) {Game.Player.stats.down = false}
        if (event.keyCode == 65) {Game.Player.stats.left = false}
        if (event.keyCode == 68) {Game.Player.stats.right = false}
    };

    // start
    animate.start('start');
})();






function cloneObject(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    // give temp the original obj's constructor
    var temp = obj.constructor();
    for (var key in obj) {
        temp[key] = cloneObject(obj[key]);
    }

    return temp;
}

//
// var item = animate.moveclip(Animate.Util.copy(itemContext, {color: '#ffd65f'}), itemCallback);
// var item2 = animate.moveclip(Animate.Util.copy(itemContext, {color: '#ff1111'}), itemCallback);
// var item3 = animate.moveclip(Animate.Util.copy(itemContext, {color: '#675e89'}), itemCallback);


// box(ctx, this.positions[0]);
// box(ctx, this.positions[1]);
// box(ctx, this.positions[2]);
// item(ctx, this.positions[0].x, this.positions[0].y);
// item2(ctx, this.positions[1].x, this.positions[1].y);
// item3(ctx, this.positions[2].x, this.positions[2].y);
//
// //item(ctx, this.positions[2].x, this.positions[2].y);
//
// this.positions[0].y += 0.25;
// this.positions[1].y += 0.35;
// this.positions[2].y += 0.45;


//box(ctx, 250, 120, 2, i);
//box(ctx, 300, 130, 3, i);

//box2(ctx, 250, 110, 2);
//box3(ctx, 300, 120, 3);

//var itemCopy = item.bind(Animate.Util.copy(itemContext, {color: '#675e89'}));

//
// console.dir('itemCopy');
//
// console.dir(item);
// console.dir(item2);
// console.dir(itemCopy);

//console.dir(item);
//console.dir(item.bind(null));

// var MoveClip = function (p, c) {
//     return new animate.moveclip(p, c);
// };

// var box = function (ctx, positions) {
//
//     // ctx.beginPath();
//     // ctx.fillStyle = '#ff0011';
//     // ctx.fillRect(positions.x, positions.y, 30, 30);
//     // ctx.closePath();
//
//     item(ctx, positions.x, positions.y);
// };


//var box = animate.moveclipContext();

// var box2 = NSA.copy(box);
// var box3 = NSA.copy(box);
// console.log('box2', box2);




// var box = animate.moveclip({
//     x: false,
//     y: false
// }, function (ctx, x, y) {
//
//     if (this.x === false) this.x = x || 0;
//     if (this.y === false) this.y = y || 0;
//
//     ctx.fillStyle = '#ff0011';
//     ctx.fillRect(this.x, this.y, 30, 30);
//     ctx.closePath();
//
//     //animate.Graphic.rect(this.x, this.y, 10, 10, '#ff0011', true);
// });

//console.log('_tmp', arguments);
//callback.bind(properties).apply(properties, arguments);
//console.log('properties', properties, arguments);
/*callback.apply(properties, arguments)*/

// function createBox(ctx, x, y) {
//     /** @type CanvasRenderingContext2D */
//     ctx = ctx;
//     ctx.fillStyle = '#ff0011';
//     ctx.fillRect(x, y, 30, 30);
//     ctx.closePath();
// }

// var mc = function (properties, callback) {
//     var arr = [];
//     return function () {
//         //var name = Animate.Util.randomColor().splice(1);
//         //if (!mc.list[name])
//         //    mc.list[name] = NSA.copy(properties);
//         callback.apply(properties, arguments);
//         // (function (arguments) {
//         //     callback.apply(properties, arguments);
//         // })(arguments);
//     }
// };
// mc.list = {};



//
//Game.Enemy(ctx);
//Game.Enemy(ctx);
//
//that.context.save();

//that.context.restore();
//ctx.beginPath();
//createBox(ctx, 200, 100);
//createBox(ctx, 250, 100);

//Game.box(ctx, 250, 100);
//ctx.closePath();
//Game.box(ctx, 300, 100);
//ctx.closePath();

//Game.Enemy.mc(ctx, 200, 100);
//Game.Enemy.mc(ctx, 250, 100);

//Game.Player(ctx);
//Game.Panel(ctx);