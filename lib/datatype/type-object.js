function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/** @private */
var hasOwnProperty = Object.prototype.hasOwnProperty;
/** @private */

var isPrototypeOf = Object.prototype.isPrototypeOf;
export var defProp = Object.defineProperty;
/**
 * Returns a boolean indicating whether the object has the specified property as its own property (not inherited).
 * @param {*} obj target object
 * @param {string} key name of the property
 * @memberof TYPE
 */

export var hasOwn = function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
};
/**
 * Returns a boolean indicating whether the object (child) inherit from another (parent)
 * @param {*} child 
 * @param {*} parent 
 * @memberof TYPE
 */

export var isDerivedOf = function isDerivedOf(child, parent) {
  return Object.getPrototypeOf(child) !== parent && isPrototypeOf.call(parent, child);
};
/**
 * 
 * @param {*} obj 
 * @memberof TYPE
 */

export function cloneObject(obj) {
  if (obj === null || _typeof(obj) !== 'object') {
    return obj;
  }

  var temp = obj.constructor(); // changed

  for (var key in obj) {
    if (hasOwn(obj, key)) {
      obj['isActiveClone'] = null;
      temp[key] = cloneObject(obj[key]);
      delete obj['isActiveClone'];
    }
  }

  return temp;
}