import { getElement } from "../../dom/index.js";
import { valOrDefault, isNullOrWhitespace } from "../../datatype/index.js";
export function getInput(type, label) {
  if (isNullOrWhitespace(label.htmlFor)) {
    return getElement("input[type='".concat(valOrDefault(type, 'text'), "']"), label);
  }

  return getElement("#".concat(label.htmlFor));
}
export var toData = function toData(name) {
  return "[data-type=".concat(name, "]");
};
export var isSelector = function isSelector(element, type) {
  return element.dataset['type'] === type;
};