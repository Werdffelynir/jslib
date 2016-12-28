
////////////////////////////////////////////////////////////////////////
// Array Methods

if (!Array.isArray) {
    Array.isArray = function (src) {return Object.prototype.toString.call(src) === '[object Array]'};
}


var Ut = window.Ut || {};   // <<< DELETE THIS STRING


Ut.Array = {};


Ut.Array.is = function (src) {
    return Array.isArray(src)
};


Ut.Array.in = function (needle, haystack) {
    if(Array.isArray(haystack))
        return haystack.indexOf(needle) !== -1;
};


Ut.Array.copy = function (src) {
    if(Array.isArray(src))
        return JSON.parse(JSON.stringify(src));
};


Ut.Array.each = function (src, callback) {
    for(var i = 0; i < src.length; i ++)
        callback.call(null, src[i], i, src);
};


/**
 * Cleans the array of empty elements
 * @param src
 * @returns {Array}
 */
Ut.Array.clean = function (src) {
    var i, arr = [];
    for (i = 0; i < src.length; i++)
        if (src[i])
            arr.push(src[i]);
    return arr;
};


/**
 * Removes duplicate values from an array
 * @param arr
 * @returns {Array}
 */
Ut.Array.unique = function (arr) {
    var i, tmp = [];
    for (i = 0; i < arr.length; i++) {
        if (tmp.indexOf(arr[i]) == "-1")
            tmp.push(arr[i]);
    }
    return tmp;
};


/**
 * Remove item from array
 * @param item
 * @param stack
 * @returns {Array}
 */
Ut.Array.remove = function(item, stack) {
    var i, arr = [];
    for(i = 0; i < stack.length; i ++) {
        if(stack[i] && stack[i] != item)
            arr.push(stack[i]);
    }
    return arr;
};

/**
 * Merge an array `src` into the array `arrBase`
 * @param srcDefault
 * @param src
 * @returns {*}
 */
Ut.Array.merge = function (srcDefault, src) {
    if( !Array.isArray(srcDefault) || !Array.isArray(src) )
        return false;

    for (var i = 0; i < src.length; i++)
        srcDefault.push(src[i])

    return srcDefault;
};



/**
 * Computes the difference of arrays
 * Compares arr1 against one or more other arrays and returns the values in arr1
 * that are not present in any of the other arrays.
 * @param arr1
 * @param arr2
 * @returns {*}
 */
Ut.Array.diff = function (arr1, arr2) {
    if (Array.isArray(arr1) && Array.isArray(arr2)) {
        return arr1.slice(0).filter(function (item) {
            return arr2.indexOf(item) === -1;
        })
    }
    return false;
};


/**
 * Removes duplicate values from an array
 * @param arr
 * @returns {Array}
 */
Ut.Array.unique = function (arr) {
    var tmp = [];
    for (var i = 0; i < arr.length; i++) {
        if (tmp.indexOf(arr[i]) == "-1") tmp.push(arr[i]);
    }
    return tmp;
};