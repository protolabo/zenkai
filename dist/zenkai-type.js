var ztype = (function (exports) {
  'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  /**
   * Returns an object value or default value if undefined
   * @param {*} arg object
   * @param {*} value default value
   * @param {boolean} [isNullable] indicates whether the value can be assigned the value *NULL*
   * @memberof TYPE
   */
  function valOrDefault(arg, value, isNullable) {
    if (isNullable === true) {
      return isUndefined(arg) ? value : arg;
    }

    return isNullOrUndefined(arg) ? value : arg;
  }
  /**
   * Returns a value indicating whether the value is empty
   * @param {Object[]|string} arr array
   * @returns {boolean}
   * @memberof TYPE
   */

  function isEmpty(obj) {
    return (Array.isArray(obj) || isString(obj)) && obj.length === 0;
  }
  /**
   * Returns a value indicating whether the variable is a Date
   * @param {*} value 
   * @returns {boolean}
   * @memberof TYPE
   */

  function isDate(value) {
    return value instanceof Date || _typeof(value) === 'object' && Object.prototype.toString.call(value) === '[object Date]';
  }
  /**
   * Returns a value indicating whether the variable is a String
   * @param {*} value
   * @returns {boolean}
   * @memberof TYPE
   */

  function isString(value) {
    return typeof value === 'string' || value instanceof String;
  }
  /**
   * Returns a value indicating whether the value is a Function
   * @param {string} value
   * @returns {boolean}
   * @memberof TYPE
   */

  function isFunction(value) {
    return typeof value === 'function';
  }
  /**
   * Returns a value indicating whether the value is an Object
   * @param {string} value
   * @returns {boolean}
   * @memberof TYPE
   */

  function isObject(value) {
    return !isNullOrUndefined(value) && _typeof(value) === 'object';
  }
  /**
   * Returns a value indicating whether the object is iterable
   * @param {*} obj
   * @returns {boolean}
   * @memberof TYPE
   */

  function isIterable(obj) {
    return !isNullOrUndefined(obj) && typeof obj[Symbol.iterator] === 'function';
  }
  /**
   * Returns a value indicating whether the value is null
   * @param {string} value
   * @returns {boolean}
   * @memberof TYPE
   */

  function isNull(value) {
    return value === null;
  }
  /**
   * Returns a value indicating whether a string is null or made of whitespace.
   * @param {string} str string
   * @returns {boolean}
   * @memberof TYPE
   */

  function isNullOrWhitespace(str) {
    return !str || isString(str) && (str.length === 0 || /^\s*$/.test(str));
  }
  /**
   * Returns a value indicating whether the value is undefined
   * @param {*} value
   * @returns {boolean}
   * @memberof TYPE
   */

  function isUndefined(value) {
    return typeof value === 'undefined';
  }
  /**
   * Returns a value indicating whether the value is null or undefined
   * @returns {boolean}
   * @memberof TYPE
   */

  function isNullOrUndefined(value) {
    return isNull(value) || isUndefined(value);
  }

  /**
   * Inserts an item in an array at the specified index
   * @param {*[]} arr array
   * @param {number} index 
   * @param {object} item 
   * @returns {number} The new length of the array
   * @memberof TYPE
   */

  function insert(arr, index, item) {
    arr.splice(index, 0, item);
    return arr.length;
  }
  /**
   * Returns last element of array.
   * @param {*[]} arr array
   * @memberof TYPE
   */

  function last(arr) {
    if (!Array.isArray(arr) || isEmpty(arr)) {
      return undefined;
    }

    return arr[arr.length - 1];
  }

  /**
   * Compare 2 times
   * @param {string} t1 time 1
   * @param {string} t2 time 2
   * @returns {number} 1, 0, -1 if t1 > t2, t1 = t2 and t1 < t2 respectively
   * @memberof TYPE
   */

  function compareTime(t1, t2) {
    if (isNullOrUndefined(t1) || isNullOrUndefined(t2) || !t1.includes(":") || !t2.includes(":")) {
      return null;
    }

    var arr1 = t1.split(':');
    var arr2 = t2.split(':'); // hour comparison

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
   * @param {*} [date] 
   * @returns {Date}
   * @private
   */

  function resolveDate(date) {
    if (isNullOrUndefined(date)) {
      return new Date();
    } else if (isDate(date)) {
      return date;
    }

    var _date = new Date(date);

    return new Date(_date.getTime() + _date.getTimezoneOffset() * 60000);
  }
  /**
   * Formats a date
   * @param {!Date} date 
   * @param {!string} format 
   * @returns {string} Formatted date
   * @memberof TYPE
   */


  function formatDate(date, format) {
    var dd = date.getDate();
    var mm = date.getMonth() + 1; // January = 0

    var yyyy = date.getFullYear().toString();
    var hh = date.getHours();
    var MM = date.getMinutes();
    var ss = date.getSeconds();

    var twoDigits = function twoDigits(val) {
      return val < 10 ? "0".concat(val) : val;
    };

    return format.replace('yyyy', yyyy).replace('yy', yyyy.slice(-2)).replace('mm', twoDigits(mm)).replace('m', mm).replace('dd', twoDigits(dd)).replace('d', dd).replace('hh', twoDigits(hh)).replace('h', hh).replace('MM', twoDigits(MM)).replace('M', MM).replace('ss', twoDigits(ss)).replace('s', ss);
  }
  /**
   * Returns a date and time using the format "YYYY-mm-dd"
   * @param {*} _date 
   * @returns {string}
   * @memberof TYPE
   */

  function shortDate(_date) {
    var date = resolveDate(_date);
    return formatDate(date, 'yyyy-mm-dd');
  }
  /**
   * Returns a date and time using the format "YYYY-mm-dd hh:MM"
   * @param {*} _date 
   * @returns {string}
   * @memberof TYPE
   */

  function shortDateTime(_date) {
    var date = resolveDate(_date);
    return formatDate(new Date(date + date.getTimezoneOffset() * 60000), 'yyyy-mm-dd hh:MM');
  }
  function parseTime(n) {
    var hh = +n | 0;
    var mm = '00';

    if (!Number.isInteger(+n)) {
      mm = (n + '').split('.')[1] * 6;
    }

    return hh + ':' + mm;
  }
  var DICT = {
    'en': {
      'second': 'second(s)',
      'minute': 'minute(s)',
      'hour': 'hour(s)',
      'day': 'day(s)',
      'week': 'week(s)',
      'month': 'month(s)',
      'year': 'year(s)'
    },
    'fr': {
      'second': 'seconde(s)',
      'minute': 'minute(s)',
      'hour': 'heure(s)',
      'day': 'jour(s)',
      'week': 'semaine(s)',
      'month': 'mois',
      'year': 'année(s)'
    }
  };

  var trans = function translation(lang, key, isPlural) {
    var value = DICT[lang][key];

    if (value === undefined) {
      return undefined;
    }

    if (isPlural) {
      return value.replace(/\(([a-z]+)\)/g, '$1');
    }

    return value.replace(/\([a-z]+\)/g, '');
  };

  var timeAgoResponse = function timeAgoResponseBuilder(time, unit, _lang) {
    var lang = valOrDefault(_lang, 'en');
    var isPlural = time === 1;
    var msg = {
      en: "".concat(time, " ").concat(trans('en', unit, isPlural), " ago"),
      fr: "il y a ".concat(time, " ").concat(trans('fr', unit, isPlural))
    };
    return msg[lang];
  };
  /**
   * Returns the ellapsed time between now and a point in time
   * @param {*} time 
   * @param {*} _callback 
   * @returns {string}
   * @memberof TYPE
   */


  function timeAgo(time, _callback) {
    var callback = valOrDefault(_callback, timeAgoResponse);
    var seconds = Math.floor((Date.now() - resolveDate(time).getTime()) / 1000);
    var MINUTE = 60;
    var HOUR = MINUTE * 60;
    var DAY = HOUR * 24;
    var WEEK = DAY * 7;
    var MONTH = DAY * 30;
    var YEAR = WEEK * 52;

    if (seconds < MINUTE) {
      return callback(seconds, 'second');
    } else if (seconds < HOUR) {
      return callback(~~(seconds / MINUTE), 'minute');
    } else if (seconds < DAY) {
      return callback(~~(seconds / HOUR), 'hour');
    } else if (seconds < WEEK) {
      return callback(~~(seconds / DAY), 'day');
    } else if (seconds < MONTH) {
      return callback(~~(seconds / WEEK), 'week');
    } else if (seconds < YEAR) {
      return callback(~~(seconds / MONTH), 'month');
    } else {
      return callback(~~(seconds / YEAR), 'year');
    }
  }

  /** @private */
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  /** @private */

  var isPrototypeOf = Object.prototype.isPrototypeOf;
  var defProp = Object.defineProperty;
  /**
   * Returns a boolean indicating whether the object has the specified property as its own property (not inherited).
   * @param {*} obj target object
   * @param {string} key name of the property
   * @memberof TYPE
   */

  var hasOwn = function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
  };
  /**
   * Returns a boolean indicating whether the object (child) inherit from another object (parent)
   * @param {*} child 
   * @param {*} parent 
   * @memberof TYPE
   */

  var isDerivedOf = function isDerivedOf(child, parent) {
    return Object.getPrototypeOf(child) !== parent && isPrototypeOf.call(parent, child);
  };
  /**
   * 
   * @param {*} obj 
   * @memberof TYPE
   */

  function cloneObject(obj) {
    if (obj === null || _typeof(obj) !== 'object') {
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
   * @memberof TYPE
   */

  function capitalize(str) {
    return str.toLowerCase().replace(/\b\w/g, function (s) {
      return s.toUpperCase();
    });
  }
  /**
   * Capitalizes the first letter of a sequence
   * @param {string} str Sequence
   * @returns {string} Sequence with its first letter capitalized
   * @memberof TYPE
   */

  function capitalizeFirstLetter(str) {
    return isNullOrWhitespace(str) ? str : str.charAt(0).toUpperCase() + str.slice(1);
  }
  /**
   * Capitalizes all words in a sequence except the first one and 
   * removes spaces or punctuation
   * @param {!string} str Sequence
   * @returns {string} CamelCased sequence
   * @memberof TYPE
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
   * @memberof TYPE
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
   * @memberof TYPE
   */

  function removeAccents(str) {
    if (String.prototype.normalize) {
      return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    }

    return str.replace(/[àâäæ]/gi, 'a').replace(/[ç]/gi, 'c').replace(/[éèê]/gi, 'e').replace(/[îï]/gi, 'i').replace(/[ôœ]/gi, 'o').replace(/[ùûü]/gi, 'u');
  }

  /**
   * Converts the received boolean value to an integer
   * @param {boolean} value 
   * @returns {number} 1 or 0
   * @memberof TYPE
   */

  function boolToInt(value) {
    return value ? 1 : 0;
  }
  /**
   * Converts the received value to a boolean
   * @param {*} value
   * @returns {boolean} A boolean equivalent of the received value
   * @memberof TYPE
   */

  function toBoolean(value) {
    var val = valOrDefault(value, false);
    return val === true || val.toString().toLowerCase() === 'true';
  }

  exports.boolToInt = boolToInt;
  exports.camelCase = camelCase;
  exports.capitalize = capitalize;
  exports.capitalizeFirstLetter = capitalizeFirstLetter;
  exports.cloneObject = cloneObject;
  exports.compareTime = compareTime;
  exports.defProp = defProp;
  exports.formatDate = formatDate;
  exports.hasOwn = hasOwn;
  exports.insert = insert;
  exports.isDate = isDate;
  exports.isDerivedOf = isDerivedOf;
  exports.isEmpty = isEmpty;
  exports.isFunction = isFunction;
  exports.isIterable = isIterable;
  exports.isNull = isNull;
  exports.isNullOrUndefined = isNullOrUndefined;
  exports.isNullOrWhitespace = isNullOrWhitespace;
  exports.isObject = isObject;
  exports.isString = isString;
  exports.isUndefined = isUndefined;
  exports.last = last;
  exports.parseTime = parseTime;
  exports.pascalCase = pascalCase;
  exports.removeAccents = removeAccents;
  exports.shortDate = shortDate;
  exports.shortDateTime = shortDateTime;
  exports.timeAgo = timeAgo;
  exports.toBoolean = toBoolean;
  exports.valOrDefault = valOrDefault;

  return exports;

}({}));
