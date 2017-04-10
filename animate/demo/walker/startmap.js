if(App.namespace){App.namespace('Startmap', function(app){

    /**
     * @namespace App.Startmap
     */
    var __ = {
        /**@type {Animate}*/
        /**@namespace App.Game.An*/
        An: null,

        starts_limit: 5,
        starts: []
    };

    /**
     * @namespace App.Startmap.init
     */
    __.init = function (An) {
        __.An = An;

        if (__.starts.length === 0) {
            //__.create_starts(App.Game.sceneWidth, App.Game.sceneHeight);
            __.create_starts(__.An.width - 100, __.An.height - 100);
        }
    };

    __.randomItem = function (arr) {
        var i = __.An.random(0, arr.length-1);
        return arr[i];
    };

    __.create_starts = function (sceneWidth, sceneHeight) {
        var i, conf;

        for (i = 0; i < __.starts_limit; i ++) {

            conf = {
                x: __.An.random(0, sceneWidth),
                y: __.An.random(0, sceneHeight),
                s: 1,
                w: __.An.random(10, 100),
                h: __.An.random(10, 100),
                color: __.randomItem(['#ff3a11','#FF997F','#FFD85B'])
            };

            //console.dir(i);

            __.starts.push(__.An.createClip({
                x: __.An.random(0, sceneWidth),
                y: __.An.random(0, sceneHeight),
                s: 1,
                w: __.An.random(10, 100),
                h: __.An.random(10, 100),
                color: __.randomItem(['#ff3a11','#FF997F','#FFD85B'])
            }, function () {

                var context = __.An.getContext();

                __.An.graphic.rect(this.x, this.y, this.w, this.h, this.color);

                // context.beginPath();
                // context.fillStyle = this.color;
                // context.rect(this.x, this.y, this.w, this.h);
                // context.fill();
                // context.stroke();

                if (context.isPointInPath(App.Player.stat.x, App.Player.stat.y)) {
                    this.color = '#000'
                }
                return this;
            }));
        }
    };


    /**
     * @namespace App.Startmap.add
     */
    __.add = function () {
        App.each(__.starts, function (item, i) {
            //console.dir(item);
            item();
        });

    };

    return __;
})}