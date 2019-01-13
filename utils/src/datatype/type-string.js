/**
 * Returns a value indicating whether a string is null or made of whitespace.
 * @param {string} str string
 */
export const isNullOrWhiteSpace = function (str) { return (!str || str.length === 0 || /^\s*$/.test(str)); }

/**
 * Capitalizes all words in a sequence
 * @param {string} str Sequence
 * @returns {string} Capitalized sequence
 */
export const capitalize = function (str) { return str.replace(/\b\w/, function (s) { return s.toUpperCase(); }); }

/**
 * Capitalizes the first letter of a sequence
 * @param {string} str Sequence
 * @returns {string} Sequence with its first letter capitalized
 */
export const capitalizeFirstLetter = function (str) { return str.charAt(0).toUpperCase() + str.slice(1); }

export const removeAccents = function (str) {
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