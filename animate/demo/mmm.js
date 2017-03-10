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

    an.mc.timeText = an.moveclip({
        label: 'Iteration: ',
        text: ''
    }, function (ctx, i) {
        this.text = this.label + i;

        an.Graphic.rect(10, 10);
        an.Text.font = '16px/18px sans';
        an.Text.write(100, 100, this.text);
        an.Graphic.rect(100, 100, 110, 18, '#dddddd');
    });

    an.frame('one', function(ctx, i) {

        if (i == 25) {
            console.log('one');
            an.start('two');
        }
    });

    an.frame('two', function(ctx, i) {
        if (i == 50) {
            console.log('two');
            an.start('three');
        }
    });

    an.frame('three', function(ctx, i) {
        if (i == 75) {
            console.log('three');
            an.start('fore');
        }
    });

    an.frame('fore', function(ctx, i) {
        if (i > 100) {
            console.log('fore');
            an.stop();
        }
    });

    //console.log(ctx, i);
    an.onFrame = function (ctx, i) {
        //console.log('iter: ', i, ctx);
        //an.mc.timeText(ctx, i);
        an.mc.timeText.bind(null, ctx, i)();
    };


    // start
    an.start('one');
})();