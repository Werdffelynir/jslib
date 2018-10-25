
class Obstacle extends Extension {

  constructor () {
    super();

    this.list = [];
    this.fullWidth = 0;
    this.stop = false;
    this.speed = undefined;
  }

  init () {
    this.fullWidth = 2200;
  }

  draw () {}

  refreshList () {
    const limit = 10;
    const distance = this.fullWidth / limit;

    this.list = [];

    for (let i = limit; i > 0; i --) {
      this.list.push(this.wall(i * distance));
    }

    return this.list
  }

  wall (n = 0) {
    /** @type {CanvasRenderingContext2D|WebGLRenderingContext} */
    const ctx = this.animate.getContext();
    const canvasWidth = this.fullWidth;
    const canvasHeight = this.animate.getHeight();
    const game = this.game;
    const key = this.game.ext('Key');
    const player = this.game.ext('Player');
    const colorNormal = '#d31800';
    const self = this;



    return this.animate.movieclip({
      x: this.animate.getWidth() + n,
      y: random(-(canvasHeight+50), -50),
      width: 25,
      height: canvasHeight + random(0, 60),
      speed: 2,
      distance: 0,
      rotate: 0,
      translate: [0, 0],
      color: colorNormal,
    }, function () {

      key.isPress('a', () => {
        this.speed = 1.5;
      },() => {
        this.speed = 2;
      });

      if (!self.stop)
        this.x -= this.speed;

      if (this.x < -this.width) {
        this.x = canvasWidth + this.width;
        this.y = random(-(canvasHeight-50), -50);
        this.height = canvasHeight + random(0, 50);
      }

      Graphic.rect(Point(this.x, this.y), this.width, this.height)
        .begin()
        .color(this.color)
        .thickness(1)
        .stroke()
        .close();

      if (Graphic.isPointInPath(player.x + 50, player.y + 10)) {
        //game.gotoScene(Game.SCENE.END);
        //Animate.backgroundColor('#d31800');
        self.stop = true;
      }

      Graphic
        .begin()
        .rect(Point(this.x, this.y + 500), this.width, this.height)
        .stroke()
        .close();

      if (Graphic.isPointInPath(player.x + 50, player.y + 10)) {
        //game.gotoScene(Game.SCENE.END);
        //Animate.backgroundColor('#d31800');
        self.stop = true;
      }


    });
  }
}
