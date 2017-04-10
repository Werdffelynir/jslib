if(App.namespace){App.namespace('Tools', function(App){
    /**
     * @namespace App.Tools
     */
    var __ = {
        node: null,
        buttons: false
    };

    /**
     * @namespace App.Tools.init
     */
    __.init = function(){
        __.node = App.node['tools'];

        __.buttonsHandler();
    };

    /** @namespace App.Tools.buttonsHandler */
    __.buttonsHandler = function(){
        var btn = App.search('.button', 'data-btn', __.node);

        App.on(btn['back'], 'click', __.on_back);
        App.on(btn['pointprev'], 'click', __.on_pointprev);
        App.on(btn['pointnext'], 'click', __.on_pointnext);
        App.on(btn['moveall'], 'click', __.on_move_all);
        App.on(btn['lock'], 'click', __.on_lock);
        App.on(btn['clear'], 'click', __.on_clear);
        App.on(btn['addtolist'], 'click', __.on_addtolist);
        App.on(btn['deletefromlist'], 'click', __.on_deletefromlist);
        App.on(btn['delpoint'], 'click', __.on_deletepoint);

    };

    /** @namespace App.Tools.getButton */
    __.getButton = function(name){
        if (!__.buttons)
            __.buttons = App.search('.button', 'data-btn', __.node);

        return __.buttons[name] ? __.buttons[name] : {};
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
            btn['moveall'].innerHTML = 'Move ALL <strong>(x)</strong>'
        } else {
            App.Canvas.edit_mode = 'point';
            btn['moveall'].innerHTML = 'Move Point <strong>(x)</strong>'
        }
    };

    __.on_lock = function (eve) {
        var btn = App.search('.button', 'data-btn', __.node);
        if (App.Canvas.is_lock) {
            App.Canvas.is_lock = false;
            btn['lock'].style.backgroundColor = '#ececec';
            btn['lock'].style.color = '#3a3a3a';
            btn['lock'].innerHTML = 'Lock <strong>(l)</strong>'
        } else {
            App.Canvas.is_lock = true;
            btn['lock'].style.backgroundColor = '#b40c00';
            btn['lock'].style.color = '#ffffff';
            btn['lock'].innerHTML = 'UnLock <strong>(l)</strong>'
        }
    };

    __.on_clear = function (eve) {
        App.Canvas.clear();
    };

    __.on_deletefromlist = function (eve) {

        App.History.removeFromList();
    };

    __.shapes_list = [];

    __.on_addtolist = function (eve) {
        var json = JSON.stringify(App.Canvas.data);
        App.History.addToList(App.Canvas.data);
    };

    __.on_deletepoint = function (eve) {
        var indexs = App.Canvas.edit_point_indexs;
        delete App.Canvas.data[indexs.x];
        delete App.Canvas.data[indexs.y];
        var i, arr = [];
        for (i = 0; i < App.Canvas.data.length; i ++) {
            if ([indexs.x, indexs.y].indexOf(i) === -1 )
                arr.push(App.Canvas.data[i]);
        }
        App.Canvas.data = arr;
    };


    return __;
})}