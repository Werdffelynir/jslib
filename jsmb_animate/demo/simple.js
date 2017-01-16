(function(){

    var an = new Animate({
        selector: '#canvas',
        width: '600',
        height: '400',
        fps: 3
    });

    an.onKeydown(function(event) {
        console.log('onKeydown', event);
    });

    an.onKeyup(function(event) {
        console.log('onKeyup', event);
    });

    //an.onClick(function(event, point) {
    //    console.log('onClick point', point);
    //});

    //an.onFrame(function(ctx, i){
    //    console.log('onFrame', ctx, i);
    //});

    //an.onMousemove(function(event, point){
    //    console.log('onMousemove point', point);
    //});

    console.log();


    an.frame({
        hide: false,
        index: 100,
        init: function (ctx, i) {
            if (i > 5) {
                console.log('go to main');
                an.start('main');
            } else
                console.log('default [Object]', i);
        }
    });


    /*
    an.frame(function (ctx, i) {
        console.log('default [function]', i);
    });     */
    /*
   an.frame('default', {
        init: function (ctx, i) {
            console.log('default [with name default]', i);
        }
    });
     */

    an.frame('main', {
        init: function (ctx, i) {
            console.log('main', i);
            //
            if (i > 10)
                an.stop();
        }
    });


    an.start();
})();