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

camera ( x, y, wight, callback )
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

```js
mousePosition ( event: MouseEvent )
```