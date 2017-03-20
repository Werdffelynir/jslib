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

var Sha = {
    shield: [300,350,400,300,420,100,180,100,200,300],
    shield_half: [300,348,398,300,418,103,300,103],
};

Sha.onFrame = function (ctx, i) {

    an.graphic.shape(Sha.shield, '#EB000D', '#000000', true, 5);
    an.graphic.shape(Sha.shield_half, '#ff7167', true, true);

    an.text.font('bold 26px/28px sans');
    an.text.write(250, 200, 'HTML 5');

};


an.onFrame = Sha.onFrame;

// start
an.start();