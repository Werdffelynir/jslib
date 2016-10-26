if(App.namespace){App.namespace('Controller.Page', function(App){

    /**
     * @namespace App.Controller.Page
     */
    var _ = {}
        , node = {}
        ;
            
    _.construct = function(){
        console.log('App.Controller.Page.construct');
        App.domLoaded(afterDOMLoaded);


        App.store({
            key1 : 'value1',
            key2 : 'value2',
            key3 : 'value3'
        });


        App.store('key4',{as:{a:1,b:2,c:[11,22,33]}});
        console.log(App.store());


        NamespaceApplication.store({nsj1:'nsval1'});

        console.log(NamespaceApplication.store());
    };

    function afterDOMLoaded () {

    }

    return _;

})}
