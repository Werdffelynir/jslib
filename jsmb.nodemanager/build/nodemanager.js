(function (window) {

    var NodeManager = (function () {

        return function (selector, attr, orNameTransform) {
            if (!(this instanceof NodeManager)) return new NodeManager(selector, attr, orNameTransform);

            this.config = {
                attr: 'name',
                name: 'defined',
                selector: '*[name]'
            };

            this.elements = {};
            this.query = NodeManager.query;
            this.queryAll = NodeManager.queryAll;
            this.create = NodeManager.create;
            this.template = NodeManager.template;

            if (selector && typeof selector === 'object')
                this.setConfiguration(selector);
            else
                this.setConfiguration({selector: selector, attr: attr || false, name: orNameTransform || false});

            return this;
        }
    })();

    NodeManager.prototype = (function () {

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
                for (i = 0; i < elems.length; i++) {
                    if (!this.config.attr && this.config.name) {
                        this.elements[this.config.name] = elems;
                    } else if (elems[i].hasAttribute(this.config.attr)) {
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

        prototype.setConfigurationName = function (data) {
            this.config.name = data;
            return this;
        };
        prototype.setConfigurationAttr = function (data) {
            this.config.attr = data;
            return this;
        };
        prototype.setConfigurationSelector = function (data) {
            this.config.selector = data;
            return this;
        };

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
                callbackFunction = function (event) {
                    callback.call(this, event, event.target)
                };

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

    })();

    NodeManager.prototype.constructor = NodeManager;

    /** NodeManager Static Methods //////////////////////////////////////////////////////////////////////////////////////// */

    /**
     * Query DOM Element by selector
     *
     * @param selector
     * @param parent|callback
     * @returns {Element}
     */
    NodeManager.query = function (selector, parent) {
        var elems = NodeManager.queryAll(selector, parent);
        if (elems && elems.length > 0)
            return elems[0];
        return null;
    };

    /**
     * Query DOM Elements by selector
     *
     * @param selector
     * @param parent    callback
     * @returns {*}
     */
    NodeManager.queryAll = function (selector, parent) {
        var callback, _elemsList, elems, from = document;

        if (typeof parent === 'function')
            callback = parent;
        else if (typeof parent === 'string')
            from = document.querySelector(parent);
        else if (typeof parent === 'object' && parent.nodeType === Node.ELEMENT_NODE)
            from = parent;

        if (from) {
            if (typeof selector === 'object' &&
                (selector.nodeType === Node.ELEMENT_NODE || selector.nodeType === Node.DOCUMENT_NODE))
                elems = [selector];
            else
                elems = [].slice.call(from.querySelectorAll(selector));
        }

        if (elems.length > 0 && typeof callback == 'function')
            callback.call(callback, elems);

        return elems;
    };

    /**
     * Add event listener for selector
     * @param selector  String, Array, NodeElement
     * @param event
     * @param callback
     * @param useCapture
     */
    NodeManager.on = function (selector, event, callback, useCapture) {

        if (selector.nodeType === Node.ELEMENT_NODE) {
            selector.addEventListener(event, callback || function () {
                }, useCapture);
        }
        if (typeof selector === 'string') {
            NodeManager.on(NodeManager.queryAll(selector), event, callback, useCapture);
        }
        else if (selector && selector.length > 0) {
            var i;
            for (i = 0; i < selector.length; i++) {
                NodeManager.on(selector[i], event, callback, useCapture);
            }
        }
    };

    /**
     * Create an element of document.createElement
     * @param tag
     * @param attrs
     * @param inner
     * @returns {*}
     */
    NodeManager.create = function (tag, attrs, inner) {
        var key, elem = document.createElement(tag);
        if (typeof elem !== 'object') return null;
        if (typeof attrs === 'object')
            for (key in attrs)
                elem.setAttribute(key, attrs[key]);
        if (typeof inner === 'string') elem.innerHTML = inner;
        else if (typeof inner === 'object') elem.appendChild(inner);
        return elem;
    };

    /**
     * Render template
     * @param viewString    String view, binding {{key}}
     * @param params        Object params {key: 'Title'}
     * @returns {*}
     */
    NodeManager.template = function (viewString, params) {
        if (typeof params === 'object')
            for (var k in params)
                viewString = viewString.replace(new RegExp('{{' + k + '}}', 'gi'), params[k]);
        return viewString;
    };
    ;

    window.NodeManager = NodeManager;

})(window);