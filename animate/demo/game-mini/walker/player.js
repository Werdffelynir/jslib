if(App.namespace){App.namespace('Player', function(app){

    /**
     * @namespace App.Player
     */
    var __ = {
        /**@type {Animate}*/
        /**@namespace App.Player.An*/
        An: null,
        /**@namespace App.Player.mc*/
        mc: null
    };

    /**@namespace App.Player.stat*/
    __.stat = {
        x: 0,
        y: 0,
        radius: 25,
        color: '#737c7b',
        colorTop: '#3f4443',
        speed: 2.1,
        rotate: 0
    };

    /**
     * @namespace App.Player.init
     */
    __.init = function (An) {

        __.An = An;

        __.stat.x = __.An.getWidth() / 2;
        __.stat.y = __.An.getHeight() / 2;

        // PLAYER STYLE
        __.mc = An.createMovieClip(__.stat, function (ctx, i) {

            //__.An.text.write(this.x, this.y, 'Player:'+App.Player.stat.x+'x'+App.Player.stat.y);

            __.An.graphic.circle(0, 0, this.radius, this.color, true);
            __.An.graphic.rect(-this.radius/2, 3, this.radius, 10, this.colorTop);

            App.Control.player(this);

        });
    };

    /**
     * @namespace App.Player.add
     */
    __.add = function () {

        return __.mc();
    };



    return __;
})}