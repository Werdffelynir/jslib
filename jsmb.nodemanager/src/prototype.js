(function () {

    /**
     *
     * @namespace NodeManager.prototype
     */
    var prototype = {};

    /**
     * Search elements by config
     * @param from
     * @returns {NodeManager.search}
     */
    prototype.search = function (from) {
        var i,
            k,
            elems = NodeManager.queryAll(this.config.selector, from);

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
    //prototype.transformName = function (name) {this.config.name = name; return this; };

    prototype.setConfigurationName = function (data) {this.config.name = data; return this; };
    prototype.setConfigurationAttr = function (data) {this.config.attr = data; return this; };
    prototype.setConfigurationSelector = function (data) {this.config.selector = data; return this; };

    /**
     * Add callback for events, on element|s by attr
     * @param attr          Name is attr
     * @param event         Event name
     * @param callback      Special callback function
     * @param useCapture
     * @returns {NodeManager.prototype.on}
     */
    prototype.on = function (attr, event, callback, useCapture) {
        var elems = this.get(attr),
            callbackFunction = function (event) {callback.call(this, event, event.target)};

        if (elems) {
            if (elems.nodeType === Node.ELEMENT_NODE)
                elems = [elems];
            NodeManager.on(elems, event, callbackFunction, useCapture);
        }
        return this;
    };

    /**
     * Simply callback for event MouseClick on element|s by attr
     * @param attr
     * @param callback
     * @param useCapture
     * @returns {NodeManager.prototype.onClick}
     */
    prototype.onClick = function (attr, callback, useCapture) {
        this.on(attr, 'click', callback, useCapture);
        return this;
    };

    return prototype;

})()