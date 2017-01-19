(function(){

    var an = new Animate({
        selector: '#canvas',
        width: '600',
        height: '400',
        fps: 30,
        onMousedown: onRunEvent,
        onMouseup: onRunEvent/*,
        onClick: onClickEvent,
        onKeydown: onKeydownEvent,
        onKeyup: onKeyupEvent*/
    });

    //     background-color: rgba(3, 10, 45, 0.9);
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

    Dm.rocket = an.clip(Dm.rocketProperties, function (context) {
        var ctx = context;

        if (Dm.rocketProperties.run && this.gravity > 0)
            this.gravity = -this.velocity;

        this.gravity += (Dm.rocketProperties.run) ? -this.acceleration : this.acceleration;
        this.y += this.gravity;

        if (this.y > an.height - 100)
            this.y = an.height - 100;

        ctx.save();
        //ctx.translate(this.x, this.y);
        //ctx.rotate(this.rotate * Math.PI/180);
        //ctx.drawImage(Dm.images.rocket, -this.x/2, -this.y/2);
        ctx.drawImage(Dm.images.rocket, this.x, this.y);
        ctx.restore();
    });

    function onRunEvent(event){
        if (event.type == "mousedown")
            Dm.rocketProperties.run = true;
        else
            Dm.rocketProperties.run = false;
        //console.log('onRunEvent', event);
    }
/*    function onClickEvent(event){
        console.log('onKeydown', event);
    }



    function onKeyupEvent(event){
        console.log('onKeyup', event);
    }*/

    an.image.load({
        rocket:'/jsmb_animate/demo/images/rocket.png'
    }, function (images) {
        Dm.images = images;
        //console.log('images', images);
    });


    an.frame({
        hide: false,
        index: 100,
        init: function (context, i) {
            /** @type CanvasRenderingContext2D */
            var ctx = context;
            //ctx.drawImage(Dm.images.rocket, 270, 300);
            Dm.rocket(context);

        }
    });




    an.start();
})();