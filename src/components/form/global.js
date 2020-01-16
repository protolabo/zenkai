import { valOrDefault, isString, isNullOrUndefined, isEmpty } from "@datatype/index.js";
import { isHTMLElement, getElements, getElement } from "@dom/index.js";

const TYPE = 'type';
const STATE = 'state';
const CHECKED = 'checked';
const UNCHECKED = 'unchecked';

export const getType = (element) => element.dataset[TYPE];

export const getState = (element) => element.dataset[STATE];

export const setState = (element, value) => element.dataset[STATE] = value;

export const check = (element, value) => setState(element, valOrDefault(value, CHECKED));

export const uncheck = (element, value) => setState(element, valOrDefault(value, UNCHECKED));

export function getComponentElement(container, pred, selector) {
    if (isHTMLElement(container)) {
        return pred(container) ? [container] : getElements(selector, container);
    } else if (isString(container) && !isEmpty(container)) {
        let _container = getElement(container);
        return isNullOrUndefined(_container) ? null : getComponentElement(_container);
    } else if (isNullOrUndefined(container)) {
        return getElements(selector);
    }

    return null;
}