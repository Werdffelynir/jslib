(function () {

    var an = new Animate({
        selector: '#canvas',
        width: 600,
        height: 400,
        fps: 5
    });

    an.frame(function(ctx, i){

        console.log(ctx, i);

        if (i > 100)
            an.stop();
    });


    // start
    an.start();
})();