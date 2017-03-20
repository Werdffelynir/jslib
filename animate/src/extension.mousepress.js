Animate.Extension(function (instance) {

    if (!(instance instanceof Animate))
        return;
    /**
     * .mousePress()         (in loop use) return position point object if mouse click, or false
     * .mousePress(callback) (in loop use) execute function if mouse click with argument point object
     *
     * @param callback
     * @returns {*}
     */
    instance.mousePress = function (callback) {

        if (instance.mousePress._is_init === false)
            instance.mousePress._init_once_click_listener();

        if (instance.mousePress._position && typeof callback === 'function')
            callback.call(null, instance.mousePress._position);

        return instance.mousePress._position;
    };
    instance.mousePress._init_once_click_listener = function () {
        if (instance.mousePress._is_init === false) {
            instance.mousePress._is_init = true;

            instance._canvas.addEventListener('mousedown', function (event) {
                instance.mousePress._position = instance.mousePosition(event);
            });
            instance._canvas.addEventListener('mouseup', function (event) {
                instance.mousePress._position = false;
            });
            instance._canvas.addEventListener('mousemove', function (event) {
                if (instance.mousePress._position)
                    instance.mousePress._position = instance.mousePosition(event);
            });
        }
    };
    instance.mousePress._position = false;
    instance.mousePress._is_init = false;
})