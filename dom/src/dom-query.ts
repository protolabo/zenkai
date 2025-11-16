import { isFunction, isNullOrUndefined, valOrDefault, isNullOrWhitespace } from '@protolabo/zenjs';
import { isElement, isHTMLElement, isDocumentFragment, isNode } from './dom-parse';

/**
 * Checks whether the selector represents a `class`
 * @private
 */
const isClassSelector = (selector: string): boolean => /^\.[a-zA-Z0-9_-]+$/.test(selector);

/**
 * Checks whether the selector represents an `id`
 * @private
 */
const isIdSelector = (selector: string): boolean => /^#[a-zA-Z0-9_-]+$/.test(selector);

/**
 * Returns the first element within the specified container that matches the 
 * specified selector, group or selectors.
 * @param selector - A DOMString containing one or more selectors to match
 * @param container - Container queried (defaults to document)
 * @returns The first element that matches the specified set of CSS selectors.
 * @memberof DOM
 */
export function getElement(
    selector: string, 
    container?: HTMLElement | DocumentFragment | null
): HTMLElement | null {
    const _container = isNode(container) ? container : document;

    if (isNullOrWhitespace(selector)) {
        return null;
    }

    if (isDocumentFragment(_container)) {
        return _container.querySelector(selector);
    }

    if (isIdSelector(selector)) {
        return document.getElementById(selector.substring(1));
    }

    if (isClassSelector(selector)) {
        return _container.getElementsByClassName(selector.substring(1))[0] as HTMLElement || null;
    }

    return _container.querySelector(selector);
}

/**
 * Returns all elements that match the selector query.
 * @param selector - A DOMString containing one or more selectors to match
 * @param container - Container queried (defaults to document)
 * @returns A live or static (not live) collection of elements that match the selector.
 * @memberof DOM
 */
export function getElements(
    selector: string, 
    container?: HTMLElement | DocumentFragment | null
): HTMLCollection | NodeList | null {
    const _container = isNode(container) ? container : document;

    if (isNullOrWhitespace(selector)) {
        return null;
    }

    if (isDocumentFragment(_container)) {
        return _container.querySelectorAll(selector);
    }

    if (isClassSelector(selector)) {
        return _container.getElementsByClassName(selector.substring(1));
    }

    return _container.querySelectorAll(selector);
}

/**
 * Returns the first Template within the specified container that matches the specified selector.
 * @param selector - A DOMString containing one or more selectors to match
 * @param container - Container queried (defaults to document)
 * @returns The first Template that matches the specified set of CSS selectors.
 * @memberof DOM
 */
export function getTemplate(
    selector: string, 
    container?: HTMLElement | null
): HTMLTemplateElement | null {
    return 'content' in document.createElement('template') 
        ? getElement(selector, container) as HTMLTemplateElement | null
        : null;
}

/**
 * Returns a duplicate of the template.
 * @param template - Template to clone
 * @param deep - Whether to clone children (default: true)
 * @returns The template's clone.
 * @memberof DOM
 */
export function cloneTemplate(
    template: HTMLTemplateElement | null, 
    deep?: boolean
): DocumentFragment | null {
    return template 
        ? document.importNode(template.content, valOrDefault(deep, true)) 
        : null;
}

/**
 * Gets the previous or next element sibling of the specified element
 * @param dir - Sibling direction property name
 * @param element - Element
 * @param pred - Optional predicate to filter siblings
 * @returns Element or null
 * @private
 */
function getElementSibling(
    dir: 'previousElementSibling' | 'nextElementSibling',
    element: HTMLElement,
    pred?: (el: Element) => boolean
): Element | null {
    if (!isHTMLElement(element)) {
        return null;
    }

    let sibling = element[dir];

    if (isFunction(pred)) {
        while (isElement(sibling) && !pred(sibling)) {
            sibling = sibling[dir];
        }
    }

    return sibling;
}

/**
 * Gets the previous element of the specified one in its parent's children list
 * @param element - Element
 * @param pred - Optional search condition
 * @returns Element or null if the specified element is the first one in the list
 * @memberof DOM
 */
export function getPreviousElementSibling(
    element: HTMLElement, 
    pred?: (el: Element) => boolean
): Element | null {
    return getElementSibling('previousElementSibling', element, pred);
}

/**
 * Gets the element following the specified one in its parent's children list
 * @param element - Element
 * @param pred - Optional search condition
 * @returns Element or null if the specified element is the last one in the list
 * @memberof DOM
 */
export function getNextElementSibling(
    element: HTMLElement, 
    pred?: (el: Element) => boolean
): Element | null {
    return getElementSibling('nextElementSibling', element, pred);
}

/**
 * Finds an ancestor of an element
 * @param target - Element to start from
 * @param pred - Decides whether the target is found
 * @param max - Maximum number of iterations (optional)
 * @returns Matching ancestor element or null
 * @memberof DOM
 */
export function findAncestor(
    target: Element, 
    pred: (el: Element) => boolean, 
    max?: number
): Element | null {
    if (!isElement(target)) {
        throw new TypeError("findAncestor: target must be a valid HTML Element");
    }

    if (!isFunction(pred)) {
        throw new TypeError("findAncestor: pred must be a valid Function");
    }

    const parent = target.parentElement;

    if (max && max > 0) {
        return findAncestorIter(parent, pred, max - 1);
    }

    return findAncestorInf(parent, pred);
}

/**
 * Look for an ancestor of an element using a callback (infinite)
 * @param target - Current element
 * @param pred - Decides whether the target is found
 * @returns Matching element or null
 * @private
 */
function findAncestorInf(target: Element | null, pred: (el: Element) => boolean): Element | null {
    if (isNullOrUndefined(target)) {
        return null;
    }

    if (pred(target)) {
        return target;
    }

    return findAncestorInf(target.parentElement, pred);
}

/**
 * Look for an ancestor of an element using a callback with a maximum number of iterations
 * @param target - Current element
 * @param pred - Decides whether the target is found
 * @param max - Maximum number of iterations remaining
 * @returns Matching element or null
 * @private
 */
function findAncestorIter(
    target: Element | null, 
    pred: (el: Element) => boolean, 
    max: number
): Element | null {
    if (isNullOrUndefined(target) || max === 0) {
        return null;
    }

    if (pred(target)) {
        return target;
    }

    return findAncestorIter(target.parentElement, pred, max - 1);
}
