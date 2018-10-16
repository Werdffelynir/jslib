if(App.namespace){App.namespace('Sidebar', function(App){
    /**
     * @namespace App.Sidebar
     */
    var __ = {
        /**@type Animate*/
        animate: null,
        node: null,
        action: false,
        buttons: false
    };

    /** @namespace App.Sidebar.init */
    __.init = function (animate) {
        __.animate = animate;
        __.node = App.node['sidebar'];

        __.buttonsHandler();
    };


    __.buttonsHandler = function(){
        var inputs = App.search('input[name^="setting-"]', 'name', __.node);
        var btn = App.search('.button', 'data-btn', __.node);

        App.on(inputs['setting-width'], 'change', __.on_change_size);
        App.on(inputs['setting-height'], 'change', __.on_change_size);
        App.on(inputs['setting-grid'], 'change', __.on_show_grid);
        App.on(inputs['setting-cling'], 'change', __.on_cling_point);
        App.on(inputs['setting-fill'], 'change', __.on_fill);
        App.on(inputs['setting-fillcolor'], 'change', __.on_fillcolor);
        App.on(inputs['setting-linewidth'], 'change', __.on_linewidth);
        App.on(inputs['setting-linecolor'], 'change', __.on_linecolor);
        App.on(inputs['setting-map'], 'change', __.on_loadmap);

        App.on(btn['loadmap'], 'click', __.on_loadmap);

        // Saved
        if (App.Storage('animate-shapeeditor-size-width') && App.Storage('animate-shapeeditor-size-height')) {
            __.getAction('setting-width').value = App.Storage('animate-shapeeditor-size-width');
            __.getAction('setting-height').value = App.Storage('animate-shapeeditor-size-height');
            __.on_change_size();
        }
    };

    /** @namespace App.Sidebar.getAction */
    __.getAction = function(name){
        if (!__.action)
            __.action = App.search('input[name^="setting-"]', 'name', __.node);

        return __.action[name] ? __.action[name] : {};
    };

    /** @namespace App.Sidebar.getButton */
    __.getButton = function(name){
        if (!__.buttons)
            __.buttons = App.search('.button', 'data-btn', __.node);

        return __.buttons[name] ? __.buttons[name] : {};
    };

    __.on_change_size = function(eve){
        __.animate.resizeCanvas(
            __.getAction('setting-width').value,
            __.getAction('setting-height').value
        );

        App.Storage('animate-shapeeditor-size-width', __.getAction('setting-width').value);
        App.Storage('animate-shapeeditor-size-height', __.getAction('setting-height').value);

        App.Grid.clearDataImage();
    };
    __.on_show_grid = function(eve){
        App.Grid.show = eve.target.checked;
    };
    __.on_cling_point = function(eve){
        App.Canvas.is_cling = eve.target.checked;
    };
    __.on_fill = function(eve){
        if (!eve.target.checked)
            App.Canvas.fill_color = false;
        else {
            var c = __.getAction('setting-fillcolor');
            App.Canvas.fill_color = c.value ? '#'+c.value : '#000000';
        }

        App.Canvas.fill_lines = eve.target.checked;
    };
    __.on_fillcolor = function(eve){
        App.Canvas.fill_color = '#'+eve.target.value;
    };
    __.on_linewidth = function(eve){
        App.Canvas.style.width_line = parseInt(eve.target.value);
    };
    __.on_linecolor = function(eve){
        App.Canvas.style.color_line = '#'+eve.target.value;
    };
    __.on_loadmap = function (eve) {
        var field = __.getAction('setting-map');
        try {
            App.Canvas.data = JSON.parse(field.value);
        } catch (e) {}
    };


    return __;
})}