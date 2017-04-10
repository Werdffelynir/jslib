if(App.namespace){App.namespace('Game', function(app){

    /**
     * @namespace App.Game
     */
    var __ = {
        /**@type {Animate}*/
        /**@namespace App.Game.An*/
        An: null,
        /**@namespace App.Game.sceneWidth*/
        sceneWidth: 3000,
        /**@namespace App.Game.sceneHeight*/
        sceneHeight: 3000,

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

        // modules start
        App.Player.init(__.An);
        App.Camera.init(__.An);
        App.Control.init(__.An);
        App.Startmap.init(__.An);

        // frames
        __.An.frame('scene', __.scene);

        // start
        __.An.start('scene');
    };

    __.scene = function (ctx, i) {
        __.moveCamera();
        __.camera = __.An.camera(__.cameraX, __.cameraY, __.cameraWidth, function () {

            App.Control.pressKeysWatcher();
            App.Player.add();
            App.Startmap.add();

        });

    };

    __.moveCamera = function () {
        var camera_point = __.An.point(App.Game.cameraX,App.Game.cameraY);
        var player_point = __.An.point(App.Player.stat.x,App.Player.stat.y);

        var dist_x = App.Player.stat.x - App.Game.cameraX;
        var dist_y = App.Player.stat.y - App.Game.cameraY;
        //console.log(dist_x, dist_y);
        var calc = Animate.calculateAngle(camera_point, player_point);
        var mert = 150;
        if (dist_x < mert) {
            App.Game.cameraX -= App.Player.stat.speed;
        }

        if (dist_y < mert) {
            App.Game.cameraY -= App.Player.stat.speed;
        }

        if (dist_x > __.An.width - mert) {
            App.Game.cameraX += App.Player.stat.speed;
        }

        if (dist_y > __.An.height - mert) {
            App.Game.cameraY += App.Player.stat.speed;
        }

        /*var distance = __.An.distanceBetween(camera_point, player_point);
        if (distance > 400) {
            var calc = Animate.calculateAngle(camera_point, player_point);
            App.Game.cameraX += calc.x;
            App.Game.cameraY += calc.y;
        }
        else if (distance < 200) {
            var calc = Animate.calculateAngle(camera_point, player_point);
            App.Game.cameraX -= calc.x;
            App.Game.cameraY -= calc.y;
        }*/

        //App.Game.camera
    };

    return __;
})}