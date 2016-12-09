var App = NamespaceApplication({
    url: '/',
    name: 'NamespaceApplication',
    debug: true,
    constructsType: false
});

App.require('dependence', [

    App.url + 'js/lib/animate.js',
    App.url + 'js/lib/clicker.js',
    App.url + 'js/lib/event.manager.js'

], onLibraryLoaded, onRequireError).requireStart('dependence');

function onRequireError(error){
    console.error('onRequireError', error);
}

function onLibraryLoaded(list){
    console.log('Application start!');
    App.Controller.initialize();
}

App.namespace('Controller', Controller);
App.namespace('Action', Action);

function Controller(){
    var ctr = {};

    /** @namespace App.Controller.initialize */
    ctr.initialize = function () {
        App.domLoaded(function () {

        })
    };

    return ctr
}

function Action(){
    var act = {};

    /** @namespace App.Action.init */
    act.init = function () {};
    /** @namespace App.Action.load */
    act.load = function () {};
    /** @namespace App.Action.unload */
    act.unload = function () {};

    return act
}