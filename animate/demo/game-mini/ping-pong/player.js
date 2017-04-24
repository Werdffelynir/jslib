if(App.namespace){App.namespace('Player', function(app){

    /**
     * @namespace App.Player
     */
    var __ = {
        /**@type {Animate}*/
        An: null,
        src: null,
    };

    /**
     * @namespace App.Player.init
     */
    __.init = function (an) {
        __.An = an;
        __.src = new __.An.Graphic.Rectangle(__.An.width/2 - 40, __.An.height - 20, 80, 20, '#a00');
    };

    /**
     * @namespace App.Player.add
     */
    __.add = function () {
        __.src.draw();
    };

    return __;
})}