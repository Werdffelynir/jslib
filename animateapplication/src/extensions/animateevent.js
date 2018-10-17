
class AnimateEvent {

  constructor (Animate) {

    if ( !(Animate instanceof AnimateApplication) )
      throw new Error(':constructor argument in not of instance AnimateApplication');

    this.keyBinded = [];
    this.canvas = Animate.getCanvas();
    this.global = Animate.getGlobal();
    this.Animate = Animate;
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

  keydown (cb) {
    this.global.addEventListener('keydown', (event) =>
      cb.call(this.Animate, event, this.getMouseEventPosition(event))
    );
  }

  keyup (cb) {
    this.global.addEventListener('keyup', (event) =>
      cb.call(this.Animate, event, this.getMouseEventPosition(event))
    );
  }

  keyBind (keyCodes, cb) {

    this.keyBinded.push({
      keyCode: Array.isArray(keyCodes) ? keyCodes : [keyCodes],
      callback: cb
    });


    // for (key in keys) {
    //   let _keys = keys[key];
    //   if (!Array.isArray(_keys))
    //     _keys = [_keys];
    //
    //   _keys.map((k) => {
    //     if (!Array.isArray(list[k])) list[k] = [];
    //     list[k];
    //   });
    // }

    this.keydown((e) => {
      this.keyBinded.map()
    });
    this.keyup();
  }

}
