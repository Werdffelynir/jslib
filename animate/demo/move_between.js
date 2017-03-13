(function () {
})();

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
        x: 100,
        y: 100,
        color: '#ffd65f',
        jumpReady: false,
        radius: 16,
        speed: 2,
        accelerateMax: 4,
        accelerateSpeed: 1.15,
        accelerate: 0.2,
        hitGround: false,
        horizontal: animate.height - 8
    },
    mc: {}
};


Game.CreateHero = animate.moveclip(Game.hero, function (ctx, i) {

    if (Game.key.up && this.jumpReady) {
        this.accelerateSpeed = -this.accelerateMax; // -Math.abs(this.accelerateSpeed);
        this.horizontal = animate.height;
        this.jumpReady = false;
    }

    //console.log('horizontal', this.horizontal);
    //console.log('hitGround', this.hitGround);
    if (!this.hitGround) {
        this.horizontal = animate.height;
        this.jumpReady = false;
    }

    if (this.y > this.horizontal) {
        this.y = this.horizontal;

        Game.hero.jumpReady = true;

        NSA.Timer.timeout(function () {

        }, 1000)

    } else if (!this.jumpReady) {
        if (this.accelerateSpeed > this.accelerateMax) this.accelerateSpeed = this.accelerateMax;
        if (this.accelerateSpeed <-this.accelerateMax) this.accelerateSpeed =-this.accelerateMax;
        this.y += (this.accelerateSpeed += this.accelerate);
    }

    if (Game.key.left) {
        this.x -= this.speed;
    }
    if (Game.key.right) {
        this.x += this.speed;
    }


    ctx.save();
    ctx.translate(0, -(this.radius/2));
    animate.Graphic.circle(this.x, this.y, this.radius, this.color, true);
    ctx.restore();
});



Game.CreateGround = function () {
    Game.hero.hitGround = false;

    ground(0,  19, animate.width);
    ground(11, 18, 100);
    ground(0,  11, 50);
    ground(0,  07, 20);
    ground(3,  04, 40);
    ground(10, 03, 30);
    ground(10, 04, 100);

    ground(22, 04, 100);
    ground(23, 05, 100);
    ground(35, 05, 30);
    ground(40, 04, 20);
    ground(44, 04, 20);

    ground(11, 09, 30);
    ground(15, 10, 100);
    ground(28, 12, 140);

    ground(40, 18, 200);
    ground(41, 17, 200);
    ground(42, 16, 200);
    ground(43, 15, 200);
    ground(44, 14, 200);
    ground(45, 13, 200);
    ground(46, 12, 200);

    ground(50, 03, 10);
    ground(50, 04, 10);
    ground(50, 05, 40);
    ground(53, 03, 10);
    ground(53, 04, 10);
    //ground(40, 05, 100);
    //ground(44, 05, 100);

    function ground(x, y, width) {
        x *= 10;
        y *= 10;
        animate.Graphic.rect(x, y, width, 10, 'black', true);
        if (animate.hitTestPoint(Game.hero.x, Game.hero.y)) {
            Game.hero.horizontal = y;
            Game.hero.hitGround = true;
        }
        animate.getContext().closePath();
    }
};

animate.frame('move', {
    init: function (ctx, i) {
        //Game.hero.hitGround Game.hero.hitGround = false;
        Game.hero.horizontal = animate.height;

        Game.CreateGround();
        //console.log('hitGround', Game.hero.hitGround );
        Game.CreateHero(ctx, i);

    }
});


animate.backgroundColor('#6a6a6a');



// keys

animate.onKeydown = function (event) {
    // up 87 down 83 left 65 right 68 space 32
    if (event.keyCode == 87) {
        Game.key.up = true
    }
    if (event.keyCode == 83) {
        Game.key.down = true
    }
    if (event.keyCode == 65) {
        Game.key.left = true
    }
    if (event.keyCode == 68) {
        Game.key.right = true
    }
    if (event.keyCode == 32) {
        Game.key.space = true
    }
};
animate.onKeyup = function (event) {
    // up 87 down 83 left 65 right 68 space 32
    if (event.keyCode == 87) {
        Game.key.up = false
    }
    if (event.keyCode == 83) {
        Game.key.down = false
    }
    if (event.keyCode == 65) {
        Game.key.left = false
    }
    if (event.keyCode == 68) {
        Game.key.right = false
    }
    if (event.keyCode == 32) {
        Game.key.space = false
    }
};

animate.start('move');





//acceleration ()
//console.log('jump now');
// if (this.y < this.horizontalY && this.jump) {
//     //if (!this.canJump)
//     this.y += (this.speedY += this.accelerationY);
// } else {
//
//     //
//
//     this.y = this.horizontalY;
//     //this.speedY = this.speedYDefault;
//     this.jump = false;
// }
// if (this.y > this.horizontal) {
//     this.y = this.horizontal;
//     this.jump = false;
// }
//
// if (this.y < this.horizontal || this.jump) {
//     this.y += acceleration ();
//
//     if (this.y < this.horizontal)
//         this.jump = false;
//
//     //console.log('down'); //  || this.jump
//
// }

// function acceleration () {
//     var _spreed = (Game.hero.accelerateSpeed += Game.hero.accelerate);
//     var _spreed_limit = 4;
//     if (_spreed > _spreed_limit) _spreed = _spreed_limit;
//     if (_spreed <-_spreed_limit) _spreed =-_spreed_limit;
//     return _spreed
// }