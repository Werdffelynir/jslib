/** Static Methods * */
var NamespaceApplication = window.NamespaceApplication || {}; // THIS-LINE-WILL-DELETED

/**
 * Loads a script element with javascript source
 *
 * @param src
 * @param onload
 * @param onerror
 * @returns {*}
 */
NamespaceApplication.loadJS = function (src, onload, onerror) {
    if (!src) return null;

    var script = document.createElement('script'),
        id = "src-" + Math.random().toString(32).slice(2);

    script.src = (src.substr(-3) === '.js') ? src : src + '.js';
    script.type = 'application/javascript';
    script.id = id;
    script.onload = onload;
    script.onerror = onerror;

    document.head.appendChild(script);
    return script
};

/**
 * Loads a link element with CSS stylesheet
 *
 * @param url
 * @param onload
 * @param onerror
 * @returns {Element}
 */
NamespaceApplication.loadCSS = function (src, onload, onerror) {
    if (!src) return null;

    var link = document.createElement('link'),
        id = "src-" + Math.random().toString(32).slice(2);

    link.href = (src.substr(-4) === '.css') ? src : src + '.css';
    link.rel = 'stylesheet';
    link.id = id;
    link.onload = onload;
    link.onerror = onerror;

    document.head.appendChild(link);
    return link
};

/**
 * Create global extension.
 * Need declare after loading core, but before loading modules
 *
 * @param extensionName
 * @param callback
 */
NamespaceApplication.extension = function (extensionName, callback) {
    NamespaceApplication.extension.stack[extensionName] = {
        name:extensionName,
        callback:callback
    };
};
NamespaceApplication.extension.stack = {};

/**
 * Execute callback function if or when DOM is loaded
 *
 * @param callback
 */
NamespaceApplication.domLoaded = function (callback) {
    if (document.querySelector('body'))
        callback.call();
    else
        document.addEventListener('DOMContentLoaded', function () {callback.call()}, false);
};

/**
 * Вернет обобщенный тип передаваемого параметра value,
 * или сравнит тип value с передаваемым type и вернет boolean
 * Поддержуемые значение типов: null, boolean, undefined, function, string, number, date, number, array, object
 * @param value
 * @param type
 * @returns {string}
 */
NamespaceApplication.typeOf = function (value, type) {
    var simpleTypes = ['null','boolean','undefined','function','string','number','date','number','array','object'],
        t = NamespaceApplication.typeOfStrict(value).toLowerCase();
    if (simpleTypes.indexOf(t) === -1 && typeof value === 'object')
        t = 'object';

    return typeof type === 'string' ? type.toLowerCase() === t : t;
};

/**
 * Вернет строгий/точный тип передаваемого параметра value,
 * или сравнит тип value с передаваемым type и вернет boolean
 * Возможные заначения: null, Boolean, undefined, Function, String, Number, Date, Number, Array, Object ...
 * для HTML елементов / объектов WebAPI возвращает имя объекта, например для <a> вернет HTMLAnchorElement
 * https://developer.mozilla.org/ru/docs/Web/API
 *
 * @param value
 * @param type
 * @returns {*}
 */
NamespaceApplication.typeOfStrict = function (value, type) {
    var t = Object.prototype.toString.call(value).slice(8, -1);
    return typeof type === 'string' ? type === t : t;
};

/**
 * Is defined value
 *
 * @param value
 * @returns {boolean}
 */
NamespaceApplication.defined = function (value) {
    return value !== undefined
};

/**
 * Checked value on nodeType Node.ELEMENT
 *
 * @param value
 * @returns {*|boolean}
 */
NamespaceApplication.isNode = function (value) {
    return value && (value.nodeType === Node.TEXT_NODE ||
        value.nodeType === Node.ELEMENT_NODE ||
        value.nodeType === Node.DOCUMENT_FRAGMENT_NODE ||
        value.nodeType === Node.DOCUMENT_NODE)
};

/**
 * Deeply extends two objects
 *
 * @param  {Object} destination The destination object, This object will change
 * @param  {Object} source      The custom options to extend destination by
 * @return {Object}             The desination object
 */
