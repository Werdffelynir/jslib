if(App.namespace){App.namespace('Game', function(app){

    /**
     * @namespace App.Game
     */
    var __ = {
        /**@type {Animate}*/
        /**@namespace App.Game.An*/
        An: null,
    };

    /**
     * @namespace App.Game.start
     */
    __.start = function () {

        __.An = new Animate({
            selector: '#canvas',
            width: 600,
            height: 400,
            fps: 30
        });

        // objects
        App.Control.init(__.An);
        App.Ball.init(__.An);
        App.Player.init(__.An);

        // frames
        __.An.frame('start', __.frameStart);
        __.An.frame('scene', __.frameScene);

        // start
        __.An.start('scene');
    };
    __.frameStart = function (ctx, i) {};
    __.frameScene = function (ctx, i) {
        App.Control.pressKeysWatcher();

        App.Ball.add();
        App.Player.add();

        __.addInterface(ctx, i);
    };


    __.addInterface = function (ctx, frame) {
        __.An.text.write(0, 0, 'Frame: ' + frame);
    };

    return __;
})}