import { isNullOrWhitespace } from "./std-parse.js";
import { hasOwn } from "./std-object.js";

/**
 * Capitalizes all words in a sequence
 * @param {string} str Sequence
 * @returns {string} Capitalized sequence
 * @memberof STD
 */
export function capitalize(str) {
    return str.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase());
}

/**
 * Capitalizes the first letter of a sequence
 * @param {string} str Sequence
 * @returns {string} Sequence with its first letter capitalized
 * @memberof STD
 */
export function capitalizeFirstLetter(str) {
    return isNullOrWhitespace(str) ? str : str.charAt(0).toUpperCase() + str.slice(1);
}

const CaseHandler = {
    'camel': (str) => camelCase(str),
    'pascal': (str) => pascalCase(str),
    'upper': (str) => str.toUpperCase(),
    'lower': (str) => str.toLowerCase(),
};

/**
 * Format a sequence according to a specified case
 * @param {!string} str Sequence
 * @param {!string} casing Sequence
 * @returns {string} Formatted sequence
 * @memberof STD
 */
export function formatCase(str, casing) {
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
 * @param {!string} str Sequence
 * @returns {string} camelCased sequence
 * @memberof STD
 */
export function camelCase(str) {
    if (isNullOrWhitespace(str)) {
        return str;
    }

    var ccString = pascalCase(str);

    return ccString.charAt(0).toLowerCase() + ccString.slice(1);
}

/**
 * Capitalizes all words in a sequence and removes spaces or punctuation
 * @param {!string} str Sequence
 * @returns {string} PascalCased sequence
 * @memberof STD
 */
export function pascalCase(str) {
    if (isNullOrWhitespace(str)) {
        return str;
    }

    var ccString = str.replace(/[_-]+/g, " ").replace(/\s+/g, ' ').trim();

    return capitalize(ccString).replace(/\s+/g, '');
}

/**
 * Removes all accents from a string
 * @param {!string} str A string
 * @returns {string} A string without accents
 * @memberof STD
 */
export function removeAccents(str) {
    if (String.prototype.normalize) {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    }

    return str.replace(/[àâäæ]/gi, 'a')
        .replace(/[ç]/gi, 'c')
        .replace(/[éèê]/gi, 'e')
        .replace(/[îï]/gi, 'i')
        .replace(/[ôœ]/gi, 'o')
        .replace(/[ùûü]/gi, 'u');
}