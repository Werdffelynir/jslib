
class Game {

  /**
   *
   * @param animate {AnimateApplication}
   * @param exts
   */
  constructor (animate, exts) {
    this.animate = animate;
    this.extension = {};

    exts.map((ext) => {
      if (typeOf(ext.init, 'function')) {
        ext.gameInstance = this;
        ext.animateInstance = animate;
        ext.init();
      }
      this.extension[ext.name] = ext;
    });

    const key = this.getExtension('Key');
    console.log('popupMenu', key );

    this.animate.frame({hide: false}, function (ctx, iter) {
      if (key.isPress('space')) {
        this.hide = !this.hide
      }

      if (!this.hide) {
        //
        // Graphic.rect(0, 0, 90, 30).thickness(0.5).color('#4b4b4b').stroke();
        // Text.baseline(FONT_BASELINE_BOTTOM)
        //   .color('#2a2a2a')
        //   .print('MAIN MENU (a)', 0, 0);
        //
        // Graphic.rect(100, 0, 90, 30).thickness(0.5).color('#4b4b4b').stroke();
        // Text.baseline(FONT_BASELINE_BOTTOM)
        //   .color('#2a2a2a')
        //   .print('MAIN MENU (a)', 100, 0);


      }

    });
  }

  getExtension (name) {
    return this.extension[name]
  }

  ext (name) { return this.getExtension (name) }
  //
  // popupMenu () {
  //   return this.animate.movieclip({}, function (a,b ) {
  //     console.log('popupMenu', a, b );
  //   })
  // }

  gotoScene (name) {
    this.animate.start(Game.SCENE.CURRENT = name);
  }

}

Game.SCENE = {
  CURRENT: '',
  MAIN: 'main',
  END: 'end',
  MENU: 'menu',
  GAME: 'game',
};
