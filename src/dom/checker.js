import { isNullOrUndefined } from '@datatype/index.js';

/**
 * Verifies that an object is a *Node*
 * @param {Element} obj 
 * @returns {boolean} Value indicating whether the object is an *Node*
 * @memberof DOM
 */
export function isNode(obj) {
    return isNullOrUndefined(obj) ? false : obj instanceof Node;
}

/**
 * Verifies that an object is an *Element*
 * @param {Element} obj 
 * @returns {boolean} Value indicating whether the object is an *Element*
 * @memberof DOM
 */
export function isElement(obj) {
    return isNullOrUndefined(obj) ? false : obj.nodeType === 1 && obj instanceof Element;
}

/**
 * Verifies that an object is an *HTMLElement*
 * @param {Element} obj 
 * @returns {boolean} Value indicating whether the object is an *HTMLElement*
 * @memberof DOM
 */
export function isHTMLElement(obj) {
    return isNullOrUndefined(obj) ? false : obj.nodeType === 1 && obj instanceof HTMLElement;
}

/**
 * Verifies that an object is an *DocumentFragment*
 * @param {Element} obj 
 * @returns {boolean} Value indicating whether the object is an *DocumentFragment*
 * @memberof DOM
 */
export function isDocumentFragment(obj) {
    return isNullOrUndefined(obj) ? false : obj.nodeType === 11 && obj instanceof DocumentFragment;
}