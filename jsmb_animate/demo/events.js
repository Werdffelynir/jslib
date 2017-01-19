(function(){

    var an = new Animate({
        selector: '#canvas',
        width: '600',
        height: '400',
        fps: 3,
        onFrame: onFrameEvent,
        onClick: onClickEvent,
        onMousemove: onMousemoveEvent,
        onKeydown: onKeydownEvent,
        onKeyup: onKeyupEvent
    });


    function onFrameEvent(ctx, i){
        console.log('onFrame', ctx, i);
    }

    function onClickEvent(event, point){
        console.log('onClickEvent point', point);
    }

    function onMousemoveEvent(event, point){
        console.log('onMousemoveEvent point', point);
    }

    function onKeydownEvent(event){
        console.log('onKeydown', event);
    }

    function onKeyupEvent(event){
        console.log('onKeyup', event);
    }


    //console.log(an.context);

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