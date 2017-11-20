# MovieClip


### Синтаксис: 
`.MovieClip (options, callback, thisInstance)`

- `options`         instance properties
- `callback`        callback
- `thisInstance`    instance


### Instance properties
```js
x = Number
y = Number

translate = [Number, Number]
// apply to CanvasRenderingContext2D.translate

transform = [Number, Number, Number, Number, Number, Number]
// apply to CanvasRenderingContext2D.transform

rotate = Number
// apply to CanvasRenderingContext2D.rotate, value in radians

rotation = Number
// apply to CanvasRenderingContext2D.rotate, value in degrees

scale = [Number, Number]
// apply to CanvasRenderingContext2D.scale

alpha = Number
// apply to CanvasRenderingContext2D.globalAlpha

composite = globalCompositeOperation
// apply to CanvasRenderingContext2D.globalCompositeOperation

```


### Instance methods, setters for properties
```js
setTranslate (Number, Number)
setTransform (Number, Number, Number, Number, Number, Numbe)
setScale (Number, Number)
setRotate (Number)
setRotation (Number)
setAlpha (Number)
setComposite (globalCompositeOperation) 
```


### Example
```js
var myMcClip = An.MovieClip({
    x: 0,
    y: 0,
    translate: [An.width/2, An.height/2],
    rotation: 0,
    scale: [1, 1],
    alpha: 1
}, function(ctx, i) {
    
    this.rotation += 1;
    // or 
    this.setRotation( value );
    
    // now you can uses methods
    this.setScale(2, 2);
    this.setAlpha(0.5);
    
    An.Graphic().line(this.x,this.y, this.x + 200,this.y)
      .thickness(5)
      .stroke();

});


An.frame(function (ctx, i) {
    /** @type CanvasRenderingContext2D */
    ctx = ctx;
    
    myMcClip(ctx, i);
});
```
