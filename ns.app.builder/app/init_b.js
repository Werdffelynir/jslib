
// lib

var App = new NamespaceApplication({
    constructsType: false,
    debug: true,
    url: '/ns.app.builder/',
    name: 'Developer NamespaceApplication.JS Framework',
    token: null
});

// dependence

console.log('Application start!');
App.Module.Index.initialize();