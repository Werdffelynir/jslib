Animate.Extension(function (instance) {

    if (!(instance instanceof Animate))
        return;

    /**
     * @type CanvasRenderingContext2D
     */
    var context = instance.getContext();

    instance.addGridCache = false;

    /**
     * @param size          Размер ячейки решетки. Default: 50
     * @param lineWidth     Толщина линии. Default: 0.5
     * @param color         Цвет линий. Default: '#efefef'
     */
    instance.addGrid = function (size, lineWidth, color) {

        if (instance.addGridCache) {

            context.putImageData(instance.addGridCache, 0, 0);

        } else {

            var i, j,
                w = instance.getWidth(),
                h = instance.getHeight();

            context.beginPath();

            for (i = 0; i < w; i += size) {
                context.moveTo(i, 0);
                context.lineTo(i, h);
            }
            for (i = 0; i < h; i += size) {
                context.moveTo(0, i);
                context.lineTo(w, i);
            }

            context.lineWidth = lineWidth || 0.5;
            context.strokeStyle = color || '#efefef';
            context.stroke();
            context.closePath();

            instance.addGridCache = context.getImageData(0, 0, w, h);
        }
    };
})