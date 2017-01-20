(function () {

    var ultree = function(selector, config) {
        if (!(this instanceof ultree))
            return new ultree(selector, config);

        var i, key, root;

        // default config
        this.config = {
            element: null,
            children_hide: false,
        };

        for (key in (config || {}))
            if (this.config[key] !== undefined)
                this.config[key] = config[key];

        this._internal_structure = [];
        this._internal_structure_iterator = 0;
        this.config.selector = selector;
        this.config.element = this.query(selector);

        // Create structure;
        root = this.queryAll(selector + '>li');
        for (i = 0; i < root.length; i ++)
            this._internal_scan(root[i], this._internal_structure);

        // customize tree style
        this.customization();

        // run parameters
        if (this.config.children_hide)
            this.hideChildren();
        else
            this.showChildren();
    };

    ultree.prototype._internal_scan = function(element, structure) {
        var i, item, index, className, children = [];

        className = 'item_' + this._internal_structure_iterator;
        element.classList.add(className);

        item = {
            element: element,
            content: this.query('span', element),
            children: children
        };

        structure.push(item);
        this._internal_structure_iterator ++;

        index = structure.indexOf(item);
        children = this.queryAll('.' + className + '>ul>li', element);

        if (children) {
            for (i = 0; i < children.length; i ++)
                this._internal_scan(children[i], structure[index].children);
        }
    };

    ultree.prototype.customization = function() {
        return this._internal_structure
    };

    ultree.prototype.getStructure = function() {
        return this._internal_structure
    };

    ultree.prototype.showChildren = function() {};

    ultree.prototype.hideChildren = function() {};

    ultree.prototype.query = function(selector, from) {
        from = from && from.nodeType === Node.ELEMENT_NODE ? from : document;
        return from.querySelector(selector)
    };

    ultree.prototype.queryAll = function(selector, from) {
        from = from && from.nodeType === Node.ELEMENT_NODE ? from : document;
        return Array.prototype.slice.call( from.querySelectorAll(selector) );
    };

    window.ULTree = ultree;
})();