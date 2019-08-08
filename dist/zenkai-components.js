var zcomponents = (function (exports) {
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
    fn['any'] = function (values) {
      for (var i = 0; i < values.length; i++) {
        if (fn(values[i])) {
          return true;
        }
      }

      return false;
    };

    fn['some'] = function (values) {
      var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      if (min === 1) {
        return fn.any(values);
      }

      var counter = 0;

      for (var i = 0; i < values.length; i++) {
        if (fn(values[i])) {
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
   * Returns a value indicating whether a string is null or made of whitespace.
   * @param {string} str string
   * @memberof TYPE
   */

  function isNullOrWhitespace(str) {
    return !str || isString(str) && (str.length === 0 || /^\s*$/.test(str));
  }

  var isClassName = function isClassName(selector) {
    return /^\.[a-zA-Z0-9_-]+$/.test(selector);
  };
  /**
   * Removes additional spaces in class attribute
   * @private
   */


  var cleanClass = function cleanClass(cn) {
    return cn.replace(/\s+/g, ' ').trim();
  };
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
   * @returns {boolean} Value indicating whether the object is an *Element*
   * @memberof DOM
   */

  function isHTMLElement(obj) {
    return isNullOrUndefined(obj) ? false : obj.nodeType === 1 && obj instanceof HTMLElement;
  }
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

    if (/^#[a-zA-Z0-9_-]+$/.test(selector)) {
      return document.getElementById(selector.substring(1));
    }

    if (isClassName(selector)) {
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

    if (isClassName(selector)) {
      return container.getElementsByClassName(selector.substring(1));
    }

    return container.querySelectorAll(selector);
  }
  /**
   * Finds an ancestor of an element
   * @param {Element} target 
   * @param {*} callback 
   * @param {number} max Maximum number of iterations
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
   * Verifies that an element has a class
   * @param {HTMLElement} e element
   * @param {string} c class
   * @memberof DOM
   */

  function hasClass(e, c) {
    return e.className.split(" ").indexOf(c) !== -1;
  }
  /**
   * Removes a class from an element if it exists
   * @param {HTMLElement} el element
   * @param {string|Array} c class
   * @memberof DOM
   */

  function removeClass(el, c) {
    if (Array.isArray(c)) {
      c.forEach(function (val) {
        return _removeClass(el, val);
      });
    }

    _removeClass(el, c);

    el.className = cleanClass(el.className);
  }

  function _removeClass(e, c) {
    if (hasClass(e, c)) {
      e.className = e.className.replace(c, '');
    }
  }
  /**
   * Adds one or many classes to an element if it doesn't exist
   * @param {HTMLElement} el Element
   * @param {string} c classes
   * @memberof DOM
   */


  function addClass(el, c) {
    // If c is an Array => Format c as a space-separated string
    if (Array.isArray(c)) {
      c = c.map(function (c) {
        return valOrDefault(c.class, c);
      }).join(' ');
    }

    var strClass = valOrDefault(c.class, c);

    if (isNullOrWhitespace(el.className)) {
      el.className = strClass;
    } else if (!hasClass(el, c)) {
      el.className += " " + strClass;
    }

    el.className = cleanClass(el.className);
  }

  /**
   * Creates an element
   * @param {string} tagName 
   * @param {object} _attribute 
   * @returns {HTMLElement}
   * @private
   */

  /* istanbul ignore next */

  function create(tagName, _attribute) {
    var element = document.createElement(tagName);

    if (_attribute) {
      addAttributes(element, _attribute);
    }

    return element;
  }
  /**
   * Creates a document fragment
   * @function
   * @returns {DocumentFragment}
   * @memberof DOM
   */

  var createDocFragment = function createDocFragment() {
    return document.createDocumentFragment();
  };

  /**
   * Creates a `<header>` element with some attributes
   * @function
   * @param {object} [attribute] 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createHeader = create.bind(null, 'header');
  /**
   * Creates an `<footer>` element with some attributes
   * @function
   * @param {Object} [attribute] attributes
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createFooter = create.bind(null, 'footer');
  /**
   * Creates an `<main>` element with some attributes
   * @function
   * @param {Object} [attribute] attributes
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createMain = create.bind(null, 'main');
  /**
   * Creates an `<article>` element with some attributes
   * @function
   * @param {Object} [attribute] attributes
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createArticle = create.bind(null, 'article');
  /**
   * Creates an `<section>` element with some attributes
   * @function
   * @param {Object} [attribute] attributes
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createSection = create.bind(null, 'section');
  /**
   * Creates an `<nav>` element with some attributes
   * @function
   * @param {Object} [attribute] attributes
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createNav = create.bind(null, 'nav');
  /**
   * Creates an `<aside>` element with some attributes
   * @function
   * @param {Object} [attribute] attributes
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createAside = create.bind(null, 'aside');
  /**
   * Creates a `<h1>` element with some attributes
   * @function
   * @param {Object} [attribute] attributes
   * @returns {HTMLHeadingElement}
   * @memberof DOM
   */

  var createH1 = create.bind(null, 'h1');
  /**
   * Creates a `<h2>` element with some attributes
   * @function
   * @param {Object} [attribute] attributes
   * @returns {HTMLHeadingElement}
   * @memberof DOM
   */

  var createH2 = create.bind(null, 'h2');
  /**
   * Creates a `<h3>` element with some attributes
   * @function
   * @param {Object} [attribute] attributes
   * @returns {HTMLHeadingElement}
   * @memberof DOM
   */

  var createH3 = create.bind(null, 'h3');
  /**
   * Creates a `<h4>` element with some attributes
   * @function
   * @param {Object} [attribute] attributes
   * @returns {HTMLHeadingElement}
   * @memberof DOM
   */

  var createH4 = create.bind(null, 'h4');
  /**
   * Creates a `<h5>` element with some attributes
   * @function
   * @param {Object} [attribute] attributes
   * @returns {HTMLHeadingElement}
   * @memberof DOM
   */

  var createH5 = create.bind(null, 'h5');
  /**
   * Creates a `<h6>` element with some attributes
   * @function
   * @param {Object} [attribute] attributes
   * @returns {HTMLHeadingElement}
   * @memberof DOM
   */

  var createH6 = create.bind(null, 'h6'); //#endregion

  /**
   * Creates a `<div>` element with some attributes
   * @function
   * @param {Object} [attribute] attributes
   * @returns {HTMLDivElement}
   * @memberof DOM
   */

  var createDiv = create.bind(null, 'div');
  /**
   * Creates a `<p>` element with some attributes
   * @param {Object} [attr] attributes
   * @returns {HTMLParagraphElement}
   * @memberof DOM
   */

  var createParagraph = create.bind(null, 'p');
  /**
   * Creates a `<ul>` element with some attributes
   * @param {Object} [attr] attributes
   * @returns {HTMLUListElement}
   * @memberof DOM
   */

  var createUnorderedList = create.bind(null, 'ul');
  /**
   * Creates a `<ol>` element with some attributes
   * @param {Object} [attr] attributes
   * @returns {HTMLUListElement}
   * @memberof DOM
   */

  var createOrderedList = create.bind(null, 'ol');
  /**
   * Creates a `<li>` element with some attributes
   * @param {Object} [attr] attributes
   * @memberof DOM
   */

  var createListItem = create.bind(null, 'li');
  /**
   * Creates a `<dl>` element with some attributes
   * @param {Object} [attr] attributes
   * @returns {HTMLDListElement}
   * @memberof DOM
   */

  var createDescriptionList = create.bind(null, 'dl');
  /**
   * Creates a `<dt>` element with some attributes
   * @param {Object} [attr] attributes
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createDescriptionTerm = create.bind(null, 'dt');
  /**
   * Creates a `<dd>` element with some attributes
   * @param {Object} [attr] attributes
   * @memberof DOM
   */

  var createDescriptionDetails = create.bind(null, 'dd'); // Inline Element
  /**
   * Creates a `<source>` element with some attributes
   * @function
   * @param {Object} [attr] attributes
   * @returns {HTMLSourceElement}
   * @memberof DOM
   */

  var createSource = create.bind(null, "source");
  /**
   * Creates a `<picture>` element with some attributes
   * @function
   * @param {Object} [attr] attributes
   * @returns {HTMLPictureElement}
   * @memberof DOM
   */

  var createPicture = create.bind(null, "picture");
  /**
   * Creates a `<figure>` element with some attributes
   * @function
   * @param {Object} [attr] attributes
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createFigure = create.bind(null, "figure");
  /**
   * Creates a `<figcaption>` element with some attributes
   * @function
   * @param {Object} [attr] attributes
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createFigureCaption = create.bind(null, "figcaption");
  /**
   * Creates a `<span>` element with some attributes
   * @function
   * @param {Object} [attr] attributes
   * @returns {HTMLSpanElement}
   * @memberof DOM
   */

  var createSpan = create.bind(null, "span");
  /**
   * Creates a `<strong>` element with some attributes
   * @function
   * @param {Object} [attr] attributes
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createStrong = create.bind(null, "strong");
  /**
   * Creates a `<em>` element with some attributes
   * @function
   * @param {Object} [attr] attributes
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createEmphasis = create.bind(null, "em");
  /**
   * Creates a `<mark>` element with some attributes
   * @function
   * @param {Object} [attr] attributes
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createMark = create.bind(null, "mark");
  /**
   * Creates a `<samp>` element with some attributes
   * @function
   * @param {Object} [attr] attributes
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createSample = create.bind(null, "samp");
  /**
   * Creates a `<sub>` element with some attributes
   * @function
   * @param {Object} [attr] attributes
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createSubscript = create.bind(null, "sub");
  /**
   * Creates a `<sup>` element with some attributes
   * @function
   * @param {Object} [attr] attributes
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createSuperscript = create.bind(null, "sup");
  /**
   * Creates a `<abbr>` element with some attributes
   * @function
   * @param {Object} [attr] attributes
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createAbbreviation = create.bind(null, "abbr");
  /**
   * Creates a `<b>` element with some attributes
   * @function
   * @param {Object} [attr] attributes
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createB = create.bind(null, "b");
  /**
   * Creates a `<i>` element with some attributes
   * @function
   * @param {Object} [attr] attributes
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createI = create.bind(null, "i");
  /**
   * Creates a `<s>` element with some attributes
   * @function
   * @param {Object} [attr] attributes
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createS = create.bind(null, 's');
  /**
   * Creates a `<u>` element with some attributes
   * @function
   * @param {Object} [attr] attributes
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createU = create.bind(null, 'u');
  /**
   * Creates a `<cite>` element with some attributes
   * @function
   * @param {Object} [attr] attributes
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createCite = create.bind(null, "cite");
  /**
   * Creates a `<code>` element with some attributes
   * @function
   * @param {Object} [attr] attributes
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createCode = create.bind(null, "code"); //#region Form-associated Element

  /**
   * Creates a `<form>` element with some attributes
   * @function
   * @param {Object} [attr] attributes
   * @returns {HTMLLabelElement}
   * @memberof DOM
   */

  var createForm = create.bind(null, 'form');
  /**
   * Creates a `<input>` element with some attributes
   * @param {Object} [attr] attributes
   * @returns {HTMLInputElement}
   * @memberof DOM
   */

  function createInput(type, attr) {
    var input = create('input', attr);
    input.type = valOrDefault(type, "text");
    return input;
  }
  ["button", "checkbox", "color", "date", "datetime-local", "email", "file", "hidden", "image", "month", "number", "password", "radio", "range", "reset", "search", "submit", "tel", "text", "time", "url", "week"].forEach(function (type) {
    createInput[type] = createInput.bind(null, type);
  });
  /**
   * Creates a `<label>` element with some attributes
   * @function
   * @param {Object} [attr] attributes
   * @returns {HTMLLabelElement}
   * @memberof DOM
   */

  var createLabel = create.bind(null, 'label');
  /**
   * Creates a `<fieldset>` element with some attributes
   * @function
   * @param {Object} [attr] attributes
   * @returns {HTMLLabelElement}
   * @memberof DOM
   */

  var createFieldset = create.bind(null, 'fieldset');
  /**
   * Creates a `<legend>` element with some attributes
   * @function
   * @param {Object} [attr] attributes
   * @returns {HTMLLabelElement}
   * @memberof DOM
   */

  var createLegend = create.bind(null, 'legend');
  /**
   * Creates a `<datalist>` element with some attributes
   * @function
   * @param {Object} [attr] attributes
   * @returns {HTMLTextAreaElement}
   * @memberof DOM
   */

  var createDataList = create.bind(null, 'datalist');
  /**
   * Creates a `<select>` element with some attributes
   * @function
   * @param {Object} [attr] attributes
   * @returns {HTMLLabelElement}
   * @memberof DOM
   */

  var createSelect = create.bind(null, 'select');
  /**
   * Creates a `<option>` element with some attributes
   * @function
   * @param {Object} [attr] attributes
   * @returns {HTMLLabelElement}
   * @memberof DOM
   */

  var createOption = create.bind(null, 'option');
  /**
   * Creates a `<optgroup>` element with some attributes
   * @function
   * @param {Object} [attr] attributes
   * @returns {HTMLLabelElement}
   * @memberof DOM
   */

  var createOptionGroup = create.bind(null, 'optgroup');
  /**
   * Creates a `<textarea>` element with some attributes
   * @function
   * @param {Object} [attr] attributes
   * @returns {HTMLTextAreaElement}
   * @memberof DOM
   */

  var createTextArea = create.bind(null, 'textarea');
  /**
   * Creates a `<meter>` element with some attributes
   * @function
   * @param {Object} [attr] attributes
   * @returns {HTMLTextAreaElement}
   * @memberof DOM
   */

  var createMeter = create.bind(null, 'meter');
  /**
   * Creates a `<progress>` element with some attributes
   * @function
   * @param {Object} [attr] attributes
   * @returns {HTMLTextAreaElement}
   * @memberof DOM
   */

  var createProgress = create.bind(null, 'progress');
  /**
   * Creates a `<output>` element with some attributes
   * @function
   * @param {Object} [attr] attributes
   * @returns {HTMLTextAreaElement}
   * @memberof DOM
   */

  var createOutput = create.bind(null, 'output');
  /**
   * Creates a `<button>` element with some attributes
   * @param {Object} [attr] attributes
   * @memberof DOM
   */

  function createButton(type, attr) {
    var btn = create("button", attr);
    btn.type = valOrDefault(type, "button");
    return btn;
  }
  ["submit", "reset", "button"].forEach(function (type) {
    createButton[type] = createButton.bind(null, type);
  }); //#endregion
  //#region Table Element

  /**
   * Creates a `<table>` element with some attributes
   * @function
   * @param {Object} [attr] attributes
   * @returns {HTMLTableElement}
   * @memberof DOM
   */

  var createTable = create.bind(null, "table");
  /**
   * Creates a `<caption>` element with some attributes
   * @function
   * @param {Object} [attr] attributes
   * @returns {HTMLTableCaptionElement}
   * @memberof DOM
   */

  var createCaption = create.bind(null, "caption");
  /**
   * Creates a `<thead>` element with some attributes
   * @function
   * @param {Object} [attr] attributes
   * @returns {HTMLTableSectionElement}
   * @memberof DOM
   */

  var createTableHeader = create.bind(null, "thead");
  /**
   * Creates a `<tbody>` element with some attributes
   * @function
   * @param {Object} [attr] attributes
   * @returns {HTMLTableSectionElement}
   * @memberof DOM
   */

  var createTableBody = create.bind(null, "tbody");
  /**
   * Creates a `<tfoot>` element with some attributes
   * @function
   * @param {Object} [attr] attributes
   * @returns {HTMLTableSectionElement}
   * @memberof DOM
   */

  var createTableFooter = create.bind(null, "tfoot");
  /**
   * Creates a `<col>` element with some attributes
   * @function
   * @param {Object} [attr] attributes
   * @returns {HTMLTableColElement}
   * @memberof DOM
   */

  var createTableColumn = create.bind(null, "col");
  /**
   * Creates a `<colgroup>` element with some attributes
   * @function
   * @param {Object} [attr] attributes
   * @returns {HTMLTableColElement}
   * @memberof DOM
   */

  var createTableColumnGroup = create.bind(null, "colgroup");
  /**
   * Creates a `<tr>` element with some attributes
   * @param {Object} [attr] attributes
   * @returns {HTMLTableRowElement}
   * @memberof DOM
   */

  var createTableRow = create.bind(null, "tr");
  /**
   * Creates a `<th>` element with some attributes
   * @function
   * @param {Object} [attr] attributes
   * @returns {HTMLTableHeaderCellElement}
   * @memberof DOM
   */

  var createTableHeaderCell = create.bind(null, "th");
  /**
   * Creates a `<td>` element with some attributes
   * @function
   * @param {Object} [attr] attributes
   * @returns {HTMLTableDataCellElement}
   * @memberof DOM
   */

  var createTableCell = create.bind(null, "td"); //#endregion

  /* istanbul ignore next */

  function echo(o) {
  }
  /* istanbul ignore next */


  var setClass = function setClass(el, c) {
    // If c is an Array => Format c as a space-separated string
    if (Array.isArray(c)) {
      c = c.join(' ');
    }

    if (isString(c)) {
      el.className = c;
    }
  };
  /**
   * Sets the attributes of an element
   * @param {HTMLElement} element element
   * @param {Object} attribute attribute
   * @memberof DOM
   */


  function addAttributes(element, attribute) {
    var ATTR_MAP = {
      accept: [assign],
      children: [addChildren, element],
      class: [setClass, element],
      data: [Object.assign, element.dataset],
      disabled: [assign],
      draggable: [assign],
      editable: [assign, 'contenteditable'],
      html: [assign, 'innerHTML'],
      id: [assign],
      placeholder: [assign],
      readonly: [assign, 'readOnly'],
      style: [assign],
      text: [assign, 'textContent'],
      title: [assign],
      value: [assign]
    };
    var DEFAULT_MAP = [echo, '']; // HTML attributes

    var _arr = Object.keys(attribute);

    for (var _i = 0; _i < _arr.length; _i++) {
      var key = _arr[_i];
      var val = ATTR_MAP[key] || DEFAULT_MAP;
      val[0](val[1] || key, attribute[key]);
    }

    function assign(key, val) {
      element[key] = val;
    }
  }
  /**
   * Appends the children to the element
   * @param {HTMLElement} el element
   * @param {HTMLCollection} children children elements
   * @private
   * @memberof DOM
   */

  /* istanbul ignore next */

  function addChildren(el, children) {
    if (Array.isArray(children)) {
      appendChildren(el, children);
    } else if (children instanceof Element) {
      el.appendChild(children);
    }

    return el;
  }
  /**
   * Append a list of elements to a node.
   * @param {HTMLElement} parent
   * @param {HTMLElement[]} children
   * @memberof DOM
   */


  function appendChildren(parent, children) {
    var fragment = createDocFragment();
    children.forEach(function (element) {
      fragment.appendChild(element);
    });
    parent.appendChild(fragment);
    fragment = null;
    return parent;
  }

  /** 
   * @enum 
   * @ignore
   * @memberof DOM
   */

  var UI = {
    COLLAPSE: 'collapse',
    CHECKED: 'checked',
    DISABLED: 'disabled',
    EMPTY: 'empty',
    HIDDEN: 'hidden',
    SELECTED: 'selected'
  };
  /**
   * Shows an element
   * @param {Element} el Element
   * @memberof DOM
   */

  function show(el) {
    removeClass(el, UI.HIDDEN);
  }
  /**
   * Hides an element
   * @param {Element} el element
   * @memberof DOM
   */

  function hide(el) {
    addClass(el, UI.HIDDEN);
  }

  /** @namespace DOM */

  /**
   * Inserts an item in an array at the specified index
   * @param {Object[]} arr array
   * @param {number} index 
   * @param {object} item 
   * @returns {number} The new length of the array
   * @memberof TYPE
   */

  /**
   * Returns the index or value of the first element in the object
   * @param {Object|Array} obj 
   * @param {any} value 
   * @memberof TYPE
   */

  /** @namespace TYPE */

  function floatingLabel(form) {
    var labels = getElements('.form-label', form);

    for (var i = 0; i < labels.length; i++) {
      var lbl = labels[i];

      if (lbl.dataset['type'] == 'placeholder' && !isNullOrWhitespace(lbl.htmlFor)) {
        var input = getElement("#".concat(lbl.htmlFor));

        if (isUndefined(input)) {
          throw new Error("Missing input for label: ".concat(lbl.htmlFor));
        }

        if (isNullOrWhitespace(input.placeholder)) {
          bindEvents(input, lbl);

          if (input.value.length === 0) {
            addClass(lbl, 'down');
          }
        }
      }
    } // add counters


    var counters = getElements('[data-counter]', form);

    var _loop = function _loop(_i) {
      var counter = counters[_i];
      var input = getElement("#".concat(counter.dataset['counter']));
      counter.dataset['counterMax'] = input.maxLength;

      if (input) {
        counter.dataset['counterVal'] = input.value.length;
        input.addEventListener('input', function (e) {
          counter.dataset['counterVal'] = input.value.length;
        });
      }
    };

    for (var _i = 0; _i < counters.length; _i++) {
      _loop(_i);
    }

    function bindEvents(input, lbl) {
      if (isNullOrWhitespace(input.placeholder)) {
        input.addEventListener('focus', function (e) {
          input.placeholder = "";
          removeClass(lbl, 'down');
          addClass(lbl.parentElement, 'focused');
        });
        input.addEventListener('blur', function (e) {
          if (input.value.length === 0) {
            addClass(lbl, 'down');
          }

          removeClass(lbl.parentElement, 'focused');
        });
      }
    }

    return labels;
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
        console.error('SelectorFactory>>Container must be an HTML Element');
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
      this.callback(item.dataset.value, this.current);
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
        _loop(i, len);
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
      this.current = item;
      check(this.current, Status.ON);
      this.callback(input.value, this.current);
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
        _loop2(i, len);
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
        console.error('SwitchFactory>>Container must be an HTML Element');
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

        _this.callback(_this.container.dataset.value, _this.container);
      });
    }
  };
  var FormSwitch = {
    name: 'form-switch',
    container: null,
    callback: null,
    activate: function activate() {
      var _this2 = this;

      var input = getInput('checkbox', this.container);
      setState(this.container, input.checked ? Status$1.ON : Status$1.OFF); // Bind events

      input.addEventListener('change', function (e) {
        setState(_this2.container, input.checked ? Status$1.ON : Status$1.OFF);

        _this2.callback(input.value, _this2.container);
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

  /** @namespace FORM */

  var ATTRIBUTE = 'collapsible';
  var NONE$2 = -1;
  var State = {
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
      return this.getState() === State.CLOSED;
    },
    isExpanded: function isExpanded() {
      return this.getState() === State.OPEN;
    },
    open: function open() {
      this.toggle(show, State.OPEN, addClass);
    },
    close: function close() {
      this.toggle(hide, State.CLOSED, removeClass);
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
          if (_this.getState() === State.CLOSED) {
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
  exports.Selector = Selector;
  exports.Switch = Switch;
  exports.floatingLabel = floatingLabel;

  return exports;

}({}));
