/**
 * Verifies that at least one value satisfies the condition
 * @param {*[]} values Set of values
 * @param {Function} fn Condition
 * @param {number} [min=1] Minimum number of values that must satisfy the condition
 * @returns {boolean} A value indicating whether at least one value satisfies the condition
 */
export const some = function (values, fn, min = 1) {
    if (min === 1) {
        for (let i = 0; i < values.length; i++) {
            if (fn(values[i])) {
                return true;
            }
        }

        return false;
    }

    return getHitCount(values, fn) >= min;
};

/**
 * Verifies that all the values satisfy the condition
 * @param {*[]} values Set of values
 * @param {Function} fn Condition
 * @returns {boolean} A value indicating whether all the values satisfy the condition
 */
export const all = function (values, fn) {
    for (let i = 0; i < values.length; i++) {
        if (!fn(values[i])) {
            return false;
        }
    }

    return true;
};

/**
 * Verifies that exactly one value satisfies the condition
 * @param {*[]} values Set of values
 * @param {Function} fn Condition
 * @returns {boolean} A value indicating whether exactly one value satisfies the condition
 */
export const one = function (values, fn) {
    return getHitCount(values, fn) === 1;
};

/**
 * Verifies that no value satisfies the condition
 * @param {*[]} values Set of values
 * @param {Function} fn Condition
 * @returns {boolean} A value indicating whether no value satisfies the condition
 */
export const no = function (values, fn) {
    return !some(values, fn);
};

/**
 * 
 * @param {*} values 
 * @param {*} fn 
 * @private
 */
/* istanbul ignore next */
function getHitCount(values, fn) {
    var counter = 0;

    for (let i = 0; i < values.length; i++) {
        if (fn(values[i])) {
            counter++;
        }
    }

    return counter;
}