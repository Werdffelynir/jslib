/**
 * Created by werd on 01.11.16.
 */
App.namespace('Module.Index', function(App) {
    /**
     * @namespace App.Module.Index
     */
    var _ = {};

    /**
     * @namespace App.Module.Index.initialize
     */
    _.initialize = function () {
        App.Module.Api.run();
        App.Module.View.run();
        App.Module.Query.run();
    };

    return _;
});