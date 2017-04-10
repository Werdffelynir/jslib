if(App.namespace){App.namespace('Game', function(app){

    /**
     * @namespace App.Game
     */
    var __ = {
        /**@type {Animate}*/
        /**@namespace App.Game.An*/
        An: null,
        /**@namespace App.Game.sceneWidth*/
        sceneWidth: 1000,
        /**@namespace App.Game.sceneHeight*/
        sceneHeight: 1000
    };

    /**
     * @namespace App.Game.init
     */
    __.init = function () {

        __.An = new Animate({
            selector: '#canvas',
            width: 600,
            height: 400,
            fps: 30
        });

        App.Player.init(__.An);
        App.Control.init(__.An);
        App.Startmap.init(__.An);

        //App.domLoaded(_.domLoaded);

        __.An.frame('scene', __.scene);
        __.An.frame('scene2', __.scene);
        __.An.frame('scene3', __.scene);
        __.An.frame('scene4', __.scene);

        // start
        __.An.start('scene');
    };

    __.scene = function () {

        App.Control.pressKeysWatcher();
        App.Player.add();
        App.Startmap.add();
    };

    return __;
})}