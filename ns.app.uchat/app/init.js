var App = new NamespaceApplication({
    constructsType: false,
    debug: true,
    url: '/ns.app.uchat/',
    node: {}
});

// Module scripts
App.require('module', [

    // special modules
    // App.url + 'app/module/api.js',
    // App.url + 'app/module/view.js',
    // App.url + 'app/module/query.js',
    App.url + 'app/module/block.side.js',

    // base logic controller
    App.url + 'app/controller.js'

], initDependence, initError).requireStart('module');

// Load error
function initError(error){
    console.error('initError' , error);
}

// Start Application
function initDependence(list) {
    console.log('Application start!');
    App.Controller.initialize();
}


