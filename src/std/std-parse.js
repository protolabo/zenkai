/**
 * Returns an object value or default value if undefined
 * @param {*} arg object
 * @param {*} value default value
 * @param {boolean} [isNullable] indicates whether the value can be assigned the value *NULL*
 * @memberof TYPE
 */
export function valOrDefault(arg, value, isNullable) {
    if (isNullable === true) {
        return isUndefined(arg) ? value : arg;
    }

    return isNullOrUndefined(arg) ? value : arg;
}

/**
 * Returns a value indicating whether the value is empty
 * @param {Object[]|string} arr array
 * @returns {boolean}
 * @memberof TYPE
 */
export function isEmpty(obj) {
    return (Array.isArray(obj) || isString(obj)) && obj.length === 0;
}

/**
 * Returns a value indicating whether the variable is a Date
 * @param {*} value 
 * @returns {boolean}
 * @memberof TYPE
 */
export function isDate(value) {
    return value instanceof Date || (typeof value === 'object' && Object.prototype.toString.call(value) === '[object Date]');
}

/**
 * Returns a value indicating whether the variable is a String
 * @param {*} value
 * @returns {boolean}
 * @memberof TYPE
 */
export function isString(value) {
    return typeof value === 'string' || value instanceof String;
}

/**
 * Returns a value indicating whether the value is a Function
 * @param {string} value
 * @returns {boolean}
 * @memberof TYPE
 */
export function isFunction(value) {
    return typeof value === 'function';
}

/**
 * Returns a value indicating whether the value is an Object
 * @param {string} value
 * @returns {boolean}
 * @memberof TYPE
 */
export function isObject(value) {
    return !isNullOrUndefined(value) && typeof value === 'object';
}

/**
 * Returns a value indicating whether the object is iterable
 * @param {*} obj
 * @returns {boolean}
 * @memberof TYPE
 */
export function isIterable(obj) {
    return !isNullOrUndefined(obj) && typeof obj[Symbol.iterator] === 'function';
}

/**
 * Returns a value indicating whether the value is null
 * @param {string} value
 * @returns {boolean}
 * @memberof TYPE
 */
export function isNull(value) { 
    return value === null; 
}

/**
 * Returns a value indicating whether a string is null or made of whitespace.
 * @param {string} str string
 * @returns {boolean}
 * @memberof TYPE
 */
export function isNullOrWhitespace(str) {
    return (!str || isString(str) && (str.length === 0 || /^\s*$/.test(str)));
}

/**
 * Returns a value indicating whether the value is undefined
 * @param {*} value
 * @returns {boolean}
 * @memberof TYPE
 */
export function isUndefined(value) { 
    return typeof value === 'undefined'; 
}

/**
 * Returns a value indicating whether the value is null or undefined
 * @returns {boolean}
 * @memberof TYPE
 */
export function isNullOrUndefined(value) { 
    return isNull(value) || isUndefined(value); 
}