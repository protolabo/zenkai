import { getElement, getElements, isHTMLElement } from "../../dom/index.js";
import { isFunction, isString, isNullOrUndefined, isEmpty, isNull, valOrDefault, isUndefined } from "../../datatype/index.js";
import { check, uncheck, setState, getState, getType } from "./global.js";
import { getInput } from "./utils.js";
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
    this.callback(this.current);
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

export function Selector(container, _callback) {
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