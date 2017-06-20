(function () {
    var node = {
        menu: NSA.queryAll('#menu'),
        page: NSA.query('#page'),
        desc: NSA.query('#description'),
        move: NSA.query('#move'),
        after: NSA.query('#after')
    };

    var an = new Animate({
        selector: '#canvas',
        width: 600,
        height: 400,
        fps: 0
    });

    // * * * * * * * * * * * * * * * * * * * * * * * * *

    var TEXT_STYLE_BOLDER = 'text_style_bold';
    var TEXT_STYLE_NORMAL = 'text_style_norm';

    an.TextField.addStyle(TEXT_STYLE_BOLDER, {
        x: 100,
        y: 100,
        color: '#F00',
        fill: false
    });

    an.TextField.addStyle(TEXT_STYLE_NORMAL, {
        x: 200,
        y: 100,
        color: '#0A0',
        fill: false
    });

    an.onFrame = function (ctx, i) {

        an.TextField.write('Hello', TEXT_STYLE_BOLDER);
        an.TextField.write('World', TEXT_STYLE_NORMAL);

        an.TextField.write('Next text', 300, 100, TEXT_STYLE_BOLDER);
        // var o1 = {a:101};
        // var o2 = {a:101};
        // console.dir(o1 === o2);


        // an.TextField.styleApply(styleBold);
        // an.TextField.styleAdd('blod', styleBold);
        // an.TextField.style(boldText);
        // an.TextField.write('Hello', boldText);
        // an.TextField.write('Hello', boldText);
        // an.TextField.write('Hello', 100, 100);
        // an.TextField.write('Hello', 100, 100, boldText);

    };

    // start
    an.start();
})();