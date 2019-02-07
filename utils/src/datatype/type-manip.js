/** @module type/manip */

export function valOrDefault(arg, val) { return typeof arg !== 'undefined' ? arg : val; }

/**
 * Converts a boolean to an integer
 * @param {boolean} val 
 * @returns {int} 1 or 0
 */
export function boolToInt(val) { return val ? 1 : 0; }

/**
 * Converts to boolean
 */
export function toBoolean(val) {
    val = valOrDefault(val, false);

    return val === true || val.toString().toLowerCase() === 'true';
}

/**
 * Returns a value indicating whether the variable is an Integer
 * @returns {boolean}
 */
export function isInt(n) { return n % 1 === 0; }

/**
 * Returns a value indicating whether the variable is a Date
 * @param {*} value 
 */
export function isDate(value) {
    return value instanceof Date || (typeof value === 'object' && Object.prototype.toString.call(value) === '[object Date]');
}

/**
 * Returns a value indicating whether the variable is a String
 * @returns {boolean}
 */
export function isString(str) { return typeof str === 'string' || str instanceof String; }

/**
 * Returns a value indicating whether the value is a Function
 * @returns {boolean}
 */
export function isFunction(value) { return typeof value === 'function'; }