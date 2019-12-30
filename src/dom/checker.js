import { isNullOrUndefined } from '@datatype/index.js';

/**
 * Verifies that an object is a *Node*
 * @param {Element} obj 
 * @returns {boolean} Value indicating whether the object is an *Node*
 * @memberof DOM
 */
export const isNode = (obj) => !isNullOrUndefined(obj) && obj instanceof Node;

/* istanbul ignore next */
const isElementNode = (obj) => !isNullOrUndefined(obj) && obj.nodeType === Node.ELEMENT_NODE;

/**
 * Verifies that an object is an *Element*
 * @param {Element} obj 
 * @returns {boolean} Value indicating whether the object is an *Element*
 * @memberof DOM
 */
export const isElement = (obj) => isElementNode(obj) && obj instanceof Element;

/**
 * Verifies that an object is an *HTMLElement*
 * @param {Element} obj 
 * @returns {boolean} Value indicating whether the object is an *HTMLElement*
 * @memberof DOM
 */
export const isHTMLElement = (obj) => isElementNode(obj) && obj instanceof HTMLElement;

/**
 * Verifies that an object is an *HTMLCollection*
 * @param {Element} obj 
 * @returns {boolean} Value indicating whether the object is an *HTMLCollection*
 * @memberof DOM
 */
export const isHTMLCollection = (obj) => !isNullOrUndefined(obj) && obj instanceof HTMLCollection;

/* istanbul ignore next */
const isDocumentFragmentNode = (obj) => !isNullOrUndefined(obj) && obj.nodeType === Node.DOCUMENT_FRAGMENT_NODE;

/**
 * Verifies that an object is an *DocumentFragment*
 * @param {Element} obj 
 * @returns {boolean} Value indicating whether the object is an *DocumentFragment*
 * @memberof DOM
 */
export const isDocumentFragment = (obj) => isDocumentFragmentNode(obj) && obj instanceof DocumentFragment;