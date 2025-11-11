import { isObject, isNullOrUndefined } from "./std-parse.js";

/** @private */
const hasOwnProperty = Object.prototype.hasOwnProperty;

/** @private */
const isPrototypeOf = Object.prototype.isPrototypeOf;

/**
 * Returns a boolean indicating whether the object has the specified property as its own property (not inherited).
 * @param obj - target object
 * @param key - name of the property
 * @returns boolean indicating if object has own property
 * @memberof STD
 */
export function hasOwn(obj: any, key: string): boolean {
    return hasOwnProperty.call(obj, key);
}

/**
 * Returns a boolean indicating whether the object (child) inherits from another object (parent)
 * @param child - child object
 * @param parent - parent object
 * @returns boolean indicating if child inherits from parent
 * @memberof STD
 */
export function isDerivedOf(child: any, parent: any): boolean {
    return Object.getPrototypeOf(child) !== parent && isPrototypeOf.call(parent, child);
}

/**
 * Creates a deep clone of an object
 * @param obj - Object to clone
 * @param visited - WeakMap to track visited objects (prevents circular references)
 * @returns Cloned object
 * @memberof STD
 */
export function cloneObject<T>(obj: T, visited: WeakMap<any, any> = new WeakMap()): T {
    if (isNullOrUndefined(obj) || !isObject(obj)) {
        return obj;
    }

    // Handle circular references
    if (visited.has(obj as any)) {
        return visited.get(obj as any);
    }

    // Handle Date
    if (obj instanceof Date) {
        return new Date(obj.getTime()) as any;
    }

    // Handle Array
    if (Array.isArray(obj)) {
        const arrCopy: any[] = [];
        visited.set(obj as any, arrCopy);
        
        for (let i = 0; i < obj.length; i++) {
            arrCopy[i] = cloneObject(obj[i], visited);
        }
        
        return arrCopy as any;
    }

    // Handle Object
    const objCopy = new (obj as any).constructor();
    visited.set(obj as any, objCopy);

    for (const key in obj) {
        if (hasOwn(obj, key)) {
            objCopy[key] = cloneObject((obj as any)[key], visited);
        }
    }

    return objCopy;
}
