Animate.Extension(function (instance) {

    if (!(instance instanceof Animate))
        return;

    /**
     * @type CanvasRenderingContext2D
     */
    var context = instance.getContext();

    instance.text = {
        _parameters: false
    };

    /**
     * Create text block
     * @param x
     * @param y
     * @param label
     * @param color
     * @param fill
     */
    instance.text.write = function (x, y, label, color, fill) {

        if (arguments.length === 1) {
            label = x;
            x = instance.text._parameters.x;
            y = instance.text._parameters.y;
        }

        fill = fill === undefined ? instance.text._parameters.fill : fill;
        color = color === undefined ? instance.text._parameters.color : color;

        var _point = instance.text._parameters.point;
        var _alpha = instance.text._parameters.alpha;
        var _scale = instance.text._parameters.scale;
        var _rotate = instance.text._parameters.rotate;
        var _transform = instance.text._parameters.transform;

        context.save();
        context.translate(x, y);
        context.font = instance.text._parameters.font;
        context.textAlign = instance.text._parameters.textAlign;
        context.textBaseline = instance.text._parameters.textBaseline;
        context.direction = instance.text._parameters.direction;
        context.lineWidth = instance.text._parameters.lineWidth;
        context.globalAlpha = instance.text._parameters.alpha;

        //context.lineWidth = instance.text._parameters.lineWidth;
        if (_transform) {
            CanvasRenderingContext2D.prototype.setTransform.apply(context, _transform);}
        if (_rotate) {
            context.rotate(_rotate);}
        if (_scale) {
            CanvasRenderingContext2D.prototype.scale.apply(context, _scale);}
        if (_alpha) {
            context.globalAlpha = _alpha;}

        if (fill === true || fill === undefined) {
            context.fillStyle = color;
            context.fillText(label, _point.x, _point.y);
        }
        else {
            context.strokeStyle = color;
            context.strokeText(label, _point.x, _point.y);
        }
        context.restore();
    };

    instance.text.defaultStyle = {
        font: '12px Arial, sans',
        textAlign: 'start',
        textBaseline: 'top',
        direction: 'inherit',
        lineWidth: 1,
        color: '#000000'
    };

    instance.text.reset = function () {

        if (instance.text._parameters === false)
            instance.text._parameters = {};

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
            instance.text._parameters[key] = default_parameters[key];
        }

        for (key in instance.text.defaultStyle) {
            instance.text._parameters[key] = instance.text.defaultStyle[key];
        }
    };

    instance.text.font = function (value) {instance.text._parameters.font = value};
    instance.text.textAlign = function (value) {instance.text._parameters.textAlign = value};
    instance.text.textBaseline = function (value) {instance.text._parameters.textBaseline = value};
    instance.text.direction = function (value) {instance.text._parameters.direction = value};
    instance.text.lineWidth = function (value) {instance.text._parameters.lineWidth = value};
    instance.text.color = function (value) {instance.text._parameters.color = value};
    instance.text.alpha = function (value) {instance.text._parameters.globalAlpha = value};
    instance.text.rotate = function (value) {instance.text._parameters.rotate = value};
    instance.text.point = function (value) {instance.text._parameters.point = value};
    instance.text.x = function (value) {instance.text._parameters.x = value};
    instance.text.y = function (value) {instance.text._parameters.y = value};
    instance.text.transform = function (value) {instance.text._parameters.transform = value};
    instance.text.rotate = function (value) {instance.text._parameters.rotate = value};
    instance.text.scale = function (value) {instance.text._parameters.scale = value};

    instance.text.position = function (x, y) {
        if (arguments.length === 1 && arguments[0] && typeof arguments[0] === 'object') {
            instance.text._parameters.x = arguments[0].x;
            instance.text._parameters.y = arguments[0].y;
        } else {
            instance.text._parameters.x = x;
            instance.text._parameters.y = y;
        }
    };

    // init
    if (instance.text._parameters === false) {
        instance.text.reset();
    }

})