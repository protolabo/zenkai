var _components = (function (exports) {
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
   * @memberof TYPE
   */

  function isEmpty(val) {
    return (Array.isArray(val) || isString(val)) && val.length === 0;
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

  /** @namespace TYPE */

  function floatingLabel(form) {
    var labels = getElements('.form-label', form);

    for (var i = 0, len = labels.length; i < len; i++) {
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

  var HTMLAttribute = {
    CHECKED: 'checked'
  };

  function getInput(type, label) {
    if (isNullOrWhitespace(label.htmlFor)) {
      return getElement("input[type='".concat(valOrDefault(type, 'text'), "']"), label);
    }

    return getElement("#".concat(label.htmlFor));
  }

  var ATTRIBUTE = 'selector';
  var NONE = -1;
  var Status = {
    ON: 'on',
    OFF: 'off'
  };

  var toData = function toData(name) {
    return "[data-type=".concat(name, "]");
  };

  var isSelector = function isSelector(element) {
    return element.dataset['type'] === ATTRIBUTE;
  };

  var SelectorFactory = {
    create: function create(args) {
      var instance = Object.create(this);
      Object.assign(instance, args);

      if (!isFunction(instance.callback)) {
        instance.callback = function (val, el) {};
      }

      return instance;
    },
    container: null,
    current: null,
    callback: null,
    setCurrentItem: function setCurrentItem(item, _input) {
      var input = valOrDefault(_input, getInput('radio', item));
      this.current = item;
      this.current.dataset[HTMLAttribute.CHECKED] = Status.ON;
      this.callback(input.value, this.current);
    },
    activate: function activate() {
      var _this = this;

      var value = this.container.dataset['value'];
      var defaultItem = null;
      var selectorItems = getElements('[data-selector]', this.container);

      var _loop = function _loop(i, len) {
        var item = selectorItems[i];
        var input = getInput('radio', item);
        item.dataset[HTMLAttribute.CHECKED] = input.checked ? Status.ON : Status.OFF;

        if (input.checked) {
          _this.setCurrentItem(item, input);
        }

        if (input.value === value) {
          defaultItem = item;
        }

        input.addEventListener('change', function () {
          if (_this.current) {
            _this.current.dataset[HTMLAttribute.CHECKED] = Status.OFF;
          }

          _this.setCurrentItem(item, input);
        });
      };

      for (var i = 0, len = selectorItems.length; i < len; i++) {
        _loop(i, len);
      }

      if (isNull(this.current)) {
        this.setCurrentItem(defaultItem);
      }
    }
  };
  function Selector(container, _callback) {
    var selectors = getSelectors(container);

    if (selectors === NONE) {
      return null;
    }

    for (var i = 0; i < selectors.length; i++) {
      SelectorFactory.create({
        container: selectors[i],
        callback: _callback
      }).activate();
    }

    return selectors;
  }

  function getSelectors(container) {
    if (isHTMLElement(container)) {
      return isSelector(container) ? [container] : getElements(toData(ATTRIBUTE), container);
    } else if (isString(container) && !isEmpty(container)) {
      var _container = getElement(container);

      return isNullOrUndefined(_container) ? NONE : getSelectors(_container);
    } else if (isNullOrUndefined(container)) {
      return getElements(toData(ATTRIBUTE));
    }

    return NONE;
  }

  var ATTRIBUTE$1 = 'switch';
  var NONE$1 = -1;
  var Status$1 = {
    ON: 'on',
    OFF: 'off'
  };

  var toData$1 = function toData(name) {
    return "[data-type=".concat(name, "]");
  };

  var isSwitch = function isSwitch(element) {
    return element.dataset['type'] === ATTRIBUTE$1;
  };

  var SwitchFactory = {
    create: function create(args) {
      var instance = Object.create(this);
      Object.assign(instance, args);

      if (!isFunction(instance.callback)) {
        instance.callback = function (val, el) {};
      }

      return instance;
    },
    container: null,
    activate: function activate() {
      var _this = this;

      var input = getInput('checkbox', this.container);
      this.container.dataset[HTMLAttribute.CHECKED] = input.checked ? Status$1.ON : Status$1.OFF; // Bind events

      input.addEventListener('change', function (e) {
        _this.container.dataset[HTMLAttribute.CHECKED] = input.checked ? Status$1.ON : Status$1.OFF;

        _this.callback(input.value, _this.container);
      });
    }
  };
  function Switch(container, _callback) {
    var switches = getSliders(container);

    if (switches === NONE$1) {
      return null;
    }

    for (var i = 0; i < switches.length; i++) {
      SwitchFactory.create({
        container: switches[i],
        callback: _callback
      }).activate();
    }

    return switches;
  }

  function getSliders(container) {
    if (isHTMLElement(container)) {
      return isSwitch(container) ? [container] : getElements(toData$1(ATTRIBUTE$1), container);
    } else if (isString(container) && !isEmpty(container)) {
      var _container = getElement(container);

      return isNullOrUndefined(_container) ? NONE$1 : getSliders(_container);
    } else if (isNullOrUndefined(container)) {
      return getElements(toData$1(ATTRIBUTE$1));
    }

    return NONE$1;
  }

  /** @namespace FORM */

  var index = /*#__PURE__*/Object.freeze({
    floatingLabel: floatingLabel,
    Selector: Selector,
    Switch: Switch
  });

  var COLLAPSIBLE = 'collapsible';
  var State = {
    OPEN: 'open',
    COLLAPSED: 'collapsed'
  };
  /**
   * Collapsible
   * @param {HTMLElement} container 
   */

  function Collapsible(container, accordion) {
    var collapsibles;

    if (isHTMLElement(container)) {
      collapsibles = hasOwn(container.dataset, COLLAPSIBLE) ? [container] : getElements('[data-collapsible]', container);
    } else {
      collapsibles = getElements('[data-collapsible]');
    }

    collapsibles.forEach(function (collapsible) {
      // initialize
      if (collapsible.dataset[COLLAPSIBLE] === State.COLLAPSED) {
        hide(getContent(collapsible));
      } // bind events


      collapsible.addEventListener('click', function (e) {
        var target = e.target;
        var headerTarget = findAncestor(target, function (el) {
          return 'collapsibleHeader' in el.dataset;
        }, 5);
        var state = collapsible.dataset[COLLAPSIBLE];

        if (state === State.COLLAPSED) {
          open(collapsible);

          if (accordion) {
            collapsibles.filter(function (_collapsible) {
              return _collapsible !== collapsible;
            }).forEach(function (other) {
              return collapse(other);
            });
          }
        } else if (headerTarget && headerTarget.parentNode === collapsible) {
          collapse(collapsible);
        }
      });
    });
  }

  var getContent = function getContent(collapsible) {
    return getElement('[data-collapsible-content]', collapsible);
  };

  var open = function open(collapsible) {
    return toggle(collapsible, show, State.OPEN, addClass);
  };

  var collapse = function collapse(collapsible) {
    return toggle(collapsible, hide, State.COLLAPSED, removeClass);
  };

  function toggle(collapsible, displayCb, state, classCb) {
    displayCb(getContent());
    collapsible.dataset[COLLAPSIBLE] = state;
    classCb(collapsible, 'expanded');
  }

  var collapsible = /*#__PURE__*/Object.freeze({
    Collapsible: Collapsible
  });

  exports.FORM = index;
  exports.UI = collapsible;

  return exports;

}({}));
