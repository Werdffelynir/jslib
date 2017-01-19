# Animate JS

## Comments

```js

getCanvas ()
getContext ()
getIteration ()
isPlay ()

frame (name, sceneObject)
clip (properties, callback)
point (x, y)
rectangle (x, y, width, height)
createSceneObject (sceneObject)

start (frameName)
play (frameName)
stop ()
clear ()

hitTest (rectangle, point)
resizeCanvas ()
mousePosition (event)

// Static method, add extension
Extension (function)
```


## Core extensions
```js
Text.
    font = '12px Arial, sans'
    textAlign = 'start'
    textBaseline = 'top'
    direction = 'inherit'
    lineWidth = '1'
    color = 'black'
    write (x, y, label, color, fill)
    
Graphic.
    shape (points, color, fill, closePath, lineWidth)
    rect (x, y, width, height, color, fill)
    rectRound (x, y, width, height, radius, color, fill)
    circle (x, y, radius, color, fill)
    line (point1, point2, lineWidth, color)
    lineVertical (x, y, width, lineWidth, color)
    lineHorizontal (x, y, height, lineWidth, color)
    shadow (x, y, blur, color)
    clearShadow ()
    ellipse (x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise)
```

## How use it
Simple examples how use `animate.js` script

### Create instance
```js
var animate = new Animate('#canvas', 600, 400, 30);
// eq
var animate = new Animate({
    selector: '#canvas',
    width: '600',
    height: '400',
    fps: 30
});

// ... add frames and ...

// start
animate.start();
```

### Frames
__example 1__
```js
animate.frame('main', {
    hide: false,
    name: 'scene',
    index: 100000,
    init: function (ctx, i) {
        console.log('main', i);
    }
});
```
__example 2__
```js
animate.frame({
    name: 'scene',
    init: function (ctx, i) {
        // code...
    }
});
```
__example 3__
```js
animate.frame(function (ctx, i) {
    // code...
});
```