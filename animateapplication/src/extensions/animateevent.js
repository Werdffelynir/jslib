
const EventKeyCode = 0;
const EventKeyCodeBackspace = 8;
const EventKeyCodeTab = 9;
const EventKeyCodeEnter = 13;
const EventKeyCodeShift = 16;
const EventKeyCodeCtrl = 17;
const EventKeyCodeAlt = 18;
const EventKeyCodePause = 19;
const EventKeyCodeBreak = 19;
const EventKeyCodeCapsLock = 20;
const EventKeyCodeEsc = 27;
const EventKeyCodeSpace = 32;
const EventKeyCodePageUp = 33;
const EventKeyCodePageDown = 34;
const EventKeyCodeEnd = 35;
const EventKeyCodeHome = 36;
const EventKeyCodeArrowLeft = 37;
const EventKeyCodeArrowUp = 38;
const EventKeyCodeArrowRight = 39;
const EventKeyCodeArrowDown = 40;
const EventKeyCodePrntScrn = 44;
const EventKeyCodeInsert = 45;
const EventKeyCodeDelete = 46;
const EventKeyCodeWINStart = 91;
const EventKeyCodeWINMenu = 93;
const EventKeyCodeF1 = 112;
const EventKeyCodeF2 = 113;
const EventKeyCodeF3 = 114;
const EventKeyCodeF4 = 115;
const EventKeyCodeF5 = 116;
const EventKeyCodeF6 = 117;
const EventKeyCodeF7 = 118;
const EventKeyCodeF8 = 119;
const EventKeyCodeF9 = 120;
const EventKeyCodeF10 = 121;
const EventKeyCodeF11 = 122;
const EventKeyCodeF12 = 123;
const EventKeyCodeNumLock = 144;
const EventKeyCodeScrollLock = 145;
const EventKeyCodeComa = 188;
const EventKeyCodeDot = 190;
const EventKeyCodeSlash = 191;
const EventKeyCodeBackquote = 192;
const EventKeyCodeBracketLeft = 219;
const EventKeyCodeBackslash = 220;
const EventKeyCodeBracketRight = 221;
const EventKeyCodeQuote = 222;
const EventKeyCodeDigit0 = 48;
const EventKeyCodeDigit1 = 49;
const EventKeyCodeDigit2 = 50;
const EventKeyCodeDigit3 = 51;
const EventKeyCodeDigit4 = 52;
const EventKeyCodeDigit5 = 53;
const EventKeyCodeDigit6 = 54;
const EventKeyCodeDigit7 = 55;
const EventKeyCodeDigit8 = 56;
const EventKeyCodeDigit9 = 57;
const EventKeyCodeKeyA = 65;
const EventKeyCodeKeyB = 66;
const EventKeyCodeKeyC = 67;
const EventKeyCodeKeyD = 68;
const EventKeyCodeKeyE = 69;
const EventKeyCodeKeyF = 70;
const EventKeyCodeKeyG = 71;
const EventKeyCodeKeyH = 72;
const EventKeyCodeKeyI = 73;
const EventKeyCodeKeyJ = 74;
const EventKeyCodeKeyK = 75;
const EventKeyCodeKeyL = 76;
const EventKeyCodeKeyM = 77;
const EventKeyCodeKeyN = 78;
const EventKeyCodeKeyO = 79;
const EventKeyCodeKeyP = 80;
const EventKeyCodeKeyQ = 81;
const EventKeyCodeKeyR = 82;
const EventKeyCodeKeyS = 83;
const EventKeyCodeKeyT = 84;
const EventKeyCodeKeyU = 85;
const EventKeyCodeKeyV = 86;
const EventKeyCodeKeyW = 87;
const EventKeyCodeKeyX = 88;
const EventKeyCodeKeyY = 89;
const EventKeyCodeKeyZ = 90;
const EventKeyCodeNumpad0 = 96;
const EventKeyCodeNumpad1 = 97;
const EventKeyCodeNumpad2 = 98;
const EventKeyCodeNumpad3 = 99;
const EventKeyCodeNumpad4 = 100;
const EventKeyCodeNumpad5 = 101;
const EventKeyCodeNumpad6 = 102;
const EventKeyCodeNumpad7 = 103;
const EventKeyCodeNumpad8 = 104;
const EventKeyCodeNumpad9 = 105;


