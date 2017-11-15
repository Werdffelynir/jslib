

## SuperObject Clip()

`createClip` - является базовой консрукцией, "контейнером" для отдельтных частей.
По сравнении с супер-объектами `MovieClip` или `Sprite` не возвращает собственные "контекст", но его можно передать намерено `this`.

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