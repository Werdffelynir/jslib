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
        fps: 30
    });

    // * * * * * * * * * * * * * * * * * * * * * * * * *

    var draw_clip = an.createClip({}, function (ctx) {
        ctx.fillStyle = '#c4d3a2';
        ctx.fillRect(50, 50, 100, 100);

        ctx.fillStyle = '#655a4e';
        ctx.fillRect(100, 100, 100, 100);

        ctx.fillStyle = '#c1a075';
        ctx.fillRect(150, 150, 100, 100);

        ctx.fillStyle = '#9d8fd0';
        ctx.fillRect(200, 200, 100, 100);

        ctx.fillStyle = '#feff94';
        ctx.fillRect(250, 250, 100, 100);

        ctx.fillStyle = '#dbdc80';
        ctx.fillRect(250, 50, 100, 100);

        ctx.fillStyle = '#6a6a6a';
        ctx.fillRect(300, 100, 100, 100);

        ctx.fillStyle = '#ff2e19';
        ctx.fillRect(350, 150, 100, 100);

        ctx.fillStyle = '#ffeebc';
        ctx.fillRect(400, 200, 100, 100);

        ctx.fillStyle = '#ff7167';
        ctx.fillRect(450, 250, 100, 100);
    });

    var camera,
        cameraSpeed = 2,
        cam = {
            x: an.width/2, y: an.height/2,
            w: 200
        };

    an.frame(function(ctx, i) {
        /** @type CanvasRenderingContext2D */
        ctx = ctx;

        var camera = an.camera(cam.x, cam.y, cam.w, draw_clip);

        if (cam.x > 0) {
            cam.x -= cameraSpeed;
        }

        if (cam.y > 0) {
            cam.y -= cameraSpeed;
        }

        if (cam.w < an.width) {
            cam.w += cameraSpeed;
        }

    });

    // start
    an.start();
})();