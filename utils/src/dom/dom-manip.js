/** @module dom/manip */

import { valOrDefault } from './../datatype/type-manip.js';
import { isNullOrWhitespace } from './../datatype/type-string.js';

const isClassName = (selector) => /^\.[a-zA-Z0-9_-]+$/.test(selector);

/**
 * Returns the first Element within the specified container that matches the specified selector, group or selectors.
 * @param {string} selector A DOMString containing one or more selectors to match
 * @param {HTMLElement|DocumentFragment} [el] Container queried
 * @returns {HTMLElement|null} The first Element matches that matches the specified set of CSS selectors.
 */
export function getElement(selector, el) {
    el = valOrDefault(el, document);

    if (el instanceof DocumentFragment) {
        el.querySelector(selector);
    }

    if (/^#[a-zA-Z0-9_-]+$/.test(selector)) {
        return document.getElementById(selector.substring(1));
    }
    if (isClassName(selector)) {
        return el.getElementsByClassName(selector.substring(1))[0];
    }

    return el.querySelector(selector);
}

/**
 * Returns all elements that match the selector query.
 * @param {string} selector A DOMString containing one or more selectors to match
 * @param {HTMLElement|DocumentFragment} [el] Container queried
 * @returns {HTMLCollection|NodeList} A live or *static* (not live) collection of the `container`'s children Element that match the `selector`.
 */
export function getElements(selector, el) {
    el = valOrDefault(el, document);

    if (el instanceof DocumentFragment) {
        el.querySelectorAll(selector);
    }

    return isClassName(selector) ?
        el.getElementsByClassName(selector.substring(1)) :
        el.querySelectorAll(selector);
}

/**
 * Returns the first Template within the specified container that matches the specified selector, group or selectors.
 * @param {string} selector A DOMString containing one or more selectors to match
 * @param {HTMLElement} [el] Container queried
 * @returns {HTMLTemplateElement|null} The first Template matches that matches the specified set of CSS selectors.
 */
export function getTemplate(selector, el) {
    return 'content' in document.createElement('template') ? getElement(selector, el) : null;
}

/**
 * Returns a duplicate of the template.
 * @param {HTMLTemplateElement} template 
 * @param {boolean} deep used to decide whether the children of the template should also be clone
 * @returns {HTMLElement} The template's clone.
 */
export function cloneTemplate(template, deep) {
    return template ? document.importNode(template.content, valOrDefault(deep, true)) : template;
}

/**
 * Gets the window's width
 */
export function windowWidth() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}

/**
 * Gets the previous element of the specified one in its parent's children list
 * @param {HTMLElement} el element
 * @returns {(Element|null)} Element or null if the specified element is the first one in the list
 */
export function getPreviousElementSibling(el) { return getElementSibling(el, "previousElementSibling"); }

/**
 * Gets the element following the specified one in its parent's children list
 * @param {HTMLElement} el element
 * @returns {(Element|null)} Element or null if the specified element is the last one in the list
 */
export function getNextElementSibling(el) { return getElementSibling(el, "nextElementSibling"); }

/**
 * Inserts a given element before the targetted element
 * @param {HTMLElement} target 
 * @param {HTMLElement} el 
 */
export function insertBeforeElement(target, el) { target.insertAdjacentElement('beforebegin', el); }

/**
 * Inserts a given element after the targetted element
 * @param {HTMLElement} target 
 * @param {HTMLElement} el 
 */
export function insertAfterElement(target, el) { target.insertAdjacentElement('afterend', el); }

/**
 * Inserts a givern element as the first children of the targetted element
 * @param {HTMLElement} target 
 * @param {HTMLElement} el 
 */
export function preprendChild(target, el) { target.insertAdjacentElement('afterbegin', el); }

/**
 * Verifies that an element has a class
 * @param {HTMLElement} e element
 * @param {string} c class
 */
export function hasClass(e, c) {
    var classes = e.className.split(" ");
    for (let i = 0, len = classes.length; i < len; i++) {
        if (c == classes[i])
            return true;
    }
    return false;
}

/**
 * Removes a class from an element if it exists
 * @param {HTMLElement} e element
 * @param {string} c class
 */
export function removeClass(e, c) {
    if (hasClass(e, c)) {
        var classes = e.className.split(" ");
        var classes2 = "";
        for (let i = 0, len = classes.length; i < len; i++) {
            if (c != classes[i])
                classes2 += " " + classes[i];
        }
        e.className = classes2.trim();
    }
}

/**
 * Adds one or many classes to an element if it doesn't exist
 * @param {HTMLElement} el Element
 * @param {string} c classes
 */
export function addClass(el, c) {
    // If c is an Array => Format c as a space-separated string
    if (Array.isArray(c)) {
        c = c.map(function (c) { return valOrDefault(c.class, c); }).join(' ');
    }
    var strClass = valOrDefault(c.class, c);

    if (isNullOrWhitespace(el.className))
        el.className = strClass;
    else if (!hasClass(el, c))
        el.className += " " + strClass;
}

/**
 * Adds or removes a class from an element depending on the class's presence.
 * @param {HTMLElement} el 
 * @param {string} c ClassName
 */
export function toggleClass(el, c) {
    if (hasClass(el, c))
        removeClass(el, c);
    else
        addClass(el, c);
}

/**
 * Removes all children of a node from the DOM
 * @param {Node} node 
 */
export function removeChildren(node) {
    while (node.hasChildNodes())
        node.removeChild(node.lastChild);
}

/**
 * Gets the previous or next element of the specified element
 * @param {HTMLElement} el element
 * @param {string} dir sibling direction
 * @returns {(Element|null)} Element or null
 */
export function getElementSibling(el, dir) {
    var sibling = el[dir];

    while (sibling && hasClass(sibling, "autocomplete")) {
        sibling = sibling[dir];
    }

    return sibling;
}

/**
 * Changes the selected option of a <select> element
 * @param {HTMLSelectElement} select
 * @param {string} val option value to select
 * @returns {boolean} value indicating whether the option was found and selected
 */
export function changeSelectValue(select, val) {
    var found = false;
    for (let i = 0, len = select.options.length; !found && i < len; i++) {
        let option = select.options[i];
        if (option.value == val) {
            option.selected = true;
            found = true;
        }
    }
    return found;
}

function stickyHeader(header, target) {
    const css_sticky = 'sticky';
    var sticky = target.offsetTop + target.clientHeight;
    var timeout;
    window.addEventListener('scroll', function (e) {
        if (timeout) window.cancelAnimationFrame(timeout);
        timeout = window.requestAnimationFrame(function () {
            if (window.pageYOffset >= sticky)
                addClass(header, css_sticky);
            else
                removeClass(header, css_sticky);
        });
    }, false);
}