var zenstd = (function (exports) {
    'use strict';

    /**
     * Returns an object value or default value if undefined
     * @param {*} arg object
     * @param {*} value default value
     * @param {boolean} [isNullable=false] indicates whether the value can be assigned the value *NULL*
     * @memberof STD
     */
    function valOrDefault(arg, value, isNullable = false) {
        if (isNullable) {
            return isUndefined(arg) ? value : arg;
        }

        return isNullOrUndefined(arg) ? value : arg;
    }

    /**
     * Returns a value indicating whether the value is empty
     * @param {Object[]|string} arr array
     * @returns {boolean}
     * @memberof STD
     */
    function isEmpty(obj) {
        return isIterable(obj) && obj.length === 0;
    }

    /**
     * Returns a value indicating whether the variable is a Date
     * @param {*} value 
     * @returns {boolean}
     * @memberof STD
     */
    function isDate(value) {
        return value instanceof Date || (typeof value === 'object' && Object.prototype.toString.call(value) === '[object Date]');
    }

    /**
     * Returns a value indicating whether the variable is a String
     * @param {*} value
     * @returns {boolean}
     * @memberof STD
     */
    function isString(value) {
        return typeof value === 'string' || value instanceof String;
    }

    /**
     * Returns a value indicating whether the value is a Function
     * @param {*} value
     * @returns {boolean}
     * @memberof STD
     */
    function isFunction(value) {
        return typeof value === 'function';
    }

    /**
     * Returns a value indicating whether the value is an Object
     * @param {*} value
     * @returns {boolean}
     * @memberof STD
     */
    function isObject(value) {
        return !isNullOrUndefined(value) && typeof value === 'object';
    }

    /**
     * Returns a value indicating whether the object is iterable
     * @param {*} obj
     * @returns {boolean}
     * @memberof STD
     */
    function isIterable(obj) {
        return !isNullOrUndefined(obj) && typeof obj[Symbol.iterator] === 'function';
    }

    /**
     * Returns a value indicating whether the object is a non-string iterable
     * @param {*} obj
     * @returns {boolean}
     * @memberof STD
     */
    function isCollection(obj) {
        return isIterable(obj) && !isString(obj);
    }

    /**
     * Returns a value indicating whether the value is null
     * @param {*} value
     * @returns {boolean}
     * @memberof STD
     */
    function isNull(value) { 
        return value === null; 
    }

    /**
     * Returns a value indicating whether a string is null or made of whitespace.
     * @param {string} value string
     * @returns {boolean}
     * @memberof STD
     */
    function isNullOrWhitespace(value) {
        return (!value || isString(value) && (value.length === 0 || /^\s*$/.test(value)));
    }

    /**
     * Returns a value indicating whether the value is undefined
     * @param {*} value
     * @returns {boolean}
     * @memberof STD
     */
    function isUndefined(value) { 
        return typeof value === 'undefined'; 
    }

    /**
     * Returns a value indicating whether the value is null or undefined
     * @param {*} value
     * @returns {boolean}
     * @memberof STD
     */
    function isNullOrUndefined(value) { 
        return isNull(value) || isUndefined(value); 
    }

    /**
     * Inserts an item in an array at the specified index
     * @param {*[]} array array
     * @param {number} index 
     * @param {object} item 
     * @returns {number} The new length of the array
     * @memberof STD
     */
    function insert(array, index, item) {
        if (!(Array.isArray(array) && Number.isInteger(index))) {
            throw new TypeError("Bad argument");
        }

        array.splice(index, 0, item);

        return array.length;
    }

    /**
     * Returns the last element of an array.
     * @param {*[]} array array
     * @memberof STD
     */
    function last(array) {
        if (!Array.isArray(array)) {
            throw new TypeError("Bad argument");
        }

        if (isEmpty(array)) {
            return undefined;
        }

        return array[array.length - 1];
    }

    /**
     * Returns the first element of an array.
     * @param {*[]} array array
     * @memberof STD
     */
    function first(array) {
        if (!Array.isArray(array)) {
            throw new TypeError("Bad argument");
        }

        return array[0];
    }

    /**
     * Creates a fetch request with a time limit to resolve the request
     * @param {URI} uri 
     * @param {*} options 
     * @param {number} time 
     * @memberof STD
     */
    function fetchWithTimeout(uri, options = {}, time = 5000) {
        // Lets set up our `AbortController`, and create a request options object
        // that includes the controller's `signal` to pass to `fetch`.
        const controller = new AbortController();
        const config = { ...options, signal: controller.signal };

        // Set a timeout limit for the request using `setTimeout`. If the body of this
        // timeout is reached before the request is completed, it will be cancelled.
        setTimeout(() => {
            controller.abort();
        }, time);

        return fetch(uri, config)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`${response.status}: ${response.statusText}`)
                }

                return response
            })
            .catch(error => {
                // When we abort our `fetch`, the controller conveniently throws a named
                // error, allowing us to handle them separately from other errors.
                if (error.name === 'AbortError') {
                    throw new Error('Response timed out')
                }

                throw new Error(error.message)
            })
    }

    /**
     * Compare 2 times
     * @param {string} t1 time 1
     * @param {string} t2 time 2
     * @param {string} [separator=":"]
     * @returns {number} 1, 0, -1 if t1 > t2, t1 = t2 and t1 < t2 respectively
     * @memberof STD
     */
    function compareTime(t1, t2, separator = ":") {
        if (isNullOrUndefined(t1) || isNullOrUndefined(t2) || !t1.includes(separator) || !t2.includes(separator)) {
            return null;
        }

        var arr1 = t1.split(separator);
        var arr2 = t2.split(separator);

        // hour comparison
        if (+arr1[0] > +arr2[0]) {
            return 1;
        } else if (+arr1[0] < +arr2[0]) {
            return -1;
        } else {
            // minute comparison
            if (+arr1[1] > +arr2[1]) {
                return 1;
            } else if (+arr1[1] < +arr2[1]) {
                return -1;
            } else {
                if (arr1.length == arr2.length && arr1.length == 3) {
                    // second comparison
                    if (+arr1[2] > +arr2[2]) {
                        return 1;
                    } else if (+arr1[2] < +arr2[2]) {
                        return -1;
                    }
                }

                return 0;
            }
        }
    }

    /**
     * Resolves a date value
     * @param {*} [value] 
     * @returns {Date}
      * @memberof STD
     */
    function resolveDate(value, useOffset = true) {
        if (isNullOrUndefined(value)) {
            return new Date();
        } else if (isDate(value)) {
            return value;
        }

        var date = new Date(value);
        var time = date.getTime();

        if (Number.isNaN(time)) {
            return new Date();
        }

        if (useOffset) {
            return new Date(time + date.getTimezoneOffset() * 60000);
        }

        return date;
    }

    /**
     * Formats a date
     * @param {!Date} date 
     * @param {!string} format 
     * @returns {string} Formatted date
     * @memberof STD
     */
    function formatDate(date, format) {
        var dd = date.getDate();
        var mm = date.getMonth() + 1;   // January = 0
        var yyyy = date.getFullYear().toString();
        var hh = date.getHours();
        var MM = date.getMinutes();
        var ss = date.getSeconds();

        const twoDigits = (val) => val < 10 ? `0${val}` : val;

        return format.replace('yyyy', yyyy)
            .replace('yy', yyyy.slice(-2))
            .replace('mm', twoDigits(mm))
            .replace('m', mm)
            .replace('dd', twoDigits(dd))
            .replace('d', dd)
            .replace('hh', twoDigits(hh))
            .replace('h', hh)
            .replace('MM', twoDigits(MM))
            .replace('M', MM)
            .replace('ss', twoDigits(ss))
            .replace('s', ss);
    }

    /**
     * Returns a date and time using the format "YYYY-mm-dd"
     * @param {*} _date 
     * @returns {string}
     * @memberof STD
     */
    function shortDate(_date) {
        var date = resolveDate(_date);

        return formatDate(date, 'yyyy-mm-dd');
    }

    /**
     * Returns a date and time using the format "YYYY-mm-dd hh:MM"
     * @param {*} _date 
     * @returns {string}
     * @memberof STD
     */
    function shortDateTime(_date) {
        var date = resolveDate(_date, false);

        return formatDate(date, 'yyyy-mm-dd hh:MM');
    }

    /** @private */
    const hasOwnProperty = Object.prototype.hasOwnProperty;

    /** @private */
    const isPrototypeOf = Object.prototype.isPrototypeOf;


    /**
     * Returns a boolean indicating whether the object has the specified property as its own property (not inherited).
     * @param {*} obj target object
     * @param {string} key name of the property
     * @memberof STD
     */
    const hasOwn = function (obj, key) {
        return hasOwnProperty.call(obj, key);
    };

    /**
     * Returns a boolean indicating whether the object (child) inherit from another object (parent)
     * @param {*} child 
     * @param {*} parent 
     * @memberof STD
     */
    const isDerivedOf = function (child, parent) {
        return Object.getPrototypeOf(child) !== parent && isPrototypeOf.call(parent, child);
    };

    /**
     * Creates a clone of an object
     * @param {*} obj Object
     * @memberof STD
     */
    function cloneObject(obj) {
        if (isNullOrUndefined(obj) || !isObject(obj)) {
            return obj;
        }

        var temp = obj.constructor(); // changed
        for (var key in obj) {
            if (hasOwn(obj, key)) {
                obj['isActiveClone'] = null;
                temp[key] = cloneObject(obj[key]);
                delete obj['isActiveClone'];
            }
        }

        return temp;
    }

    /**
     * Capitalizes all words in a sequence
     * @param {string} str Sequence
     * @returns {string} Capitalized sequence
     * @memberof STD
     */
    function capitalize(str) {
        if (isNullOrWhitespace(str)) {
            return str;
        }

        return str.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase());
    }

    /**
     * Capitalizes the first letter of a sequence
     * @param {string} str Sequence
     * @returns {string} Sequence with its first letter capitalized
     * @memberof STD
     */
    function capitalizeFirstLetter(str) {
        if (isNullOrWhitespace(str)) {
            return str;
        }

        return str.charAt(0).toUpperCase() + str.slice(1);
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
     * @param {!string} casing Casing (camel, pascal, upper, lower)
     * @returns {string} Formatted sequence
     * @memberof STD
     */
    function formatCase(str, casing) {
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
    function camelCase(str) {
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
    function pascalCase(str) {
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
    function removeAccents(str) {
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

    /**
     * Verifies that a character is a vowel
     * @param {string} char String character
     */
    function isVowel(char) {
        if (!isString(char)) {
            return false;
        }

        return "aeiou".includes(char.toLowerCase());
    }

    /**
     * Verifies that a character is a consonant
     * @param {string} char String character
     */
    function isConsonant(char) {
        if (!isString(char)) {
            return false;
        }

        return "bcdfghjklmnpqrstvwxyz".includes(char.toLowerCase());
    }

    /**
     * Verifies that a character is uppercase
     * @param {string} char String character
     */
    function isUpperCase(char) {
        if (!isString(char)) {
            return false;
        }

        let charCode = char.charCodeAt(0);

        return charCode >= 65 && charCode <= 90;
    }

    /**
     * Verifies that a character is lowercase
     * @param {string} char String character
     */
    function isLowerCase(char) {
        if (!isString(char)) {
            return false;
        }

        let charCode = char.charCodeAt(0);

        return charCode >= 97 && charCode <= 122;
    }

    /**
     * Converts the received boolean value to an integer
     * @param {boolean} value 
     * @returns {number} 1 or 0
     * @memberof STD
     */
    function boolToInt(value) { return value ? 1 : 0; }

    /**
     * Converts the received value to a boolean
     * @param {*} value
     * @returns {boolean} A boolean equivalent of the received value
     * @memberof STD
     */
    function toBoolean(value) {
        var val = valOrDefault(value, false);

        return isString(val) && val.toLowerCase() === "true" || Number.isInteger(val) && val === 1 || val === true;
    }

    /**
     * Verifies that the condition is satisfied for a specified number (range) of value
     * @param {*[]} values Set of values
     * @param {Function} pred Condition
     * @param {number} [min=1] Minimum number of values that must satisfy the condition
     * @param {number} [max] Maximum number of values that must satisfy the condition
     * @returns {boolean} A value indicating whether the condition is satisfied for the specified range
     * @memberof STD
     */
    const assert = function (values, pred, min, max) {
        if (!(Array.isArray(values) && isFunction(pred))) {
            throw new TypeError("Bad argument");
        }

        var hitCount = getHitCount(values, pred);

        if (all([min, max], Number.isInteger)) {
            if (max < min) {
                throw new Error("Bad argument: max must be greater than min");
            }

            return hitCount >= min && hitCount <= max;
        }

        if (Number.isInteger(min)) {
            return hitCount >= min;
        }

        if (Number.isInteger(max)) {
            return hitCount <= max;
        }

        return hitCount > 0;
    };

    /**
     * Verifies that at least one value satisfies the condition
     * @param {*[]} values Set of values
     * @param {Function} pred Condition
     * @returns {boolean} A value indicating whether at least one value satisfies the condition
     * @memberof STD
     */
    const some = function (values, pred) {
        if (!(Array.isArray(values) && isFunction(pred))) {
            throw new TypeError("Bad argument");
        }

        for (let i = 0; i < values.length; i++) {
            let value = values[i];

            if (pred(...(Array.isArray(value) ? value : [value]))) {
                return true;
            }
        }

        return false;
    };

    /**
     * Verifies that all the values satisfy the condition
     * @param {*[]} values Set of values
     * @param {Function} pred Condition
     * @returns {boolean} A value indicating whether all the values satisfy the condition
     * @memberof STD
     */
    const all = function (values, pred) {
        if (!(Array.isArray(values) && isFunction(pred))) {
            throw new TypeError("Bad argument");
        }

        for (let i = 0; i < values.length; i++) {
            let value = values[i];

            if (!pred(...(Array.isArray(value) ? value : [value]))) {
                return false;
            }
        }

        return true;
    };

    /**
     * Verifies that exactly one value satisfies the condition
     * @param {*[]} values Set of values
     * @param {Function} pred Condition
     * @returns {boolean} A value indicating whether exactly one value satisfies the condition
     * @memberof STD
     */
    const one = function (values, pred) {
        if (!(Array.isArray(values) && isFunction(pred))) {
            throw new TypeError("Bad argument");
        }

        return getHitCount(values, pred) === 1;
    };

    /**
     * Verifies that no value satisfies the condition
     * @param {*[]} values Set of values
     * @param {Function} pred Condition
     * @returns {boolean} A value indicating whether no value satisfies the condition
     * @memberof STD
     */
    const no = function (values, pred) {
        if (!(Array.isArray(values) && isFunction(pred))) {
            throw new TypeError("Bad argument");
        }

        return getHitCount(values, pred) === 0;
    };

    /**
     * Verifies that at most one value satisfies the condition
     * @param {*[]} values Set of values
     * @param {Function} pred Condition
     * @returns {boolean} A value indicating whether at most one value satisfies the condition
     * @memberof STD
     */
    const lone = function (values, pred) {
        if (!(Array.isArray(values) && isFunction(pred))) {
            throw new TypeError("Bad argument");
        }

        return getHitCount(values, pred) <= 1;
    };

    /**
     * Gets the number of values that satisfy the condition
     * @param {*[]} values 
     * @param {Function} pred 
     * @returns {number}
     * @private
     */
    /* istanbul ignore next */
    function getHitCount(values, pred) {
        var counter = 0;

        for (let i = 0; i < values.length; i++) {
            let value = values[i];

            if (pred(...(Array.isArray(value) ? value : [value]))) {
                counter++;
            }
        }

        return counter;
    }

    /**
     * Return a random integer between min and max (inclusive).
     * @param {number} min 
     * @param {number} [max] 
     * @param {boolean} [secure] 
     * @memberof STD
    */
    function random(min, max, secure = false) {
        if (!Number.isInteger(min)) {
            throw new TypeError("Bad argument");
        }

        if (!Number.isInteger(max)) {
            max = min;
            min = 0;
        }

        if (max < min) {
            throw new Error("Bad argument: max must be greater than min");
        }

        return min + Math.floor((secure ? secureMathRandom() : Math.random()) * (max - min + 1));
    }

    /**
     * More secure implementation of `Math.random`
     * @private
     */
    function secureMathRandom() {
        // Divide a random UInt32 by the maximum value (2^32 -1) to get a result between 0 and 1
        return window.crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295;
    }

    /**
     * Append the path to the current path
     * @param {string} target 
     * @param {string} path 
     * @param {string} [separator="."] 
     * @memberof STD
     */
    function addPath(target, path, separator = ".") {
        return isNullOrWhitespace(target) ? path : `${target}${separator}${path}`;
    }

    /**
     * Returns the directory of the path
     * @param {string} path 
     * @param {string} [separator="."] 
     * @memberof STD
     */
    function getDir(path, separator = ".") {
        return path.substring(0, path.lastIndexOf(separator));
    }

    /**
     * Returns the directory of the path from the target
     * @param {string} path 
     * @memberof STD
     */
    function getDirTarget(path, target) {
        return path.substring(0, path.lastIndexOf(target) - 1);
    }

    function findByIndex(obj, match, prop) {
        const REGEX_DIGIT = /\d+/g;
        var index = +match[0].match(REGEX_DIGIT);
        return obj[prop][index];
    }

    /**
     * Returns an element in an object using its path
     * @param {Object} obj
     * @param {string} path  
     * @param {string} [separator=.]
     * @memberof STD
     */
    function findByPath(obj, path, separator = ".") {
        const REGEX_BRACKET_DIGIT = /\[\d+\]/g;

        var me = cloneObject(obj);

        const findHandler = function (part, regex, callback) {
            var match = part.match(regex);
            var prop = part.substring(0, part.indexOf('['));
            return callback(me, match, prop);
        };

        var parts = path.split(separator);
        for (let i = 0, len = parts.length; i < len; i++) {
            let part = parts[i];

            if (REGEX_BRACKET_DIGIT.test(part)) {
                me = findHandler(part, REGEX_BRACKET_DIGIT, findByIndex);
            } else {
                me = me[part];
            }

            if (isNullOrUndefined(me)) {
                return undefined;
            }
        }

        return me;
    }

    exports.addPath = addPath;
    exports.all = all;
    exports.assert = assert;
    exports.boolToInt = boolToInt;
    exports.camelCase = camelCase;
    exports.capitalize = capitalize;
    exports.capitalizeFirstLetter = capitalizeFirstLetter;
    exports.cloneObject = cloneObject;
    exports.compareTime = compareTime;
    exports.fetchWithTimeout = fetchWithTimeout;
    exports.findByPath = findByPath;
    exports.first = first;
    exports.formatCase = formatCase;
    exports.formatDate = formatDate;
    exports.getDir = getDir;
    exports.getDirTarget = getDirTarget;
    exports.hasOwn = hasOwn;
    exports.insert = insert;
    exports.isCollection = isCollection;
    exports.isConsonant = isConsonant;
    exports.isDate = isDate;
    exports.isDerivedOf = isDerivedOf;
    exports.isEmpty = isEmpty;
    exports.isFunction = isFunction;
    exports.isIterable = isIterable;
    exports.isLowerCase = isLowerCase;
    exports.isNull = isNull;
    exports.isNullOrUndefined = isNullOrUndefined;
    exports.isNullOrWhitespace = isNullOrWhitespace;
    exports.isObject = isObject;
    exports.isString = isString;
    exports.isUndefined = isUndefined;
    exports.isUpperCase = isUpperCase;
    exports.isVowel = isVowel;
    exports.last = last;
    exports.lone = lone;
    exports.no = no;
    exports.one = one;
    exports.pascalCase = pascalCase;
    exports.random = random;
    exports.removeAccents = removeAccents;
    exports.resolveDate = resolveDate;
    exports.shortDate = shortDate;
    exports.shortDateTime = shortDateTime;
    exports.some = some;
    exports.toBoolean = toBoolean;
    exports.valOrDefault = valOrDefault;

    return exports;

})({});
