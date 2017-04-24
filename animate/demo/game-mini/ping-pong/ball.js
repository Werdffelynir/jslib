if(App.namespace){App.namespace('Ball', function(app){

    /**
     * @namespace App.Ball
     */
    var __ = {
        /**@type {Animate}*/
        An: null,
        src: null,
    };

    /**
     * @namespace App.Ball.init
     */
    __.init = function (an) {
        __.An = an;
        __.src = new __.An.Graphic.Circle(100, 100, 20, '#a00');
    };

    /**
     * @namespace App.Ball.add
     */
    __.add = function () {

        __.src.draw();
    };

    return __;
})}