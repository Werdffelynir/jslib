
//@NsBuilder begin
var App = new NamespaceApplication({
    constructsType: false,
    debug: true,
    url: '/ns.app.builder/',
    name: 'Developer NamespaceApplication.JS Framework',
    token: null
});
//@NsBuilder end

// Libs scripts
App.require('libs', [

    App.url + 'app/lib/aj.js',
    App.url + 'app/lib/util.js'

], initLibrary, initError);

// Module scripts
App.require('dependence', [

    // module scripts
    App.url + 'app/module/index.js',
    App.url + 'app/module/query.js',
    App.url + 'app/module/view.js',
    App.url + 'app/module/api.js'

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
function initDependence(list) {
    console.log('Application start!');
    //@NsBuilder begin
    App.Module.Index.initialize();





    //@NsBuilder end
}


