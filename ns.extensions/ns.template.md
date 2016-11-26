# ns.template.js
## NamespaceApplication extension


## Methods
```
var template = App.Template();
template.get(name)
template.set(name, data)
template.load(urls, callback)
```


## Uses

```js
App.Template([
    '/events/templates/content.html',
    '/events/templates/footer.html'
], function (list) {
    console.log(list)
});

// Equivalent to the

var template = App.Template();

var loadList = [
    '/events/templates/content.html',
    '/events/templates/footer.html'
];

function templatesLoaded(list) {
    console.log(list);
}

template.load(loadList, templatesLoaded);
```