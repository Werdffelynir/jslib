(function(window){

    /**
     * // Эквивалентно Noder.refresh ()
     * Noder ()
     * // Эквивалентно Noder.get (key)
     * Noder (key)
     * // Эквивалентно Noder.add (key, node)
     * Noder (key, node)
     *
     * // Объетк глобальных параметров скрипта
     * Noder.config
     *
     * // Повтор поиска нодов
     * Noder.refresh ()
     *
     * // Добавления нода
     * Noder.add ('group', elem)
     *
     * // Выбрать массив всех нодов
     * Noder.get ()
     *
     * // Выбрать массив нодов по ключу
     * Noder.get ('group')
     *
     * // Выбрать массив нодов по ключу, если указан второй аргумент - фукция,
     * результат выборки попадет в первый параметр фукции
     * Noder.get ('group', function (elemList) {})
     *
     * // Выбрать единственный елемент нода, если указан второй аргумент - фукция,
     * результат выборки попадет в первый параметр фукции
     * Noder.getOne ('group', function (elem) {})
     *
     * // Пройдет по списку каждого нода.
     * Noder.each (function (elem) {})
     * Noder.each ('group', function (elem) {})
     * Noder.each ('group', function (elem) {}, thisInst)
     *
     * // Удалит все ноды по ключу
     * Noder.remove ('group')
     *
     * // Удалит один нод по ключу
     * Noder.remove ('group', elem)
     *
     * // Добавить событие
     * Noder.on ('click', 'group', function (event) {})
     *
     * // Добавить событие click
     * Noder.click ('group', function (event, elem, value) {});
     *
     * // Выборка елементов по селектору
     * Noder.query (selector, callback)
     * Noder.queryOne (selector, callback)
     *
     * // Создать новый елемент
     * Noder.create (tag, attrs, inner)
     **/

    function Noder(key, node) {
        if (arguments.length === 0)
            Noder.refresh();
        else if (arguments.length === 1)
            Noder.get(key);
        else if (arguments.length === 2)
            Noder.add(key, node);
    }
    Noder._nodes = [];
    Noder.config = {
        searchSelector: '.noder',
        keyName: 'data-key',
        valueName: 'data-value'
    };
    Noder.refresh = function () {
        var key,
            selector = Noder.config.searchSelector || '*['+Noder.config.keyName+']',
            elems = document.querySelectorAll(selector);

        for(var i = 0; i < elems.length; i ++ ){
            if (key = elems[i].getAttribute(Noder.config.keyName)) {
                Noder.add(key, elems[i]);
            }
        }
        return Noder._nodes;
    };
    Noder.add = function (key, elem) {
        if (typeof elem === 'string') {
            elem = Noder.queryOne(elem);
        }
        if (elem.nodeType !== Node.ELEMENT_NODE ) {
            console.error('Error. Second argument ['+elem.toString()+'] is not node element!');
            return;
        }
        if (Noder._nodes.indexOf(elem) === -1) {
            elem.key = key;
            Noder._nodes.push(elem);
        } else
            console.error('Element ['+elem.toString()+'] was not added! It exits in storage.');
    };
    Noder.remove = function (key, elem) {
        for(var i = 0; i < Noder._nodes.length; i ++) {
            if(Noder._nodes[i].key === key) {
                if (elem === undefined) {
                    delete Noder._nodes[i];
                }
                else
                if (elem.nodeType === Node.ELEMENT_NODE && Noder._nodes[i] === elem) {
                    delete Noder._nodes[i];
                }
            }
        }
    };
    Noder.get = function (key, callback) {
        var i, result = [], list = Noder._nodes;
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
    Noder.getOne = function (key, callback) {
        var elem = Noder.get(key);
        if (elem.length > 0) elem = elem[0];
        if (typeof callback === 'function')
            callback.call({}, elem);
        return elem;
    };
    Noder.each = function (key, callback, thisInst) {
        if (arguments.length === 1 && typeof key === 'function') {
            Noder._nodes.map(key, thisInst || {})

        } else if (typeof key === 'string' && typeof callback === 'function') {
            Noder.get(key).map(callback, thisInst || {});
        }
    };
    Noder.on = function (event, key, callback, useCapture) {
        var elem = Noder.get(key);
        if(elem) {
            for(var i = 0; i < elem.length; i ++) {
                elem[i].addEventListener(event, callback, useCapture);
            }
        }
    };
    Noder.click = function (key, callback, useCapture) {
        var valueName = Noder.config.valueName;
        var specialCallback = function (event) {
            callback.call(event, event, event.target, event.target.getAttribute(valueName))
        };
        Noder.on('click', key,  specialCallback, useCapture);
    };
    Noder.query = function (selector, callback) {
        var elems = Array.prototype.slice.call(document.querySelectorAll(selector));
        if (typeof callback === 'function')
            callback.call({}, elems);
        return elems
    };
    Noder.queryOne = function (selector, callback) {
        var elem = document.querySelector(selector);
        if (typeof callback === 'function')
            callback.call({}, elem);
        return elem
    };
    Noder.create = function (tag, attrs, inner) {
        var key, elem = document.createElement(tag);
        if (typeof elem  !== 'object') return null;
        if (typeof attrs === 'object')
            for (key in attrs)
                elem.setAttribute(key, attrs[key]);
        if (typeof inner === 'string')      elem.innerHTML = inner;
        else if (typeof inner === 'object') elem.appendChild(inner);
        return elem;
    };
    Noder.template = Noder.assign = function (viewString, params) {
        if (typeof params === 'object')
            for (var k in params)
                viewString = viewString.replace(new RegExp('{{' + k + '}}', 'gi'), params[k]);
        return viewString;
    };

    window.Noder = Noder;
    window.Noder.version = '0.0.1'

})(window);