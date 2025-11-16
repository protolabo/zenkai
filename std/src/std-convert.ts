import { valOrDefault, isString } from "./std-parse";

/**
 * Converts the received boolean value to an integer
 * @param value - boolean value
 * @returns 1 or 0
 */
export function boolToInt(value: boolean): number {
    return value ? 1 : 0;
}

/**
 * Converts the received value to a boolean
 * @param value - value to convert
 * @returns A boolean equivalent of the received value
 */
export function toBoolean(value: any): boolean {
    const val = valOrDefault(value, false);

    return (isString(val) && val.toLowerCase() === "true") || 
           (Number.isInteger(val) && val === 1) || 
           val === true;
}
