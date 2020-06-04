import { isFunction } from "./std-parse.js";


/**
 * Verifies that the condition is satisfied for a specified number (range) of value
 * @param {*[]} values Set of values
 * @param {Function} pred Condition
 * @param {number} [min=1] Minimum number of values that must satisfy the condition
 * @param {number} [max] Maximum number of values that must satisfy the condition
 * @returns {boolean} A value indicating whether the condition is satisfied for the specified range
 * @memberof STD
 */
export const assert = function (values, pred, min, max) {
    if (!(Array.isArray(values) && isFunction(pred))) {
        throw new TypeError("Bad argument");
    }

    var hitCount = getHitCount(values, pred);

    if (all([min, max], Number.isInteger)) {
        if (max < min) {
            throw new Error("Bad argument: max must be greater than min");
        }

        return hitCount >= min && hitCount <= max;
    }

    if (Number.isInteger(min)) {
        return hitCount >= min;
    }

    if (Number.isInteger(max)) {
        console.warn(hitCount);
        return hitCount <= max;
    }

    return false;
};

/**
 * Verifies that at least one value satisfies the condition
 * @param {*[]} values Set of values
 * @param {Function} pred Condition
 * @returns {boolean} A value indicating whether at least one value satisfies the condition
 * @memberof STD
 */
export const some = function (values, pred) {
    if (!(Array.isArray(values) && isFunction(pred))) {
        throw new TypeError("Bad argument");
    }

    for (let i = 0; i < values.length; i++) {
        let value = values[i];

        if (pred(...(Array.isArray(value) ? value : [value]))) {
            return true;
        }
    }

    return false;
};

/**
 * Verifies that all the values satisfy the condition
 * @param {*[]} values Set of values
 * @param {Function} pred Condition
 * @returns {boolean} A value indicating whether all the values satisfy the condition
 * @memberof STD
 */
export const all = function (values, pred) {
    if (!(Array.isArray(values) && isFunction(pred))) {
        throw new TypeError("Bad argument");
    }

    for (let i = 0; i < values.length; i++) {
        let value = values[i];

        if (!pred(...(Array.isArray(value) ? value : [value]))) {
            return false;
        }
    }

    return true;
};

/**
 * Verifies that exactly one value satisfies the condition
 * @param {*[]} values Set of values
 * @param {Function} pred Condition
 * @returns {boolean} A value indicating whether exactly one value satisfies the condition
 * @memberof STD
 */
export const one = function (values, pred) {
    if (!(Array.isArray(values) && isFunction(pred))) {
        throw new TypeError("Bad argument");
    }

    return getHitCount(values, pred) === 1;
};

/**
 * Verifies that no value satisfies the condition
 * @param {*[]} values Set of values
 * @param {Function} pred Condition
 * @returns {boolean} A value indicating whether no value satisfies the condition
 * @memberof STD
 */
export const no = function (values, pred) {
    if (!(Array.isArray(values) && isFunction(pred))) {
        throw new TypeError("Bad argument");
    }
    return getHitCount(values, pred) === 0;
};

/**
 * Verifies that at most one value satisfies the condition
 * @param {*[]} values Set of values
 * @param {Function} pred Condition
 * @returns {boolean} A value indicating whether at most one value satisfies the condition
 * @memberof STD
 */
export const lone = function (values, pred) {
    if (!(Array.isArray(values) && isFunction(pred))) {
        throw new TypeError("Bad argument");
    }

    return getHitCount(values, pred) <= 1;
};

/**
 * Gets the number of values that satisfy the condition
 * @param {*[]} values 
 * @param {Function} pred 
 * @returns {number}
 * @private
 */
/* istanbul ignore next */
function getHitCount(values, pred) {
    var counter = 0;

    for (let i = 0; i < values.length; i++) {
        let value = values[i];

        if (pred(...(Array.isArray(value) ? value : [value]))) {
            counter++;
        }
    }

    return counter;
}