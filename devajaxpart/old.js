
var app = {};

/**
 * Base AJAX request. Example:
 *  app.ajax({
     *      method: 'POST',
     *      url: '/server.php',
     *      data: {id:123, name:'UserName'}
     *  }, function (status, data) {
     *      console.log(status, data);
     *  });
 * @param {*} config        {method: 'POST', data: {}, headers: {}, action: '/index'}
 * @param callback          executing event - onloadend. function (status, responseText)
 * @returns {XMLHttpRequest}

 app.ajax = function (config, callback) {
        var conf = {
            method:     config.method || 'GET',
            data:       config.data || {},
            headers:    config.headers || {},
            action:     config.action || config.url || document.location
        };
        var xhr = new XMLHttpRequest();
        var kd, kh, fd = new FormData();

        if (conf.method.toUpperCase() !== 'POST') {
            conf.action += conf.action.indexOf('?') === -1 ? '?' : '';
            for (kd in conf.data) {
                conf.action += '&' + kd + '=' + encodeURIComponent(conf.data[kd])
            }
        } else
            for (kd in conf.data) {
                fd.append(kd, encodeURIComponent(conf.data[kd]));
            }

        xhr.open (conf.method, conf.action, true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

        for (kd in conf.headers) {
            xhr.setRequestHeader(kd, conf.headers[kd]);
        }

        xhr.onloadend = function () {
            if (typeof callback === 'function')
                callback.call(xhr, xhr.status, xhr.responseText);
        };

        xhr.send(fd);
        return xhr;
    };
 */
/**
 * Send Form Data on AJAX request. Example:
 *  app.ajaxPostForm(FORM_ELEMENT, {
     *      action: '/server.php',
     *      data: {id:123, name:'UserName'}
     *  }, function (status, data) {
     *      console.log(status, data);
     *  });
 * @param form              FORM_ELEMENT
 * @param {*} config        {data: {}, headers: {}, action: '/index'}
 * @param callback          executing event - onloadend. function (status, responseText)
 * @returns {XMLHttpRequest}
 app.ajaxPostForm = function (form, config, callback) {
        if (typeof config === 'function') {
            callback = config;
            config = false;
        }
        else if (typeof config === 'object')
            form.action = config.url || config.action || form.action;

        form.method = 'POST';
        form.onsubmit = function (event) {
            event.preventDefault();

            var formData = new FormData(this);
            var kd, xhr = new XMLHttpRequest();

            xhr.open(this.method, this.action, true);
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

            if (config && typeof config.headers === 'object') {
                for (kd in config.headers)
                    xhr.setRequestHeader(kd, config.headers[kd]);
            }

            if (config && typeof config.data === 'object') {
                for (kd in config.data)
                    formData.append(kd, config.data[kd]);
            }

            xhr.onloadend = function () {
                if (typeof callback === 'function')
                    callback.call(xhr, xhr.status, xhr.responseText);
            };
            xhr.send(formData);
        };

        return form;
    };




 var emailForm = document.getElementById('email');

 app.ajaxPostForm(emailForm, {
        url: '/devajaxpart/server.php',
        headers: {h1:'', h2:''},
        data: {
            bin:'bin-bin',
            etc:'etc-etc',
            token:'ASD123QWE'
        }
    }, function (status, data) {
        console.log(status, data);
    });




 app.ajaxForm(emailForm, function (status, data) {
 console.log(status, data);
 });



 app.ajax({
 method: 'POST',
 url: '/server.php',
 data: {id:123, name:'UserName'}
 }, function (status, data) {
 console.log(status, data);
 });
*/