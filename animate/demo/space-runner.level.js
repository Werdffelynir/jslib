Animate.Extension(function (instance) {

    if (!(instance instanceof Animate))
        return;

    /** @type CanvasRenderingContext2D */
    var context = instance.getContext();
    var Game;

    instance.Level = {

        setting: {
            number: 1,
            player: null,
            start: []
        },

        init: function(game) {
            Game = game;
        },

        start: function() {

            this.gamePanel();
            this.gameBackground();

        },

        gamePanel: function() {
            context.font = 'bold 14px/16px sans';
            context.textAlign = 'middle';
            context.fillStyle = '#ffd65f';
            context.fillText('Level: ' + this.setting.number, 10, 15);
            context.fillText('Life: ' + Game.Player.setting.life, 100, 15);


        },

        gameBackground: function() {
            var i,
                start,
                limit = 100;

            // bg color
            instance.backgroundColor('#2a2641');

            // starts
            if (this.setting.start.length == 0) {
                for (i = 0; i < limit; i++) {
                    this.setting.start.push({
                        x: instance.random(0, instance.width),
                        y: instance.random(0, instance.height),
                        speed: instance.random(6, 16),
                        radius: instance.random(1, 3),
                        color: 'hsla(50, 100%, '+instance.random(35, 50)+'%, 1)'
                    });
                }
            }

            for (i = 0; i < limit; i++) {
                if (this.setting.start[i].x < 0)
                    this.setting.start[i].x = instance.width + 100;
                else
                    this.setting.start[i].x -= this.setting.start[i].speed;

                instance.graphic.circle(
                    this.setting.start[i].x,
                    this.setting.start[i].y,
                    this.setting.start[i].radius,
                    this.setting.start[i].color,
                    true
                );

            }


        }
    };

    console.log('LEVEL', instance);
});