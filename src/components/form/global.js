import { valOrDefault } from "@datatype/index.js";

const TYPE = 'type';
const STATE = 'state';
const CHECKED = 'checked';
const UNCHECKED = 'unchecked';

export const getType = (element) => element.dataset[TYPE];

export const getState = (element) => element.dataset[STATE];

export const setState = (element, value) => element.dataset[STATE] = value;

export const check = (element, value) => setState(element, valOrDefault(value, CHECKED));

export const uncheck = (element, value) => setState(element, valOrDefault(value, UNCHECKED));