Animate.Extension(function (instance) {

    if (!(instance instanceof Animate))
        return;

    /**
     * @type CanvasRenderingContext2D
     */
    var context = instance.getContext();

    /**
     * @namespace Animate.prototype.TextField
     */
    var TextField = {};


    TextField._last_style_name = false;
    TextField._list_style = {
        default: {
            font: '12px Arial, sans',
            color: '#000000',
            direction: 'inherit',
            textAlign: 'start',
            textBaseline: 'top',
            lineWidth: 1,
            globalAlpha: false,
            transform: false,
            rotate: false,
            scale: false,
            point: {x:0, y:0},
            x: 0,
            y: 0,
            fill: true
        }
    };

    TextField._canvas_properties = [
        'font',
        'textAlign',
        'textBaseline',
        'direction',
        'lineWidth',
        'globalAlpha',
        'direction'
    ];

    TextField._canvas_methods = [
        'scale',
        'rotate'
    ];

    /**
     * label
     * label, styleName
     * label, x, y
     * label, x, y, color
     * label, x, y, styleName
     * @param label
     * @param a
     * @param b
     * @param c
     */
    TextField.write = function (label, a, b, c) {

    };

    TextField.addStyle = function (name, styles) {
        this._list_style[name] = this._create_styles_object(styles);
    };

    TextField.applyStyle = function (name) {};

    TextField._create_styles_object = function (styles) {
        var key, def = JSON.parse(JSON.stringify(this._list_style.default));
        for (key in styles)
            def[key] = styles[key];
        return def;
    };

    /**
     * @namespace Animate.prototype.TextField
     */
    instance.TextField = TextField;

})



















/*
TextField._style = {};
TextField._style_name = false;
TextField._style_keys = [
    'font',
    'textAlign',
    'textBaseline',
    'direction',
    'lineWidth',
    'globalAlpha',
    'direction',
    'direction',
];

TextField._style['simple'] = {
    font: '12px Arial, sans',
    textAlign: 'start',
    textBaseline: 'top',
    direction: 'inherit',
    lineWidth: 1,
    globalAlpha: false,
    color: '#000000',
    fill: true
};*/




/**
 * @param name
 * @param styles

TextField.setStyle = function (name, data) {
    var k, style = {};

    for (k in data) {
        if (k in this._style['simple']) {
            style[k] = data[k];
        }
    }

    console.log(style);

    TextField._style[name] = style
};

TextField.style = function (name) {
    if (this._style[name] && this._style_name !== name) {
        // apply
    }
}; */


/**
 * Create TextField block
 * @param x
 * @param y
 * @param label
 * @param fill
 * @param style_name
 */
/*
TextField.write = function (x, y, label, fill) {

    console.log(this);

    if (fill === true || fill === undefined) {
        context.fillStyle = color;
        context.fillText(label, _point.x, _point.y);
    }
    else {
        context.strokeStyle = color;
        context.strokeText(label, _point.x, _point.y);
    }
};*/
