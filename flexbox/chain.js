
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
        registered.callback.call({}, () => {
          this._currentIndex ++;
          this.next();
        }, registered.id);
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

chain.register('redis', function redis(next) { console.log('redis'); next() });
chain.register('host', function host(next) { console.log('host'); next(); } );
chain.register('port', function port (next) { console.log('port'); next() } );
chain.register('db', function db (next) { console.log('db'); next() } );

chain.next();

