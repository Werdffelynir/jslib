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

        // set active buttons for open tree
        this._create_actions();
    };

    ultree.prototype._internal_scan = function(element, structure) {
        var i, before, item, index, className, children = [];

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

        if (children.length > 0) {
            for (i = 0; i < children.length; i ++)
                this._internal_scan(children[i], structure[index].children);

            // add elem arrow
            before = document.createElement('i');
            before.setAttribute('data-before', 'arrow');
            element.parentNode.insertBefore(before, element);

        } else {

            // add elem item icon
            before = document.createElement('i');
            before.setAttribute('data-before', 'item');
            element.parentNode.insertBefore(before, element);

        }
    };

    ultree.prototype._create_actions = function() {
        var i, parent, arrows = document.querySelectorAll('i[data-before="arrow"]');
        for (i = 0; i < arrows.length; i ++) {
            arrows[i].addEventListener('click', onToggleChildren);
        }

    };

    ultree.prototype.getStructure = function() {
        return this._internal_structure
    };

    ultree.prototype.query = function(selector, from) {
        from = from && from.nodeType === Node.ELEMENT_NODE ? from : document;
        return from.querySelector(selector)
    };

    ultree.prototype.queryAll = function(selector, from) {
        from = from && from.nodeType === Node.ELEMENT_NODE ? from : document;
        return Array.prototype.slice.call( from.querySelectorAll(selector) );
    };

    function onToggleChildren(event) {
        var target = event.target,
            parent = target.nextSibling,
            parentUL = parent && parent.tagName == 'LI' ? parent.querySelector('ul') : false;

        if (parentUL) {
            if (parentUL.style.display == 'none'){
                parentUL.style.display = 'block';
                target.style.backgroundPosition = '-36px -8px';
            }
            else{
                parentUL.style.display = 'none';
                target.style.backgroundPosition = '0px -8px';
            }
        }

    }

    window.ULTree = ultree;
})();