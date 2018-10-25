
class Key extends Extension {

  constructor () {
    super();

    this.keys = {};
    this.cbKeydown = null;
    this.cbKeyup = null;
    this.addKeysListeners({
      s:      83,
      a:      65,
      b:      66,
      c:      67,
      d:      68,
      e:      69,
      q:      81,
      f:      70,
      i:      73,
      w:      87,
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
    })

  }

  isPress (key, cbPressed, onNoPressed) {
    if (this.keys[key] && typeOf(cbPressed, 'function')) {
      cbPressed();
    } else if (typeOf(onNoPressed, 'function')) {
      onNoPressed();
    }
    return this.keys[key];
  }

  onKeydown (cb) {this.cbKeydown = cb}

  onKeyup (cb) {this.cbKeyup = cb}

  addKeysListeners (types) {
    Event.keydown((e) => {
      let key;
      for (key in types)
        if (e.keyCode === types[key]) this.keys[key] = true;
      if (typeOf(this.cbKeydown, 'function'))
        this.cbKeydown.call(this, e);
    });
    Event.keyup((e) => {
      let key;
      for (key in types)
        if (e.keyCode === types[key]) this.keys[key] = false;
      if (typeOf(this.cbKeyup, 'function'))
        this.cbKeyup.call(this, e);
    })
  }

}
