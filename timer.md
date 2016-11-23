# Script Timer (Timer.js) simulates class ActionScript 3.0 Timer


### 
```js
// Constructor
var tm = new Timer(ms, delay)

// instance proprties
tm.ms
tm.delay
tm.onstart
tm.onprogress
tm.oncomplete

// instance methods
tm.addEventListener()
tm.start()
tm.abort()
tm.reset()

// Static constants
Timer.START // 'start'
Timer.PROGRESS // 'progress'
Timer.COMPLETE // 'complete'

// Static methods
Timer.timeout()
Timer.interval()
Timer.timeoutStop()
Timer.intervalStop()
```


### Use
```js
var tm = new Timer(1000, 5);

tm.addEventListener(Timer.START, function (n) {
    console.log('START', n);
});

tm.addEventListener(Timer.PROGRESS, function (n) {
    console.log('PROGRESS', n);
});

tm.addEventListener(Timer.COMPLETE, function (n) {
    console.log('COMPLETE', n);
});

tm.start();
```


### Timer.interval
```js
var timeData = {name: 'timeData', i: 0};

var timerId = Timer.interval(function () {
    console.log(this === timeData, this.name, this.i);
    this.i ++;
    if (this.i == 5)
        Timer.intervalStop(timerId);
        
}, 1000, timeData);
```

### Timer.timeout
```js
var timeData = {name: 'timeData', i: 0};
var timer = function () {
    console.log(this === timeData, this.name, this.i);
    this.i ++;

    Timer.timeout(timer, 1000, timeData);
};
timer.call(timeData);
```