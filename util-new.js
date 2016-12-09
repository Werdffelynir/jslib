/**
 * Module util.js
 * Its static common helpers methods
 * @version 0.2.2
 */

(function (window) {

    if (!Array.isArray) {
        Array.isArray = function (arg) {
            return Object.prototype.toString.call(arg) === '[object Array]';
        };
    }

    var Util = {};


    //////////////////////////////////////////////////////////////////
    // Util

    Util.defined = function (param) {
        return typeof(param) != 'undefined';
    };

    Util.extend = function(destination, source) {
        var property;
        for (property in source) {
            if (source[property] && source[property].constructor && source[property].constructor === Object) {
                destination[property] = destination[property] || {};
                Util.extend(destination[property], source[property]);
            } else {
                destination[property] = source[property];
            }
        }
        return destination;
    };


    //////////////////////////////////////////////////////////////////
    // UtilObject
/*
Util.Object._source = null;
Util.Object.is = function () {};
Util.Object.diff = function () {};
Util.Object.clone = function () {};
Util.Object.length = function () {};
Util.Object.extend = function () {};
Util.Object.toArray = function () {};
Util.Object.toJson = function () {};
 */
    var UtilObject = function (src) {
        if (!(this instanceof UtilObject)) return new UtilObject(src);

        this.source = src;

        /*
        this.is = function () {
            return UtilObject.is.call(this, this.source)
        };
        this.clone = function () {
            return UtilObject.clone.call(this, this.source)
        };
        this.extend = function (src) {
            return UtilObject.extend.call(this, this.source, src)
        };
        this.merge = function (src) {
            return UtilObject.merge.call(this, this.source, src)
        };
        this.length = function () {
            return UtilObject.length.call(this, this.source)
        };*/
    };

    UtilObject.is = function (src) {
        return Object.prototype.toString.call(src) === '[object Object]';
    };

    UtilObject.clone = function (src) {
        if (!UtilObject.is(src)) return src;
        var k, temp = src.constructor();
        for (k in src)
            temp[k] = UtilObject.clone(src[k]);
        return temp;
    };

    UtilObject.extend = function (destination, src) {
        var property;
        for (property in src) {
            if (src[property] && src[property].constructor && src[property].constructor === Object) {
                destination[property] = destination[property] || {};
                Util.extend(destination[property], src[property]);
            } else {
                destination[property] = src[property];
            }
        }
        return destination;
    };

    UtilObject.merge = function (destination, src) {
        for (var key in src)
            if (src.hasOwnProperty(key)) destination[key] = src[key];
        return destination;
    };

    UtilObject.length = function (src) {
        var k, it = 0; for (k in src) it ++;
        return it;
    };

    UtilObject.toArray = function (src) {
        var k, arr = [];
        if (src.length)
            arr = [].slice.call(src);
        else
            for(k in src)
                arr.push(src[key])
        return arr;
    };

    UtilObject.toJson = function (src) {
        return JSON.stringify(src);
    };





/*
 UtilObject.diff = function () {return; };
    UtilObject.prototype.extend = function () {return ;};
    UtilObject.prototype.unique = function () {return ;};
    UtilObject.prototype.length = function () {
        var k, it = 0;
        for (k in this.source) it ++;
        return it;
    };
    UtilObject.prototype.merge = function (objectBase, src) {
        if (typeof objectBase !== 'object' || typeof src !== 'object')
            return false;

        if (Object.key) {
            Object.keys(src).forEach(function (key) {
                objectBase[key] = src[key];
            });
            return objectBase;
        } else {
            for (var key in src)
                if (src.hasOwnProperty(key)) objectBase[key] = src[key];
            return objectBase;
        }
    };
    UtilObject.prototype.toArray = function () {return ;};
    UtilObject.prototype.toJson = function () {return ;};
*/



    //////////////////////////////////////////////////////////////////
    // UtilArray
/*
Util.Array = function () {};
Util.Array._source = null;
Util.Array.is = function () {};
Util.Array.diff = function () {};
Util.Array.clone = function () {};
Util.Array.length = function () {};
Util.Array.extend = function () {};
Util.Array.toObject = function () {};
Util.Array.toJson = function () {};
Util.Array.unique = function () {};
*/
    var UtilArray = function (src) {
        if (!(this instanceof UtilArray)) return new UtilArray(src);
        this.source = src
    };

    UtilArray.prototype.is = function () {
        return Object.prototype.toString.call(this.source) === '[object Array]';
    };

    UtilArray.prototype.diff = function () {return ;};
    UtilArray.prototype.clone = function () {return ;};
    UtilArray.prototype.extend = function () {return ;};
    UtilArray.prototype.unique = function () {return ;};
    UtilArray.prototype.length = function () {return ;};
    UtilArray.prototype.toObject = function () {return ;};
    UtilArray.prototype.toJson = function () {return ;};









    Util.Object = UtilObject;
    Util.Array = UtilArray;

    window.Util = Util;
    window.UtilArray = UtilArray;
    window.UtilObject = UtilObject;

})(window);



/*
extend
cloneObject
objectLength
objectMerge
objectMergeNotExists
objectMergeOnlyExists
arrayMerge
arrayDiff
inArray
objectToArray
realObjectToArray
cloneFunction
isString
isArray
isObject
isNumeric
isIterated
isEmpty
isHtml
isNode
isType
isNodeType
defined
objectToJson
jsonToObject
cleanArr
typeOf
formData
toNode
uniqueArray
fileGetContents
getPosition
getMousePosition
createStyle
createElement
rand
randColor
degreesToRadians
radiansToDegrees
distanceBetween
encodeData
parseGet
parseUrl
each
ucfirst
node2html
html2node
base64encode
base64decode
getChar
Date
Storage
Cookie
getURLParameter
asyncForEach
waitFor
rmInArray
eachParent
toTranslit
isMobile
 */