NamespaceApplication.extend = function(destination, source) {
    var property;
    for (property in source) {
        if (source[property] && source[property].constructor && source[property].constructor === Object) {
            destination[property] = destination[property] || {};
            NamespaceApplication.extend(destination[property], source[property]);
        } else
            destination[property] = source[property];
    }
    return destination;
};

/**
 * Get rel URI
 *
 * @param uri
 * @returns {string}
 */
NamespaceApplication.uri = function (uri) {
    uri = uri || location.pathname;
    uri = uri.replace(/\/+/ig,'/');
    return uri.length > 1 && uri.slice(0,1) != '/' ? '/' + uri : uri;
};

/**
 * Simple redirect
 *
 * @param to
 */
NamespaceApplication.redirect = function (to) {
    window.location.href = to || window.location.href;
};

/**
 * Get route - URI Path
 *
 * @returns {string}
 */
NamespaceApplication.routePath = function (hash, query) {
    var path = window.location.pathname;
    if (hash)
        path += window.location.hash;
    if (query)
        path += window.location.search;
    if (this.url && path.indexOf(this.url) === 0) {
        path = path.substr(this.url.length);
        if (path.slice(0, 1) !== '/') path = '/' + path;
    }
    return path;
};

/**
 * Select and return a object with elements selected by 'attr'
 * or if 'attr' is false return numeric object
 * .search('li.num', 'data-id')
 * .search('li')
 * .search('li', false, NodeElement)
 *
 * @param selector
 * @param attr
 * @param from
 * @returns {{}}
 */
NamespaceApplication.search = function (selector, attr, from) {
    from = NamespaceApplication.isNode(from) ? from : NamespaceApplication.query(from);
    var i = 0, key, elements = {},
        queryElements = NamespaceApplication.queryAll(selector, from || document.body);
    if (queryElements) {
        while (i < queryElements.length) {
            if (!attr)
                elements[i] = queryElements[i];
            else {
                if (queryElements[i].hasAttribute(attr)) {
                    key = queryElements[i].getAttribute(attr);
                    elements[key] = queryElements[i];
                }
            }
            i ++;
        }
    }
    return elements;
};

/**
 * Select and return a one (first) element by selector
 *
 * @param selector      String
 * @param fromCallback  String|HTMLElement|Function
 * @param thisInstance  Object
 * @returns {Element|null}
 */
NamespaceApplication.query = function (selector, fromCallback, thisInstance) {
    var elems = NamespaceApplication.queryAll(selector, fromCallback, thisInstance);
    return elems && elems[0] ? elems[0] : null;
};

/**
 * Selects and return an all elements by selector
 *
 * @param selector      String
 * @param fromCallback  String|HTMLElement|Function
 * @param thisInstance  Object
 * @returns {*}
 */
NamespaceApplication.queryAll = function (selector, fromCallback, thisInstance) {
    var type = typeof fromCallback,
        from = document,
        elements = [],
        callback = null;

    if (NamespaceApplication.isNode(selector))
        return [selector];

    if (type == "function")
        callback = fromCallback;
    else if (type == "string")
        from = document.querySelector(fromCallback);
    else if (type == "object" && NamespaceApplication.isNode(fromCallback))
        from = fromCallback;

    if (from)
        elements = [].slice.call(from.querySelectorAll(selector));

    if (callback)
        callback.call(thisInstance || {}, elements);

    return elements;
};

/**
 * Select and return a one element by selector. Search up on a DOM tree
 *
 * @deprecated
 * @param selector
 * @param from
 * @param loops
 * @returns {*}
 */
NamespaceApplication.queryUp = function(selector, from, loops) {
    var item = null;

    if(loops === undefined)
        loops = 20;

    if(typeof from === 'string')
        from = document.querySelector(from);

    if(from.nodeType !== Node.ELEMENT_NODE) {
        from = document;
        loops = 0;
    }

    if(typeof selector === 'string')
        item = from.querySelector(selector);

    if(!item && loops > 0 && from.parentNode)
        return NamespaceApplication.queryUp(selector, from.parentNode, --loops);

    return item;
};

