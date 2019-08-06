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
 * Gets the window's width
 * @memberof DOM
 */


function windowWidth() {
  return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
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
 * Adds or removes a class from an element depending on the class's presence.
 * @param {HTMLElement} el 
 * @param {string} c ClassName
 * @memberof DOM
 */

function toggleClass(el, c) {
  if (hasClass(el, c)) {
    removeClass(el, c);
  } else {
    addClass(el, c);
  }
}
/**
 * Removes all children of a node from the DOM
 * @param {Node} node 
 * @memberof DOM
 */

function removeChildren(node) {
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
  }
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
 * Copy to clipboard
 * @param {HTMLElement|string} value 
 * @returns {boolean} Value indicating whether the the content has been succesfully copied to the clipboard
 * @memberof DOM
 */

function copytoClipboard(value) {
  var el = document.createElement('textarea');
  el.value = isHTMLElement(value) ? value.textContent : value;
  el.readOnly = true;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  el.remove();
  return true;
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
 * Creates the element for the specified tagName
 * @param {string} tagName element
 * @returns {HTMLElement}
 * @memberof DOM
 */


function createElement(tagName, eId, eClass) {
  var el = create(tagName);

  if (eId) {
    el.id = eId;
  }

  if (eClass) {
    setClass(el, eClass);
  }

  return el;
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
 * Creates a text node
 * @function
 * @param {string} text
 * @returns {Text}
 * @memberof DOM
 */

var createTextNode = function createTextNode(text) {
  return document.createTextNode(text);
};
/**
 * Creates a `<link>` element with some attributes
 * @param {string} rel 
 * @param {string} href 
 * @param {object} attr 
 * @memberof DOM
 */

function createLink(rel, href, attr) {
  var link = create("link");

  if (rel) {
    link.rel = rel;
  }

  if (href) {
    link.href = href;
  }

  if (attr) {
    addAttributes(link, attr);
  }

  return link;
} //#region Content sectionning

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
 * Creates a `br` element \
 * Line break (carriage-return)
 * @function
 * @memberof DOM
 */

var createLineBreak = function createLineBreak() {
  return create('br');
};
/**
 * Creates a `hr` element \
 * Thematic break
 * @function
 * @memberof DOM
 */

var createThematicBreak = function createThematicBreak() {
  return create('hr');
};
/**
 * Creates a `<p>` element with some attributes
 * @param {Object} [attr] attributes
 * @returns {HTMLParagraphElement}
 * @memberof DOM
 */

var createParagraph = create.bind(null, 'p');
/**
 * Creates a `<blockquote>` element with some attributes
 * @function
 * @param {Object} [attr] attributes
 * @returns {HTMLQuoteElement}
 * @memberof DOM
 */

function createBlockQuotation(cite, attr) {
  var element = create('blockquote', attr);

  if (cite) {
    element.cite = cite;
  }

  return element;
}
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
 * Creates an `<a>` element with some attributes
 * @param {string} href URL or a URL fragment that the hyperlink points to
 * @param {Object} [attr] attributes
 * @returns {HTMLAnchorElement}
 * @memberof DOM
 */

function createAnchor(href, attr) {
  var a = create('a', attr);

  if (href) {
    a.href = href;
  }

  return a;
}
/**
  * Creates a `<img>` element with some attributes
  * @param {string} src
  * @param {string} alt
  * @param {Object} [attr] attributes
  * @returns {HTMLImageElement}
  * @memberof DOM
  */

function createImage(src, alt, attr) {
  var img = create('img', attr);

  if (src) {
    img.src = src;
  }

  if (alt) {
    img.alt = alt;
  }

  return img;
}
/**
  * Creates a `<img>` element with some attributes
  * @param {string} src
  * @param {string} alt
  * @param {Object} [attr] attributes
  * @returns {HTMLAudioElement}
  * @memberof DOM
  */

function createAudio(src, alt, attr) {
  var img = create('audio', attr);

  if (src) {
    img.src = src;
  }

  if (alt) {
    img.alt = alt;
  }

  return img;
}
/**
  * Creates a `<video>` element with some attributes
  * @param {string} src
  * @param {string} alt
  * @param {Object} [attr] attributes
  * @returns {HTMLVideoElement}
  * @memberof DOM
  */

function createVideo(src, alt, attr) {
  var img = create('video', attr);

  if (src) {
    img.src = src;
  }

  if (alt) {
    img.alt = alt;
  }

  return img;
}
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
 * Creates a `<del>` element with some attributes
 * @function
 * @param {Object} [attr] attributes
 * @returns {HTMLModElement}
 * @memberof DOM
 */

function createDeletion(cite, datetime, attr) {
  var element = create('del', attr);

  if (cite) {
    element.cite = cite;
  }

  if (datetime) {
    element.datetime = datetime;
  }

  return element;
}
/**
 * Creates a `<ins>` element with some attributes
 * @function
 * @param {Object} [attr] attributes
 * @returns {HTMLModElement}
 * @memberof DOM
 */

function createInsertion(cite, datetime, attr) {
  var element = create('ins', attr);

  if (cite) {
    element.cite = cite;
  }

  if (datetime) {
    element.datetime = datetime;
  }

  return element;
}
/**
 * Creates a `<q>` element with some attributes
 * @function
 * @param {Object} [attr] attributes
 * @returns {HTMLQuoteElement}
 * @memberof DOM
 */

function createQuote(cite, attr) {
  var quote = create('q', attr);

  if (cite) {
    quote.cite = cite;
  }

  return quote;
}
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
 * Creates a `<q>` element with some attributes
 * @function
 * @param {Object} [attr] attributes
 * @returns {HTMLTimeElement}
 * @memberof DOM
 */

function createTime(datetime, attr) {
  var element = create('time', attr);

  if (datetime) {
    element.datetime = datetime;
  }

  return element;
}
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

var Elements = ['BUTTON', 'COMMAND', 'FIELDSET', 'INPUT', 'KEYGEN', 'OPTGROUP', 'OPTION', 'SELECT', 'TEXTAREA'];
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
/**
 * Moves an element out of screen
 * @param {HTMLElement} el Element
 * @memberof DOM
 */

function conceal(el) {
  return Object.assign(el, {
    position: 'absolute',
    top: '-9999px',
    left: '-9999px'
  });
}
/**
 * Applies highlighting style to an element
 * @param {HTMLElement} el Element
 * @memberof DOM
 */

function highlight(el) {
  addClass(el, UI.SELECTED);
}
/**
 * Removes highlighting style of an element
 * @param {HTMLElement} el Element
 * @memberof DOM
 */

function unhighlight(el) {
  removeClass(el, UI.SELECTED);
}
/**
 * Enable an element
 * @param {HTMLElement} el Element
 * @memberof DOM
 */

function enable(el, val) {
  if (Elements.indexOf(el.tagName) !== -1) {
    el.disabled = val === false;
  }

  el.dataset.disabled = val === false;
}
/**
 * Disable an element
 * @param {HTMLElement} el 
 * @memberof DOM
 */

function disable(el, val) {
  if (Elements.indexOf(el.tagName) !== -1) {
    el.disabled = val !== false;
  }

  el.dataset.disabled = val !== false;
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

/** @namespace TYPE */

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
 * @memberof MATH
*/
function random(min, max) {
  if (max == null) {
    max = min;
    min = 0;
  }

  return min + Math.floor(Math.random() * (max - min + 1));
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
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
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

// import * as AJAX from './ajax-utils.js';

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

export { Accordion, Collapsible, DELETE, GET, POST, PUT, Selector, Switch, addAttributes, addClass, addPath, appendChildren, boolToInt, capitalize, capitalizeFirstLetter, changeSelectValue, cloneObject, cloneTemplate, compareTime, conceal, copytoClipboard, createAbbreviation, createAnchor, createArticle, createAside, createAudio, createB, createBlockQuotation, createButton, createCaption, createCite, createCode, createDataList, createDeletion, createDescriptionDetails, createDescriptionList, createDescriptionTerm, createDiv, createDocFragment, createElement, createEmphasis, createFieldset, createFigure, createFigureCaption, createFooter, createForm, createH1, createH2, createH3, createH4, createH5, createH6, createHeader, createI, createImage, createInput, createInsertion, createLabel, createLegend, createLineBreak, createLink, createListItem, createMain, createMark, createMeter, createNav, createOption, createOptionGroup, createOrderedList, createOutput, createParagraph, createPicture, createProgress, createQuote, createS, createSample, createSection, createSelect, createSource, createSpan, createStrong, createSubscript, createSuperscript, createTable, createTableBody, createTableCell, createTableColumn, createTableColumnGroup, createTableFooter, createTableHeader, createTableHeaderCell, createTableRow, createTextArea, createTextNode, createThematicBreak, createTime, createU, createUnorderedList, createVideo, dayOfWeek, defProp, disable, enable, find, findAncestor, findByPath, floatingLabel, getDir, getDirTarget, getElement, getElements, getNextElementSibling, getPreviousElementSibling, getRootUrl, getTemplate, getUrlParams, hasClass, hasOwn, hide, highlight, insert, insertAfterElement, insertBeforeElement, isDate, isDerivedOf, isElement, isEmpty, isFunction, isHTMLElement, isInt, isNull, isNullOrUndefined, isNullOrWhitespace, isObject, isString, isUndefined, last, longDate, parseDate, parseDateTime, parseTime, preprendChild, queryBuilder, random, removeAccents, removeChildren, removeClass, shortDate, show, timeAgo, toBoolean, toggleClass, unhighlight, valOrDefault, windowWidth };
