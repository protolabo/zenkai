var zdom = (function (exports) {
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
   */


  function assign(element, key, value) {
    element[key] = value;
  }
  /**
   * Assigns a value to an attribute
   * @param {HTMLElement} element 
   * @param {string} key 
   * @param {Object} value 
   */


  function assignObject(element, key, value) {
    Object.assign(element[key], value);
  }
  /**
   * Assigns a value to an attribute
   * @param {HTMLElement} element 
   * @param {string} key 
   * @param {Object} value 
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

  exports.addAttributes = addAttributes;
  exports.appendChildren = appendChildren;
  exports.changeSelectValue = changeSelectValue;
  exports.cloneTemplate = cloneTemplate;
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
  exports.findAncestor = findAncestor;
  exports.getElement = getElement;
  exports.getElements = getElements;
  exports.getNextElementSibling = getNextElementSibling;
  exports.getPreviousElementSibling = getPreviousElementSibling;
  exports.getTemplate = getTemplate;
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
  exports.windowHeight = windowHeight;
  exports.windowWidth = windowWidth;

  return exports;

}({}));
