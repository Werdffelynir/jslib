# Sprite


```js
var An = new Animate();

var sprite = An.Sprite({
    x: 0,
    y: 0,
    width: 50,
    height: 50,
    image: HTMLImageElement,
    grid: [3, 2],
    indexes: [0,1,2,3,4,5],
    delay: 1,
    loop: false,
    point: {x: 0, y: 0}
});

sprite();
```