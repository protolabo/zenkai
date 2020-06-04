import { isNullOrUndefined, isString, isIterable, hasOwn, pascalCase, isEmpty, all, some, isCollection } from '@std/index.js';
import { windowWidth, windowHeight } from './dom-stat.js';

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
export const isNode = (obj) => obj instanceof Node;

/**
 * Verifies that an object is a *NodeList*
 * @param {Element} obj 
 * @returns {boolean} Value indicating whether the object is an *NodeList*
 * @memberof DOM
 */
export const isNodeList = (obj) => obj instanceof NodeList;

/**
 * Verifies that an object is an *Element*
 * @param {Element} obj 
 * @returns {boolean} Value indicating whether the object is an *Element*
 * @memberof DOM
 */
export const isElement = (obj) => isElementNode(obj) && obj instanceof Element;

/**
 * Verifies that an object is an *HTML Element*
 * @param {Element} obj 
 * @param {string|string[]|string[][]} [kind] 
 * @returns {boolean} Value indicating whether the object is an *HTMLElement*
 * @memberof DOM
 */
export const isHTMLElement = (obj, kind) => {
    if (!(isElementNode(obj) && obj instanceof HTMLElement)) {
        return false;
    }

    if (isIterable(kind)) {
        return isHTMLElementKind(obj, Array.isArray(kind) ? kind : [kind]);
    }

    return true;
};

const TagNameMapping = {
    'a': "Anchor",
    'br': "BR",
    'dl': "DList",
    'datalist': "DataList",
    'fieldset': "FieldSet",
    'frameset': "FrameSet",
    'hr': "HR",
    'h1': "Heading",
    'h2': "Heading",
    'h3': "Heading",
    'h4': "Heading",
    'h5': "Heading",
    'h6': "Heading",
    'li': "LI",
    'ol': "OList",
    'optgroup': "OptGroup",
    'p': "Paragraph",
    'q': "Quote",
    'blockquote': "Quote",
    'caption': "TableCaption",
    'td': "TableCell",
    'th': "TableCell",
    'col': "TableCol",
    'tr': "TableRow",
    'tbody': "TableSection",
    'thead': "TableSection",
    'tfoot': "TableSection",
    'textarea': "TextArea",
    'ul': "UList",
};

/**
 * Verifies the tag of an *HTML Element*
 * @param {HTMLElement} element 
 * @param {string[]|string[][]} kinds
 * @returns {boolean}
 */
function isHTMLElementKind(element, kinds) {
    const isInstanceOf = (obj) => element instanceof obj;
    const hasTag = (tag) => element.tagName === tag.toUpperCase();
    const isOfType = (type) => Array.isArray(type) ? type.includes(element.type) : element.type === type;
    
    return kinds.some((kind) => {
        if (!isIterable(kind)) {
            return false;
        }

        var name = kind;
        var type = null;
        
        if (Array.isArray(kind)) {
            [name, type] = kind;
        }

        name = name.toLowerCase();
        var interfaceName = `HTML${hasOwn(TagNameMapping, name) ? TagNameMapping[name] : pascalCase(name)}Element`;

        if (!(isInstanceOf(window[interfaceName]) || hasTag(name))) {
            return false;
        }

        if (isCollection(type) && !isEmpty(type)) {
            return isOfType(type);
        }

        return true;
    });
}

/**
 * Verifies that an object is an *HTMLCollection*
 * @param {Element} obj 
 * @returns {boolean} Value indicating whether the object is an *HTMLCollection*
 * @memberof DOM
 */
export const isHTMLCollection = (obj) => obj instanceof HTMLCollection;

/**
 * Verifies that an object is an *DocumentFragment*
 * @param {Element} obj 
 * @returns {boolean} Value indicating whether the object is an *DocumentFragment*
 * @memberof DOM
 */
export const isDocumentFragment = (obj) => isDocumentFragmentNode(obj) && obj instanceof DocumentFragment;

/**
 * Converts an html string to an HTML Element or a list of HTML Elements
 * @param {!string} prop 
 * @param {!string} html 
 */
/* istanbul ignore next */
function _htmlToElement(prop, html) {
    if (!isString(html)) {
        return null;
    }

    var template = document.createElement('template');
    template.innerHTML = html.trim();

    return template.content[prop];
}

/**
 * Converts an html string to an HTML Element
 * @param {!string} html 
 * @returns {Node}
 * @memberof DOM
 */
export const htmlToElement = _htmlToElement.bind(null, 'firstChild');

/**
 * Converts an html string to a list of HTML Elements
 * @param {!string} html 
 * @returns {NodeList}
 * @memberof DOM
 */
export const htmlToElements = _htmlToElement.bind(null, 'childNodes');

/**
 * Verifies that an element is visible
 * @param {!HTMLElement} element 
 * @returns {boolean}
 * @memberof DOM
 */
export function isInViewport(element) {
    if (!isHTMLElement(element)) {
        throw new Error("The given element is not a valid HTML Element");
    }

    var { top, right, bottom, left } = element.getBoundingClientRect();

    return top >= 0 && left >= 0 && bottom <= windowHeight() && right <= windowWidth();
}

/**
 * Verifies that an element is displayed inside a target element
 * @param {!HTMLElement} element 
 * @param {!HTMLElement} target
 * @returns {boolean}
 * @memberof DOM
 */
export function isInElement(element, target) {
    if (!all([element, target], isHTMLElement)) {
        throw new Error("The given element is not a valid HTML Element");
    }

    var { top: top1, right: right1, bottom: bottom1, left: left1 } = element.getBoundingClientRect();
    var { top: top2, right: right2, bottom: bottom2, left: left2 } = target.getBoundingClientRect();

    return all([[top2, top1], [left2, left1], [right1, right2], [bottom1, bottom2]], (inner, outer) => inner <= outer);
}