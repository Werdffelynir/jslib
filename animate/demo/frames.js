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
        fps: 12
    });

    // * * * * * * * * * * * * * * * * * * * * * * * * *

    an.mc.timeText = an.Clip({
        position: an.Point(an.width - 110, 0)
    }, function (ctx, i) {

        an.Graphic.rect(this.position.x, this.position.y, 110, 18, '#dbdc80', true);

        an.Text.color = '#000000';
        an.Text.font = '12px/18px sans';
        an.Text.textBaseline = 'top';
        an.Text.textAlign = 'left';
        an.Text.write(this.position.x + 5, this.position.y + 2, 'Iteration: ' + i);
    });

    an.mc.title = 'Title Page';
    an.mc.titleText = an.Clip({}, function (ctx, i) {
        an.Text.color = '#000000';
        an.Text.font = '22px/28px sans';
        an.Text.textBaseline = 'top';
        an.Text.textAlign = 'center';
        an.Text.write(an.width/2, an.height/2, an.mc.title);
    });

    an.frame('one', {
        init: function(ctx, i) {
            an.mc.title = "Frame 'One'";
            an.mc.heroColor = '#62b0c4';
        }
    });

    an.frame('one', function(ctx, i) {
        if (i == 50) {
            an.start('two');
        }
    });

    an.frame('two', function(ctx, i) {
        an.mc.title = "Frame 'Two'";
        an.mc.heroColor = '#f7e304';
        if (i == 100) {
            an.start('three');
        }
    });

    an.frame('three', function(ctx, i) {
        an.mc.title = "Frame 'Three'";
        an.mc.heroColor = '#b31204';
        if (i == 150) {
            an.start('fore');
        }
    });

    an.frame('fore', function(ctx, i) {
        an.mc.title = "Frame 'Fore'";
        an.mc.heroColor = '#3a363f';
        if (i > 200) {
            an.mc.title = "STOP";
            if (i > 201)
                an.stop();
        }
    });

    //console.log(ctx, i);
    an.mc.heroColor = '#dbdc80';
    an.mc.heroPoint = an.Point(0, 160);
    an.onFrame = function (ctx, i) {

        an.mc.heroPoint.x += 2;
        an.Graphic.rect(an.mc.heroPoint.x, an.mc.heroPoint.y, 100, 100, an.mc.heroColor, true);

        an.mc.timeText(ctx, i);
        an.mc.titleText(ctx, i);
    };


    // start
    an.start('one');
})();