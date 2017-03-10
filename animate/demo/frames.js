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
        position: {}
    }, function (ctx, i) {

        this.position = an.point(an.width - 110, 0);

        an.Graphic.rect(this.position.x, this.position.y, 110, 18, '#dbdc80', true);

        an.Text.color = '#000000';
        an.Text.font = '12px/18px sans';
        an.Text.textBaseline = 'top';
        an.Text.write(this.position.x + 5, this.position.y + 2, 'Iteration: ' + i);
    });

    an.frame('one', {
        x: 0,
        y: 0,
        init: function(ctx, i) {
            this.x += 2;
            an.Graphic.rect(this.x, this.y, 10, 10, '#dbdc80', true);
        }
    });

    an.frame('one', function(ctx, i) {

        an.Graphic.rect(10, 30, 10, 10, '#dbdc80', true);

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
        an.mc.timeText(ctx, i);
    };


    // start
    an.start('one');
})();