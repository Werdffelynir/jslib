(function (window) {

    var NamespaceApplication = (function () {
        return function () {
            // Simplex
            if (!(this instanceof NamespaceApplication)) return new NamespaceApplication();

            // Public config properties
            this.path = '/';
            this.debug = true;

            // Private properties
            this._require_key = false;
            this._requires_stack = {};

            // Set Configurations
            if (arguments.length == 1 && arguments[0] && typeof arguments[0] === 'object') {
                for (var k in arguments[0]) {
                    if (this[k] === undefined || ['path', 'debug'].indexOf(k) !== -1)
                        this[k] = arguments[0][k];
                }
            }

            this._init_extensions();
            return this;
        }
    })();

    NamespaceApplication.version = '0.2.2';

    NamespaceApplication.prototype = (function () {
        /**
         * @namespace NamespaceApplication.prototype
         */
        var prototype = {};

        /**
         * Create namespace for module object
         *
         * @param namespace     namespace. Ex: "Module.Name" ="AppInstance.Module.Name"
         * @param callback      Must return Object or Function
         * @returns {NamespaceApplication.prototype.namespace|{}}
         */
        prototype.namespace = function (namespace, callback) {

            var
                i,
                name,
                path = namespace.split('.'),
                inst = this || {},
                len = path.length;

            for (i = 0; i < len; i++) {
                name = path[i].trim();
                if (typeof inst[name] !== 'object') {
                    inst[name] = (i + 1 >= len) ? (callback ? callback.call(inst, this, {}) : {}) : {};
                    inst = inst[name];
                } else
                    inst = inst[name];
            }

            return inst;
        };

        /**
         * Designate a list of scripts for loading
         *
         * @param key           list key (identifier)
         * @param path          array with scripts url
         * @param oncomplete    executing when all scripts are loaded
         * @param onerror
         * @returns {NamespaceApplication.prototype.require}
         */
        prototype.require = function (key, path, oncomplete, onerror) {
            this._require_key = key;
            this._requires_stack[key] = {
                src: Array.isArray(path) ? path : [path],
                elements: [],
                oncomplete: oncomplete,
                onerror: onerror
            };
            return this;
        };

        /**
         * Start loading the list of scripts by key (identifier)
         *
         * @param key
         * @returns {NamespaceApplication.prototype.requireStart}
         */
        prototype.requireStart = function (key) {
            key = key || this._require_key;
            if (this._requires_stack[key])
                this._load_scripts_recursive(0, key);
            else
                console.error("Require source not found! Key: " + key + " not exist!");

            return this;
        };

        prototype._load_scripts_recursive = function (i, key) {
            var self = this,
                requires = this._requires_stack[key];

            if (requires.src[i]) {
                if (!Array.isArray(requires.elements))
                    requires.elements = [];

                requires.elements.push(NamespaceApplication.loadJS(requires.src[i], function () {
                    self._load_scripts_recursive(++i, key);
                }, requires.onerror));
            }
            else if (i === requires.src.length)
                requires.oncomplete.call(self, requires.elements);
            else
                self._load_scripts_recursive(++i, key);
        };

        prototype._init_extensions = function () {
            if (typeof NamespaceApplication.extension === 'function' &&
                typeof NamespaceApplication.extension.stack === 'object') {
                var name, callback, stack = NamespaceApplication.extension.stack;
                for (name in stack) {
                    callback = stack[name]['callback'];
                    if (typeof callback === 'function') {
                        this[name] = callback.call(callback, this)
                    }
                }
            }
        };

        return prototype
    })();

    NamespaceApplication.prototype.constructor = NamespaceApplication;

    /** Static Methods * */

    /**
     * Loads the script element
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
     *
     * Loads the CSS link element
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
     * Create global extension
     * @param extensionName
     * @param callback
     */
    NamespaceApplication.extension = function (extensionName, callback) {
        NamespaceApplication.extension.stack[extensionName] = {
            name: extensionName,
            callback: callback
        };
    };
    NamespaceApplication.extension.stack = {};

    /**
     * Execute callback function if or when DOM is loaded
     * @param callback
     */
    NamespaceApplication.domLoaded = function (callback) {
        if (document.querySelector('body'))
            callback.call();
        else
            document.addEventListener('DOMContentLoaded', function () {
                callback.call()
            }, false);
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
        var simpleTypes = ['null', 'boolean', 'undefined', 'function', 'string', 'number', 'date', 'number', 'array', 'object'],
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
     * @param value
     * @returns {boolean}
     */
    NamespaceApplication.defined = function (value) {
        return value !== undefined
    };

    /**
     * Checked value, is Node.ELEMENT
     * @param value
     * @returns {*|boolean}
     */
    NamespaceApplication.isNode = function (value) {
        return value && (value.nodeType !== Node.ELEMENT_NODE || value.nodeType === Node.DOCUMENT_NODE)
    };

    /**
     * Deeply extends two objects
     * @param  {Object} destination The destination object, This object will change
     * @param  {Object} source      The custom options to extend destination by
     * @return {Object}             The desination object
     */
    NamespaceApplication.extend = function (destination, source) {
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
     * @param uri
     * @returns {string}
     */
    NamespaceApplication.uri = function (uri) {
        uri = uri || location.pathname;
        uri = uri.replace(/\/+/ig, '/');
        return uri.length > 1 && uri.slice(0, 1) != '/' ? '/' + uri : uri;
    };

    /**
     * Simple redirect
     * @param to
     */
    NamespaceApplication.redirect = function (to) {
        window.location.href = to || window.location.href;
    };

    /**
     * Get route - URI Path
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
     * Query DOM Element by selector
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
     * Query DOM Elements by selector
     *
     * @param selector      String
     * @param fromCallback  String|HTMLElement|Function
     * @param thisInstance  Object
     * @returns {*}
     */
    NamespaceApplication.queryAll = function (selector, fromCallback, thisInstance) {
        var type = typeof fromCallback, // "undefined" "string" "function" "object"
            from = document,
            elements = [],
            callback = null;

        if (selector && selector.nodeType === Node.ELEMENT_NODE)
            return [selector];

        if (type == "function")
            callback = fromCallback;
        else if (type == "string")
            from = document.querySelector(fromCallback);
        else if (type == "object" && fromCallback && (fromCallback.nodeType === Node.ELEMENT_NODE || fromCallback.nodeType === Node.DOCUMENT_NODE))
            from = fromCallback;

        if (from)
            elements = [].slice.call(from.querySelectorAll(selector));

        if (callback)
            callback.call(thisInstance || {}, elements);

        return elements;
    };

    /**
     * Query DOM Element by selector to up in tree
     * @param selector
     * @param from
     * @param loops
     * @returns {*}
     */
    NamespaceApplication.queryUp = function (selector, from, loops) {
        var item = null;

        if (loops === undefined)
            loops = 20;

        if (typeof from === 'string')
            from = document.querySelector(from);

        if (from.nodeType !== Node.ELEMENT_NODE) {
            from = document;
            loops = 0;
        }

        if (typeof selector === 'string')
            item = from.querySelector(selector);

        if (!item && loops > 0 && from.parentNode)
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
     * Simple add event listener
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
            for (i = 0; i < elements.length; i++)
                if (typeof elements[i] === 'object')
                    elements[i].addEventListener(eventName, callback, !!bubble);
        }
    };

    /**
     * App style\s to HTMLElement\s
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
                        pn = pn.substring(0, ix) + pn[ix + 1].toUpperCase() + pn.substring(ix + 2);
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
     * Simple inject data to HTMLElement [by selector]
     *
     * @param selector
     * @param data
     * @param append
     * @returns {*}
     */
    NamespaceApplication.inject = function (selector, data, append) {
        if (typeof selector === 'string')
            selector = this.query(selector);
        if (typeof selector === 'object' && selector.nodeType === Node.ELEMENT_NODE) {
            if (typeof data === 'object' && data.nodeType === Node.ELEMENT_NODE) {
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
     * Simple template builder
     * Examples:
     * .format("Hello {0}, your code is {1}!", ['Ivan', 'Prefect']);
     * .format("Hello {name}, your code is {mean}!", {name:'Ivan', mean: 'Prefect'});
     *
     * @param string    String
     * @param formated  Array|Object
     * @returns string
     */
    NamespaceApplication.format = function (string, formated) {
        var reg;
        if (Array.isArray(formated))
            reg = new RegExp(/{(\d+)}/g);
        else if (formated && typeof formated === 'object')
            reg = new RegExp(/{(\w+)}/g);

        return string.replace(reg, function (match, number) {
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
            fd = new FormData(),
            xhr = new XMLHttpRequest(),
            conf = {
                method: config.method || 'GET',
                data: config.data || {},
                headers: config.headers || {},
                action: config.action || config.url || document.location
            };

        if (conf.method.toUpperCase() !== 'POST') {
            conf.action += conf.action.indexOf('?') === -1 ? '?' : '';
            for (kd in conf.data)
                conf.action += '&' + kd + '=' + encodeURIComponent(conf.data[kd])
        } else
            for (kd in conf.data)
                fd.append(kd, encodeURIComponent(conf.data[kd]));

        xhr.open(conf.method, conf.action, true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

        for (kd in conf.headers)
            xhr.setRequestHeader(kd, conf.headers[kd]);

        xhr.onloadend = function () {
            if (typeof thisInstance !== 'object') thisInstance = {};

            thisInstance.XMLHttpRequest = xhr;

            if (typeof callback === 'function')
                callback.call(thisInstance, xhr.status, xhr.responseText);
        };
        xhr.send(fd);

        return xhr;
    };

    /**
     * Simple timer realise
     * new .Timer(function, 1000, 5)
     * todo: need review of this code
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

        var config = {self: this, callback: callback, delay: delay || 500, repeat: repeat || 0};
        var ht = null;
        var hc = function () {
            config.self.iterator++;
            if (config.repeat !== 0 && config.repeat <= config.self.iterator)
                config.self.stop();
            config.callback.call(thisInstance || this, config.self.iterator, config.repeat);
        };
        this.iterator = 0;
        this.start = function () {
            if (config.repeat === 0 || config.repeat > config.self.iterator)
                ht = setInterval(hc, config.delay);
        };
        this.stop = function () {
            this.iterator = config.repeat;
            this.clear();
        };
        this.pause = function () {
            this.clear();
        };
        this.reset = function () {
            this.iterator = 0;
        };
        this.clear = function () {
            clearInterval(ht);
        };
    };

    /**
     * Storage of local
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
        try {
            value = JSON.stringify(value)
        } catch (error) {
        }
        return window.localStorage.setItem(name, value);
    };

    /**
     * Get item by name
     * @param name
     */
    NamespaceApplication.Storage.get = function (name) {
        var value = window.localStorage.getItem(name);
        if (value)
            try {
                value = JSON.parse(value)
            } catch (error) {
            }
        return value;
    };

    /**
     * Remove item by name
     * @param name
     */
    NamespaceApplication.Storage.remove = function (name) {
        return window.localStorage.removeItem(name)
    };

    /**
     * Get item by index
     * @param index
     * @returns {string}
     */
    NamespaceApplication.Storage.key = function (index) {
        return window.localStorage.key(index)
    };

    /**
     * When invoked, will empty all keys out of the storage.
     */
    NamespaceApplication.Storage.clear = function () {
        return window.localStorage.clear()
    };

    /**
     * Returns an integer representing the number of data items stored in the Storage object.
     * @returns {number}
     */
    NamespaceApplication.Storage.length = function () {
        return window.localStorage.length
    };

    /** Expansion Base **/
    (function (prototype) {
        /**
         * Simple router
         * @param uri
         * @param callback
         * @param hash
         * @param query
         * @returns {boolean}
         */
        prototype.router = function (uri, callback, hash, query) {
            uri = uri || '';
            var reg = new RegExp('^' + uri + '$', 'i'),
                path = NamespaceApplication.routePath.call(this, hash, query);

            if (reg.test(path)) {
                callback.call(this);
                return true;
            }
            return false;
        };

        /*assign static as instance methods*/
        prototype.loadJS = NamespaceApplication.loadJS;
        prototype.loadCSS = NamespaceApplication.loadCSS;
        prototype.domLoaded = NamespaceApplication.domLoaded;
        prototype.typeOf = NamespaceApplication.typeOf;
        prototype.typeOfStrict = NamespaceApplication.typeOfStrict;
        prototype.defined = NamespaceApplication.defined;
        prototype.isNode = NamespaceApplication.isNode;
        prototype.extend = NamespaceApplication.extend;
        prototype.uri = NamespaceApplication.uri;
        prototype.redirect = NamespaceApplication.redirect;
        prototype.routePath = NamespaceApplication.routePath;
        prototype.query = NamespaceApplication.query;
        prototype.queryAll = NamespaceApplication.queryAll;
        prototype.queryUp = NamespaceApplication.queryUp;
        prototype.each = NamespaceApplication.each;
        prototype.on = NamespaceApplication.on;
        prototype.css = NamespaceApplication.css;
        prototype.inject = NamespaceApplication.inject;
        prototype.format = NamespaceApplication.format;
        prototype.ajax = NamespaceApplication.ajax;
        prototype.Timer = NamespaceApplication.Timer;
        prototype.Storage = NamespaceApplication.Storage;

    })(NamespaceApplication.prototype);

    NamespaceApplication.domLoaded(function () {
        var script = NamespaceApplication.query('script[data-init]');
        if (script && script.getAttribute('data-init').length > 2) {
            NamespaceApplication.loadJS(script.getAttribute('data-init'));
        }
    });

    window.NamespaceApplication = NamespaceApplication;

})(window)