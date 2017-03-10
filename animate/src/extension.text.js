Animate.Extension(function (insance) {

    if (!(insance instanceof Animate))
        return;
    var

        /**
         * @type Animate.prototype
         */
        that = insance,

        /**
         * @type CanvasRenderingContext2D
         */
        context = insance.getContext(),

        text = {
            font: '12px Arial, sans',
            textAlign: 'start',
            textBaseline: 'top',
            direction: 'inherit',
            lineWidth: 1,
            color: '#000000'
        };


    text.write = function (x, y, label, color, fill) {

        if (text.font)          context.font = text.font;
        if (text.textAlign)     context.textAlign = text.textAlign;
        if (text.textBaseline)  context.textBaseline = text.textBaseline;
        if (text.direction)     context.direction = text.direction;
        if (text.lineWidth)     context.lineWidth = text.lineWidth;
        if (text.color)         color = text.color;

        context.beginPath();

        if (fill === true || fill === undefined) {
            context.fillStyle = color || '#dddddd';
            context.fillText(label, x, y);

            if (typeof fill === 'string') {
                context.strokeStyle = fill || '#000000';
                context.strokeText(label, x, y);
            }
        }
        else {
            context.strokeStyle = color || '#000000';
            context.strokeText(label, x, y);
        }

        context.closePath();
    };

    insance.text = text;
})