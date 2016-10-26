var App = new NamespaceApplication({
    constructsType: false,
    debug: true,
    url: '/ns.app/demo/',
    name: 'Developer NamespaceApplication.JS Framework',
    token: null,
});


// Outer scripts
App.require('libs', [
    '/ns.app/js/aj.js',
    '/ns.app/js/dom.js',
    '/ns.app/js/util.js',
    '/ns.app/js/linker.js'
], initLibrary, initError);


App.require('dependence', [

    // extensions
    App.url + 'js.app/extension/tool.js',

    // actions
    App.url + 'js.app/action/navigate.js',
    App.url + 'js.app/action/sidebar.js',

    // controllers
    App.url + 'js.app/controller/page.js',
    App.url + 'js.app/controller/login.js'

], initDependence, initError);


// Start loading the 'libs' scripts
App.requireStart('libs');


// Load error
function initError(error){
    console.error('initError' , error);
}


// After load 'libs' scripts. start loading the 'dependence' scripts
function initLibrary(list){
    App.requireStart('dependence');
}


// Start Application
function initDependence(list){
    
    console.log('Application start!');

    App.route('/', App.Controller.Page.construct, true);
    App.route('/#login', App.Controller.Login.construct, true);
}


