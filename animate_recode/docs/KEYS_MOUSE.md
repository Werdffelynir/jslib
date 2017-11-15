# Keys

```js
keyPress ()                               // (out loop use) return info about this method
keyPress ( 'ArrowUp' )                    // (in loop use) return bool. true - when press 'ArrowUp'
keyPress ( 'ArrowUp', function(){} )      // (in loop use) execute function when press 'ArrowUp'
keyPress ( function(){} )                 // (out loop use) execute function every time when press any key
keyPress ( function(){}, function(){} )   // (out loop use) execute function1 for keyDown and function1 for keyUp

keyPress.info ()
```

# Mouse

```js
mousePress ()             // (in loop use) return position point object if mouse click, or false
mousePress ( callback )   // (in loop use) execute function if mouse click with argument point object

mouseMove ()               // (in loop use) return position point object when mouse move
mouseMove ( callback )     // (in loop use) execute function when mouse move with argument point object
```