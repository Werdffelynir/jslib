# Base


### getters
```js
getWidth ()
getHeight ()
getCanvas ()
getContext ()
getFrameName ()
getIteration ()
```


### Drawing Paying
```js
frame ( frameName, sceneObject )
frame ( sceneObject )
frame ( function (ctx, i) {} )
frameRemove ( frameName )

isPlay ()
start ( frameName )
play ( frameName )
stop ()
clear ()
clearIteration ()

camera ( x, y, width, callback )
cameraRestore ()

resizeCanvas ( width, height, position )
backgroundColor ( color )
backgroundImage ( img, opts )
```


```js
hitTest ( rectangle, point )
hitTestPoint ( x, y )
hitTestPoint ( point )
```


### Events
```js
onFrame ( callback )
onClick ( callback )
onMousemove ( callback )
onMousedown ( callback )
onMouseup ( callback )
onKeydown ( callback )
onKeyup ( callback )
```


```js
mousePosition ( event: MouseEvent )
```
