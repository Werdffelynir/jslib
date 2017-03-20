Animate.Extension(function (instance) {

    if (!(instance instanceof Animate))
        return;

    /**
     * Global text options
     * @type {{font: string, textAlign: string, textBaseline: string, direction: string, lineWidth: number, color: string, write: function}}

    instance.Text = {
        font: '12px Arial, sans',
        textAlign: 'start',
        textBaseline: 'top',
        direction: 'inherit',
        lineWidth: 1,
        color: '#000000',


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
*/

    instance.Text = {};
    instance.Text._text_parameters = false;

    /**
     * Create text block
     * @param x
     * @param y
     * @param label
     * @param color
     * @param fill
     */
    instance.Text.write = function (x, y, label, color, fill) {
        if (instance.Text._text_parameters === false) {
            instance.Text.reset();
        }

        if (arguments.length === 1) {
            label = x;
            x = instance.Text._text_parameters.x;
            y = instance.Text._text_parameters.y;
        }
        fill = fill === undefined ? instance.Text._text_parameters.fill : fill;
        color = color === undefined ? instance.Text._text_parameters.color : color;

        var ctx = instance.getContext();
        var _point = instance.Text._text_parameters.point;
        var _alpha = instance.Text._text_parameters.alpha;
        var _scale = instance.Text._text_parameters.scale;
        var _rotate = instance.Text._text_parameters.rotate;
        var _transform = instance.Text._text_parameters.transform;


        ctx.save();
        ctx.translate(x, y);
        ctx.font = instance.Text._text_parameters.font;
        ctx.textAlign = instance.Text._text_parameters.textAlign;
        ctx.textBaseline = instance.Text._text_parameters.textBaseline;
        ctx.direction = instance.Text._text_parameters.direction;
        ctx.lineWidth = instance.Text._text_parameters.lineWidth;
        ctx.globalAlpha = instance.Text._text_parameters.alpha;

        //ctx.lineWidth = instance.Text._text_parameters.lineWidth;
        if (_transform) {
            CanvasRenderingContext2D.prototype.setTransform.apply(ctx, _transform);}
        if (_rotate) {
            ctx.rotate(_rotate);}
        if (_scale) {
            CanvasRenderingContext2D.prototype.scale.apply(ctx, _scale);}
        if (_alpha) {
            ctx.globalAlpha = _alpha;}

        if (fill === true || fill === undefined) {
            ctx.fillStyle = color;
            ctx.fillText(label, _point.x, _point.y);
        }
        else {
            ctx.strokeStyle = color;
            ctx.strokeText(label, _point.x, _point.y);
        }
        ctx.restore();
    };

    instance.Text.defaultStyle = {
        font: '12px Arial, sans',
        textAlign: 'start',
        textBaseline: 'top',
        direction: 'inherit',
        lineWidth: 1,
        color: '#000000'
    };

    instance.Text.reset = function () {
        if (instance.Text._text_parameters === false)
            instance.Text._text_parameters = {};

        var key, default_parameters = {
            globalAlpha: false,
            transform: false,
            rotate: false,
            scale: false,
            point: {x:0, y:0},
            x: 0,
            y: 0
        };
        for (key in default_parameters) {
            instance.Text._text_parameters[key] = default_parameters[key];
        }
        for (key in instance.Text.defaultStyle) {
            instance.Text._text_parameters[key] = instance.Text.defaultStyle[key];
        }
    };

    instance.Text.font = function (value) {instance.Text._text_parameters.font = value};
    instance.Text.textAlign = function (value) {instance.Text._text_parameters.textAlign = value};
    instance.Text.textBaseline = function (value) {instance.Text._text_parameters.textBaseline = value};
    instance.Text.direction = function (value) {instance.Text._text_parameters.direction = value};
    instance.Text.lineWidth = function (value) {instance.Text._text_parameters.lineWidth = value};
    instance.Text.color = function (value) {instance.Text._text_parameters.color = value};
    instance.Text.alpha = function (value) {instance.Text._text_parameters.globalAlpha = value};
    instance.Text.rotate = function (value) {instance.Text._text_parameters.rotate = value};
    instance.Text.point = function (value) {instance.Text._text_parameters.point = value};
    instance.Text.x = function (value) {instance.Text._text_parameters.x = value};
    instance.Text.y = function (value) {instance.Text._text_parameters.y = value};
    instance.Text.transform = function (value) {instance.Text._text_parameters.transform = value};
    instance.Text.rotate = function (value) {instance.Text._text_parameters.rotate = value};
    instance.Text.scale = function (value) {instance.Text._text_parameters.scale = value};

})