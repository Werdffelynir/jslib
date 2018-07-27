( /** @type Animate.prototype */ function (prototype) {

    prototype._events_initialize = function () {

        var that = this;

        // onclick event
        if (typeof this.onClick === 'function' && !this._on_click_init) {
            this._canvas.addEventListener('click', function (event) {
                that.onClick.call(that, event, that.mousePosition(event))
            });
            this._on_click_init = true;
        }

        // onmousemove event
        if (typeof this.onMousemove === 'function' && !this._on_mousemove_init) {
            this._canvas.addEventListener('mousemove', function (event) {
                that.onMousemove.call(that, event, that.mousePosition(event))
            });
            this._on_mousemove_init = true;
        }

        // onmousedown event
        if (typeof this.onMousedown === 'function' && !this._on_mousedown_init) {
            this._canvas.addEventListener('mousedown', function (event) {
                that.onMousedown.call(that, event, that.mousePosition(event))
            });
            this._on_mousedown_init = true;
        }

        // onmouseup event
        if (typeof this.onMouseup === 'function' && !this._on_mouseup_init) {
            this._canvas.addEventListener('mouseup', function (event) {
                that.onMouseup.call(that, event, that.mousePosition(event))
            });
            this._on_mouseup_init = true;
        }

        // onkeydown event
        if (typeof this.onKeydown === 'function' && !this._on_keydown_init) {
            window.addEventListener('keydown', function (event) {
                that.onKeydown.call(that, event)
            });
            this._on_keydown_init = true;
        }

        // onkeyup event
        if (typeof this.onKeyup === 'function' && !this._on_keyup_init) {
            window.addEventListener('keyup', function (event) {
                that.onKeyup.call(that, event)
            });
            this._on_keyup_init = true;
        }
    };

})(Animate.prototype)