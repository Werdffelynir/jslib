/** Expansion Base **/
(function (prototype) {

    /**
     * Simple router
     *
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
    prototype.isEmpty = NamespaceApplication.isEmpty;
    prototype.isNode = NamespaceApplication.isNode;
    prototype.extend = NamespaceApplication.extend;
    prototype.uri = NamespaceApplication.uri;
    prototype.redirect = NamespaceApplication.redirect;
    prototype.routePath = NamespaceApplication.routePath;
    prototype.search = NamespaceApplication.search;
    prototype.query = NamespaceApplication.query;
    prototype.queryAll = NamespaceApplication.queryAll;
    prototype.each = NamespaceApplication.each;
    prototype.eachParent = NamespaceApplication.eachParent;
    prototype.on = NamespaceApplication.on;
    prototype.css = NamespaceApplication.css;
    prototype.show = NamespaceApplication.show;
    prototype.hide = NamespaceApplication.hide;
    prototype.toggle = NamespaceApplication.toggle;
    prototype.attr = NamespaceApplication.attr;
    prototype.copy = NamespaceApplication.copy;
    prototype.inject = NamespaceApplication.inject;
    prototype.format = NamespaceApplication.format;
    prototype.ajax = NamespaceApplication.ajax;
    prototype.createElement = NamespaceApplication.createElement;
    prototype.emmet = NamespaceApplication.emmet;
    prototype.node2str = NamespaceApplication.node2str;
    prototype.str2node = NamespaceApplication.str2node;
    prototype.position = NamespaceApplication.position;
    prototype.positionMouse = NamespaceApplication.positionMouse;
    prototype.findObjects = NamespaceApplication.findObjects;
    prototype.findObject = NamespaceApplication.findObject;
    prototype.Timer = NamespaceApplication.Timer;
    prototype.Cookie = NamespaceApplication.Cookie;
    prototype.Storage = NamespaceApplication.Storage;
    prototype.Util = NamespaceApplication.Util;
    prototype.Datetime = NamespaceApplication.Datetime;

})(NamespaceApplication.prototype)