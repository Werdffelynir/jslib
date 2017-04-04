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
            selector: '#canvas>canvas',
            width: App.Sidebar.element('set-width').value,
            height: App.Sidebar.element('set-height').value,
            fps: 24
        });

        // init
        App.Tools.init();
        App.Sidebar.init(__.animate);
        App.Canvas.init(__.animate);
        App.Grid.init(__.animate);

        App.Sidebar.setListenerChangeCanvasSize();
        App.Sidebar.setListenerChangeShowGrid();
        App.Sidebar.setListenerChangeFillLines();
        App.Sidebar.setListenerChangeLineWidth();
        App.Sidebar.setListenerChangeLineColor();

        __.animate.onClick = App.Canvas.listenerClick;
        __.animate.onMousemove = App.Canvas.listenerMousemove;

        __.animate.onFrame = function (ctx, i) {

            App.Grid.render();
            App.Canvas.render();
            App.Canvas.editPoint();

        };

        __.animate.start();
    };


    return __;
})}