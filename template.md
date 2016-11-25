# Template js

```js
var template = Template(config)
template.loades {*}
template.inject (selector, data, append)
template.assign (viewString, params)
template.get (name)
template.load (urls, callback)
template.ajax (config, callback, thisInstance)

// static
Template.ajax
```

### Uses
``` js
// Constructor
var template = new Template();

var loadList = [
    '/events/templates/header.html',
    '/events/templates/sidebar.html'
];

function templatesLoaded(list) {
    template.inject(document.getElementById('header'), list.header);
    template.inject(document.getElementById('sidebar'),
        template.assign(
            template.get('sidebar'),
            {navigation: template.get('navigation')}
        ));
}

template.load(loadList, templatesLoaded);
```
