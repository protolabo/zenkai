import { valOrDefault, isString, isNullOrUndefined, isNullOrWhitespace } from "@std/index.js";
import { isHTMLElement, getElements, getElement } from "@dom/index.js";


const TYPE = 'type';
const VALUE = 'value';
const STATE = 'state';
const CHECKED = 'checked';
const UNCHECKED = 'unchecked';

/**
 * Gets type attribute
 * @param {HTMLElement} element 
 * @returns {string}
 */
export const getType = (element) => element.dataset[TYPE];

/**
 * Sets type attribute
 * @param {HTMLElement} element 
 * @param {string} value 
 * @returns {string}
 */
export const setType = (element, value) => element.dataset[TYPE] = value;

/**
 * Gets value attribute
 * @param {HTMLElement} element 
 * @returns {string}
 */
export const getValue = (element) => element.dataset[VALUE];

/**
 * Sets value attribute
 * @param {HTMLElement} element 
 * @param {string} value 
 * @returns {string}
 */
export const setValue = (element, value) => element.dataset[VALUE] = value;

/**
 * Gets state attribute
 * @param {HTMLElement} element 
 * @returns {string}
 */
export const getState = (element) => element.dataset[STATE];

/**
 * Sets state attribute
 * @param {HTMLElement} element 
 * @param {string} value 
 * @returns {string}
 */
export const setState = (element, value) => element.dataset[STATE] = value;

export const check = (element, value) => setState(element, valOrDefault(value, CHECKED));

export const uncheck = (element, value) => setState(element, valOrDefault(value, UNCHECKED));

/**
 * Resolves the container
 * @param {HTMLElement|string} container 
 * @returns {HTMLElement}
 */
export function resolveContainer(container) {
    if (isHTMLElement(container)) {
        return container;
    } else if (isString(container) && !isNullOrWhitespace(container)) {
        return getElement(container);
    }

    return null;
}

/**
 * 
 * @param {string} selector 
 * @param {HTMLElement|string} [_container] 
 * @returns {HTMLElement[]}
 */
export function getComponents(selector, _container) {
    if (isNullOrUndefined(selector)) {
        throw new TypeError("Bad argument");
    }

    const container = resolveContainer(_container);

    if (!isHTMLElement(container)) {
        return null;
    }

    return getElements(selector, container);
}

/**
 * 
 * @param {string} type 
 * @param {HTMLElement} container 
 * @returns {HTMLInputElement}
 */
export function getInput(type, container) {
    if (isHTMLElement(container, 'label') && !isNullOrWhitespace(container.htmlFor)) {
        return getElement(`#${container.htmlFor}`);
    }

    return getElement(`input[type='${valOrDefault(type, 'text')}']`, container);
}