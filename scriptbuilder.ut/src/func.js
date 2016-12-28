
////////////////////////////////////////////////////////////////////////
// Func Methods

var Ut = window.Ut || {};   // <<< DELETE THIS STRING

Ut.Func = {};

/**
 * Variable if type of function
 * @param src
 * @returns {boolean}
 */
Ut.Func.is = function (src) { return typeof src === 'function' };

/**
 * Copy function
 * @param src
 * @returns {temporary}
 */
Ut.Func.copy = function (src) {
    var key, temp = function temporary() { return src.apply(this, arguments); };
    for(key in this) {
        if (this.hasOwnProperty(key)) {
            temp[key] = this[key];
        }
    }
    return temp;
};

/**
 * An asynchronous for-each loop
 *
 * @param   {Array}     array       The array to loop through
 *
 * @param   {function}  done        Callback function (when the loop is finished or an error occurs)
 *
 * @param   {function}  iterator
 * The logic for each iteration.  Signature is `function(item, index, next)`.
 * Call `next()` to continue to the next item.  Call `next(Error)` to throw an error and cancel the loop.
 * Or don't call `next` at all to break out of the loop.
 */
Ut.Func.asyncForEach = function (array, done, iterator) {
    var i = 0;
    next();

    function next(err) {
        if (err)
            done(err);
        else if (i >= array.length)
            done();
        else if (i < array.length) {
            var item = array[i++];
            setTimeout(function() {
                iterator(item, i - 1, next);
            }, 0);
        }
    }
};

/**
 * Calls the callback in a given interval until it returns true
 * @param {function} callback
 * @param {number} interval in milliseconds
 */
Ut.Func.waitFor = function(callback, interval) {
    var internalCallback = function() {
        if(callback() !== true) {
            setTimeout(internalCallback, interval);
        }
    };
    internalCallback();
};
