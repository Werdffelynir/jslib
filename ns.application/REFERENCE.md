# JS NamespaceApplication


## Reference


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
], onLibraryLoaded, onRequireError);

// Execute if loading is success
function onLibraryLoaded(list){}

// Execute if loading failed
function onRequireError(error){}

// Strart loading
App.requireStart('library')
```


### App.domLoaded()
Syntax: ``
```js
App.domLoaded(foo);

App.domLoaded(function (){
    // code...
});
```


### App.request()
Syntax: ``
```js

```


### App.script()
### App.style()
### App.file()
Syntax: ``
```js

```





### App.store()
Syntax: ``
```js

```


### App.route()
### App.routePath()
Syntax: ``
```js

```


### App.assign()
### App.inject()
Syntax: ``
```js

```





### App.query()
### App.queryAll()
### App.queryUp()
Syntax: ``
```js

```



### App.setProperties()
### App.constructsStart()
Syntax: ``
```js

```



### App.on()
Syntax: ``
```js

```



### App.each()
Syntax: ``
```js

```



### App.extend()
Syntax: ``
```js

```



### App.redirect()
Syntax: ``
```js

```



### App.uri()
Syntax: ``
```js

```


------------------------------------------------------------------------
### App.()
Syntax: ``
```js

```


