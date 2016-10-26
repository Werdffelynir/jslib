# namespace Application


```
App = new NamespaceApplication(properties)

App.version = version;
App.domLoaded
App.request
App.script
App.style
App.file
App.extend
App.store
App.route
App.assign
App.inject
App.query;
App.queryAll
App.each
App.prototype.namespace
App.prototype.constructsStart
App.prototype.require
App.prototype.requireStart
App.prototype.setProperties
App.prototype.constructsStart

NamespaceApplication.domLoaded
NamespaceApplication.request
NamespaceApplication.script
NamespaceApplication.style
NamespaceApplication.file
NamespaceApplication.extend
NamespaceApplication.store
NamespaceApplication.route
NamespaceApplication.assign
NamespaceApplication.inject
NamespaceApplication.query;
NamespaceApplication.queryAll
NamespaceApplication.each
```

## config properties

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


### App.require()

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


### App.query(), App.queryAll()

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


## start `init.js`
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

