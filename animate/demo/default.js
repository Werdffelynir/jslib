(function () {
    var node = {
        menu: NamespaceApplication.queryAll('#menu'),
        page: NamespaceApplication.query('#page'),
        desc: NamespaceApplication.query('#desc'),
        move: NamespaceApplication.query('#move')
    };

    var an = new Animate({
        selector: '#canvas',
        width: 600,
        height: 400,
        fps: 30
    });

    // * * * * * * * * * * * * * * * * * * * * * * * * *

    an.frame(function(ctx, i){

        console.log(ctx, i);

        if (i > 100)
            an.stop();
    });

    // start
    an.start();
})();