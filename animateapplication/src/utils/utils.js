
function isObject (val) {
  return typeof val === 'object' &&
    exists(val) &&
    !Array.isArray(val) &&
    !(val instanceof RegExp) &&
    !(val instanceof String) &&
    !(val instanceof Number);
}

function isNumber (val) {
  return (typeof val === 'number' || val instanceof Number) && !isNaN(val)
}

function instanceOf (Class) {
  return function (val) {
    return val instanceof Class;
  };
}

function isBoolean (val) {
  return typeof val === 'boolean';
}

function isEmpty (val) {
  if (isString(val) || Array.isArray(val)) {
    return val.length === 0;
  }
  else if (isObject(val)) {
    for (let name in val) {return false;}
    return true;
  }
  else {
    throw new TypeError('Val must be a string, array or object');
  }
}

function isFunction (v) {
  return typeof v === 'function';
}

function isInteger (val) {
  return typeof val === 'number' && isFinite(val) && Math.floor(val) === val;
}

function isRegExp (val) {
  return Object.prototype.toString.call(val) === '[object RegExp]';
}

function isString (val) {
  return typeof val === 'string' || val instanceof String;
}

function keysIn(object) {
  if (!object) { return []; }

  let keys = [], key;
  for (key in object) {
    keys.push(key);
  }

  return keys;
}

function exists (val) {
  return val !== undefined && val !== null;
}

function find (list, predicate) {
  if (exists(list && list.length) && !isFunction(list)) {
    let index = findIndex(list, predicate);
    return ~index ? list[index] : null;
  }
  else if (isFunction(list)) {
    predicate = list;
    return function (list) {
      if (!exists(list && list.length)) {
        throw new TypeError('list must have length property');
      }
      let index = findIndex(list, predicate);
      return ~index ? list[index] : null;
    };
  }
  else {
    throw new TypeError('first argument must be a list (have length) or function');
  }
}

function findIndex (list, predicate) {
  if (!exists(list && list.length)) {
    throw new TypeError('list must have length property');
  }
  if (!isFunction(predicate)) {
    throw new TypeError('predicate must be a function');
  }

  let index = -1;
  list = Array.prototype.slice.call(list); // cast as array to use some.
  list.some(function (val, i) {
    if (predicate(val, i, list)) {
      index = i;
      return true;
    }
  });

  return index;
}

function values (obj) {
  let i;
  const keys = Object.keys(obj);
  const length = keys.length;
  const vals = new Array(length);
  for (i = 0; i < length; i++) {
    vals[i] = obj[keys[i]];
  }
  return vals;
}

function findObjectsInArray (values, attr, attrValue) {
  let i, tmp = [], list = values || [];
  for (i = 0; i < list.length; i++)
    if (list[i] && list[i][attr] !== undefined && list[i][attr] === attrValue)
      tmp.push(list[i]);
  return tmp;
}

function findObjectInArray (values, attr, attrValue) {
  const tmp = findObjectsInArray(values, attr, attrValue);
  return tmp.length ? tmp[0] : false;
}

