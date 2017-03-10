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

    an.frame('one', function(ctx, i){
        if (i == 25) {
            console.log('one');
            an.start('two');
        }
    });

    an.frame('two', function(ctx, i){
        if (i == 50) {
            console.log('two');
            an.start('three');
        }
    });

    an.frame('three', function(ctx, i){
        if (i == 75) {
            console.log('three');
            an.start('fore');
        }
    });

    an.frame('fore', function(ctx, i){

        if (i == 100) console.log('fore');
        //console.log(ctx, i);
        if (i > 100)
            an.stop();
    });

    // an.onFrame = function (ctx, i) {
    //     console.log('iter: ', i, ctx);
    // };


    // start
    an.start('one');
})();