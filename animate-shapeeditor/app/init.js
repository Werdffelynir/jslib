
var App = new NamespaceApplication({
    path: "/animate-shapeeditor/",
    node: {}
});

App.require('module', [

    App.path + 'app/module/grid.js',
    App.path + 'app/module/tools.js',
    App.path + 'app/module/canvas.js',
    App.path + 'app/module/sidebar.js',
    App.path + 'app/controller.js'

], function () {
    App.domLoaded(function () {

        App.node['page']    = App.query('#page');
        App.node['wrapper'] = App.query('#wrapper');
        App.node['sidebar'] = App.query('#sidebar');
        App.node['tools']   = App.query('#tools');
        App.node['resizer'] = App.query('#resizer');
        App.node['content'] = App.query('#content');
        App.node['codepoints'] = App.query('#codepoints');
        App.node['history'] = App.query('#history');

        // init resizer
        Resizer(App.node['resizer'], App.node['sidebar']);

        App.Controller.start();
    });
}).requireStart();