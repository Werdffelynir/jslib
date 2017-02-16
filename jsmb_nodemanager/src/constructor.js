(function () {

    return function (selector, attr, orNameTransform) {
        if (!(this instanceof NodeManager)) return new NodeManager(selector, attr, orNameTransform);

        this.config = {
            attr: 'name',
            name: 'defined',
            selector: '*[name]'
        };

        this.elements = {};
        this.query = NodeManager.query;
        this.queryAll = NodeManager.queryAll;
        this.create = NodeManager.create;
        this.template = NodeManager.template;

        if (selector && typeof selector === 'object')
            this.setConfiguration(selector);
        else
            this.setConfiguration({selector: selector, attr: attr || false, name: orNameTransform || false});

        return this;
    }
})()