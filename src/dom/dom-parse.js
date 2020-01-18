import { isNullOrUndefined, isString } from '@datatype/index.js';

/* istanbul ignore next */
const isElementNode = (obj) => !isNullOrUndefined(obj) && obj.nodeType === Node.ELEMENT_NODE;

/* istanbul ignore next */
const isDocumentFragmentNode = (obj) => !isNullOrUndefined(obj) && obj.nodeType === Node.DOCUMENT_FRAGMENT_NODE;

/**
 * Verifies that an object is a *Node*
 * @param {Element} obj 
 * @returns {boolean} Value indicating whether the object is an *Node*
 * @memberof DOM
 */
export const isNode = (obj) => !isNullOrUndefined(obj) && obj instanceof Node;

/**
 * Verifies that an object is a *NodeList*
 * @param {Element} obj 
 * @returns {boolean} Value indicating whether the object is an *NodeList*
 * @memberof DOM
 */
export const isNodeList = (obj) => !isNullOrUndefined(obj) && obj instanceof NodeList;

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

/**
 * Verifies that an object is an *DocumentFragment*
 * @param {Element} obj 
 * @returns {boolean} Value indicating whether the object is an *DocumentFragment*
 * @memberof DOM
 */
export const isDocumentFragment = (obj) => isDocumentFragmentNode(obj) && obj instanceof DocumentFragment;

/**
 * Creates a template with content
 * @param {string} html 
 * @returns {HTMLTemplateElement}
 * @private
 */
/* istanbul ignore next */
function createTemplate(html) {
    var template = document.createElement('template');
    template.innerHTML = html.trim();

    return template.content;
}

/**
 * Converts an html string to an HTML Element
 * @param {!string} html 
 * @returns {Node}
 * @memberof DOM
 */
export function htmlToElement(html) {
    if (!isString(html)) {
        console.error("dom-parse>htmlToElement(html): html must be a string");
        return null;
    }

    var template = createTemplate(html);

    return template.firstChild;
}

/**
 * Converts an html string to a list of HTML Elements
 * @param {!string} html 
 * @returns {NodeList}
 * @memberof DOM
 */
export function htmlToElements(html) {
    if (!isString(html)) {
        console.error("dom-parse>htmlToElements(html): html must be a string");
        return null;
    }

    var template = createTemplate(html);

    return template.childNodes;
}