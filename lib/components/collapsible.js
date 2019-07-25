import { getElement, getElements, addClass, removeClass, isHTMLElement, findAncestor, show, hide } from "../dom/index.js";
import { isString, isNullOrUndefined, isEmpty, isFunction } from "../datatype/index.js";
var ATTRIBUTE = 'collapsible';
var NONE = -1;
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

export function Collapsible(container, _callback) {
  var collapsibles = getCollapsibles(container);

  if (collapsibles === NONE) {
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

export function Accordion(container, _callback) {
  var accordions = getAccordions(container);

  if (accordions === NONE) {
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

    return isNullOrUndefined(_container) ? NONE : getCollapsibles(_container);
  } else if (isNullOrUndefined(container)) {
    return getElements('[data-collapsible]');
  }

  return NONE;
}

function getAccordions(container) {
  if (isHTMLElement(container)) {
    return isAccordion(container) ? [container] : getElements(toData('accordion'), container);
  } else if (isString(container) && !isEmpty(container)) {
    var _container = getElement(container);

    return isNullOrUndefined(_container) ? NONE : getAccordions(_container);
  } else if (isNullOrUndefined(container)) {
    return getElements(toData('accordion'));
  }

  return NONE;
}