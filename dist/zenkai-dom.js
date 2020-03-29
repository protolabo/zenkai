var zdom = (function (exports) {
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

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
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

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
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

  /** @private */
  var hasOwnProperty = Object.prototype.hasOwnProperty;
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
   * Capitalizes all words in a sequence
   * @param {string} str Sequence
   * @returns {string} Capitalized sequence
   * @memberof STD
   */

  function capitalize(str) {
    return str.toLowerCase().replace(/\b\w/g, function (s) {
      return s.toUpperCase();
    });
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
   * Verifies that at least one value satisfies the condition
   * @param {*[]} values Set of values
   * @param {Function} pred Condition
   * @returns {boolean} A value indicating whether at least one value satisfies the condition
   * @memberof STD
   */

  var some = function some(values, pred) {
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
    for (var i = 0; i < values.length; i++) {
      var value = values[i];

      if (!pred.apply(void 0, _toConsumableArray(Array.isArray(value) ? value : [value]))) {
        return false;
      }
    }

    return true;
  };

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

    some(kinds, function (kind) {
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

      var interfaceName = "HTML".concat(hasOwn(TagNameMapping, name) ? TagNameMapping[name] : pascalCase(name), "Element");

      if (!(isInstanceOf(window[interfaceName]) || hasTag(name))) {
        return false;
      }

      if (isIterable(type) && !isEmpty(type)) {
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
  /* istanbul ignore next */


  function _htmlToElement(prop, html) {
    if (!isString(html)) {
      return null;
    }

    var template = createTemplate(html);
    return template[prop];
  }
  /**
   * Converts an html string to an HTML Element
   * @param {!string} html 
   * @returns {Node}
   * @memberof DOM
   */


  var htmlToElement = _htmlToElement.bind('firstChild');
  /**
   * Converts an html string to a list of HTML Elements
   * @param {!string} html 
   * @returns {NodeList}
   * @memberof DOM
   */

  var htmlToElements = _htmlToElement.bind('childNodes');
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
   * @param {!HTMLElement} target 
   * @param {!HTMLElement} element 
   * @memberof DOM
   */

  function insertBeforeElement(target, element) {
    if (!all([target, element], isElement)) {
      throw new Error("The given element or target is not a valid HTML Element");
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
      throw new Error("The given element or target is not a valid HTML Element");
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
      throw new Error("The given element or target is not a valid HTML Element");
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
      throw new Error("The given parent is not a valid Node");
    }

    if (!isHTMLCollection(children) && !isIterable(children) || isString(children)) {
      throw new Error("The given children is not a valid HTMLCollection/HTMLElement array");
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
    }

    return c.toString();
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
   * Sets the attributes of an element
   * @param {!HTMLElement} element element
   * @param {Object} attribute attribute
   * @returns {HTMLElement}
   * @memberof DOM
   */


  function addAttributes(element, attribute) {
    if (!isHTMLElement(element)) {
      throw new Error("The given element parameter is not a valid HTML Element");
    }

    if (!isObject(attribute)) {
      return element;
    }

    var ATTR_MAP = {
      // Global attributes
      accesskey: [assign, 'accessKey'],
      "class": [setClass, element],
      data: [Object.assign, element.dataset],
      editable: [assign, 'contentEditable'],
      draggable: [assign],
      hidden: [assign],
      id: [assign],
      lang: [assign],
      html: [assign, 'innerHTML'],
      style: [assign],
      target: [assign],
      tabindex: [assign, 'tabIndex'],
      text: [assign, 'textContent'],
      title: [assign],
      // Quote attributes
      cite: [assign],
      // Anchor attributes
      href: [assign],
      // Link attributes
      alt: [assign],
      src: [assign],
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
   * @param {string} value option value to select
   * @returns {boolean} value indicating whether the option was found and selected
   * @memberof DOM
   */

  function changeSelectValue(select, value) {
    if (!isHTMLElement(select, "select")) {
      throw new Error("The given select parameter is not a valid HTML Select element");
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

    if (!isNullOrUndefined(_attribute)) {
      addAttributes(element, _attribute);
    }

    if (!isNullOrUndefined(_children)) {
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
   * @returns {HTMLBRElement}
   * @memberof DOM
   */

  var createLineBreak = function createLineBreak() {
    return create('br');
  };
  /**
   * Creates a `hr` element \
   * Thematic break
   * @function createThematicBreak
   * @returns {HTMLHRElement}
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
   * @function createBlockQuotation
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLQuoteElement}
   * @memberof DOM
   */

  var createBlockQuotation = create.bind(null, 'blockquote');
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
  var inputTypes = ["button", "checkbox", "color", "date", "datetime-local", "email", "file", "hidden", "image", "month", "number", "password", "radio", "range", "reset", "search", "submit", "tel", "text", "time", "url", "week"];
  /**
   * Creates an `<input>` element with a specified type and 
   * optionally some attributes
   * @param {string} type
   * @param {object} _attribute 
   * @memberof DOM
   */

  function createInputAs(type, _attribute) {
    if (!inputTypes.includes(type)) {
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
  var buttonTypes = ["button", "submit", "reset"];
  /**
   * Creates a `<button>` element with a specified type and 
   * optionally some attributes and children elements
   * @param {string} type
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @memberof DOM
   */

  function createButtonAs(type, _attribute, _children) {
    if (!buttonTypes.includes(type)) {
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
   * @returns {HTMLTableCellElement}
   * @memberof DOM
   */

  var createTableHeaderCell = create.bind(null, "th");
  /**
   * Creates a `<td>` element with some attributes
   * @function createTableCell
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLTableCellElement}
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
    if (!isHTMLElement(element)) {
      throw new Error("The given element is not a valid HTML Element");
    }

    if (isNullOrUndefined(children)) {
      return element;
    }

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
   * @param {string} dir sibling direction
   * @param {HTMLElement} element element
   * @returns {(Element|null)} Element or null
   * @private
   */

  /* istanbul ignore next */

  function getElementSibling(dir, element, pred) {
    var sibling = element[dir];

    if (isFunction(pred)) {
      while (isElement(sibling) && pred(sibling)) {
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
   * @param {Element} target 
   * @param {Function} pred Decides whether the target is found
   * @param {number} [_max] Maximum number of iterations
   * @returns {Element|null}
   * @memberof DOM
   */

  function findAncestor(target, pred, _max) {
    if (!isElement(target)) {
      throw new Error("The given target parameter is not a valid HTML Element");
    }

    if (!isFunction(pred)) {
      throw new Error("The given pred parameter is not a valid Function");
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
      throw new Error("The given node parameter is not a valid Node");
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
   * Copy content to clipboard
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

  exports.addAttributes = addAttributes;
  exports.addClass = addClass;
  exports.appendChildren = appendChildren;
  exports.changeSelectValue = changeSelectValue;
  exports.cloneTemplate = cloneTemplate;
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
  exports.findAncestor = findAncestor;
  exports.getElement = getElement;
  exports.getElements = getElements;
  exports.getNextElementSibling = getNextElementSibling;
  exports.getPreviousElementSibling = getPreviousElementSibling;
  exports.getTemplate = getTemplate;
  exports.hasClass = hasClass;
  exports.htmlToElement = htmlToElement;
  exports.htmlToElements = htmlToElements;
  exports.insertAfterElement = insertAfterElement;
  exports.insertBeforeElement = insertBeforeElement;
  exports.isDocumentFragment = isDocumentFragment;
  exports.isElement = isElement;
  exports.isHTMLCollection = isHTMLCollection;
  exports.isHTMLElement = isHTMLElement;
  exports.isInElement = isInElement;
  exports.isInViewport = isInViewport;
  exports.isNode = isNode;
  exports.isNodeList = isNodeList;
  exports.preprendChild = preprendChild;
  exports.removeChildren = removeChildren;
  exports.removeClass = removeClass;
  exports.setClass = setClass;
  exports.toggleClass = toggleClass;
  exports.windowHeight = windowHeight;
  exports.windowWidth = windowWidth;

  return exports;

}({}));
