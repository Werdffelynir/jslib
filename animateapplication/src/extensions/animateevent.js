
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
    this.canvas.addEventListener('click', (event) =>
      cb.call(this.Animate, event, this.getMouseEventPosition(event))
    );
  }

  move (cb) {
    this.canvas.addEventListener('mousemove', (event) =>
      cb.call(this.Animate, event, this.getMouseEventPosition(event))
    );
  }

  mousemove (cb) {
    this.move(cb);
  }

  mousedown (cb) {
    this.canvas.addEventListener('mousedown', (event) =>
      cb.call(this.Animate, event, this.getMouseEventPosition(event))
    );
  }

  keydown (cb) {
    this.global.addEventListener('keydown', (event) =>
      cb.call(this.Animate, event)
    );
  }

  keyup (cb) {
    this.global.addEventListener('keyup', (event) =>
      cb.call(this.Animate, event)
    );
  }

}
