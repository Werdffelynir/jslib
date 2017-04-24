if(App.namespace){App.namespace('Control', function(app){

    /**
     * @namespace App.Control
     */
    var  __ = {
        /**@type {Animate}*/
        /**@namespace App.Game.An*/
        An: null,
        press: {left:false, right:false, up:false, down:false}
    };

    /**
     * @namespace App.Control.init
     */
    __.init = function (an) {
        __.An = an;
    };


    /**
     * @namespace App.Control.pressKeysWatcher
     */
    __.pressKeysWatcher = function () {
        __.press['left']    = __.An.keyPress('KeyA') || __.An.keyPress('ArrowLeft');
        __.press['right']   = __.An.keyPress('KeyD') || __.An.keyPress('ArrowRight');
        __.press['up']      = __.An.keyPress('KeyW') || __.An.keyPress('ArrowUp');
        __.press['down']    = __.An.keyPress('KeyS') || __.An.keyPress('ArrowDown');
        __.press['space']   = __.An.keyPress('Space');
    };

    return  __;
})}