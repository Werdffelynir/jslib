
class SceneMenu extends Extension {

  constructor () {
    super();
  }

  init() {
    const {game, animate} = this;
    const keyInstance = game.ext('Key');

    keyInstance.onKeydown((e) => {
      if (keyInstance.isPress('a') ) {
        game.gotoScene(Game.SCENE.MENU);

      }
      if (keyInstance.isPress('b') ) {
        game.gotoScene(Game.SCENE.GAME);
      }
    });












    /**
     * @type {CanvasRenderingContext2D|WebGLRenderingContext}
     */
    const ctx = this.animate.getContext();
    const walls = [
      this.createWall(0),
      this.createWall(500),
      this.createWall(1000),
      this.createWall(1500),
    ];


    animate.scene(Game.SCENE.MENU, {}, (ctx, iter) => {
      this.showMenu();
      walls.map((wall) => wall())
    });
  }

  showMenu () {
    Text
      .color('#000000')
      .print('MAIN MENU (a)', 10, 10)
      .print('GAME (b)', 10, 30);
  }

  createWall (n) {

    const ctx = this.animate.getContext();
    const canvasWidth = this.animate.getWidth();
    const canvasHeight = this.animate.getHeight();

    return this.animate.movieclip({
      x: random(canvasWidth + n, canvasWidth + n + 150),
      y: random(-350, -50),
      speed: 10,
      distance: 0,
      distanceMax: 2800,
      rotate: 0,
      translate: [0, 0],
    }, function () {
      this.distance += this.speed;
      this.x -= this.speed;

      if (this.distance > this.distanceMax) {
        this.x = random(canvasWidth + n, canvasWidth + n + 150);
        this.y = random(-350, -50);
        this.distance = 0
      }

      ctx.fillRect(this.x, this.y,
        100, 400);

      ctx.fillRect(this.x, this.y + 500,
        100, 400);
    });
  }
}
