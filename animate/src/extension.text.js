Animate.Extension(function (insance) {

    if (!(insance instanceof Animate))
        return;

    /**
     * Global text options
     * @type {{font: string, textAlign: string, textBaseline: string, direction: string, lineWidth: number, color: string, write: function}}
     */
    insance.Text = {
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
            var context = insance.getContext();

            if (insance.Text.font)          context.font = insance.Text.font;
            if (insance.Text.textAlign)     context.textAlign = insance.Text.textAlign;
            if (insance.Text.textBaseline)  context.textBaseline = insance.Text.textBaseline;
            if (insance.Text.direction)     context.direction = insance.Text.direction;
            if (insance.Text.lineWidth)     context.lineWidth = insance.Text.lineWidth;
            if (insance.Text.color)         color = insance.Text.color;

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