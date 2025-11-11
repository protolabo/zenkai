/**
 * STD - Standard Utility Library (TypeScript)
 * A comprehensive collection of utility functions for common programming tasks
 */

// Array utilities
export {
    insert,
    last,
    first
} from './std-array.js';

// Conversion utilities
export {
    boolToInt,
    toBoolean
} from './std-convert.js';

// Date/Time utilities
export {
    compareTime,
    resolveDate,
    formatDate,
    shortDate,
    shortDateTime
} from './std-datetime.js';

// Logic utilities
export {
    assert,
    some,
    all,
    one,
    no,
    lone
} from './std-logic.js';

// Math utilities
export {
    random
} from './std-math.js';

// Object utilities
export {
    hasOwn,
    isDerivedOf,
    cloneObject
} from './std-object.js';

// Parsing/Type checking utilities
export {
    valOrDefault,
    isEmpty,
    isDate,
    isString,
    isFunction,
    isObject,
    isIterable,
    isCollection,
    isNull,
    isNullOrWhitespace,
    isUndefined,
    isNullOrUndefined
} from './std-parse.js';

// Path utilities
export {
    addPath,
    getDir,
    getDirTarget,
    findByPath
} from './std-path.js';

// String utilities
export {
    capitalize,
    capitalizeFirstLetter,
    formatCase,
    camelCase,
    pascalCase,
    removeAccents,
    isVowel,
    isConsonant,
    isUpperCase,
    isLowerCase
} from './std-string.js';
