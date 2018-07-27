
class Chain {

  constructor (onSuccess, onFailed) {
    this._onsuccess = onSuccess;
    this._onfailed = onFailed;
    this._currentIndex = 0;
    this._callbacks = [];
  }

  register (id, callback) {
    this._callbacks.push({id, callback})
  }

  next () {
    const registered = this._callbacks[this._currentIndex];
    if (registered) {
      if (registered.callback instanceof Function) {
        registered.callback.call({},
          () => { this._currentIndex ++; this.next(); },
          this._onfailed,
          registered.id);
      } else {
        this._onfailed();
      }
    } else {
      this._onsuccess();
    }
  }
}

const onSuccessChain = function () {console.log('Success')};
const onFailedChain = function () {console.log('Failed')};

const chain = new Chain(onSuccessChain, onFailedChain);

/*chain.register('redis', function redis(next, failed, id) { addToScene(next, id) });
chain.register('host', function host(next, failed, id) { addToScene(next, id) } );
chain.register('port', function port (next, failed, id) { addToScene(next, id) } );
chain.register('db', function db (next, failed, id) { addToScene(next, id) } );*/

let i = 200;
while (i > 0) {
  chain.register('' + (1001 - i), addToScene);
  i --;
}

chain.next();

function addToScene (next, failed, id) {
  setTimeout(() => {
    const box = document.createElement('div');
    box.className = 'box';
    box.innerHTML = `<h3>${id.toUpperCase()}</h3>`;
    document.querySelector('.container').appendChild(box);
    next();
  }, 50)
}


