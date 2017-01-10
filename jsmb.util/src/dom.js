////////////////////////////////////////////////////////////////////////
// Dom Methods
var Ut = window.Ut || {};   // THIS-LINE-WILL-DELETED
Ut.Dom = {};

/**
 * Check src to NodeElement type
 * @param src
 * @returns {boolean}
 */
Ut.Dom.is = function (src) {
    var typeName = Ut.Dom.nodeType(src);
    return ['ELEMENT_NODE', 'DOCUMENT_NODE', 'DOCUMENT_FRAGMENT_NODE'].indexOf(typeName) !== -1
};

/**
 * If is html
 * @param src
 * @returns {boolean}
 */
Ut.Dom.isHTML = function (src) {
    if(Ut.Dom.is(src))
        return true;
    return Ut.Dom.is(Ut.Dom.toNode(src));
};

/**
 * Copy of DOMElement
 * @param src
 * @returns {Node}
 */
Ut.Dom.copy = function (src) {
    return src.cloneNode(true);
};


Ut.Dom.clone = function (src) {
    return Ut.Dom.copy(src);
};

/**
 * Query DOM Element by selector
 *
 * @param selector
 * @param parent|callback
 * @returns {Element}
 */
Ut.Dom.query = function (selector, parent) {
    var elems = Ut.Dom.queryAll(selector, parent);
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
Ut.Dom.queryAll = function (selector, parent) {
    var callback, elems, from = document;

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
 * Query DOM Element by selector to up in tree
 *
 * @param selector
 * @param from
 * @param loops
 * @returns {*}
 */
Ut.Dom.queryUp = function(selector, from, loops) {
    var item = null;
    if(loops === undefined) loops = 20;
    if(typeof from === 'string') from = document.querySelector(from);
    if(from.nodeType !== Node.ELEMENT_NODE) {
        from = document;
        loops = 0;
    }

    if(typeof selector === 'string')
        item = from.querySelector(selector);

    if(!item && loops > 0) {
        if(from.parentNode)
            return app.queryUp(selector, from.parentNode, --loops);
    }

    return item;
};

/**
 *
 * @param elem     Node елемент
 * @param callback получи как аргумет родительский елемент при каждой итерации,
 *                  если функция вернот false итерация прикратится
 * @param limit    количество итерация с возможных,
 */
Ut.Dom.eachParent = function (elem, callback, limit) {
    var i = 0;
    limit = limit || 99;
    while(elem.nodeType === Node.ELEMENT_NODE && i < limit ) {
        var res = callback.call({}, elem);
        if(res === false) i = limit;
        elem = elem.parentNode;
        i ++;
    }
};

/**
 * Get nodeType entry
 * Node.ELEMENT_NODE - 1
 * Node.TEXT_NODE - 3
 * Node.PROCESSING_INSTRUCTION_NODE - 7
 * Node.COMMENT_NODE - 8
 * Node.DOCUMENT_NODE - 9
 * Node.DOCUMENT_TYPE_NODE - 10
 * Node.DOCUMENT_FRAGMENT_NODE - 11
 */
Ut.Dom.nodeType = function (src) {
    var t = src && src.nodeType ? src.nodeType : false,
        e = [];

    e[Node.ELEMENT_NODE] = 'ELEMENT_NODE';
    e[Node.TEXT_NODE] = 'TEXT_NODE';
    e[Node.PROCESSING_INSTRUCTION_NODE] = 'PROCESSING_INSTRUCTION_NODE';
    e[Node.COMMENT_NODE] = 'COMMENT_NODE';
    e[Node.DOCUMENT_NODE] = 'DOCUMENT_NODE';
    e[Node.DOCUMENT_TYPE_NODE] = 'DOCUMENT_TYPE_NODE';
    e[Node.DOCUMENT_FRAGMENT_NODE] = 'DOCUMENT_FRAGMENT_NODE';

    return e[t];
};

/**
 * Convert HTML string to DOMElement
 * @param string
 * @returns {*}
 */
Ut.Dom.toNode = function (string){
    var i,
        fragment = document.createDocumentFragment(),
        container = document.createElement("div");
    container.innerHTML = string;

    while( i = container.firstChild )
        fragment.appendChild(i);

    return fragment.childNodes.length === 1 ? fragment.firstChild : fragment;
};

/**
 * Convert HTML string to DOMElements
 * @param string
 * @returns {*}
 */
Ut.Dom.toNodeStrict = function (string) {
    var parser = new DOMParser();
    var node = parser.parseFromString(string, "text/xml");
    console.log(node);
    if (typeof node == 'object' && node.firstChild.nodeType == Node.ELEMENT_NODE)
        return node.firstChild;
    else
        return false;
};

/**
 * Convert DOMElement to HTML string
 * @param element
 * @returns {*}
 */
Ut.Dom.toHTML = function (element){
    var container = document.createElement("div");
    container.appendChild(element.cloneNode(true));
    return container.innerHTML;
};

/**
 * Create new NodeElement
 * @param tag       element tag name 'p, div, h3 ... other'
 * @param attrs     object with attributes key=value
 * @param inner     text, html or NodeElement
 * @returns {Element}
 */
Ut.Dom.create = function (tag, attrs, inner) {
    var elem = document.createElement(tag);
    if (typeof elem !== 'object') return null;

    if (typeof attrs === 'object') {
        for (var key in attrs)
            elem.setAttribute(key, attrs[key]);
    }

    if (typeof inner === 'string') {
        elem.innerHTML = inner;
    } else if (typeof inner === 'object') {
        elem.appendChild(inner);
    }
    return elem;
};

/**
 * Calculates the position and size of elements.
 *
 * @param elem
 * @returns {{y: number, x: number, width: number, height: number}}
 */
Ut.Dom.position = function (elem) {
    var data = {x: 0, y: 0, width: 0, height: 0};

    if (typeof elem === 'string')
        elem = document.querySelector(elem);

    if (elem === undefined || elem === window || elem === document) {
        data.width = window.innerWidth;
        data.height = window.innerHeight;
        data.element = window;
    }
    else
    if (elem && elem.nodeType === Node.ELEMENT_NODE) {
        if (elem.getBoundingClientRect) {
            var rect = elem.getBoundingClientRect(),
                scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop,
                scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
                clientTop = document.documentElement.clientTop || document.body.clientTop || 0,
                clientLeft = document.documentElement.clientLeft || document.body.clientLeft || 0;

            data.y = Math.round(rect.top + scrollTop - clientTop);
            data.x = Math.round(rect.left + scrollLeft - clientLeft);
            data.width = elem.offsetWidth;
            data.height = elem.offsetHeight;
        }
        else {
            var top = 0, left = 0;
            while (elem) {
                top += parseInt(elem.offsetTop, 10);
                left += parseInt(elem.offsetLeft, 10);
                elem = elem.offsetParent;
            }
            data.y = top;
            data.x = left;
            data.width = elem.offsetWidth;
            data.height = elem.offsetHeight;
        }
        data.element = elem;
    }
    return data;
};
