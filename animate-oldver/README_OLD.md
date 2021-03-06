# Animate JS

## Config

Simple 
```js
var aminate = new Animate('canvas', 600, 400, 30);
```

More options
```js
var aminate = new Animate({
    
    //parameters
    selector: 'canvas',
    width: 600,
    height: 400,
    fps: 30,
    loop: Animate.LOOP_ANIMATE,
    fullScreen: false,
    autoStart: true,
    autoClear: true,
    sorting: true,
    filtering: true,
    
    // events
    onFrame: null,
    onMousemove: null,
    onMousedown: null,
    onMouseup: null,
    onKeyup: null,
    onKeydown: null,
    onClick: null
});
```



## Events. Properties can be changed
```js
var aminate = new Animate();
aminate.onFrame = function (ctx, i) {};
aminate.onClick = function (event, mousePosition) {};
aminate.onMousemove = function (event, mousePosition) {};
aminate.onMousedown = function (event, mousePosition) {};
aminate.onMouseup = function (event, mousePosition) {};
aminate.onKeyup = function (event) {};
aminate.onKeydown = function (event) {};
```

## Properties read only
```js
var aminate = new Animate();

aminate.width;
aminate.height;
aminate.fps;

// return current Canvas element
aminate.getCanvas ();
aminate.getContext ();
aminate.getIteration ();
aminate.isPlay ();

```

## Base methods

```js
var aminate = new Animate()

// frame - Add frame in to each iteration
aminate.frame (frameName, sceneObject)
aminate.frame (sceneObject)
aminate.frame (function (ctx, i) {})

// object for `aminate.frame`, basically for internal used
aminate.createSceneObject (sceneObject)

// delete frame by frame name
aminate.frameRemove (frameName)

// create moveclip. create function based on `callback` and have prototype a `properties` one for all instances
aminate.moveclip (properties, callback)

// create special object to indicate a point
aminate.point (x, y);

// create special object to indicate a rectangle
aminate.rectangle (x, y, width, height)

// hit point inside rectangle
aminate.hitTest (rectangle, point)

// Move state
aminate.start (frameName)
aminate.play (frameName)
aminate.stop ()

// clear canvas workspace
aminate.clear ()

// resize canvas
aminate.resizeCanvas ()

// click point, return object {{x: number, y: number}}
aminate.mousePosition (event)

// set background for canvas
aminate.backgroundColor (color)
aminate.backgroundImage (img)

// return info
aminate.keyPress()
// return bool if key 'ArrowUp' is pressed
aminate.keyPress('ArrowUp')
// execute callback `onKeyArrowLeft` if key 'ArrowLeft' is pressed
aminate.keyPress('ArrowLeft', onKeyArrowLeft)
// execute callback `onAnyKeyDown` if any key pressed, and `onAnyKeyUp` if any key is up
aminate.keyPress(onAnyKeyDown, onAnyKeyUp)

// return object {{x: number, y: number}} or false
aminate.mousePress() 
// execute callback if mouse clicked down
aminate.mousePress(callback)
```

## Static method, add extension
```js
Animate.Extension (function () {});
```


## SceneObject
SceneObject used inside script. and have own special properties.
Keep it in your mind for uses `aminate.frame` method
```js
{
    index: 100,
    hide: false,
    name: 'scene',
    init: function (ctx, i) {}
}
```



## Moveclip
Movieclip is object with own properties for self use, example:
```js
var mc = aminate.moveclip (
    {
        x: 0,
        y: 0,
        width: 10,
        height: 10,
        radius: 5,
        rotate: 0,
    }, 
    function (ctx, i, word) {
        this.x ++;
    });

aminate.frame (function (ctx, i) {
    mc(ctx, i, 'hello');
});
```

Объект `mcContext` будет проинициализирован в область видимости `this` для порожденной функции `aminate.moveclip`

Изменять его возможно как внутри функции (this.label = 'some text') так и во-вне (mcContext.label = 'some text')

