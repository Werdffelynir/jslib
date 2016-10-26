# namespace Application


```js
App = new NamespaceApplication(properties)

// Get version
App.version

// Get debug status or set debug mod  
App.debug

// Base application path
App.path

// Get debug status or set startup type mod for controllers
App.constructsType

// reate namespace for module-script (namespace "Action.Name")
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



// - - - Static methost and aliasses in prototype

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
NamespaceApplication.
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


### Include scripts to template `index.html`
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script src="ns.application.js"></script>
    <script src="init.js"></script>
</head>
</body>
</html>
```


### Application start. `init.js`
```js
(function(window, NamespaceApplication){

window.App = new NamespaceApplication({
                                          url: '/',
                                          name: true,
                                          debug: true
                                      });

// Loadings style
App.loadCSSLink(App.url + 'css/mobile.css', null, onRequireError);

// Loadings script
App.loadScript(App.url + 'js/script.js', null, onRequireError);

// assign scripts for loading
App.require('libs',
    [
        App.url + 'js/library/lib1.js',
        App.url + 'js/library/lib2.js',
        App.url + 'js/library/lib3.js'
    ],
    onLibraryLoaded, onRequireError);

App.require('dependence',
    [
        // Modules
        'js/app/module/api.js',

        // Actions
        'js/app/action/sidebar.js',

        // Controllers
        'js/app/controller/login.js'

    ],
    onDependenceLoaded, onRequireError);

// Start loading resources of scripts by key 
App.requireStart('libs');

// Loaging error handler
function onRequireError(error){
    console.error('onRequireError', error);
}

// Loaging complete handler
function onLibraryLoaded(list){

    // Start loading resources of scripts by key 
    App.requireStart('dependence');
}

// Loaging complete handler
function onDependenceLoaded(list){
    console.log('Application start!');

    // work starts here ...

}

})(window, NamespaceApplication);
```




### config properties

```js
var App = new NamespaceApplication({
    url: '/',                  // Base application URL path
    name: 'My Application',    // Application name
    debug: true,               // Debug mod
    constructsType: 'runtime', // Constructors execute type
                               //   false - off constructor
                               //   'runtime' - perform during the assignment of namespace
                               //   'gather' - save in the stack, for call and execute all 
                               //   constructor methods, use `App.constructsStart()`
    param: 'some'              // Custom params
});
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
    o.two = function(){};

    return o;
})}


// example 2
App.namespace('Controller.Register', function(App, o) {

    o.one = function(){};
    o.two = function(){};
    
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


### `App.require()`

Syntax: `App.require(key:String, path:Array, oncomplete:Function, onerror:Function):App`

```js
App.require('library',[
    '/js/library/lib1.js',
    '/js/library/lib2.js',
    '/js/library/lib3.js'
], onLibraryLoaded, onRequireError);

function onLibraryLoaded(list){}

function onRequireError(error){}
```


### App.script(), App.style()

Syntax: `App.loadScript(src:String, onload:Function, onerror:Function):HTMLElement`

```js
// loading of js script file
App.loadScript('/js/script.js', function(element){}, function(error){});

// loading of css style file
App.loadCSSLink('/css/style.css', function(element){}, function(error){});
```


### App.file(), App.render()

Syntax: `App.loadFile(url:String, onload:Function, onerror:Function):void`

```js
App.loadFile('/templates/popup.html', renderTemplate, loadFileError);

function renderTemplate(data) {
    App.render('#content', data);
}
function loadFileError(error) {
    console.error('File loading error!', error);
    App.render(nodeContent, 'File loading error!');
}
```


### App.assign() 

Syntax: `App.assign(stringData:String, params:Object):String`

```js
var tpl = '<h1>{{title}}</h1><div>{{content}}</div>';

var pageContent = App.assign(tpl, {
    title:"hello world",
    content:"hello world"
})
```


### App.query(), App.queryAll(), App.queryUp()

Syntax: `App.query(selector:String, callback:Function):HTMLElement`
Syntax: `App.queryAll(selector:String, callback:Function):Array`

```js
// example 1
var nodeContent = App.query('#content');
var menuLinks = App.queryAll('#menu li>a');


// example 2
App.query('#content', function(nodeContent){
    // do ...
});

App.queryAll('#menu li>a', function(menuLinks){
    // do ...
});

// example 3
var activeElement = App.queryUp('.active', '#menu', 10);
```


### App.each()

Syntax: `App.each(list:Array|Object, callback:Function, tmp:Object):Array|Object`

```js
var tmpSum = 'conf', 
    arr = [1,2,3,4,5];
    
App.each(arr, function(item, index, sum){
    sum += '-' + index + '-' + (item * 100);
    console.log(item, index, sum);
}, tmpSum);


var obj = {id:123,name:'Class',root:'/'};

App.each(obj, function(item, key){
    console.log(item, key);
});
```


### App.store()

Syntax: `NamespaceApplication.store(object:*, keyWithValue:*): *`

Storage in memory
if `object` is a Object - set new objects
if `object` is a String - return object by name
if `object` is a not set - return all objects
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


### App.request()
Syntax: `NamespaceApplication.request(method:String, url:String, callback:Function, callbackError:Function):XMLHttpRequest`
```js
App.request('POST', '/to', onRequest, onRequestError)

function onRequest (event) {

}
function onRequestError (event) {

}
```


### App.route() App.routePath()
Syntax: ``
```js
App.route('/', App.Controller.Page.construct, true);
App.route('/#login', App.Controller.Login.construct, true);

var route = App.routePath()
```


### App.()
Syntax: ``
```js

```


### App.()
Syntax: ``
```js

```


### App.()
Syntax: ``
```js

```



=======================================================


## Constructor
```
NamespaceApplication()
```

```
domLoaded
request
script
style
file
extend
store
route
routePath
redirect
assign
inject
query
queryAll
queryUp
each
namespace
constructsStart
require
requireStart
setProperties
uri
```


## methods

```js
App.setProperties(config:Object):App
App.namespace(namespace:String, callback:Function):Object
App.constructsStart(args:*):App
App.require(key:String, path:Array, oncomplete:Function, onerror:Function):App
App.requireStart(key:String):App
App.script(src:String, onload:Function, onerror:Function):HTMLElement
App.style(src:String, onload:Function, onerror:Function):HTMLElement
App.file(url:String, onload:Function, onerror:Function):void
App.request(method:String, url:String, callback:Function, callbackError:Function):XMLHttpRequest
App.assign(stringData:String, params:Object):String
App.route(urlPath:String, callback:Function):App
App.query(selector:String, callback:Function):HTMLElement
App.queryAll(selector:String, callback:Function):Array
App.each(list:Array|Object, callback:Function, tmp:Object):Array|Object
App.inject(selector:String|Object, data:String|Object):HTMLElement
App.extend (obj:Object, src:Object, callback:Function) )
```


## static methods

```js
NamespaceApplication.request(method:String, url:String, callback:Function, callbackError:Function):XMLHttpRequest
NamespaceApplication.assign(stringData:String, params:Object):String
NamespaceApplication.script(src:String, onload:Function, onerror:Function):HTMLElement
NamespaceApplication.style(src:String, onload:Function, onerror:Function):HTMLElement
NamespaceApplication.file(url:String, onload:Function, onerror:Function):void
NamespaceApplication.extend(obj:Object, src:Object, callback:Function):void
```

