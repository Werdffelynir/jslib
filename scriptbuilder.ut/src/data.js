////////////////////////////////////////////////////////////////////////
// Data Methods
var Ut = window.Ut || {};   // <<< DELETE THIS STRING
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
