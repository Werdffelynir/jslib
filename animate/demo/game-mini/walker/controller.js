if(App.namespace){App.namespace('Controller', function(app){

    /**
     * @namespace App.Controller
     */
    var __ = {
        node: {}
    };

    /**
     * @namespace App.Controller.construct
     */
    __.construct = function () {

        App.domLoaded(function () {

            __.node = {
                menu: NSA.queryAll('#menu'),
                page: NSA.query('#page'),
                desc: NSA.query('#descriptionription'),
                move: NSA.query('#move'),
                after: NSA.query('#after'),
                canvas: NSA.query('#canvas')
            };

            App.Game.init();
        });

    };

    return  __;
})}