const KeyCode = {
  Backspace : 8,
  Tab : 9,
  Enter : 13,
  Shift : 16,
  Ctrl : 17,
  Alt : 18,
  Pause : 19,
  Break : 19,
  CapsLock : 20,
  Esc : 27,
  Space : 32,
  PageUp : 33,
  PageDown : 34,
  End : 35,
  Home : 36,
  ArrowLeft : 37,
  ArrowUp : 38,
  ArrowRight : 39,
  ArrowDown : 40,
  PrntScrn : 44,
  Insert : 45,
  Delete : 46,
  WINStart : 91,
  WINMenu : 93,
  F1 : 112,
  F2 : 113,
  F3 : 114,
  F4 : 115,
  F5 : 116,
  F6 : 117,
  F7 : 118,
  F8 : 119,
  F9 : 120,
  F10 : 121,
  F11 : 122,
  F12 : 123,
  NumLock : 144,
  ScrollLock : 145,
  Coma : 188,
  Dot : 190,
  Slash : 191,
  Backquote : 192,
  BracketLeft : 219,
  Backslash : 220,
  BracketRight : 221,
  Quote : 222,
  Digit0 : 48,
  Digit1 : 49,
  Digit2 : 50,
  Digit3 : 51,
  Digit4 : 52,
  Digit5 : 53,
  Digit6 : 54,
  Digit7 : 55,
  Digit8 : 56,
  Digit9 : 57,
  KeyA : 65,
  KeyB : 66,
  KeyC : 67,
  KeyD : 68,
  KeyE : 69,
  KeyF : 70,
  KeyG : 71,
  KeyH : 72,
  KeyI : 73,
  KeyJ : 74,
  KeyK : 75,
  KeyL : 76,
  KeyM : 77,
  KeyN : 78,
  KeyO : 79,
  KeyP : 80,
  KeyQ : 81,
  KeyR : 82,
  KeyS : 83,
  KeyT : 84,
  KeyU : 85,
  KeyV : 86,
  KeyW : 87,
  KeyX : 88,
  KeyY : 89,
  KeyZ : 90,
  Numpad0 : 96,
  Numpad1 : 97,
  Numpad2 : 98,
  Numpad3 : 99,
  Numpad4 : 100,
  Numpad5 : 101,
  Numpad6 : 102,
  Numpad7 : 103,
  Numpad8 : 104,
  Numpad9 : 105,
};


class AnimateEvent {

  constructor (Animate) {

    if ( !(Animate instanceof AnimateApplication) )
      throw new Error(':constructor argument in not of instance AnimateApplication');

    this.Animate = Animate;
    this.canvas = Animate.getCanvas();
    this.global = Animate.getGlobal();
  }

  getMouseEventPosition (mouseEvent) {
    if (mouseEvent instanceof MouseEvent) {
      const rect = this.canvas.getBoundingClientRect();
      return {
        x: mouseEvent.clientX - rect.left,
        y: mouseEvent.clientY - rect.top }
    }
  };

  click (cb) {
    const eventFunction = (event) =>
      cb.call(this.Animate, event, this.getMouseEventPosition(event));
    this.canvas.addEventListener('click', eventFunction );
    return eventFunction;
  }

  clickRemove (eventFunction) {
    this.canvas.removeEventListener('click', eventFunction )}

  mousemove (cb) {
    const eventFunction = (event) =>
      cb.call(this.Animate, event, this.getMouseEventPosition(event));
    this.canvas.addEventListener('mousemove', eventFunction);
    return eventFunction;
  }

  mousemoveRemove (eventFunction) {
    this.canvas.removeEventListener('mousemove', eventFunction )}

  mousedown (cb) {
    const eventFunction = (event) => cb.call(this.Animate, event, this.getMouseEventPosition(event));
    this.canvas.addEventListener('mousedown', eventFunction);
    return eventFunction;
  }

