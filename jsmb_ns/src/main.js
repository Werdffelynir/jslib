(function (window) {

    var NamespaceApplication = [[['constructor']]];

    NamespaceApplication.version = '0.2.0';

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

    window.NamespaceApplication = NamespaceApplication;

})(window);