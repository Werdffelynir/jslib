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


    prototype.loadJS = NamespaceApplication.loadJS;
    prototype.loadCSS = NamespaceApplication.loadCSS;
    prototype.domLoaded = NamespaceApplication.domLoaded;
    prototype.typeOf = NamespaceApplication.typeOf;
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
    prototype.Storage = NamespaceApplication.Storage;

})(NamespaceApplication.prototype)