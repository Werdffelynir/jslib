# TextField

### Константы
```js
ALIGNS.LEFT
ALIGNS.RIGHT
ALIGNS.CENTER
ALIGNS.START
ALIGNS.END

BASELINES.TOP
BASELINES.HANDING
BASELINES.MIDDLE
BASELINES.ALPHABETIC
BASELINES.IDEOGRAPHIC
BASELINES.BOTTOM
```


### Задать свойства

Определяет свойства, выполняются методами `stroke()` `fill()` 
```js
font ( value )
// "12px Arial, sans-serif" "bold italic 110% serif" "normal small-caps 12px/14px fantasy"

text ( value )
color ( value )
align ( value )
baseline ( value )
alpha ( value )
thickness ( value )
```

### Приминения
```js
fill ()
stroke ()
````


### Пример

```js

var An = new Animate();
var TextField = An.TextField();

TextField
  .text('Simple TextField', 10, 10)
  .color('#dd0')
  .align(TextField.ALIGN.CENTER)
  .font('bold 20px sans, sans-serif')
  .fill();
```
