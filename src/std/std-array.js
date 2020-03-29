import { isEmpty } from "./std-parse.js";

/**
 * Inserts an item in an array at the specified index
 * @param {*[]} arr array
 * @param {number} index 
 * @param {object} item 
 * @returns {number} The new length of the array
 * @memberof STD
 */
export function insert(arr, index, item) {
    arr.splice(index, 0, item);

    return arr.length;
}

/**
 * Returns last element of array.
 * @param {*[]} arr array
 * @memberof STD
 */
export function last(arr) {
    if (!Array.isArray(arr) || isEmpty(arr)) {
        return undefined;
    }

    return arr[arr.length - 1];
}