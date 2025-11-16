import { isNullOrWhitespace, isNullOrUndefined } from './std-parse';

/**
 * Append the path to the current path
 * @param target - current path
 * @param path - path to append
 * @param separator - path separator (default ".")
 * @returns Combined path
 */
export function addPath(target: string, path: string, separator: string = "."): string {
    return isNullOrWhitespace(target) ? path : `${target}${separator}${path}`;
}

/**
 * Returns the directory of the path
 * @param path - path string
 * @param separator - path separator (default ".")
 * @returns Directory portion of path
 */
export function getDir(path: string, separator: string = "."): string {
    return path.substring(0, path.lastIndexOf(separator));
}

/**
 * Returns the directory of the path up to the target
 * @param path - path string
 * @param target - target substring
 * @returns Directory portion up to target
 */
export function getDirTarget(path: string, target: string): string {
    return path.substring(0, path.lastIndexOf(target) - 1);
}

/**
 * Helper function to find element by bracket index notation
 * @private
 */
function findByIndex(obj: any, match: RegExpMatchArray, prop: string): any {
    const REGEX_DIGIT = /\d+/g;
    const index = +(match[0].match(REGEX_DIGIT)![0]);
    return obj[prop][index];
}

/**
 * Returns an element in an object using its path
 * @param obj - Object to search
 * @param path - Path to the element (e.g., "user.address.city" or "users[0].name")
 * @param separator - Path separator (default ".")
 * @returns The found element or undefined
 */
export function findByPath<T = any>(obj: any, path: string, separator: string = "."): T | undefined {
    const REGEX_BRACKET_DIGIT = /\[\d+\]/g;

    let current: any = obj;

    const findHandler = (part: string, regex: RegExp, callback: (obj: any, match: RegExpMatchArray, prop: string) => any): any => {
        const match = part.match(regex);
        const prop = part.substring(0, part.indexOf('['));
        return callback(current, match!, prop);
    };

    const parts = path.split(separator);
    
    for (let i = 0, len = parts.length; i < len; i++) {
        const part = parts[i];

        if (REGEX_BRACKET_DIGIT.test(part)) {
            current = findHandler(part, REGEX_BRACKET_DIGIT, findByIndex);
        } else {
            current = current[part];
        }

        if (isNullOrUndefined(current)) {
            return undefined;
        }
    }

    return current as T;
}
