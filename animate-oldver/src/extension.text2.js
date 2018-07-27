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

    TextField._current_stylename = false;

  /**
   *
    TextField._stylelist = {
        default: {

            font: '14px Arial, sans',
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
            fill: true,
            value: ''
        }
    };     */

/*    TextField._custom_properties = [
        'x',
        'y',
        'fill',
        'text',
        'point'
    ];

    TextField._canvas_properties = [
        'font',
        'lineWidth',
        'direction',
        'textAlign',
        'globalAlpha',
        'textBaseline'
    ];

    TextField._canvas_methods = [
        'scale',
        'rotate'
    ];*/

    /**
     * label
     * label, styleName
     * label, x, y
     * label, x, y, styleName
     *
     * @param value
     * @param b
     * @param c
     * @param d
     */
/*
    TextField.write = function (value, b, c, d) {

        var style, color, name = (arguments.length === 2 && typeof b === 'string') ? b
            : (arguments.length === 4 && typeof d === 'string') ? d :'default';

        style = this.applyStyle(name);
        style.value = value;
        if (arguments.length  >  2 && typeof b === 'number' && typeof c === 'number') {
            style.x = b;
            style.y = c;
        }
*/


/*        if (arguments.length === 1) {
            style.value = value;

        } else if (arguments.length === 2 && typeof b === 'string') {
            style = this.getStyle(b);
            style.value = value;

        } else if (arguments.length  >  2 && typeof b === 'number' && typeof c === 'number') {
            if (typeof d === 'string') {
                if (d.substr(0,1) === '#') style.color = d;
                else style = this.getStyle(d);
            }
            style.value = value;
            style.x = b;
            style.y = c;
        }*/

/*
console.log(name, style);

        this.drawText(style);
    };

    TextField.drawText = function (style) {

        var tmp = {
            fillStyle: context.fillStyle,
            strokeStyle: context.strokeStyle,
        };


        if (style.fill) {
            context.fillStyle = style.color;
            context.fillText(style.value, style.x, style.y);
            context.fillStyle = tmp.fillStyle;
        }
        else {
            context.strokeStyle = style.color;
            context.strokeText(style.value, style.x, style.y);
            context.strokeStyle = tmp.strokeStyle;
        }


    };



    TextField.addStyle = function (name, st_object) {
        this._stylelist[name] = this.createStyle(st_object);
        return this._stylelist[name];
    };
*/


/*    TextField.getStyle = function (name) {


/!*        if (this._current_stylename !== name) {
            var st = this._stylelist[name || 'default'];
            if (st) {





                this._current_stylename = name;
            }
        }*!/

        return name && this._stylelist[name]
            ? this._stylelist[name]
            : this._stylelist[this._current_stylename || 'default']
    };*/


/*
    TextField.applyStyle = function (name) {
        name = name || 'default';

        if (this._current_stylename !== name) {
            var st = this._stylelist[name];
            if (st) {


                context.font = st.font;
                context.textAlign = st.textAlign;
                context.textBaseline = st.textBaseline;
                context.direction = st.direction;
                context.lineWidth = st.lineWidth;

                //context.globalAlpha = st.globalAlpha;





                this._current_stylename = name;
            }
        }

        return this._stylelist[this._current_stylename];
    };




    TextField.createStyle = function (st_object) {
        var k, def = JSON.parse(JSON.stringify(this._stylelist.default));

        for (k in st_object)
            def[k] = st_object[k];

        return def;
    };

    /!**
     * @namespace Animate.prototype.TextField
     *!/
    instance.TextField = TextField;
 */
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
