Animate.Extension(function (insance) {

    if (!(insance instanceof Animate))
        return;
    /**
     * @type Animate.prototype
     */
    var that = insance;

    var Text = {
        font:           '12px Arial, sans',
        textAlign:      'start',
        textBaseline:   'top',
        direction:      'inherit',
        lineWidth:      1,
        color:          null
    };

    Text.write = function (x, y, label, color, fill) {
        var context = that.getContext();

        if (Text.font)          ctx.font = Text.font;
        if (Text.textAlign)     ctx.textAlign = Text.textAlign;
        if (Text.textBaseline)  ctx.textBaseline = Text.textBaseline;
        if (Text.direction)     ctx.direction = Text.direction;
        if (Text.lineWidth)     ctx.lineWidth = Text.lineWidth;
        if (Text.color)         color = Text.color;

        ctx.beginPath();

        if (fill === true || fill === undefined) {
            ctx.fillStyle = color || '#DDD';
            ctx.fillText(label, x, y);

            if (typeof fill === 'string') {
                ctx.strokeStyle = fill || '#000';
                ctx.strokeText(label, x, y);
            }
        }
        else {
            ctx.strokeStyle = color || '#000';
            ctx.strokeText(label, x, y);
        }

        ctx.closePath();
    };

    insance.Text = Text;

})