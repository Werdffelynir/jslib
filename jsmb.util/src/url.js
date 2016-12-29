////////////////////////////////////////////////////////////////////////
// URL Methods
var Ut = window.Ut || {};   // THIS-LINE-WILL-DELETED

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
