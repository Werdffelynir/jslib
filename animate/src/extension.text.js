Animate.Extension(function (instance) {

    if (!(instance instanceof Animate))
        return;

    /**
     * Global text options
     * @type {{font: string, textAlign: string, textBaseline: string, direction: string, lineWidth: number, color: string, write: function}}
     */
    instance.Text = {
        font: '12px Arial, sans',
        textAlign: 'start',
        textBaseline: 'top',
        direction: 'inherit',
        lineWidth: 1,
        color: '#000000',

        /**
         * Create text block
         * @param x
         * @param y
         * @param label
         * @param color
         * @param fill
         */
        write: function (x, y, label, color, fill) {
            var context = instance.getContext();

            if (instance.Text.font)          context.font = instance.Text.font;
            if (instance.Text.textAlign)     context.textAlign = instance.Text.textAlign;
            if (instance.Text.textBaseline)  context.textBaseline = instance.Text.textBaseline;
            if (instance.Text.direction)     context.direction = instance.Text.direction;
            if (instance.Text.lineWidth)     context.lineWidth = instance.Text.lineWidth;
            if (instance.Text.color)         color = instance.Text.color;

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
        }
    };

})