/**
 * Execute callback for each element in list
 *
 * @param list
 * @param callback
 * @param tmp
 */
NamespaceApplication.each = function (list, callback, tmp) {
    var i = 0;
    if (list instanceof Array)
        for (i = 0; i < list.length; i++) callback.call({}, list[i], i, tmp);
    else
        for (i in list) callback.call({}, list[i], i, tmp);
};

/**
 * Execute callback for each parent element
 * and return array with parents elements
 * .eachParent('.my-class')
 * .eachParent('.my-class', function filter (parent) {}, 10)
 *
 * @param selector          Start selector or element
 * @param callbackFilter    Each return value it is filter mark, bool true add element to result array
 * @param loops
 * @returns {Array}
 */
NamespaceApplication.eachParent = function (selector, callbackFilter, loops) {
    loops = loops === undefined ? 10 : loops;
    selector = NamespaceApplication.isNode(selector) ? selector : NamespaceApplication.query(selector);

    var result = [],
        get_parent = function (elem) {
            return elem && elem.parentNode ? elem.parentNode : false
        },
        parent = get_parent(selector);

    while (loops > 0 && parent) {
        loops--;

        if (typeof callbackFilter === 'function') {
            if (callbackFilter.call({}, parent))
                result.push(parent);
        } else {
            result.push(parent);
        }

        parent = get_parent(parent);
    }
    return result;
};

/**
 * Simple add event listener
 *
 * @param selector
 * @param eventName
 * @param callback
 * @param bubble
 */
NamespaceApplication.on = function (selector, eventName, callback, bubble) {
    var i, elements = null,
        typeSelector = NamespaceApplication.typeOf(selector);

    if (typeSelector == 'string')
        elements = NamespaceApplication.queryAll(selector);
    else if (typeSelector == 'object' && selector.nodeType == Node.ELEMENT_NODE)
        elements = [selector];
    else if (typeSelector == 'array')
        elements = selector;

    if (elements) {
        for (i = 0; i < elements.length; i ++ )
            if (typeof elements[i] === 'object')
                elements[i].addEventListener(eventName, callback, !!bubble);
    }
};

/**
 * App style\s to HTMLElement\s
 *
 * .css('.menuinline', 'background-color: #ffffff')
 * .css(HTMLElement, 'background-color: #10b626; color: #3a363f')
 * .css([HTMLElement, HTMLElement, ...], {fontSize: '22px'})
 *
 * @param selector
 * @param properties
 * @returns {*}
 */
NamespaceApplication.css = function (selector, properties) {
    if (!selector || !properties) return;

    var i, k, elements = null,
        typeSelector = NamespaceApplication.typeOf(selector),
        typeProperties = NamespaceApplication.typeOf(properties),
        parse = function (str) {
            var i, p1 = str.split(';'), p2, pn, ix, o = {};
            for (i = 0; i < p1.length; i++) {
                p2 = p1[i].split(':');
                pn = p2[0].trim();
                ix = pn.indexOf('-');
                if (ix !== -1)
                    pn =  pn.substring(0, ix) + pn[ix+1].toUpperCase() + pn.substring(ix + 2);
                if (p2.length == 2)
                    o[pn] = p2[1].trim()
            }
            return o;
        };

    if (typeProperties == 'string')
        properties = parse(properties);

    if (typeSelector == 'string')
        elements = NamespaceApplication.queryAll(selector);
    else if (typeSelector == 'object' && selector.nodeType == Node.ELEMENT_NODE)
        elements = [selector];
    else if (typeSelector == 'array')
        elements = selector;

    if (elements) {
        for (i in elements)
            for (k in properties)
                elements[i].style[k] = properties[k];
    }
    return elements
};

/**
 *
 * @type {{hide: Window.NamespaceApplication.cssDisplay.hide, show: Window.NamespaceApplication.cssDisplay.show, toggle: Window.NamespaceApplication.cssDisplay.toggle, last: Window.NamespaceApplication.cssDisplay.last, isHidden: Window.NamespaceApplication.cssDisplay.isHidden}}
 */
