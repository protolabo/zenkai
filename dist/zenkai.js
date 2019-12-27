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
  [isNull, isUndefined, isNullOrUndefined, isObject, isFunction, isString, isDate, isEmpty, isInt].forEach(function (fn) {
    fn['some'] = function (values) {
      var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      if (min === 1) {
        for (var i = 0; i < values.length; i++) {
          if (fn(values[i])) {
            return true;
          }
        }

        return false;
      }

      var counter = 0;

      for (var _i = 0; _i < values.length; _i++) {
        if (fn(values[_i])) {
          counter++;
        }
      }

      return counter >= min;
    };

    fn['all'] = function (values) {
      for (var i = 0; i < values.length; i++) {
        if (!fn(values[i])) {
          return false;
        }
      }

      return true;
    };

    fn['one'] = function (values) {
      var counter = 0;

      for (var i = 0; i < values.length; i++) {
        if (fn(values[i])) {
          counter++;
        }
      }

      return counter === 1;
    };
  });

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
      for (var _i = 0, _Object$keys = Object.keys(obj); _i < _Object$keys.length; _i++) {
        var e = _Object$keys[_i];

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

  /**
   * Verifies that an object is a *Node*
   * @param {Element} obj 
   * @returns {boolean} Value indicating whether the object is an *Node*
   * @memberof DOM
   */

  function isNode(obj) {
    return isNullOrUndefined(obj) ? false : obj instanceof Node;
  }
  /**
   * Verifies that an object is an *Element*
   * @param {Element} obj 
   * @returns {boolean} Value indicating whether the object is an *Element*
   * @memberof DOM
   */

  function isElement(obj) {
    return isNullOrUndefined(obj) ? false : obj.nodeType === 1 && obj instanceof Element;
  }
  /**
   * Verifies that an object is an *HTMLElement*
   * @param {Element} obj 
   * @returns {boolean} Value indicating whether the object is an *HTMLElement*
   * @memberof DOM
   */

  function isHTMLElement(obj) {
    return isNullOrUndefined(obj) ? false : obj.nodeType === 1 && obj instanceof HTMLElement;
  }
  /**
   * Verifies that an object is an *DocumentFragment*
   * @param {Element} obj 
   * @returns {boolean} Value indicating whether the object is an *DocumentFragment*
   * @memberof DOM
   */

  function isDocumentFragment(obj) {
    return isNullOrUndefined(obj) ? false : obj.nodeType === 11 && obj instanceof DocumentFragment;
  }
  [isNode, isElement, isHTMLElement, isDocumentFragment].forEach(function (fn) {
    fn['some'] = function (values) {
      var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      if (min === 1) {
        for (var i = 0; i < values.length; i++) {
          if (fn(values[i])) {
            return true;
          }
        }

        return false;
      }

      var counter = 0;

      for (var _i = 0; _i < values.length; _i++) {
        if (fn(values[_i])) {
          counter++;
        }
      }

      return counter >= min;
    };

    fn['all'] = function (values) {
      for (var i = 0; i < values.length; i++) {
        if (!fn(values[i])) {
          return false;
        }
      }

      return true;
    };

    fn['one'] = function (values) {
      var counter = 0;

      for (var i = 0; i < values.length; i++) {
        if (fn(values[i])) {
          counter++;
        }
      }

      return counter === 1;
    };
  });

  /**
   * Inserts a given element before the targetted element
   * @param {HTMLElement} target 
   * @param {HTMLElement} el 
   * @memberof DOM
   */

  function insertBeforeElement(target, el) {
    target.insertAdjacentElement('beforebegin', el);
  }
  /**
   * Inserts a given element after the targetted element
   * @param {HTMLElement} target 
   * @param {HTMLElement} el 
   * @memberof DOM
   */

  function insertAfterElement(target, el) {
    target.insertAdjacentElement('afterend', el);
  }
  /**
   * Inserts a givern element as the first children of the targetted element
   * @param {HTMLElement} target 
   * @param {HTMLElement} el 
   * @memberof DOM
   */

  function preprendChild(target, el) {
    target.insertAdjacentElement('afterbegin', el);
  }
  /**
   * Append a list of elements to a node.
   * @param {HTMLElement} parent
   * @param {HTMLElement[]} children
   * @returns {HTMLElement}
   * @memberof DOM
   */

  function appendChildren(parent, children) {
    var fragment = document.createDocumentFragment();
    children.forEach(function (element) {
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
   * @param {HTMLElement} element element
   * @param {string} className class
   * @returns {boolean} value indicating whether the element has the class
   * @memberof DOM
   */


  function hasClass(element, className) {
    return element.className.split(" ").includes(className);
  }
  /**
   * Removes a class from an element if it exists
   * @param {HTMLElement} element element
   * @param {string|Array} attrClass class
   * @memberof DOM
   */

  function removeClass(element, attrClass) {
    if (!isHTMLElement(element)) {
      console.error("The given element is not a valid HTML Element");
      return null;
    }

    if (Array.isArray(attrClass)) {
      attrClass.forEach(function (val) {
        return _removeClass(element, val);
      });
    }

    _removeClass(element, attrClass);

    element.className = formatClass(element.className);
    return element;
  }

  function _removeClass(el, c) {
    if (hasClass(el, c)) {
      el.className = el.className.replace(c, '');
    }
  }
  /**
   * Adds one or many classes to an element if it doesn't exist
   * @param {HTMLElement} element Element
   * @param {string|string[]} attrClass classes
   * @returns {HTMLElement} the element
   * @memberof DOM
   */


  function addClass(element, attrClass) {
    if (!isHTMLElement(element)) {
      console.error("The given element is not a valid HTML Element");
      return null;
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
   * @param {HTMLElement} element 
   * @param {string} attrClass ClassName
   * @returns {HTMLElement} the element
   * @memberof DOM
   */

  function toggleClass(element, attrClass) {
    if (hasClass(element, attrClass)) {
      removeClass(element, attrClass);
    } else {
      addClass(element, attrClass);
    }

    return element;
  }
  /**
   * Sets classes to an element
   * @param {HTMLElement} element 
   * @param {string|string[]} attrClass classes 
   * @returns {HTMLElement} the element
   * @memberof DOM
   */

  function setClass(element, attrClass) {
    if (!isHTMLElement(element)) {
      console.error("The given element is not a valid HTML Element");
      return null;
    }

    element.className = formatClass(parseClass(attrClass));
    return element;
  }

  /* istanbul ignore next */

  function echo(o) {}
  /**
   * Sets the attributes of an element
   * @param {HTMLElement} element element
   * @param {Object} attribute attribute
   * @returns {HTMLElement}
   * @memberof DOM
   */


  function addAttributes(element, attribute) {
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
   * @param {HTMLSelectElement} select
   * @param {string} val option value to select
   * @returns {boolean} value indicating whether the option was found and selected
   * @memberof DOM
   */

  function changeSelectValue(select, val) {
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
   * @param {HTMLElement} element Element
   * @memberof DOM
   */

  function conceal(element) {
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

    var parent = target.parentElement;

    if (max > 0) {
      return findAncestorIter(parent, callback, max);
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
   * Checks whether the selector is a class
   * @returns {boolean}
   * @private
   */

  var isClassSelector = function isClassSelector(selector) {
    return /^\.[a-zA-Z0-9_-]+$/.test(selector);
  };
  /**
   * Checks whether the selector is an id
   * @returns {boolean}
   * @private
   */


  var isIdSelector = function isIdSelector(selector) {
    return /^#[a-zA-Z0-9_-]+$/.test(selector);
  };
  /**
   * Returns the first Element within the specified container that matches the specified selector, group or selectors.
   * @param {string} selector A DOMString containing one or more selectors to match
   * @param {HTMLElement|DocumentFragment} [_container] Container queried
   * @returns {HTMLElement|null} The first Element matches that matches the specified set of CSS selectors.
   * @memberof DOM
   */


  function getElement(selector, _container) {
    var container = valOrDefault(_container, document);

    if (container instanceof DocumentFragment) {
      container.querySelector(selector);
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
   * @param {string} selector A DOMString containing one or more selectors to match
   * @param {HTMLElement|DocumentFragment} [_container] Container queried
   * @returns {HTMLCollection|NodeList} A live or *static* (not live) collection of the `container`'s children Element that match the `selector`.
   * @memberof DOM
   */

  function getElements(selector, _container) {
    var container = valOrDefault(_container, document);

    if (container instanceof DocumentFragment) {
      container.querySelectorAll(selector);
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

  function getElementSibling(el, dir, pred) {
    var predicate = function predicate(el) {
      return !isNullOrUndefined(el);
    };

    if (isFunction(pred)) {
      predicate = function predicate(el) {
        return !isNullOrUndefined(el) && !pred(el);
      };
    }

    var sibling = el[dir];

    while (predicate(sibling)) {
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
   * Removes all children of a node from the DOM or 
   * those that satisfies the predicate function
   * @param {Node} node 
   * @param {Function} [callback] Decides whether the node should be removed
   * @memberof DOM
   */

  function removeChildren(node, callback) {
    if (!isFunction(callback)) {
      removeAllChildren(node);
    } else {
      Array.from(node.childNodes).forEach(function (n) {
        if (callback(n)) {
          node.removeChild(n);
        }
      });
    }

    return node;
  }
  /**
   * Removes all children of a node from the DOM
   * @param {Node} node 
   * @private
   */

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

  function getInput(type, label) {
    if (isNullOrWhitespace(label.htmlFor)) {
      return getElement("input[type='".concat(valOrDefault(type, 'text'), "']"), label);
    }

    return getElement("#".concat(label.htmlFor));
  }

  var NONE = -1;
  var ERROR = -10;
  var Status = {
    ON: 'on',
    OFF: 'off'
  };
  var SelectorFactory = {
    create: function create(container, callback) {
      if (!isHTMLElement(container)) {
        console.error('%c@zenkai%c #Selector>%cSelectorFactory:%c Container must be an HTML Element', "text-decoration: underline", "", "font-weight: bold;", "font-weight: normal;");
        return ERROR;
      }

      var selector = null;

      switch (getType(container)) {
        case 'selector':
          selector = Object.create(BaseSelector);
          break;

        case 'form-selector':
          selector = Object.create(FormSelector);
          break;
      }

      Object.assign(selector, {
        container: container,
        querySelector: createDomQuery(selector),
        callback: isFunction(callback) ? callback : function (val, el) {}
      });
      return selector;
    }
  };
  var BaseSelector = {
    name: 'selector',
    container: null,
    current: null,
    callback: null,
    setCurrentItem: function setCurrentItem(item) {
      this.current = item;
      check(this.current, Status.ON);
      this.callback.call(this, item.dataset.value, this.current);
    },
    activate: function activate() {
      var _this = this;

      var value = this.container.dataset['value'];
      var defaultItem = null;
      var selectorItems = getElements('[data-selector]', this.container);

      var _loop = function _loop(i, len) {
        var item = selectorItems[i];

        if (getState(item) === Status.ON) {
          _this.setCurrentItem(item);
        }

        if (!isUndefined(value) && item.dataset.value === value) {
          defaultItem = item;
        }

        item.addEventListener('click', function () {
          if (_this.current) {
            uncheck(_this.current, Status.OFF);
          }

          _this.setCurrentItem(item);
        });
      };

      for (var i = 0, len = selectorItems.length; i < len; i++) {
        _loop(i);
      }

      if (isNull(this.current) && !isNull(defaultItem)) {
        this.setCurrentItem(defaultItem);
      }
    }
  };
  var FormSelector = {
    name: 'form-selector',
    container: null,
    current: null,
    callback: null,
    setCurrentItem: function setCurrentItem(item, _input) {
      var input = valOrDefault(_input, getInput('radio', item));
      input.checked = true;
      this.current = item;
      check(this.current, Status.ON);
      this.callback.call(this, input.value, this.current);
    },
    activate: function activate() {
      var _this2 = this;

      var value = this.container.dataset['value'];
      var defaultItem = null;
      var selectorItems = getElements('[data-selector]', this.container);

      var _loop2 = function _loop2(i, len) {
        var item = selectorItems[i];
        var input = getInput('radio', item);
        setState(item, input.checked ? Status.ON : Status.OFF);

        if (input.checked) {
          _this2.setCurrentItem(item, input);
        }

        if (input.value === value) {
          defaultItem = item;
        }

        input.addEventListener('change', function () {
          if (_this2.current) {
            uncheck(_this2.current, Status.OFF);
          }

          _this2.setCurrentItem(item, input);
        });
      };

      for (var i = 0, len = selectorItems.length; i < len; i++) {
        _loop2(i);
      }

      if (isNull(this.current) && !isNull(defaultItem)) {
        this.setCurrentItem(defaultItem);
      }
    }
  };

  var createDomQuery = function createDomQuery(selector) {
    return "[data-type=\"".concat(selector.name, "\"]");
  };

  var isSelector = function isSelector(element) {
    return RegExp('selector|form-selector').test(element.dataset['type']);
  };

  var domQuery = [createDomQuery(BaseSelector), createDomQuery(FormSelector)].join(',');

  function getSelectors(container) {
    if (isHTMLElement(container)) {
      return isSelector(container) ? [container] : getElements(domQuery, container);
    } else if (isString(container) && !isEmpty(container)) {
      var _container = getElement(container);

      return isNullOrUndefined(_container) ? NONE : getSelectors(_container);
    } else if (isNullOrUndefined(container)) {
      return getElements(domQuery);
    }

    return NONE;
  }

  function Selector(container, _callback) {
    var selectors = getSelectors(container);

    if (selectors === NONE) {
      return null;
    }

    for (var i = 0; i < selectors.length; i++) {
      var selector = SelectorFactory.create(selectors[i], _callback);
      selector.activate();
    }

    return selectors;
  }

  var NONE$1 = -1;
  var ERROR$1 = -10;
  var Status$1 = {
    ON: 'on',
    OFF: 'off'
  };
  var SwitchFactory = {
    create: function create(container, callback) {
      if (!isHTMLElement(container)) {
        console.error('%c@zenkai%c #Switch>%SwitchFactory:%c Container must be an HTML Element', "text-decoration: underline", "", "font-weight: bold;", "font-weight: normal;");
        return ERROR$1;
      }

      var widget = null;

      switch (getType(container)) {
        case 'switch':
          widget = Object.create(BaseSwitch);
          break;

        case 'form-switch':
          widget = Object.create(FormSwitch);
          break;
      }

      Object.assign(widget, {
        container: container,
        querySelector: createDomQuery$1(widget),
        callback: isFunction(callback) ? callback : function (val, el) {}
      });
      return widget;
    }
  };
  var BaseSwitch = {
    name: 'switch',
    container: null,
    callback: null,
    activate: function activate() {
      var _this = this;

      if (getState(this.container) === Status$1.ON) {
        check(this.container, Status$1.ON);
      } // Bind events


      this.container.addEventListener('click', function () {
        setState(_this.container, getState(_this.container) === Status$1.ON ? Status$1.OFF : Status$1.ON);

        _this.callback.call(_this, _this.container.dataset.value, _this.container);
      });
    }
  };
  var FormSwitch = {
    name: 'form-switch',
    container: null,
    callback: null,
    activate: function activate() {
      var _this2 = this;

      var input = getInput('checkbox', this.container); // Init

      setState(this.container, input.checked ? Status$1.ON : Status$1.OFF);
      this.callback.call(this, input.value, this.container); // Bind events

      input.addEventListener('change', function (e) {
        setState(_this2.container, input.checked ? Status$1.ON : Status$1.OFF);

        _this2.callback.call(_this2, input.value, _this2.container);
      });
    }
  };

  var createDomQuery$1 = function createDomQuery(selector) {
    return "[data-type=\"".concat(selector.name, "\"]");
  };

  var isSwitch = function isSwitch(element) {
    return RegExp('switch|form-switch').test(element.dataset['type']);
  };

  var domQuery$1 = [createDomQuery$1(BaseSwitch), createDomQuery$1(FormSwitch)].join(',');

  function getSliders(container) {
    if (isHTMLElement(container)) {
      return isSwitch(container) ? [container] : getElements(domQuery$1, container);
    } else if (isString(container) && !isEmpty(container)) {
      var _container = getElement(container);

      return isNullOrUndefined(_container) ? NONE$1 : getSliders(_container);
    } else if (isNullOrUndefined(container)) {
      return getElements(domQuery$1);
    }

    return NONE$1;
  }

  function Switch(container, _callback) {
    var switches = getSliders(container);

    if (switches === NONE$1) {
      return null;
    }

    for (var i = 0; i < switches.length; i++) {
      var switchWidget = SwitchFactory.create(switches[i], _callback);
      switchWidget.activate();
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
  var NONE$2 = -1;
  var State$1 = {
    OPEN: 'expanded',
    CLOSED: 'collapsed'
  };

  var toData = function toData(name) {
    return "[data-boost=".concat(name, "]");
  };

  var isCollapsible = function isCollapsible(el) {
    return ATTRIBUTE in el.dataset;
  };

  var isAccordion = function isAccordion(el) {
    return el.dataset['boost'] === 'accordion';
  };

  var CollapsibleFactory = {
    create: function create(args) {
      var instance = Object.create(this);
      Object.assign(instance, args);

      if (!isFunction(instance.callback)) {
        instance.callback = function (val, el) {};
      }

      return instance;
    },
    container: null,
    callback: null,
    header: null,
    content: null,
    name: 'collapsible',
    getState: function getState() {
      return this.container.dataset[this.name];
    },
    setState: function setState(val) {
      this.container.dataset[this.name] = val;
    },
    isCollapsed: function isCollapsed() {
      return this.getState() === State$1.CLOSED;
    },
    isExpanded: function isExpanded() {
      return this.getState() === State$1.OPEN;
    },
    open: function open() {
      this.toggle(show, State$1.OPEN, addClass);
    },
    close: function close() {
      this.toggle(hide, State$1.CLOSED, removeClass);
    },
    toggle: function toggle(displayCb, state, classCb) {
      displayCb(this.content);
      this.setState(state);
      classCb(this.container, 'expanded');
    },
    init: function init() {
      var container = this.container;
      this.header = getElement("[data-".concat(this.name, "-header]"), container);
      this.content = getElement("[data-".concat(this.name, "-content]"), container);
      return this;
    },
    activate: function activate() {
      this.init();

      if (this.isCollapsed()) {
        this.close();
      } else if (this.isExpanded()) {
        this.open();
      }

      this.bindEvents();
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
          if (_this.getState() === State$1.CLOSED) {
            _this.open();

            _this.callback(_this);
          } else if (header.parentNode === container) {
            _this.close();
          }
        }
      });
    }
  };
  var AccordionFactory = {
    create: function create(args) {
      var instance = Object.create(this);
      Object.assign(instance, args);

      if (!isFunction(instance.callback)) {
        instance.callback = function (val, el) {};
      }

      return instance;
    },
    container: null,
    items: null,
    callback: null,
    init: function init() {
      this.items = [];
      return this;
    },
    activate: function activate() {
      var _this2 = this;

      this.init();
      var accordionElements = getElements('[data-accordion]', this.container);

      for (var i = 0; i < accordionElements.length; i++) {
        var accordionElement = accordionElements[i];
        var collapsible = CollapsibleFactory.create({
          container: accordionElement,
          name: 'accordion',
          callback: function callback(selectedItem) {
            _this2.items.filter(function (item) {
              return item !== selectedItem && item.isExpanded();
            }).forEach(function (other) {
              return other.close();
            });
          }
        });
        this.items.push(collapsible);
        collapsible.activate();
      }
    }
  };
  /**
   * Collapsible
   * @param {HTMLElement} container 
   * @param {*} _callback
   */

  function Collapsible(container, _callback) {
    var collapsibles = getCollapsibles(container);

    if (collapsibles === NONE$2) {
      return null;
    }

    for (var i = 0; i < collapsibles.length; i++) {
      CollapsibleFactory.create({
        container: collapsibles[i],
        callback: _callback
      }).activate();
    }

    return collapsibles;
  }
  /**
   * Accordion
   * @param {HTMLElement} container 
   * @param {*} _callback
   */

  function Accordion(container, _callback) {
    var accordions = getAccordions(container);

    if (accordions === NONE$2) {
      return null;
    }

    for (var i = 0; i < accordions.length; i++) {
      AccordionFactory.create({
        container: accordions[i],
        callback: _callback
      }).activate();
    }

    return accordions;
  }

  function getCollapsibles(container) {
    if (isHTMLElement(container)) {
      return isCollapsible(container) ? [container] : getElements('[data-collapsible]', container);
    } else if (isString(container) && !isEmpty(container)) {
      var _container = getElement(container);

      return isNullOrUndefined(_container) ? NONE$2 : getCollapsibles(_container);
    } else if (isNullOrUndefined(container)) {
      return getElements('[data-collapsible]');
    }

    return NONE$2;
  }

  function getAccordions(container) {
    if (isHTMLElement(container)) {
      return isAccordion(container) ? [container] : getElements(toData('accordion'), container);
    } else if (isString(container) && !isEmpty(container)) {
      var _container = getElement(container);

      return isNullOrUndefined(_container) ? NONE$2 : getAccordions(_container);
    } else if (isNullOrUndefined(container)) {
      return getElements(toData('accordion'));
    }

    return NONE$2;
  }

  exports.Accordion = Accordion;
  exports.Collapsible = Collapsible;
  exports.DELETE = DELETE;
  exports.GET = GET;
  exports.POST = POST;
  exports.PUT = PUT;
  exports.Selector = Selector;
  exports.Switch = Switch;
  exports.addAttributes = addAttributes;
  exports.addClass = addClass;
  exports.addPath = addPath;
  exports.appendChildren = appendChildren;
  exports.boolToInt = boolToInt;
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
  exports.createTextArea = createTextArea;
  exports.createTextNode = createTextNode;
  exports.createThematicBreak = createThematicBreak;
  exports.createTime = createTime;
  exports.createU = createU;
  exports.createUnorderedList = createUnorderedList;
  exports.createVideo = createVideo;
  exports.dayOfWeek = dayOfWeek;
  exports.defProp = defProp;
  exports.find = find;
  exports.findAncestor = findAncestor;
  exports.findByPath = findByPath;
  exports.floatingLabel = floatingLabel;
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
  exports.isHTMLElement = isHTMLElement;
  exports.isInt = isInt;
  exports.isNode = isNode;
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
  exports.preprendChild = preprendChild;
  exports.queryBuilder = queryBuilder;
  exports.random = random;
  exports.removeAccents = removeAccents;
  exports.removeChildren = removeChildren;
  exports.removeClass = removeClass;
  exports.setClass = setClass;
  exports.shortDate = shortDate;
  exports.timeAgo = timeAgo;
  exports.toBoolean = toBoolean;
  exports.toggleClass = toggleClass;
  exports.valOrDefault = valOrDefault;
  exports.windowWidth = windowWidth;

  return exports;

}({}));
