# JS NamespaceApplication
## Reference


## Create instance
```js
App = new NamespaceApplication({})
```


## Properties
```js

// Get script version [read-only]
App.version

// Get debug status or set debug mod  
App.debug

// Other custom properties
App.path
App.url
```


## Methods of instance
```js
// Create namespace for module-script (like namespace "Action.Name")
App.namespace (namespace, callback, args);

// Designate a list of scripts for loading
App.require (key, path, oncomplete, onerror);

// Start loading the list of scripts by key (identifier)
App.requireStart (key);

// Simple router
App.router (uri, callback, hash, query);
```


## Static methods and aliases it in instance
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

// Select and return a one (first) element by selector
NamespaceApplication.query (selector, fromCallback, thisInstance)

// Selects and return an all elements by selector
NamespaceApplication.queryAll (selector, fromCallback, thisInstance)

// Select and return a one element by selector. Search up on a DOM tree
NamespaceApplication.queryUp (selector, from, loops)

// Execute callback for each element in list
NamespaceApplication.each (list, callback, tmp)

// Simple adding event listener for element|s
NamespaceApplication.on (selector, eventName, callback, bubble)

// Add style\s to HTMLElement\s
NamespaceApplication.css (selector, properties)

// Inject data into HTMLElement
NamespaceApplication.inject (selector, data, append)

// Formatting of string, maybe template builder
NamespaceApplication.format;

// Base ajax request
NamespaceApplication.ajax (config, callback, thisInstance)

// Simple timer. Return self-instance
NamespaceApplication.Timer (callback, delay, repeat, thisInstance)
    timer.repeat
    timer.iterator
    timer.start()
    timer.stop()
    timer.pause()
    timer.reset()
    timer.clear()
    
// Storage of local
NamespaceApplication.Storage (name, value)
    storage.length
    storage.set(name, value)
    storage.get(name)
    storage.key(index)
    storage.clear()
    storage.remove(name)
```


## Static methods

```js
// Create & add global extension.
NamespaceApplication.extension (name, callback)
```


## Details

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
App.domLoaded(function (){
    // code...
});
```


### App.typeOf

Syntax: `App.typeOf(value, type)`
```js
App.typeOf('hello world');
// > "string"

App.typeOf({}, 'array');
// > false
```


### App.loadJS()
Syntax: `App.loadJS(src: String, onload: Function, onerror: Function): HTMLElement`

```js
// loading of js script file
App.loadJS('/js/script.js', function(element){}, function(error){});
```


### App.loadCSS()
Syntax: `App.loadCSS(src: String, onload: Function, onerror: Function): HTMLElement`

```js
// loading of css style file
App.loadCSS('/css/style.css', function(element){}, function(error){});
```


### App.router()
Syntax: `App.route():String`

### App.routePath()
Syntax: `App.routePath():String`

```js
App.router('/', function(){}, true);
App.router('/#login', function(){}, true);

var route = App.routePath()
```


### App.format() 
Formatting of string, or maybe template builder

Syntax: `App.assign(stringData:String, params:Object):String`
```js
// example 1
var str = '<h1>{title}</h1><div>{content}</div>';

str = App.format(str, {
    title:"Hello World",
    content:"lorem text"
});

// example 2
var str = '<h1>{0}</h1><div>{1}</div>';

str = App.format(str, [
    "Hello World",
    "lorem text"
]);
```


### App.inject()
Syntax: `App.inject(selector:String, data:String|Object):Void`
```js
App.inject('#content', 'lorem text');
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


### App.on()
Simple add event listener

Syntax: `App.on(selector:String, eventName:String, callback:Function, bubble:Boolean): `
```js
App.on('#button-add', 'change', onChange, false);

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


### App.ajax()
Syntax: `App.ajax(config: Object, callback: Function, thisInstance: Object): XMLHttpRequest`
```js
App.ajax(
    {
        method: 'POST', 
        url: '/server.php', 
        data: {id:123}
    }, 
    onRequest
);

function onRequest (statusCode, data) {}
```


### App.Timer() 

Syntax: `App.Timer(callback, delay, repeat, thisInstance) : NamespaceApplication.Timer`
```js
function timerIteration (iterator, repeat) {
    if (iterator > 5)
        this.stop();
}

var timer = App.Timer(timerIteration, 1000, 10);

timer.start();
```


### App.Storage() 
Storage of local
 
Syntax: `App.Storage([name, value]): *`
```js
var store = Storage();
store.set('data', {data:'hello world'})
store.get('data')
// > {data:'hello world'}

Storage('data', {data:'hello world'});
Storage('data');
// > {data:'hello world'}
```


### Extension 

Syntax: `NamespaceApplication.extension(name, callback)`

__index.html__
```html
<!doctype html>
<head>
    <script src="/js/lib/ns.application.js" data-init="js/app/init.js"></script>
    <script src="/js/lib/ns.extensions/ns.extension.js"></script>
</head>
<body>

</body>
</html>
```

__ns.extension.js__
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