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

        }
    };

    instance.mousePress._position = false;
    instance.mousePress._is_init = false;

    /**
     * (out loop use)
     * @param callback
     */
    instance.mouseMove = function (callback) {

        if (callback && typeof callback === 'function' && instance.mouseMove.listeners.indexOf(callback) === -1)
            instance.mouseMove.listeners.push(callback);

        if (!instance.mouseMove.is_init) {
            instance.mouseMove.is_init = true;
            instance._canvas.addEventListener('mousemove', function (event) {
                var i, position = instance.mousePosition(event);
                for (i = 0; i < instance.mouseMove.listeners.length; i ++)
                    if (instance.mouseMove.listeners[i] && typeof instance.mouseMove.listeners[i] === 'function')
                        instance.mouseMove.listeners[i].call(instance, position);
            });
        }
    };

    instance.mouseMove.is_init = false;
    instance.mouseMove.listeners = [];

})