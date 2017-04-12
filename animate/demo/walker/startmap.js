if(App.namespace){App.namespace('Startmap', function(app){

    /**
     * @namespace App.Startmap
     */
    var __ = {
        /**@type {Animate}*/
        /**@namespace App.Game.An*/
        An: null,

        starts_limit: 50,
        starts: []
    };

    /**
     * @namespace App.Startmap.init
     */
    __.init = function (An) {
        __.An = An;

        if (__.starts.length === 0) {
            __.create_starts(App.Game.sceneWidth, App.Game.sceneHeight);
        }
    };

    __.randomItem = function (arr) {
        var i = __.An.random(0, arr.length-1);
        return arr[i];
    };

    __.create_starts = function (sceneWidth, sceneHeight) {
        var i;

        for (i = 0; i < __.starts_limit; i ++) {
            __.starts.push(__.An.createClip({

                x: __.An.random(0, sceneWidth),
                y: __.An.random(0, sceneHeight),
                s: 1,
                w: __.An.random(10, 100),
                h: __.An.random(10, 100),
                color: __.randomItem(['#FFBD43','#FF997F','#FFD85B'])

            }, function () {
                var dx = 0;
                var dy = 0;
                var z = 11;

                __.An.graphic.rect(this.x, this.y, this.w, this.h, this.color);

                if (App.Control.press['left'])   dx = -z;
                if (App.Control.press['right'])  dx = z;
                if (App.Control.press['up'])     dy = -z;
                if (App.Control.press['down'])   dy = z;

                var point_player = __.An.point(App.Player.stat.x + dx, App.Player.stat.y + dy);

                if (__.An.hitTest([this.x, this.y, this.w, this.h], point_player)) {
                    __.An.graphic.rect(this.x, this.y, this.w, this.h, '#000', false);
                    App.Control.hitPlayerStartmap();
                }
                return this;
            }));
        }
    };



        /**
     * @namespace App.Startmap.add
     */
    __.add = function () {

        __.An.graphic.rect(0, 0, App.Game.sceneWidth, App.Game.sceneHeight, 'rgba(0,0,0,0.4)');

        App.each(__.starts, function (item, i) {
            //console.dir(item);
            item();
        });

    };

    return __;
})}