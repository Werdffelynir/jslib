
////////////////////////////////////////////////////////////////////////
// Storage Methods

var Ut = window.Ut || {};   // <<< DELETE THIS STRING

Ut.Storage = function(name, value){
    if(!name){
        return false;
    }else if(value === undefined){
        return Ut.Storage.get(name);
    }else if(!value){
        return Ut.Storage.remove(name);
    }else{
        return Ut.Storage.set(name, value);
    }
};


Ut.Storage.set = function (name, value) {
    try{value = JSON.stringify(value)}catch(error){}
    return window.localStorage.setItem(name, value);
};


Ut.Storage.get = function (name) {
    var value = window.localStorage.getItem(name);
    if(value)
        try{value = JSON.parse(value)}catch(error){}
    return value;
};


Ut.Storage.remove = function (name) {
    return window.localStorage.removeItem(name);
};


Ut.Storage.key = function (name) {
    return window.localStorage.key(key);
};


// when invoked, will empty all keys out of the storage.
Ut.Storage.clear = function () {
    return window.localStorage.clear();
};


// returns an integer representing the number of data items stored in the Storage object.
Ut.Storage.length = function () {
    return window.localStorage.length;
};

