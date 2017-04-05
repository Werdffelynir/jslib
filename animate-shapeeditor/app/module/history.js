if(App.namespace){App.namespace('History', function(App){
    /**
     * @namespace App.History
     */
    var __ = {

        /**@type Animate*/
        animate: null,

        data_lest: null,
        DATA_NAME_LEST: 'shapeeditor-database-lest',

        data: null,
        DATA_NAME: 'shapeeditor-database',

        list: [],

        current_index: false,

        show: true,

        image_data: false
    };

    /** @namespace App.History.init */
    __.init = function (animate) {
        __.animate = animate;

        if (App.Storage(__.DATA_NAME)) {
            __.list = App.Storage(__.DATA_NAME);
        }

        if (App.Storage(__.DATA_NAME_LEST)) {
            __.data_lest = App.Storage(__.DATA_NAME_LEST);
            if (App.typeOf(__.data_lest, 'array'))
                App.Canvas.setData(__.data_lest);
        }

        __.render();
        __.eventHandler();
    };

    /** @namespace App.History.load */
    __.eventHandler = function () {
        App.on(App.node['history'], 'click', function (eve) {
            var _data, target = eve.target;
            if (target.tagName === 'LI') {
                __.current_index = App.attr(target, 'data-index');
                _data = __.list[__.current_index];

                App.css('#history ul>li', {'background-color': '#FFFFFF'});
                App.css(target, {'background-color': '#ede9ff'});

                if (_data)
                    App.Canvas.setData(_data);
            }
        });
    };


    /** @namespace App.History.render */
    __.render = function () {

        var list = __.create();

        App.inject(App.node['history'], list);

    };

    /** @namespace App.History.create */
    __.create = function () {

        var i, w, li, ul = App.createElement('ul');
        for (i = 0; i < __.list.length; i ++) {
            if (__.list[i]) {
                try {

                    w = JSON.stringify(__.list[i]);
                    li = App.createElement('li', {'data-index': i}, w.length > 50 ? w.substr(0, 46) + ' ...': w);
                    ul.appendChild(li);

                } catch (e) {}
            }
        }
        return ul;
    };

    /** @namespace App.History.addToList */
    __.addToList = function (data) {
        if (App.typeOf(data) === 'array' && __.list.indexOf(data) === -1) {
            __.list.push(data);

            __.save();
            __.render();
        }
    };

    __.removeFromList = function (index) {
        index = index || __.current_index;


        //console.log(index, __.list[index]);

        if (index !== false && __.list[index]) {
            delete __.list[index];

            __.save();
            __.render();

            App.Canvas.clear();
        }
    };

    /** @namespace App.History.save */
    __.save = function () {
        App.Storage(__.DATA_NAME, __.list);
    };

    /** @namespace App.History.saveLastData */
    __.saveLastData = function (data) {
        App.Storage(__.DATA_NAME_LEST, data);
    };

    return __;
})}