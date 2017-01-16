# 

## Comments


```js

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