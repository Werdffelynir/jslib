# Animate.Clip

Синтаксис: `Animate.Clip (options, callback, thisInstance)`

- `options`         instance properties
- `callback`        callback
- `thisInstance`    instance

```js
var myClip = Animate.Clip({
  x: 100,
  y: 100
}, function(ctx, i) {
  An.Graphic().line(this.x,this.y, this.x + 200,this.y)
        .thickness(5)
        .stroke();
});

An.frame(function (ctx, i) {
    /** @type CanvasRenderingContext2D */
    ctx = ctx;
    
    myClip(ctx, i);
});
```
