import { isFunction, isNullOrUndefined, valOrDefault, isNullOrWhitespace } from '@std/index.js';
import { isElement } from './dom-parse.js';

/**
 * Checks whether the selector represents a `class`
 * @returns {boolean}
 * @private
 */
const isClassSelector = (selector) => /^\.[a-zA-Z0-9_-]+$/.test(selector);

/**
 * Checks whether the selector represents an `id`
 * @returns {boolean}
 * @private
 */
const isIdSelector = (selector) => /^#[a-zA-Z0-9_-]+$/.test(selector);

/**
 * Returns the first element within the specified container that matches the 
 * specified selector, group or selectors.
 * @param {!string} selector A DOMString containing one or more selectors to match
 * @param {HTMLElement|DocumentFragment} [_container] Container queried
 * @returns {HTMLElement|null} The first element matches that matches the specified set of CSS selectors.
 * @memberof DOM
 */
export function getElement(selector, _container) {
    var container = valOrDefault(_container, document);

    if (isNullOrWhitespace(selector)) {
        return null;
    }

    if (container instanceof DocumentFragment) {
        return container.querySelector(selector);
    }

    if (isIdSelector(selector)) {
        return document.getElementById(selector.substring(1));
    }

    if (isClassSelector(selector)) {
        return container.getElementsByClassName(selector.substring(1))[0];
    }

    return container.querySelector(selector);
}

/**
 * Returns all elements that match the selector query.
 * @param {!string} selector A DOMString containing one or more selectors to match
 * @param {HTMLElement|DocumentFragment} [_container] Container queried
 * @returns {HTMLCollection|NodeList} A live or *static* (not live) collection of the `container`'s children Element that match the `selector`.
 * @memberof DOM
 */
export function getElements(selector, _container) {
    var container = valOrDefault(_container, document);

    if (isNullOrWhitespace(selector)) {
        return null;
    }

    if (container instanceof DocumentFragment) {
        return container.querySelectorAll(selector);
    }

    if (isClassSelector(selector)) {
        return container.getElementsByClassName(selector.substring(1));
    }

    return container.querySelectorAll(selector);
}

/**
 * Returns the first Template within the specified container that matches the specified selector, group or selectors.
 * @param {string} selector A DOMString containing one or more selectors to match
 * @param {HTMLElement} [_container] Container queried
 * @returns {HTMLTemplateElement|null} The first Template matches that matches the specified set of CSS selectors.
 * @memberof DOM
 */
export function getTemplate(selector, _container) {
    return 'content' in document.createElement('template') ? getElement(selector, _container) : null;
}

/**
 * Returns a duplicate of the template.
 * @param {HTMLTemplateElement} template 
 * @param {boolean} deep used to decide whether the children of the template should also be clone
 * @returns {DocumentFragment} The template's clone.
 * @memberof DOM
 */
export function cloneTemplate(template, deep) {
    return template ? document.importNode(template.content, valOrDefault(deep, true)) : template;
}

/**
 * Gets the previous or next element of the specified element
 * @param {string} dir sibling direction
 * @param {HTMLElement} element element
 * @returns {(Element|null)} Element or null
 * @private
 */
/* istanbul ignore next */
function getElementSibling(dir, element, pred) {
    var sibling = element[dir];

    if (isFunction(pred)) {
        while (isElement(sibling) && pred(sibling)) {
            sibling = sibling[dir];
        }
    }

    return sibling;
}

/**
 * Gets the previous element of the specified one in its parent's children list
 * @function getPreviousElementSibling
 * @param {HTMLElement} el element
 * @param {*} pred Search end condition
 * @returns {(Element|null)} Element or null if the specified element is the first one in the list
 * @memberof DOM
 */
export const getPreviousElementSibling = getElementSibling.bind(null, "previousElementSibling");

/**
 * Gets the element following the specified one in its parent's children list
 * @function getNextElementSibling
 * @param {HTMLElement} el element
 * @param {*} pred Search end condition
 * @returns {(Element|null)} Element or null if the specified element is the last one in the list
 * @memberof DOM
 */
export const getNextElementSibling = getElementSibling.bind(null, "nextElementSibling");

/**
 * Finds an ancestor of an element
 * @param {Element} target 
 * @param {Function} pred Decides whether the target is found
 * @param {number} [_max] Maximum number of iterations
 * @returns {Element|null}
 * @memberof DOM
 */
export function findAncestor(target, pred, _max) {
    if (!isElement(target)) {
        throw new Error("The given target parameter is not a valid HTML Element");
    }

    if (!isFunction(pred)) {
        throw new Error("The given pred parameter is not a valid Function");
    }

    var parent = target.parentElement;
    
    if (_max > 0) {
        return findAncestorIter(parent, pred, _max - 1);
    }

    return findAncestorInf(parent, pred);
}

/**
 * Look an ancestor of an element using a callback
 * @param {Element} target 
 * @param {Function} pred Decides whether the target is found
 * @private
 */
/* istanbul ignore next */
function findAncestorInf(target, pred) {
    if (isNullOrUndefined(target)) {
        return null;
    }

    if (pred(target)) {
        return target;
    }

    return findAncestorInf(target.parentElement, pred);
}

/**
 * Look for an ancestor of an element using a callback with a maximum number of iteration
 * @param {Element} target 
 * @param {Function} pred Decides whether the target is found
 * @param {number} max Maximum number of iterations
 * @private
 */
/* istanbul ignore next */
function findAncestorIter(target, pred, max) {
    if (isNullOrUndefined(target) || max === 0) {
        return null;
    }

    if (pred(target)) {
        return target;
    }

    return findAncestorIter(target.parentElement, pred, max - 1);
}