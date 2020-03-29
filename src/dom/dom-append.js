import { isIterable, isString, all } from '@std/index.js';
import { isNode, isElement, isHTMLCollection } from './dom-parse.js';

/**
 * Inserts a given element before the targetted element
 * @param {!HTMLElement} target 
 * @param {!HTMLElement} element 
 * @memberof DOM
 */
export function insertBeforeElement(target, element) {
    if (!all([target, element], isElement)) {
        throw new Error("The given element or target is not a valid HTML Element");
    }

    target.insertAdjacentElement('beforebegin', element);

    return target;
}

/**
 * Inserts a given element after the targetted element
 * @param {!HTMLElement} target 
 * @param {!HTMLElement} element 
 * @memberof DOM
 */
export function insertAfterElement(target, element) {
    if (!all([target, element], isElement)) {
        throw new Error("The given element or target is not a valid HTML Element");
    }

    target.insertAdjacentElement('afterend', element);

    return target;
}

/**
 * Inserts a givern element as the first children of the targetted element
 * @param {!HTMLElement} target 
 * @param {!HTMLElement} element 
 * @memberof DOM
 */
export function preprendChild(target, element) {
    if (!all([target, element], isElement)) {
        throw new Error("The given element or target is not a valid HTML Element");
    }

    target.insertAdjacentElement('afterbegin', element);

    return target;
}

/**
 * Append a list of elements to a node.
 * @param {Element} parent
 * @param {!HTMLElement[]|HTMLCollection} children
 * @returns {HTMLElement}
 * @memberof DOM
 */
export function appendChildren(parent, children) {
    if (!isNode(parent)) {
        throw new Error("The given parent is not a valid Node");
    }
    
    if (!isHTMLCollection(children) && !isIterable(children) || isString(children)) {
        throw new Error("The given children is not a valid HTMLCollection/HTMLElement array");
    }

    var fragment = document.createDocumentFragment();
    
    Array.from(children).forEach(element => {
        fragment.appendChild(isNode(element) ? element : document.createTextNode(element.toString()));
    });
    parent.appendChild(fragment);

    return parent;
}