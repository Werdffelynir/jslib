# JS NamespaceApplication


## Reference


### Properties
```js
App = new NamespaceApplication({properties})

// Get version
App.version

// Get debug status or set debug mod  
App.debug

// Get debug status or set startup type mod for controllers
App.constructsType

// Other can set with properties
App.path
App.url

```


### Methods
```js
// Create namespace for module-script (like namespace "Action.Name")
App.prototype.namespace (namespace, callback, args)
                       
// Run all modules constructs
App.prototype.constructsStart (args)
                             
// Designate a list of scripts for loading
App.prototype.require (key, path, oncomplete, onerror)
                     
// Start loading the list of scripts by key (identifier)
App.prototype.requireStart (key)
                          
// Apply properties object to instance properties
App.prototype.setProperties ()

// Get uri
App.prototype.uri (uri)

```


### Static methods have aliases in instance
```js
// Add extantion
NamespaceApplication.extension(name, callback)

// Execute callback function if or when DOM is loaded
NamespaceApplication.domLoaded
App.domLoaded (callback)

// Base url request
NamespaceApplication.request
App.request (method, url, callback, callbackError)

// Loads the script element
NamespaceApplication.script
App.script (src, onload, onerror)

// Loads the CSS link element
NamespaceApplication.style
App.style (src, onload, onerror)

// Loads the file (AJAX GET request)
NamespaceApplication.file
App.file(url, onload, onerror) 

// Merge objects
NamespaceApplication.extend
App.extend (obj, src, callback)

// Storage in memory
NamespaceApplication.store
App.store (object, keyWithValue)

// Simple router
NamespaceApplication.route
App.route (uri, callback, hash, query)

// Get route - URI Path 
NamespaceApplication.routePath
App.routePath (hash, query)

// Simple redirect
NamespaceApplication.redirect
App.redirect (to)

// Simple template builder
NamespaceApplication.assign
App.assign (stringData, params)

// Simple inject data to HTMLElement [by selector]
NamespaceApplication.inject
App.inject (selector, data)

// Query DOM Element by selector
NamespaceApplication.query
App.query (selector, parent)

// Query DOM Elements by selector
NamespaceApplication.queryAll
App.queryAll (selector, parent)

// Query DOM Element by selector to up in tree
NamespaceApplication.queryUp
App.queryUp (selector, from, loops)

// Execute callback for each element in list
NamespaceApplication.each
App.each (list, callback, tmp)
        
// Simple adding event listener for element or selector
NamespaceApplication.on
App.prototype.on (eventName, selector, callback, bubble)

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