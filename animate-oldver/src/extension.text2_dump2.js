

var Text = {};

Text._style = {};
Text._style_name = false;
Text._style_keys = ['font', 'textAlign', 'textBaseline',];

Text._style['simple'] = {
    font: '12px Arial, sans',
    textAlign: 'start',
    textBaseline: 'top',
    direction: 'inherit',
    lineWidth: 1,
    globalAlpha: false,
    color: '#000000',
    fill: true,
};

/**
 * @param name
 * @param styles
 */
Text.setStyle = function (name, data) {
    var k, style = {};bbb
    for (k in data) {
        if (k in this._style['simple']) {
            style[k] = data[k];
        }
    }
    console.log(style)

    Text._style[name] = style
};
Text.style = function (name) {
    if (this._style[name] && this._style_name !== name) {
        // apply
    }
};


/**
 * Create text block
 * @param x
 * @param y
 * @param label
 * @param fill
 * @param style_name
 */
Text.write = function (x, y, label, fill) {

    console.log(this);

/*    if (fill === true || fill === undefined) {
        context.fillStyle = color;
        context.fillText(label, _point.x, _point.y);
    }
    else {
        context.strokeStyle = color;
        context.strokeText(label, _point.x, _point.y);
    }*/
};


/**
 * @namespace Animate.prototype.Text
 */
Animate.prototype.Text = Text