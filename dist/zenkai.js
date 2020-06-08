var zenkai = (function (exports) {
  'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

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

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;

    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = o[Symbol.iterator]();
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  /**
   * Returns an object value or default value if undefined
   * @param {*} arg object
   * @param {*} value default value
   * @param {boolean} [isNullable=false] indicates whether the value can be assigned the value *NULL*
   * @memberof STD
   */
  function valOrDefault(arg, value) {
    var isNullable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

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
    return value instanceof Date || _typeof(value) === 'object' && Object.prototype.toString.call(value) === '[object Date]';
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
    return !isNullOrUndefined(value) && _typeof(value) === 'object';
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
    return !value || isString(value) && (value.length === 0 || /^\s*$/.test(value));
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
   * @memberof STD
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
   * @memberof STD
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
   * @memberof STD
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
   * @memberof STD
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
   * Creates a fetch request with a time limit to resolve the request
   * @param {URI} uri 
   * @param {*} options 
   * @param {number} time 
   * @memberof STD
   */

  function fetchWithTimeout(uri) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var time = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5000;
    // Lets set up our `AbortController`, and create a request options object
    // that includes the controller's `signal` to pass to `fetch`.
    var controller = new AbortController();

    var config = _objectSpread2(_objectSpread2({}, options), {}, {
      signal: controller.signal
    }); // Set a timeout limit for the request using `setTimeout`. If the body of this
    // timeout is reached before the request is completed, it will be cancelled.


    var timeout = setTimeout(function () {
      controller.abort();
    }, time);
    return fetch(uri, config).then(function (response) {
      if (!response.ok) {
        throw new Error("".concat(response.status, ": ").concat(response.statusText));
      }

      return response;
    })["catch"](function (error) {
      // When we abort our `fetch`, the controller conveniently throws a named
      // error, allowing us to handle them separately from other errors.
      if (error.name === 'AbortError') {
        throw new Error('Response timed out');
      }

      throw new Error(error.message);
    });
  }

  /**
   * Compare 2 times
   * @param {string} t1 time 1
   * @param {string} t2 time 2
   * @param {string} [separator=":"]
   * @returns {number} 1, 0, -1 if t1 > t2, t1 = t2 and t1 < t2 respectively
   * @memberof STD
   */

  function compareTime(t1, t2) {
    var separator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ":";

    if (isNullOrUndefined(t1) || isNullOrUndefined(t2) || !t1.includes(separator) || !t2.includes(separator)) {
      return null;
    }

    var arr1 = t1.split(separator);
    var arr2 = t2.split(separator); // hour comparison

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

  function resolveDate(value) {
    var useOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

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

  var hasOwnProperty = Object.prototype.hasOwnProperty;
  /** @private */

  var isPrototypeOf = Object.prototype.isPrototypeOf;
  /**
   * Returns a boolean indicating whether the object has the specified property as its own property (not inherited).
   * @param {*} obj target object
   * @param {string} key name of the property
   * @memberof STD
   */

  var hasOwn = function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
  };
  /**
   * Returns a boolean indicating whether the object (child) inherit from another object (parent)
   * @param {*} child 
   * @param {*} parent 
   * @memberof STD
   */

  var isDerivedOf = function isDerivedOf(child, parent) {
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

    return str.toLowerCase().replace(/\b\w/g, function (s) {
      return s.toUpperCase();
    });
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
  var CaseHandler = {
    'camel': function camel(str) {
      return camelCase(str);
    },
    'pascal': function pascal(str) {
      return pascalCase(str);
    },
    'upper': function upper(str) {
      return str.toUpperCase();
    },
    'lower': function lower(str) {
      return str.toLowerCase();
    }
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

    return str.replace(/[àâäæ]/gi, 'a').replace(/[ç]/gi, 'c').replace(/[éèê]/gi, 'e').replace(/[îï]/gi, 'i').replace(/[ôœ]/gi, 'o').replace(/[ùûü]/gi, 'u');
  }

  /**
   * Converts the received boolean value to an integer
   * @param {boolean} value 
   * @returns {number} 1 or 0
   * @memberof STD
   */

  function boolToInt(value) {
    return value ? 1 : 0;
  }
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

  var assert = function assert(values, pred, min, max) {
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

  var some = function some(values, pred) {
    if (!(Array.isArray(values) && isFunction(pred))) {
      throw new TypeError("Bad argument");
    }

    for (var i = 0; i < values.length; i++) {
      var value = values[i];

      if (pred.apply(void 0, _toConsumableArray(Array.isArray(value) ? value : [value]))) {
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

  var all = function all(values, pred) {
    if (!(Array.isArray(values) && isFunction(pred))) {
      throw new TypeError("Bad argument");
    }

    for (var i = 0; i < values.length; i++) {
      var value = values[i];

      if (!pred.apply(void 0, _toConsumableArray(Array.isArray(value) ? value : [value]))) {
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

  var one = function one(values, pred) {
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

  var no = function no(values, pred) {
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

  var lone = function lone(values, pred) {
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

    for (var i = 0; i < values.length; i++) {
      var value = values[i];

      if (pred.apply(void 0, _toConsumableArray(Array.isArray(value) ? value : [value]))) {
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
  function random(min, max) {
    var secure = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

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

  function addPath(target, path) {
    var separator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ".";
    return isNullOrWhitespace(target) ? path : "".concat(target).concat(separator).concat(path);
  }
  /**
   * Returns the directory of the path
   * @param {string} path 
   * @param {string} [separator="."] 
   * @memberof STD
   */

  function getDir(path) {
    var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ".";
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
    var REGEX_DIGIT = /\d+/g;
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


  function findByPath(obj, path) {
    var separator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ".";
    var REGEX_BRACKET_DIGIT = /\[\d+\]/g;
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
   * Gets the window's width
   * @memberof DOM
   */
  var windowWidth = function windowWidth() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  };
  /**
   * Gets the window's height
   * @memberof DOM
   */

  var windowHeight = function windowHeight() {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  };

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
    return obj instanceof Node;
  };
  /**
   * Verifies that an object is a *NodeList*
   * @param {Element} obj 
   * @returns {boolean} Value indicating whether the object is an *NodeList*
   * @memberof DOM
   */

  var isNodeList = function isNodeList(obj) {
    return obj instanceof NodeList;
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
   * Verifies that an object is an *HTML Element*
   * @param {Element} obj 
   * @param {string|string[]|string[][]} [kind] 
   * @returns {boolean} Value indicating whether the object is an *HTMLElement*
   * @memberof DOM
   */

  var isHTMLElement = function isHTMLElement(obj, kind) {
    if (!(isElementNode(obj) && obj instanceof HTMLElement)) {
      return false;
    }

    if (isIterable(kind)) {
      return isHTMLElementKind(obj, Array.isArray(kind) ? kind : [kind]);
    }

    return true;
  };
  var TagNameMapping = {
    'a': "Anchor",
    'br': "BR",
    'dl': "DList",
    'datalist': "DataList",
    'fieldset': "FieldSet",
    'frameset': "FrameSet",
    'hr': "HR",
    'h1': "Heading",
    'h2': "Heading",
    'h3': "Heading",
    'h4': "Heading",
    'h5': "Heading",
    'h6': "Heading",
    'li': "LI",
    'ol': "OList",
    'optgroup': "OptGroup",
    'p': "Paragraph",
    'q': "Quote",
    'blockquote': "Quote",
    'caption': "TableCaption",
    'td': "TableCell",
    'th': "TableCell",
    'col': "TableCol",
    'tr': "TableRow",
    'tbody': "TableSection",
    'thead': "TableSection",
    'tfoot': "TableSection",
    'textarea': "TextArea",
    'ul': "UList"
  };
  /**
   * Verifies the tag of an *HTML Element*
   * @param {HTMLElement} element 
   * @param {string[]|string[][]} kinds
   * @returns {boolean}
   * @private
   */

  function isHTMLElementKind(element, kinds) {
    var isInstanceOf = function isInstanceOf(obj) {
      return element instanceof obj;
    };

    var hasTag = function hasTag(tag) {
      return element.tagName === tag.toUpperCase();
    };

    var isOfType = function isOfType(type) {
      return Array.isArray(type) ? type.includes(element.type) : element.type === type;
    };

    return kinds.some(function (kind) {
      if (!isIterable(kind)) {
        return false;
      }

      var name = kind;
      var type = null;

      if (Array.isArray(kind)) {
        var _kind = _slicedToArray(kind, 2);

        name = _kind[0];
        type = _kind[1];
      }

      name = name.toLowerCase();
      var interfaceName = "HTML".concat(hasOwn(TagNameMapping, name) ? TagNameMapping[name] : pascalCase(name), "Element");

      if (!(isInstanceOf(window[interfaceName]) || hasTag(name))) {
        return false;
      }

      if (isCollection(type) && !isEmpty(type)) {
        return isOfType(type);
      }

      return true;
    });
  }
  /**
   * Verifies that an object is an *HTMLCollection*
   * @param {Element} obj 
   * @returns {boolean} Value indicating whether the object is an *HTMLCollection*
   * @memberof DOM
   */


  var isHTMLCollection = function isHTMLCollection(obj) {
    return obj instanceof HTMLCollection;
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
   * Converts an html string to an HTML Element or a list of HTML Elements
   * @param {!string} prop 
   * @param {!string} html 
   * @private
   */

  /* istanbul ignore next */

  function _htmlToElement(prop, html) {
    if (!isString(html)) {
      return null;
    }

    var template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content[prop];
  }
  /**
   * Converts an html string to an HTML Element
   * @param {!string} html 
   * @returns {Node}
   * @memberof DOM
   */


  var htmlToElement = _htmlToElement.bind(null, 'firstChild');
  /**
   * Converts an html string to a list of HTML Elements
   * @param {!string} html 
   * @returns {NodeList}
   * @memberof DOM
   */

  var htmlToElements = _htmlToElement.bind(null, 'childNodes');
  /**
   * Verifies that an element is visible
   * @param {!HTMLElement} element 
   * @returns {boolean}
   * @memberof DOM
   */

  function isInViewport(element) {
    if (!isHTMLElement(element)) {
      throw new Error("The given element is not a valid HTML Element");
    }

    var _element$getBoundingC = element.getBoundingClientRect(),
        top = _element$getBoundingC.top,
        right = _element$getBoundingC.right,
        bottom = _element$getBoundingC.bottom,
        left = _element$getBoundingC.left;

    return top >= 0 && left >= 0 && bottom <= windowHeight() && right <= windowWidth();
  }
  /**
   * Verifies that an element is displayed inside a target element
   * @param {!HTMLElement} element 
   * @param {!HTMLElement} target
   * @returns {boolean}
   * @memberof DOM
   */

  function isInElement(element, target) {
    if (!all([element, target], isHTMLElement)) {
      throw new Error("The given element is not a valid HTML Element");
    }

    var _element$getBoundingC2 = element.getBoundingClientRect(),
        top1 = _element$getBoundingC2.top,
        right1 = _element$getBoundingC2.right,
        bottom1 = _element$getBoundingC2.bottom,
        left1 = _element$getBoundingC2.left;

    var _target$getBoundingCl = target.getBoundingClientRect(),
        top2 = _target$getBoundingCl.top,
        right2 = _target$getBoundingCl.right,
        bottom2 = _target$getBoundingCl.bottom,
        left2 = _target$getBoundingCl.left;

    return all([[top2, top1], [left2, left1], [right1, right2], [bottom1, bottom2]], function (inner, outer) {
      return inner <= outer;
    });
  }

  /**
   * Inserts a given element before the targetted element
   * @param {!Element} target 
   * @param {!Element} element 
   * @memberof DOM
   */

  function insertBeforeElement(target, element) {
    if (!all([target, element], isElement)) {
      throw new TypeError("Bad argument: The given `element` or `target` is not a valid Element");
    }

    target.insertAdjacentElement('beforebegin', element);
    return target;
  }
  /**
   * Inserts a given element after the targetted element
   * @param {!Element} target 
   * @param {!Element} element 
   * @memberof DOM
   */

  function insertAfterElement(target, element) {
    if (!all([target, element], isElement)) {
      throw new TypeError("Bad argument: The given `element` or `target` is not a valid Element");
    }

    target.insertAdjacentElement('afterend', element);
    return target;
  }
  /**
   * Inserts a givern element as the first children of the targetted element
   * @param {!Element} target 
   * @param {!Element} element 
   * @memberof DOM
   */

  function preprendChild(target, element) {
    if (!all([target, element], isElement)) {
      throw new TypeError("Bad argument: The given `element` or `target` is not a valid Element");
    }

    target.insertAdjacentElement('afterbegin', element);
    return target;
  }
  /**
   * Append a list of elements to a node.
   * @param {!Element} parent
   * @param {!HTMLElement[]|HTMLCollection} children
   * @returns {HTMLElement}
   * @memberof DOM
   */

  function appendChildren(parent, children) {
    if (!isNode(parent)) {
      throw new TypeError("Bad argument: The given `parent` is not a valid Node");
    }

    if (!(isHTMLCollection(children) || isCollection(children))) {
      throw new TypeError("Bad argument: The given `children` is not a valid HTMLCollection/HTMLElement array");
    }

    var createText = function createText(obj) {
      return document.createTextNode(obj.toString());
    };

    var fragment = isDocumentFragment(parent) ? parent : document.createDocumentFragment();
    Array.from(children).forEach(function (element) {
      if (!isNullOrUndefined(element)) {
        fragment.appendChild(isNode(element) ? element : createText(element.toString()));
      }
    });

    if (parent !== fragment) {
      parent.appendChild(fragment);
    }

    return parent;
  }

  /**
   * Add classes to an element
   * @param {HTMLElement} element 
   * @param {string|string[]} value 
   * @memberof DOM
   */

  function addClass(element, value) {
    var _element$classList;

    if (!isHTMLElement(element)) {
      throw new Error("Bad argument: The passed `element` argument is not a valid HTML Element");
    }

    (_element$classList = element.classList).add.apply(_element$classList, _toConsumableArray(Array.isArray(value) ? value : [value]));

    return element;
  }
  /**
   * Assigns a value to an attribute
   * @param {HTMLElement} element 
   * @param {string} key 
   * @param {string} value 
   * @private
   */


  function assign(element, key, value) {
    element[key] = value;
  }
  /**
   * Assigns a value to an attribute
   * @param {HTMLElement} element 
   * @param {string} key 
   * @param {Object} value 
   * @private
   */


  function assignObject(element, key, value) {
    Object.assign(element[key], value);
  }
  /**
   * Assigns a value to an attribute
   * @param {HTMLElement} element 
   * @param {string} key 
   * @param {Object} value 
   * @private
   */


  function assignAttribute(element, key, value) {
    element.setAttribute(key, value);
  }

  var GLOBAL_ATTRIBUTES = "accesskey,autocapitalize,class,dataset,editable,draggable,hidden,id,inputmode,lang,html,style,tabindex,text,title";
  var AttributeHandler = {
    // Global attributes
    accesskey: [assign, 'accessKey'],
    autocapitalize: [assign, 'autocapitalize'],
    "class": [addClass],
    dataset: [assignObject, 'dataset'],
    draggable: [assign, 'draggable'],
    editable: [assign, 'contentEditable'],
    hidden: [assign, 'hidden'],
    id: [assign, 'id'],
    inputmode: [assign, 'inputMode'],
    lang: [assign, 'lang'],
    html: [assign, 'innerHTML'],
    style: [assign, 'style'],
    tabindex: [assign, 'tabIndex'],
    text: [assign, 'textContent'],
    title: [assign, 'title'],
    // Object attributes
    data: [assign, 'data'],
    // Quote attributes
    cite: [assign, 'cite'],
    // Anchor attributes
    download: [assign, 'download'],
    ping: [assign, 'ping'],
    target: [assign, 'target'],
    // Area attributes
    coords: [assign, 'coords'],
    shape: [assign, 'shape'],
    // Audio/Video attributes
    autoplay: [assign, 'autoplay'],
    buffered: [assign, 'buffered'],
    controls: [assign, 'controls'],
    loop: [assign, 'loop'],
    muted: [assign, 'muted'],
    playsinline: [assignAttribute, 'playsinline'],
    poster: [assign, 'poster'],
    preload: [assign, 'preload'],
    // Image attributes
    crossorigin: [assign, 'crossOrigin'],
    decoding: [assign, 'decoding'],
    height: [assign, 'height'],
    ismap: [assign, 'isMap'],
    loading: [assign, 'loading'],
    srcset: [assign, 'srcset'],
    width: [assign, 'width'],
    // Link attributes
    alt: [assign, 'alt'],
    as: [assign, 'as'],
    media: [assign, 'media'],
    rel: [assign, 'rel'],
    src: [assign, 'src'],
    sizes: [assign, 'sizes'],
    // List attributes
    reversed: [assign, 'reversed'],
    start: [assign, 'start'],
    // Form attributes
    accept: [assign, 'accept'],
    "accept-charset": [assign, 'acceptCharset'],
    action: [assign, 'action'],
    autocomplete: [assign, 'autocomplete'],
    autofocus: [assign, 'autofocus'],
    capture: [assign, 'capture'],
    checked: [assign, 'checked'],
    cols: [assign, 'cols'],
    disabled: [assign, 'disabled'],
    dirname: [assign, 'dirName'],
    enctype: [assign, 'enctype'],
    "for": [assign, 'for'],
    form: [assign, 'form'],
    formaction: [assign, 'formAction'],
    formenctype: [assign, 'formEnctype'],
    formmethod: [assign, 'formMethod'],
    formnovalidate: [assign, 'formNoValidate'],
    formtarget: [assign, 'formTarget'],
    high: [assign, 'high'],
    label: [assign, 'label'],
    list: [assign, 'list'],
    low: [assign, 'low'],
    max: [assign, 'max'],
    maxlength: [assign, 'maxLength'],
    method: [assign, 'method'],
    min: [assign, 'min'],
    minlength: [assign, 'minLength'],
    multiple: [assign, 'multiple'],
    name: [assign, 'name'],
    novalidate: [assign, 'noValidate'],
    optimum: [assign, 'optimum'],
    pattern: [assign, 'pattern'],
    placeholder: [assign, 'placeholder'],
    readonly: [assign, 'readOnly'],
    required: [assign, 'required'],
    rows: [assign, 'rows'],
    selected: [assign, 'selected'],
    size: [assign, 'size'],
    spellcheck: [assignAttribute, 'spellcheck'],
    step: [assign, 'step'],
    wrap: [assign, 'wrap'],
    // Track attributes
    "default": [assign, 'default'],
    kind: [assign, 'kind'],
    srclang: [assign, 'srclang'],
    // Table attributes
    abbr: [assign, 'abbr'],
    colspan: [assign, 'colSpan'],
    span: [assign, 'span'],
    rowspan: [assign, 'rowSpan'],
    scope: [assign, 'scope'],
    // Mix attributes
    href: [assign, 'href'],
    hreflang: [assign, 'hreflang'],
    datetime: [assign, 'dateTime'],
    type: [assign, 'type'],
    value: [assign, 'value'],
    usemap: [assign, 'useMap']
  };
  /**
   * Sets the attributes of an element
   * @param {!HTMLElement} element element
   * @param {Object} attribute attribute
   * @returns {HTMLElement}
   * @memberof DOM
   */

  function addAttributes(element, attribute) {
    var validAttributes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

    if (!isHTMLElement(element)) {
      throw new Error("Bad argument: The given element argument is not a valid HTML Element");
    }

    if (!isObject(attribute)) {
      return element;
    }

    var isValid = function isValid(key) {
      return GLOBAL_ATTRIBUTES.includes(key) || validAttributes.includes(key);
    }; // HTML attributes


    for (var _i = 0, _Object$keys = Object.keys(attribute); _i < _Object$keys.length; _i++) {
      var key = _Object$keys[_i];

      if (isValid(key)) {
        var value = attribute[key];
        var args = AttributeHandler[key].slice(0);
        var fn = args.shift();
        fn.apply(void 0, [element].concat(_toConsumableArray(args), [value]));
      }
    }

    return element;
  }
  /**
   * Changes the selected option of a `<select>` element
   * @param {!HTMLSelectElement} select
   * @param {string} value option value to select
   * @returns {boolean} value indicating whether the option was found and selected
   * @memberof DOM
   */

  function changeSelectValue(select, value) {
    if (!isHTMLElement(select, "select")) {
      throw new Error("Bad argument: The given select argument is not a valid HTML Select element");
    }

    if (isNullOrUndefined(value)) {
      throw new Error("The given value parameter is a null or undefined");
    }

    var options = select.options;

    for (var i = 0; i < options.length; i++) {
      var option = options[i];

      if (option.value === value.toString()) {
        option.selected = true;
        return true;
      }
    }

    return false;
  }

  /**
   * Creates an empty element with attributes
   * @param {string} tagName 
   * @param {string} [_validAttributes] 
   * @param {object} [_attributes] 
   * @returns {HTMLElement}
   * @private
   */

  /* istanbul ignore next */

  function createEmptyElement(tagName, _validAttributes, _attributes) {
    var element = document.createElement(tagName);

    if (!isHTMLElement(element)) {
      return null;
    }

    if (isObject(_attributes)) {
      addAttributes(element, _attributes, valOrDefault(_validAttributes, ""));
    }

    return element;
  }
  /**
   * Creates an element with attributes and content
   * @param {string} tagName 
   * @param {string} [_validAttributes] 
   * @param {Function} [contentResolver] 
   * @param {object} [_attributes] 
   * @param {Text|HTMLElement|HTMLElement[]} [_content] 
   * @returns {HTMLElement}
   * @private
   */

  /* istanbul ignore next */


  function createElement(tagName, _validAttributes, _attributes, _content) {
    var element = createEmptyElement(tagName, _validAttributes, _attributes);

    if (!isHTMLElement(element)) {
      return null;
    }

    if (!isNullOrUndefined(_content)) {
      addContent(element, _content);
    }

    return element;
  }
  /**
   * Creates an element with attributes and content
   * @param {string} tagName 
   * @param {string} [_validAttributes] 
   * @param {Function} [contentResolver] 
   * @param {object} [_attributes] 
   * @param {Text|HTMLElement|HTMLElement[]} [_content] 
   * @returns {HTMLElement}
   * @private
   */

  /* istanbul ignore next */


  function createElementX(tagName, _validAttributes, contentResolver, _attributes, _content) {
    var element = createEmptyElement(tagName, _validAttributes, _attributes);

    if (!isHTMLElement(element)) {
      return null;
    }

    if (!isNullOrUndefined(_content)) {
      addContent(element, _content, contentResolver);
    }

    return element;
  } // TODO: createMeta
  // TODO: createScript
  // TODO: createStyle
  // TODO: createTitle

  /**
   * Creates a document fragment
   * @function createDocFragment
   * @returns {DocumentFragment}
   * @memberof DOM
   */


  function createDocFragment(_children) {
    var fragment = document.createDocumentFragment();

    if (!isNullOrUndefined(_children)) {
      addContent(fragment, _children);
    }

    return fragment;
  }
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
   * @function createLink
   * @param {object} _attribute Global attributes
   * @returns {HTMLLinkElement}
   * @memberof DOM
   */

  var createLink = createEmptyElement.bind(null, "link", "as,crossorigin,disabled,href,hreflang,media,rel,sizes,type");
  /**
   * Creates a `<template>` element with some attributes
   * @function createTemplate
   * @param {object} _attribute Global attributes
   * @param {Text|HTMLElement|HTMLElement[]} _children Content
   * @returns {HTMLTemplateElement}
   * @memberof DOM
   */

  var createTemplate = createElement.bind(null, "template", "");
  /**
   * Creates a `<header>` element with some attributes
   * @function createHeader
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createHeader = createElement.bind(null, "header", "");
  /**
   * Creates an `<footer>` element with some attributes
   * @function createFooter
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createFooter = createElement.bind(null, "footer", "");
  /**
   * Creates an `<main>` element with some attributes
   * @function createMain
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createMain = createElement.bind(null, "main", "");
  /**
   * Creates an `<article>` element with some attributes
   * @function createArticle
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createArticle = createElement.bind(null, "article", "");
  /**
   * Creates an `<section>` element with some attributes
   * @function createSection
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createSection = createElement.bind(null, "section", "");
  /**
   * Creates an `<nav>` element with some attributes
   * @function createNav
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createNav = createElement.bind(null, "nav", "");
  /**
   * Creates an `<aside>` element with some attributes
   * @function createAside
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createAside = createElement.bind(null, "aside", "");
  /**
   * Creates a `<h1>` element with some attributes
   * @function createH1
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLHeadingElement}
   * @memberof DOM
   */

  var createH1 = createElement.bind(null, "h1", "");
  /**
   * Creates a `<h2>` element with some attributes
   * @function createH2
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLHeadingElement}
   * @memberof DOM
   */

  var createH2 = createElement.bind(null, "h2", "");
  /**
   * Creates a `<h3>` element with some attributes
   * @function createH3
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLHeadingElement}
   * @memberof DOM
   */

  var createH3 = createElement.bind(null, "h3", "");
  /**
   * Creates a `<h4>` element with some attributes
   * @function createH4
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLHeadingElement}
   * @memberof DOM
   */

  var createH4 = createElement.bind(null, "h4", "");
  /**
   * Creates a `<h5>` element with some attributes
   * @function createH5
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLHeadingElement}
   * @memberof DOM
   */

  var createH5 = createElement.bind(null, "h5", "");
  /**
   * Creates a `<h6>` element with some attributes
   * @function createH6
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLHeadingElement}
   * @memberof DOM
   */

  var createH6 = createElement.bind(null, "h6", "");
  /**
   * Creates a `<div>` element with some attributes
   * @function createDiv
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLDivElement}
   * @memberof DOM
   */

  var createDiv = createElement.bind(null, "div", "");
  /**
   * Creates a `<object>` element with some attributes
   * @function createObject
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLObjectElement}
   * @memberof DOM
   */

  var createObject = createElement.bind(null, "object", "data,height,name,type,usemap,width");
  /**
   * Creates a `<embed>` element with some attributes
   * @function createEmbed
   * @param {object} _attribute 
   * @returns {HTMLEmbedElement}
   * @memberof DOM
   */

  var createEmbed = createEmptyElement.bind(null, "embed", "height,src,type,width");
  /**
   * Creates a `<br>` element \
   * Line break (carriage-return)
   * @function createLineBreak
   * @returns {HTMLBRElement}
   * @memberof DOM
   */

  var createLineBreak = createEmptyElement.bind(null, "br", "");
  /**
   * Creates a `<hr>` element \
   * Thematic break
   * @function createThematicBreak
   * @returns {HTMLHRElement}
   * @memberof DOM
   */

  var createThematicBreak = createEmptyElement.bind(null, "hr", "");
  /**
   * Creates a `<p>` element with some attributes
   * @function createParagraph
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLParagraphElement}
   * @memberof DOM
   */

  var createParagraph = createElement.bind(null, "p", "");
  /**
   * Creates a `<blockquote>` element with some attributes
   * @function createBlockQuotation
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLQuoteElement}
   * @memberof DOM
   */

  var createBlockQuotation = createElement.bind(null, "blockquote", "cite");

  var listItemResolver = function listItemResolver(item) {
    return isHTMLElement(item, "li") ? item : createListItem(null, item);
  };
  /**
   * Creates a `<ul>` element with some attributes
   * @function createUnorderedList
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLUListElement}
   * @memberof DOM
   */


  var createUnorderedList = createElementX.bind(null, "ul", "", listItemResolver);
  /**
   * Creates a `<ol>` element with some attributes
   * @function createOrderedList
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLOListElement}
   * @memberof DOM
   */

  var createOrderedList = createElementX.bind(null, "ol", "reversed,start,type", listItemResolver);
  /**
   * Creates a `<li>` element with some attributes
   * @function createListItem
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLLIElement}
   * @memberof DOM
   */

  var createListItem = createElement.bind(null, "li", "value"); // const descriptionContentResolver = (item) => isHTMLElement(item, ["dt", "dd"]) ? item : createListItem(null, item);

  /**
   * Creates a `<dl>` element with some attributes
   * @function createDescriptionList
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLDListElement}
   * @memberof DOM
   */

  var createDescriptionList = createElement.bind(null, "dl", "");
  /**
   * Creates a `<dt>` element with some attributes
   * @function createDescriptionTerm
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createDescriptionTerm = createElement.bind(null, "dt", "");
  /**
   * Creates a `<dd>` element with some attributes
   * @function createDescriptionDetails
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createDescriptionDetails = createElement.bind(null, "dd", ""); // Inline Element
  //-----------------------------------------------------------------------------

  /**
   * Creates an `<a>` element with some attributes
   * @function createAnchor
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLAnchorElement}
   * @memberof DOM
   */

  var createAnchor = createElement.bind(null, "a", "download,href,hreflang,ping,rel,target,type");
  /**
   * Creates an `<area>` element with some attributes
   * @function createArea
   * @param {object} _attribute 
   * @returns {HTMLAreaElement}
   * @memberof DOM
   */

  var createArea = createEmptyElement.bind(null, "area", "alt,coords,download,href,hreflang,media,ping,rel,shape,target");
  /**
   * Creates an `<base>` element with some attributes
   * @function createBase
   * @param {object} _attribute 
   * @returns {HTMLBaseElement}
   * @memberof DOM
   */

  var createBase = createEmptyElement.bind(null, "base", "href,target");
  /**
    * Creates a `<img>` element with some attributes
    * @function createImage
    * @param {object} _attribute 
    * @returns {HTMLImageElement}
    * @memberof DOM
    */

  var createImage = createEmptyElement.bind(null, "img", "alt,crossorigin,decoding,height,ismap,loading,sizes,src,srcset,usemap,width");
  /**
    * Creates a `<audio>` element with some attributes
    * @function createAudio
    * @param {object} _attribute
    * @param {Text|HTMLElement|HTMLElement[]} _children
    * @returns {HTMLAudioElement}
    * @memberof DOM
    */

  var createAudio = createElement.bind(null, "audio", "autoplay,controls,crossorigin,loop,muted,preload,src");
  /**
    * Creates a `<video>` element with some attributes
    * @function createVideo
    * @param {object} _attribute 
    * @param {Text|HTMLElement|HTMLElement[]} _children 
    * @returns {HTMLVideoElement}
    * @memberof DOM
    */

  var createVideo = createElement.bind(null, "video", "autoplay,controls,crossorigin,height,loop,muted,playsinline,poster,preload,src,width");
  /**
   * Creates a `<source>` element with some attributes
   * @function createSource
   * @param {object} _attribute
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLSourceElement}
   * @memberof DOM
   */

  var createSource = createEmptyElement.bind(null, "source", "media,sizes,src,srcset,type");
  /**
   * Creates a `<track>` element with some attributes
   * @function createTrack
   * @param {object} _attribute 
   * @returns {HTMLTrackElement}
   * @memberof DOM
   */

  var createTrack = createEmptyElement.bind(null, "track", "default,kind,label,src,srclang");
  /**
   * Creates a `<picture>` element with some attributes
   * @function createPicture
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLPictureElement}
   * @memberof DOM
   */

  var createPicture = createElement.bind(null, "picture", "");
  /**
   * Creates a `<figure>` element with some attributes
   * @function createFigure
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createFigure = createElement.bind(null, "figure", "");
  /**
   * Creates a `<figcaption>` element with some attributes
   * @function createFigureCaption
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createFigureCaption = createElement.bind(null, "figcaption", "");
  /**
   * Creates a `<span>` element with some attributes
   * @function createSpan
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLSpanElement}
   * @memberof DOM
   */

  var createSpan = createElement.bind(null, "span", "");
  /**
   * Creates a `<strong>` element with some attributes
   * @function createStrong
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createStrong = createElement.bind(null, "strong", "");
  /**
   * Creates a `<em>` element with some attributes
   * @function createEmphasis
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createEmphasis = createElement.bind(null, "em", "");
  /**
   * Creates a `<mark>` element with some attributes
   * @function createMark
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createMark = createElement.bind(null, "mark", "");
  /**
   * Creates a `<samp>` element with some attributes
   * @function createSample
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createSample = createElement.bind(null, "samp", "");
  /**
   * Creates a `<sub>` element with some attributes
   * @function createSubscript
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createSubscript = createElement.bind(null, "sub", "");
  /**
   * Creates a `<sup>` element with some attributes
   * @function createSuperscript
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createSuperscript = createElement.bind(null, "sup", "");
  /**
   * Creates a `<del>` element with some attributes
   * @function createDeletedPart
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLModElement}
   * @memberof DOM
   */

  var createDeletedPart = createElement.bind(null, "del", "cite,datetime");
  /**
   * Creates a `<ins>` element with some attributes
   * @function createInsertedPart
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLModElement}
   * @memberof DOM
   */

  var createInsertedPart = createElement.bind(null, "ins", "cite,datetime");
  /**
   * Creates a `<q>` element with some attributes
   * @function createQuote
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLQuoteElement}
   * @memberof DOM
   */

  var createQuote = createElement.bind(null, "q", "cite");
  /**
   * Creates a `<abbr>` element with some attributes
   * @function createAbbreviation
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createAbbreviation = createElement.bind(null, "abbr", "");
  /**
   * Creates a `<b>` element with some attributes
   * @function createB
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createB = createElement.bind(null, "b", "");
  /**
   * Creates a `<i>` element with some attributes
   * @function createI
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createI = createElement.bind(null, "i", "");
  /**
   * Creates a `<s>` element with some attributes
   * @function createS
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createS = createElement.bind(null, "s", "");
  /**
   * Creates a `<u>` element with some attributes
   * @function createU
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createU = createElement.bind(null, "u", "");
  /**
   * Creates a `<cite>` element with some attributes
   * @function createCite
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createCite = createElement.bind(null, "cite", "");
  /**
   * Creates a `<time>` element with optionally some attributes
   * @function createTime
   * @param {object} _attribute 
   * @returns {HTMLTimeElement}
   * @memberof DOM
   */

  var createTime = createElement.bind(null, "time", "datetime");
  /**
   * Creates a `<code>` element with some attributes
   * @function createCode
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createCode = createElement.bind(null, "code", "");
  /**
   * Creates a `<form>` element with some attributes
   * @function createForm
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLFormElement}
   * @memberof DOM
   */

  var createForm = createElement.bind(null, "form", "accept-charset,action,autocomplete,enctype,method,name,novalidate,rel,target");
  /**
   * Creates an `<input>` element with some attributes
   * @function createInput
   * @param {object} _attribute 
   * @returns {HTMLInputElement}
   * @memberof DOM
   */

  var createInput = createEmptyElement.bind(null, "input", "accept,alt,autocomplete,autofocus,capture,checked,dirname,disabled,height,max,maxlength,minlength,min,multiple,name,pattern,placeholder,readonly,required,size,src,step,type,value,width");
  /**
   * Creates a `<textarea>` element with some attributes
   * @function createTextArea
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLTextAreaElement}
   * @memberof DOM
   */

  var createTextArea = createElement.bind(null, "textarea", "autocomplete,autofocus,cols,disabled,maxlength,minlength,name,placeholder,readonly,required,rows,spellcheck,value,wrap");
  /**
   * Creates a `<label>` element with some attributes
   * @function createLabel
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLLabelElement}
   * @memberof DOM
   */

  var createLabel = createElement.bind(null, "label", "for");
  /**
   * Resolves a select element content
   * @param {*} item 
   * @returns {HTMLOptionElement|HTMLOptGroupElement}
   * @private
   */

  var selectContentResolver = function selectContentResolver(item) {
    if (isHTMLElement(item, ["option", "optgroup"])) {
      return item;
    }

    if (Array.isArray(item)) {
      return createOptionGroup(null, item);
    }

    return createOption(null, item);
  };
  /**
   * Creates a `<select>` element with some attributes
   * @function createSelect
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLSelectElement}
   * @memberof DOM
   */


  var createSelect = createElementX.bind(null, 'select', "autocomplete,autofocus,disabled,multiple,name,required,size", selectContentResolver);
  /**
   * Creates a `<option>` element with some attributes
   * @function createOption
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLOptionElement}
   * @memberof DOM
   */

  var createOption = createElement.bind(null, "option", "disabled,label,selected,value");

  var optiongroupContentResolver = function optiongroupContentResolver(item) {
    return isHTMLElement(item, "option") ? item : createOption(null, item);
  };
  /**
   * Creates a `<optgroup>` element with some attributes
   * @function createOptionGroup
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLOptGroupElement}
   * @memberof DOM
   */


  var createOptionGroup = createElementX.bind(null, "optgroup", "disabled,label", optiongroupContentResolver);
  /**
   * Creates a `<fieldset>` element with some attributes
   * @function createFieldset
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLFieldSetElement}
   * @memberof DOM
   */

  var createFieldset = createElement.bind(null, "fieldset", "disabled,name");
  /**
   * Creates a `<legend>` element with some attributes
   * @function createLegend
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLLabelElement}
   * @memberof DOM
   */

  var createLegend = createElement.bind(null, "legend", "");
  /**
   * Creates a `<datalist>` element with some attributes
   * @function createDataList
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLTextAreaElement}
   * @memberof DOM
   */

  var createDataList = createElementX.bind(null, "datalist", "", optiongroupContentResolver);
  /**
   * Creates a `<meter>` element with some attributes
   * @function createMeter
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLTextAreaElement}
   * @memberof DOM
   */

  var createMeter = createElement.bind(null, "meter", "high,low,max,min,optimum,value");
  /**
   * Creates a `<progress>` element with some attributes
   * @function createProgress
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLTextAreaElement}
   * @memberof DOM
   */

  var createProgress = createElement.bind(null, "progress", "max,value");
  /**
   * Creates a `<output>` element with optionally some attributes and children elements
   * @function createOutput
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLTextAreaElement}
   * @memberof DOM
   */

  var createOutput = createElement.bind(null, "output", "name,value");
  /**
   * Creates a `<button>` element with optionally some attributes and children elements
   * @function createButton
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLButtonElement}
   * @memberof DOM
   */

  var createButton = createElement.bind(null, "button", "autofocus,disabled,formaction,formenctype,formmethod,formnovalidate,formtarget,name,type,value");
  /**
   * Creates a `<table>` element with some attributes
   * @function createTable
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLTableElement}
   * @memberof DOM
   */

  var createTable = createElement.bind(null, "table", "");
  /**
   * Creates a `<caption>` element with some attributes
   * @function createCaption
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLTableCaptionElement}
   * @memberof DOM
   */

  var createCaption = createElement.bind(null, "caption", "");

  var tablerowContentResolver = function tablerowContentResolver(item) {
    return isHTMLElement(item, "tr") ? item : createTableRow(null, item);
  };
  /**
   * Creates a `<thead>` element with some attributes
   * @function createTableHeader
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLTableSectionElement}
   * @memberof DOM
   */


  var createTableHeader = createElementX.bind(null, "thead", "", tablerowContentResolver);
  /**
   * Creates a `<tbody>` element with some attributes
   * @function createTableBody
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLTableSectionElement}
   * @memberof DOM
   */

  var createTableBody = createElementX.bind(null, "tbody", "", tablerowContentResolver);
  /**
   * Creates a `<tfoot>` element with some attributes
   * @function createTableFooter
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLTableSectionElement}
   * @memberof DOM
   */

  var createTableFooter = createElementX.bind(null, "tfoot", "", tablerowContentResolver);
  /**
   * Creates a `<col>` element with some attributes
   * @function createTableColumn
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLTableColElement}
   * @memberof DOM
   */

  var createTableColumn = createEmptyElement.bind(null, "col", "span");

  var tablecolContentResolver = function tablecolContentResolver(item) {
    return isHTMLElement(item, "col") ? item : null;
  };
  /**
   * Creates a `<colgroup>` element with some attributes
   * @function createTableColumnGroup
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLTableColElement}
   * @memberof DOM
   */


  var createTableColumnGroup = createElementX.bind(null, "colgroup", "span", tablecolContentResolver);

  var tablecellContentResolver = function tablecellContentResolver(item) {
    return isHTMLElement(item, ["th", "td"]) ? item : createTableCell(null, item);
  };
  /**
   * Creates a `<tr>` element with some attributes
   * @function createTableRow
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLTableRowElement}
   * @memberof DOM
   */


  var createTableRow = createElementX.bind(null, "tr", "", tablecellContentResolver);
  /**
   * Creates a `<th>` element with some attributes
   * @function createTableHeaderCell
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLTableCellElement}
   * @memberof DOM
   */

  var createTableHeaderCell = createElement.bind(null, "th", "abbr,colspan,rowspan,scope");
  /**
   * Creates a `<td>` element with some attributes
   * @function createTableCell
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLTableCellElement}
   * @memberof DOM
   */

  var createTableCell = createElement.bind(null, "td", "colspan,rowspan");
  /**
   * Appends the children to the element
   * @param {Node} element element
   * @param {HTMLCollection} content children elements
   * @private
   * @memberof DOM
   */

  /* istanbul ignore next */

  function addContent(element, content, resolver) {
    var children = Array.isArray(content) ? content : [content];

    if (isFunction(resolver)) {
      children = children.map(function (child) {
        return resolver(child);
      });
    }

    appendChildren(element, children);
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

    if (isDocumentFragment(container)) {
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

    if (isDocumentFragment(container)) {
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
   * @param {string} dir sibling direction
   * @param {HTMLElement} element element
   * @returns {(Element|null)} Element or null
   * @private
   */

  /* istanbul ignore next */

  function getElementSibling(dir, element, pred) {
    if (!isHTMLElement(element)) {
      return null;
    }

    var sibling = element[dir];

    if (isFunction(pred)) {
      while (isElement(sibling) && !pred(sibling)) {
        sibling = sibling[dir];
      }
    }

    return sibling;
  }
  /**
   * Gets the previous element of the specified one in its parent's children list
   * @function getPreviousElementSibling
   * @param {HTMLElement} el element
   * @param {*} pred Search end condition
   * @returns {(Element|null)} Element or null if the specified element is the first one in the list
   * @memberof DOM
   */


  var getPreviousElementSibling = getElementSibling.bind(null, "previousElementSibling");
  /**
   * Gets the element following the specified one in its parent's children list
   * @function getNextElementSibling
   * @param {HTMLElement} el element
   * @param {*} pred Search end condition
   * @returns {(Element|null)} Element or null if the specified element is the last one in the list
   * @memberof DOM
   */

  var getNextElementSibling = getElementSibling.bind(null, "nextElementSibling");
  /**
   * Finds an ancestor of an element
   * @param {!Element} target 
   * @param {!Function} pred Decides whether the target is found
   * @param {number} [_max] Maximum number of iterations
   * @returns {Element|null}
   * @memberof DOM
   */

  function findAncestor(target, pred, _max) {
    if (!isElement(target)) {
      throw new TypeError("Bad argument: The given target parameter is not a valid HTML Element");
    }

    if (!isFunction(pred)) {
      throw new TypeError("Bad argument: The given pred parameter is not a valid Function");
    }

    var parent = target.parentElement;

    if (_max > 0) {
      return findAncestorIter(parent, pred, _max - 1);
    }

    return findAncestorInf(parent, pred);
  }
  /**
   * Look an ancestor of an element using a callback
   * @param {Element} target 
   * @param {Function} pred Decides whether the target is found
   * @private
   */

  /* istanbul ignore next */

  function findAncestorInf(target, pred) {
    if (isNullOrUndefined(target)) {
      return null;
    }

    if (pred(target)) {
      return target;
    }

    return findAncestorInf(target.parentElement, pred);
  }
  /**
   * Look for an ancestor of an element using a callback with a maximum number of iteration
   * @param {Element} target 
   * @param {Function} pred Decides whether the target is found
   * @param {number} max Maximum number of iterations
   * @private
   */

  /* istanbul ignore next */


  function findAncestorIter(target, pred, max) {
    if (isNullOrUndefined(target) || max === 0) {
      return null;
    }

    if (pred(target)) {
      return target;
    }

    return findAncestorIter(target.parentElement, pred, max - 1);
  }

  /**
   * Removes all children of a node from the DOM or 
   * those that satisfy the predicate function if given
   * @param {!Node} node 
   * @param {Function} [_callback] Decides whether the node should be removed
   * @memberof DOM
   */

  function removeChildren(node, _callback) {
    if (!isNode(node)) {
      throw new TypeError("Bad argument: The given `node` is not a valid Node");
    }

    if (isFunction(_callback)) {
      Array.from(node.childNodes).forEach(function (n) {
        if (_callback(n)) {
          node.removeChild(n);
        }
      });
      return node;
    }

    return removeAllChildren(node);
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
   * Copies selected content to clipboard
   * @param {HTMLElement|string} value
   * @returns {boolean} Value indicating whether the content has been succesfully copied to the clipboard
   * @memberof DOM
   */

  function copytoClipboard(value) {
    if (isNullOrUndefined(value)) {
      return false;
    }

    var element = createTextArea({
      value: isHTMLElement(value) ? value.textContent : value.toString(),
      readonly: true
    });

    if (!isHTMLElement(element)) {
      return false;
    }

    document.body.appendChild(element);
    element.select();
    document.execCommand('copy');
    element.remove();
    return true;
  }

  /**
   * Update class related to the action *move label down*
   * @param {HTMLElement} label 
   */

  var moveDown = function moveDown(label) {
    return label.classList.add('down');
  };
  /**
   * Update class related to the action *move label up*
   * @param {HTMLElement} label 
   */


  var moveUp = function moveUp(label) {
    return label.classList.remove('down');
  };
  /**
   * Update class related to the action *add focus to element*
   * @param {HTMLElement} element 
   */


  var addFocus = function addFocus(element) {
    return element.classList.add('focused');
  };
  /**
   * Update class related to the action *remove focus from element*
   * @param {HTMLElement} element 
   */


  var removeFocus = function removeFocus(element) {
    return element.classList.remove('focused');
  };
  /**
   * Activate floating label in given scope
   * @param {HTMLElement} form 
   */


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
          input.placeholder = "";
          moveUp(label);
          addFocus(label.parentElement);
        });
        input.addEventListener('blur', function (e) {
          if (isEmpty(this.value)) {
            moveDown(label);
          }

          removeFocus(label.parentElement);
        });
        input.addEventListener('input', function (e) {
          // check if input does not have focus
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

    /**
     * Set the state of the item
     * @param {boolean} isChecked 
     * @returns {boolean} Value indicating the success of the operation
     */
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
      var items = null;
      var type = getType(container);

      switch (type) {
        case 'selector':
          items = createSelectorItem(itemContainers, type, false);
          widget = Object.create(BaseSelector);
          break;

        case 'form-selector':
          items = createSelectorItem(itemContainers, type, true);
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

  function createSelectorItem(itemContainers, type, hasInput) {
    var items = [];
    var typeHandler = {
      'selector': function selector() {
        return Object.create(BaseSelectorItem);
      },
      'form-selector': function formSelector() {
        return Object.create(FormSelectorItem);
      }
    };

    for (var i = 0; i < itemContainers.length; i++) {
      var itemContainer = itemContainers[i];
      itemContainer.dataset.selectorIndex = i;
      var args = {
        container: itemContainer,
        index: i
      };

      if (hasInput) {
        var input = getInput('radio', itemContainer);

        if (!isHTMLElement(input)) {
          return ErrorCode.BAD_INPUT;
        }

        input.dataset.selectorIndex = i;
        Object.assign(args, {
          input: input
        });
      }

      var item = typeHandler[type]().init(args);
      items.push(item);
    }

    return items;
  }

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

      this.toggle(show, State$1.OPEN, 'add');

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

      this.toggle(hide, State$1.CLOSED, 'remove');

      if (isFunction(this.afterClose)) {
        this.afterClose(this);
      }

      this.isClosed = true;
      return this;
    },
    toggle: function toggle(displayCb, state, action) {
      displayCb(this.content);
      this.setState(state);
      this.container.classList[action]('expanded');
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

      var _iterator = _createForOfIteratorHelper(searchParams.entries()),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var pair = _step.value;
          params[pair[0]] = pair[1];
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
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
  exports.addPath = addPath;
  exports.all = all;
  exports.appendChildren = appendChildren;
  exports.assert = assert;
  exports.boolToInt = boolToInt;
  exports.camelCase = camelCase;
  exports.capitalize = capitalize;
  exports.capitalizeFirstLetter = capitalizeFirstLetter;
  exports.changeSelectValue = changeSelectValue;
  exports.cloneObject = cloneObject;
  exports.cloneTemplate = cloneTemplate;
  exports.compareTime = compareTime;
  exports.copytoClipboard = copytoClipboard;
  exports.createAbbreviation = createAbbreviation;
  exports.createAnchor = createAnchor;
  exports.createArea = createArea;
  exports.createArticle = createArticle;
  exports.createAside = createAside;
  exports.createAudio = createAudio;
  exports.createB = createB;
  exports.createBase = createBase;
  exports.createBlockQuotation = createBlockQuotation;
  exports.createButton = createButton;
  exports.createCaption = createCaption;
  exports.createCite = createCite;
  exports.createCode = createCode;
  exports.createDataList = createDataList;
  exports.createDeletedPart = createDeletedPart;
  exports.createDescriptionDetails = createDescriptionDetails;
  exports.createDescriptionList = createDescriptionList;
  exports.createDescriptionTerm = createDescriptionTerm;
  exports.createDiv = createDiv;
  exports.createDocFragment = createDocFragment;
  exports.createEmbed = createEmbed;
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
  exports.createInsertedPart = createInsertedPart;
  exports.createLabel = createLabel;
  exports.createLegend = createLegend;
  exports.createLineBreak = createLineBreak;
  exports.createLink = createLink;
  exports.createListItem = createListItem;
  exports.createMain = createMain;
  exports.createMark = createMark;
  exports.createMeter = createMeter;
  exports.createNav = createNav;
  exports.createObject = createObject;
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
  exports.createTemplate = createTemplate;
  exports.createTextArea = createTextArea;
  exports.createTextNode = createTextNode;
  exports.createThematicBreak = createThematicBreak;
  exports.createTime = createTime;
  exports.createTrack = createTrack;
  exports.createU = createU;
  exports.createUnorderedList = createUnorderedList;
  exports.createVideo = createVideo;
  exports.fetchWithTimeout = fetchWithTimeout;
  exports.findAncestor = findAncestor;
  exports.findByPath = findByPath;
  exports.first = first;
  exports.floatingLabel = floatingLabel;
  exports.formatCase = formatCase;
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
  exports.hasOwn = hasOwn;
  exports.htmlToElement = htmlToElement;
  exports.htmlToElements = htmlToElements;
  exports.inputCounter = inputCounter;
  exports.insert = insert;
  exports.insertAfterElement = insertAfterElement;
  exports.insertBeforeElement = insertBeforeElement;
  exports.isCollection = isCollection;
  exports.isDate = isDate;
  exports.isDerivedOf = isDerivedOf;
  exports.isDocumentFragment = isDocumentFragment;
  exports.isElement = isElement;
  exports.isEmpty = isEmpty;
  exports.isFunction = isFunction;
  exports.isHTMLCollection = isHTMLCollection;
  exports.isHTMLElement = isHTMLElement;
  exports.isInElement = isInElement;
  exports.isInViewport = isInViewport;
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
  exports.lone = lone;
  exports.no = no;
  exports.one = one;
  exports.pascalCase = pascalCase;
  exports.preprendChild = preprendChild;
  exports.queryBuilder = queryBuilder;
  exports.random = random;
  exports.removeAccents = removeAccents;
  exports.removeChildren = removeChildren;
  exports.resolveDate = resolveDate;
  exports.shortDate = shortDate;
  exports.shortDateTime = shortDateTime;
  exports.some = some;
  exports.toBoolean = toBoolean;
  exports.valOrDefault = valOrDefault;
  exports.windowHeight = windowHeight;
  exports.windowWidth = windowWidth;

  return exports;

}({}));
