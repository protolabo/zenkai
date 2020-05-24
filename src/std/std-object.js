import { isObject, isNullOrUndefined } from "./std-parse.js";


/** @private */
const hasOwnProperty = Object.prototype.hasOwnProperty;

/** @private */
const isPrototypeOf = Object.prototype.isPrototypeOf;


/**
 * Returns a boolean indicating whether the object has the specified property as its own property (not inherited).
 * @param {*} obj target object
 * @param {string} key name of the property
 * @memberof STD
 */
export const hasOwn = function (obj, key) {
    return hasOwnProperty.call(obj, key);
};

/**
 * Returns a boolean indicating whether the object (child) inherit from another object (parent)
 * @param {*} child 
 * @param {*} parent 
 * @memberof STD
 */
export const isDerivedOf = function (child, parent) {
    return Object.getPrototypeOf(child) !== parent && isPrototypeOf.call(parent, child);
};

/**
 * Creates a clone of an object
 * @param {*} obj Object
 * @memberof STD
 */
export function cloneObject(obj) {
    if (isNullOrUndefined(obj) || !isObject(obj)) {
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