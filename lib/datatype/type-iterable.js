/**
 * Returns the index or value of the first element in the object
 * @param {Object|Array} obj 
 * @param {any} value 
 * @memberof TYPE
 */
export function find(obj, value) {
  if (Array.isArray(obj)) {
    var index = obj.indexOf(value);
    if (index !== -1) return index;
  } else {
    var _arr = Object.keys(obj);

    for (var _i = 0; _i < _arr.length; _i++) {
      var e = _arr[_i];

      if (obj[e] === value || obj[e].val === value) {
        return e;
      }
    }
  }

  return undefined;
}