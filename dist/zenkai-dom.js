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

  exports.addAttributes = addAttributes;
  exports.addClass = addClass;
  exports.appendChildren = appendChildren;
  exports.changeSelectValue = changeSelectValue;
  exports.cloneTemplate = cloneTemplate;
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
  exports.createCaption = createCaption;
  exports.createCite = createCite;
  exports.createCode = createCode;
  exports.createDataList = createDataList;
  exports.createDeletion = createDeletion;
  exports.createDescriptionDetails = createDescriptionDetails;
  exports.createDescriptionList = createDescriptionList;
  exports.createDescriptionTerm = createDescriptionTerm;
  exports.createDiv = createDiv;
  exports.createDocFragment = createDocFragment;
  exports.createElement = createElement;
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
  exports.createInsertion = createInsertion;
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
  exports.disable = disable;
  exports.enable = enable;
  exports.findAncestor = findAncestor;
  exports.getElement = getElement;
  exports.getElements = getElements;
  exports.getNextElementSibling = getNextElementSibling;
  exports.getPreviousElementSibling = getPreviousElementSibling;
  exports.getTemplate = getTemplate;
  exports.hasClass = hasClass;
  exports.hide = hide;
  exports.highlight = highlight;
  exports.insertAfterElement = insertAfterElement;
  exports.insertBeforeElement = insertBeforeElement;
  exports.isElement = isElement;
  exports.isHTMLElement = isHTMLElement;
  exports.preprendChild = preprendChild;
  exports.removeChildren = removeChildren;
  exports.removeClass = removeClass;
  exports.show = show;
  exports.toggleClass = toggleClass;
  exports.unhighlight = unhighlight;
  exports.windowWidth = windowWidth;

  return exports;

}({}));
