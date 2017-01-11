(function (window) {

    var NamespaceApplication = [[['constructor']]];

    NamespaceApplication.prototype = [[['prototype']]];

    NamespaceApplication.prototype.constructor = NamespaceApplication;

    [[['static']]];

    [[['expansion']]];

    NamespaceApplication.domLoaded(function(){
        var script = NamespaceApplication.query('script[data-init]');
        if (script && script.getAttribute('data-init').length > 2){
            NamespaceApplication.loadJS(script.getAttribute('data-init'));
        }
    });

    Object.defineProperty(NamespaceApplication, 'version', {
        enumerable: false, configurable: false, writable: false, value: '0.2.2'
    });

    window.NamespaceApplication = NamespaceApplication;

})(window)