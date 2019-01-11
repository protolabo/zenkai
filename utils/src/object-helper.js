const hasOwnProperty = Object.prototype.hasOwnProperty;
const isPrototypeOf = Object.prototype.isPrototypeOf;

export const ObjectHelper = {
    hasOwn(obj, key) { return hasOwnProperty.call(obj, key); },
    isDerivedOf(child, parent) { return Object.getPrototypeOf(child) !== parent && isPrototypeOf.call(parent, child); },
    cloneObject: function (obj) {
        if (obj === null || typeof (obj) !== 'object')
            return obj;
        var temp = obj.constructor(); // changed
        for (var key in obj) {
            if (this.hasOwn(obj, key)) {
                obj['isActiveClone'] = null;
                temp[key] = this.cloneObject(obj[key]);
                delete obj['isActiveClone'];
            }
        }
        return temp;
    },
}