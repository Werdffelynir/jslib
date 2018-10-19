
class Scenes {

  constructor () { }

  init (game) {
    this.gameInstance = game;

    this.sceneMenu();
    this.sceneSettings();
    this.sceneIntro();
    this.sceneGame();
  }

  clipMenuButton (button) {
    Graphic.rect(Point(button.x, button.y), 300, 38)
      .color('black').thickness(5).stroke()
      .color('red').fill();
    Text.color('black').print(button.title, button.x + 10, button.y + 10);
  }

  clipGameButton (button) {
    Graphic.rect(Point(button.x, button.y), 100, 38)
      .color('black').thickness(5).stroke()
      .color('red').fill();
    Text.color('black').print(button.title, button.x + 10, button.y + 10);
  }
  // ---------------------------------------------------------------------------
  sceneMenu () {
    const Game = this.gameInstance;
    const keyInstance = Game.getExtension('Key');
    const clipMenuButton = this.clipMenuButton;
    const buttons = [
      {
        x: Animate.width / 2 - 150, y: 50,
        title: 'Start Game (a)'
      }, {
        x: Animate.width / 2 - 150, y: 100,
        title: 'Game Settings (b)'
      }, {
        x: Animate.width / 2 - 150, y: 150,
        title: 'Introduction (c)'
      }
    ];

    Animate.scene('menu', {
      title: 'Menu'
    }, function (ctx, iter) {
      Text.color('black').print(this.title, 10, 10);

      buttons.map ((button) => {clipMenuButton(button);});

      if (keyInstance.isPress('a')) Animate.start('game');
      if (keyInstance.isPress('b')) Animate.start('settings');
      if (keyInstance.isPress('c')) Animate.start('intro');

    });
  }
  // ---------------------------------------------------------------------------
  sceneSettings () {
    const clipGameButton = this.clipGameButton;
    const Game = this.gameInstance;
    const keyInstance = Game.getExtension('Key');
    const buttons = [
      {
        x: Animate.width - 110, y: 10,
        title: 'Menu (q)'
      }
    ];
    Animate.scene('settings', {}, function (ctx, iter) {
      Text.print('settings', 10, 10);
      buttons.map ((button) => { clipGameButton(button) });

      if (keyInstance.isPress('space'))
        Graphic.rect(Point(100, 100), 300, 300).color('red').fill();

      if (keyInstance.isPress('q')) Animate.start('menu');
    });
  }
  // ---------------------------------------------------------------------------
  sceneIntro () {
    const clipGameButton = this.clipGameButton;
    const Game = this.gameInstance;
    const keyInstance = Game.getExtension('Key');
    const buttons = [
      {
        x: Animate.width - 110, y: 10,
        title: 'Menu (q)'
      }
    ];
    Animate.scene('intro', {}, function (ctx, iter) {
      Text.print('intro', 10, 10);
      buttons.map ((button) => { clipGameButton(button) });
      if (keyInstance.isPress('q')) Animate.start('menu');
    });
  }
  // ---------------------------------------------------------------------------
  sceneGame () {
    const clipGameButton = this.clipGameButton;
    const Game = this.gameInstance;
    const keyInstance = Game.getExtension('Key');
    const buttons = [
      {
        x: Animate.width - 110, y: 10,
        title: 'Menu (q)'
      }
    ];
    Animate.scene('game', {}, function (ctx, iter) {
      Text.print('game', 10, 10);
      buttons.map ((button) => { clipGameButton(button) });
      if (keyInstance.isPress('q')) Animate.start('menu');
    });
  }
}

