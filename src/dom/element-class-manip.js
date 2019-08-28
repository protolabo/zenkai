import { valOrDefault, isNullOrWhitespace } from '@datatype/index.js';

/**
 * Removes additional spaces in class attribute
 * @private
 */
const cleanClass = (cn) => cn.replace(/\s+/g, ' ').trim();

/**
 * Verifies that an element has a class
 * @param {HTMLElement} e element
 * @param {string} c class
 * @memberof DOM
 */
export function hasClass(e, c) {
    return e.className.split(" ").indexOf(c) !== -1;
}

/**
 * Removes a class from an element if it exists
 * @param {HTMLElement} el element
 * @param {string|Array} c class
 * @memberof DOM
 */
export function removeClass(el, c) {
    if (Array.isArray(c)) {
        c.forEach((val) => _removeClass(el, val));
    }

    _removeClass(el, c);

    el.className = cleanClass(el.className);
}

function _removeClass(e, c) {
    if (hasClass(e, c)) {
        e.className = e.className.replace(c, '');
    }
}

/**
 * Adds one or many classes to an element if it doesn't exist
 * @param {HTMLElement} element Element
 * @param {string} c classes
 * @memberof DOM
 */
export function addClass(element, c) {
    // If c is an Array => Format c as a space-separated string
    if (Array.isArray(c)) {
        c = c.map(function (c) { return valOrDefault(c.class, c); }).join(' ');
    }

    var strClass = valOrDefault(c.class, c);
    if (isNullOrWhitespace(element.className)) {
        element.className = strClass;
    }
    else if (!hasClass(element, c)) {
        element.className += " " + strClass;
    }

    element.className = cleanClass(element.className);
}

/**
 * Adds or removes a class from an element depending on the class's presence.
 * @param {HTMLElement} el 
 * @param {string} c ClassName
 * @memberof DOM
 */
export function toggleClass(el, c) {
    if (hasClass(el, c)) {
        removeClass(el, c);
    } else {
        addClass(el, c);
    }
}