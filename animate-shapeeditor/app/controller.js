if(App.namespace){App.namespace('Controller', function(App){
    /**
     * @namespace App.Controller
     */
    var __ = {
        /**@type Animate*/
        animate: null,
    };

    /** @namespace App.Controller.start */
    __.start = function(){

        __.animate = new Animate({
            selector: '#canvas > canvas',
            width: App.Sidebar.getAction('setting-width').value || 300,
            height: App.Sidebar.getAction('setting-height').value || 150,
            fps: 24
        });

        // init
        App.Tools.init();
        App.History.init(__.animate);
        App.Sidebar.init(__.animate);
        App.Canvas.init(__.animate);
        App.Grid.init(__.animate);

        __.animate.onClick = App.Canvas.listenerClick;
        __.animate.onMousemove = App.Canvas.listenerMousemove;
        __.animate.onKeyup = App.Canvas.listenerKeyup;

        __.animate.onFrame = function (ctx, i) {

            App.Grid.render();
            App.Canvas.render();
            App.Canvas.editPoint();

        };

        // Saved

        __.animate.start();
    };


    return __;
})}