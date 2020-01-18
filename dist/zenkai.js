var zenkai = (function (exports) {
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

  /** 
   * Ajax namespace
   * @namespace AJAX 
   */
  var HttpResponse = {
    // Successful
    OK: 200,
    Created: 201,
    Accepted: 202,
    NoContent: 204,
    // Client Error
    BadRequest: 400,
    Unauthorized: 401,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
    NotAcceptable: 406,
    UnsupportedMediaType: 415,
    // Server Error
    InternalServerError: 500,
    NotImplemented: 501,
    BadGateway: 502,
    ServiceUnavaible: 503,
    GatewayTimeout: 504
  };
  var State = {
    OPENED: 1,
    RECEIVED: 2,
    LOADING: 3,
    DONE: 4
  };
  /**
   * An XHR resposne
   * @private
   * @typedef {Object} xhrResponse
   * @property {number} status - The response status code
   * @property {string} message - The response content
   */

  /**
   * @callback xhrCallback
   * @param  {xhrResponse} response - The XHR response object
   * @private
   */

  /**
   * This function creates and arranges the XMLHttpRequest object
   * @param {('GET'|'POST'|'PUT'|'DELETE')} type The HTTP method
   * @param {string} url The URL to send the request 
   * @param {*} successPred The success condition
   * @param {xhrCallback} successCb A callback function to handle a successful request
   * @param {xhrCallback} passCb A callback function to handle a valid request
   * @param {xhrCallback} failureCb A callback function to handle a failed request
   * @private
   */

  var xhrHandler = function xhrHandler(type, url, successPred, successCb, failureCb, passCb) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      var callback;

      if (xhr.readyState === State.DONE) {
        var response = createResponse(xhr.status, xhr.responseText);

        if (successPred(xhr.status)) {
          callback = successCb;
        } else {
          callback = failureCb;

          if (xhr.status >= 200 && xhr.status < 300 && isFunction(passCb)) {
            callback = passCb;
          }
        }

        if (isFunction(callback)) {
          callback(response);
        }
      }
    };

    xhr.open(type, url, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    return xhr;
  };

  function createResponse(status, content) {
    return {
      status: status,
      message: content
    };
  }
  /**
   * Sends a GET request
   * @param {string} url The URL to send the request 
   * @param {xhrCallback} [success] A callback function to handle a successful request
   * @param {xhrCallback} [fail] A callback function to handle a failed request
   * @memberof AJAX
   */


  function GET(url, success, fail, options) {
    options = valOrDefault(options, {});
    var _successPred = options.successPred;
    var successPred = isFunction(_successPred) ? _successPred : function (status) {
      return status === HttpResponse.OK;
    };
    var xhr = xhrHandler('GET', url, successPred, success, fail, options.pass);
    xhr.send();
  }
  /**
   * Sends a POST request
   * @param {string} url The URL to send the request 
   * @param {*} data The data to be sent in the request
   * @param {xhrCallback} [success] A callback function to handle a successful request
   * @param {xhrCallback} [fail] A callback function to handle a failed request
   * @memberof AJAX
   */

  function POST(url, data, success, fail, options) {
    options = valOrDefault(options, {});
    var _successPred = options.successPred;
    var successPred = isFunction(_successPred) ? _successPred : function (status) {
      return [HttpResponse.OK, HttpResponse.Created].includes(status);
    };
    var xhr = xhrHandler('POST', url, successPred, success, fail, options.pass);
    xhr.send(data);
  }
  /**
   * Sends a PUT request
   * @param {string} url The URL to send the request 
   * @param {*} data The data to be sent in the request
   * @param {xhrCallback} [success] A callback function to handle a successful request
   * @param {xhrCallback} [fail] A callback function to handle a failed request
   * @memberof AJAX
   */

  function PUT(url, data, success, fail, options) {
    options = valOrDefault(options, {});
    var _successPred = options.successPred;
    var successPred = isFunction(_successPred) ? _successPred : function (status) {
      return [HttpResponse.OK, HttpResponse.NoContent].includes(status);
    };
    var xhr = xhrHandler('PUT', url, successPred, success, fail, options.pass);
    xhr.send(data);
  }
  /**
   * Sends a DELETE request
   * @param {string} url The URL to send the request 
   * @param {*} data The data to be sent in the request
   * @param {xhrCallback} [success] A callback function to handle a successful request
   * @param {xhrCallback} [fail] A callback function to handle a failed request
   * @memberof AJAX
   */

  function DELETE(url, data, success, fail, options) {
    options = valOrDefault(options, {});
    var _successPred = options.successPred;
    var successPred = isFunction(_successPred) ? _successPred : function (status) {
      return [HttpResponse.OK, HttpResponse.Accepted, HttpResponse.NoContent].includes(status);
    };
    var xhr = xhrHandler('DELETE', url, successPred, success, fail, options.pass);
    xhr.send(data);
  }

  /**
   * @namespace MATH
   */

  /**
   * Return a random integer between min and max (inclusive).
   * @param {number} min 
   * @param {number} [max] 
   * @param {boolean} [secure] 
   * @memberof MATH
  */
  function random(min, max) {
    var secure = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (max == null) {
      max = min;
      min = 0;
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
   * @namespace PATH
   */
  /**
   * Append the path to the current path
   * @param {string} target 
   * @param {string} path 
   * @memberof PATH
   */

  function addPath(target, path) {
    return isNullOrWhitespace(target) ? path : target + '.' + path;
  }
  /**
   * Returns the directory of the path
   * @param {string} path 
   * @memberof PATH
   */

  function getDir(path) {
    return path.substring(0, path.lastIndexOf('.'));
  }
  /**
   * Returns the directory of the path from the target
   * @param {string} path 
   * @memberof PATH
   */

  function getDirTarget(path, target) {
    return path.substring(0, path.lastIndexOf(target) - 1);
  }

  function findByIndex(obj, match, prop) {
    var REGEX_DIGIT = /\d+/g;
    var index = +match[0].match(REGEX_DIGIT);
    return obj[prop][index];
  }
  /**
   * Returns an element in an object using its path
   * @param {Object} obj
   * @param {string} path  
   * @param {string} [_separator=.]
   * @memberof PATH
   */


  function findByPath(obj, path, _separator) {
    var REGEX_BRACKET_DIGIT = /\[\d+\]/g;
    var separator = valOrDefault(_separator, '.');
    var me = cloneObject(obj);

    var findHandler = function findHandler(part, regex, callback) {
      var match = part.match(regex);
      var prop = part.substring(0, part.indexOf('['));
      return callback(me, match, prop);
    };

    var parts = path.split(separator);

    for (var i = 0, len = parts.length; i < len; i++) {
      var part = parts[i];

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

  /**
   * Verifies that at least one value satisfies the condition
   * @param {*[]} values Set of values
   * @param {Function} fn Condition
   * @param {number} [min=1] Minimum number of values that must satisfy the condition
   * @returns {boolean} A value indicating whether at least one value satisfies the condition
   * @memberof LOGIC
   */
  var some = function some(values, fn) {
    var min = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

    if (min === 1) {
      for (var i = 0; i < values.length; i++) {
        if (fn(values[i])) {
          return true;
        }
      }

      return false;
    }

    return getHitCount(values, fn) >= min;
  };
  /**
   * Verifies that all the values satisfy the condition
   * @param {*[]} values Set of values
   * @param {Function} fn Condition
   * @returns {boolean} A value indicating whether all the values satisfy the condition
   * @memberof LOGIC
   */

  var all = function all(values, fn) {
    for (var i = 0; i < values.length; i++) {
      if (!fn(values[i])) {
        return false;
      }
    }

    return true;
  };
  /**
   * Verifies that exactly one value satisfies the condition
   * @param {*[]} values Set of values
   * @param {Function} fn Condition
   * @returns {boolean} A value indicating whether exactly one value satisfies the condition
   * @memberof LOGIC
   */

  var one = function one(values, fn) {
    return getHitCount(values, fn) === 1;
  };
  /**
   * Verifies that no value satisfies the condition
   * @param {*[]} values Set of values
   * @param {Function} fn Condition
   * @returns {boolean} A value indicating whether no value satisfies the condition
   * @memberof LOGIC
   */

  var no = function no(values, fn) {
    return !some(values, fn);
  };
  /**
   * 
   * @param {*} values 
   * @param {*} fn 
   * @private
   */

  /* istanbul ignore next */

  function getHitCount(values, fn) {
    var counter = 0;

    for (var i = 0; i < values.length; i++) {
      if (fn(values[i])) {
        counter++;
      }
    }

    return counter;
  }

  /**
   * @namespace URI
   */
  var encode = encodeURIComponent;
  /**
   * Extracts and returns the protocol and host of a given url
   * @param {string} url 
   * @memberof URI
   */

  function getRootUrl(url) {
    return url.toString().replace(/^(.*\/\/[^/?#]*).*$/, "$1");
  }
  /**
   * Extracts and returns the parameters of a URL
   * @param {string} [prop] Searched parameter
   * @param {string} [defValue] Searched parameter default value
   * @memberof URI
   */

  function getUrlParams(prop, defValue) {
    var search = decodeURIComponent(window.location.search);

    if (isNullOrWhitespace(search)) {
      return null;
    }

    var params = {};

    if ('URLSearchParams' in window) {
      var searchParams = new URLSearchParams(search.substring(1));
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = searchParams.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var pair = _step.value;
          params[pair[0]] = pair[1];
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (prop) {
        return searchParams.get(prop);
      }

      return params;
    }

    var defs = search.substring(1).split('&');
    defs.forEach(function (val) {
      var parts = val.split('=', 2);
      params[parts[0]] = parts[1];
    });

    if (prop) {
      return valOrDefault(params[prop], defValue);
    }

    return params;
  }
  /**
   * Creates a query string
   * @param {Object} query 
   * @returns {string} Query string
   * @memberof URI
   */


  function queryBuilder(query) {
    var ignoreNullOrEmpty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var str = [];
    Object.keys(query).forEach(function (prop) {
      if (!ignoreNullOrEmpty || !isNullOrWhitespace(query[prop])) {
        str.push("".concat(encode(prop), "=").concat(encode(query[prop])));
      }
    });
    return str.join('&');
  }

  /* istanbul ignore next */

  var isElementNode = function isElementNode(obj) {
    return !isNullOrUndefined(obj) && obj.nodeType === Node.ELEMENT_NODE;
  };
  /* istanbul ignore next */


  var isDocumentFragmentNode = function isDocumentFragmentNode(obj) {
    return !isNullOrUndefined(obj) && obj.nodeType === Node.DOCUMENT_FRAGMENT_NODE;
  };
  /**
   * Verifies that an object is a *Node*
   * @param {Element} obj 
   * @returns {boolean} Value indicating whether the object is an *Node*
   * @memberof DOM
   */


  var isNode = function isNode(obj) {
    return !isNullOrUndefined(obj) && obj instanceof Node;
  };
  /**
   * Verifies that an object is a *NodeList*
   * @param {Element} obj 
   * @returns {boolean} Value indicating whether the object is an *NodeList*
   * @memberof DOM
   */

  var isNodeList = function isNodeList(obj) {
    return !isNullOrUndefined(obj) && obj instanceof NodeList;
  };
  /**
   * Verifies that an object is an *Element*
   * @param {Element} obj 
   * @returns {boolean} Value indicating whether the object is an *Element*
   * @memberof DOM
   */

  var isElement = function isElement(obj) {
    return isElementNode(obj) && obj instanceof Element;
  };
  /**
   * Verifies that an object is an *HTMLElement*
   * @param {Element} obj 
   * @returns {boolean} Value indicating whether the object is an *HTMLElement*
   * @memberof DOM
   */

  var isHTMLElement = function isHTMLElement(obj) {
    return isElementNode(obj) && obj instanceof HTMLElement;
  };
  /**
   * Verifies that an object is an *HTMLCollection*
   * @param {Element} obj 
   * @returns {boolean} Value indicating whether the object is an *HTMLCollection*
   * @memberof DOM
   */

  var isHTMLCollection = function isHTMLCollection(obj) {
    return !isNullOrUndefined(obj) && obj instanceof HTMLCollection;
  };
  /**
   * Verifies that an object is an *DocumentFragment*
   * @param {Element} obj 
   * @returns {boolean} Value indicating whether the object is an *DocumentFragment*
   * @memberof DOM
   */

  var isDocumentFragment = function isDocumentFragment(obj) {
    return isDocumentFragmentNode(obj) && obj instanceof DocumentFragment;
  };
  /**
   * Creates a template with content
   * @param {string} html 
   * @returns {HTMLTemplateElement}
   * @private
   */

  /* istanbul ignore next */

  function createTemplate(html) {
    var template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content;
  }
  /**
   * Converts an html string to an HTML Element
   * @param {!string} html 
   * @returns {Node}
   * @memberof DOM
   */


  function htmlToElement(html) {
    if (!isString(html)) {
      console.error("dom-parse>htmlToElement(html): html must be a string");
      return null;
    }

    var template = createTemplate(html);
    return template.firstChild;
  }
  /**
   * Converts an html string to a list of HTML Elements
   * @param {!string} html 
   * @returns {NodeList}
   * @memberof DOM
   */

  function htmlToElements(html) {
    if (!isString(html)) {
      console.error("dom-parse>htmlToElements(html): html must be a string");
      return null;
    }

    var template = createTemplate(html);
    return template.childNodes;
  }

  /**
   * Inserts a given element before the targetted element
   * @param {!HTMLElement} target 
   * @param {!HTMLElement} element 
   * @memberof DOM
   */

  function insertBeforeElement(target, element) {
    if (!all([target, element], isElement)) {
      return null;
    }

    target.insertAdjacentElement('beforebegin', element);
    return target;
  }
  /**
   * Inserts a given element after the targetted element
   * @param {!HTMLElement} target 
   * @param {!HTMLElement} element 
   * @memberof DOM
   */

  function insertAfterElement(target, element) {
    if (!all([target, element], isElement)) {
      return null;
    }

    target.insertAdjacentElement('afterend', element);
    return target;
  }
  /**
   * Inserts a givern element as the first children of the targetted element
   * @param {!HTMLElement} target 
   * @param {!HTMLElement} element 
   * @memberof DOM
   */

  function preprendChild(target, element) {
    if (!all([target, element], isElement)) {
      return null;
    }

    target.insertAdjacentElement('afterbegin', element);
    return target;
  }
  /**
   * Append a list of elements to a node.
   * @param {Element} parent
   * @param {!HTMLElement[]|HTMLCollection} children
   * @returns {HTMLElement}
   * @memberof DOM
   */

  function appendChildren(parent, children) {
    if (!isNode(parent)) {
      return null;
    }

    if (!isHTMLCollection(children) && !isIterable(children) || isString(children)) {
      return null;
    }

    var fragment = document.createDocumentFragment();
    Array.from(children).forEach(function (element) {
      fragment.appendChild(isNode(element) ? element : document.createTextNode(element.toString()));
    });
    parent.appendChild(fragment);
    return parent;
  }

  /**
   * Removes additional spaces in class attribute
   * @param {string} c class attribute's value
   * @returns {string} formatted value
   * @private
   */

  var formatClass = function formatClass(c) {
    return c.replace(/\s+/g, ' ').trim();
  };
  /**
   * Transform a raw value to a valid class value
   * @param {string} c raw value
   * @returns {string} parsed value
   * @private
   */


  var parseClass = function parseClass(c) {
    if (isNullOrUndefined(c)) {
      return "";
    } else if (Array.isArray(c)) {
      return c.join(' ');
    } else {
      return c.toString();
    }
  };
  /**
   * Verifies that an element has a class
   * @param {!HTMLElement} element element
   * @param {string} className class
   * @returns {boolean} value indicating whether the element has the class
   * @memberof DOM
   */


  function hasClass(element, className) {
    if (!isHTMLElement(element)) {
      throw new Error("The given element is not a valid HTML Element");
    }

    return element.className.split(" ").includes(className);
  }
  /**
   * Removes a class from an element if it exists
   * @param {!HTMLElement} element element
   * @param {string|Array} attrClass class
   * @memberof DOM
   */

  function removeClass(element, attrClass) {
    if (!isHTMLElement(element)) {
      throw new Error("The given element is not a valid HTML Element");
    }

    var remove = function remove(el, c) {
      if (hasClass(el, c)) {
        el.className = el.className.replace(c, '');
      }
    };

    if (Array.isArray(attrClass)) {
      attrClass.forEach(function (val) {
        return remove(element, val);
      });
    } else {
      remove(element, attrClass);
    }

    element.className = formatClass(element.className);
    return element;
  }
  /**
   * Adds one or many classes to an element if it doesn't exist
   * @param {!HTMLElement} element Element
   * @param {string|string[]} attrClass classes
   * @returns {HTMLElement} the element
   * @memberof DOM
   */

  function addClass(element, attrClass) {
    if (!isHTMLElement(element)) {
      throw new Error("The given element is not a valid HTML Element");
    }

    var parsedClass = parseClass(attrClass);

    if (isNullOrWhitespace(element.className)) {
      element.className = parsedClass;
    } else if (!hasClass(element, parsedClass)) {
      element.className += " " + parsedClass;
    }

    element.className = formatClass(element.className);
    return element;
  }
  /**
   * Adds or removes a class from an element depending on the class's presence.
   * @param {!HTMLElement} element 
   * @param {string} attrClass ClassName
   * @returns {HTMLElement} the element
   * @memberof DOM
   */

  function toggleClass(element, attrClass) {
    if (!isHTMLElement(element)) {
      throw new Error("The given element is not a valid HTML Element");
    }

    if (hasClass(element, attrClass)) {
      removeClass(element, attrClass);
    } else {
      addClass(element, attrClass);
    }

    return element;
  }
  /**
   * Sets classes to an element
   * @param {!HTMLElement} element 
   * @param {string|string[]} attrClass classes 
   * @returns {HTMLElement} the element
   * @memberof DOM
   */

  function setClass(element, attrClass) {
    if (!isHTMLElement(element)) {
      throw new Error("The given element is not a valid HTML Element");
    }

    element.className = formatClass(parseClass(attrClass));
    return element;
  }

  /* istanbul ignore next */

  function echo(o) {}
  /**
   * Verifies that an object is an *HTML Select Element*
   * @param {Element} obj 
   * @returns {boolean} Value indicating whether the object is an *HTMLSelectElement*
   * @private
   */


  var isHTMLSelectElement = function isHTMLSelectElement(obj) {
    return isHTMLElement(obj) && obj instanceof HTMLSelectElement;
  };
  /**
   * Sets the attributes of an element
   * @param {!HTMLElement} element element
   * @param {Object} attribute attribute
   * @returns {HTMLElement}
   * @memberof DOM
   */

  function addAttributes(element, attribute) {
    if (!isHTMLElement(element)) {
      throw new Error("The given element is not a valid HTML Element");
    }

    var ATTR_MAP = {
      // Global attributes
      accesskey: [assign, 'accessKey'],
      "class": [setClass, element],
      data: [Object.assign, element.dataset],
      editable: [assign, 'contenteditable'],
      draggable: [assign],
      hidden: [assign],
      id: [assign],
      lang: [assign],
      html: [assign, 'innerHTML'],
      style: [assign],
      tabindex: [assign, 'tabIndex'],
      title: [assign],
      // Form attributes
      accept: [assign],
      disabled: [assign],
      placeholder: [assign],
      readonly: [assign, 'readOnly'],
      value: [assign]
    };
    var DEFAULT_MAP = [echo, '']; // HTML attributes

    for (var _i = 0, _Object$keys = Object.keys(attribute); _i < _Object$keys.length; _i++) {
      var key = _Object$keys[_i];
      var val = ATTR_MAP[key] || DEFAULT_MAP;
      val[0](val[1] || key, attribute[key]);
    }

    function assign(key, val) {
      element[key] = val;
    }

    return element;
  }
  /**
   * Changes the selected option of a `<select>` element
   * @param {!HTMLSelectElement} select
   * @param {string} val option value to select
   * @returns {boolean} value indicating whether the option was found and selected
   * @memberof DOM
   */

  function changeSelectValue(select, val) {
    if (!isHTMLSelectElement(select)) {
      throw new Error("The given element is not a valid HTML Select element");
    }

    var found = false;
    var options = select.options;

    for (var i = 0; !found && i < options.length; i++) {
      var option = options[i];

      if (option.value == val) {
        option.selected = true;
        found = true;
      }
    }

    return found;
  }
  /**
   * Moves an element out of screen
   * @param {!HTMLElement} element Element
   * @memberof DOM
   */

  function conceal(element) {
    if (!isHTMLElement(element)) {
      throw new Error("The given element is not a valid HTML Element");
    }

    Object.assign(element.style, {
      position: 'absolute',
      top: '-9999px',
      left: '-9999px'
    });
    return element;
  }

  /**
   * Creates an element
   * @param {string} tagName 
   * @param {object} [_attribute] 
   * @param {Text|HTMLElement|HTMLElement[]} [_children] 
   * @returns {HTMLElement}
   * @private
   */

  /* istanbul ignore next */

  function create(tagName, _attribute, _children) {
    var element = document.createElement(tagName);

    if (_attribute) {
      addAttributes(element, _attribute);
    }

    if (_children) {
      addContent(element, _children);
    }

    return element;
  }
  /**
   * Creates a document fragment
   * @function createDocFragment
   * @returns {DocumentFragment}
   * @memberof DOM
   */


  var createDocFragment = function createDocFragment() {
    return document.createDocumentFragment();
  };
  /**
   * Creates a text node
   * @function createTextNode
   * @param {string} text
   * @returns {Text}
   * @memberof DOM
   */

  var createTextNode = function createTextNode(text) {
    return document.createTextNode(text);
  };
  /**
   * Creates a `<link>` element with some attributes
   * @param {string} href 
   * @param {string} rel 
   * @returns {HTMLLinkElement}
   * @memberof DOM
   */

  function createLink(href, rel) {
    var link = create("link");

    if (href) {
      link.href = href;
    }

    if (rel) {
      link.rel = rel;
    }

    return link;
  }
  /**
   * Creates a `<template>` element with some attributes
   * @function createTemplate
   * @param {object} _attribute Global attributes
   * @param {Text|HTMLElement|HTMLElement[]} _children Content
   * @returns {HTMLTemplateElement}
   * @memberof DOM
   */

  var createTemplate$1 = create.bind(null, 'template');
  /**
   * Creates a `<header>` element with some attributes
   * @function createHeader
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createHeader = create.bind(null, 'header');
  /**
   * Creates an `<footer>` element with some attributes
   * @function createFooter
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createFooter = create.bind(null, 'footer');
  /**
   * Creates an `<main>` element with some attributes
   * @function createMain
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createMain = create.bind(null, 'main');
  /**
   * Creates an `<article>` element with some attributes
   * @function createArticle
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createArticle = create.bind(null, 'article');
  /**
   * Creates an `<section>` element with some attributes
   * @function createSection
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createSection = create.bind(null, 'section');
  /**
   * Creates an `<nav>` element with some attributes
   * @function createNav
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createNav = create.bind(null, 'nav');
  /**
   * Creates an `<aside>` element with some attributes
   * @function createAside
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createAside = create.bind(null, 'aside');
  /**
   * Creates a `<h1>` element with some attributes
   * @function createH1
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLHeadingElement}
   * @memberof DOM
   */

  var createH1 = create.bind(null, 'h1');
  /**
   * Creates a `<h2>` element with some attributes
   * @function createH2
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLHeadingElement}
   * @memberof DOM
   */

  var createH2 = create.bind(null, 'h2');
  /**
   * Creates a `<h3>` element with some attributes
   * @function createH3
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLHeadingElement}
   * @memberof DOM
   */

  var createH3 = create.bind(null, 'h3');
  /**
   * Creates a `<h4>` element with some attributes
   * @function createH4
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLHeadingElement}
   * @memberof DOM
   */

  var createH4 = create.bind(null, 'h4');
  /**
   * Creates a `<h5>` element with some attributes
   * @function createH5
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLHeadingElement}
   * @memberof DOM
   */

  var createH5 = create.bind(null, 'h5');
  /**
   * Creates a `<h6>` element with some attributes
   * @function createH6
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLHeadingElement}
   * @memberof DOM
   */

  var createH6 = create.bind(null, 'h6');
  /**
   * Creates a `<div>` element with some attributes
   * @function createDiv
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLDivElement}
   * @memberof DOM
   */

  var createDiv = create.bind(null, 'div');
  /**
   * Creates a `br` element \
   * Line break (carriage-return)
   * @function createLineBreak
   * @memberof DOM
   */

  var createLineBreak = function createLineBreak() {
    return create('br');
  };
  /**
   * Creates a `hr` element \
   * Thematic break
   * @function createThematicBreak
   * @memberof DOM
   */

  var createThematicBreak = function createThematicBreak() {
    return create('hr');
  };
  /**
   * Creates a `<p>` element with some attributes
   * @function createParagraph
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLParagraphElement}
   * @memberof DOM
   */

  var createParagraph = create.bind(null, 'p');
  /**
   * Creates a `<blockquote>` element with some attributes
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLQuoteElement}
   * @memberof DOM
   */

  function createBlockQuotation(cite, attribute, children) {
    var element = create('blockquote', attribute, children);

    if (cite) {
      element.cite = cite;
    }

    return element;
  }
  /**
   * Creates a `<ul>` element with some attributes
   * @function createUnorderedList
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLUListElement}
   * @memberof DOM
   */

  var createUnorderedList = create.bind(null, 'ul');
  /**
   * Creates a `<ol>` element with some attributes
   * @function createOrderedList
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLOListElement}
   * @memberof DOM
   */

  var createOrderedList = create.bind(null, 'ol');
  /**
   * Creates a `<li>` element with some attributes
   * @function createListItem
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLLIElement}
   * @memberof DOM
   */

  var createListItem = create.bind(null, 'li');
  /**
   * Creates a `<dl>` element with some attributes
   * @function createDescriptionList
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLDListElement}
   * @memberof DOM
   */

  var createDescriptionList = create.bind(null, 'dl');
  /**
   * Creates a `<dt>` element with some attributes
   * @function createDescriptionTerm
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createDescriptionTerm = create.bind(null, 'dt');
  /**
   * Creates a `<dd>` element with some attributes
   * @function createDescriptionDetails
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createDescriptionDetails = create.bind(null, 'dd'); // Inline Element

  /**
   * Creates an `<a>` element with some attributes
   * @param {string} href URL or a URL fragment that the hyperlink points to
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLAnchorElement}
   * @memberof DOM
   */

  function createAnchor(href, _attribute, _children) {
    var a = create('a', _attribute, _children);

    if (href) {
      a.href = href;
    }

    return a;
  }
  /**
    * Creates a `<img>` element with some attributes
    * @param {string} src
    * @param {string} alt
    * @param {object} _attribute 
    * @param {Text|HTMLElement|HTMLElement[]} _children 
    * @returns {HTMLImageElement}
    * @memberof DOM
    */

  function createImage(src, alt, _attribute) {
    var img = create('img', _attribute);

    if (src) {
      img.src = src;
    }

    if (alt) {
      img.alt = alt;
    }

    return img;
  }
  /**
    * Creates a `<audio>` element with some attributes
    * @param {string} src
    * @param {object} attribute 
    * @param {Text|HTMLElement|HTMLElement[]} children 
    * @returns {HTMLAudioElement}
    * @memberof DOM
    */

  function createAudio(src, attribute, children) {
    var audio = create('audio', attribute, children);

    if (src) {
      audio.src = src;
    }

    return audio;
  }
  /**
    * Creates a `<video>` element with some attributes
    * @param {string} src
    * @param {object} attribute 
    * @param {Text|HTMLElement|HTMLElement[]} children 
    * @returns {HTMLVideoElement}
    * @memberof DOM
    */

  function createVideo(src, attribute, children) {
    var video = create('video', attribute, children);

    if (src) {
      video.src = src;
    }

    return video;
  }
  /**
   * Creates a `<source>` element with some attributes
   * @function createSource
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLSourceElement}
   * @memberof DOM
   */

  var createSource = create.bind(null, "source");
  /**
   * Creates a `<picture>` element with some attributes
   * @function createPicture
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLPictureElement}
   * @memberof DOM
   */

  var createPicture = create.bind(null, "picture");
  /**
   * Creates a `<figure>` element with some attributes
   * @function createFigure
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createFigure = create.bind(null, "figure");
  /**
   * Creates a `<figcaption>` element with some attributes
   * @function createFigureCaption
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createFigureCaption = create.bind(null, "figcaption");
  /**
   * Creates a `<span>` element with some attributes
   * @function createSpan
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLSpanElement}
   * @memberof DOM
   */

  var createSpan = create.bind(null, "span");
  /**
   * Creates a `<strong>` element with some attributes
   * @function createStrong
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createStrong = create.bind(null, "strong");
  /**
   * Creates a `<em>` element with some attributes
   * @function createEmphasis
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createEmphasis = create.bind(null, "em");
  /**
   * Creates a `<mark>` element with some attributes
   * @function createMark
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createMark = create.bind(null, "mark");
  /**
   * Creates a `<samp>` element with some attributes
   * @function createSample
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createSample = create.bind(null, "samp");
  /**
   * Creates a `<sub>` element with some attributes
   * @function createSubscript
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createSubscript = create.bind(null, "sub");
  /**
   * Creates a `<sup>` element with some attributes
   * @function createSuperscript
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createSuperscript = create.bind(null, "sup");
  /**
   * Creates a `<q>` element with some attributes
   * @function createQuote
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLQuoteElement}
   * @memberof DOM
   */

  function createQuote(cite, _attribute, children) {
    var quote = create('q', _attribute, children);

    if (cite) {
      quote.cite = cite;
    }

    return quote;
  }
  /**
   * Creates a `<abbr>` element with some attributes
   * @function createAbbreviation
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createAbbreviation = create.bind(null, "abbr");
  /**
   * Creates a `<b>` element with some attributes
   * @function createB
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createB = create.bind(null, "b");
  /**
   * Creates a `<i>` element with some attributes
   * @function createI
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createI = create.bind(null, "i");
  /**
   * Creates a `<s>` element with some attributes
   * @function createS
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createS = create.bind(null, 's');
  /**
   * Creates a `<u>` element with some attributes
   * @function createU
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createU = create.bind(null, 'u');
  /**
   * Creates a `<cite>` element with some attributes
   * @function createCite
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createCite = create.bind(null, "cite");
  /**
   * Creates a `<time>` element with optionally some attributes
   * @param {string} datetime 
   * @param {object} attribute 
   * @returns {HTMLTimeElement}
   * @memberof DOM
   */

  function createTime(datetime, _attribute) {
    var element = create('time', _attribute);

    if (datetime) {
      element.datetime = datetime;
    }

    return element;
  }
  /**
   * Creates a `<code>` element with some attributes
   * @function createCode
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createCode = create.bind(null, "code");
  /**
   * Creates a `<form>` element with some attributes
   * @function createForm
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLLabelElement}
   * @memberof DOM
   */

  var createForm = create.bind(null, 'form');
  /**
   * Creates an `<input>` element with a specified type and 
   * optionally some attributes
   * @param {string} type
   * @param {object} _attribute 
   * @memberof DOM
   */

  function createInputAs(type, _attribute) {
    if (!["button", "checkbox", "color", "date", "datetime-local", "email", "file", "hidden", "image", "month", "number", "password", "radio", "range", "reset", "search", "submit", "tel", "text", "time", "url", "week"].includes(type)) {
      console.error("Input could not be created: the given type ".concat(type, " is not valid."));
      return null;
    }

    var input = create('input', _attribute);
    input.type = type;
    return input;
  }
  /**
   * Creates an `<input>` element with some attributes
   * @function createInput
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLInputElement}
   * @memberof DOM
   */

  var createInput = createInputAs.bind(null, "text");
  /**
   * Creates a `<label>` element with some attributes
   * @function createLabel
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLLabelElement}
   * @memberof DOM
   */

  var createLabel = create.bind(null, 'label');
  /**
   * Creates a `<fieldset>` element with some attributes
   * @function createFieldset
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLLabelElement}
   * @memberof DOM
   */

  var createFieldset = create.bind(null, 'fieldset');
  /**
   * Creates a `<legend>` element with some attributes
   * @function createLegend
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLLabelElement}
   * @memberof DOM
   */

  var createLegend = create.bind(null, 'legend');
  /**
   * Creates a `<datalist>` element with some attributes
   * @function createDataList
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLTextAreaElement}
   * @memberof DOM
   */

  var createDataList = create.bind(null, 'datalist');
  /**
   * Creates a `<select>` element with some attributes
   * @function createSelect
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLLabelElement}
   * @memberof DOM
   */

  var createSelect = create.bind(null, 'select');
  /**
   * Creates a `<option>` element with some attributes
   * @function createOption
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLLabelElement}
   * @memberof DOM
   */

  var createOption = create.bind(null, 'option');
  /**
   * Creates a `<optgroup>` element with some attributes
   * @function createOptionGroup
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLLabelElement}
   * @memberof DOM
   */

  var createOptionGroup = create.bind(null, 'optgroup');
  /**
   * Creates a `<textarea>` element with some attributes
   * @function createTextArea
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLTextAreaElement}
   * @memberof DOM
   */

  var createTextArea = create.bind(null, 'textarea');
  /**
   * Creates a `<meter>` element with some attributes
   * @function createMeter
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLTextAreaElement}
   * @memberof DOM
   */

  var createMeter = create.bind(null, 'meter');
  /**
   * Creates a `<progress>` element with some attributes
   * @function createProgress
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLTextAreaElement}
   * @memberof DOM
   */

  var createProgress = create.bind(null, 'progress');
  /**
   * Creates a `<output>` element with optionally some attributes and children elements
   * @function createOutput
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLTextAreaElement}
   * @memberof DOM
   */

  var createOutput = create.bind(null, 'output');
  /**
   * Creates a `<button>` element with a specified type and 
   * optionally some attributes and children elements
   * @param {string} type
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @memberof DOM
   */

  function createButtonAs(type, _attribute, _children) {
    if (!["submit", "reset", "button"].includes(type)) {
      console.error("Button could not be created: the given type ".concat(type, " is not valid."));
      return null;
    }

    var button = create("button", _attribute, _children);
    button.type = type;
    return button;
  }
  /**
   * Creates a `<button>` element with some attributes
   * @function createButton
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @memberof DOM
   */

  var createButton = createButtonAs.bind(null, "button");
  /**
   * Creates a `<table>` element with some attributes
   * @function createTable
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLTableElement}
   * @memberof DOM
   */

  var createTable = create.bind(null, "table");
  /**
   * Creates a `<caption>` element with some attributes
   * @function createCaption
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLTableCaptionElement}
   * @memberof DOM
   */

  var createCaption = create.bind(null, "caption");
  /**
   * Creates a `<thead>` element with some attributes
   * @function createTableHeader
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLTableSectionElement}
   * @memberof DOM
   */

  var createTableHeader = create.bind(null, "thead");
  /**
   * Creates a `<tbody>` element with some attributes
   * @function createTableBody
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLTableSectionElement}
   * @memberof DOM
   */

  var createTableBody = create.bind(null, "tbody");
  /**
   * Creates a `<tfoot>` element with some attributes
   * @function createTableFooter
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLTableSectionElement}
   * @memberof DOM
   */

  var createTableFooter = create.bind(null, "tfoot");
  /**
   * Creates a `<col>` element with some attributes
   * @function createTableColumn
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLTableColElement}
   * @memberof DOM
   */

  var createTableColumn = create.bind(null, "col");
  /**
   * Creates a `<colgroup>` element with some attributes
   * @function createTableColumnGroup
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLTableColElement}
   * @memberof DOM
   */

  var createTableColumnGroup = create.bind(null, "colgroup");
  /**
   * Creates a `<tr>` element with some attributes
   * @function createTableRow
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLTableRowElement}
   * @memberof DOM
   */

  var createTableRow = create.bind(null, "tr");
  /**
   * Creates a `<th>` element with some attributes
   * @function createTableHeaderCell
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLTableHeaderCellElement}
   * @memberof DOM
   */

  var createTableHeaderCell = create.bind(null, "th");
  /**
   * Creates a `<td>` element with some attributes
   * @function createTableCell
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLTableDataCellElement}
   * @memberof DOM
   */

  var createTableCell = create.bind(null, "td");
  /**
   * Appends the children to the element
   * @param {HTMLElement} element element
   * @param {HTMLCollection} children children elements
   * @private
   * @memberof DOM
   */

  /* istanbul ignore next */

  function addContent(element, children) {
    if (Array.isArray(children)) {
      appendChildren(element, children);
    } else if (isNode(children)) {
      element.appendChild(children);
    } else {
      element.textContent = children.toString();
    }

    return element;
  }

  /**
   * Checks whether the selector represents a `class`
   * @returns {boolean}
   * @private
   */

  var isClassSelector = function isClassSelector(selector) {
    return /^\.[a-zA-Z0-9_-]+$/.test(selector);
  };
  /**
   * Checks whether the selector represents an `id`
   * @returns {boolean}
   * @private
   */


  var isIdSelector = function isIdSelector(selector) {
    return /^#[a-zA-Z0-9_-]+$/.test(selector);
  };
  /**
   * Returns the first element within the specified container that matches the 
   * specified selector, group or selectors.
   * @param {!string} selector A DOMString containing one or more selectors to match
   * @param {HTMLElement|DocumentFragment} [_container] Container queried
   * @returns {HTMLElement|null} The first element matches that matches the specified set of CSS selectors.
   * @memberof DOM
   */


  function getElement(selector, _container) {
    var container = valOrDefault(_container, document);

    if (isNullOrWhitespace(selector)) {
      return null;
    }

    if (container instanceof DocumentFragment) {
      return container.querySelector(selector);
    }

    if (isIdSelector(selector)) {
      return document.getElementById(selector.substring(1));
    }

    if (isClassSelector(selector)) {
      return container.getElementsByClassName(selector.substring(1))[0];
    }

    return container.querySelector(selector);
  }
  /**
   * Returns all elements that match the selector query.
   * @param {!string} selector A DOMString containing one or more selectors to match
   * @param {HTMLElement|DocumentFragment} [_container] Container queried
   * @returns {HTMLCollection|NodeList} A live or *static* (not live) collection of the `container`'s children Element that match the `selector`.
   * @memberof DOM
   */

  function getElements(selector, _container) {
    var container = valOrDefault(_container, document);

    if (isNullOrWhitespace(selector)) {
      return null;
    }

    if (container instanceof DocumentFragment) {
      return container.querySelectorAll(selector);
    }

    if (isClassSelector(selector)) {
      return container.getElementsByClassName(selector.substring(1));
    }

    return container.querySelectorAll(selector);
  }
  /**
   * Returns the first Template within the specified container that matches the specified selector, group or selectors.
   * @param {string} selector A DOMString containing one or more selectors to match
   * @param {HTMLElement} [_container] Container queried
   * @returns {HTMLTemplateElement|null} The first Template matches that matches the specified set of CSS selectors.
   * @memberof DOM
   */

  function getTemplate(selector, _container) {
    return 'content' in document.createElement('template') ? getElement(selector, _container) : null;
  }
  /**
   * Returns a duplicate of the template.
   * @param {HTMLTemplateElement} template 
   * @param {boolean} deep used to decide whether the children of the template should also be clone
   * @returns {DocumentFragment} The template's clone.
   * @memberof DOM
   */

  function cloneTemplate(template, deep) {
    return template ? document.importNode(template.content, valOrDefault(deep, true)) : template;
  }
  /**
   * Gets the previous or next element of the specified element
   * @param {HTMLElement} el element
   * @param {string} dir sibling direction
   * @returns {(Element|null)} Element or null
   * @private
   */

  /* istanbul ignore next */

  function getElementSibling(el, dir, pred) {
    var predicate = function predicate(el) {
      return true;
    };

    if (isFunction(pred)) {
      predicate = function predicate(el) {
        return !isNullOrUndefined(el) && pred(el);
      };
    }

    var sibling = el[dir];

    while (!predicate(sibling)) {
      sibling = sibling[dir];
    }

    return sibling;
  }
  /**
   * Gets the previous element of the specified one in its parent's children list
   * @param {HTMLElement} el element
   * @param {*} predCb Search end condition
   * @returns {(Element|null)} Element or null if the specified element is the first one in the list
   * @memberof DOM
   */


  function getPreviousElementSibling(el, predCb) {
    return getElementSibling(el, "previousElementSibling", predCb);
  }
  /**
   * Gets the element following the specified one in its parent's children list
   * @param {HTMLElement} el element
   * @param {*} predCb Search end condition
   * @returns {(Element|null)} Element or null if the specified element is the last one in the list
   * @memberof DOM
   */

  function getNextElementSibling(el, predCb) {
    return getElementSibling(el, "nextElementSibling", predCb);
  }
  /**
   * Finds an ancestor of an element
   * @param {Element} target 
   * @param {Function} callback Decides whether the target is found
   * @param {number} [max] Maximum number of iterations
   * @returns {Element|null}
   * @memberof DOM
   */

  function findAncestor(target, callback, max) {
    if (!isElement(target)) {
      return null;
    }

    if (!isFunction(callback)) {
      return null;
    }

    var parent = target.parentElement;

    if (max > 0) {
      return findAncestorIter(parent, callback, max - 1);
    }

    return findAncestorInf(parent, callback);
  }
  /**
   * Look an ancestor of an element using a callback
   * @param {Element} target 
   * @param {Function} callback Decides whether the target is found
   * @private
   */

  /* istanbul ignore next */

  function findAncestorInf(target, callback) {
    if (isNullOrUndefined(target)) {
      return null;
    }

    if (callback(target)) {
      return target;
    }

    return findAncestorInf(target.parentElement, callback);
  }
  /**
   * Look for an ancestor of an element using a callback with a maximum number of iteration
   * @param {Element} target 
   * @param {Function} callback Decides whether the target is found
   * @param {number} [max] Maximum number of iterations
   * @private
   */

  /* istanbul ignore next */


  function findAncestorIter(target, callback, max) {
    if (isNullOrUndefined(target) || max === 0) {
      return null;
    }

    if (callback(target)) {
      return target;
    }

    return findAncestorIter(target.parentElement, callback, max - 1);
  }

  /**
   * Removes all children of a node from the DOM or 
   * those that satisfies the predicate function
   * @param {!Node} node 
   * @param {Function} [callback] Decides whether the node should be removed
   * @memberof DOM
   */

  function removeChildren(node, callback) {
    if (!isNode(node)) {
      return null;
    }

    if (!isFunction(callback)) {
      return removeAllChildren(node);
    }

    Array.from(node.childNodes).forEach(function (n) {
      if (callback(n)) {
        node.removeChild(n);
      }
    });
    return node;
  }
  /**
   * Removes all children of a node from the DOM
   * @param {!Node} node 
   * @private
   */

  /* istanbul ignore next */

  function removeAllChildren(node) {
    while (node.hasChildNodes()) {
      node.removeChild(node.lastChild);
    }

    return node;
  }

  /**
   * Gets the window's width
   * @memberof DOM
   */
  function windowWidth() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  }

  /**
   * Copy to clipboard
   * @param {HTMLElement|string} value 
   * @returns {boolean} Value indicating whether the the content has been succesfully copied to the clipboard
   * @memberof DOM
   */

  function copytoClipboard(value) {
    var element = createTextArea({
      value: isHTMLElement(value) ? value.textContent : value,
      readonly: true
    });
    document.body.appendChild(element);
    element.select();
    document.execCommand('copy');
    element.remove();
    return true;
  }

  var moveDown = function moveDown(label) {
    return addClass(label, 'down');
  };

  var moveUp = function moveUp(label) {
    return removeClass(label, 'down');
  };

  var addFocus = function addFocus(element) {
    return addClass(element, 'focused');
  };

  var removeFocus = function removeFocus(element) {
    return removeClass(element, 'focused');
  };

  function floatingLabel(form) {
    var labels = getElements('.form-label', form);

    for (var i = 0; i < labels.length; i++) {
      var label = labels[i];

      if (label.dataset['type'] == 'placeholder' && !isNullOrWhitespace(label.htmlFor)) {
        var input = getElement("#".concat(label.htmlFor));

        if (isHTMLElement(input)) {
          if (isNullOrWhitespace(input.placeholder)) {
            bindEvents(input, label);

            if (isEmpty(input.value)) {
              moveDown(label);
            }
          } else {
            console.warn("%c@zenkai%c #FloatingLabel>%cfloatingLabel:%c Input \"".concat(label.htmlFor, "\" contains a placeholder"), "text-decoration: underline", "", "font-weight: bold;", "font-weight: normal;");
          }
        } else {
          console.error("%c@zenkai%c #FloatingLabel>%cfloatingLabel:%c Missing input for label \"".concat(label.htmlFor, "\""), "text-decoration: underline", "", "font-weight: bold;", "font-weight: normal;");
        }
      }
    }
    /**
     * Bind DOM events
     * @param {HTMLInputElement} input 
     * @param {HTMLLabelElement} label 
     */


    function bindEvents(input, label) {
      if (isNullOrWhitespace(input.placeholder)) {
        input.addEventListener('focus', function (e) {
          console.log("focus called");
          input.placeholder = "";
          moveUp(label);
          addFocus(label.parentElement);
        });
        input.addEventListener('blur', function (e) {
          console.log("blur called");

          if (isEmpty(this.value)) {
            moveDown(label);
          }

          removeFocus(label.parentElement);
        });
        input.addEventListener('input', function (e) {
          console.log("input called"); // check if input does not have focus

          if (document.activeElement != input) {
            if (isEmpty(this.value)) {
              moveDown(label);
            } else {
              moveUp(label);
            }
          }
        });
      }
    }

    return labels;
  }

  /**
   * Add a counter to an input element
   * @param {HTMLElement} container 
   */

  function inputCounter(container) {
    var counters = getElements('[data-counter]', container);

    for (var i = 0; i < counters.length; i++) {
      var counter = counters[i];
      var ref = counter.dataset['counter'];
      var input = getElement("#".concat(ref));

      if (isHTMLElement(input)) {
        counter.dataset['counterMax'] = input.maxLength;
        counter.dataset['counterVal'] = input.value.length;
        bindEvents(input, counter);
      } else {
        console.error("%c@zenkai%c #InputCounter>%cinputCounter:%c Failed to add counter ".concat(ref, ". Input (referenced) was not found."), "text-decoration: underline", "", "font-weight: bold;", "font-weight: normal;");
      }
    }
    /**
     * Bind DOM events
     * @param {HTMLInputElement} input 
     * @param {HTMLElement} counter 
     */


    function bindEvents(input, counter) {
      input.addEventListener('input', function (e) {
        counter.dataset['counterVal'] = input.value.length;
      });
    }

    return counters;
  }

  var TYPE = 'type';
  var STATE = 'state';
  var CHECKED = 'checked';
  var UNCHECKED = 'unchecked';
  var getType = function getType(element) {
    return element.dataset[TYPE];
  };
  var getState = function getState(element) {
    return element.dataset[STATE];
  };
  var setState = function setState(element, value) {
    return element.dataset[STATE] = value;
  };
  var check = function check(element, value) {
    return setState(element, valOrDefault(value, CHECKED));
  };
  var uncheck = function uncheck(element, value) {
    return setState(element, valOrDefault(value, UNCHECKED));
  };
  function getComponentElement(container, pred, selector) {
    if (isHTMLElement(container)) {
      return pred(container) ? [container] : getElements(selector, container);
    } else if (isString(container) && !isEmpty(container)) {
      var _container = getElement(container);

      return isNullOrUndefined(_container) ? null : getComponentElement(_container);
    } else if (isNullOrUndefined(container)) {
      return getElements(selector);
    }

    return null;
  }

  function getInput(type, label) {
    if (isNullOrWhitespace(label.htmlFor)) {
      return getElement("input[type='".concat(valOrDefault(type, 'text'), "']"), label);
    }

    return getElement("#".concat(label.htmlFor));
  }

  var Status = {
    ON: 'on',
    OFF: 'off'
  };
  var BaseSelectorItem = {
    init: function init(args) {
      Object.assign(this, args);

      if (this.isChecked()) {
        check(this.container, Status.ON);
      }

      return this;
    },

    /** @type {HTMLElement} */
    container: null,

    /** @type {number} */
    index: null,

    /** @returns {string} */
    get value() {
      return this.container.dataset['value'];
    },

    /** @returns {boolean} */
    isChecked: function isChecked() {
      return getState(this.container) === Status.ON;
    },

    /** @returns {boolean} */
    setChecked: function setChecked(isChecked) {
      if (isNullOrUndefined(isChecked)) {
        return false;
      }

      if (isChecked) {
        check(this.container, Status.ON);
      } else {
        uncheck(this.container, Status.OFF);
      }

      return true;
    }
  };
  var BaseSelector = {
    name: 'selector',

    /** @type {HTMLElement} */
    container: null,

    /** @type {HTMLElement[]} */
    items: null,

    /** @type {number} */
    selectedIndex: null,

    /** @type {HTMLElement} */
    selectedItem: null,

    /** @type {Function} */
    beforeChange: null,

    /** @type {Function} */
    afterChange: null,

    get value() {
      return this.selectedItem.value;
    },

    setSelectedItem: function setSelectedItem(item) {
      if (!this.items.includes(item)) {
        return null;
      }

      if (this.selectedItem) {
        this.selectedItem.setChecked(false);
      }

      this.selectedItem = item;
      this.selectedItem.setChecked(true);
      return true;
    },
    init: function init() {
      var value = this.container.dataset['value'];
      var defaultItem = null;

      for (var i = 0; i < this.items.length; i++) {
        var item = this.items[i];

        if (item.isChecked()) {
          this.setSelectedItem(item);
        }

        if (item.value === value) {
          defaultItem = item;
        }
      }

      if (isNull(this.selectedItem) && !isNull(defaultItem)) {
        this.setSelectedItem(defaultItem);
      }

      this.bindEvents();
      return this;
    },
    bindEvents: function bindEvents() {
      var _this = this;

      this.container.addEventListener('click', function (event) {
        var target = event.target;

        if (!hasOwn(target.dataset, 'selector')) {
          return;
        }

        var halt = false;

        if (isFunction(_this.beforeChange)) {
          halt = _this.beforeChange(_this, event) === false;
        }

        if (halt) {
          return;
        }

        var item = _this.items.find(function (i) {
          return i.index === +valOrDefault(target.dataset.selectorIndex, -1);
        });

        if (isNullOrUndefined(item)) {
          return;
        }

        _this.setSelectedItem(item);

        if (isFunction(_this.afterChange)) {
          _this.afterChange(_this, event);
        }
      });
    }
  };

  var Status$1 = {
    ON: 'on',
    OFF: 'off'
  };
  var FormSelectorItem = {
    init: function init(args) {
      Object.assign(this, args);

      if (this.isChecked()) {
        check(this.container, Status$1.ON);
      }

      return this;
    },

    /** @type {HTMLElement} */
    container: null,

    /** @type {HTMLInputElement} */
    input: null,

    /** @type {number} */
    index: null,

    /** @returns {string} */
    get value() {
      return this.input['value'];
    },

    /** @returns {boolean} */
    isChecked: function isChecked() {
      return this.input.checked;
    },

    /** @returns {boolean} */
    setChecked: function setChecked(isChecked) {
      if (isNullOrUndefined(isChecked)) {
        return false;
      }

      if (isChecked) {
        this.input.checked = true;
        check(this.container, Status$1.ON);
      } else {
        this.input.checked = false;
        uncheck(this.container, Status$1.OFF);
      }

      return true;
    }
  };
  var FormSelector = {
    name: 'form-selector',

    /** @type {HTMLElement} */
    container: null,

    /** @type {FormSelectorItem[]} */
    items: null,

    /** @type {number} */
    selectedIndex: null,

    /** @type {HTMLElement} */
    selectedItem: null,

    /** @type {Function} */
    beforeChange: null,

    /** @type {Function} */
    afterChange: null,

    get value() {
      return this.selectedItem.value;
    },

    setSelectedItem: function setSelectedItem(item) {
      if (!this.items.includes(item)) {
        return null;
      }

      if (this.selectedItem) {
        this.selectedItem.setChecked(false);
      }

      this.selectedItem = item;
      this.selectedItem.setChecked(true);
      return true;
    },
    init: function init() {
      var value = this.container.dataset['value'];
      var defaultItem = null;

      for (var i = 0; i < this.items.length; i++) {
        var item = this.items[i];

        if (item.isChecked()) {
          this.setSelectedItem(item);
        }

        if (item.value === value) {
          defaultItem = item;
        }
      }

      if (isNull(this.selectedItem) && !isNull(defaultItem)) {
        this.setSelectedItem(defaultItem);
      }

      this.bindEvents();
      return this;
    },
    bindEvents: function bindEvents() {
      var _this = this;

      this.container.addEventListener('change', function (event) {
        var target = event.target;
        var halt = false;

        if (isFunction(_this.beforeChange)) {
          halt = _this.beforeChange(_this, event) === false;
        }

        if (halt) {
          target.checked = false;

          _this.items[_this.selectedIndex].setChecked(true);

          return;
        }

        var item = _this.items.find(function (i) {
          return i.index === +valOrDefault(target.dataset.selectorIndex, -1);
        });

        if (isNullOrUndefined(item)) {
          return;
        }

        _this.setSelectedItem(item);

        if (isFunction(_this.afterChange)) {
          _this.afterChange(_this, event);
        }
      });
    }
  };

  var ErrorCode = {
    BAD_CONTAINER: 'BAD_CONTAINER',
    BAD_INPUT: 'BAD_INPUT'
  };

  var createDomQuery = function createDomQuery(selector) {
    return "[data-type=\"".concat(selector.name, "\"]");
  };

  var DOMQuerySelector = {
    BaseSelector: createDomQuery(BaseSelector),
    FormSelector: createDomQuery(FormSelector)
  };
  var Factory = {
    create: function create(container, options) {
      if (!isHTMLElement(container)) {
        return ErrorCode.BAD_CONTAINER;
      }

      var itemContainers = getElements('[data-selector]', container);

      if (!isNodeList(itemContainers)) {
        return ErrorCode.BAD_CONTAINER;
      }

      var widget = null;
      var items = [];

      switch (getType(container)) {
        case 'selector':
          for (var i = 0; i < itemContainers.length; i++) {
            var itemContainer = itemContainers[i];
            itemContainer.dataset.selectorIndex = i;
            var item = Object.create(BaseSelectorItem);
            item.init({
              container: itemContainer,
              index: i
            });
            items.push(item);
          }

          widget = Object.create(BaseSelector);
          break;

        case 'form-selector':
          for (var _i = 0; _i < itemContainers.length; _i++) {
            var _itemContainer = itemContainers[_i];
            _itemContainer.dataset.selectorIndex = _i;
            var input = getInput('radio', _itemContainer);

            if (!isHTMLElement(input)) {
              return ErrorCode.BAD_INPUT;
            }

            input.dataset.selectorIndex = _i;

            var _item = Object.create(FormSelectorItem);

            _item.init({
              container: _itemContainer,
              input: input,
              index: _i
            });

            items.push(_item);
          }

          widget = Object.create(FormSelector);
          break;
      }

      Object.assign(widget, options, {
        container: container,
        items: items,
        querySelector: createDomQuery(widget)
      });
      return widget;
    }
  };

  var ErrorHandler = {
    BAD_CONTAINER: new Error("Missing container: A selector requires a container"),
    BAD_INPUT: new Error("Missing input: FormSelector requires an input in the container")
  };

  var isSelector = function isSelector(element) {
    return RegExp('selector|form-selector').test(element.dataset['type']);
  };

  var domQuery = [DOMQuerySelector.BaseSelector, DOMQuerySelector.FormSelector].join(',');
  function Selector(container, _options) {
    var selectorElements = getComponentElement(container, isSelector, domQuery);
    var options = valOrDefault(_options, {});

    if (isNullOrUndefined(selectorElements)) {
      return null;
    }

    var selectors = [];

    for (var i = 0; i < selectorElements.length; i++) {
      var selector = Factory.create(selectorElements[i], options);

      if (hasOwn(ErrorHandler, selector)) {
        throw ErrorHandler[selector];
      }

      selector.init();
      selectors.push(selector);
    }

    return selectors;
  }
  var SelectorFactory = Factory;

  var ErrorCode$1 = {
    BAD_CONTAINER: 'BAD_CONTAINER',
    BAD_INPUT: 'BAD_INPUT'
  };
  var ErrorHandler$1 = {
    BAD_CONTAINER: new Error("Missing container: A switch requires a container"),
    BAD_INPUT: new Error("Missing input: FormSwitch requires an input in the container")
  };
  var Status$2 = {
    ON: 'on',
    OFF: 'off'
  };

  var createDomQuery$1 = function createDomQuery(selector) {
    return "[data-type=\"".concat(selector.name, "\"]");
  };

  var isSwitch = function isSwitch(element) {
    return RegExp('switch|form-switch').test(element.dataset['type']);
  };

  var SwitchFactory = {
    create: function create(container, options) {
      if (!isHTMLElement(container)) {
        return ErrorCode$1.BAD_CONTAINER;
      }

      var widget = null;
      var input = null;

      switch (getType(container)) {
        case 'switch':
          widget = Object.create(BaseSwitch);
          break;

        case 'form-switch':
          input = getInput('checkbox', container);

          if (!isHTMLElement(input)) {
            return ErrorCode$1.BAD_INPUT;
          }

          options.input = input;
          widget = Object.create(FormSwitch);
          break;
      }

      Object.assign(widget, options, {
        container: container,
        querySelector: createDomQuery$1(widget)
      });
      return widget;
    }
  };
  var BaseSwitch = {
    name: 'switch',

    /** @type {HTMLElement} */
    container: null,

    /** @type {Function} */
    beforeChange: null,

    /** @type {Function} */
    afterChange: null,

    get value() {
      return this.container.dataset['value'];
    },

    /**
     * Verifies that the switch is checked
     * @param {boolean} check 
     * @returns {boolean} A value indicating whether the switch is checked
     */
    isChecked: function isChecked() {
      return getState(this.container) === Status$2.ON;
    },

    /**
     * Changes the state of the switch
     * @param {boolean} isChecked 
     * @returns {boolean} A value indicating whether the operation was a success
     */
    setChecked: function setChecked(isChecked) {
      if (isNullOrUndefined(isChecked)) {
        return false;
      }

      if (isChecked) {
        check(this.container, Status$2.ON);
      } else {
        uncheck(this.container, Status$2.OFF);
      }

      return true;
    },
    toggle: function toggle() {
      if (this.isChecked()) {
        this.setChecked(false);
      } else {
        this.setChecked(true);
      }
    },
    init: function init(args) {
      Object.assign(this, args);

      if (this.isChecked()) {
        check(this.container, Status$2.ON);
      }

      this.bindEvents();
      return this;
    },
    bindEvents: function bindEvents() {
      var _this = this;

      this.container.addEventListener('click', function (event) {
        var halt = false;

        if (isFunction(_this.beforeChange)) {
          halt = _this.beforeChange(_this, event) === false;
        }

        if (halt) {
          return;
        }

        _this.toggle();

        if (isFunction(_this.afterChange)) {
          _this.afterChange(_this, event);
        }
      });
    }
  };
  var FormSwitch = {
    name: 'form-switch',

    /** @type {HTMLElement} */
    container: null,

    /** @type {HTMLInputElement} */
    input: null,

    /** @type {Function} */
    beforeChange: null,

    /** @type {Function} */
    afterChange: null,

    get value() {
      return this.input.value;
    },

    /**
     * Verifies that the switch is checked
     * @param {boolean} check 
     * @returns {boolean} A value indicating whether the switch is checked
     */
    isChecked: function isChecked() {
      return getState(this.container) === Status$2.ON;
    },

    /**
     * Changes the state of the switch
     * @param {boolean} isChecked 
     * @returns {boolean} A value indicating whether the operation was a success
     */
    setChecked: function setChecked(isChecked) {
      if (isNullOrUndefined(isChecked)) {
        return false;
      }

      this.input.checked = isChecked;

      if (isChecked) {
        check(this.container, Status$2.ON);
      } else {
        uncheck(this.container, Status$2.OFF);
      }

      return true;
    },
    toggle: function toggle() {
      if (this.isChecked()) {
        this.setChecked(false);
      } else {
        this.setChecked(true);
      }
    },
    init: function init(args) {
      Object.assign(this, args);

      if (this.input.checked) {
        this.setChecked(true);
      }

      this.bindEvents();
      return this;
    },
    bindEvents: function bindEvents() {
      var _this2 = this;

      this.input.addEventListener('change', function (event) {
        var halt = false;

        if (isFunction(_this2.beforeChange)) {
          halt = _this2.beforeChange(_this2, event) === false;
        }

        if (halt) {
          _this2.input.checked = !_this2.input.checked; // revert input checked state

          return;
        }

        _this2.toggle();

        if (isFunction(_this2.afterChange)) {
          _this2.afterChange(_this2, event);
        }
      });
    }
  };
  var domQuery$1 = [createDomQuery$1(BaseSwitch), createDomQuery$1(FormSwitch)].join(',');
  function Switch(container, _options) {
    var switcheElements = getComponentElement(container, isSwitch, domQuery$1);
    var options = valOrDefault(_options, {});

    if (isNullOrUndefined(switcheElements)) {
      return null;
    }

    var switches = [];

    for (var i = 0; i < switcheElements.length; i++) {
      var $switch = SwitchFactory.create(switcheElements[i], options);

      if (hasOwn(ErrorHandler$1, $switch)) {
        throw ErrorHandler$1[$switch];
      }

      $switch.init();
      switches.push($switch);
    }

    return switches;
  }

  /**
   * Shows an element
   * @param {HTMLElement} element
   */
  function show(element) {
    element.style.display = "block";
  }
  /**
   * Hides an element
   * @param {HTMLElement} element
   */

  function hide(element) {
    element.style.display = "none";
  }

  var ATTRIBUTE = 'collapsible';
  var ErrorCode$2 = {
    BAD_CONTAINER_COLLAPSIBLE: 'BAD_CONTAINER_COLLAPSIBLE',
    BAD_CONTAINER_ACCORDION: 'BAD_CONTAINER_ACCORDION'
  };
  var ErrorHandler$2 = {
    BAD_CONTAINER_COLLAPSIBLE: new Error("Missing container: A collapsible requires a container"),
    BAD_CONTAINER_ACCORDION: new Error("Missing container: An accordion requires a container")
  };
  var State$1 = {
    OPEN: 'expanded',
    CLOSED: 'collapsed'
  };

  var isCollapsible = function isCollapsible(el) {
    return ATTRIBUTE in el.dataset;
  };

  var isAccordion = function isAccordion(el) {
    return el.dataset['boost'] === 'accordion';
  };

  var CollapsibleFactory = {
    /** @returns {CollapsibleFactory} */
    create: function create(container, options) {
      if (!isHTMLElement(container)) {
        return ErrorCode$2.BAD_CONTAINER_COLLAPSIBLE;
      }

      var instance = Object.create(this);
      Object.assign(instance, options, {
        container: container
      });
      return instance;
    },
    name: 'collapsible',

    /** @type {HTMLElement} */
    container: null,

    /** @type {HTMLElement} */
    header: null,

    /** @type {HTMLElement} */
    content: null,

    /** @type {Function} */
    beforeOpen: null,

    /** @type {Function} */
    afterOpen: null,

    /** @type {Function} */
    beforeClose: null,

    /** @type {Function} */
    afterClose: null,
    getState: function getState() {
      return this.container.dataset[this.name];
    },
    setState: function setState(val) {
      this.container.dataset[this.name] = val;
    },

    /** Verifies that the container is collapsed (closed) */
    isCollapsed: function isCollapsed() {
      return this.getState() === State$1.CLOSED;
    },

    /** Verifies that the container is expanded (open) */
    isExpanded: function isExpanded() {
      return this.getState() === State$1.OPEN;
    },
    isClosed: false,
    isInitialized: false,

    /** Opens the container and calls the defined pre/post operations */
    open: function open() {
      if (this.isInitialized && !this.isClosed) {
        return this;
      }

      var halt = false;

      if (isFunction(this.beforeOpen)) {
        halt = this.beforeOpen(this) === false;
      }

      if (halt) {
        return this;
      }

      this.toggle(show, State$1.OPEN, addClass);

      if (isFunction(this.afterOpen)) {
        this.afterOpen(this);
      }

      this.isClosed = false;
      return this;
    },

    /** Closes the container and calls the defined pre/post operations */
    close: function close() {
      if (this.isInitialized && this.isClosed) {
        return this;
      }

      var halt = false;

      if (isFunction(this.beforeClose)) {
        halt = this.beforeClose(this) === false;
      }

      if (halt) {
        return this;
      }

      this.toggle(hide, State$1.CLOSED, removeClass);

      if (isFunction(this.afterClose)) {
        this.afterClose(this);
      }

      this.isClosed = true;
      return this;
    },
    toggle: function toggle(displayCb, state, classCb) {
      displayCb(this.content);
      this.setState(state);
      classCb(this.container, 'expanded');
    },
    init: function init(args) {
      Object.assign(this, args);
      this.header = getElement("[data-".concat(this.name, "-header]"), this.container);
      this.content = getElement("[data-".concat(this.name, "-content]"), this.container);

      if (this.isCollapsed()) {
        this.close();
      } else if (this.isExpanded()) {
        this.isClosed = true;
        this.open();
      }

      this.bindEvents();
      this.isInitialized = true;
      return this;
    },
    bindEvents: function bindEvents() {
      var _this = this;

      var container = this.container;
      var header = this.header;
      header.addEventListener('click', function (e) {
        var target = e.target;
        var targetCollapsible = findAncestor(target, function (el) {
          return _this.name in el.dataset;
        });

        if (container === targetCollapsible) {
          if (_this.isCollapsed()) {
            _this.open();
          } else if (header.parentNode === container) {
            _this.close();
          }
        }
      });
    }
  };
  var AccordionFactory = {
    /** @returns {AccordionFactory} */
    create: function create(container, options) {
      if (!isHTMLElement(container)) {
        return ErrorCode$2.BAD_CONTAINER_ACCORDION;
      }

      var instance = Object.create(this);
      Object.assign(instance, options, {
        container: container
      });
      return instance;
    },

    /** @type {HTMLElement} */
    container: null,

    /** @type {CollapsibleFactory[]} */
    sections: null,

    /** @type {CollapsibleFactory} */
    selectedSection: null,

    /** @type {Function} */
    beforeChange: null,

    /** @type {Function} */
    afterChange: null,
    init: function init() {
      var _this2 = this;

      this.sections = [];
      var accordionElements = getElements('[data-accordion]', this.container);

      for (var i = 0; i < accordionElements.length; i++) {
        var element = accordionElements[i];
        var collapsible = CollapsibleFactory.create(element, {
          name: 'accordion',
          index: i,
          afterOpen: function afterOpen(selected) {
            if (isFunction(_this2.beforeChange)) {
              _this2.beforeChange(selected);
            }

            _this2.sections.filter(function (section) {
              return section.index !== selected.index;
            }).forEach(function (other) {
              return other.close();
            });

            if (isFunction(_this2.afterChange)) {
              _this2.afterChange(selected);
            }

            _this2.selectedSection = selected;
          }
        });

        if (hasOwn(ErrorCode$2, collapsible)) {
          return collapsible;
        }

        this.sections.push(collapsible);
        collapsible.init();
      }

      return this;
    }
  };
  /**
   * Makes a container collapsible
   * @param {!HTMLElement} container 
   * @param {Object} [options]
   */

  function Collapsible(container, _options) {
    var collapsibleElements = getComponentElement(container, isCollapsible, '[data-collapsible]');
    var options = valOrDefault(_options, {});

    if (isNullOrUndefined(collapsibleElements)) {
      return null;
    }

    var collapsibles = [];

    for (var i = 0; i < collapsibleElements.length; i++) {
      var collapsible = CollapsibleFactory.create(collapsibleElements[i], options);

      if (hasOwn(ErrorHandler$2, collapsible)) {
        throw ErrorHandler$2[collapsible];
      }

      collapsible.init();
      collapsibles.push(collapsible);
    }

    return collapsibles;
  }
  /**
   * Transforms a container into an accordion
   * @param {!HTMLElement} container 
   * @param {Object} [_options]
   */

  function Accordion(container, _options) {
    var accordionElements = getComponentElement(container, isAccordion, '[data-boost=accordion]');
    var options = valOrDefault(_options, {});

    if (isNullOrUndefined(accordionElements)) {
      return null;
    }

    var accordions = [];

    for (var i = 0; i < accordionElements.length; i++) {
      var accordion = AccordionFactory.create(accordionElements[i], options);

      if (hasOwn(ErrorHandler$2, accordion)) {
        throw ErrorHandler$2[accordion];
      }

      accordion.init();
      accordions.push(accordion);
    }

    return accordions;
  }

  exports.Accordion = Accordion;
  exports.Collapsible = Collapsible;
  exports.DELETE = DELETE;
  exports.GET = GET;
  exports.POST = POST;
  exports.PUT = PUT;
  exports.Selector = Selector;
  exports.SelectorFactory = SelectorFactory;
  exports.Switch = Switch;
  exports.addAttributes = addAttributes;
  exports.addClass = addClass;
  exports.addPath = addPath;
  exports.all = all;
  exports.appendChildren = appendChildren;
  exports.boolToInt = boolToInt;
  exports.camelCase = camelCase;
  exports.capitalize = capitalize;
  exports.capitalizeFirstLetter = capitalizeFirstLetter;
  exports.changeSelectValue = changeSelectValue;
  exports.cloneObject = cloneObject;
  exports.cloneTemplate = cloneTemplate;
  exports.compareTime = compareTime;
  exports.conceal = conceal;
  exports.copytoClipboard = copytoClipboard;
  exports.createAbbreviation = createAbbreviation;
  exports.createAnchor = createAnchor;
  exports.createArticle = createArticle;
  exports.createAside = createAside;
  exports.createAudio = createAudio;
  exports.createB = createB;
  exports.createBlockQuotation = createBlockQuotation;
  exports.createButton = createButton;
  exports.createButtonAs = createButtonAs;
  exports.createCaption = createCaption;
  exports.createCite = createCite;
  exports.createCode = createCode;
  exports.createDataList = createDataList;
  exports.createDescriptionDetails = createDescriptionDetails;
  exports.createDescriptionList = createDescriptionList;
  exports.createDescriptionTerm = createDescriptionTerm;
  exports.createDiv = createDiv;
  exports.createDocFragment = createDocFragment;
  exports.createEmphasis = createEmphasis;
  exports.createFieldset = createFieldset;
  exports.createFigure = createFigure;
  exports.createFigureCaption = createFigureCaption;
  exports.createFooter = createFooter;
  exports.createForm = createForm;
  exports.createH1 = createH1;
  exports.createH2 = createH2;
  exports.createH3 = createH3;
  exports.createH4 = createH4;
  exports.createH5 = createH5;
  exports.createH6 = createH6;
  exports.createHeader = createHeader;
  exports.createI = createI;
  exports.createImage = createImage;
  exports.createInput = createInput;
  exports.createInputAs = createInputAs;
  exports.createLabel = createLabel;
  exports.createLegend = createLegend;
  exports.createLineBreak = createLineBreak;
  exports.createLink = createLink;
  exports.createListItem = createListItem;
  exports.createMain = createMain;
  exports.createMark = createMark;
  exports.createMeter = createMeter;
  exports.createNav = createNav;
  exports.createOption = createOption;
  exports.createOptionGroup = createOptionGroup;
  exports.createOrderedList = createOrderedList;
  exports.createOutput = createOutput;
  exports.createParagraph = createParagraph;
  exports.createPicture = createPicture;
  exports.createProgress = createProgress;
  exports.createQuote = createQuote;
  exports.createS = createS;
  exports.createSample = createSample;
  exports.createSection = createSection;
  exports.createSelect = createSelect;
  exports.createSource = createSource;
  exports.createSpan = createSpan;
  exports.createStrong = createStrong;
  exports.createSubscript = createSubscript;
  exports.createSuperscript = createSuperscript;
  exports.createTable = createTable;
  exports.createTableBody = createTableBody;
  exports.createTableCell = createTableCell;
  exports.createTableColumn = createTableColumn;
  exports.createTableColumnGroup = createTableColumnGroup;
  exports.createTableFooter = createTableFooter;
  exports.createTableHeader = createTableHeader;
  exports.createTableHeaderCell = createTableHeaderCell;
  exports.createTableRow = createTableRow;
  exports.createTemplate = createTemplate$1;
  exports.createTextArea = createTextArea;
  exports.createTextNode = createTextNode;
  exports.createThematicBreak = createThematicBreak;
  exports.createTime = createTime;
  exports.createU = createU;
  exports.createUnorderedList = createUnorderedList;
  exports.createVideo = createVideo;
  exports.defProp = defProp;
  exports.findAncestor = findAncestor;
  exports.findByPath = findByPath;
  exports.floatingLabel = floatingLabel;
  exports.formatDate = formatDate;
  exports.getDir = getDir;
  exports.getDirTarget = getDirTarget;
  exports.getElement = getElement;
  exports.getElements = getElements;
  exports.getNextElementSibling = getNextElementSibling;
  exports.getPreviousElementSibling = getPreviousElementSibling;
  exports.getRootUrl = getRootUrl;
  exports.getTemplate = getTemplate;
  exports.getUrlParams = getUrlParams;
  exports.hasClass = hasClass;
  exports.hasOwn = hasOwn;
  exports.htmlToElement = htmlToElement;
  exports.htmlToElements = htmlToElements;
  exports.inputCounter = inputCounter;
  exports.insert = insert;
  exports.insertAfterElement = insertAfterElement;
  exports.insertBeforeElement = insertBeforeElement;
  exports.isDate = isDate;
  exports.isDerivedOf = isDerivedOf;
  exports.isDocumentFragment = isDocumentFragment;
  exports.isElement = isElement;
  exports.isEmpty = isEmpty;
  exports.isFunction = isFunction;
  exports.isHTMLCollection = isHTMLCollection;
  exports.isHTMLElement = isHTMLElement;
  exports.isHTMLSelectElement = isHTMLSelectElement;
  exports.isIterable = isIterable;
  exports.isNode = isNode;
  exports.isNodeList = isNodeList;
  exports.isNull = isNull;
  exports.isNullOrUndefined = isNullOrUndefined;
  exports.isNullOrWhitespace = isNullOrWhitespace;
  exports.isObject = isObject;
  exports.isString = isString;
  exports.isUndefined = isUndefined;
  exports.last = last;
  exports.no = no;
  exports.one = one;
  exports.parseTime = parseTime;
  exports.pascalCase = pascalCase;
  exports.preprendChild = preprendChild;
  exports.queryBuilder = queryBuilder;
  exports.random = random;
  exports.removeAccents = removeAccents;
  exports.removeChildren = removeChildren;
  exports.removeClass = removeClass;
  exports.setClass = setClass;
  exports.shortDate = shortDate;
  exports.shortDateTime = shortDateTime;
  exports.some = some;
  exports.timeAgo = timeAgo;
  exports.toBoolean = toBoolean;
  exports.toggleClass = toggleClass;
  exports.valOrDefault = valOrDefault;
  exports.windowWidth = windowWidth;

  return exports;

}({}));
