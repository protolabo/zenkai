import { isFunction, isNullOrUndefined, valOrDefault, isNullOrWhitespace } from '@datatype/index.js';
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

    if(isNullOrWhitespace(selector)) {
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

    if(isNullOrWhitespace(selector)) {
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
 * @param {HTMLElement} el element
 * @param {string} dir sibling direction
 * @returns {(Element|null)} Element or null
 * @private
 */
/* istanbul ignore next */
function getElementSibling(el, dir, pred) {
    var predicate = (el) => true;
    if (isFunction(pred)) {
        predicate = (el) => !isNullOrUndefined(el) && pred(el);
    }

    var sibling = el[dir];
    while (!predicate(sibling)) {
        sibling = sibling[dir];
    }

    return sibling;
}

/**
 * Gets the previous element of the specified one in its parent's children list
 * @param {HTMLElement} el element
 * @param {*} predCb Search end condition
 * @returns {(Element|null)} Element or null if the specified element is the first one in the list
 * @memberof DOM
 */
export function getPreviousElementSibling(el, predCb) { 
    return getElementSibling(el, "previousElementSibling", predCb); 
}

/**
 * Gets the element following the specified one in its parent's children list
 * @param {HTMLElement} el element
 * @param {*} predCb Search end condition
 * @returns {(Element|null)} Element or null if the specified element is the last one in the list
 * @memberof DOM
 */
export function getNextElementSibling(el, predCb) { 
    return getElementSibling(el, "nextElementSibling", predCb); 
}

/**
 * Finds an ancestor of an element
 * @param {Element} target 
 * @param {Function} callback Decides whether the target is found
 * @param {number} [max] Maximum number of iterations
 * @returns {Element|null}
 * @memberof DOM
 */
export function findAncestor(target, callback, max) {
    if (!isElement(target)) {
        return null;
    }
    if (!isFunction(callback)) {
        return null;
    }

    var parent = target.parentElement;
    if (max > 0) {
        return findAncestorIter(parent, callback, max - 1);
    }
    return findAncestorInf(parent, callback);
}

/**
 * Look an ancestor of an element using a callback
 * @param {Element} target 
 * @param {Function} callback Decides whether the target is found
 * @private
 */
/* istanbul ignore next */
function findAncestorInf(target, callback) {
    if (isNullOrUndefined(target)) {
        return null;
    }

    if (callback(target)) {
        return target;
    }

    return findAncestorInf(target.parentElement, callback);
}

/**
 * Look for an ancestor of an element using a callback with a maximum number of iteration
 * @param {Element} target 
 * @param {Function} callback Decides whether the target is found
 * @param {number} [max] Maximum number of iterations
 * @private
 */
/* istanbul ignore next */
function findAncestorIter(target, callback, max) {
    if (isNullOrUndefined(target) || max === 0) {
        return null;
    }

    if (callback(target)) {
        return target;
    }

    return findAncestorIter(target.parentElement, callback, max - 1);
}