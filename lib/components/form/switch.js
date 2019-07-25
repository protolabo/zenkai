import { getElement, getElements, isHTMLElement } from "../../dom/index.js";
import { isFunction, isString, isNullOrUndefined, isEmpty } from "../../datatype/index.js";
import { setState } from "./global.js";
import { getInput } from "./utils.js";
var ATTRIBUTE = 'switch';
var NONE = -1;
var Status = {
  ON: 'on',
  OFF: 'off'
};

var toData = function toData(name) {
  return "[data-type=".concat(name, "]");
};

var isSwitch = function isSwitch(element) {
  return element.dataset['type'] === ATTRIBUTE;
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
    setState(this.container, input.checked ? Status.ON : Status.OFF); // Bind events

    input.addEventListener('change', function (e) {
      setState(_this.container, input.checked ? Status.ON : Status.OFF);

      _this.callback(input.value, _this.container);
    });
  }
};
export function Switch(container, _callback) {
  var switches = getSliders(container);

  if (switches === NONE) {
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
    return isSwitch(container) ? [container] : getElements(toData(ATTRIBUTE), container);
  } else if (isString(container) && !isEmpty(container)) {
    var _container = getElement(container);

    return isNullOrUndefined(_container) ? NONE : getSliders(_container);
  } else if (isNullOrUndefined(container)) {
    return getElements(toData(ATTRIBUTE));
  }

  return NONE;
}