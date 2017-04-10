
var App = new NamespaceApplication({
    path: "/animate-shapeeditor/",
    node: {}
});

App.require('module', [

    App.path + 'app/module/grid.js',
    App.path + 'app/module/tools.js',
    App.path + 'app/module/canvas.js',
    App.path + 'app/module/sidebar.js',
    App.path + 'app/module/history.js',
    App.path + 'app/controller.js'

], function () {
    App.domLoaded(function () {

        App.node['page']    = App.query('#page');
        App.node['wrapper'] = App.query('#wrapper');
        App.node['sidebar'] = App.query('#sidebar');
        App.node['sidebar2'] = App.query('#sidebar2');
        App.node['tools']   = App.query('#tools');
        App.node['resizer'] = App.query('#resizer');
        App.node['resizer2'] = App.query('#resizer2');
        App.node['currentdata'] = App.query('#currentdata');
        App.node['content'] = App.query('#content');
        App.node['codepoints'] = App.query('#codepoints');
        App.node['history'] = App.query('#history');

        // init resizers
        new Resizer(App.node['resizer'], App.node['sidebar']);
        new Resizer(App.node['resizer2'], App.node['content']);

        App.Controller.start();
    });
}).requireStart();