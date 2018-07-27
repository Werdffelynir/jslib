/**
 * app.keyPress()                              (out loop use) return info about this method
 * app.keyPress('ArrowUp')                     (in loop use) return bool. true - when press 'ArrowUp'
 * app.keyPress('ArrowUp', function(){})       (in loop use) execute function when press 'ArrowUp'
 * app.keyPress(function(){})                  (out loop use) execute function every time when press any key
 * app.keyPress(function(){}, function(){})    (out loop use) execute function1 for keyDown and function1 for keyUp
 *
 * @param key         key (key, code, keyCode) or callback
 * @param callback    callback
 * @returns {*}
 */
Animate.prototype.keyPress = function (key, callback) {
  if (this.keyPress_keys === false)
    this.keyPress_init_once_click_listener();

  if (arguments.length === 0) {
    return this.keyPress.info();
    
  } 
  else if (typeof key === 'string') {
    if (typeof callback === 'function') {
      if (this.keyPress_keys[arguments[0]])
        callback.call(null, this.keyPress_keys[arguments[0]]);
    }
    return !!this.keyPress_keys[arguments[0]];

  } 
  else if (typeof key === 'function') {
    this.keyPress_keydown_callbacks.push(key);
    if (typeof callback === 'function')
      this.keyPress_keyup_callbacks.push(callback);
  }
};

Animate.prototype.keyPress_keys = false;
Animate.prototype.keyPress_keyup_callbacks = [];
Animate.prototype.keyPress_keydown_callbacks = [];
Animate.prototype.keyPress_init_once_click_listener = function () {
  if (this.keyPress_keys === false) {
    var that = this;
    this.keyPress_keys = {};

    window.addEventListener('keydown', function (event) {
      if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
      }

      for (var i = 0; i < that.keyPress_keydown_callbacks.length; i++) {
        if (typeof that.keyPress_keydown_callbacks[i] === 'function') {
          that.keyPress_keydown_callbacks[i].call(null, event);
        }
      }

      that.keyPress_keys[event.keyCode] = event;

      if (event.key)
        that.keyPress_keys[event.key]  = that.keyPress_keys[event.keyCode];

      if (event.code)
        that.keyPress_keys[event.code] = that.keyPress_keys[event.keyCode];

    });

    window.addEventListener('keyup', function (event) {
      if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
      }

      for (var i = 0; i < that.keyPress_keyup_callbacks.length; i++) {
        if (typeof that.keyPress_keyup_callbacks[i] === 'function') {
          that.keyPress_keyup_callbacks[i].call(null, event);
        }
      }

      delete that.keyPress_keys[event.key];
      delete that.keyPress_keys[event.code];
      delete that.keyPress_keys[event.keyCode];
    });
  }
};

/**
 * Keys info
 * @returns {string}
 */
Animate.prototype.keyPressInfo = function () {
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
