App.namespace('Controller', function(App) {
    /**
     * @namespace App.Controller
     */
    var _ = {
        cacheStorageName: 'my-app-storage',
        cache: {},
        cachedData: function () {
            App.storage(_.cacheStorageName, _.cache)
        },
        cacheRestore: function () {
            _.cache = App.storage(_.cacheStorageName)
        }
    };

    /**
     * @namespace App.Controller.initialize
     */
    _.initialize = function () {
        App.domLoaded(onDOMLoaded);
    };

    function onDOMLoaded () {

        App.node['app'] = App.query('#app');
        App.node['app-head'] = App.query('#app-head');
        App.node['app-side'] = App.query('#app-side');
        App.node['app-area'] = App.query('#app-area');
        App.node['app-dash'] = App.query('#app-dash');

        if (false/*App.storage(_.cacheStorageName)*/) {
            _.cacheRestore();
            _.insertTemplate();

        } else {
            var Template = App.Template([
                App.url + 'templates/head.html',
                App.url + 'templates/side.html',
                App.url + 'templates/area.html',
                App.url + 'templates/dash.html'
            ], function (responseList) {
                _.cache.template = responseList;
                _.cachedData();
                _.insertTemplate();
                _.loadBlockModules();
            });
        }

    }

    _.loadBlockModules = function () {
        App.Block.Side.init(App.node['app-side']);
    };

    _.insertTemplate = function () {
        App.node['app-head'].innerHTML = _.cache.template['head'];
        App.node['app-side'].innerHTML = _.cache.template['side'];
        App.node['app-area'].innerHTML = _.cache.template['area'];
        App.node['app-dash'].innerHTML = _.cache.template['dash'];
    };

    return _;
});



