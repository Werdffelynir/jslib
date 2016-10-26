if(App.namespace){App.namespace('Controller.Login', function(App){

    /**
     * @namespace App.Controller.Login
     */
    var _ = {}
        , node = {}
        ;

    /**
     * @namespace App.Controller.Login.construct
     */
    _.construct = function(){
        console.log('App.Controller.Login.construct');
        App.domLoaded(afterDOMLoaded);

    };

    function afterDOMLoaded () {
    }

    return _;

})}
