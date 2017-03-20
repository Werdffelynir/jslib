

## SuperObject Clip()

createClip - является базовой консрукцией, оберткой для отдельтных частей программы.
По сравнении с супер-объектами MovieClip или Sprite не возвращает собственные контекст.

```js
var heroClip = an.createClip({
    x: 10
}, function (ctx, i) {
    /** @type CanvasRenderingContext2D */
    ctx = ctx;
    
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, 10, 100, 20);
    
    // вернем контекст для управления
    return this;
});

an.frame('game', function(ctx, i){
    var hero_clip = Game.heroClip(ctx, i);
    hero_clip.x += 5;
});
```



## SuperObject MovieClip()



```js
var heroClip = an.createMovieClip({
    x: 10
}, function (ctx, i) {
    /** @type CanvasRenderingContext2D */
    ctx = ctx;
    
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, 10, 100, 20);
});

an.frame('game', function(ctx, i){
    var hero_clip = Game.heroClip(ctx, i);
    hero_clip.x += 5;
});
```