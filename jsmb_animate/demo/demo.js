(function(){

    var an = new Animate({
        selector: '#canvas',
        width: '600',
        height: '400',
        fps: 60
    });


    var clipBox = an.clip(
        {
            x: 0,
            y: 0,
            width: an.width / 50,
            height: an.height / 100,
            boxes: []
        },
        function (ctx) {
            /**
             * @type CanvasRenderingContext2D
             */
            ctx = ctx;

            this.boxes.push([
                Animate.Util.randomColor(),
                this.x,
                this.y
            ]);

            for (var i = 0; this.boxes.length > i; i++) {
                ctx.fillStyle = this.boxes[i][0];
                ctx.fillRect(this.boxes[i][1], this.boxes[i][2], this.width, this.height);
            }

            // next step
            this.x += this.width;
            if (this.x > an.width) {
                this.y += this.height;
                this.x = 0;
            }
            return this.y >= an.height
        }
    );


    an.frame(function(ctx, i){

        // move clip
        var stop = clipBox(ctx);

        if (stop)
            an.stop();
    });


    an.start();
})();