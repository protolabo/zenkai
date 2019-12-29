import { isIterable, isString } from '@datatype/index.js';
import { isNode, isElement, isHTMLCollection } from './checker.js';

/**
 * Inserts a given element before the targetted element
 * @param {HTMLElement} target 
 * @param {HTMLElement} element 
 * @memberof DOM
 */
export function insertBeforeElement(target, element) {
    if (!isElement.all([target, element])) {
        return null;
    }

    target.insertAdjacentElement('beforebegin', element);

    return target;
}

/**
 * Inserts a given element after the targetted element
 * @param {HTMLElement} target 
 * @param {HTMLElement} element 
 * @memberof DOM
 */
export function insertAfterElement(target, element) {
    if (!isElement.all([target, element])) {
        return null;
    }

    target.insertAdjacentElement('afterend', element);

    return target;
}

/**
 * Inserts a givern element as the first children of the targetted element
 * @param {HTMLElement} target 
 * @param {HTMLElement} element 
 * @memberof DOM
 */
export function preprendChild(target, element) {
    if (!isElement.all([target, element])) {
        return null;
    }

    target.insertAdjacentElement('afterbegin', element);

    return target;
}

/**
 * Append a list of elements to a node.
 * @param {Element} parent
 * @param {HTMLElement[]|HTMLCollection} children
 * @returns {HTMLElement}
 * @memberof DOM
 */
export function appendChildren(parent, children) {
    var fragment = document.createDocumentFragment();
    if (!isNode(parent)) {
        return null;
    }
    if (!isHTMLCollection(children) && !isIterable(children) || isString(children)) {
        return null;
    }

    Array.from(children).forEach(element => {
        fragment.appendChild(isNode(element) ? element : document.createTextNode(element.toString()));
    });
    parent.appendChild(fragment);

    return parent;
}