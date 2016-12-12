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

        Noder('app', Noder.queryOne('#app'));
        Noder('app-head', Noder.queryOne('#app-head'));
        Noder('app-side', Noder.queryOne('#app-side'));
        Noder('app-area', Noder.queryOne('#app-area'));
        Noder('app-dash', Noder.queryOne('#app-dash'));


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

            });
        }


        console.log('Controller onDOMLoaded');
    }

    _.insertTemplate = function () {
        Noder.html('app-head', _.cache.template['head']);
        Noder.html('app-side', _.cache.template['side']);
        Noder.html('app-area', _.cache.template['area']);
        Noder.html('app-dash', _.cache.template['dash']);
    };



    //_.insertTemplate = function () {
    //    Noder.html('app-head', _.cache['head']);
    //    Noder.html('app-side', _.cache['side']);
    //    Noder.html('app-area', _.cache['area']);
    //    Noder.html('app-dash', _.cache['dash']);
    //};
    //
    //_.cacheRestoreData = function () {
    //    _.cache['head'] = App.storage('template-head');
    //    _.cache['side'] = App.storage('template-side');
    //    _.cache['area'] = App.storage('template-area');
    //    _.cache['dash'] = App.storage('template-dash');
    //};

    return _;
});

/*



 //console.log(Noder());
 //console.log(Noder.getOne('app-head'));

 Noder.getOne('app-head', function (elem) {
 App.ajax({
 url: App.url + 'templates/head.html'
 }, function (status, response) {
 elem.innerHTML = status === 200 ? response : 'Loading template is fail'
 });
 });

 _.cache['head'] = responseList['head'];
 _.cache['side'] = responseList['side'];
 _.cache['area'] = responseList['area'];
 _.cache['dash'] = responseList['dash'];
 */