NamespaceApplication.cssDisplay = {
    hide: function (src) {
        src._display = src.style.display ? src.style.display : getComputedStyle(src).display;
        NamespaceApplication.css(src, {display:'none'})},
    show: function (src) {
        NamespaceApplication.css(src, {display: src._display ? src._display : 'block'})},
    toggle: function (src) {
        if (src.style.display == 'none') NamespaceApplication.cssDisplay.show(src);
        else NamespaceApplication.cssDisplay.hide(src)},
    last: function (src) {
        return src._display ? src._display : (src.style.display  ? src.style.display : getComputedStyle(src).display) },
    isHidden: function (src) {
        return src.style.display == 'none' || getComputedStyle(src).display == 'none' }
};

/**
 * Inject data into HTMLElement by selector
 *
 * @param selector
 * @param data
 * @param append
 * @returns {*}
 */
NamespaceApplication.inject = function (selector, data, append) {
    if (typeof selector === 'string')
        selector = this.query(selector);
    if (NamespaceApplication.isNode(selector)) {
        if (NamespaceApplication.isNode(data)) {
            if (!append)
                selector.textContent = '';
            selector.appendChild(data);
        } else
            selector.innerHTML = (!append) ? data : selector.innerHTML + data;
        return selector;
    }
    return null;
};

/**
 * Formatting of string, or maybe template builder
 *
 * Examples:
 * .format("Hello {0}, your code is {1}!", ['Ivan', 'Prefect']);
 * .format("Hello {name}, your code is {mean}!", {name:'Ivan', mean: 'Prefect'});
 *
 * @param string    String
 * @param formated  Array|Object
 * @returns string
 */
NamespaceApplication.format = function(string, formated) {
    var reg;
    if (Array.isArray(formated))
        reg = new RegExp(/{(\d+)}/g);
    else if (formated && typeof formated === 'object')
        reg = new RegExp(/{(\w+)}/g);

    return string.replace(reg, function(match, number) {
        return typeof formated[number] != 'undefined' ? formated[number] : match;
    });
};

/**
 * Base AJAX request.
 *
 * Example:
 * .ajax({method: 'POST', url: '/server.php', data: {id:123}}, function (status, data) {});
 *
 * @param {*} config        {method: 'POST', data: {}, headers: {}, action: '/index'}
 * @param callback          executing event - onloadend. function (status, responseText)
 * @param thisInstance      object 'this' for callback
 *
 * @returns {XMLHttpRequest}
 */
