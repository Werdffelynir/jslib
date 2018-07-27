Animate.Extension(function (instance) {

    if (!(instance instanceof Animate))
        return;

    /**
     * @type CanvasRenderingContext2D
     */
    var context = instance.getContext();
    var Game;

    instance.Player = {

        moveEnable: true,

        setting: {
            x: 100,
            y: 100,
            sizeWidth: 100,
            sizeHeight: 32,
            speed: 4,
            life: 10,
            color: '#000000',
            rotateRadians: instance.degreesToRadians(90)
        },

        init: function(game) {
            Game = game;
        },

        start: function() {

            context.save();
            context.translate(this.setting.x, this.setting.y);
            context.drawImage(
                Game.images['rocket'],
                0,
                0,
                this.setting.sizeWidth,
                this.setting.sizeHeight
            );
            context.restore();

            this.move();

        },

        moveSin: 0,
        moveSinDeviation: 0.095,
        moveSinDeviationDefault: 0.095,

        move: function() {

            if (this.moveEnable) {

                if (instance.keyPress('ArrowUp') || instance.keyPress('w')) {
                    this.setting.y -= this.setting.speed;
                    // restore
                    this.moveSin = -1.25;
                    this.moveSinDeviation = -this.moveSinDeviationDefault;
                } else  if (instance.keyPress('ArrowDown') || instance.keyPress('s')) {
                    this.setting.y += this.setting.speed;
                    // restore
                    this.moveSin = 1.25;
                    this.moveSinDeviation = this.moveSinDeviationDefault;
                } else {
                    // set distance of deviation
                    this.setting.y += Math.sin( this.moveSin += this.moveSinDeviation );
                }

            }

        },


        hitAsteroid: function(asteroidRectangle) {
            if (instance.hitTest(asteroidRectangle, instance.point(this.setting.x + 100, this.setting.y + 16))) {
                return true;
            }
            return false;
        }


    };

    console.log('PLAYER');
});