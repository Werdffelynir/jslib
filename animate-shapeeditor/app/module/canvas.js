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

        if (App.Storage('shapeeditor-database')) {
            __.setData = App.Storage('shapeeditor-database');
        }
    };

    /** @namespace App.Canvas.saveData */
    __.saveData = function(){
        App.Storage('shapeeditor-database', __.data);
    };

    /** @namespace App.Canvas.getData */
    __.getData = function(){
        return __.data;
    };

    /** @namespace App.Canvas.setData */
    __.setData = function(data){
        __.data = data;
    };

    /** @namespace App.Canvas.addPoint */
    __.addPoint = function(point){
        __.data.push(point);
        __.data_lest = [];
    };

    __.back = function () {
        __.data = __.data.slice(0, -2);
    };

    /** @namespace App.Canvas.clear */
    __.clear = function () {
        __.data = [];
    };

    __.render = function () {
        var i, point, points = __.data;

        if (__.fill_lines) {
            __.animate.graphic.shape(points, __.fill_color, true, false, 1);
        }

        __.animate.graphic.shape(points, __.style.color_line, false, false, __.style.width_line);

        for (i = 0; i < points.length; i += 2) {
            point = __.animate.point(points[i], points[i+1]);
            __.animate.graphic.circle(point.x, point.y, __.style.radius_outer, __.style.color_outer, true);
            __.animate.graphic.circle(point.x, point.y, __.style.radius_inner, __.style.color_inner, true);


            if (i === __.edit_point_indexs.x) {
                __.animate.graphic.circle(point.x, point.y, __.style.radius_outer + 5, __.style.color_edit, false);
            }
            __.animate.text.font('9px/9px sans');
            __.animate.text.color('#89888b');
            __.animate.text.write(point.x+8, point.y-5, point.x+'x'+point.y);
        }

    };

    __.edit_mode = 'point';
    __.edit_point_indexs = {x:false,y:false};

    __.editPoint = function () {

        if (__.edit_mode === 'point') {

            if (__.edit_point_indexs.x === false || __.edit_point_indexs.y === false ||
                !__.data[__.edit_point_indexs.x] || !__.data[__.edit_point_indexs.y] ) {

                return;
            }

            if (__.animate.keyPress('ArrowLeft')) {
                __.data[__.edit_point_indexs.x] -= 1;
            }
            if (__.animate.keyPress('ArrowRight')) {
                __.data[__.edit_point_indexs.x] += 1;
            }
            if (__.animate.keyPress('ArrowUp')) {
                __.data[__.edit_point_indexs.y] -= 1;
            }
            if (__.animate.keyPress('ArrowDown')) {
                __.data[__.edit_point_indexs.y] += 1;
            }
        }
        else if (__.edit_mode === 'all') {
            var i;
            if (__.animate.keyPress('ArrowLeft')) {
                for (i = 0; i < __.data.length; i += 2) {
                    __.data[i] -= 1;
                }
            }
            else if (__.animate.keyPress('ArrowRight')) {
                for (i = 0; i < __.data.length; i += 2) {
                    __.data[i] += 1;
                }
            }
            else if (__.animate.keyPress('ArrowUp')) {
                for (i = 1; i < __.data.length; i += 2) {
                    __.data[i] -= 1;
                }
            }
            else if (__.animate.keyPress('ArrowDown')) {
                for (i = 1; i < __.data.length; i += 2) {
                    __.data[i] += 1;
                }
            }
        }


    };

    __.listenerMousemove = function (event) {
        // var point = __.animate.mousePosition(event);
        // __.data.push(point);
        // console.log('listenerMousemove',point);
    };

    __.listenerClick = function (event) {

        var point = __.animate.mousePosition(event);

        if (!__.is_lock) {
            __.edit_point_indexs['x'] = __.data.push(point.x) - 1;
            __.edit_point_indexs['y'] = __.data.push(point.y) - 1;
        }
    };

    return __;
})}