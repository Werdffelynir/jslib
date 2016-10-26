# JS NamespaceApplication

- NamespaceApplication предназначин для структуризации кода на javascript
- NamespaceApplication придерживается модульной структуры.
- NamespaceApplication не строг сам по себе, но вынуждает следовать определенным
правилам в структурировании приложений, важно следовать правилам NamespaceApplication
описаных в спецификации NamespaceApplication


## How use it

Структура приложения. 

```
app
    action
        navigate.js
        sidebar.js

    controller
        page.js
        login.js

    extension
        api.js
        tool.js

    library
        ns.application.js

    init.js
    
index.html
```

Основные файлы 

- `ns.application.js` - ядро
- `index.html` - рабочий шаблон
- `init.js` - скрипт инициализации модулей, загрузчиков, конфигурации, различных настроек

все остальные будут динамически подключены или отключены


### `index.html`. Template
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


### `init.js`. Application start. 
```js
(function(window, NamespaceApplication){

    window.App = new NamespaceApplication({
        url: '/',
        name: true,
        debug: true
    });

    // Loadings style
    App.style(App.url + 'css/mobile.css', null, onRequireError);

    // Loadings script
    App.script(App.url + 'js/script.js', null, onRequireError);

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
            // Extension
            'js/app/extension/api.js',
            'js/app/extension/tool.js',

            // Actions
            'js/app/action/api.js',
            'js/app/action/sidebar.js',
            'js/app/action/navigate.js',

            // Controllers
            'js/app/controller/page.js',
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


### Config properties

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


### Template for module-controller
```js
if(App.namespace){App.namespace('Controller.Register', function(App){
    /**
     * @namespace App.Controller.Register
     */
    var _ = {};

    _.construct = function(){
        App.domLoaded(_.domLoaded);
    };
    
    _.domLoaded = function(){};

    return _;
})}
```


### Template for module
```js
App.namespace('Action.Register', function(App, _) {
    /**
     * @namespace App.Controller.Register
     */
    var _ = {};
    
    _.run = function(){};
    
    return _;
});
```





------------------------------------------------------------------------
------------------------------------------------------------------------
------------------------------------------------------------------------





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

