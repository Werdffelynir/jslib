(function () {

    /**
     * Constructor.
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

        if (arguments.length > 2 && arguments[1] > 0)
            _options = {selector: arguments[0], width: parseInt(arguments[1]), height: parseInt(arguments[2]), fps: arguments[3]};

        var
            pk,
            properties = {
                selector:   null,
                width:      600,
                height:     400,
                fps:        30,
                loop:       Animate.LOOP_ANIMATE,
                fullScreen: false,
                autoStart:  true, //todo: not yet realize
                autoClear:  true,
                sorting:    true,
                filtering:  true
            };

        Animate.Util.defaultObject(properties, _options);

        for (pk in properties)
            this[pk] = properties[pk];

        this.isPlay = false;
        this.isFiltering = false;
        this.setTimeoutIterator = 0;
        this.requestAnimationFrameIterator = 0;
        this.frameCounter = 0;
        this.frameStorageList = {};
        this.frameName = 'default';
        this.onFrame = null;
        this.canvas = document.querySelector(this.selector);

        if (!(this.canvas instanceof HTMLCanvasElement)) {
            console.error('[Error]: Canvas element not find. selector: ' + this.selector);
        } else {
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            this.context = this.canvas.getContext('2d');
            if (!(this.context instanceof CanvasRenderingContext2D)) {
                console.error('[Error]: Canvas context 2d not query from element with selector: ' + this.selector);
            }
        }

        var that = this;

        // initialize extensions
        if (Animate.internalExtensions.length > 0) {
            for (var ei = 0; ei < Animate.internalExtensions.length; ei++)
                if (typeof Animate.internalExtensions[ei] === 'function')
                    Animate.internalExtensions[ei].call(this, this);
        }

        if (!!this.fullScreen)
            this.resizeCanvas();

    }
})()