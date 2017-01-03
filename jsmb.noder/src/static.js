/** Noder Static Methods //////////////////////////////////////////////////////////////////////////////////////// */
var Noder = window.Noder || {}; // THIS-LINE-WILL-DELETED

/**
 * Query DOM Element by selector
 *
 * @param selector
 * @param parent|callback
 * @returns {Element}
 */
Noder.query = function (selector, parent) {
    var elems = Noder.queryAll(selector, parent);
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
Noder.queryAll = function (selector, parent) {
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
Noder.on = function (selector, event, callback, useCapture) {

    if (selector.nodeType === Node.ELEMENT_NODE) {
        selector.addEventListener(event, callback || function(){}, useCapture);
    }
    if (typeof selector === 'string') {
        Noder.on(Noder.queryAll(selector), event, callback, useCapture);
    }
    else if (selector && selector.length > 0) {
        var i;
        for(i = 0; i < selector.length; i++ ) {
            Noder.on(selector[i], event, callback, useCapture);
        }
    }
}