NamespaceApplication.ajax = function (config, callback, thisInstance) {
    var kd,
        kh,
        form_data = new FormData(),
        xhr = new XMLHttpRequest(),
        conf = {
            method: config.method || 'GET',
            data:   config.data || {},
            headers:config.headers || {},
            action: config.action || config.url || document.location.href
        };

    if (config.data instanceof FormData) {
        form_data = config.data;
        conf.data = {} }

    if (conf.method.toUpperCase() !== 'POST') {
        conf.action += conf.action.indexOf('?') === -1 ? '?' : '';
        for (kd in conf.data)
            conf.action += '&' + kd + '=' + encodeURIComponent(conf.data[kd])
    } else
        for (kd in conf.data)
            form_data.append(kd, encodeURIComponent(conf.data[kd]));

    xhr.open (conf.method, conf.action, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    for (kd in conf.headers)
        xhr.setRequestHeader(kd, conf.headers[kd]);

    xhr.onloadend = function () {
        if (typeof thisInstance !== 'object') thisInstance = {};

        thisInstance.XMLHttpRequest = xhr;

        if (typeof callback === 'function')
            callback.call(thisInstance, xhr.status, xhr.responseText);
    };
    xhr.send(form_data);

    return xhr;
};

/**
 * Create DOM Element with attributes
 * @param tag
 * @param attrs
 * @param inner
 * @returns {*}
 */
NamespaceApplication.createElement = function (tag, attrs, inner) {
    var elem = document.createElement(tag);
    if (typeof elem !== 'object') return null;
    if (typeof attrs === 'object')
        for (var key in attrs)
            elem.setAttribute(key, attrs[key]);
    if (typeof inner === 'string') {
        elem.innerHTML = inner;
    } else if (typeof inner === 'object') {
        elem.appendChild(inner);
    }
    return elem;
};

/**
 * Simple timer realise. Return self-instance
 * timer = new .Timer(function(iterator, repeat){}, 1000, 5)
 *
 * @param callback
 * @param delay
 * @param repeat
 * @param thisInstance  if not set, uses instance of Timer
 * @returns {Window.NamespaceApplication.Timer|NamespaceApplication.Timer}
 * @constructor
 */
NamespaceApplication.Timer = function (callback, delay, repeat, thisInstance) {
    if (!(this instanceof NamespaceApplication.Timer))
        return new NamespaceApplication.Timer(callback, delay, repeat, thisInstance);

    delay = delay !== undefined ? parseInt(delay) : 500;
    repeat = repeat !== undefined ? parseInt(repeat) : 0;

    var
        config = {self: this, callback: callback, delay: delay, repeat: repeat},
        ht = null,
        hc = function () {
            config.self.iterator++;
            if (config.repeat !== 0 && config.repeat <= config.self.iterator)
                config.self.stop();
            config.callback.call(thisInstance || this, config.self.iterator, config.repeat);
        };

    this.repeat = repeat;
    this.iterator = 0;
    this.start = function () {
        if (config.repeat === 0 || config.repeat > config.self.iterator)
            ht = setInterval(hc, config.delay);
    };
    this.stop = function () {
        this.iterator = config.repeat;
        this.clear();
    };
    this.pause = function () {this.clear()};
    this.reset = function () {this.iterator = 0};
    this.clear = function () {clearInterval(ht)};
};

/**
 * LocalStorage wrapper
 *
 * @param name
 * @param value
 * @returns {{set: (NamespaceApplication.Storage.set|*), get: (NamespaceApplication.Storage.get|*), key: (NamespaceApplication.Storage.key|*), clear: (NamespaceApplication.Storage.clear|*), remove: (NamespaceApplication.Storage.remove|*), length: (NamespaceApplication.Storage.length|*)}}
 * @constructor
 */
NamespaceApplication.Storage = function (name, value) {
    switch (arguments.length) {
        case 0:
            return {
                set: NamespaceApplication.Storage.set,
                get: NamespaceApplication.Storage.get,
                key: NamespaceApplication.Storage.key,
                clear: NamespaceApplication.Storage.clear,
                remove: NamespaceApplication.Storage.remove,
                length: NamespaceApplication.Storage.length
            };
            break;
        case 1:
            return NamespaceApplication.Storage.get(name);
            break;
        case 2:
            return NamespaceApplication.Storage.set(name, value);
            break;
    }
};

/**
 * Add item by name
 * @param name
 * @param value
 */
NamespaceApplication.Storage.set = function (name, value) {
    try{value = JSON.stringify(value)}catch(error){}
    return window.localStorage.setItem(name, value);
};

/**
 * Get item by name
 * @param name
 */
NamespaceApplication.Storage.get = function (name) {
    var value = window.localStorage.getItem(name);
    if(value)
        try{value = JSON.parse(value)}catch(error){}
    return value;
};

/**
 * Remove item by name
 * @param name
 */
NamespaceApplication.Storage.remove = function (name) {return window.localStorage.removeItem(name)};

/**
 * Get item by index
 * @param index
 * @returns {string}
 */
NamespaceApplication.Storage.key = function (index) {return window.localStorage.key(index)};

/**
 * When invoked, will empty all keys out of the storage.
 */
NamespaceApplication.Storage.clear = function () {return window.localStorage.clear()};

/**
 * Returns an integer representing the number of data items stored in the Storage object.
 * @returns {number}
 */
NamespaceApplication.Storage.length = function () {return window.localStorage.length}