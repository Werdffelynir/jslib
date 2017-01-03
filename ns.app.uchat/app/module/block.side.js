
App.namespace('Block.Side', function(App) {
    /**
     * @namespace App.Block.Side
     */
    var _ = {
        elements: null,
        base: null
    };
    /**
     * @namespace App.Block.Side.init
     * @param element
     */
    _.init = function(element){
        _.base = element;
    };


    /**
     * @namespace App.Block.Side.getElements
     * @param attr
     * @returns {*}
     */
    _.getElements = function (attr) {
        var nm = new NodeManager('ul#app-ulist>li');
        nm.setConfigurationAttr('data-uid');
        nm.search(_.base);

        _.elements = nm.getElements();
        if (attr && _.elements[attr] !== undefined)
            return _.elements[attr];
        return _.elements;
    };

    return _;
});