  mousedownRemove (eventFunction) {
    this.canvas.removeEventListener('mousedown', eventFunction )}

  keydown (cb) {
    const eventFunction = (event) => cb.call(this.Animate, event);
    this.global.addEventListener('keydown', eventFunction);
    return eventFunction;
  }

  keydownRemove (eventFunction) {
    this.canvas.removeEventListener('keydown', eventFunction )}

  keyup (cb) {
    const eventFunction = (event) => cb.call(this.Animate, event);
    this.global.addEventListener('keyup', eventFunction);
    return eventFunction;
  }

  keyupRemove (eventFunction) {
    this.canvas.removeEventListener('keyup', eventFunction )}

}

class AnimateEventKey {

  constructor (Animate) {

    if ( !(Animate instanceof AnimateApplication) )
      throw new Error(':constructor argument in not of instance AnimateApplication');

    this.Event = new AnimateEvent(Animate);

    this._keysPressed = {};
    this._config = {
      keys: {},
      keysDefault: false,
      keydown: null,
      keyup: null,
    };

    this._keysDefault = {
      a:      65,
      s:      83,
      d:      68,
      w:      87,
      b:      66,
      c:      67,
      e:      69,
      q:      81,
      f:      70,
      i:      73,
      space:  32,
      enter:  13,
      shift:  16,
      ctrl:   17,
      alt:    18,
      num1:   49,
      num2:   50,
      num3:   51,
      num4:   52,
      num5:   53,
      num6:   54,
    };

  }

  /**
   * .isPressed('a', () => {}, () => {});
   * @param key
   * @param cbPressed
   * @param onNoPressed
   * @returns {*}
   */
  isPressed (key, cbPressed, onNoPressed) {
    if (this._keysPressed[key] && typeOf(cbPressed, 'function')) cbPressed();
    else if (typeOf(onNoPressed, 'function')) onNoPressed();
    return this._keysPressed[key];
  }

  _removeCallbackEventKeys () {
    this.Event.keydownRemove(this._config.keydown);
    this.Event.keyupRemove(this._config.keyup);
  }

  _removeGlobalCallbackEventKeys () {
    this.Event.keydownRemove(this._eventCallbackKeydown);
    this.Event.keyupRemove(this._eventCallbackKeyup);
  }

  _initKeysStatement () {
    if (!this._init_keys_statement_ready) {
      this._init_keys_statement_ready = true;

      const { keys, keydown, keyup  } = this._config;

      this._eventCallbackKeydown = (e) => {
        let key;
        if (typeOf(this._config.keydown, 'function')) this._config.keydown.call(this, e);
        for (key in this._config.keys)
          if (e.keyCode === this._config.keys[key]) this._keysPressed[key] = true;
      };
      this.Event.keydown(this._eventCallbackKeydown);

      this._eventCallbackKeyup = (e) => {
        let key;
        if (typeOf(this._config.keyup, 'function')) this._config.keyup.call(this, e);
        for (key in this._config.keys)
          if (e.keyCode === this._config.keys[key]) this._keysPressed[key] = false;
      };
      this.Event.keyup(this._eventCallbackKeyup);
    }
  }

  /**
   * EventKey.config({
   *  keys: {
   *    a:      65,
   *    s:      83,
   *    d:      68,
   *    w:      87,
   *    space:  32, },
   *  keydown: () => { },
   *  keyup: () => {},
   * });
   * @param conf
   * @returns {AnimateEventKey}
   */
  config (conf) {
    this._config = {...this._config, ...conf};

    if (conf.keysDefault) {
      this._config.keys = {...this._keysDefault, ...this._config.keys};
    }
    this._initKeysStatement();
    return this;
  }

  configKeys (src) {
    if (src)
      this._config.keys = {...this._config.keys, ...src};
    else
      return this._config.keys;
  }

  configKeydown (src) {
    if (typeOf(src, 'function'))
      this._config.keydown = src;
    else
      return this._config.keydown;
  }

  configKeyup (src) {
    if (typeOf(src, 'function'))
      this._config.keyup = src;
    else
      return this._config.keyup;
  }

}
