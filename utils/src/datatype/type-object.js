const hasOwnProperty = Object.prototype.hasOwnProperty;
const isPrototypeOf = Object.prototype.isPrototypeOf;

export const defProp = Object.defineProperty;

export const hasOwn = function (obj, key) { return hasOwnProperty.call(obj, key); }

export const isDerivedOf = function (child, parent) { return Object.getPrototypeOf(child) !== parent && isPrototypeOf.call(parent, child); }

export function cloneObject (obj) {
    if (obj === null || typeof (obj) !== 'object') {
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