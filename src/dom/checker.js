import { isNullOrUndefined } from '@datatype/index.js';

/**
 * Verifies that an object is a *Node*
 * @param {Element} obj 
 * @returns {boolean} Value indicating whether the object is an *Node*
 * @memberof DOM
 */
export const isNode = (obj) => !isNullOrUndefined(obj) && obj instanceof Node;

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

const isDocumentFragmentNode = (obj) => !isNullOrUndefined(obj) && obj.nodeType === Node.DOCUMENT_FRAGMENT_NODE;

/**
 * Verifies that an object is an *DocumentFragment*
 * @param {Element} obj 
 * @returns {boolean} Value indicating whether the object is an *DocumentFragment*
 * @memberof DOM
 */
export const isDocumentFragment = (obj) => isDocumentFragmentNode(obj) && obj instanceof DocumentFragment;

// Add some,all,one to the checkers
[isNode, isElement, isHTMLElement, isDocumentFragment].forEach((fn) => {
    fn['some'] = function (values, min = 1) {
        if (min === 1) {
            for (let i = 0; i < values.length; i++) {
                if (fn(values[i])) {
                    return true;
                }
            }
            return false;
        }
        var counter = 0;
        for (let i = 0; i < values.length; i++) {
            if (fn(values[i])) {
                counter++;
            }
        }
        return counter >= min;
    };
    fn['all'] = function (values) {
        for (let i = 0; i < values.length; i++) {
            if (!fn(values[i])) {
                return false;
            }
        }
        return true;
    };
    fn['one'] = function (values) {
        var counter = 0;
        for (let i = 0; i < values.length; i++) {
            if (fn(values[i])) {
                counter++;
            }
        }
        return counter === 1;
    };
});