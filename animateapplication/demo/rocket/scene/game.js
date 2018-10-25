
class SceneGame extends Extension {

  constructor () {
    super();
  }

  init() {

    const player = this.game.getExtension('Player');
    const obstacle = this.game.getExtension('Obstacle');
    obstacle.refreshList();


    Animate.scene(Game.SCENE.GAME, {}, function (ctx, iter) {
      Text
        .color('#000000')
        .print('game', 10, 10);

      obstacle.list.map((w) => {
        w();
      });

      Graphic.close();
      player.draw();

    });
  }

}