Объект `mcContext` после инициализации будет дополнен свойствами по умолчанию и специальными свойствами

```js
var mcContext = {
    x: 0,
    y: 0,
    label: 'Hello canvas'
}

var mc = aminate.moveclip (mcContext, function (ctx) {
    ctx.font = '18px sans, sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(this.label, 80, 5);
});

aminate.frame (function (ctx, i) {
    
    mc(ctx);
    if (i == 100) mcContext.label = 'Hello JavaScript';
    if (i == 200) mcContext.label = 'Hello HTML';
    
});
```


## Extensions
```js
// instance is Animate.prototype
Animate.Extension(function (instance) {

    if (!(instance instanceof Animate))
        return;
    
    /**
     * @type CanvasRenderingContext2D
     */
    var context = instance.getContext();
        
    instance.Extension = {
        
        add: function() {
          
        },
        
        get: function() {
          
        }
    };
})
```


## Core extension `mousePress()`

```js
animate.frame(function (ctx, i) {
    var point = animate.mousePress();
    // do...
});
```

```js
var onMouseMove = function (point) {
    // do...
};
animate.frame(function (ctx, i) {
    animate.mousePress(onMouseMove);
});
```


## Core extension `keyPress`
```js
// (out loop use) return info about this method and keys-codes list
keyPress();
keyPress.info();

// (in loop use) return bool. true - when press 'ArrowUp'
keyPress('ArrowUp');

// (in loop use) execute function `onUp` when press 'ArrowUp'
keyPress('ArrowUp', onUp);  

// (out loop use) execute function `onKeyDown` every time when press any key
keyPress(onKeyDown);

// (out loop use) execute `onKeyDown` for keyDown and `onKeyUp` for keyUp
keyPress(onKeyDown, onKeyUp);

```

## Core extension `Text`
```js
Text.font = '12px Arial, sans'
Text.textAlign = 'start'
Text.textBaseline = 'top'
Text.direction = 'inherit'
Text.lineWidth = '1'
Text.color = 'black'
Text.write (x, y, label, color, fill)
```

## Core extension `Graphic`
```js
Graphic.shape (points, color, fill, closePath, lineWidth)
Graphic.rect (x, y, width, height, color, fill)
Graphic.rectRound (x, y, width, height, radius, color, fill)
Graphic.circle (x, y, radius, color, fill)
Graphic.line (point1, point2, lineWidth, color)
Graphic.lineVertical (x, y, width, lineWidth, color)
Graphic.lineHorizontal (x, y, height, lineWidth, color)
Graphic.shadow (x, y, blur, color)
Graphic.clearShadow ()
Graphic.ellipse (x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise)
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

### aminate.frame
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

### animate.keyPress()
```js
// in loop
if (animate.keyPress('ArrowUp') || animate.keyPress('w')) {
    moveclip.y -= speed;
}
if (animate.keyPress('ArrowDown') || animate.keyPress('s')) {
    moveclip.y += speed;
}
if (animate.keyPress('ArrowLeft') || animate.keyPress('a')) {
    moveclip.x -= speed;
}
if (animate.keyPress('ArrowRight') || animate.keyPress('d')) {
    moveclip.x += speed;
}
```

```js
// out loop
function onArrowUp(eve){
    // do...
}

// in loop
animate.keyPress('ArrowUp', onArrowUp)
```

```js
// out loop
function onKeyUp(eve){
    // do...
}
function onKeyDown(eve){
    // do...
}
    
// out loop
animate.keyPress(onKeyDown, onKeyUp);
```

__Wrong!__. Don't do like it
```js
// in loop
animate.keyPress('ArrowUp', function (eve){
    // do...
});

// in loop
animate.keyPress(function (eve){}, function (eve){});
```


### animate.mousePress()
```js
// in loop
var clickPoint = animate.mousePress();
// if mouse clicked clickPoint = {x: y: }, else return false
```

```js
// out loop
function onMouseMovie(point){
    // do...
}
// in loop
animate.mousePress(onMouseMovie);
```