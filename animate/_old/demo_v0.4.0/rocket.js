(function(){

    var an = new Animate({
        selector: '#canvas',
        width: '600',
        height: '400',
        fps: 30,
        onMousedown: onRunEvent,
        onMouseup: onRunEvent
    });

    an.backgroundColor('rgba(3, 10, 45, 0.9)');

    var Dm = {};
    Dm.images = {};
    Dm.rocketProperties = {
        run: false,
        x: 270,
        y: 300,
        rotate: 10,
        velocity: 0.60,
        gravity: 0.25,
        acceleration: 0.01
    };
    Dm.rocket = an.moveclip(Dm.rocketProperties, function (context) {
        var ctx = context;

        if (Dm.rocketProperties.run && this.gravity > 0)
            this.gravity = -this.velocity;

        this.gravity += (Dm.rocketProperties.run) ? -this.acceleration : this.acceleration;
        this.y += this.gravity;

        if (this.y > an.height - 100)
            this.y = an.height - 100;

        ctx.save();
        ctx.drawImage(Dm.images.rocket, this.x, this.y);
        ctx.restore();
    });

    function onRunEvent(event){
        if (event.type == "mousedown")
            Dm.rocketProperties.run = true;
        else
            Dm.rocketProperties.run = false;
    }

    an.Image.load({
        rocket:'/animate/demo/images/rocket.png'
    }, function (images) {
        Dm.images = images;
    });

    an.frame({
        hide: false,
        index: 100,
        init: function (context, i) {
            /** @type CanvasRenderingContext2D */
            var ctx = context;

            Dm.rocket(context);
        }
    });

    an.start();
})();