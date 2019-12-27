import { isNullOrWhitespace, isNullOrUndefined } from '@datatype/index.js';
import { isHTMLElement } from './checker';

/**
 * Removes additional spaces in class attribute
 * @param {string} c class attribute's value
 * @returns {string} formatted value
 * @private
 */
const formatClass = (c) => c.replace(/\s+/g, ' ').trim();

/**
 * Transform a raw value to a valid class value
 * @param {string} c raw value
 * @returns {string} parsed value
 * @private
 */
const parseClass = (c) => {
    if (isNullOrUndefined(c)) {
        return "";
    } else if (Array.isArray(c)) {
        return c.join(' ');
    } else {
        return c.toString();
    }
};

/**
 * Verifies that an element has a class
 * @param {HTMLElement} element element
 * @param {string} className class
 * @returns {boolean} value indicating whether the element has the class
 * @memberof DOM
 */
export function hasClass(element, className) {
    return element.className.split(" ").includes(className);
}

/**
 * Removes a class from an element if it exists
 * @param {HTMLElement} element element
 * @param {string|Array} attrClass class
 * @memberof DOM
 */
export function removeClass(element, attrClass) {
    if (!isHTMLElement(element)) {
        console.error("The given element is not a valid HTML Element");
        return null;
    }

    if (Array.isArray(attrClass)) {
        attrClass.forEach((val) => _removeClass(element, val));
    }

    _removeClass(element, attrClass);

    element.className = formatClass(element.className);

    return element;
}

function _removeClass(el, c) {
    if (hasClass(el, c)) {
        el.className = el.className.replace(c, '');
    }
}

/**
 * Adds one or many classes to an element if it doesn't exist
 * @param {HTMLElement} element Element
 * @param {string|string[]} attrClass classes
 * @returns {HTMLElement} the element
 * @memberof DOM
 */
export function addClass(element, attrClass) {
    if (!isHTMLElement(element)) {
        console.error("The given element is not a valid HTML Element");
        return null;
    }

    var parsedClass = parseClass(attrClass);

    if (isNullOrWhitespace(element.className)) {
        element.className = parsedClass;
    } else if (!hasClass(element, parsedClass)) {
        element.className += " " + parsedClass;
    }

    element.className = formatClass(element.className);

    return element;
}

/**
 * Adds or removes a class from an element depending on the class's presence.
 * @param {HTMLElement} element 
 * @param {string} attrClass ClassName
 * @returns {HTMLElement} the element
 * @memberof DOM
 */
export function toggleClass(element, attrClass) {
    if (hasClass(element, attrClass)) {
        removeClass(element, attrClass);
    } else {
        addClass(element, attrClass);
    }

    return element;
}

/**
 * Sets classes to an element
 * @param {HTMLElement} element 
 * @param {string|string[]} attrClass classes 
 * @returns {HTMLElement} the element
 * @memberof DOM
 */
export function setClass(element, attrClass) {
    if (!isHTMLElement(element)) {
        console.error("The given element is not a valid HTML Element");
        return null;
    }

    element.className = formatClass(parseClass(attrClass));

    return element;
}