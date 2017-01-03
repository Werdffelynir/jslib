(function () {

    return function (selector, attr, orName) {
        if (!(this instanceof Noder)) return new Noder(selector, attr, orName);

        this.config = {
            attr: 'name',
            name: 'defined',
            selector: '*[name]'
        };

        this.elements = {};
        this.query = Noder.query;
        this.queryAll = Noder.queryAll;
        this.create = Noder.create;
        this.template = Noder.template;

        if (selector && typeof selector === 'object')
            this.setConfiguration(selector);
        else
            this.setConfiguration({selector: selector, attr: attr || false, name: orName || false});

        return this;
    }
})()