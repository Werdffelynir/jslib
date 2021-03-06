
class Key extends Extension {

  constructor (animate) {
    super();
    this.animateInstance = animate;

    this.keys = {};
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
      num2:   51,
      num3:   52,
      num4:   53,
      num5:   54,
    })

  }

  animate () {
    return this.animateInstance;
  }

  init (game) {
    this.gameInstance = game;
  }

  isPress (key) {
    return this.keys[key]
  }

  addKeysListeners (types) {
    Event.keydown((e) => {
      let key;
      for (key in types)
        if (e.keyCode === types[key]) this.keys[key] = true;
    });
    Event.keyup((e) => {
      let key;
      for (key in types)
        if (e.keyCode === types[key]) this.keys[key] = false;
    })
  }



}
