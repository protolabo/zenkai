/**
 * Inserts an item in an array at the specified index
 * @param {Object[]} arr array
 * @param {number} index 
 * @param {object} item 
 */
export const insert = function (arr, index, item) { arr.splice(index, 0, item); }