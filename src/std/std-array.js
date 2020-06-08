import { isEmpty } from "./std-parse.js";


/**
 * Inserts an item in an array at the specified index
 * @param {*[]} array array
 * @param {number} index 
 * @param {object} item 
 * @returns {number} The new length of the array
 * @memberof STD
 */
export function insert(array, index, item) {
    if (!(Array.isArray(array) && Number.isInteger(index))) {
        throw new TypeError("Bad argument");
    }

    array.splice(index, 0, item);

    return array.length;
}

/**
 * Returns the last element of an array.
 * @param {*[]} array array
 * @memberof STD
 */
export function last(array) {
    if (!Array.isArray(array)) {
        throw new TypeError("Bad argument");
    }

    if (isEmpty(array)) {
        return undefined;
    }

    return array[array.length - 1];
}

/**
 * Returns the first element of an array.
 * @param {*[]} array array
 * @memberof STD
 */
export function first(array) {
    if (!Array.isArray(array)) {
        throw new TypeError("Bad argument");
    }

    return array[0];
}