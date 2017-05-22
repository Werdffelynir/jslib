(function () {
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

    return prototype
})()