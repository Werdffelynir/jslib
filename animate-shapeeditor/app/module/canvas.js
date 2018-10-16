if(App.namespace){App.namespace('Canvas', function(App){
    /**
     * @namespace App.Canvas
     */
    var __ = {
        /**@type Animate*/
        animate: null,
        /**@type Array*/
        data: [],
        /**@type Array*/
        data_lest: [],

        show: true,

        fill_lines: false,
        fill_color: false,

        is_lock: false,
        is_cling: false,

        style: {
            color_line: '#c7d1ff',
            width_line: 1,
            radius_inner: 3,
            radius_outer: 10,
            color_inner: '#2e3445',
            color_outer: '#c7d1ff',
            color_edit: '#ee0f00'
        }
    };

    /** @namespace App.Canvas.init */
    __.init = function (animate) {
        __.animate = animate;
        __.fill_color = '#'+App.Sidebar.getAction('setting-fillcolor').value;
        __.style.color_line = '#'+App.Sidebar.getAction('setting-linecolor').value;
    };

    /** @namespace App.Canvas.getData */
    __.getData = function(){
        return __.data;
    };

    /** @namespace App.Canvas.setData */
    __.setData = function(data){
        if (App.typeOf(data, 'array')) {
            __.edit_point_indexs['x'] = 0;
            __.edit_point_indexs['y'] = 1;
            __.data = data;
        }
    };

    /** @namespace App.Canvas.back */
    __.back = function () {
        __.data = __.data.slice(0, -2);
    };

    /** @namespace App.Canvas.clear */
    __.clear = function () {
        __.data = [];
    };

    __.render = function () {

        // __.data = __.data.filter(function (it) {
        //     return !!it
        // });

        var i, point, points = __.data;

        if (!App.typeOf(points, 'array')) {
            return;
        }

        if (__.data_lest !== __.data) {
            __.data_lest = __.data;
            __.showCurrentData(__.data);

            App.History.saveLastData(__.data);
        }

        // заливка в объекте
        if (__.fill_lines) {
            __.animate.graphic.shape(points, __.fill_color, true, false, 1);
        }

        // рес. линий
        __.animate.graphic.shape(points, __.style.color_line, false, false, __.style.width_line);

        // сброс толщены лини для точек
        __.animate.getContext().lineWidth = 1;

        for (i = 0; i < points.length; i += 2) {
            point = __.animate.point(points[i], points[i+1]);

            // рес. точек ломаных
            __.animate.graphic.circle(point.x, point.y, __.style.radius_outer, __.style.color_outer, true);
            __.animate.graphic.circle(point.x, point.y, __.style.radius_inner, __.style.color_inner, true);

            // рес. точи под редактрованием
            if (i === __.edit_point_indexs.x) {
                __.animate.graphic.circle(point.x, point.y, __.style.radius_outer + 5, __.style.color_edit, false);
            }

            // текст координат
            __.animate.text.font('9px/9px sans');
            __.animate.text.color('#333333');
            //__.animate.text.color('#ffffff');
            //__.animate.graphic.rectRound(point.x+5, point.y-6, 50, 12, 6, 'rgba(100,100,100,0.8)', true);
            __.animate.text.write(point.x+10, point.y-5, point.x+'x'+point.y);
        }

    };
    __.set_step = function () {
        return App.Canvas.is_cling ? 5 : 1;
    };
    __.edit_mode = 'point';
    __.edit_point_indexs = {x:false,y:false};
    __.editPoint = function () {

        if (__.is_lock) return;

        if (__.edit_mode === 'point') {

            if (__.edit_point_indexs.x === false || __.edit_point_indexs.y === false ||
                !__.data[__.edit_point_indexs.x] || !__.data[__.edit_point_indexs.y] ) {
                return;
            }

            if (__.animate.keyPress('ArrowLeft') || __.animate.keyPress('KeyA')) {
                __.data[__.edit_point_indexs.x] -= __.set_step(); //App.Canvas.is_cling ? 5 : 1;
                __.showCurrentData();
            }
            if (__.animate.keyPress('ArrowRight') || __.animate.keyPress('KeyD')) {
                __.data[__.edit_point_indexs.x] += __.set_step();
                __.showCurrentData();
            }
            if (__.animate.keyPress('ArrowUp') || __.animate.keyPress('KeyW')) {
                __.data[__.edit_point_indexs.y] -= __.set_step();
                __.showCurrentData();
            }
            if (__.animate.keyPress('ArrowDown') || __.animate.keyPress('KeyS')) {
                __.data[__.edit_point_indexs.y] += __.set_step();
                __.showCurrentData();
            }
        }
        else if (__.edit_mode === 'all') {
            var i;
            if (__.animate.keyPress('ArrowLeft') || __.animate.keyPress('KeyA')) {
                for (i = 0; i < __.data.length; i += 2) {
                    __.data[i] -= __.set_step();
                }
                __.showCurrentData();
            }
            else if (__.animate.keyPress('ArrowRight') || __.animate.keyPress('KeyD')) {
                for (i = 0; i < __.data.length; i += 2) {
                    __.data[i] += App.Canvas.is_cling ? 5 : 1;
                }
                __.showCurrentData();
            }
            else if (__.animate.keyPress('ArrowUp') || __.animate.keyPress('KeyW')) {
                for (i = 1; i < __.data.length; i += 2) {
                    __.data[i] -= __.set_step();
                }
                __.showCurrentData();
            }
            else if (__.animate.keyPress('ArrowDown') || __.animate.keyPress('KeyS')) {
                for (i = 1; i < __.data.length; i += 2) {
                    __.data[i] += __.set_step();
                }
                __.showCurrentData();
            }

        }

    };

    __.showCurrentData = function (event) {
        App.inject(App.node['currentdata'], App.createElement('textarea',{'class':''}, JSON.stringify(__.data)));
    };

    __.listenerMousemove = function (event) {};

    __.listenerClick = function (event) {

        var point = __.animate.mousePosition(event);

        if (__.is_cling) {
            point.x = __.toClingNumber(point.x);
            point.y = __.toClingNumber(point.y);
        }

        if (!__.is_lock) {
            __.edit_point_indexs['x'] = __.data.push(point.x) - 1;
            __.edit_point_indexs['y'] = __.data.push(point.y) - 1;
            __.showCurrentData();
        }
    };


    __.listenerKeyup = function (event) {

        // Prev point
        if (event.code === 'KeyQ') {
            App.Tools.on_pointprev()
        }

        // Next point
        if (event.code === 'KeyE') {
            App.Tools.on_pointnext()
        }

        // Back
        if (event.code === 'KeyZ') {
            App.Tools.on_back()
        }

        // Move Point
        if (event.code === 'KeyX') {
            App.Tools.on_move_all()
        }

        // Lock
        if (event.code === 'KeyL') {
            App.Tools.on_lock()
        }

        // Clear canvas
        if (event.code === 'KeyR') {
            App.Tools.on_clear()
        }
        // Clear canvas
        if (event.code === 'KeyF') {
            App.Tools.on_deletepoint()
        }

    };

    __.toClingNumber = function (v) {
        var _z = 5;
        var _v = (v % _z);
        var _r = _v < (_z/2) ? v - _v : v - _v + _z;
        return _r
    };

    return __;
})}