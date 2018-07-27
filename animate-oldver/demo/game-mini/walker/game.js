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
        sceneHeight: 1000,

        /**@namespace App.Game.camera*/
        camera: null,
        cameraWidth: null,
        cameraX: 0,
        cameraY: 0
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
        __.An.text.font('bold 14px/14px sans');
        __.An.text.color('#000000');

        // modules start
        App.Item.init(__.An);
        App.Player.init(__.An);
        App.Camera.init(__.An);
        App.Control.init(__.An);
        App.Startmap.init(__.An);

        // frames
        __.An.frame('start', __.start);
        __.An.frame('scene', __.scene);

        // start
        __.An.start('start');
    };

    __.start = function (ctx, i) {
        __.An.stop();
        __.An.text.write(250, 200, 'Start Game');
        __.An.getCanvas().addEventListener('click', function onStart(eve) {
            eve.target.removeEventListener('click', onStart);
            __.An.start('scene');
        })
    };

    __.scene = function (ctx, i) {

        __.moveCamera();

        __.camera = __.An.camera(__.cameraX, __.cameraY, __.cameraWidth, function () {

            App.Control.pressKeysWatcher();
            App.Player.add();
            App.Item.add();
            App.Startmap.add();

        });

        __.displayInfoPanel();

    };

    __.moveCamera = function () {
        var dist_x = App.Player.stat.x - App.Game.cameraX;
        var dist_y = App.Player.stat.y - App.Game.cameraY;
        var dist = 150;

        if (dist_x < dist) {
            App.Game.cameraX -= App.Player.stat.speed;
        }

        if (dist_y < dist) {
            App.Game.cameraY -= App.Player.stat.speed;
        }

        if (dist_x > __.An.width - dist) {
            App.Game.cameraX += App.Player.stat.speed;
        }

        if (dist_y > __.An.height - dist) {
            App.Game.cameraY += App.Player.stat.speed;
        }

    };

    __.displayInfoPanel = function () {
        __.An.text.write(0, 0, 'Find: '+App.Item.removeCount+'/'+App.Item.limit);
    };

    return __;
})}