# EventManager JS

Помогает в создании собственных событий, с некоторыми дополнительными плюшками.

## Base uses

```js
// Create two events
EventManager.addEvent('main');
EventManager.addEvent('after_main');

// Add listeners
function showInside (eve) {
    console.log(eve.type, eve, this)
}
EventManager.addEventListener('main', showInside);
EventManager.addEventListener('after_main', showInside, false);
EventManager.addEventListener('after_main', showInside, true);

// Call event
EventManager.dispatchEvent('main');
EventManager.dispatchEvent('after_main');

// Delete listener
EventManager.removeEventListener('after_main', showInside, false);

// Coll deleted listeners
EventManager.dispatchEvent('after_main');
```

<br>

## Data provider
```js
var commonData = {
    name: 'Common Data',
    count: 0
};

EventManager.addEvent('main', commonData);

function showInside (eve) {
    eve.count ++;
    console.log(eve.type, eve.name, eve.count)
}

EventManager.addEventListener('main', showInside);

EventManager.dispatchEvent('main');
EventManager.dispatchEvent('main');
EventManager.dispatchEvent('main');
```

<br>

## Remove listener with closure callback
```js
// Create event
EventManager.addEvent('main');

// Add listener, and get listenerData
var listenerData = EventManager.addEventListener('main', function (eve) {
    console.log('main', eve);
});

//console.log(listenerData);

// Call event
EventManager.dispatchEvent('main');

// Remove listener
EventManager.removeEventListener(listenerData.type, listenerData.listener, listenerData.useCapture);

// Call event again
EventManager.dispatchEvent('main');
```