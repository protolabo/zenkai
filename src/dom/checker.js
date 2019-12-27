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


[isNode, isElement, isHTMLElement, isDocumentFragment].forEach((fn)=>{
    fn['some'] = function (values, min = 1) {
        if(min === 1) {
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