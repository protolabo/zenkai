var zutils = (function (exports) {
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

  /** @private */
  var hasOwnProperty = Object.prototype.hasOwnProperty;
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
   */

  var one = function one(values, fn) {
    return getHitCount(values, fn) === 1;
  };
  /**
   * Verifies that no value satisfies the condition
   * @param {*[]} values Set of values
   * @param {Function} fn Condition
   * @returns {boolean} A value indicating whether no value satisfies the condition
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
   * @memberof URI
   */

  function getUrlParams(prop) {
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
      return params[prop];
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

  exports.DELETE = DELETE;
  exports.GET = GET;
  exports.POST = POST;
  exports.PUT = PUT;
  exports.addPath = addPath;
  exports.all = all;
  exports.findByPath = findByPath;
  exports.getDir = getDir;
  exports.getDirTarget = getDirTarget;
  exports.getRootUrl = getRootUrl;
  exports.getUrlParams = getUrlParams;
  exports.no = no;
  exports.one = one;
  exports.queryBuilder = queryBuilder;
  exports.random = random;
  exports.some = some;

  return exports;

}({}));
