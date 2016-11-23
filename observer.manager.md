# ObserverManager JS

## Base uses
```js
var observer = new ObserverManager(true);

// Create and remove events
observer.add(eventName, callback, thisInst)
observer.remove(eventName)

// Dispatch event
observer.dispatch(eventName)

// Create and remove listeners for events
observer.addListener(eventListenerName, callback, args)
observer.removeListener(eventListenerName)

// Get all listeners by eventName or eventName-listenerName
observer.getListeners(eventListenerName)

// Disable listeners
observer.activeListener(eventListenerName)
```

If to constructor ObserverManager set true - all events have global instance

> 
> eventListenerName - can by eventName __`myEvent`__ 
> `.addListener('myEvent' ...`
> 
> or eventName-listenerName __`myEvent:myListener`__ separator __`:`__
> `.addListener('myEvent:myListener' ...`
> `.removeListener('myEvent:myListener')`
> 

## Global events example
```js
var common = {i:0,name:'common-data'};
var Obm = new ObserverManager(true);

Obm.add('start', function(){ console.log(this, 'event::' + this.eventName) }, common);
Obm.add('clone', function(){ console.log(this, 'event::' + this.eventName) }, common);
Obm.add('after', function(){ console.log(this, 'event::' + this.eventName) }, common);

var afterDataArgs = [1,2,3];
Obm.addListener('start', function(a,b,c){ console.log(this, 'listener::' + this.eventName, a, b, c) }, afterDataArgs);
Obm.addListener('clone:one', function(){ console.log(this, 'listener::' + this.eventName) });
Obm.addListener('clone:two', function(){ console.log(this, 'listener::' + this.eventName) });
var listenerName = Obm.addListener('after', function(){ console.log(this, 'listener::' + this.eventName) });

Obm.dispatch('start');

setTimeout(function(){
    Obm.dispatch('clone');
},1000);

setTimeout(function(){
    Obm.dispatch('after');
},2000);



var ObmOther = new ObserverManager(true);

ObmOther.add('other', function(){ console.log(this, 'event::' + this.eventName) });
ObmOther.addListener('other', function(){ console.log(this, 'listener::' + this.eventName) });

setTimeout(function(){
    Obm.dispatch('other');
},5000);

setTimeout(function(){
    Obm.activeListener('clone:one', false);
    ObserverManager(true).dispatch('clone');
},7000);
```