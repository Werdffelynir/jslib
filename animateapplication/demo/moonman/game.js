
const Animate = new AnimateApplication('canvas.canvas', 800, 400, 30);
const Text = new AnimateText(Animate);
const Event = new AnimateEvent(Animate);
const Graphic = new AnimateGraphic(Animate);
const Loader = new AnimateLoader(Animate);
const Grid = new AnimateGrid(Animate);

Animate.getCanvas().style.border = '5px solid red';

Text.format({
  size: 14,
  family: 'Ubuntu',
});


class Game {
  constructor (exts) {
    this.extension = {};
    exts.map((ext) => {
      ext.init(this);
      this.extension[ext.name] = ext;
    });
  }

  getExtension (name) { return this.extension[name] }

  start () {
    Animate.start('menu');
  }

}

const game = new Game([
  new Key(Animate),
  new Player(Animate),
  new Scenes(Animate),
]);

game.start();

