
class SceneGame extends Extension {

  constructor (animate) {
    super();
    this.animate = animate;
  }

  init(game) {
    this.gameInstance = game;

    Animate.scene('game', {}, function (ctx, iter) {
      Text
        .color('#000000')
        .print('game', 10, 10);

      game.getExtension('Player').draw();
    });
  }

}
