if(App.namespace){App.namespace('Tools', function(App){
    /**
     * @namespace App.Tools
     */
    var __ = {
        node: null
    };

    /**
     * @namespace App.Tools.init
     */
    __.init = function(){
        __.node = App.node['tools'];

        __.buttonsHandler();
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

    __.on_back = function (eve) {
        __.on_pointprev();
        App.Canvas.back();
    };

    __.on_pointprev = function  (eve) {
        var indexs = App.Canvas.edit_point_indexs;
        var data = App.Canvas.data;
        if (indexs.x !== false && indexs.y !== false) {
            if (data[indexs.x-2] && data[indexs.y-2]) {
                indexs.x = indexs.x-2;
                indexs.y = indexs.y-2;
            }
        }
    };

    __.on_pointnext = function  (eve) {
        var indexs = App.Canvas.edit_point_indexs;
        var data = App.Canvas.data;
        if (indexs.x !== false && indexs.y !== false) {
            if (data[indexs.x+2] && data[indexs.y+2]) {
                indexs.x = indexs.x+2;
                indexs.y = indexs.y+2;
            }
        }
    };

    __.on_move_all = function  (eve) {
        var btn = App.search('.button', 'data-btn', __.node);
        if (App.Canvas.edit_mode == 'point') {
            App.Canvas.edit_mode = 'all';
            btn['moveall'].textContent = 'Move ALL'
        } else {
            App.Canvas.edit_mode = 'point';
            btn['moveall'].textContent = 'Move Point'
        }
    };

    __.on_lock = function (eve) {
        var btn = App.search('.button', 'data-btn', __.node);
        if (App.Canvas.is_lock) {
            App.Canvas.is_lock = false;
            btn['lock'].style.backgroundColor = '#ececec';
            btn['lock'].style.color = '#3a3a3a';
            btn['lock'].textContent = 'Lock'
        } else {
            App.Canvas.is_lock = true;
            btn['lock'].style.backgroundColor = '#ee0f00';
            btn['lock'].style.color = '#ffffff';
            btn['lock'].textContent = 'UnLock'
        }
    };

    __.on_clear = function (eve) {
        App.Canvas.clear();
    };

    __.shapes_list = [];
    __.on_addtolist = function (eve) {
        var json = JSON.stringify(App.Canvas.data);
        if (__.shapes_list.indexOf(json) === -1) {
            __.shapes_list.push(json);
        }

        __.renderShapesList ();
    };

    __.renderShapesList = function (eve) {
        var i, li, ul = App.createElement('ul');
        for (i = 0; i < __.shapes_list.length; i ++) {
            li = App.createElement('li', {}, __.shapes_list[i]);
            ul.appendChild(li);
        }
        App.inject(App.node['codepoints'], ul);

        //App.Canvas.clear();
        //App.node['codepoints'].textContent = ;
    };


    return __;
})}