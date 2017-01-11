# JS NamespaceApplication


## Reference


### Create instance
```js
App = new NamespaceApplication({configuration})
```


### Properties
```js

// Get script version [read only]
App.version

// Get debug status or set debug mod  
App.debug

// Other custom properties
App.path
App.url
```


### Methods of instance
```js
// Create namespace for module-script (like namespace "Action.Name")
namespace (namespace, callback, args)

// Designate a list of scripts for loading
require (key, path, oncomplete, onerror)

// Start loading the list of scripts by key (identifier)
requireStart (key)

// Simple router
router (uri, callback, hash, query)
```


### Static methods and aliases it in instance
```js
// Loads the script element
NamespaceApplication.loadJS (src, onload, onerror)

// Loads the CSS link element
NamespaceApplication.loadCSS (src, onload, onerror)

// Execute callback function if or when DOM is loaded
NamespaceApplication.domLoaded (callback)

// Give back a type of transmitted value
NamespaceApplication.typeOf (value, type)

// Give back a full object type of transmitted value
NamespaceApplication.typeOfStrict (value, type)

// Is defined a value. Return boolean
NamespaceApplication.defined (value)

// Check type of value on NodeType. Return boolean
NamespaceApplication.isNode (value)

// Deeply extends two objects
NamespaceApplication.extend (destination, source)

// Get rel URI
NamespaceApplication.uri (uri)

// Simple redirect
NamespaceApplication.redirect (to)

// Get route - URI Path
NamespaceApplication.routePath (hash, query)

// Selects and return a one (first) element by selector
NamespaceApplication.query (selector, fromCallback, thisInstance)

// Selects and return an all elements by selector
NamespaceApplication.queryAll (selector, fromCallback, thisInstance)

// Selects and return a one element by selector. Search go to up in a DOM tree
NamespaceApplication.queryUp (selector, from, loops)

// Execute callback for each element in list
NamespaceApplication.each (list, callback, tmp)

// Simple adding event listener for element
NamespaceApplication.on (selector, eventName, callback, bubble)

// Add style\s to HTMLElement\s
NamespaceApplication.css (selector, properties)

// Inject data into HTMLElement
NamespaceApplication.inject (selector, data, append)

// Formatting of string, maybe template builder
NamespaceApplication.format;

// Base ajax request
NamespaceApplication.ajax (config, callback, thisInstance)

// Simple timer realis. Return self-instance
NamespaceApplication.Timer (callback, delay, repeat, thisInstance)

// Storage of local
NamespaceApplication.Storage (name, value)
```


### Static methods

```js
// Add extantion
NamespaceApplication.extension (name, callback)
```


### App.namespace()
Syntax: `App.namespace(namespace:String, callback:Function):Object`

```js
// example 1
if(App.namespace){App.namespace('Controller.Register', function(App){
    /**
     * @namespace App.Controller.Register
     */
    var o = {};
    o.one = function(){};
    return o;
})}

// example 2
App.namespace('Controller.Register', function(App, o) {
    o.one = function(){};
    return o;
});

// example 3
(function (App) {
    /**
     * Register action namespace. Using depending on the base application
     * @namespace App.Action.Dialog
     */
    var o = App.namespace('Action.Dialog');
    o.node = {};
    o.data = {};
})(App);

// example 4
var textEdit = App.namespace('Module.TextEdit');
textEdit.area = function(){};
textEdit.input = function(){};
```


### App.require() 
Syntax: `App.require(key:String, path:Array, oncomplete:Function, onerror:Function):App`

### App.requireStart()
Syntax: `App.requireStart(key:String):App`

```js

// List of scripts
App.require('library',[
    '/js/library/lib1.js',
    '/js/library/lib2.js',
    '/js/library/lib3.js'
], onSuccess, onError);

// Execute if loading is success
function onSuccess(list){}

// Execute if loading failed
function onError(error){}

// Strart loading
App.requireStart('library')
```


### App.domLoaded()
Syntax: `App.domLoaded(callback: Function)`

```js
App.domLoaded(foo);

App.domLoaded(function (){
    // code...
});
```


### App.request()
Syntax: `App.request(method:String, url:String, callback:Function, callbackError:Function):XMLHttpRequest`

```js
App.request('POST', '/to', onRequest, onRequestError)

function onRequest (event) {}
function onRequestError (event) {}
```


### App.script()
Syntax: `App.script(src:String, onload:Function, onerror:Function):HTMLElement`

### App.style()
Syntax: `App.style(src:String, onload:Function, onerror:Function):HTMLElement`

