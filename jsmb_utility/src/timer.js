////////////////////////////////////////////////////////////////////////
// Timer Methods
var Ut = window.Ut || {};   // THIS-LINE-WILL-DELETED

/**
 * Timer function
 *
 * var timer = new Ut.Timer(1000, 10);
 * timer.addEventListener(Ut.Timer.START, function(e){
 *      console.log('START');
 * });
 * timer.addEventListener(Ut.Timer.PROGRESS, function(e){
 *      console.log('PROGRESS:', e.iterator);
 * });
 * timer.start();
 *
 * @param ms
 * @param delay
 * @returns {Window.Ut.Timer|Ut.Timer}
 * @constructor
 */
Ut.Timer = function(ms, delay) {

    ms = ms || 1000;

    if(!(this instanceof Ut.Timer))
        return new Ut.Timer(ms, delay);

    var instance = this;
    this.ms = parseInt(ms);
    this.delay = delay ? parseInt(delay) : 0;
    this._events._onstart = new Event(Ut.Timer.START);
    this._events._onprogress = new Event(Ut.Timer.PROGRESS);
    this._events._oncomplete = new Event(Ut.Timer.COMPLETE);
    this._eventTarget = document.createDocumentFragment();
    /**
     *
     * @param event String Timer.START Timer.PROGRESS Timer.COMPLETE
     * @param callback Function
     * @param useCapture this
     */
    this.addEventListener = function(event, callback, useCapture){
        useCapture = useCapture || false;
        this._eventTarget.addEventListener.call(this._eventTarget, event, callback, useCapture)
    };

    /**
     * Start timer
     */
    this.start = function(){

        if(typeof this.onstart === 'function')
            this._eventTarget.addEventListener(Ut.Timer.START, this.onstart, false);
        if(typeof this.onprogress === 'function')
            this._eventTarget.addEventListener(Ut.Timer.PROGRESS, this.onprogress, false);
        if(typeof this.oncomplete === 'function')
            this._eventTarget.addEventListener(Ut.Timer.COMPLETE, this.oncomplete, false);
        this._eventTarget.dispatchEvent(this._events._onstart);

        // performs interval
        this.timerHandler = setInterval(function(){
            instance._events._onprogress.iterator = instance._events._onprogress.progress = ++ instance.iterator;
            instance._eventTarget.dispatchEvent(instance._events._onprogress);
            if(instance.delay !== 0 && instance.iterator >= instance.delay){
                clearInterval(instance.timerHandler);
                instance._eventTarget.dispatchEvent(instance._events._oncomplete);
            }
        }, this.ms);
    };

    /**
     * Abort timer
     */
    this.abort = function(){
        clearInterval(this.timerHandler)
    };

    /**
     * Reset timer
     */
    this.reset = function(){
        clearInterval(this.timerHandler);
        this._events._onprogress.iterator = this._events._onprogress.progress = instance.iterator = 0;
    };

};

Ut.Timer.prototype = {
    ms: 0,
    mark: 0,
    delay: 0,
    onstart: null,
    onprogress: null,
    oncomplete: null,
    timerHandler: 0,
    iterator: 0,
    _eventTarget: null,
    _events: {_onstart:null,_onprogress:null,_oncomplete:null}
};

Ut.Timer.prototype.constructor = Ut.Timer;

/**
 *
 * @param callback Function
 * @param ms Numeric
 * @param thisInst this for callback
 * @returns {number}
 */
Ut.Timer.timeout = function (callback, ms, thisInst) {
    if(typeof callback === 'function' && !isNaN(ms) && ms > 0){
        thisInst = typeof thisInst === 'object' ? thisInst : {};
        return setTimeout(function(){callback.call(thisInst)}, ms);
    }
};

/**
 *
 * @param callback Function
 * @param ms Numeric
 * @param thisInst this for callback
 * @returns {number}
 */
Ut.Timer.interval = function (callback, ms, thisInst) {
    if(typeof callback === 'function' && !isNaN(ms) && ms > 0){
        thisInst = typeof thisInst === 'object' ? thisInst : {};
        return setInterval(function(){callback.call(thisInst)}, ms);
    }
};

Ut.Timer.timeoutStop = function (intervalId) {clearTimeout(intervalId)};
Ut.Timer.intervalStop = function (intervalId) {clearInterval(intervalId)};

Ut.Timer.START = 'start';
Ut.Timer.PROGRESS = 'progress';
Ut.Timer.COMPLETE = 'complete';
