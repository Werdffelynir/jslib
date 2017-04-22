Animate.Extension(function (instance) {

    if (!(instance instanceof Animate))
        return;

    /** @type CanvasRenderingContext2D */
    var context = instance.getContext();
    var Game;

    instance.Asteroid = {

        explodeSprite: null,

        setting: {
            x: instance.width + 100,
            y: instance.random(32, instance.height - 32),
            speed: 0.3,
            speed_d: 0,
            rotateRadians: instance.degreesToRadians(90)
        },

        init: function(game) {
            Game = game;

            this.explodeSprite = instance.createSprite({
                x: -128,
                y: -128,
                width: 128,
                height: 128,
                image: Game.images['explosion'],
                grid: [4, 4],
                delay: 1,
                loop: true,
                indexes: []
            });


        },


        start: function() {

            var hitAsteroid = Game.Player.hitAsteroid(instance.rectangle(this.setting.x, this.setting.y - 16, 32, 32));

            if (hitAsteroid) {

                var explode = this.explodeSprite({
                    x: this.setting.x - 64,
                    y: this.setting.y - 64
                });

                // explode.x = this.setting.x - 64;
                // explode.y = this.setting.y - 64;

                Game.Player.moveEnable = false;

                if (explode.getIndex >= explode.getIndexsCount) {
                    explode.reset();
                    explode.x = - 128;
                    explode.y = - 128;
                    Game.Player.moveEnable = true;
                    Game.Player.setting.life -= 1;
                    this.setting.speed_d = 0;
                    this.setting.x = instance.width + 100;
                    this.setting.y = instance.random(32, instance.height - 32);
                }

            } else {

                this.setting.rotateRadians += instance.degreesToRadians(1);

                if (this.setting.x + 100 < 0) {
                    this.setting.speed_d = 0;
                    this.setting.x = instance.width + 100;
                    this.setting.y = instance.random(32, instance.height - 32);
                }
                else {
                    this.setting.x -= (this.setting.speed_d += this.setting.speed);
                }

                context.save();
                context.translate(this.setting.x, this.setting.y);
                context.rotate(this.setting.rotateRadians);
                context.drawImage(
                    Game.images['asteroid'],
                    -16,
                    -16
                );
                context.restore();
            }



        }
    };

    console.log('LEVEL', instance);
});