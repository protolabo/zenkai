import { valOrDefault } from "../../datatype/index.js";
var TYPE = 'type';
var STATE = 'state';
var CHECKED = 'checked';
var UNCHECKED = 'unchecked';
export var getType = function getType(element) {
  return element.dataset[TYPE];
};
export var getState = function getState(element) {
  return element.dataset[STATE];
};
export var setState = function setState(element, value) {
  return element.dataset[STATE] = value;
};
export var check = function check(element, value) {
  return setState(element, valOrDefault(value, CHECKED));
};
export var uncheck = function uncheck(element, value) {
  return setState(element, valOrDefault(value, UNCHECKED));
};