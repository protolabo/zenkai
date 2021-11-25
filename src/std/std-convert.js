import { valOrDefault, isString } from "./std-parse.js";


/**
 * Converts the received boolean value to an integer
 * @param {boolean} value 
 * @returns {number} 1 or 0
 * @memberof STD
 */
export function boolToInt(value) { return value ? 1 : 0; }

/**
 * Converts the received value to a boolean
 * @param {*} value
 * @returns {boolean} A boolean equivalent of the received value
 * @memberof STD
 */
export function toBoolean(value) {
    var val = valOrDefault(value, false);

    return isString(val) && val.toLowerCase() === "true" || Number.isInteger(val) && val === 1 || val === true;
}
