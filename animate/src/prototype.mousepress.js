
/**
 * .mousePress()         (in loop use) return position point object if mouse click, or false
 * .mousePress(callback) (in loop use) execute function if mouse click with argument point object
 *
 * @param callback
 * @returns {*}
 */
Animate.prototype.mousePress = function (callback) {

  if (this.mousePress._is_init === false)
    this.mousePress._init_once_click_listener();

  if (this.mousePress._position && typeof callback === 'function')
    callback.call(null, this.mousePress._position);

  return this.mousePress._position;
};

Animate.prototype.mousePress._position = false;
Animate.prototype.mousePress._is_init = false;
Animate.prototype.mousePress._init_once_click_listener = function () {
  if (this.mousePress._is_init === false) {
    var that = this;
    this.mousePress._is_init = true;

    this._canvas.addEventListener('mousedown', function (event) {
      that.mousePress._position = that.mousePosition(event);
    });

    this._canvas.addEventListener('mouseup', function (event) {
      that.mousePress._position = false;
    });

  }
};

/**
 * .mouseMove()         (in loop use) return position point object when mouse move
 * .mouseMove(callback) (in loop use) execute function when mouse move with argument point object
 *
 * @param callback
 * @returns {*}
 */
Animate.prototype.mouseMove = function (callback) {
  if (this.mouseMove._is_init === false) {
    var that = this;
    this.mouseMove._is_init = true;
    this._canvas.addEventListener('mousemove', function (event) {
      that.mouseMove._position = that.mousePosition(event);
    });
  }

  if (this.mouseMove._position && typeof callback === 'function')
    callback.call(null, this.mouseMove._position);

  return this.mouseMove._position;
};

Animate.prototype.mouseMove._position = false;
Animate.prototype.mouseMove._is_init = false;
