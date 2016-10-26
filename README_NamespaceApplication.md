# ns.application.js

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

