var zenui = (function (exports) {
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
    if (isNullOrWhitespace(str)) {
      return str;
    }

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
   * Removes additional spaces in class attribute
   * @param {string} val class attribute's value
   * @returns {string} formatted value
   * @private
   */

  var formatClass = function formatClass(val) {
    return val.replace(/\s+/g, ' ').trim();
  };
  /**
   * Add classes to an element
   * @param {HTMLElement} element 
   * @param {string|string[]} value 
   * @private
   * @memberof DOM
   */


  function addClass(element, value) {
    if (!isIterable(value)) {
      throw new TypeError("Bad argument: The passed `value` argument is not a string or array");
    }

    if (Array.isArray(value)) {
      var _element$classList;

      (_element$classList = element.classList).add.apply(_element$classList, _toConsumableArray(value));
    } else {
      var formattedValue = formatClass(value);

      if (isNullOrWhitespace(element.className)) {
        element.className = formattedValue;
      } else {
        addClass(element, formattedValue.split(' '));
      }
    }

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

  var GLOBAL_ATTRIBUTES = "accesskey,autocapitalize,class,dataset,editable,draggable,hidden,id,inputmode,lang,style,tabindex,title";
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
    "for": [assign, 'htmlFor'],
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
    // Meta attributes
    charset: [assignAttribute, 'charset'],
    content: [assign, 'content'],
    "http-equiv": [assign, 'httpEquiv'],
    // Object attributes
    data: [assign, 'data'],
    // Quote attributes
    cite: [assign, 'cite'],
    // Table attributes
    abbr: [assign, 'abbr'],
    colspan: [assign, 'colSpan'],
    span: [assign, 'span'],
    rowspan: [assign, 'rowSpan'],
    scope: [assign, 'scope'],
    // Track attributes
    "default": [assign, 'default'],
    kind: [assign, 'kind'],
    srclang: [assign, 'srclang'],
    // Mix attributes
    href: [assign, 'href'],
    hreflang: [assign, 'hreflang'],
    datetime: [assign, 'dateTime'],
    name: [assign, 'name'],
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

  function addAttributes(element, attribute, validAttributes) {
    if (!isHTMLElement(element)) {
      throw new TypeError("Bad argument: The given 'element' argument is not a valid HTML Element");
    }

    if (!isObject(attribute)) {
      return element;
    }

    var isValid = function isValid(key) {
      return GLOBAL_ATTRIBUTES.includes(key) || isNullOrUndefined(validAttributes) || validAttributes.includes(key);
    };

    for (var _i = 0, _Object$keys = Object.keys(attribute); _i < _Object$keys.length; _i++) {
      var key = _Object$keys[_i];

      if (isValid(key)) {
        var value = attribute[key];
        var args = AttributeHandler[key].slice(0);
        var fn = args.shift();

        if (!isNullOrUndefined(value)) {
          fn.apply(void 0, [element].concat(_toConsumableArray(args), [value]));
        }
      }
    }

    return element;
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
  } // TODO: createScript
  /******************************************************************************
   * Metadata Element
   *****************************************************************************/

  /**
   * Creates an `<base>` element with some attributes
   * @function createBase
   * @param {object} _attribute 
   * @returns {HTMLBaseElement}
   * @memberof DOM
   */

  var createBase = createEmptyElement.bind(null, "base", "href,target");
  /**
   * Creates a `<link>` element with some attributes
   * @function createLink
   * @param {object} _attribute Global attributes
   * @returns {HTMLLinkElement}
   * @memberof DOM
   */

  var createLink = createEmptyElement.bind(null, "link", "as,crossorigin,disabled,href,hreflang,media,rel,sizes,type");
  /**
   * Creates a `<meta>` element with some attributes
   * @function createLink
   * @param {object} _attribute Global attributes
   * @returns {HTMLMetaElement}
   * @memberof DOM
   */

  var createMeta = createEmptyElement.bind(null, "meta", "charset,content,http-equiv,name");
  /**
   * Creates a `<title>` element with some attributes
   * @function createTemplate
   * @param {object} _attribute Global attributes
   * @param {Text|HTMLElement|HTMLElement[]} _children Content
   * @returns {HTMLTitleElement}
   * @memberof DOM
   */

  var createTitle = createElement.bind(null, "title", "html,text");
  /**
   * Creates a `<template>` element with some attributes
   * @function createTemplate
   * @param {object} _attribute Global attributes
   * @param {Text|HTMLElement|HTMLElement[]} _children Content
   * @returns {HTMLTemplateElement}
   * @memberof DOM
   */

  var createTemplate = createElement.bind(null, "template", "html,text");
  /******************************************************************************
   * Sectionning Element
   *****************************************************************************/

  /**
   * Creates a `<header>` element with some attributes
   * @function createHeader
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createHeader = createElement.bind(null, "header", "html,text");
  /**
   * Creates an `<footer>` element with some attributes
   * @function createFooter
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createFooter = createElement.bind(null, "footer", "html,text");
  /**
   * Creates an `<main>` element with some attributes
   * @function createMain
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createMain = createElement.bind(null, "main", "html,text");
  /**
   * Creates an `<article>` element with some attributes
   * @function createArticle
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createArticle = createElement.bind(null, "article", "html,text");
  /**
   * Creates an `<section>` element with some attributes
   * @function createSection
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createSection = createElement.bind(null, "section", "html,text");
  /**
   * Creates an `<nav>` element with some attributes
   * @function createNav
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createNav = createElement.bind(null, "nav", "html,text");
  /**
   * Creates an `<aside>` element with some attributes
   * @function createAside
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createAside = createElement.bind(null, "aside", "html,text");
  /******************************************************************************
   * Heading Element
   *****************************************************************************/

  /**
   * Creates a `<h1>` element with some attributes
   * @function createH1
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLHeadingElement}
   * @memberof DOM
   */

  var createH1 = createElement.bind(null, "h1", "html,text");
  /**
   * Creates a `<h2>` element with some attributes
   * @function createH2
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLHeadingElement}
   * @memberof DOM
   */

  var createH2 = createElement.bind(null, "h2", "html,text");
  /**
   * Creates a `<h3>` element with some attributes
   * @function createH3
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLHeadingElement}
   * @memberof DOM
   */

  var createH3 = createElement.bind(null, "h3", "html,text");
  /**
   * Creates a `<h4>` element with some attributes
   * @function createH4
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLHeadingElement}
   * @memberof DOM
   */

  var createH4 = createElement.bind(null, "h4", "html,text");
  /**
   * Creates a `<h5>` element with some attributes
   * @function createH5
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLHeadingElement}
   * @memberof DOM
   */

  var createH5 = createElement.bind(null, "h5", "html,text");
  /**
   * Creates a `<h6>` element with some attributes
   * @function createH6
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLHeadingElement}
   * @memberof DOM
   */

  var createH6 = createElement.bind(null, "h6", "html,text");
  /**
   * Creates a `<div>` element with some attributes
   * @function createDiv
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLDivElement}
   * @memberof DOM
   */

  var createDiv = createElement.bind(null, "div", "html,text");
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

  var createParagraph = createElement.bind(null, "p", "html,text");
  /**
   * Creates a `<blockquote>` element with some attributes
   * @function createBlockQuotation
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLQuoteElement}
   * @memberof DOM
   */

  var createBlockQuotation = createElement.bind(null, "blockquote", "cite,html,text");
  /**
   * Creates a `<ul>` element with some attributes
   * @function createUnorderedList
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLUListElement}
   * @memberof DOM
   */

  var createUnorderedList = createElement.bind(null, "ul", "html");
  /**
   * Creates a `<ol>` element with some attributes
   * @function createOrderedList
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLOListElement}
   * @memberof DOM
   */

  var createOrderedList = createElement.bind(null, "ol", "html,reversed,start,type");
  /**
   * Creates a `<li>` element with some attributes
   * @function createListItem
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLLIElement}
   * @memberof DOM
   */

  var createListItem = createElement.bind(null, "li", "html,text,value");
  /**
   * Creates a `<dl>` element with some attributes
   * @function createDescriptionList
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLDListElement}
   * @memberof DOM
   */

  var createDescriptionList = createElement.bind(null, "dl", "html");
  /**
   * Creates a `<dt>` element with some attributes
   * @function createDescriptionTerm
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createDescriptionTerm = createElement.bind(null, "dt", "html,text");
  /**
   * Creates a `<dd>` element with some attributes
   * @function createDescriptionDetails
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createDescriptionDetails = createElement.bind(null, "dd", "html,text");
  /******************************************************************************
   * Inline Element
   *****************************************************************************/

  /**
   * Creates an `<a>` element with some attributes
   * @function createAnchor
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLAnchorElement}
   * @memberof DOM
   */

  var createAnchor = createElement.bind(null, "a", "download,href,hreflang,html,ping,rel,target,text,type");
  /**
   * Creates an `<area>` element with some attributes
   * @function createArea
   * @param {object} _attribute 
   * @returns {HTMLAreaElement}
   * @memberof DOM
   */

  var createArea = createEmptyElement.bind(null, "area", "alt,coords,download,href,hreflang,media,ping,rel,shape,target");
  /******************************************************************************
   * Embedded Element
   *****************************************************************************/

  /**
   * Creates a `<audio>` element with some attributes
   * @function createAudio
   * @param {object} _attribute
   * @param {Text|HTMLElement|HTMLElement[]} _children
   * @returns {HTMLAudioElement}
   * @memberof DOM
   */

  var createAudio = createElement.bind(null, "audio", "autoplay,controls,crossorigin,html,loop,muted,preload,src,text");
  /**
   * Creates a `<img>` element with some attributes
   * @function createImage
   * @param {object} _attribute 
   * @returns {HTMLImageElement}
   * @memberof DOM
   */

  var createImage = createEmptyElement.bind(null, "img", "alt,crossorigin,decoding,height,ismap,loading,sizes,src,srcset,usemap,width");
  /**
   * Creates a `<embed>` element with some attributes
   * @function createEmbed
   * @param {object} _attribute 
   * @returns {HTMLEmbedElement}
   * @memberof DOM
   */

  var createEmbed = createEmptyElement.bind(null, "embed", "height,src,type,width");
  /**
   * Creates a `<figure>` element with some attributes
   * @function createFigure
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createFigure = createElement.bind(null, "figure", "html,text");
  /**
   * Creates a `<figcaption>` element with some attributes
   * @function createFigureCaption
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createFigureCaption = createElement.bind(null, "figcaption", "html,text");
  /**
   * Creates a `<object>` element with some attributes
   * @function createObject
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLObjectElement}
   * @memberof DOM
   */

  var createObject = createElement.bind(null, "object", "data,height,html,name,text,type,usemap,width");
  /**
   * Creates a `<picture>` element with some attributes
   * @function createPicture
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLPictureElement}
   * @memberof DOM
   */

  var createPicture = createElement.bind(null, "picture", "html");
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
   * Creates a `<video>` element with some attributes
   * @function createVideo
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLVideoElement}
   * @memberof DOM
   */

  var createVideo = createElement.bind(null, "video", "autoplay,controls,crossorigin,height,html,loop,muted,playsinline,poster,preload,src,text,width");
  /**
   * Creates a `<span>` element with some attributes
   * @function createSpan
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLSpanElement}
   * @memberof DOM
   */

  var createSpan = createElement.bind(null, "span", "html,text");
  /**
   * Creates a `<strong>` element with some attributes
   * @function createStrong
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createStrong = createElement.bind(null, "strong", "html,text");
  /**
   * Creates a `<em>` element with some attributes
   * @function createEmphasis
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createEmphasis = createElement.bind(null, "em", "html,text");
  /**
   * Creates a `<mark>` element with some attributes
   * @function createMark
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createMark = createElement.bind(null, "mark", "html,text");
  /**
   * Creates a `<samp>` element with some attributes
   * @function createSample
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createSample = createElement.bind(null, "samp", "html,text");
  /**
   * Creates a `<sub>` element with some attributes
   * @function createSubscript
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createSubscript = createElement.bind(null, "sub", "html,text");
  /**
   * Creates a `<sup>` element with some attributes
   * @function createSuperscript
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createSuperscript = createElement.bind(null, "sup", "html,text");
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

  var createQuote = createElement.bind(null, "q", "cite,html,text");
  /**
   * Creates a `<abbr>` element with some attributes
   * @function createAbbreviation
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createAbbreviation = createElement.bind(null, "abbr", "html,text");
  /**
   * Creates a `<b>` element with some attributes
   * @function createB
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createB = createElement.bind(null, "b", "html,text");
  /**
   * Creates a `<i>` element with some attributes
   * @function createI
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createI = createElement.bind(null, "i", "html,text");
  /**
   * Creates a `<s>` element with some attributes
   * @function createS
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createS = createElement.bind(null, "s", "html,text");
  /**
   * Creates a `<u>` element with some attributes
   * @function createU
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createU = createElement.bind(null, "u", "html,text");
  /**
   * Creates a `<cite>` element with some attributes
   * @function createCite
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createCite = createElement.bind(null, "cite", "html,text");
  /**
   * Creates a `<time>` element with optionally some attributes
   * @function createTime
   * @param {object} _attribute 
   * @returns {HTMLTimeElement}
   * @memberof DOM
   */

  var createTime = createElement.bind(null, "time", "datetime,html,text");
  /**
   * Creates a `<code>` element with some attributes
   * @function createCode
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLElement}
   * @memberof DOM
   */

  var createCode = createElement.bind(null, "code", "html,text");
  /**
   * Creates a `<form>` element with some attributes
   * @function createForm
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLFormElement}
   * @memberof DOM
   */

  var createForm = createElement.bind(null, "form", "accept-charset,action,autocomplete,enctype,html,method,name,novalidate,rel,target,text");
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

  var createTextArea = createElement.bind(null, "textarea", "autocomplete,autofocus,cols,disabled,html,maxlength,minlength,name,placeholder,readonly,required,rows,spellcheck,text,value,wrap");
  /**
   * Creates a `<label>` element with some attributes
   * @function createLabel
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLLabelElement}
   * @memberof DOM
   */

  var createLabel = createElement.bind(null, "label", "for,html,text");
  /**
   * Creates a `<select>` element with some attributes
   * @function createSelect
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLSelectElement}
   * @memberof DOM
   */

  var createSelect = createElement.bind(null, 'select', "autocomplete,autofocus,disabled,html,multiple,name,required,size");
  /**
   * Creates a `<option>` element with some attributes
   * @function createOption
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLOptionElement}
   * @memberof DOM
   */

  var createOption = createElement.bind(null, "option", "disabled,html,label,selected,text,value");
  /**
   * Creates a `<optgroup>` element with some attributes
   * @function createOptionGroup
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLOptGroupElement}
   * @memberof DOM
   */

  var createOptionGroup = createElement.bind(null, "optgroup", "disabled,html,label");
  /**
   * Creates a `<fieldset>` element with some attributes
   * @function createFieldset
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLFieldSetElement}
   * @memberof DOM
   */

  var createFieldset = createElement.bind(null, "fieldset", "disabled,html,name,text");
  /**
   * Creates a `<legend>` element with some attributes
   * @function createLegend
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLLabelElement}
   * @memberof DOM
   */

  var createLegend = createElement.bind(null, "legend", "html,text");
  /**
   * Creates a `<datalist>` element with some attributes
   * @function createDataList
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLTextAreaElement}
   * @memberof DOM
   */

  var createDataList = createElement.bind(null, "datalist", "html");
  /**
   * Creates a `<meter>` element with some attributes
   * @function createMeter
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLTextAreaElement}
   * @memberof DOM
   */

  var createMeter = createElement.bind(null, "meter", "high,html,low,max,min,optimum,text,value");
  /**
   * Creates a `<progress>` element with some attributes
   * @function createProgress
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLTextAreaElement}
   * @memberof DOM
   */

  var createProgress = createElement.bind(null, "progress", "html,max,text,value");
  /**
   * Creates a `<output>` element with optionally some attributes and children elements
   * @function createOutput
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLTextAreaElement}
   * @memberof DOM
   */

  var createOutput = createElement.bind(null, "output", "html,name,text,value");
  /**
   * Creates a `<button>` element with optionally some attributes and children elements
   * @function createButton
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLButtonElement}
   * @memberof DOM
   */

  var createButton = createElement.bind(null, "button", "autofocus,disabled,formaction,formenctype,formmethod,formnovalidate,formtarget,html,name,text,type,value");
  /**
   * Creates a `<table>` element with some attributes
   * @function createTable
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLTableElement}
   * @memberof DOM
   */

  var createTable = createElement.bind(null, "table", "html");
  /**
   * Creates a `<caption>` element with some attributes
   * @function createCaption
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLTableCaptionElement}
   * @memberof DOM
   */

  var createCaption = createElement.bind(null, "caption", "html,text");
  /**
   * Creates a `<thead>` element with some attributes
   * @function createTableHeader
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLTableSectionElement}
   * @memberof DOM
   */

  var createTableHeader = createElement.bind(null, "thead", "html");
  /**
   * Creates a `<tbody>` element with some attributes
   * @function createTableBody
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLTableSectionElement}
   * @memberof DOM
   */

  var createTableBody = createElement.bind(null, "tbody", "html");
  /**
   * Creates a `<tfoot>` element with some attributes
   * @function createTableFooter
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLTableSectionElement}
   * @memberof DOM
   */

  var createTableFooter = createElement.bind(null, "tfoot", "html");
  /**
   * Creates a `<col>` element with some attributes
   * @function createTableColumn
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLTableColElement}
   * @memberof DOM
   */

  var createTableColumn = createEmptyElement.bind(null, "col", "span");
  /**
   * Creates a `<colgroup>` element with some attributes
   * @function createTableColumnGroup
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLTableColElement}
   * @memberof DOM
   */

  var createTableColumnGroup = createElement.bind(null, "colgroup", "html,span");
  /**
   * Creates a `<tr>` element with some attributes
   * @function createTableRow
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLTableRowElement}
   * @memberof DOM
   */

  var createTableRow = createElement.bind(null, "tr", "html");
  /**
   * Creates a `<th>` element with some attributes
   * @function createTableHeaderCell
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLTableCellElement}
   * @memberof DOM
   */

  var createTableHeaderCell = createElement.bind(null, "th", "abbr,colspan,html,rowspan,scope,text");
  /**
   * Creates a `<td>` element with some attributes
   * @function createTableCell
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children
   * @returns {HTMLTableCellElement}
   * @memberof DOM
   */

  var createTableCell = createElement.bind(null, "td", "colspan,html,rowspan,text");
  /**
   * Appends the children to the element
   * @param {Node} element element
   * @param {HTMLCollection} content children elements
   * @private
   * @memberof DOM
   */

  /* istanbul ignore next */

  function addContent(element, content) {
    if (!(isNode(content) || isIterable(content))) {
      return element;
    }

    if (isNode(content) || isString(content)) {
      element.append(content);
    } else {
      element.append.apply(element, _toConsumableArray(content));
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
    var container = isNode(_container) ? _container : document;

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
    var container = isNode(_container) ? _container : document;

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
  var VALUE = 'value';
  var STATE = 'state';
  var CHECKED = 'checked';
  var UNCHECKED = 'unchecked';
  /**
   * Gets type attribute
   * @param {HTMLElement} element 
   * @returns {string}
   */

  var getType = function getType(element) {
    return element.dataset[TYPE];
  };
  /**
   * Gets value attribute
   * @param {HTMLElement} element 
   * @returns {string}
   */

  var getValue = function getValue(element) {
    return element.dataset[VALUE];
  };
  /**
   * Gets state attribute
   * @param {HTMLElement} element 
   * @returns {string}
   */

  var getState = function getState(element) {
    return element.dataset[STATE];
  };
  /**
   * Sets state attribute
   * @param {HTMLElement} element 
   * @param {string} value 
   * @returns {string}
   */

  var setState = function setState(element, value) {
    return element.dataset[STATE] = value;
  };
  var check = function check(element, value) {
    return setState(element, valOrDefault(value, CHECKED));
  };
  var uncheck = function uncheck(element, value) {
    return setState(element, valOrDefault(value, UNCHECKED));
  };
  /**
   * Resolves the container
   * @param {HTMLElement|string} container 
   * @returns {HTMLElement}
   */

  function resolveContainer(container) {
    if (isHTMLElement(container)) {
      return container;
    } else if (isString(container) && !isNullOrWhitespace(container)) {
      return getElement(container);
    }

    return null;
  }
  /**
   * 
   * @param {string} selector 
   * @param {HTMLElement|string} [_container] 
   * @returns {HTMLElement[]}
   */

  function getComponents(selector, _container) {
    if (isNullOrUndefined(selector)) {
      throw new TypeError("Bad argument");
    }

    var container = resolveContainer(_container);

    if (!isHTMLElement(container)) {
      return null;
    }

    return getElements(selector, container);
  }
  /**
   * 
   * @param {string} type 
   * @param {HTMLElement} container 
   * @returns {HTMLInputElement}
   */

  function getInput(type, container) {
    if (isHTMLElement(container, 'label') && !isNullOrWhitespace(container.htmlFor)) {
      return getElement("#".concat(container.htmlFor));
    }

    return getElement("input[type='".concat(valOrDefault(type, 'text'), "']"), container);
  }

  var Status = {
    ON: 'on',
    OFF: 'off'
  };
  /**
   * Gets the item element
   * @param {HTMLElement} element 
   * @this {HTMLElement}
   */

  function getItem(element) {
    var isValid = function isValid(el) {
      return hasOwn(el.dataset, 'selector');
    };

    if (isValid(element)) {
      return element;
    }

    return findAncestor(element, isValid, 5);
  }

  var BaseSelectorItem = {
    /** @type {number} */
    index: null,
    init: function init(args) {
      Object.assign(this, args);
      this.setChecked(this.isChecked());
      return this;
    },

    /** @returns {string} */
    get value() {
      return getValue(this.container);
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
        this.container.classList.add("selector-item--selected");
      } else {
        uncheck(this.container, Status.OFF);
        this.container.classList.remove("selector-item--selected");
      }

      return true;
    },
    setIndex: function setIndex(index) {
      this.index = index;
      this.container.dataset.selectorIndex = index;
    },
    destroy: function destroy() {
      removeChildren(this.container);
      this.container.remove();
      return true;
    }
  };
  var BaseSelector = {
    /** @type {string} */
    defaultValue: null,

    /** @type {BaseSelectorItem[]} */
    items: null,

    /** @type {number} */
    selectedIndex: null,

    /** @type {BaseSelectorItem} */
    selectedItem: null,

    /** @type {Function} */
    beforeChange: null,

    /** @type {Function} */
    afterChange: null,

    /** @returns {string} */
    get value() {
      return this.selectedItem.value;
    },

    init: function init() {
      var itemContainers = getElements('[data-selector]', this.container);

      if (isNullOrUndefined(itemContainers)) {
        return;
      }

      this.items = [];
      this.defaultValue = getValue(this.container);
      var defaultItem = null;

      for (var i = 0; i < itemContainers.length; i++) {
        var item = this.createItem(itemContainers[i]);

        if (item.isChecked()) {
          this.setSelectedItem(item);
        }

        if (item.value === this.defaultValue) {
          defaultItem = item;
        }
      }

      if (isNull(this.selectedItem) && !isNull(defaultItem)) {
        this.setSelectedItem(defaultItem);
      }

      this.bindEvents();
      return this;
    },

    /**
     * Creates a selector item
     * @param {HTMLElement} container 
     */
    createItem: function createItem(container) {
      if (!isHTMLElement(container)) {
        throw new TypeError("Missing container: A selector requires a container");
      }

      container.classList.add("selector-item");
      var item = Object.create(BaseSelectorItem, {
        container: {
          value: container
        },
        selector: {
          value: this
        }
      }).init();
      this.addItem(item);
      return item;
    },

    /**
     * Adds a selector item
     * @param {BaseSelectorItem} item 
     * @param {*} _index 
     */
    addItem: function addItem(item, _index) {
      this.items.push(item);
      this.refresh();
      return this;
    },

    /**
     * Gets a selector item
     * @param {number} index 
     * @returns {BaseSelectorItem}
     */
    getItem: function getItem(index) {
      if (!Number.isInteger(index)) {
        return null;
      }

      return this.items.find(function (item) {
        return item.index === index;
      });
    },

    /**
     * Removes a selector item
     * @param {number} index 
     */
    removeItem: function removeItem(index) {
      if (!Number.isInteger(index)) {
        return false;
      }

      var item = this.getItem(index);

      if (isNullOrUndefined(item)) {
        return false;
      }

      if (!item.destroy()) {
        return false;
      }

      this.items.splice(item.index, 1);
      this.refresh();
      return true;
    },
    setSelectedItem: function setSelectedItem(item) {
      if (!this.items.includes(item)) {
        return false;
      }

      if (this.selectedItem) {
        this.selectedItem.setChecked(false);
      }

      this.selectedItem = item;
      this.selectedItem.setChecked(true);
      return true;
    },
    refresh: function refresh() {
      for (var i = 0; i < this.items.length; i++) {
        var item = this.items[i];
        item.setIndex(i);
      }

      return this;
    },
    render: function render() {
      return this.container;
    },
    bindEvents: function bindEvents() {
      var _this = this;

      this.container.addEventListener('click', function (event) {
        var target = getItem(event.target);

        if (!hasOwn(target.dataset, 'selector')) {
          return;
        }

        var selectorIndex = target.dataset.selectorIndex;
        var halt = false;

        if (isFunction(_this.beforeChange)) {
          halt = _this.beforeChange(_this, event) === false;
        }

        if (halt) {
          return;
        }

        var item = _this.getItem(+selectorIndex);

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
  /**
   * Gets the item element
   * @param {HTMLElement} element 
   * @this {HTMLElement}
   */

  function getItem$1(element) {
    var isValid = function isValid(el) {
      return hasOwn(el.dataset, 'selector');
    };

    if (isValid(element)) {
      return element;
    }

    return findAncestor(element, isValid, 5);
  }

  var FormSelectorItem = {
    /** @type {number} */
    index: null,
    init: function init(args) {
      Object.assign(this, args);

      if (this.isChecked()) {
        check(this.container, Status$1.ON);
      }

      return this;
    },

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

      this.input.checked = isChecked;

      if (isChecked) {
        check(this.container, Status$1.ON);
        this.container.classList.add("selector-item--selected");
      } else {
        uncheck(this.container, Status$1.OFF);
        this.container.classList.remove("selector-item--selected");
      }

      return true;
    },
    setIndex: function setIndex(index) {
      this.index = index;
      this.container.dataset.selectorIndex = index;
    },
    destroy: function destroy() {
      removeChildren(this.container);
      this.container.remove();
      return true;
    }
  };
  var FormSelector = {
    /** @type {string} */
    defaultValue: null,

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

    /** @returns {string} */
    get value() {
      return this.selectedItem.value;
    },

    init: function init() {
      var itemContainers = getElements('[data-selector]', this.container);

      if (isNullOrUndefined(itemContainers)) {
        return;
      }

      this.items = [];
      this.defaultValue = getValue(this.container);
      var defaultItem = null;

      for (var i = 0; i < itemContainers.length; i++) {
        var item = this.createItem(itemContainers[i]);

        if (item.isChecked()) {
          this.setSelectedItem(item);
        }

        if (item.value === this.defaultValue) {
          defaultItem = item;
        }
      }

      if (isNull(this.selectedItem) && !isNull(defaultItem)) {
        this.setSelectedItem(defaultItem);
      }

      this.bindEvents();
      return this;
    },
    createItem: function createItem(container) {
      if (!isHTMLElement(container)) {
        throw new TypeError("Missing container: A selector requires a container");
      }

      container.classList.add("selector-item");
      var input = getInput('radio', container);

      if (!isHTMLElement(input)) {
        throw new Error("Missing input: FormSelector requires an input in the container");
      }

      var item = Object.create(FormSelectorItem, {
        container: {
          value: container
        },
        input: {
          value: input
        },
        selector: {
          value: this
        }
      }).init();
      this.addItem(item);
      return item;
    },

    /**
     * Adds a selector item
     * @param {BaseSelectorItem} item 
     * @param {*} _index 
     */
    addItem: function addItem(item, _index) {
      this.items.push(item);
      this.refresh();
      return this;
    },

    /**
     * Gets a selector item
     * @param {number} index 
     * @returns {FormSelectorItem}
     */
    getItem: function getItem(index) {
      if (!Number.isInteger(index)) {
        return null;
      }

      return this.items.find(function (item) {
        return item.index === index;
      });
    },

    /**
     * Removes a selector item
     * @param {number} index 
     */
    removeItem: function removeItem(index) {
      if (!Number.isInteger(index)) {
        return false;
      }

      var item = this.getItem(index);

      if (isNullOrUndefined(item)) {
        return false;
      }

      if (!item.destroy()) {
        return false;
      }

      this.items.splice(item.index, 1);
      this.refresh();
      return true;
    },
    setSelectedItem: function setSelectedItem(item) {
      if (!this.items.includes(item)) {
        return false;
      }

      if (this.selectedItem) {
        this.selectedItem.setChecked(false);
      }

      this.selectedItem = item;
      this.selectedItem.setChecked(true);
      return true;
    },
    refresh: function refresh() {
      for (var i = 0; i < this.items.length; i++) {
        var item = this.items[i];
        item.setIndex(i);
      }

      return this;
    },
    render: function render() {
      return this.container;
    },
    bindEvents: function bindEvents() {
      var _this = this;

      this.container.addEventListener('change', function (event) {
        var target = getItem$1(event.target);
        var selectorIndex = target.dataset.selectorIndex;
        var halt = false;

        if (isFunction(_this.beforeChange)) {
          halt = _this.beforeChange(_this, event) === false;
        }

        if (halt) {
          target.checked = false;

          _this.items[_this.selectedIndex].setChecked(true);

          return;
        }

        var item = _this.getItem(+selectorIndex);

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

  var Name = {
    BaseSelector: 'selector',
    FormSelector: 'form-selector'
  };

  var toSelector = function toSelector(name) {
    return "[data-type=\"".concat(name, "\"]");
  };

  var Selector = {
    BaseSelector: toSelector(Name.BaseSelector),
    FormSelector: toSelector(Name.FormSelector)
  };
  var Selectors = [Selector.BaseSelector, Selector.FormSelector].join(',');

  var isValid = function isValid(element) {
    return RegExp('selector|form-selector').test(getType(element));
  };

  var isSelector = function isSelector(element) {
    return isHTMLElement(element) && isValid(element);
  };

  var TypeHandler = {
    'selector': function selector(container) {
      return Object.create(BaseSelector, {
        name: {
          value: Name.BaseSelector
        },
        container: {
          value: container
        },
        querySelector: {
          value: Selector.BaseSelector
        }
      });
    },
    'form-selector': function formSelector(container) {
      return Object.create(FormSelector, {
        name: {
          value: Name.FormSelector
        },
        container: {
          value: container
        },
        querySelector: {
          value: Selector.FormSelector
        }
      });
    }
  };
  var SelectorManager = {
    /**
     * Creates a `selector`
     * @param {HTMLElement} container 
     * @param {string} [_type] 
     * @returns {BaseSelector|FormSelector}
     */
    create: function create(container, _type) {
      if (!isHTMLElement(container)) {
        throw new TypeError("Missing container: A selector requires a container");
      }

      var type = valOrDefault(_type, getType(container));
      var handler = TypeHandler[type];

      if (!isFunction(handler)) {
        throw new Error("Missing handler: The '".concat(type, "' field could not be handled"));
      }

      var widget = handler(container);
      return widget;
    },

    /**
     * Activates the `selector` found in the container
     * @param {HTMLElement} container 
     * @param {*} [_options] 
     * @returns {BaseSelector[]|FormSelector[]}
     */
    activate: function activate(container, _options) {
      var components = isSelector(container) ? [container] : getComponents(Selectors, container);
      var options = valOrDefault(_options, {});

      if (isNullOrUndefined(components)) {
        return null;
      }

      var selectors = [];

      for (var i = 0; i < components.length; i++) {
        var selector = this.create(components[i]);
        selector.init(options);
        selectors.push(selector);
      }

      return selectors;
    }
  };

  var Status$2 = {
    ON: 'on',
    OFF: 'off'
  };
  /**
   * Changes the state of the switch
   * @param {boolean} isChecked 
   * @returns {boolean} A value indicating whether the operation was a success
   */

  function setChecked(isChecked) {
    if (isNullOrUndefined(isChecked)) {
      return false;
    }

    if (isChecked) {
      check(this.container, Status$2.ON);
    } else {
      uncheck(this.container, Status$2.OFF);
    }

    if (isFunction(this.afterChange)) {
      this.afterChange(this);
    }

    this.refresh();
    return true;
  }

  var BaseSwitch = {
    /** @type {string} */
    defaultValue: null,

    /** @type {Function} */
    beforeChange: null,

    /** @type {Function} */
    afterChange: null,

    /** @returns {string} */
    get value() {
      return getValue(this.container);
    },

    init: function init() {
      var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      Object.assign(this, args);
      this.container.classList.add("zenui-switch");
      this.defaultValue = this.isChecked();
      setChecked.call(this, this.isChecked());
      this.bindEvents();
      return this;
    },

    /**
     * Verifies that the switch is checked
     * @returns {boolean} A value indicating whether the switch is checked
     */
    isChecked: function isChecked() {
      return getState(this.container) === Status$2.ON;
    },
    check: function check() {
      setChecked.call(this, true);
      return this;
    },
    uncheck: function uncheck() {
      setChecked.call(this, false);
      return this;
    },
    toggle: function toggle() {
      setChecked.call(this, !this.isChecked());
      return this;
    },
    reset: function reset() {
      setChecked.call(this, this.defaultValue);
      return this;
    },
    refresh: function refresh() {
      if (this.isChecked()) {
        this.container.classList.add("zenui-switch--checked");
      } else {
        this.container.classList.remove("zenui-switch--checked");
      }

      return this;
    },

    /**
     * @returns {HTMLElement}
     */
    render: function render() {
      return this.container;
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
      });
    }
  };

  var Status$3 = {
    ON: 'on',
    OFF: 'off'
  };
  /**
   * Changes the state of the switch
   * @param {boolean} isChecked 
   * @returns {boolean} A value indicating whether the operation was a success
   */

  function setChecked$1(isChecked) {
    if (isNullOrUndefined(isChecked)) {
      return false;
    }

    this.input.checked = isChecked;

    if (isChecked) {
      check(this.container, Status$3.ON);
    } else {
      uncheck(this.container, Status$3.OFF);
    }

    if (isFunction(this.afterChange)) {
      this.afterChange(this);
    }

    this.refresh();
    return true;
  }

  var FormSwitch = {
    /** @type {string} */
    defaultValue: null,

    /** @type {Function} */
    beforeChange: null,

    /** @type {Function} */
    afterChange: null,

    /** @returns {string} */
    get value() {
      return this.input.value;
    },

    init: function init() {
      var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      Object.assign(this, args);
      this.container.classList.add("zenui-switch");
      this.input.classList.add("zenui-switch-input");
      this.defaultValue = this.isChecked();
      setChecked$1.call(this, this.isChecked());
      this.bindEvents();
      return this;
    },

    /**
     * Verifies that the switch is checked
     * @returns {boolean} A value indicating whether the switch is checked
     */
    isChecked: function isChecked() {
      return this.input.checked;
    },
    check: function check() {
      setChecked$1.call(this, true);
      return this;
    },
    uncheck: function uncheck() {
      setChecked$1.call(this, false);
      return this;
    },
    toggle: function toggle() {
      setChecked$1.call(this, !this.isChecked());
      return this;
    },
    reset: function reset() {
      setChecked$1.call(this, this.defaultValue);
      return this;
    },
    refresh: function refresh() {
      if (this.isChecked()) {
        this.container.classList.add("zenui-switch--checked");
      } else {
        this.container.classList.remove("zenui-switch--checked");
      }

      return this;
    },

    /**
     * @returns {HTMLElement}
     */
    render: function render() {
      return this.container;
    },
    bindEvents: function bindEvents() {
      var _this = this;

      this.input.addEventListener('change', function (event) {
        var halt = false;

        if (isFunction(_this.beforeChange)) {
          halt = _this.beforeChange(_this, event) === false;
        }

        if (halt) {
          _this.input.checked = !_this.input.checked; // revert input checked state

          return;
        }

        setChecked$1.call(_this, _this.isChecked());
      });
    }
  };

  var Name$1 = {
    BaseSwitch: 'switch',
    FormSwitch: 'form-switch'
  };

  var toSelector$1 = function toSelector(name) {
    return "[data-type=\"".concat(name, "\"]");
  };

  var Selector$1 = {
    BaseSwitch: toSelector$1(Name$1.BaseSwitch),
    FormSwitch: toSelector$1(Name$1.FormSwitch)
  };
  var Selectors$1 = [Selector$1.BaseSwitch, Selector$1.FormSwitch].join(',');

  var isValid$1 = function isValid(element) {
    return RegExp('switch|form-switch').test(getType(element));
  };

  var isSwitch = function isSwitch(element) {
    return isHTMLElement(element) && isValid$1(element);
  };

  var TypeHandler$1 = {
    'switch': function _switch(container) {
      return Object.create(BaseSwitch, {
        name: {
          value: Name$1.BaseSwitch
        },
        container: {
          value: container
        },
        querySelector: {
          value: Selector$1.BaseSwitch
        }
      });
    },
    'form-switch': function formSwitch(container) {
      var input = getInput('checkbox', container);

      if (!isHTMLElement(input)) {
        throw new Error("Missing input: FormSwitch requires an input in the container");
      }

      return Object.create(FormSwitch, {
        name: {
          value: Name$1.FormSwitch
        },
        container: {
          value: container
        },
        input: {
          value: input
        },
        querySelector: {
          value: Selector$1.FormSwitch
        }
      });
    }
  };
  var SwitchManager = {
    /**
     * Creates a `switch`
     * @param {HTMLElement} container 
     * @param {string} [_type] 
     * @returns {BaseSwitch|FormSwitch}
     */
    create: function create(container, _type) {
      if (!isHTMLElement(container)) {
        throw new TypeError("Missing container: A switch requires a container");
      }

      var type = valOrDefault(_type, getType(container));
      var handler = TypeHandler$1[type];

      if (!isFunction(handler)) {
        throw new Error("Missing handler: The '".concat(type, "' field could not be handled"));
      }

      var widget = handler(container);
      return widget;
    },

    /**
     * Activates the `switch` found in the container
     * @param {HTMLElement} container 
     * @param {*} [_options] 
     * @returns {BaseSelector[]|FormSelector[]}
     */
    activate: function activate(container, _options) {
      var components = isSwitch(container) ? [container] : getComponents(Selectors$1, container);
      var options = valOrDefault(_options, {});

      if (isNullOrUndefined(components)) {
        return null;
      }

      var switches = [];

      for (var i = 0; i < components.length; i++) {
        var switchWidget = this.create(components[i]);
        switchWidget.init(options);
        switches.push(switchWidget);
      }

      return switches;
    }
  };

  /**
   * Shows an element
   * @param {HTMLElement} element
   */

  function show(element) {
    if (!isHTMLElement(element)) {
      throw new TypeError("Bad argument. The given `element` is not a valid HTMLElement");
    }

    element.style.display = "block";
  }
  /**
   * Hides an element
   * @param {HTMLElement} element
   */

  function hide(element) {
    if (!isHTMLElement(element)) {
      throw new TypeError("Bad argument. The given `element` is not a valid HTMLElement");
    }

    element.style.display = "none";
  }

  var ATTRIBUTE = 'collapsible';
  var ErrorCode = {
    BAD_CONTAINER_COLLAPSIBLE: 'BAD_CONTAINER_COLLAPSIBLE',
    BAD_CONTAINER_ACCORDION: 'BAD_CONTAINER_ACCORDION'
  };
  var ErrorHandler = {
    BAD_CONTAINER_COLLAPSIBLE: new Error("Missing container: A collapsible requires a container"),
    BAD_CONTAINER_ACCORDION: new Error("Missing container: An accordion requires a container")
  };
  var State = {
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
        return ErrorCode.BAD_CONTAINER_COLLAPSIBLE;
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
      return this.getState() === State.CLOSED;
    },

    /** Verifies that the container is expanded (open) */
    isExpanded: function isExpanded() {
      return this.getState() === State.OPEN;
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

      this.toggle(show, State.OPEN, 'add');

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

      this.toggle(hide, State.CLOSED, 'remove');

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
        return ErrorCode.BAD_CONTAINER_ACCORDION;
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

        if (hasOwn(ErrorCode, collapsible)) {
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
    var collapsibleElements = isCollapsible(container) ? [container] : getComponents('[data-collapsible]', container);
    var options = valOrDefault(_options, {});

    if (isNullOrUndefined(collapsibleElements)) {
      return null;
    }

    var collapsibles = [];

    for (var i = 0; i < collapsibleElements.length; i++) {
      var collapsible = CollapsibleFactory.create(collapsibleElements[i], options);

      if (hasOwn(ErrorHandler, collapsible)) {
        throw ErrorHandler[collapsible];
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
    var accordionElements = isAccordion(container) ? [container] : getComponents('[data-boost=accordion]', container);
    var options = valOrDefault(_options, {});

    if (isNullOrUndefined(accordionElements)) {
      return null;
    }

    var accordions = [];

    for (var i = 0; i < accordionElements.length; i++) {
      var accordion = AccordionFactory.create(accordionElements[i], options);

      if (hasOwn(ErrorHandler, accordion)) {
        throw ErrorHandler[accordion];
      }

      accordion.init();
      accordions.push(accordion);
    }

    return accordions;
  }

  exports.Accordion = Accordion;
  exports.Collapsible = Collapsible;
  exports.SelectorManager = SelectorManager;
  exports.SwitchManager = SwitchManager;
  exports.floatingLabel = floatingLabel;
  exports.inputCounter = inputCounter;

  return exports;

}({}));
