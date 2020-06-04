import { isCollection, all, isNullOrUndefined } from '@std/index.js';
import { isNode, isElement, isHTMLCollection, isDocumentFragment } from './dom-parse.js';


/**
 * Inserts a given element before the targetted element
 * @param {!Element} target 
 * @param {!Element} element 
 * @memberof DOM
 */
export function insertBeforeElement(target, element) {
    if (!all([target, element], isElement)) {
        throw new TypeError("Bad argument: The given `element` or `target` is not a valid Element");
    }

    target.insertAdjacentElement('beforebegin', element);

    return target;
}

/**
 * Inserts a given element after the targetted element
 * @param {!Element} target 
 * @param {!Element} element 
 * @memberof DOM
 */
export function insertAfterElement(target, element) {
    if (!all([target, element], isElement)) {
        throw new TypeError("Bad argument: The given `element` or `target` is not a valid Element");
    }

    target.insertAdjacentElement('afterend', element);

    return target;
}

/**
 * Inserts a givern element as the first children of the targetted element
 * @param {!Element} target 
 * @param {!Element} element 
 * @memberof DOM
 */
export function preprendChild(target, element) {
    if (!all([target, element], isElement)) {
        throw new TypeError("Bad argument: The given `element` or `target` is not a valid Element");
    }

    target.insertAdjacentElement('afterbegin', element);

    return target;
}

/**
 * Append a list of elements to a node.
 * @param {!Element} parent
 * @param {!HTMLElement[]|HTMLCollection} children
 * @returns {HTMLElement}
 * @memberof DOM
 */
export function appendChildren(parent, children) {
    if (!isNode(parent)) {
        throw new TypeError("Bad argument: The given `parent` is not a valid Node");
    }

    if (!(isHTMLCollection(children) || isCollection(children))) {
        throw new TypeError("Bad argument: The given `children` is not a valid HTMLCollection/HTMLElement array");
    }

    const createText = (obj) => document.createTextNode(obj.toString());

    var fragment = isDocumentFragment(parent) ? parent : document.createDocumentFragment();

    Array.from(children).forEach(element => {
        if (!isNullOrUndefined(element)) {
            fragment.appendChild(isNode(element) ? element : createText(element.toString()));
        }
    });

    if (parent !== fragment) {
        parent.appendChild(fragment);
    }

    return parent;
}