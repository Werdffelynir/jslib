var demo_data = [
    {
        name: 'Task name',
        create_date: '10.03.2017',
        status: 'close'
    },{
        name: 'Task name',
        create_date: '11.03.2017',
        status: 'open'
    },{
        name: 'Task name',
        create_date: '12.03.2017',
        status: 'close'
    },{
        name: 'Task name',
        create_date: '13.03.2017',
        status: 'open'
    },{
        name: 'Task name',
        create_date: '14.03.2017',
        status: 'open'
    },{
        name: 'Task name',
        create_date: '15.03.2017',
        status: 'open'
    }
];

var App = new NamespaceApplication();


App.namespace('Template', function () {
    var template = App.query('template');
    return App.search('[data-template]', 'data-template', template.content);
});

App.namespace('Tasks', function () {
    /**@namespace App.Tasks */
    var __ = {
        data: null
    };

    __.init = function (data) {
        __.data = data;
        __.render();

        App.on('form[name="task"]', 'submit', on_add_task);
        App.on('[data-action="add"]', 'click', on_add_task);
        function on_add_task(eve) {
            eve.preventDefault();
            var input = App.query('input[name="task_name"]');
            if (!App.isEmpty(input.value)) {
                __.data.push({name: input.value, create_date: __.getDate(), status: 'open'});
                App.Storage('tasks', __.data);
                input.value = '';
                __.render();
            }
        }
    };

    __.getDate = function () {
        var d = new Date();
        var z = function (n) {return n < 10 ? '0' + n : n};
        return z(d.getDate()) + '.' + z((d.getMonth() + 1)) + '.' + d.getFullYear();
    };

    __.render = function () {
        var html = __.create();
        App.queryAll('[data-action]', html).map(function (btn) {
            App.on(btn, 'click', function (eve) {
                var index = App.attr(eve.target, 'data-taskindex');
                var act = App.attr(eve.target, 'data-action');
                if (act == 'open') {
                    __.data[index]['status'] = 'close';
                }
                if (act == 'delete') {
                    delete __.data[index];
                }
                if (act == 'close') {
                    __.data[index]['status'] = 'open';
                    __.data[index]['create_date'] = __.getDate();
                }
                App.Storage('tasks', __.data);
                __.render();
            });
        });

        App.inject('#tasks', html);
    };

    __.create = function () {
        if (App.typeOf(__.data, 'array')) {
            var i, item, html_status, html_string, html_fragment = document.createDocumentFragment();
            for (i = 0; i < __.data.length; i ++) {
                item = __.data[i];
                if (!App.typeOf(item,'object'))
                    continue;

                if (item['status'] === 'open')
                    html_status = '<div class="button" data-action="open" data-taskindex="'+i+'">Open</div>';
                if (item['status'] === 'close') {
                    html_status = '<div class="button" data-action="delete" data-taskindex="'+i+'">Delete</div>';
                    html_status+= '<div class="button" data-action="close" data-taskindex="'+i+'">Close</div>';
                }

                html_string = App.Template['task'].outerHTML;
                html_string = App.format(html_string, {
                    taskindex: i,
                    taskname: item['name'],
                    taskupdate: item['create_date'],
                    taskactions: html_status
                });
                var node = App.str2node(html_string);
                if (item['status'] === 'close')
                    node.style.backgroundColor = '#f6f6f6';
                html_fragment.appendChild(node);
            }
            return html_fragment;
        }
    };

    return __;
});


App.domLoaded(function () {

    var _data = [];
    if (App.Storage.get('tasks')) {
        _data = App.Storage.get('tasks');
    }

    App.Tasks.init(_data);

});