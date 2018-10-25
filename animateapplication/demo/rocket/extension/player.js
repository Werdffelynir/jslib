
class Player extends Extension {

  constructor () {
    super();

    this._x = Animate.width / 10;
    this._y = Animate.height / 2;
    this._dx = 0;
    this._dy = 0.05;
    this._speed = 3;
    this._speedMax = 10;
    this._acceleration = 0.05;
    this._upPressed = false;

    this.width = 50;
    this.height = 20;
    this.moveSin = 0;
    this.moveSinDeviation = 0.085;
    this.moveSinDeviationDefault = 0.095;

  }

  init () {
    /** @type {CanvasRenderingContext2D|WebGLRenderingContext} */
    const ctx = this.animate.getContext();
  }

  set x (n) {this._x = n;}
  set y (n) {this._y = n;}
  get x () {return this._x;}
  get y () {return this._y;}

  draw () {
    this.moveSin += this.moveSinDeviation;
    this.game.ext('Key').isPress('w',
      () => {
        this.y -= this._speed;
      },
      () => {}
    );

    this.game.ext('Key').isPress('s',
      () => {
        this.y += this._speed;
      },
      () => {}
    );

    this.y += Math.sin( this.moveSin ) / 3.5;


    Text.print('sin: ' + Math.sin( this.moveSin ), 10, 50);

    Graphic.rect(Point(this.x, this.y), this.width, this.height)
      .begin()
      .color('#aaaaaa')
      .thickness(5)
      .stroke()
      .close();

  }

}
