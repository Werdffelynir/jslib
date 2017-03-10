(function () {

    var an = new Animate({
        selector: '#canvas',
        width: 600,
        height: 400,
        fps: 30,
        rectangles: {},
        onClick: function (event, point) {
            var key, rect;
            for(key in an.rectangles) {
                rect = an.rectangles[key];
                if (an.hitTest(rect.rectangle, point)) {
                    rect.callback.call(event);
                }
            }
        },
        active: function (key, rectangle, callback) {
            an.rectangles[key] = {rectangle:rectangle, callback:callback};
        },
        deactivate: function (key) {
            delete an.rectangles[key];
        }
    });

    for (var i = 0; i < 1500; i++) {

        var x = Animate.Util.random(0, an.width);
        var y = Animate.Util.random(0, an.height);
        var vx = Animate.Util.random(-5, 10) / 2;
        var vy = Animate.Util.random(-5, 10) / 2;
        var color = Animate.Util.randomColor();
        var radius = Animate.Util.random(10, 20);

        an.frame({
            index: 5,
            name: 'ball-' + i,
            deep: 40,
            x: x,
            y: y,
            vx: vx,
            vy: vy,
            color: color,
            radius: radius,
            hide: false,
            visibly: true,
            rectangle: [0, 0, 0, 0],
            init: function (ctx) {

                if (!this.hide) {

                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                    ctx.fillStyle = this.color;
                    ctx.fill();
                    ctx.closePath();

                    this.x += this.vx;
                    this.y += this.vy;

                    if (this.x > an.width && this.x) this.vx = -this.vx;
                    else if (this.x < 0) this.vx = this.vx * -1;

                    if (this.y > an.height) this.vy = -this.vy;
                    else if (this.y < 0) this.vy = this.vy * -1;


                    // Simple Click
                    var self = this;

                    this.rectangle = [
                        this.x - this.radius,
                        this.y - this.radius,
                        this.radius * 2,
                        this.radius * 2
                    ];

                    an.active(this.name, this.rectangle, function (event) {
                        self.hide = true;
                        an.deactivate(self.name)
                    });

                }

            }
        });
    }

    // start
    an.start();
})();