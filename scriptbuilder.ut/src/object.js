
////////////////////////////////////////////////////////////////////////
// Object Methods

if (!Object.is || !Object.is({})) {
    Object.is = function (src) {return Object.prototype.toString.call(src) === '[object Object]'};
}

if (!Object.values) {
    Object.values = function (src) {var a = []; for(var k in src) a.push(src[k]); return a};
}

var Ut = window.Ut || {};   // <<< DELETE THIS STRING


Ut.Object = {};


/**
 * Is object
 * @param src
 */
Ut.Object.is = function (src) {
    return Object.is(src)
};


/**
 * Convert Object to Array
 * @param src
 */
Ut.Object.toArray = function (src) {
    return Object.values(src)
};


/**
 * Execute callback function for each element in Object `src`
 * @param src
 * @param callback
 */
Ut.Object.each = function (src, callback) {
    for(var k in src)
        callback.call(null, src[k], k, src);
};



/**
 * Count object length. Atl to Object.keys(source).length
 * @param   {Object} source
 * @returns {number}
 */
Ut.Object.length = function (source) {
    var it = 0;
    for (var k in source) it++;
    return it;
};


/**
 * Deeply extends two objects
 * @param  {Object} destination The destination object, This object will change
 * @param  {Object} source      The custom options to extend destination by
 * @return {Object}             The desination object
 */
Ut.Object.extend = function(destination, source) {
    var property;
    for (property in source) {
        if (source[property] && source[property].constructor && source[property].constructor === Object) {
            destination[property] = destination[property] || {};
            Ut.Object.extend(destination[property], source[property]);
        } else
            destination[property] = source[property];
    }
    return destination;
};


/**
 * Merge an array `src` into the array `arrBase`
 * @param srcDefault
 * @param src
 * @returns {*}
 */
Ut.Object.merge = function (srcDefault, src) {
    if( !Object.is(srcDefault) )
        return false;

    for (var key in src)
        if (src.hasOwnProperty(key)) srcDefault[key] = src[key];

    return srcDefault;
};


/**
 * Clone object
 * @param   {Object} source
 * @returns {*}
 */
Ut.Object.copy = function (source) {
    if (source === null || typeof source !== 'object') return source;
    var temp = source.constructor();
    for (var key in source)
        temp[key] = Ut.Object.copy(source[key]);
    return temp;
};




/**
 * Javascript object to JSON data
 * @param data
 */
Ut.Object.toJson = function (data) {
    return JSON.stringify(data);
};


/**
 * JSON data to Javascript object
 * @param data
 */
Ut.Object.json = function (data) {
    return JSON.parse(data);
};


