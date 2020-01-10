var zcomponents = (function (exports) {
  'use strict';

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
   * Returns a value indicating whether the value is empty
   * @param {Object[]|string} arr array
   * @returns {boolean}
   * @memberof TYPE
   */

  function isEmpty(val) {
    return (Array.isArray(val) || isString(val)) && val.length === 0;
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
   * Returns a value indicating whether the object is iterable
   * @param {*} obj
   * @returns {boolean}
   * @memberof TYPE
   */

  function isIterable(obj) {
    return !isNull(obj) && typeof obj[Symbol.iterator] === 'function';
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
   * Verifies that an object is a *Node*
   * @param {Element} obj 
   * @returns {boolean} Value indicating whether the object is an *Node*
   * @memberof DOM
   */

  var isNode = function isNode(obj) {
    return !isNullOrUndefined(obj) && obj instanceof Node;
  };
  /* istanbul ignore next */

  var isElementNode = function isElementNode(obj) {
    return !isNullOrUndefined(obj) && obj.nodeType === Node.ELEMENT_NODE;
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
   * Creates a `<template>` element with some attributes
   * @function createTemplate
   * @param {object} _attribute Global attributes
   * @param {Text|HTMLElement|HTMLElement[]} _children Content
   * @returns {HTMLTemplateElement}
   * @memberof DOM
   */

  var createTemplate = create.bind(null, 'template');
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
   * Creates a `<p>` element with some attributes
   * @function createParagraph
   * @param {object} _attribute 
   * @param {Text|HTMLElement|HTMLElement[]} _children 
   * @returns {HTMLParagraphElement}
   * @memberof DOM
   */

  var createParagraph = create.bind(null, 'p');
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
  exports.inputCounter = inputCounter;

  return exports;

}({}));
