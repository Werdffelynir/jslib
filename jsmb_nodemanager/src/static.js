/** NodeManager Static Methods //////////////////////////////////////////////////////////////////////////////////////// */
var NodeManager = window.NodeManager || {}; // THIS-LINE-WILL-DELETED

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
        selector.addEventListener(event, callback || function(){}, useCapture);
    }
    if (typeof selector === 'string') {
        NodeManager.on(NodeManager.queryAll(selector), event, callback, useCapture);
    }
    else if (selector && selector.length > 0) {
        var i;
        for(i = 0; i < selector.length; i++ ) {
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
    if (typeof elem  !== 'object') return null;
    if (typeof attrs === 'object')
        for (key in attrs)
            elem.setAttribute(key, attrs[key]);
    if (typeof inner === 'string') elem.innerHTML = inner;
    else if (typeof inner === 'object') elem.appendChild(inner);
    return elem;
};

/**
 *
 * @param viewString
 * @param params
 * @returns {*}
 */
NodeManager.template = function (viewString, params) {
    if (typeof params === 'object')
        for (var k in params)
            viewString = viewString.replace(new RegExp('{{' + k + '}}', 'gi'), params[k]);
    return viewString;
}