```js
// loading of js script file
App.script('/js/script.js', function(element){}, function(error){});

// loading of css style file
App.style('/css/style.css', function(element){}, function(error){});
```


### App.file()
Syntax: `App.file(url:String, onload:Function, onerror:Function):void`

```js
App.file('/templates/popup.html', onSuccess, onError);

function onSuccess(data) {
    App.inject('#content', data);
}

function onError(error) {
    console.error('File loading error!', error);
}
```


### App.route()
Syntax: `App.route():String`

### App.routePath()
Syntax: `App.routePath():String`

```js
App.route('/', App.Controller.Page.construct, true);
App.route('/#login', App.Controller.Login.construct, true);

var route = App.routePath()
```


### App.assign()
Syntax: `App.assign(stringData:String, params:Object):String`

### App.inject()
Syntax: `App.inject(selector:String, data:String|Object):Void`

```js
var tpl = '<h1>{{title}}</h1><div>{{content}}</div>';

var pageContent = App.assign(tpl, {
    title:"hello world",
    content:"hello world"
})

App.inject('#content', pageContent);
```





### App.query()
Syntax: `App.query(selector:String, callback:Function):HTMLElement`

### App.queryAll()
Syntax: `App.queryAll(selector:String, callback:Function):Array`

### App.queryUp()
Syntax: `App.queryUp(selector:String, callback:Function):HTMLElement`

```js
// example 1
var nodeContent = App.query('#content');
// equal
App.query('#content', function(nodeContent){
    // do ...
});

// example 2
var menuLinks = App.queryAll('#menu li>a');
// equal
App.queryAll('#menu li>a', function(menuLinks){
    // do ...
});

// example 3
var activeElement = App.queryUp('.active', '#menu', 10);
```



### App.setProperties()
Syntax: `App.setProperties(): `

### App.constructsStart()
Syntax: `App.constructsStart(): `

```js

```



### App.on()
Syntax: `App.on(eventName:String, selector:String, callback:Function, bubble:Boolean): `

```js
App.on('change', '#button-add', onChange, false);


function onChange(event) {
    // code...
}
```



### App.each()
Syntax: `App.each(list:Array|Object, callback:Function, tmp:Object):Array|Object`

```js
var tmpSum = 'conf', 
    arr = [1,2,3,4,5];
    
App.each(arr, function (item, index, sum) {
    sum += '-' + index + '-' + (item * 100);
    console.log(item, index, sum);
}, tmpSum);


var obj = {id: 123, name: 'Class', root: '/'};

App.each(obj, function(item, key){
    console.log(item, key);
});
```



### App.extend()
Syntax: `App.extend(obj: Object, src: Object, callback: Function): Object`

```js
var baseObjectExtend = App.extend(baseObject, sourceObject)
```



### App.redirect()
Syntax: `App.redirect(url: String): Void`

```js
App.redirect('/go/to')

App.redirect('https://domain.com/go/to')
```


### App.uri()
Syntax: `App.uri(): `

```js

```


### App.store()

Syntax: `App.store(object:*, keyWithValue:*): *`

Storage in memory:

> if `object` is a Object - set new objects. 
> if `object` is a String - return object by name. 
> if `object` is a not set - return all objects

```js

App.store({
    key1 : 'value1',
    key2 : 'value2',
    key3 : 'value3'
});

App.store('key4','data-string');

NamespaceApplication.store()
NamespaceApplication.store('key1')
```

### App.typeOf 

Syntax: `NamespaceApplication.typeOf(value, type)`
```
function foo(){}
var types = [
    0,
    null,
    false,
    true,
    undefined,
    function(){},
    foo,
    'hello',
    132456,
    new Date(),
    Object.create,
    3.14,
    [1,2,3,4],
    {name:'John', age:34}
];

types.map(function(it, i){
    console.log(types[i], App.typeOf(it),  App.typeOf(it, 'array'));
});
```

### Extension 

Syntax: `NamespaceApplication.extension(name, callback)`


#### index.html
```html
<!doctype html>
<head>
    <script src="/js/lib/ns.application.js"></script>
    <script src="/js/lib/ns.extensions/ns.template.js"></script>
</head>
<body>

</body>
</html>
```


#### ns.extension.js
```js
NamespaceApplication.extension('ExtensionName', function (App) {

    /**
     * @namespace App.ExtensionName
     */
    var extension = function () {
        return template
    };
    
    extension.method = function (name, data) {};
    
    return extension;
}); 
```