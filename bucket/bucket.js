(function(window){

    /**
     * // Эквивалентно Bucket.refresh ()
     * Bucket ()
     * // Эквивалентно Bucket.get (key)
     * Bucket (key)
     * // Эквивалентно Bucket.add (key, node)
     * Bucket (key, node)
     *
     * // Объетк глобальных параметров скрипта
     * Bucket.config
     *
     * // Повтор поиска нодов
     * Bucket.refresh ()
     *
     * // Добавления нода
     * Bucket.add ('group', elem)
     *
     * // Выбрать массив всех нодов
     * Bucket.get ()
     *
     * // Выбрать массив нодов по ключу
     * Bucket.get ('group')
     *
     * // Выбрать массив нодов по ключу, если указан второй аргумент - фукция,
     * результат выборки попадет в первый параметр фукции
     * Bucket.get ('group', function (elemList) {})
     *
     * // Выбрать единственный елемент нода, если указан второй аргумент - фукция,
     * результат выборки попадет в первый параметр фукции
     * Bucket.getOne ('group', function (elem) {})
     *
     * // Пройдет по списку каждого нода.
     * Bucket.each (function (elem) {})
     * Bucket.each ('group', function (elem) {})
     * Bucket.each ('group', function (elem) {}, thisInst)
     *
     * // Удалит все ноды по ключу
     * Bucket.remove ('group')
     *
     * // Удалит один нод по ключу
     * Bucket.remove ('group', elem)
     *
     * // Добавить событие
     * Bucket.on ('click', 'group', function (event) {})
     *
     * // Добавить событие click
     * Bucket.click ('group', function (event, elem, value) {});
     *
     * // Выборка елементов по селектору
     * Bucket.query (selector, callback)
     * Bucket.queryOne (selector, callback)
     *
     * // Создать новый елемент
     * Bucket.create (tag, attrs, inner)
     **/

    function Bucket(key, node) {
        if (arguments.length === 0)
            Bucket.refresh();
        else if (arguments.length === 1)
            Bucket.get(key);
        else if (arguments.length === 2)
            Bucket.add(key, node);
    }
    Bucket._nodes = [];
    Bucket.config = {
        searchSelector: '.bucket',
        keyName: 'data-key',
        valueName: 'data-value'
    };
    Bucket.refresh = function () {
        var key,
            selector = Bucket.config.searchSelector || '*['+Bucket.config.keyName+']',
            elems = document.querySelectorAll(selector);

        for(var i = 0; i < elems.length; i ++ ){
            if (key = elems[i].getAttribute(Bucket.config.keyName)) {
                Bucket.add(key, elems[i]);
            }
        }
        return Bucket._nodes;
    };
    Bucket.add = function (key, elem) {
        if (Bucket._nodes.indexOf(elem) === -1) {
            elem.key = key;
            Bucket._nodes.push(elem);
        }
    };
    Bucket.remove = function (key, elem) {
        for(var i = 0; i < Bucket._nodes.length; i ++) {
            if(Bucket._nodes[i].key === key) {
                if (elem === undefined) {
                    delete Bucket._nodes[i];
                }
                else
                if (elem.nodeType === Node.ELEMENT_NODE && Bucket._nodes[i] === elem) {
                    delete Bucket._nodes[i];
                }
            }
        }
    };
    Bucket.get = function (key, callback) {
        var i, result = [], list = Bucket._nodes;
        if (key) {
            for(i = 0; i < list.length; i ++) {
                if(list[i].key === key)
                    result.push(list[i]);
            }
        } else if (arguments.length === 0) {
            result = list;
        }

        if (typeof callback === 'function')
            callback.call({}, list);

        return result;
    };
    Bucket.getOne = function (key, callback) {
        var elem = Bucket.get(key);
        if (elem.length > 0) elem = elem[0];
        if (typeof callback === 'function')
            callback.call({}, elem);
        return elem;
    };
    Bucket.each = function (key, callback, thisInst) {
        if (arguments.length === 1 && typeof key === 'function') {
            Bucket._nodes.map(key, thisInst || {})

        } else if (typeof key === 'string' && typeof callback === 'function') {
            Bucket.get(key).map(callback, thisInst || {});
        }
    };
    Bucket.on = function (event, key, callback, useCapture) {
        var elem = Bucket.get(key);
        if(elem) {
            for(var i = 0; i < elem.length; i ++) {
                elem[i].addEventListener(event, callback, useCapture);
            }
        }
    };
    Bucket.click = function (key, callback, useCapture) {
        var valueName = Bucket.config.valueName;
        var specialCallback = function (event) {
            callback.call(event, event, event.target, event.target.getAttribute(valueName))
        };
        Bucket.on('click', key,  specialCallback, useCapture);
    };
    Bucket.query = function (selector, callback) {
        var elems = Array.prototype.slice.call(document.querySelectorAll(selector));
        if (typeof callback === 'function')
            callback.call({}, elems);
        return elems
    };
    Bucket.queryOne = function (selector, callback) {
        var elem = document.querySelector(selector);
        if (typeof callback === 'function')
            callback.call({}, elem);
        return elem
    };
    Bucket.create = function (tag, attrs, inner) {
        var key, elem = document.createElement(tag);
        if (typeof elem  !== 'object') return null;
        if (typeof attrs === 'object')
            for (key in attrs)
                elem.setAttribute(key, attrs[key]);
        if (typeof inner === 'string')      elem.innerHTML = inner;
        else if (typeof inner === 'object') elem.appendChild(inner);
        return elem;
    };
    Bucket.template = Bucket.assign = function (viewString, params) {
        if (typeof params === 'object')
            for (var k in params)
                viewString = viewString.replace(new RegExp('{{' + k + '}}', 'gi'), params[k]);
        return viewString;
    };

    window.Bucket = Bucket;
    window.Bucket.version = '0.0.1'

})(window);