import { isFunction, isNullOrUndefined, valOrDefault } from '@datatype/index.js';

/**
 * Checks whether the selector is a class
 * @returns {boolean}
 * @private
 */
const isClassSelector = (selector) => /^\.[a-zA-Z0-9_-]+$/.test(selector);

/**
 * Checks whether the selector is an id
 * @returns {boolean}
 * @private
 */
const isIdSelector = (selector) => /^#[a-zA-Z0-9_-]+$/.test(selector);

/**
 * Returns the first Element within the specified container that matches the specified selector, group or selectors.
 * @param {string} selector A DOMString containing one or more selectors to match
 * @param {HTMLElement|DocumentFragment} [_container] Container queried
 * @returns {HTMLElement|null} The first Element matches that matches the specified set of CSS selectors.
 * @memberof DOM
 */
export function getElement(selector, _container) {
    var container = valOrDefault(_container, document);

    if (container instanceof DocumentFragment) {
        container.querySelector(selector);
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
 * @param {string} selector A DOMString containing one or more selectors to match
 * @param {HTMLElement|DocumentFragment} [_container] Container queried
 * @returns {HTMLCollection|NodeList} A live or *static* (not live) collection of the `container`'s children Element that match the `selector`.
 * @memberof DOM
 */
export function getElements(selector, _container) {
    var container = valOrDefault(_container, document);

    if (container instanceof DocumentFragment) {
        container.querySelectorAll(selector);
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
function getElementSibling(el, dir, pred) {
    var predicate = (el) => !isNullOrUndefined(el);
    if (isFunction(pred)) {
        predicate = (el) => !isNullOrUndefined(el) && !pred(el);
    }

    var sibling = el[dir];
    while (predicate(sibling)) {
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
export function getPreviousElementSibling(el, predCb) { return getElementSibling(el, "previousElementSibling", predCb); }

/**
 * Gets the element following the specified one in its parent's children list
 * @param {HTMLElement} el element
 * @param {*} predCb Search end condition
 * @returns {(Element|null)} Element or null if the specified element is the last one in the list
 * @memberof DOM
 */
export function getNextElementSibling(el, predCb) { return getElementSibling(el, "nextElementSibling", predCb); }