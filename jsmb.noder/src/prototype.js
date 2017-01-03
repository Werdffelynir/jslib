(function () {

    /**
     *
     * @namespace Noder.prototype
     */
    var prototype = {};

    /**
     * Search elements by config
     * @param from
     * @returns {Noder.search}
     */
    prototype.search = function (from) {
        var i,
            k,
            elems = Noder.queryAll(this.config.selector, from);

        if (elems) {
            for (i = 0; i < elems.length; i ++) {
                if (!this.config.attr && this.config.name) {
                    this.elements[this.config.name] = elems;
                } else
                if (elems[i].hasAttribute(this.config.attr)) {
                    k = elems[i].getAttribute(this.config.attr);

                    if (this.elements[k] !== elems[i])
                        this.elements[k] = elems[i];
                }
            }
        }
        return this;
    };

    /**
     * Get all searched elements
     * @returns {*|HTMLCollection}
     */
    prototype.getElements = function () {
        return this.elements;
    };

    /**
     * Get one elements by attr or by attr and index
     * @param attr
     * @param index
     * @returns {boolean}
     */
    prototype.get = function (attr, index) {
        attr = this.elements[attr] !== undefined ? this.elements[attr] : false;
        if (attr && index !== undefined) {
            attr = attr[index];
        }
        return attr;
    };

    /**
     * Set configuration
     * @param conf
     */
    prototype.setConfiguration = function (conf) {
        for (var k in conf)
            if (this.config[k] !== undefined)
                this.config[k] = conf[k];

        return this;
    };

    prototype.on = function (attr, event, callback, useCapture) {
        var elems = this.get(attr),
            callbackFunction = function (event) {callback.call(this, event, event.target)};

        if (elems) {
            if (elems.nodeType === Node.ELEMENT_NODE)
                elems = [elems];
            Noder.on(elems, event, callbackFunction, useCapture);
        }

        return this;
    };

    prototype.onClick = function (attr, callback, useCapture) {
        this.on(attr, 'click', callback, useCapture);
        return this;
    };

    return prototype;

})()