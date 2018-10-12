
class AnimateEvent {

  constructor (Animate) {
    if ( !(Animate instanceof AnimateApplication) )
      throw new Error(':constructor argument in not of instance AnimateApplication');

    this.Animate = Animate;
  }

  getMouseEventPosition (mouseEvent) {
    if (mouseEvent instanceof MouseEvent) {
      const rect = this.Animate._canvas.getBoundingClientRect();
      return {
        x: mouseEvent.clientX - rect.left,
        y: mouseEvent.clientY - rect.top }
    }
  };

  click (cb) {
    this.Animate._canvas.addEventListener('click', (event) =>
      cb.call(this.Animate, event, this.getMouseEventPosition(event))
    );
  }

  move (cb) {
    this.Animate._canvas.addEventListener('mousemove', (event) =>
      cb.call(this.Animate, event, this.getMouseEventPosition(event))
    );
  }

  mousemove (cb) {
    this.move(cb);
  }

  keydown (cb) {
    this.Animate._canvas.addEventListener('keydown', (event) =>
      cb.call(this.Animate, event, this.getMouseEventPosition(event))
    );
  }

  keyup (cb) {
    this.Animate._canvas.addEventListener('keyup', (event) =>
      cb.call(this.Animate, event, this.getMouseEventPosition(event))
    );
  }

  key () {

  }

}
