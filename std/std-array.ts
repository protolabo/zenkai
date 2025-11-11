import { isEmpty } from "./std-parse.js";

/**
 * Inserts an item in an array at the specified index
 * @param array - array to modify
 * @param index - position to insert at
 * @param item - item to insert
 * @returns The new length of the array
 * @memberof STD
 */
export function insert<T>(array: T[], index: number, item: T): number {
    if (!(Array.isArray(array) && Number.isInteger(index))) {
        throw new TypeError("Bad argument: array must be an array and index must be an integer");
    }

    if (index < 0 || index > array.length) {
        throw new RangeError(`Bad argument: index ${index} is out of bounds for array of length ${array.length}`);
    }

    array.splice(index, 0, item);

    return array.length;
}

/**
 * Returns the last element of an array.
 * @param array - array
 * @returns Last element or undefined if array is empty
 * @memberof STD
 */
export function last<T>(array: T[]): T | undefined {
    if (!Array.isArray(array)) {
        throw new TypeError("Bad argument: array must be an array");
    }

    if (isEmpty(array)) {
        return undefined;
    }

    return array[array.length - 1];
}

/**
 * Returns the first element of an array.
 * @param array - array
 * @returns First element or undefined if array is empty
 * @memberof STD
 */
export function first<T>(array: T[]): T | undefined {
    if (!Array.isArray(array)) {
        throw new TypeError("Bad argument: array must be an array");
    }

    return array[0];
}
