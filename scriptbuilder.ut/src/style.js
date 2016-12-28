////////////////////////////////////////////////////////////////////////
// Style Methods

var Ut = window.Ut || {};   // <<< DELETE THIS STRING

/**
 * Создает генератор для елементов style.
 * Необходимо создавать новый экземпляр
 *
 * s = new Ut.Style();
 *
 * // create style for selector ".box-1"
 * // String params = 'font-size: 12px; ...'
 * // Object params = {'font-size': '12px', ...}
 * // Array params = ['font-size: 12px', ...]
 *
 * s.add('.box-1', params)
 *
 * //get NodeElement
 * s.get()
 *
 * //get text result
 * s.getText()
 *
 * //inject into document.head
 * s.initialize(')
 *
 *
 * @param selector
 * @param property
 * @returns {Window.Ut.Style|Ut.Style}
 * @constructor
 */
Ut.Style = function (selector, property) {

    if(!(this instanceof Ut.Style))
        return new Ut.Style(selector, property);

    var i, key, ctx,
        element = document.createElement('style');

    this.context = '';

    this.add = function (s, p) {
        ctx = '';
        if (typeof p === 'string') {
            this.context += s + "{" + ( (p.substr(-1) == ';') ? p : p + ';' ) + "}";
        }
        else if (Array.isArray(p)) {
            for (i = 0; i < p.length; i ++)
                ctx += (p[i].substr(-1) == ';') ? p[i] : p[i] + ';'
            this.context += s + "{" + ctx + "}";
        }
        else if (Object.is(p)) {
            for (key in p)
                ctx += key + ':' + p[key] + ';';
            this.context += s + "{" + ctx + "}";
        }
        return this;
    };

    this.get = function () {
        element.setAttribute('rel', 'stylesheet');
        element.textContent = this.context;
        return element
    };

    this.getText = function () {
        return '<style rel="stylesheet">' + "\n" + this.context + "\n" + '</style>'
    };

    this.initialize = function () {
        if (document.head)
            document.head.appendChild(this.get());
    };

    if (selector && property)
        this.add(selector, property);
};
