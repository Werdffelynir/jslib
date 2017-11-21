Animate.Extension(function (instance) {

  if (!(instance instanceof Animate))
    return;

  /**
   * @type CanvasRenderingContext2D
   */
  var context = instance.getContext();

  console.log('GameEnemy:instance', instance);

  instance.GameEnemy = function () {
    return 'GameEnemy';
  };

});