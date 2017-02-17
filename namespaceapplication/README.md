# JS NamespaceApplication

- NamespaceApplication предназначин для структуризации кода на javascript
- NamespaceApplication придерживается модульной структуры.
- NamespaceApplication не строг сам по себе, но вынуждает следовать определенным
правилам в структурировании приложений, важно следовать правилам NamespaceApplication
описаных в спецификации [SPECIFICATION.md](/Werdffelynir/jslib/blob/master/jsmb_ns/SPECIFICATION.md)


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

Для примера рассотрим основные файлы:

- `ns.application.js` - ядро
- `index.html` - рабочий шаблон
- `init.js` - скрипт инициализации модулей, загрузчиков, конфигурации, различных настроек

все остальные будут динамически подключены или отключены по необходимости


### `index.html`. Template
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    
    <script src="ns.application.js" data-init="init.js"></script>
    
</head>
</body>
</html>
```
__data-init="init.js"__ - Если атрибут объявлен, происходит подгрузка скрипта по указанному пути


### `init.js`. Application start. 
```js
(function(window, NamespaceApplication){

    var App = new NamespaceApplication({
        url: '/',
        name: 'My Application',
        debug: true,
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
    param: 'some'              // Custom params
});
```


### Template for module-controller
```js
if(App.namespace){App.namespace('Controller.Register', function(app){

    /**
     * @type {NamespaceApplication|App}
     */
    var App = app;
    
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
App.namespace('Action.Register', function(app) {

    /**
     * @type {NamespaceApplication|App}
     */
    var App = app;
    
    /**
     * @namespace App.Controller.Register
     */
    var _ = {};
    
    _.run = function(){};
    
    return _;
});
```




### Example of modules or custom structures

```
var App = NamespaceApplication({
    url: '/',
    name: 'My Application',
    debug: true
});

App.require('libs',
    [
        App.url + 'js/library1.js',
        App.url + 'js/library2.js',
        App.url + 'js/library3.js'
    ],
    onLibraryLoaded, onRequireError)
    .constructsStart('libs');

function onRequireError(error){
    console.error('onRequireError', error);
}

function onLibraryLoaded(){
    console.log('Application start!');

    // work starts here ...
}
```
