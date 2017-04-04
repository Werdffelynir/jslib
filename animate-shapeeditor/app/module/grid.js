if(App.namespace){App.namespace('Grid', function(App){
    /**
     * @namespace App.Grid
     */
    var __ = {

        /**@type Animate*/
        animate: null,

        show: true,

        image_data: false
    };

    /** @namespace App.Grid.init */
    __.init = function (animate) {

        __.animate = animate;

    };

    /** @namespace App.Grid.render */
    __.render = function () {

        if (__.show)
            __.drawSchema();

    };

    __.clearDataImage = function () {
        __.image_data = false;
    };

    __.drawSchema = function () {

        var an = __.animate;
        var context = an.getContext();
        var width = an.getWidth();
        var height = an.getHeight();

        if (!__.image_data) {
            var i, j;
            for (i = 0; i < width / 5; i++) {
                var i5 = i * 5;
                if (i5 % 100 === 0) {
                    an.graphic.line({x: 0, y: i5}, {x: width, y: i5}, 2, '#C6FFFD');
                    an.graphic.line({x: i5, y: 0}, {x: i5, y: height}, 2, '#C6FFFD');
                }
                else if (i5 % 10 === 0) {
                    an.graphic.line({x: 0, y: i5}, {x: width, y: i5}, 1, '#E2FFFD');
                    an.graphic.line({x: i5, y: 0}, {x: i5, y: height}, 1, '#E2FFFD');
                }
            }
            __.image_data = context.getImageData(0, 0, width, height);
        } else {
            context.putImageData(__.image_data, 0, 0);
        }

    };

    return __;
})}