if(App.namespace){App.namespace('Item', function(app){

    /**
     * @namespace App.Item
     */
    var __ = {
        /**@type {Animate}*/
        /**@namespace App.Item.An*/
        An: null,

        limit: 50,
        removeCount: 0,
        list: []
    };

    /**
     * @namespace App.Item.init
     */
    __.init = function (An) {
        __.An = An;

        if (__.list.length === 0) {
            __.create_list();
        }
    };

    __.randomItem = function (arr) {
        var i = __.An.random(0, arr.length-1);
        return arr[i];
    };

    __.create_list = function () {
        var i, clip,
            sw = App.Game.sceneWidth,
            sh = App.Game.sceneHeight;

        for (i = 0; i < __.limit; i ++) {
            clip = __.An.createClip({

                x: __.An.random(0, sw),
                y: __.An.random(0, sh),
                s: 1,
                r: 20,
                index: i,
                color: '#ff1501'

            }, function () {
                var dx = 0;
                var dy = 0;
                var z = 11;

                __.An.graphic.circle(this.x, this.y, this.r, this.color, true);

                if (App.Control.press['left'])   dx = -z;
                if (App.Control.press['right'])  dx = z;
                if (App.Control.press['up'])     dy = -z;
                if (App.Control.press['down'])   dy = z;

                var point_player = __.An.point(App.Player.stat.x + dx, App.Player.stat.y + dy);

                if (__.An.hitTest([this.x-z, this.y-z, this.r, this.r], point_player)) {
                    delete __.list[this.index];
                    __.removeCount ++;
                }
                return this;
            });
            __.list.push(clip);
        }
    };



        /**
     * @namespace App.Item.add
     */
    __.add = function () {

        App.each(__.list, function (item, i) {
            if (App.typeOf(item,'function'))
                item();
        });

    };

    return __;
})}