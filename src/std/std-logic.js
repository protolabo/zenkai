import { isNullOrUndefined } from "./std-parse";

/**
 * Verifies that at least one value satisfies the condition
 * @param {*[]} values Set of values
 * @param {Function} pred Condition
 * @returns {boolean} A value indicating whether at least one value satisfies the condition
 * @memberof STD
 */
export const some = function (values, pred) {
    for (let i = 0; i < values.length; i++) {
        let value = values[i];

        if (pred(...(Array.isArray(value) ? value : [value]))) {
            return true;
        }
    }

    return false;
};

/**
 * Verifies that at the condition is satisfied for a a number of value
 * @param {*[]} values Set of values
 * @param {Function} pred Condition
 * @param {number} [min=1] Minimum number of values that must satisfy the condition
 * @param {number} [max=-1] Minimum number of values that must satisfy the condition
 * @returns {boolean} A value indicating whether at least one value satisfies the condition
 * @memberof STD
 */
export const assert = function (values, pred, min, max) {
    if (max < min) {
        console.error("`max` must be greater than `min`");
        return;
    }

    var hitCount = getHitCount(values, pred);

    if (all([min, max], Number.isInteger)) {
        return hitCount >= min && hitCount <= max;
    }
    if(Number.isInteger(min)) {
        return hitCount >= min;
    }
    if(Number.isInteger(max)) {
        return hitCount <= max;
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
    return getHitCount(values, pred) <= 1;
};

/**
 * 
 * @param {*} values 
 * @param {*} pred 
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