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
   * @param {boolean} isNullable indicates whether the value can be assigned the value *NULL*
   * @memberof TYPE
   */
  function valOrDefault(arg, value, isNullable) {
    if (isNullable === true) {
      return isUndefined(arg) ? value : arg;
    }

    return isNullOrUndefined(arg) ? value : arg;
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
  /**
   * Determines whether the value is an *integer*
   * @param {*} value Tested value
   * @returns {boolean}  A value indicating whether or not the given value is an *integer*.
   * @memberof TYPE
   */

  function isInt(value) {
    return Number.isInteger ? Number.isInteger(value) : typeof value === 'number' && value % 1 === 0;
  }
  /**
   * Returns a value indicating whether the value is empty
   * @param {Object[]|string} arr array
   * @memberof TYPE
   */

  function isEmpty(val) {
    return (Array.isArray(val) || isString(val)) && val.length === 0;
  }
  /**
   * Returns a value indicating whether the variable is a Date
   * @param {*} value 
   * @memberof TYPE
   */

  function isDate(value) {
    return value instanceof Date || _typeof(value) === 'object' && Object.prototype.toString.call(value) === '[object Date]';
  }
  /**
   * Returns a value indicating whether the variable is a String
   * @returns {boolean}
   * @memberof TYPE
   */

  function isString(str) {
    return typeof str === 'string' || str instanceof String;
  }
  /**
   * Returns a value indicating whether the value is a Function
   * @returns {boolean}
   * @memberof TYPE
   */

  function isFunction(value) {
    return typeof value === 'function';
  }
  /**
   * Returns a value indicating whether the value is an Object
   * @returns {boolean}
   * @memberof TYPE
   */

  function isObject(value) {
    return !isNull(value) && _typeof(value) === 'object';
  }
  /**
   * Returns a value indicating whether the value is null
   * @returns {boolean}
   * @memberof TYPE
   */

  function isNull(value) {
    return value === null;
  }
  /**
   * Returns a value indicating whether the value is undefined
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
   * @param {Object[]} arr array
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
   * @param {Object[]} arr array
   * @memberof TYPE
   */

  function last(arr) {
    if (Array.isArray(arr) && arr.length - 1) {
      return arr[arr.length - 1];
    }

    return undefined;
  }

  /**
   * Returns a value indicating the day of the week with monday = 0
   * @param {Date} date 
   * @memberof TYPE
   */

  function dayOfWeek(date) {
    var d = date.getDay();
    return d == 0 ? 6 : d - 1;
  } // Compare 2 times and returns
  //  1 if t1 > t2
  //  0 if t1 = t2
  // -1 if t1 < t2

  function compareTime(t1, t2) {
    var arr1 = t1.split(':');
    var arr2 = t2.split(':'); // hour comparison

    if (+arr1[0] > +arr2[0]) return 1;else if (+arr1[0] < +arr2[0]) return -1;else {
      // minute comparison
      if (+arr1[1] > +arr2[1]) return 1;else if (+arr1[1] < +arr2[1]) return -1;else {
        if (arr1.length == arr2.length && arr1.length == 3) {
          // second comparison
          if (+arr1[2] > +arr2[2]) return 1;else if (+arr1[2] < +arr2[2]) return -1;
        }

        return 0;
      }
    }
  }
  function parseTime(n) {
    var hh = +n | 0;
    var mm = '00';
    if (!isInt(+n)) mm = (n + '').split('.')[1] * 6;
    return hh + ':' + mm;
  } // Returns a date using the format "YYYY-mm-dd"

  function shortDate(myDate) {
    var d = new Date(myDate);
    var dd = d.getDate();
    var mm = d.getMonth() + 1; // January = 0

    var yyyy = d.getFullYear();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    d = yyyy + '-' + mm + '-' + dd;
    return d;
  } // Returns a date and time using the format "YYYY-mm-dd hh:MM"

  function longDate(myDate) {
    var d = new Date(myDate);
    var hh = d.getHours();
    var MM = d.getMinutes();
    if (MM < 10) MM = '0' + MM;
    d = shortDate(d) + ' ' + hh + ':' + MM;
    return d;
  } // Convertie une date de string (YYYY-MM-DD) en format Date

  function parseDate(strDate) {
    var arrDate = strDate.split('-');
    return new Date(arrDate[0], arrDate[1] - 1, arrDate[2], 0, 0, 0, 0);
  } // Convertie une date de string (YYYY-MM-DD hh:mm) en format Date

  function parseDateTime(strDate) {
    var arrDateTime = strDate.split(' ');
    var arrTime = arrDateTime[1].split(':');
    var d = parseDate(arrDateTime[0]).setHours(+arrTime[0], +arrTime[1]);
    return new Date(d);
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

  function timeAgo(time, callback) {
    callback = valOrDefault(callback, timeAgoResponse);
    var seconds = Math.floor((Date.now() - new Date(time).getTime()) / 1000);
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

  /**
   * Returns the index or value of the first element in the object
   * @param {Object|Array} obj 
   * @param {any} value 
   * @memberof TYPE
   */
  function find(obj, value) {
    if (Array.isArray(obj)) {
      var index = obj.indexOf(value);
      if (index !== -1) return index;
    } else {
      var _arr = Object.keys(obj);

      for (var _i = 0; _i < _arr.length; _i++) {
        var e = _arr[_i];

        if (obj[e] === value || obj[e].val === value) {
          return e;
        }
      }
    }

    return undefined;
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
   * Returns a boolean indicating whether the object (child) inherit from another (parent)
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
   * Returns a value indicating whether a string is null or made of whitespace.
   * @param {string} str string
   * @memberof TYPE
   */

  function isNullOrWhitespace(str) {
    return !str || isString(str) && (str.length === 0 || /^\s*$/.test(str));
  }
  /**
   * Capitalizes all words in a sequence
   * @param {string} str Sequence
   * @returns {string} Capitalized sequence
   * @memberof TYPE
   */

  function capitalize(str) {
    return str.replace(/\b\w/g, function (s) {
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
   * Removes all accents from a string
   * @param {*} str string
   * @returns {string}
   * @memberof TYPE
   */

  function removeAccents(str) {
    if (String.prototype.normalize) {
      return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    }

    return str.replace(/[àâäæ]/gi, 'a').replace(/[ç]/gi, 'c').replace(/[éèê]/gi, 'e').replace(/[îï]/gi, 'i').replace(/[ôœ]/gi, 'o').replace(/[ùûü]/gi, 'u');
  }

  /** @namespace TYPE */
  // module.exports = require('./type-datetime');
  // module.exports = require('./type-iterable');
  // module.exports = require('./type-manip');
  // module.exports = require('./type-object');
  // module.exports = require('./type-string');

  exports.boolToInt = boolToInt;
  exports.capitalize = capitalize;
  exports.capitalizeFirstLetter = capitalizeFirstLetter;
  exports.cloneObject = cloneObject;
  exports.compareTime = compareTime;
  exports.dayOfWeek = dayOfWeek;
  exports.defProp = defProp;
  exports.find = find;
  exports.hasOwn = hasOwn;
  exports.insert = insert;
  exports.isDate = isDate;
  exports.isDerivedOf = isDerivedOf;
  exports.isEmpty = isEmpty;
  exports.isFunction = isFunction;
  exports.isInt = isInt;
  exports.isNull = isNull;
  exports.isNullOrUndefined = isNullOrUndefined;
  exports.isNullOrWhitespace = isNullOrWhitespace;
  exports.isObject = isObject;
  exports.isString = isString;
  exports.isUndefined = isUndefined;
  exports.last = last;
  exports.longDate = longDate;
  exports.parseDate = parseDate;
  exports.parseDateTime = parseDateTime;
  exports.parseTime = parseTime;
  exports.removeAccents = removeAccents;
  exports.shortDate = shortDate;
  exports.timeAgo = timeAgo;
  exports.toBoolean = toBoolean;
  exports.valOrDefault = valOrDefault;

  return exports;

}({}));
