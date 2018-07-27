Animate.Extension(function (instance) {

    if (!(instance instanceof Animate))
        return;

    /**
     * @namespace Animate.prototype.TextFormat
     * @type {Animate.prototype.TextFormat}
     */
    instance.TextFormat = {};
    instance.TextFormat._parameters = false;
    instance.TextFormat._styles = {};

    /**
     * @namespace Animate.prototype.TextFormat.style
     * @ type Animate.prototype.TextFormat.style
     * @param name
     * @param params
     */
    instance.TextFormat.style = function (name, params) {
        instance.TextFormat._styles[name] = {}
    };

    /**
     * Create text block
     * @param x
     * @param y
     * @param label
     * @param color
     * @param fill
     * @namespace Animate.prototype.TextFormat.write
     */
    instance.TextFormat.write = function (x, y, label, color, fill) {

    };

})