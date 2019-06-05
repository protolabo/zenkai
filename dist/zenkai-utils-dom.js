var __dom = (function (exports) {
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
   * Returns a value indicating whether the variable is a String
   * @returns {boolean}
   * @memberof TYPE
   */

  function isString(str) {
    return typeof str === 'string' || str instanceof String;
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

  var isClassName = function isClassName(selector) {
    return /^\.[a-zA-Z0-9_-]+$/.test(selector);
  };
  /**
   * Returns the first Element within the specified container that matches the specified selector, group or selectors.
   * @param {string} selector A DOMString containing one or more selectors to match
   * @param {HTMLElement|DocumentFragment} [el] Container queried
   * @returns {HTMLElement|null} The first Element matches that matches the specified set of CSS selectors.
   * @memberof DOM
   */


  function getElement(selector, el) {
    el = valOrDefault(el, document);

    if (el instanceof DocumentFragment) {
      el.querySelector(selector);
    }

    if (/^#[a-zA-Z0-9_-]+$/.test(selector)) {
      return document.getElementById(selector.substring(1));
    }

    if (isClassName(selector)) {
      return el.getElementsByClassName(selector.substring(1))[0];
    }

    return el.querySelector(selector);
  }
  /**
   * Returns all elements that match the selector query.
   * @param {string} selector A DOMString containing one or more selectors to match
   * @param {HTMLElement|DocumentFragment} [el] Container queried
   * @returns {HTMLCollection|NodeList} A live or *static* (not live) collection of the `container`'s children Element that match the `selector`.
   * @memberof DOM
   */

  function getElements(selector, el) {
    el = valOrDefault(el, document);

    if (el instanceof DocumentFragment) {
      el.querySelectorAll(selector);
    }

    return isClassName(selector) ? el.getElementsByClassName(selector.substring(1)) : el.querySelectorAll(selector);
  }
  /**
   * Returns the first Template within the specified container that matches the specified selector, group or selectors.
   * @param {string} selector A DOMString containing one or more selectors to match
   * @param {HTMLElement} [el] Container queried
   * @returns {HTMLTemplateElement|null} The first Template matches that matches the specified set of CSS selectors.
   * @memberof DOM
   */

  function getTemplate(selector, el) {
    return 'content' in document.createElement('template') ? getElement(selector, el) : null;
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
   * Gets the window's width
   * @memberof DOM
   */

  function windowWidth() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  }
  /**
   * Gets the previous element of the specified one in its parent's children list
   * @param {HTMLElement} el element
   * @returns {(Element|null)} Element or null if the specified element is the first one in the list
   * @memberof DOM
   */

  function getPreviousElementSibling(el) {
    return getElementSibling(el, "previousElementSibling");
  }
  /**
   * Gets the element following the specified one in its parent's children list
   * @param {HTMLElement} el element
   * @returns {(Element|null)} Element or null if the specified element is the last one in the list
   * @memberof DOM
   */

  function getNextElementSibling(el) {
    return getElementSibling(el, "nextElementSibling");
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
   * @param {HTMLElement} e element
   * @param {string|Array} c class
   * @memberof DOM
   */

  function removeClass(e, c) {
    if (Array.isArray(c)) {
      c.forEach(function (val) {
        return _removeClass(e, val);
      });
    }

    _removeClass(e, c);
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
   * Gets the previous or next element of the specified element
   * @param {HTMLElement} el element
   * @param {string} dir sibling direction
   * @returns {(Element|null)} Element or null
   * @memberof DOM
   */

  function getElementSibling(el, dir) {
    var sibling = el[dir];

    while (sibling && hasClass(sibling, "autocomplete")) {
      sibling = sibling[dir];
    }

    return sibling;
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
   * Copy to clipboard
   * @param {HTMLElement|string} value 
   * @returns {boolean} Value indicating whether the the content has been succesfully copied to the clipboard
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
   * Finds an ancestor of an element
   * @param {Element} target 
   * @param {*} callback 
   * @param {number} max 
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

  function findAncestorInf(target, callback) {
    if (isNullOrUndefined(target)) {
      return null;
    }

    if (callback(target)) {
      return target;
    }

    return findAncestorInf(target.parentElement, callback);
  }

  function findAncestorIter(target, callback, max) {
    if (isNullOrUndefined(target) || max === 0) {
      return null;
    }

    if (callback(target)) {
      return target;
    }

    return findAncestorIter(target.parentElement, callback, max - 1);
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

  var create = function create(tagName) {
    return document.createElement(tagName);
  };

  var addClass$1 = function addClass(el, c) {
    // If c is an Array => Format c as a space-separated string
    if (Array.isArray(c)) {
      c = c.join(' ');
    }

    if (isString(c)) {
      el.className = c;
    }
  };
  /**
   * Creates the element for the specified tagName
   * @param {string} tagName element
   * @returns {HTMLElement}
   * @memberof DOM
   */


  function createElement(tagName, eId, eClass) {
    var el = document.createElement(tagName);

    if (eId) {
      el.id = eId;
    }

    if (eClass) {
      addClass$1(el, eClass);
    }

    return el;
  }
  /**
   * Creates a document fragment
   * @returns {DocumentFragment}
   * @memberof DOM
   */

  function createDocFragment() {
    return document.createDocumentFragment();
  }
  function createTextNode(str) {
    return document.createTextNode(str);
  }
  /**
   * Creates a `<link>` element with some attributes
   * @param {string} rel 
   * @param {string} href 
   * @param {object} attr 
   * @memberof DOM
   */

  function createLink(rel, href, attr) {
    var link = create("link");
    link.rel = rel;
    link.href = href;

    if (attr) {
      addAttributes(link, attr);
    }

    return link;
  }
  function createHeader(attr) {
    var header = create('header');

    if (attr) {
      addAttributes(header, attr);
    }

    return header;
  }
  /**
   * Creates a `<div>` element with some attributes
   * @param {Object} [attr] attributes
   * @returns {HTMLDivElement}
   * @memberof DOM
   */

  function createDiv(attr, children) {
    var div = create("div");

    if (attr) {
      addAttributes(div, attr);
    }

    if (children) {
      addChildren(div, children);
    }

    return div;
  }
  /**
   * Creates an `<aside>` element with some attributes
   * @param {Object} [attr] attributes
   * @returns {HTMLElement}
   * @memberof DOM
   */

  function createAside(attr) {
    var aside = create('aside');

    if (attr) {
      addAttributes(aside, attr);
    }

    return aside;
  }
  function createLineBreak() {
    return create('br');
  }
  /**
   * Creates a `<h[1..6]>` (heading) element with some attributes
   * @param {string} lvl Level
   * @param {Object} [attr] attributes
   * @returns {HTMLHeadingElement}
   * @memberof DOM
   */

  function createHeading(lvl, attr) {
    var h = create(lvl);

    if (attr) {
      addAttributes(h, attr);
    }

    return h;
  }
  /**
   * Creates a `<p>` element with some attributes
   * @param {Object} [attr] attributes
   * @returns {HTMLParagraphElement}
   * @memberof DOM
   */

  function createP(attr) {
    var p = create("p");

    if (attr) {
      addAttributes(p, attr);
    }

    return p;
  }
  /**
   * Creates a `<ul>` element with some attributes
   * @param {Object} [attr] attributes
   * @returns {HTMLUListElement}
   * @memberof DOM
   */

  function createUl(attr) {
    var ul = create("ul");

    if (attr) {
      addAttributes(ul, attr);
    }

    return ul;
  }
  /**
   * Creates a `<li>` element with some attributes
   * @param {Object} [attr] attributes
   * @memberof DOM
   */

  function createLi(attr, el) {
    var li = create('li');

    if (attr) {
      addAttributes(li, attr);
    }

    if (el) {
      addChildren(li, el);
    }

    return li;
  } // Inline Element

  /**
   * Creates an `<a>` element with some attributes
   * @param {string} href URL or a URL fragment that the hyperlink points to
   * @param {Object} [attr] attributes
   * @returns {HTMLAnchorElement}
   * @memberof DOM
   */

  function createAnchor(href, attr) {
    var a = create('a');

    if (href) {
      a.href = href;
    }

    if (attr) {
      addAttributes(a, attr);
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
    var img = create('img');

    if (src) {
      img.src = src;
    }

    if (alt) {
      img.alt = alt;
    }

    if (attr) {
      addAttributes(img, attr);
    }

    return img;
  }
  /**
   * Creates a `<span>` element with some attributes
   * @param {Object} [attr] attributes
   * @memberof DOM
   */

  function createSpan(attr) {
    var span = create("span");

    if (attr) {
      addAttributes(span, attr);
    }

    return span;
  }
  /**
   * Creates a `<strong>` element with some attributes
   * @param {Object} [attr] attributes
   * @memberof DOM
   */

  function createStrong(attr) {
    var strong = create("strong");

    if (attr) {
      addAttributes(strong, attr);
    }

    return strong;
  }
  /**
   * Creates a `<em>` element with some attributes
   * @param {Object} [attr] attributes
   * @memberof DOM
   */

  function createEm(attr) {
    var em = create("em");

    if (attr) {
      addAttributes(em, attr);
    }

    return em;
  } // Form Element

  /**
   * Creates a `<input>` element with some attributes
   * @param {Object} [attr] attributes
   * @returns {HTMLInputElement}
   * @memberof DOM
   */

  function createInput(attr) {
    var input = create('input');

    if (attr) {
      addAttributes(input, attr);
    }

    return input;
  }
  ["checkbox", "hidden", "file"].forEach(function (type) {
    createInput[type] = function (attr) {
      var input = createInput(attr);
      input.type = type;
      return input;
    };
  });
  /**
   * Creates a `<label>` element with some attributes
   * @param {Object} [attr] attributes
   * @returns {HTMLLabelElement}
   * @memberof DOM
   */

  function createLabel(attr) {
    var label = create('label');

    if (attr) {
      addAttributes(label, attr);
    }

    return label;
  }
  /**
   * Creates a `<textarea>` element with some attributes
   * @param {Object} [attr] attributes
   * @returns {HTMLTextAreaElement}
   * @memberof DOM
   */

  function createTextArea(attr) {
    var textArea = create('textarea');

    if (attr) {
      addAttributes(textArea, attr);
    }

    return textArea;
  }
  /**
   * Creates a `<button>` element with some attributes
   * @param {Object} [attr] attributes
   * @memberof DOM
   */

  function createButton(attr) {
    var btn = create("button");
    btn.type = "button";

    if (attr) {
      addAttributes(btn, attr);
    }

    return btn;
  }
  /**
   * Creates a `<table>` element with some attributes
   * @param {Object} [attr] attributes
   * @memberof DOM
   */

  function createTable(attr) {
    var table = create("table");

    if (attr) {
      addAttributes(table, attr);
    }

    return table;
  }
  /**
   * Creates a `<thead>` element with some attributes
   * @param {Object} [attr] attributes
   * @memberof DOM
   */

  function createTableHeader(attr) {
    var thead = create("thead");

    if (attr) {
      addAttributes(thead, attr);
    }

    return thead;
  }
  /**
   * Creates a `<tbody>` element with some attributes
   * @param {Object} [attr] attributes
   * @memberof DOM
   */

  function createTableBody(attr) {
    var tbody = create("tbody");

    if (attr) {
      addAttributes(tbody, attr);
    }

    return tbody;
  }
  /**
   * Creates a `<tfoot>` element with some attributes
   * @param {Object} [attr] attributes
   * @memberof DOM
   */

  function createTableFooter(attr) {
    var tfoot = create("tfoot");

    if (attr) {
      addAttributes(tfoot, attr);
    }

    return tfoot;
  }
  /**
   * Creates a `<tr>` element with some attributes
   * @param {Object} [attr] attributes
   * @memberof DOM
   */

  function createTableRow(attr) {
    var tr = create("tr");

    if (attr) {
      addAttributes(tr, attr);
    }

    return tr;
  }
  /**
   * Creates a `<th>` element with some attributes
   * @param {Object} [attr] attributes
   * @memberof DOM
   */

  function createTableHeaderCell(attr) {
    var th = create("th");

    if (attr) {
      addAttributes(th, attr);
    }

    return th;
  }
  /**
   * Creates a `<td>` element with some attributes
   * @param {Object} [attr] attributes
   * @memberof DOM
   */

  function createTableCell(attr) {
    var td = create("td");

    if (attr) {
      addAttributes(td, attr);
    }

    return td;
  }
  /**
   * Sets the attributes of an element
   * @param {HTMLElement} el element
   * @param {Object} attr attribute
   * @memberof DOM
   */

  function addAttributes(el, attr) {
    var ATTR_MAP = {
      id: [assign],
      text: [assign, 'textContent'],
      html: [assign, 'innerHTML'],
      accept: [assign],
      disabled: [disable, el],
      class: [addClass$1, el],
      value: [assign],
      placeholder: [assign],
      readonly: [assign, 'readOnly'],
      data: [Object.assign, el.dataset]
    };
    var DEFAULT_MAP = [echo, '']; // HTML attributes

    var _arr = Object.keys(attr);

    for (var _i = 0; _i < _arr.length; _i++) {
      var key = _arr[_i];
      var val = ATTR_MAP[key] || DEFAULT_MAP;
      val[0](val[1] || key, attr[key]);
    }

    function assign(key, val) {
      el[key] = val;
    }
  }
  /**
   * Appends the children to the element
   * @param {HTMLElement} el element
   * @param {HTMLCollection} children children elements
   * @memberof DOM
   */

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

  function echo(o) {
  }

  /** @namespace DOM */

  exports.addAttributes = addAttributes;
  exports.addClass = addClass;
  exports.appendChildren = appendChildren;
  exports.changeSelectValue = changeSelectValue;
  exports.cloneTemplate = cloneTemplate;
  exports.conceal = conceal;
  exports.copytoClipboard = copytoClipboard;
  exports.createAnchor = createAnchor;
  exports.createAside = createAside;
  exports.createButton = createButton;
  exports.createDiv = createDiv;
  exports.createDocFragment = createDocFragment;
  exports.createElement = createElement;
  exports.createEm = createEm;
  exports.createHeader = createHeader;
  exports.createHeading = createHeading;
  exports.createImage = createImage;
  exports.createInput = createInput;
  exports.createLabel = createLabel;
  exports.createLi = createLi;
  exports.createLineBreak = createLineBreak;
  exports.createLink = createLink;
  exports.createP = createP;
  exports.createSpan = createSpan;
  exports.createStrong = createStrong;
  exports.createTable = createTable;
  exports.createTableBody = createTableBody;
  exports.createTableCell = createTableCell;
  exports.createTableFooter = createTableFooter;
  exports.createTableHeader = createTableHeader;
  exports.createTableHeaderCell = createTableHeaderCell;
  exports.createTableRow = createTableRow;
  exports.createTextArea = createTextArea;
  exports.createTextNode = createTextNode;
  exports.createUl = createUl;
  exports.disable = disable;
  exports.enable = enable;
  exports.findAncestor = findAncestor;
  exports.getElement = getElement;
  exports.getElementSibling = getElementSibling;
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
