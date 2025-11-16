/**
 * Returns an object value or default value if undefined
 * @param arg - object
 * @param value - default value
 * @param isNullable - indicates whether the value can be assigned the value NULL
 */
export function valOrDefault<T>(arg: T | null | undefined, value: T, isNullable: boolean = false): T {
    if (isNullable) {
        return isUndefined(arg) ? value : arg as T;
    }

    return isNullOrUndefined(arg) ? value : arg as T;
}

/**
 * Returns a value indicating whether the value is empty
 * @param obj - array or string
 * @returns boolean indicating if empty
 */
export function isEmpty(obj: any[] | string): boolean {
    return isIterable(obj) && obj.length === 0;
}

/**
 * Returns a value indicating whether the variable is a Date
 * @param value - value to check
 * @returns boolean indicating if value is a Date
 */
export function isDate(value: any): value is Date {
    return value instanceof Date || (typeof value === 'object' && Object.prototype.toString.call(value) === '[object Date]');
}

/**
 * Returns a value indicating whether the variable is a String
 * @param value - value to check
 * @returns boolean indicating if value is a string
 */
export function isString(value: any): value is string {
    return typeof value === 'string' || value instanceof String;
}

/**
 * Returns a value indicating whether the value is a Function
 * @param value - value to check
 * @returns boolean indicating if value is a function
 */
export function isFunction(value: any): value is Function {
    return typeof value === 'function';
}

/**
 * Returns a value indicating whether the value is an Object
 * @param value - value to check
 * @returns boolean indicating if value is an object
 */
export function isObject(value: any): value is object {
    return !isNullOrUndefined(value) && typeof value === 'object';
}

/**
 * Returns a value indicating whether the object is iterable
 * @param obj - object to check
 * @returns boolean indicating if object is iterable
 */
export function isIterable(obj: any): obj is Iterable<any> {
    return !isNullOrUndefined(obj) && typeof obj[Symbol.iterator] === 'function';
}

/**
 * Returns a value indicating whether the object is a non-string iterable
 * @param obj - object to check
 * @returns boolean indicating if object is a collection
 */
export function isCollection(obj: any): obj is Iterable<any> {
    return isIterable(obj) && !isString(obj);
}

/**
 * Returns a value indicating whether the value is null
 * @param value - value to check
 * @returns boolean indicating if value is null
 */
export function isNull(value: any): value is null {
    return value === null;
}

/**
 * Returns a value indicating whether a string is null or made of whitespace.
 * @param value - string to check
 * @returns boolean indicating if string is null or whitespace
 */
export function isNullOrWhitespace(value: any): boolean {
    return (!value || isString(value) && (value.length === 0 || /^\s*$/.test(value)));
}

/**
 * Returns a value indicating whether the value is undefined
 * @param value - value to check
 * @returns boolean indicating if value is undefined
 */
export function isUndefined(value: any): value is undefined {
    return typeof value === 'undefined';
}

/**
 * Returns a value indicating whether the value is null or undefined
 * @param value - value to check
 * @returns boolean indicating if value is null or undefined
 */
export function isNullOrUndefined(value: any): value is null | undefined {
    return isNull(value) || isUndefined(value);
}
