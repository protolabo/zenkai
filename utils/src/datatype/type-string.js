/**
 * Returns a value indicating whether a string is null or made of whitespace.
 * @param {string} str string
 * @memberof TYPE
 */
export function isNullOrWhitespace(str) { return (!str || str.length === 0 || /^\s*$/.test(str)); }

/**
 * Capitalizes all words in a sequence
 * @param {string} str Sequence
 * @returns {string} Capitalized sequence
 * @memberof TYPE
 */
export function capitalize(str) { return str.replace(/\b\w/, function (s) { return s.toUpperCase(); }); }

/**
 * Capitalizes the first letter of a sequence
 * @param {string} str Sequence
 * @returns {string} Sequence with its first letter capitalized
 * @memberof TYPE
 */
export function capitalizeFirstLetter(str) { 
    if(isNullOrWhitespace(str)){
        return str;
    }
    return str.charAt(0).toUpperCase() + str.slice(1); 
}

/**
 * Removes all accents from a string
 * @param {*} str string
 * @returns {string}
 * @memberof TYPE
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

/** @ignore */
function compare(str1, str2) {
    return str1.toUpperCase().indexOf(str2.toUpperCase()) > -1;
}

/** @ignore */
function replacein(str, searchVal, newValue) {
    return str.toLowerCase().replace(searchVal, newValue);
}