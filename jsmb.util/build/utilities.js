(function (window) {

window.Ut = {};

////////////////////////////////////////////////////////////////////////
// Base Methods
/**
 * Вернет тип передаваемого параметра value, или сравнит тип value с передаваемым type и вернет boolean
 * Возможные заначения: null, boolean, undefined, function, string, number, date, number, array, object
 * @param src
 * @param type_is
 * @returns {*}
 */
Ut.typeOf = function (src, type_is) {
    var type = Object.prototype.toString.call(src).slice(8, -1).toLowerCase();
    type = type.toLowerCase();
    return typeof type_is === 'string' ? type_is.toLowerCase() === type : type;
};

/**
 * Проверка на пустой элемент
 * @param src
 * @returns {boolean}
 */
Ut.empty = function (src) {
    return (src === "" || src === 0 || src === "0" || src === null || src === undefined || src === false || (Array.isArray(src) && src.length === 0))
};

/**
 * Determine param to undefined type
 * @param src
 * @returns {boolean}
 */
Ut.defined = function (src) {
    return typeof(src) != 'undefined';
};


////////////////////////////////////////////////////////////////////////
// Object Methods

if (!Object.is || !Object.is({})) {
    Object.is = function (src) {return Object.prototype.toString.call(src) === '[object Object]'};
}

if (!Object.values) {
    Object.values = function (src) {var a = []; for(var k in src) a.push(src[k]); return a};
}

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


////////////////////////////////////////////////////////////////////////
// Array Methods
if (!Array.isArray) {
    Array.isArray = function (src) {return Object.prototype.toString.call(src) === '[object Array]'};
}

Ut.Array = {};

/**
 *
 * @param src
 * @returns {boolean}
 */
Ut.Array.is = function (src) {
    return Array.isArray(src)
};

/**
 *
 * @param needle
 * @param haystack
 * @returns {boolean}
 */
Ut.Array.in = function (needle, haystack) {
    if(Array.isArray(haystack))
        return haystack.indexOf(needle) !== -1;
};

/**
 *
 * @param src
 */
Ut.Array.copy = function (src) {
    if(Array.isArray(src))
        return JSON.parse(JSON.stringify(src));
};

/**
 *
 * @param src
 * @param callback
 */
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

/**
 * Get object by param and value from array
 * Example:
 *  var values = [{id:1}, {id:2}, ...]
 *  var attr = 'id'
 *  var attrValue = 2
 *  itemByAttr(values, attr, attrValue) // {id:2}
 * @param values
 * @param attr
 * @param attrValue
 * @returns {*}
 */
Ut.Array.itemByAttr = function (values, attr, attrValue) {
    var i,
        tmp,
        list = values || [];

    for (i = 0; i < list.length; i ++) {
        if (list[i][attr] !== undefined && list[i][attr] == attrValue) {
            tmp = list[i];
        }
    }
    return tmp;
};


////////////////////////////////////////////////////////////////////////
// Math Methods
Ut.Math = {};

Ut.Math.isNumeric = function (src) {
    return !isNaN(parseFloat(src)) && isFinite(src)
};

Ut.Math.isInteger = function (src) {
    return typeof src === 'number' && !(src % 1)
};

Ut.Math.isIterated = function (src) {
    return src && src.length > 0
};

/**
 * Returns a random integer between min, max, if not specified the default of 0 to 100
 * @param min
 * @param max
 * @returns {number}
 */
Ut.Math.rand = function (min, max) {
    min = min || 0;
    max = max || 100;
    return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * Returns random string color, HEX format
 * @returns {string}
 */
Ut.Math.randColor = function () {
    var letters = '0123456789ABCDEF'.split(''),
        color = '#';
    for (var i = 0; i < 6; i++)
        color += letters[Math.floor(Math.random() * 16)];
    return color;
};

/**
 * Converts degrees to radians
 * @param deg
 * @returns {number}
 */
Ut.Math.degreesToRadians = function (deg) {
    return (deg * Math.PI) / 180;
};

/**
 * Converts radians to degrees
 * @param rad
 * @returns {number}
 */
Ut.Math.radiansToDegrees = function (rad) {
    return (rad * 180) / Math.PI;
};

/**
 * The calculation of the distance between points
 * The point is an object with properties `x` and `y` {x:100,y:100}
 * @param point1
 * @param point2
 * @returns {number}
 */
Ut.Math.distanceBetween = function (point1, point2) {
    var dx = point2.x - point1.x;
    var dy = point2.y - point1.y;
    return Math.sqrt(dx * dx + dy * dy);
};


////////////////////////////////////////////////////////////////////////
// Dom Methods
Ut.Dom = {};

/**
 * Check src to NodeElement type
 * @param src
 * @returns {boolean}
 */
Ut.Dom.is = function (src) {
    var typeName = Ut.Dom.nodeType(src);
    return ['ELEMENT_NODE', 'DOCUMENT_NODE', 'DOCUMENT_FRAGMENT_NODE'].indexOf(typeName) !== -1
};

/**
 * If is html
 * @param src
 * @returns {boolean}
 */
Ut.Dom.isHTML = function (src) {
    if(Ut.Dom.is(src))
        return true;
    return Ut.Dom.is(Ut.Dom.toNode(src));
};

/**
 * Copy of DOMElement
 * @param src
 * @returns {Node}
 */
Ut.Dom.copy = function (src) {
    return src.cloneNode(true);
};


Ut.Dom.clone = function (src) {
    return Ut.Dom.copy(src);
};

/**
 * Query DOM Element by selector
 *
 * @param selector
 * @param parent|callback
 * @returns {Element}
 */
Ut.Dom.query = function (selector, parent) {
    var elems = Ut.Dom.queryAll(selector, parent);
    if (elems && elems.length > 0)
        return elems[0];
    return null;
};

/**
 * Query DOM Elements by selector
 *
 * @param selector
 * @param parent    callback
 * @returns {*}
 */
Ut.Dom.queryAll = function (selector, parent) {
    var callback, elems, from = document;

    if (typeof parent === 'function')
        callback = parent;
    else if (typeof parent === 'string')
        from = document.querySelector(parent);
    else if (typeof parent === 'object' && parent.nodeType === Node.ELEMENT_NODE)
        from = parent;

    if (from) {
        if (typeof selector === 'object' &&
            (selector.nodeType === Node.ELEMENT_NODE || selector.nodeType === Node.DOCUMENT_NODE))
            elems = [selector];
        else
            elems = [].slice.call(from.querySelectorAll(selector));
    }

    if (elems.length > 0 && typeof callback == 'function')
        callback.call(callback, elems);

    return elems;
};

/**
 * Query DOM Element by selector to up in tree
 *
 * @param selector
 * @param from
 * @param loops
 * @returns {*}
 */
Ut.Dom.queryUp = function(selector, from, loops) {
    var item = null;
    if(loops === undefined) loops = 20;
    if(typeof from === 'string') from = document.querySelector(from);
    if(from.nodeType !== Node.ELEMENT_NODE) {
        from = document;
        loops = 0;
    }

    if(typeof selector === 'string')
        item = from.querySelector(selector);

    if(!item && loops > 0) {
        if(from.parentNode)
            return app.queryUp(selector, from.parentNode, --loops);
    }

    return item;
};

/**
 *
 * @param elem     Node елемент
 * @param callback получи как аргумет родительский елемент при каждой итерации,
 *                  если функция вернот false итерация прикратится
 * @param limit    количество итерация с возможных,
 */
Ut.Dom.eachParent = function (elem, callback, limit) {
    var i = 0;
    limit = limit || 99;
    while(elem.nodeType === Node.ELEMENT_NODE && i < limit ) {
        var res = callback.call({}, elem);
        if(res === false) i = limit;
        elem = elem.parentNode;
        i ++;
    }
};

/**
 * Get nodeType entry
 * Node.ELEMENT_NODE - 1
 * Node.TEXT_NODE - 3
 * Node.PROCESSING_INSTRUCTION_NODE - 7
 * Node.COMMENT_NODE - 8
 * Node.DOCUMENT_NODE - 9
 * Node.DOCUMENT_TYPE_NODE - 10
 * Node.DOCUMENT_FRAGMENT_NODE - 11
 */
Ut.Dom.nodeType = function (src) {
    var t = src && src.nodeType ? src.nodeType : false,
        e = [];

    e[Node.ELEMENT_NODE] = 'ELEMENT_NODE';
    e[Node.TEXT_NODE] = 'TEXT_NODE';
    e[Node.PROCESSING_INSTRUCTION_NODE] = 'PROCESSING_INSTRUCTION_NODE';
    e[Node.COMMENT_NODE] = 'COMMENT_NODE';
    e[Node.DOCUMENT_NODE] = 'DOCUMENT_NODE';
    e[Node.DOCUMENT_TYPE_NODE] = 'DOCUMENT_TYPE_NODE';
    e[Node.DOCUMENT_FRAGMENT_NODE] = 'DOCUMENT_FRAGMENT_NODE';

    return e[t];
};

/**
 * Convert HTML string to DOMElement
 * @param string
 * @returns {*}
 */
Ut.Dom.toNode = function (string){
    var i,
        fragment = document.createDocumentFragment(),
        container = document.createElement("div");
    container.innerHTML = string;

    while( i = container.firstChild )
        fragment.appendChild(i);

    return fragment.childNodes.length === 1 ? fragment.firstChild : fragment;
};

/**
 * Convert HTML string to DOMElements
 * @param string
 * @returns {*}
 */
Ut.Dom.toNodeString = function (string) {
    var parser = new DOMParser();
    var node = parser.parseFromString(string, "text/xml");
    console.log(node);
    if (typeof node == 'object' && node.firstChild.nodeType == Node.ELEMENT_NODE)
        return node.firstChild;
    else
        return false;
};

/**
 * Convert DOMElement to HTML string
 * @param element
 * @returns {*}
 */
Ut.Dom.toHTML = function (element){
    var container = document.createElement("div");
    container.appendChild(element.cloneNode(true));
    return container.innerHTML;
};

/**
 * Create new NodeElement
 * @param tag       element tag name 'p, div, h3 ... other'
 * @param attrs     object with attributes key=value
 * @param inner     text, html or NodeElement
 * @returns {Element}
 */
Ut.Dom.create = function (tag, attrs, inner) {
    var elem = document.createElement(tag);
    if (typeof elem !== 'object') return null;

    if (typeof attrs === 'object') {
        for (var key in attrs)
            elem.setAttribute(key, attrs[key]);
    }

    if (typeof inner === 'string') {
        elem.innerHTML = inner;
    } else if (typeof inner === 'object') {
        elem.appendChild(inner);
    }
    return elem;
};

/**
 * Calculates the position and size of elements.
 *
 * @param elem
 * @returns {{y: number, x: number, width: number, height: number}}
 */
Ut.Dom.position = function (elem) {
    var top = 0, left = 0;
    if (elem.getBoundingClientRect) {
        var box = elem.getBoundingClientRect();
        var body = document.body;
        var docElem = document.documentElement;
        var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
        var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
        var clientTop = docElem.clientTop || body.clientTop || 0;
        var clientLeft = docElem.clientLeft || body.clientLeft || 0;
        top = box.top + scrollTop - clientTop;
        left = box.left + scrollLeft - clientLeft;
        return {y: Math.round(top), x: Math.round(left), width: elem.offsetWidth, height: elem.offsetHeight};
    } else {
        //fallback to naive approach
        while (elem) {
            top = top + parseInt(elem.offsetTop, 10);
            left = left + parseInt(elem.offsetLeft, 10);
            elem = elem.offsetParent;
        }
        return {x: left, y: top, width: elem.offsetWidth, height: elem.offsetHeight};
    }
};


////////////////////////////////////////////////////////////////////////
// Func Methods
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


////////////////////////////////////////////////////////////////////////
// Crypt Methods
Ut.Crypt = {};

/**
 * Encode to base64
 * @param str
 * @returns {string}
 */
Ut.Crypt.base64encode = function (str){
    var b64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    var b64encoded = '';
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    for (var i=0; i<str.length;) {
        chr1 = str.charCodeAt(i++);
        chr2 = str.charCodeAt(i++);
        chr3 = str.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = isNaN(chr2) ? 64:(((chr2 & 15) << 2) | (chr3 >> 6));
        enc4 = isNaN(chr3) ? 64:(chr3 & 63);
        b64encoded += b64chars.charAt(enc1) + b64chars.charAt(enc2) +
            b64chars.charAt(enc3) + b64chars.charAt(enc4);
    }
    return b64encoded;
};

/**
 * Decode from base64
 * @param str
 * @returns {string}
 */
Ut.Crypt.base64decode = function (str) {
    var b64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    var b64decoded = '';
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    str = str.replace(/[^a-z0-9\+\/\=]/gi, '');
    for (var i=0; i<str.length;) {
        enc1 = b64chars.indexOf(str.charAt(i++));
        enc2 = b64chars.indexOf(str.charAt(i++));
        enc3 = b64chars.indexOf(str.charAt(i++));
        enc4 = b64chars.indexOf(str.charAt(i++));
        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;
        b64decoded = b64decoded + String.fromCharCode(chr1);
        if (enc3 < 64) {
            b64decoded += String.fromCharCode(chr2);
        }
        if (enc4 < 64) {
            b64decoded += String.fromCharCode(chr3);
        }
    }
    return b64decoded;
};



/**
 * @param text
 * @returns {string|void|XML}
 */
Ut.Crypt.toTranslit = function (text) {
    return text.replace(/([а-яё])|([\s_-])|([^a-z\d])/gi,
        function (all, ch, space, words, i) {
            if (space || words)
                return space ? '-' : '';
            var code = ch.charCodeAt(0),
                index = code == 1025 || code == 1105 ? 0 : code > 1071 ? code - 1071 : code - 1039,
                t = ['yo','a','b','v','g','d','e','zh','z','i','y','k','l','m','n','o','p', 'r','s','t','u','f','h','c','ch','sh','shch','','y','','e','yu','ya'];
            return t[index];
        });
};



////////////////////////////////////////////////////////////////////////
// Date Methods
Ut.Date = {};

Ut.Date.msInDay = 864e5;

Ut.Date.msInHour = 36e5;

Ut.Date.msInMinute = 6e4;

Ut.Date.time = function(date){
    return date instanceof Date ? date.getTime() : (new Date).getTime()
};

/**
 * Add days to some date
 * @param day           number of days. 0.04 - 1 hour, 0.5 - 12 hour, 1 - 1 day
 * @param startDate     type Date, start date
 * @returns {*}  type Date
 */
Ut.Date.addDays = function (day, startDate){
    var date = startDate ? new Date(startDate) : new Date();
    date.setTime(date.getTime() + (day * 86400000));
    return date;
};

/**
 * Time between Dates
 * <pre>
 *     var from = new Date('2016-08-01 20:30');
 *     var to = new Date('2016-08-10 07:55');
 *     Ut.Date.betweenDates(from, to); // Object { day: 8, hour: 11, minute: 25 }
 * </pre>
 * @namespace Ut.Date.betweenDates
 * @param dateFrom
 * @param dateTo
 * @returns {{day: number, hour: number, minute: number}}
 */
Ut.Date.betweenDates = function(dateFrom, dateTo){
    dateFrom = dateFrom || new Date();
    dateTo = dateTo || new Date();
    var diffMs = (dateTo - dateFrom),
        diffDays = Math.round(diffMs / 864e5),
        diffHrs = Math.round((diffMs % 864e5) / 36e5),
        diffMins = Math.round(((diffMs % 864e5) % 36e5) / 6e4);
    return {day: diffDays, hour: diffHrs, minute: diffMins};
};


////////////////////////////////////////////////////////////////////////
// Data Methods
Ut.Data = {};

/**
 * Convert HTML form to encode URI string
 * @param form
 * @param asObject
 * @returns {*}
 */
Ut.Data.parseForm = function (form, asObject) {
    var obj = {}, str = '';
    for (var i = 0; i < form.length; i++) {
        var f = form[i];
        if (f.type == 'submit' || f.type == 'button') continue;
        if ((f.type == 'radio' || f.type == 'checkbox') && f.checked == false) continue;
        var fName = f.nodeName.toLowerCase();
        if (fName == 'input' || fName == 'select' || fName == 'textarea') {
            obj[f.name] = f.value;
            str += ((str == '') ? '' : '&') + f.name + '=' + encodeURIComponent(f.value);
        }
    }
    return (asObject === true) ? obj : str;
};

/**
 * Cross-browser function for the character of the event keypress:
 * @param event     event.type must be keypress
 * @returns {*}
 */
Ut.Data.getChar = function (event) {
    if (event.which == null) {
        if (event.keyCode < 32)
            return null;
        return String.fromCharCode(event.keyCode)
    }
    else if (event.which != 0 && event.charCode != 0) {
        if (event.which < 32)
            return null;
        return String.fromCharCode(event.which);
    }
    return null;
};

/**
 * First symbol to UpperCase
 * @param src
 * @returns {*|string}
 */
Ut.Data.ucfirst = function (src){
    return src && src[0].toUpperCase() + src.slice(1);
};


////////////////////////////////////////////////////////////////////////
// URL Methods

Ut.URL = {};

Ut.URL.parse = function (url) {
    url = url || document.location;
    var params = {}, link = document.createElement('a');
    link.href = url;
    ['protocol','host','hostname','port','pathname','hash','search','href'].forEach(function(prop, i, arr) {
        if (link[prop] !== undefined)
            params[prop] = link[prop]
    });
    params.get = link.search.length > 0 ? Ut.URL.get(link.search) : {};
    return params;
};

Ut.URL.get = function (src) {
    var item, params = {};
    if (src === undefined) src = document.location.search;
    if (src.length > 2) {
        src.substr(1).split('&').forEach(function(part){
            item = part.split('=');
            params[item[0]] = decodeURIComponent(item[1]);
        });
    }
    return params
};

/**
 * Encode URI params
 * @param data      Object key=value
 * @returns {*}     query string
 */
Ut.URL.encode = function (data) {
    if (data && typeof data === 'object') {
        var convertData = [];
        Object.keys(data).forEach(function(key){
            convertData.push(key+'='+encodeURIComponent(data[key]));
        });
        data = convertData.join('&');
    }
    return data;
};

Ut.URL.getURLParameter = function(name) {
    var reg = (new RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [, null])[1];
    return reg === null ? undefined : decodeURI(reg);
};


////////////////////////////////////////////////////////////////////////
// Storage Methods


Ut.Storage = function(name, value){
    if(!name){
        return false;
    }else if(value === undefined){
        return Ut.Storage.get(name);
    }else if(!value){
        return Ut.Storage.remove(name);
    }else{
        return Ut.Storage.set(name, value);
    }
};

/**
 * Set
 * @param name
 * @param value
 */
Ut.Storage.set = function (name, value) {
    try{value = JSON.stringify(value)}catch(error){}
    return window.localStorage.setItem(name, value);
};

/**
 * Get
 * @param name
 */
Ut.Storage.get = function (name) {
    var value = window.localStorage.getItem(name);
    if(value)
        try{value = JSON.parse(value)}catch(error){}
    return value;
};

/**
 * Remove
 * @param name
 */
Ut.Storage.remove = function (name) {
    return window.localStorage.removeItem(name);
};

/**
 * Get by index
 * @param index
 * @returns {string}
 */
Ut.Storage.key = function (index) {
    return window.localStorage.key(index);
};

/**
 * when invoked, will empty all keys out of the storage.
 */
Ut.Storage.clear = function () {
    return window.localStorage.clear();
};

/**
 * returns an integer representing the number of data items stored in the Storage object.
 * @returns {number}
 */
Ut.Storage.length = function () {
    return window.localStorage.length;
};


////////////////////////////////////////////////////////////////////////
// Cookie Methods

/**
 * возвращает cookie с именем name, если есть, если нет, то undefined
 * @param name
 * @param value
 */
Ut.Cookie = function (name, value) {
    "use strict";
    if(value === undefined){
        return Ut.Cookie.get(name);
    }
    else if (value === false || value === null){
        Ut.Cookie.delete(name);
    }else {
        Ut.Cookie.set(name, value);
    }
};

/**
 * Get Cookie value by key
 * @param name
 * @returns {*}
 */
Ut.Cookie.get = function (name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
};

/**
 * Set Cookie key, value
 * @param name
 * @param value
 * @param {{}} options   {expires: 0, path: '/', domain: 'site.com', secure: false}
 *                          expires - ms, Date, -1, 0
 */
Ut.Cookie.set = function (name, value, options) {
    options = options || {};
    var expires = options.expires;
    if (typeof expires == "number" && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }
    value = encodeURIComponent(value);
    var updatedCookie = name + "=" + value;
    for (var propName in options) {
        updatedCookie += "; " + propName;
        var propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }
    document.cookie = updatedCookie;
};

/**
 * Remove Cookie by key
 * @param name
 * @param option
 */
Ut.Cookie.remove = function (name, option){
    "use strict";
    option = typeof option === 'object' ? option : {};
    option.expires = -1;
    Ut.Cookie.set(name, "", option);
};


////////////////////////////////////////////////////////////////////////
// Style Methods

/**
 * Создает генератор для елементов style.
 * Необходимо создавать новый экземпляр
 *
 * s = new Ut.Style();
 *
 * // create style for selector ".box-1"
 * // String params = 'font-size: 12px; ...'
 * // Object params = {'font-size': '12px', ...}
 * // Array params = ['font-size: 12px', ...]
 *
 * s.add('.box-1', params)
 *
 * //get NodeElement
 * s.get()
 *
 * //get text result
 * s.getText()
 *
 * //inject into document.head
 * s.initialize(')
 *
 *
 * @param selector
 * @param property
 * @returns {Window.Ut.Style|Ut.Style}
 * @constructor
 */
Ut.Style = function (selector, property) {

    if(!(this instanceof Ut.Style))
        return new Ut.Style(selector, property);

    var i, key, ctx,
        element = document.createElement('style');

    this.context = '';

    this.add = function (s, p) {
        ctx = '';
        if (typeof p === 'string') {
            this.context += s + "{" + ( (p.substr(-1) == ';') ? p : p + ';' ) + "}";
        }
        else if (Array.isArray(p)) {
            for (i = 0; i < p.length; i ++)
                ctx += (p[i].substr(-1) == ';') ? p[i] : p[i] + ';'
            this.context += s + "{" + ctx + "}";
        }
        else if (Object.is(p)) {
            for (key in p)
                ctx += key + ':' + p[key] + ';';
            this.context += s + "{" + ctx + "}";
        }
        return this;
    };

    this.get = function () {
        element.setAttribute('rel', 'stylesheet');
        element.textContent = this.context;
        return element
    };

    this.getText = function () {
        return '<style rel="stylesheet">' + "\n" + this.context + "\n" + '</style>'
    };

    this.initialize = function () {
        if (document.head)
            document.head.appendChild(this.get());
    };

    if (selector && property)
        this.add(selector, property);
};


////////////////////////////////////////////////////////////////////////
// Timer Methods

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


////////////////////////////////////////////////////////////////////////
// System Methods
Ut.System = {};

/**
 * Device detection
 * @returns {boolean}
 */
Ut.System.isMobile = function() {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
        return true;
    }
    return false;
};


////////////////////////////////////////////////////////////////////////
// Mouse Methods
Ut.Mouse = {};

Ut.Mouse.m = function (src){};

/**
 * Returns the coordinates of the mouse on any element
 * @param event
 * @param element
 * @returns {{x: number, y: number}}
 */
Ut.Mouse.position = function (event, element) {
    var positions = {x: 0, y: 0};
    element = element || document.body;
    if(element instanceof HTMLElement && event instanceof MouseEvent) {
        if(element.getBoundingClientRect) {
            var rect = element.getBoundingClientRect();
            positions.x = event.clientX - rect.left;
            positions.y = event.clientY - rect.top;
        }else {
            positions.x = event.pageX - element.offsetLeft;
            positions.y = event.pageY - element.offsetTop;
        }
    }
    return positions;
};


})(window);

