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
     __.init = function (An) {
        __.An = An;
    };

    __.pressKeysWatcher = function () {
        __.press['left']    = __.An.keyPress('KeyA') || __.An.keyPress('ArrowLeft');
        __.press['right']   = __.An.keyPress('KeyD') || __.An.keyPress('ArrowRight');
        __.press['up']      = __.An.keyPress('KeyW') || __.An.keyPress('ArrowUp');
        __.press['down']    = __.An.keyPress('KeyS') || __.An.keyPress('ArrowDown');
        __.press['space']   = __.An.keyPress('Space');
    };

    /**
     * Control move and rotate for mc player
     * @namespace App.Control.player
     */
     __.player = function (mc) {

        if (__.press['up']) {
            mc.y -= mc.speed;

            if      (__.press['left'])  mc.rotate = __.An.degreesToRadians(-45);
            else if (__.press['right']) mc.rotate = __.An.degreesToRadians(45);
            else                        mc.rotate = __.An.degreesToRadians(0);
        }
        else if (__.press['down']) {
            mc.y += mc.speed;

            if      (__.press['left'])  mc.rotate = __.An.degreesToRadians(-135);
            else if (__.press['right']) mc.rotate = __.An.degreesToRadians(135);
            else                        mc.rotate = __.An.degreesToRadians(180);
        }

        if (__.press['left']) {
            mc.x -= mc.speed;

            if (!__.press['up'] && !__.press['down']) mc.rotate = __.An.degreesToRadians(-90);
        }
        else if (__.press['right']) {
            mc.x += mc.speed;

            if (!__.press['up'] && !__.press['down']) mc.rotate = __.An.degreesToRadians(90);
        }

    };

    /**
     * @namespace App.Control.startmap
     */
    __.startmap = function (mc) {

        if (__.press['up']) {
            mc.y -= mc.s;
        }
        if (__.press['down']) {
            mc.y += mc.s;
        }
        if (__.press['left']) {
            mc.x -= mc.s;
        }
        if (__.press['right']) {
            mc.x += mc.s;
        }

    };

    /**
     * @namespace App.Control.hitPlayerStartmap
     */
    __.hitPlayerStartmap = function () {
        //var player = App.Player.stat
        if (__.press['left']) App.Player.stat.x += App.Player.stat.speed;
        if (__.press['right']) App.Player.stat.x -= App.Player.stat.speed;
        if (__.press['up']) App.Player.stat.y += App.Player.stat.speed;
        if (__.press['down']) App.Player.stat.y -= App.Player.stat.speed;
    };

    return  __;
})}