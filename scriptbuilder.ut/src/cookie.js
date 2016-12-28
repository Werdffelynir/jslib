
////////////////////////////////////////////////////////////////////////
// Cookie Methods

var Ut = window.Ut || {};   // <<< DELETE THIS STRING


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

