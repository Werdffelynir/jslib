NamespaceApplication.extension('Template', function (App) {

    /**
     * @namespace App.Template
     */
    var template = function (urls, callback) {
        if (arguments.length == 2)
            return template.load(urls, callback);
        return template
    };

    /**
     * @namespace App.Template.list
     */
    template.loades = {};
    template.loadesCount = 0;
    /**
     * @namespace App.Template.get
     * @param name
     * @returns {*}
     */
    template.get = function (name) {
        if (template.loades[name])
            return template.loades[name];
        return false
    };

    /**
     * @namespace App.Template.set
     * @param name
     * @param data
     * @returns {*}
     */
    template.set = function (name, data) {
        return template.loades[name] = data;
    };

    /**
     * @param url
     * @param callback
     */
    template.internalLoader = function (url, callback) {
        App.ajax({method:'GET', url: url}, function (status, data) {
            if (status === 200) {
                template.loadesCount --;
                template.loades[template.parseTemplateName(url)] = data;
                if (template.loadesCount === 0 && typeof callback === 'function')
                    callback.call(template, template.loades);
            } else
                console.error('Error of loading template. Status code ' + status);
        }, template);
    };

    /**
     * @namespace App.Template.load
     * @param urls
     * @param callback
     */
    template.load = function (urls, callback) {
        if (Array.isArray(urls)) {
            template.loadesCount = urls.length;
            for (var i = 0; i < urls.length; i ++) {
                template.internalLoader(urls[i], callback);
            }
        } else if (typeof urls === 'string') {
            template.internalLoader(urls, callback);
        }
    };

    /**
     * @namespace App.Template.parseTemplateName
     * @param name
     * @returns {*}
     */
    template.parseTemplateName = function (name) {
        if (name.lastIndexOf('/') !== -1)
            name = name.substr(name.lastIndexOf('/')+1);
        if (name.lastIndexOf('.') !== -1)
            name = name.substr(0, name.lastIndexOf('.'));
        return name
    };

    return template;
});
