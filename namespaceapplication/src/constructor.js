(function () {
    return function () {
        // Simplex
        if (!(this instanceof NamespaceApplication)) return new NamespaceApplication();

        // Public config properties
        this.path = '/';
        this.debug = true;

        // Private properties
        this._require_key = false;
        this._requires_stack = {};

        // Set Configurations
        if (arguments.length == 1 && arguments[0] && typeof arguments[0] === 'object') {
            for (var k in arguments[0]) {
                if (this[k] === undefined || ['path', 'debug'].indexOf(k) !== -1)
                    this[k] = arguments[0][k];
            }
        }

        // Set extension aliases to instance
        NamespaceApplication.extension.set_instance_application(this);

        return this;
    }
})()