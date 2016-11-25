# Template js


### Uses
``` js
// Constructor
var template = new Template();

var loadList = [
    '/events/templates/header.html',
    '/events/templates/sidebar.html'
];

function templatesLoaded(list) {
    template.inject(node['header'], template.get('header'));
    template.inject(node['sidebar'],
        template.assign(
            template.get('sidebar'),
            {navigation: template.get('navigation')}
        ));
}

template.load(loadList, templatesLoaded);
```
