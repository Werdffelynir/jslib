Animate.Extension(function (instance) {

    if (!(instance instanceof Animate))
        return;

    /**
     * .keyPress()                              (out loop use) return info about this method
     * .keyPress('ArrowUp')                     (in loop use) return bool. true - when press 'ArrowUp'
     * .keyPress('ArrowUp', function(){})       (in loop use) execute function when press 'ArrowUp'
     * .keyPress(function(){})                  (out loop use) execute function every time when press any key
     * .keyPress(function(){}, function(){})    (out loop use) execute function1 for keyDown and function1 for keyUp
     *
     * @param a
     * @param b
     * @returns {*}
     */
    instance.keyPress = function (a, b) {
        if (instance.keyPress._keys === false)
            instance.keyPress._init_once_click_listener();

        if (arguments.length == 0) {
            return instance.keyPress.info();
        } else
        if (typeof arguments[0] === 'string') {
            if (typeof arguments[1] === 'function') {
                if (instance.keyPress._keys[arguments[0]])
                    arguments[1].call(null, instance.keyPress._keys[arguments[0]]);
            }
            return !!instance.keyPress._keys[arguments[0]];
        } else
        if (typeof arguments[0] === 'function') {
            instance.keyPress._keydown_callbacks.push(arguments[0]);
            if (typeof arguments[1] === 'function')
                instance.keyPress._keyup_callbacks.push(arguments[1]);
        }
    };

    instance.keyPress._init_once_click_listener = function () {
        if (instance.keyPress._keys === false) {
            instance.keyPress._keys = {};

            window.addEventListener('keydown', function (event) {
                if (event.defaultPrevented) {
                    return; // Do nothing if the event was already processed
                }

                for (var i = 0; i < instance.keyPress._keydown_callbacks.length; i ++)
                    if (typeof instance.keyPress._keydown_callbacks[i] === 'function')
                        instance.keyPress._keydown_callbacks[i].call(null, event);

                instance.keyPress._keys[event.keyCode] = event;
                if (event.key) instance.keyPress._keys[event.key] = instance.keyPress._keys[event.keyCode];
                if (event.code) instance.keyPress._keys[event.code] = instance.keyPress._keys[event.keyCode];
            });

            window.addEventListener('keyup', function (event) {
                if (event.defaultPrevented) {
                    return; // Do nothing if the event was already processed
                }

                for (var i = 0; i < instance.keyPress._keyup_callbacks.length; i ++)
                    if (typeof instance.keyPress._keyup_callbacks[i] === 'function')
                        instance.keyPress._keyup_callbacks[i].call(null, event);

                delete instance.keyPress._keys[event.key];
                delete instance.keyPress._keys[event.code];
                delete instance.keyPress._keys[event.keyCode];
            });
        }
    };
    instance.keyPress._keys = false;
    instance.keyPress._keyup_callbacks = [];
    instance.keyPress._keydown_callbacks = [];
    instance.keyPress.info = function () {
        var codes = "" +
            "Event keydown/keyup                                      \n" +
            "key         code        keyCode     Key pressed          \n" +
            "_________________________________________________________\n" +
            "Backspace   Backspace   8           Backspace\n" +
            "Tab         Tab         9           Tab\n" +
            "Enter       Enter       13          Enter\n" +
            "Shift       ShiftLeft   16          Shift\n" +
            "Control     ControlLeft 17          Ctrl\n" +
            "Alt         AltLeft     18          Alt\n" +
            "Pause       Pause       19          Pause, Break\n" +
            "            CapsLock    20          CapsLock\n" +
            "Escape      Escape      27          Esc\n" +
            "' '         Space       32          Space\n" +
            "PageUp      PageUp      33          Page Up\n" +
            "PageDown    PageDown    34          Page Down\n" +
            "End         End         35          End\n" +
            "Home        Home        36          Home\n" +
            "ArrowLeft   ArrowLeft   37          Left arrow\n" +
            "ArrowUp     ArrowUp     38          Up arrow\n" +
            "ArrowRight  ArrowRight  39          Right arrow\n" +
            "ArrowDown   ArrowDown   40          Down arrow\n" +
            "                        44          PrntScrn\n" +
            "                        45          Insert\n" +
            "                        46          Delete\n" +
            "1           Digit1      48-57       0 to 9\n" +
            "a           KeyA        65-90       A to Z\n" +
            "                        91          WIN Key (Start)\n" +
            "                        93          WIN Menu\n" +
            "                        112-123     F1 to F12\n" +
            "                        144         NumLock\n" +
            "                        145         ScrollLock\n" +
            "                        188         , <\n" +
            "                        190         . >\n" +
            "                        191         / ?\n" +
            "`           Backquote   192         ` ~\n" +
            "                        219         [ {\n" +
            "                        220         \ |\n" +
            "                        221         ] }\n" +
            "                        222         ' \"\n";
        console.info(codes);
        return codes;
    }
})