# ns.resizer.js
## NamespaceApplication extension

## Uses

```js
var App = new NamespaceApplication();

var resizer = document.getElementById('resizer');
var menu = document.getElementById('menu');

function onChange (size) {
    console.log('onChange', size);
}

function onStopChange (size) {
    console.log('onStopChange', size);
}

App.Resizer(resizer, menu, onChange, onStopChange);

```