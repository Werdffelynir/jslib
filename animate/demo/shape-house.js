(function(){

    var an = new Animate({
        selector: '#canvas',
        width: '800',
        height: '600',
        fps: 24,
        onMousemove: onMousemove
    });

    var Dm = {
        house: [93,194,115,214,148,196,158,469,134,471,114,526,686,524,660,444,611,439,605,193,659,227,681,205,404,46],
        window: [311,226,425,216,419,356,308,344,311,226],
        bgColor: '#532323',
        borderColor: '#212121',
        houseColor: '#951E00',
        windowColor: '#730200',
        windowDefaultColor: '#730200',
        windowActiveColor: '#ff2222',
        mouse: {x: 0, y: 0}
    };

    function onMousemove (event, point) {
        Dm.mouse = point;
    }

    an.frame(function(ctx, i) {
        /**@type CanvasRenderingContext2D*/
        ctx = ctx;

        an.backgroundColor(Dm.bgColor);
        an.graphic.shape(Dm.house, Dm.houseColor, Dm.borderColor, true, 15);

        an.graphic.shape(Dm.window, Dm.windowColor, Dm.borderColor, true, 5);
        if (ctx.isPointInPath(Dm.mouse.x, Dm.mouse.y)){
            Dm.windowColor = Dm.windowActiveColor;
        } else {
            Dm.windowColor = Dm.windowDefaultColor;
        }

    });

    an.start();
})();