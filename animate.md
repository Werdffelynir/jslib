# Animate JS

### Use

```js
var an = Animate({
    selector: '#layer1',
    width: 600,
    height: 400,
    fps: 0,
    loop: Animate.LOOP_ANIMATE,
    autoClear: true,
    sorting: true,
    filtering: true
});

an.frame({
    index: 100,
    hide: false,
    name: 'scene',
    runner: function (ctx, frameCount) {
        console.log('frame', frameCount);
        ctx.fillStyle = 'red';
        ctx.fillRect(0,0,200,100);
        an.start('main');
    }
});

an.frame('main', {
    index: 100,
    hide: false,
    name: 'scene',
    runner: function (ctx, frameCount) {
        console.log('main', frameCount);
        ctx.fillStyle = 'black';
        ctx.fillRect(100,100,200,100);
    }
});

an.start();
```