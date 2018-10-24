
class SceneGame extends Extension {

  constructor (animate) {
    super();
    this.animate = animate;
  }

  init(game) {
    this.gameInstance = game;

    const mcShard = game.getExtension('Shard');
    const mcPlayer = game.getExtension('Player');

    Animate.scene(Game.SCENE.GAME, {}, function (ctx, iter) {
      Text
        .color('#000000')
        .print('game', 10, 10);

      mcShard.draw();
      mcPlayer.draw();
    });
  }

}
