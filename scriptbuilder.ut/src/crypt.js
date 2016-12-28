
////////////////////////////////////////////////////////////////////////
// Crypt Methods

var Ut = window.Ut || {};   // <<< DELETE THIS STRING


Ut.Crypt = {};


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
 * Encode URI params
 * @param data      Object key=value
 * @returns {*}     query string
 */
Ut.Crypt.encodeData = function(data){
    if(typeof data === 'string') return data;
    if(typeof data !== 'object') return '';
    var convertData = [];
    Object.keys(data).forEach(function(key){
        convertData.push(key+'='+encodeURIComponent(data[key]));
    });
    return convertData.join('&');
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


/**
 * Parse URI Request data into object
 * @param url
 * @returns {{}}
 */
Ut.Crypt.parseGet = function(url){
    url = url || document.location;
    var params = {};
    var parser = document.createElement('a');
    parser.href = url;
    if(parser.search.length > 1){
        parser.search.substr(1).split('&').forEach(function(part){
            var item = part.split('=');
            params[item[0]] = decodeURIComponent(item[1]);
        });
    }
    return params;
};


/**
 * Parse Url string/location into object
 * @param url
 * @returns {{}}
 */
Ut.Crypt.parseUrl = function(url){
    url = url || document.location;
    var params = {};
    var parser = document.createElement('a');
    parser.href = url;
    params.protocol = parser.protocol;
    params.host = parser.host;
    params.hostname = parser.hostname;
    params.port = parser.port;
    params.pathname = parser.pathname;
    params.hash = parser.hash;
    params.search = parser.search;
    params.get = Util.parseGet(parser.search);
    return params;
};


Ut.Crypt.getURLParameter = function(name) {
    var reg = (new RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [, null])[1];
    return reg === null ? undefined : decodeURI(reg);
};


/**
 * Convert HTML form to encode URI string
 * @param form
 * @param asObject
 * @returns {*}
 */
Ut.Crypt.formData = function (form, asObject) {
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
Ut.Crypt.getChar = function (event) {
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

