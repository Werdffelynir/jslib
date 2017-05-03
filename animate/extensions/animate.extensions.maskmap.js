Animate.Extension(function (instance) {

    if (!(instance instanceof Animate))
        return;

    /**
     * @type CanvasRenderingContext2D
     */
    var context = instance.getContext();

    instance.maskmap = {};

    instance.maskmap.create = function (mask_array, cols, rect_size) {
        mask_array['cols'] = cols;
        mask_array['rows'] = cols;
        mask_array['size'] = rect_size;
        return mask_array;
    };

    instance.maskmap.render = function (map, callback) {
        var i, x, y;
        for (i = 0; i < map.length; i++) {
            x = parseInt(i % map['cols']) * map['size'];
            y = parseInt(i / map['cols']) * map['size'];
            callback.call(null, x, y, map[i], i, map);
        }
    };

})