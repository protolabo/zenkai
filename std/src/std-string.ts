import { isNullOrWhitespace, isString } from "./std-parse";
import { hasOwn } from "./std-object";

/**
 * Case conversion function type
 */
type CaseConverter = (str: string) => string;

/**
 * Capitalizes all words in a sequence
 * @param str - Sequence to capitalize
 * @returns Capitalized sequence
 */
export function capitalize(str: string): string {
    if (isNullOrWhitespace(str)) {
        return str;
    }

    return str.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase());
}

/**
 * Capitalizes the first letter of a sequence
 * @param str - Sequence
 * @returns Sequence with its first letter capitalized
 */
export function capitalizeFirstLetter(str: string): string {
    if (isNullOrWhitespace(str)) {
        return str;
    }

    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Case handlers mapping
 */
const CaseHandler: Record<string, CaseConverter> = {
    'camel': (str: string) => camelCase(str),
    'pascal': (str: string) => pascalCase(str),
    'upper': (str: string) => str.toUpperCase(),
    'lower': (str: string) => str.toLowerCase(),
};

/**
 * Format a sequence according to a specified case
 * @param str - Sequence
 * @param casing - Casing (camel, pascal, upper, lower)
 * @returns Formatted sequence
 */
export function formatCase(str: string, casing: 'camel' | 'pascal' | 'upper' | 'lower'): string {
    if (isNullOrWhitespace(str)) {
        return str;
    }

    if (!hasOwn(CaseHandler, casing)) {
        return str;
    }

    return CaseHandler[casing](str);
}

/**
 * Capitalizes all words in a sequence except the first one and 
 * removes spaces or punctuation
 * @param str - Sequence
 * @returns camelCased sequence
 */
export function camelCase(str: string): string {
    if (isNullOrWhitespace(str)) {
        return str;
    }

    const ccString = pascalCase(str);

    return ccString.charAt(0).toLowerCase() + ccString.slice(1);
}

/**
 * Capitalizes all words in a sequence and removes spaces or punctuation
 * @param str - Sequence
 * @returns PascalCased sequence
 */
export function pascalCase(str: string): string {
    if (isNullOrWhitespace(str)) {
        return str;
    }

    const ccString = str.replace(/[_-]+/g, " ").replace(/\s+/g, ' ').trim();

    return capitalize(ccString).replace(/\s+/g, '');
}

/**
 * Removes all accents from a string
 * @param str - A string
 * @returns A string without accents
 */
export function removeAccents(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}

/**
 * Verifies that a character is a vowel
 * @param char - String character
 * @returns boolean indicating if character is a vowel
 */
export function isVowel(char: string): boolean {
    if (!isString(char)) {
        return false;
    }

    return "aeiou".includes(char.toLowerCase());
}

/**
 * Verifies that a character is a consonant
 * @param char - String character
 * @returns boolean indicating if character is a consonant
 */
export function isConsonant(char: string): boolean {
    if (!isString(char)) {
        return false;
    }

    return "bcdfghjklmnpqrstvwxyz".includes(char.toLowerCase());
}

/**
 * Verifies that a character is uppercase
 * @param char - String character
 * @returns boolean indicating if character is uppercase
 */
export function isUpperCase(char: string): boolean {
    if (!isString(char)) {
        return false;
    }

    const charCode = char.charCodeAt(0);

    return charCode >= 65 && charCode <= 90;
}

/**
 * Verifies that a character is lowercase
 * @param char - String character
 * @returns boolean indicating if character is lowercase
 */
export function isLowerCase(char: string): boolean {
    if (!isString(char)) {
        return false;
    }

    const charCode = char.charCodeAt(0);

    return charCode >= 97 && charCode <= 122;
}
