
# Graphic 

### Контанты (Constants)
```
CAPS.BUTT
CAPS.ROUND
CAPS.SQUARE
    
JOINS.BEVEL
JOINS.ROUND
JOINS.MITER
``` 

### Задать свойства (Settings)

Определяет свойства, выполняются методами `stroke()` `fill()` 

```js
color ( color )
// color hex

alpha ( n )
// float 0 to 1

thickness ( n )
// number

cap ( n ) 
// "butt" "round" "square"

join ( n )
// "bevel" "round" "miter"
```

### Операции (Native Operations)

Являются короткоименными ссылками на меотды `CanvasRenderingContext2D`
> Применяется к текущей операции. 
```js
begin ()
close ()
save ()
restore ()
```

### Тени (Shadow)
Глобально применяет тени.
> Применяется к текущей операции. 
```js
shadow ( x, y, blur, color )
clearShadow ()
```

### Фигуры (Graphic Objects)
```js
circle ( x, y, radius )
//

rect ( x, y, width, height )
//

rectRound ( x, y, width, height, radius ) 
//

shape ( points, closePath )
//

line ( x1, y1, x2, y2 )
//

ellipse ( x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise, closePath )
//

```

### Приминения (Draw Graphic Objects)
Рисует фигуру, обводкой, заливкой или тем и другим, применяются заданые свойства включая глобальные.
```js
stroke ()
fill ()
```

# Примеры
```js
var An = new Animate();
var Graphic = An.Graphic();


An.frame(function (ctx, i) {
  
    Graphic.rect(10, 10, 160, 30)
        .color('#c0652d')
        .fill();
    
    Graphic.rectRound(10, 60, 160, 30, 10)
        .color('#21a2b1')
        .fill();
    
    ctx.save();
    ctx.translate(200, 10);
    Graphic.shape([50,0,100,100,0,100])
        .color('#b9cc5c')
        .fill();
    ctx.restore();
    
    Graphic.line(10,10, 310,10)
        .color('#000055')
        .stroke();
    
    Graphic.shadow(0, 0, 5, '#C00000');
    Graphic.line(10,40, 310,40)
        .color('#C00000')
        .thickness(16)
        .stroke();
    Graphic.clearShadow();
    
    Graphic.line(10,70, 310,70)
        .color('#997833')
        .thickness(6)
        .stroke();
    
    Graphic.ellipse(100,150,40,40,0,0,Animate.DEGREE*160)
        .color('#000055')
        .thickness(10)
        .cap('round')
        .stroke();
    
    Graphic.ellipse(100,250,40,40,0,0,Animate.DEGREE*280,true,false)
        .color('#C00000')
        .fill();

});

An.start();
```
