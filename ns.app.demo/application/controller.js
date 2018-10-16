
var App = new NamespaceApplication();

// help funcs
App.Template = function () {
    var template = App.query('template');
    if (!template) throw Error('Not find node elements of templates');
    return App.search('[data-template]', 'data-template', template.content);
};


App.namespace('Controller', function () {
    var __;

    __.init = function () { };
    __.a = function () { };
    __.b = function () { };
    __.c = function () { };
    __.d = function () { };

    return __;
});

App.domLoaded(function () {

    var _data = [];
    if (App.Storage.get('tasks')) {
        _data = App.Storage.get('tasks');
    }

    App.Controller.init(_data);

});