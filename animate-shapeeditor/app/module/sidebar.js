if(App.namespace){App.namespace('Sidebar', function(App){
    /**
     * @namespace App.Sidebar
     */
    var __ = {
        /**@type Animate*/
        animate: null,
        node: null
    };

    /** @namespace App.Sidebar.init */
    __.init = function (animate) {
        __.animate = animate;
        __.node = App.node['sidebar'];
    };


    __.buttonsHandler = function(){
        var btn = App.search('.button', 'data-btn', __.node);

        App.on(btn['back'], 'click', __.on_back);
        App.on(btn['pointprev'], 'click', __.on_pointprev);
        App.on(btn['pointnext'], 'click', __.on_pointnext);
        App.on(btn['moveall'], 'click', __.on_move_all);
        App.on(btn['lock'], 'click', __.on_lock);
        App.on(btn['clear'], 'click', __.on_clear);
        App.on(btn['addtolist'], 'click', __.on_addtolist);

    };











    /** @namespace App.Sidebar.element */
    __.element = function(name){
        return App.query('input[name="'+name+'"]', __.node);
    };

    /** @namespace App.Sidebar.setListenerChangeCanvasSize */
    __.setListenerChangeCanvasSize = function(){
        var elem_w = App.Sidebar.element('set-width');
        var elem_h = App.Sidebar.element('set-height');
        App.on(elem_w, 'change', onChange);
        App.on(elem_h, 'change', onChange);
        function onChange (event) {
            __.animate.resizeCanvas(elem_w.value, elem_h.value);
            App.Grid.clearDataImage();
        }
    };

    __.setListenerChangeShowGrid = function(){
        var elem = App.Sidebar.element('set-grid');
        App.on(elem, 'change', onChange);
        function onChange (event) {
            App.Grid.show = event.target.checked;
        }
    };

    __.setListenerChangeFillLines = function () {
        var elem = App.Sidebar.element('set-fill');
        App.on(elem, 'change', onChange);
        function onChange (event) {
            if (!event.target.checked) App.Canvas.fill_color = false;
            else App.Canvas.fill_color = App.Sidebar.element('set-fillcolor').value;

            App.Canvas.fill_lines = event.target.checked;
        }
    };

    __.setListenerChangeLineWidth = function(){
        var elem = App.Sidebar.element('set-linewidth');
        App.on(elem, 'change', onChange);
        function onChange (event) {
            App.Canvas.style.width_line = parseInt(event.target.value);
        }
    };

    __.setListenerChangeLineColor = function(){
        var elem = App.Sidebar.element('set-linecolor');
        App.on(elem, 'change', onChange);
        function onChange (event) {
            App.Canvas.style.color_line = parseInt(event.target.value);
        }
    };

    return __;
})}