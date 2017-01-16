(function () {
    /**
     * Constructor
     *
     * @param _options  options Object or selector
     * @param width
     * @param height
     * @param fps
     * @returns {Animate}
     * @constructor
     */
    return function (_options, width, height, fps) {

        if (!(this instanceof Animate))
            return new Animate(_options, width, height, fps);

        if (arguments.length > 1)
            _options = {
                selector: arguments[0],
                width: parseInt(arguments[1]),
                height: parseInt(arguments[2]),
                fps: arguments[3]
            };

        var
            pk,
            options = {
                selector:   null,
                width:      600,
                height:     400,
                fps:        30,
                loop:       Animate.LOOP_ANIMATE,
                fullScreen: false,
                autoStart:  true,
                autoClear:  true,
                sorting:    true,
                filtering:  true,

                // events
                _on_frame:        null, // ones-event
                _on_mousemove:    null, // ..
                _on_keyup:        null, // ..
                _on_keydown:      null, // ..
                _on_click:        null, // ..

                // internal
                _canvas:                    null,
                _context:                   null,
                _frame_name:                'default',
                _is_play:                   false,
                _is_filter:                 false,
                _loop_timer_id:             null,
                _loop_animation_frame_id:   null,
                _frame_iterator:            0,
                _frames:                    {}
            };

        // Set options
        Animate.Util.defaultObject(options, _options);

        for (pk in options)
            this[pk] = options[pk];

        this._canvas = document.querySelector(this.selector);

        if (!(this._canvas instanceof HTMLCanvasElement)) {
            console.error('[Error]: Canvas element not find. selector: ' + this.selector);
            return;
        } else {
            this._canvas.width = this.width;
            this._canvas.height = this.height;
            this._context = this._canvas.getContext('2d');
        }

        // initialize extensions
        if (Animate._internal_extensions.length > 0) {
            for (var ei = 0; ei < Animate._internal_extensions.length; ei++)
                if (typeof Animate._internal_extensions[ei] === 'function')
                    Animate._internal_extensions[ei].call(this, this);
        }

        // custom settings
        if (!!this.fullScreen)
            this.resizeCanvas();

    }
})()