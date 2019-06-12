import { valOrDefault, isNullOrUndefined } from './../datatype/type-manip.js';
import { isNullOrWhitespace } from './../datatype/type-string.js';

const isClassName = (selector) => /^\.[a-zA-Z0-9_-]+$/.test(selector);

/**
 * Returns the first Element within the specified container that matches the specified selector, group or selectors.
 * @param {string} selector A DOMString containing one or more selectors to match
 * @param {HTMLElement|DocumentFragment} [el] Container queried
 * @returns {HTMLElement|null} The first Element matches that matches the specified set of CSS selectors.
 * @memberof DOM
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
 * @memberof DOM
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
 * @memberof DOM
 */
export function getTemplate(selector, el) {
    return 'content' in document.createElement('template') ? getElement(selector, el) : null;
}

/**
 * Returns a duplicate of the template.
 * @param {HTMLTemplateElement} template 
 * @param {boolean} deep used to decide whether the children of the template should also be clone
 * @returns {DocumentFragment} The template's clone.
 * @memberof DOM
 */
export function cloneTemplate(template, deep) {
    return template ? document.importNode(template.content, valOrDefault(deep, true)) : template;
}

/**
 * Gets the window's width
 * @memberof DOM
 */
export function windowWidth() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}

/**
 * Gets the previous element of the specified one in its parent's children list
 * @param {HTMLElement} el element
 * @returns {(Element|null)} Element or null if the specified element is the first one in the list
 * @memberof DOM
 */
export function getPreviousElementSibling(el) { return getElementSibling(el, "previousElementSibling"); }

/**
 * Gets the element following the specified one in its parent's children list
 * @param {HTMLElement} el element
 * @returns {(Element|null)} Element or null if the specified element is the last one in the list
 * @memberof DOM
 */
export function getNextElementSibling(el) { return getElementSibling(el, "nextElementSibling"); }

/**
 * Inserts a given element before the targetted element
 * @param {HTMLElement} target 
 * @param {HTMLElement} el 
 * @memberof DOM
 */
export function insertBeforeElement(target, el) { target.insertAdjacentElement('beforebegin', el); }

/**
 * Inserts a given element after the targetted element
 * @param {HTMLElement} target 
 * @param {HTMLElement} el 
 * @memberof DOM
 */
export function insertAfterElement(target, el) { target.insertAdjacentElement('afterend', el); }

/**
 * Inserts a givern element as the first children of the targetted element
 * @param {HTMLElement} target 
 * @param {HTMLElement} el 
 * @memberof DOM
 */
export function preprendChild(target, el) { target.insertAdjacentElement('afterbegin', el); }

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
 * Removes additional spaces in class attribute
 * @param {string} cn class names
 */
function cleanClass(cn) { return cn.replace(/\s+/g, ' ').trim(); }

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
 * @param {HTMLElement} el Element
 * @param {string} c classes
 * @memberof DOM
 */
export function addClass(el, c) {
    // If c is an Array => Format c as a space-separated string
    if (Array.isArray(c)) {
        c = c.map(function (c) { return valOrDefault(c.class, c); }).join(' ');
    }

    var strClass = valOrDefault(c.class, c);
    if (isNullOrWhitespace(el.className)) {
        el.className = strClass;
    }
    else if (!hasClass(el, c)) {
        el.className += " " + strClass;
    }

    el.className = cleanClass(el.className);
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

/**
 * Removes all children of a node from the DOM
 * @param {Node} node 
 * @memberof DOM
 */
export function removeChildren(node) {
    while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }
}

/**
 * Gets the previous or next element of the specified element
 * @param {HTMLElement} el element
 * @param {string} dir sibling direction
 * @returns {(Element|null)} Element or null
 * @memberof DOM
 */
export function getElementSibling(el, dir) {
    var sibling = el[dir];

    while (sibling && hasClass(sibling, "autocomplete")) {
        sibling = sibling[dir];
    }

    return sibling;
}

/**
 * Changes the selected option of a `<select>` element
 * @param {HTMLSelectElement} select
 * @param {string} val option value to select
 * @returns {boolean} value indicating whether the option was found and selected
 * @memberof DOM
 */
export function changeSelectValue(select, val) {
    var found = false;
    var options = select.options;
    for (let i = 0; !found && i < options.length; i++) {
        let option = options[i];
        if (option.value == val) {
            option.selected = true;
            found = true;
        }
    }

    return found;
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
 * @returns {boolean} Value indicating whether the object is an *Element*
 * @memberof DOM
 */
export function isHTMLElement(obj) {
    return isNullOrUndefined(obj) ? false : obj.nodeType === 1 && obj instanceof HTMLElement;
}

/**
 * Copy to clipboard
 * @param {HTMLElement|string} value 
 * @returns {boolean} Value indicating whether the the content has been succesfully copied to the clipboard
 */
export function copytoClipboard(value) {
    var el = document.createElement('textarea');
    el.value = isHTMLElement(value) ? value.textContent : value;
    el.readOnly = true;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    el.remove();

    return true;
}

/**
 * Finds an ancestor of an element
 * @param {Element} target 
 * @param {*} callback 
 * @param {number} max 
 * @returns {Element|null}
 * @memberof DOM
 */
export function findAncestor(target, callback, max) {
    if (!isElement(target)) {
        return null;
    }

    var parent = target.parentElement;
    if (max > 0) {
        return findAncestorIter(parent, callback, max);
    }
    return findAncestorInf(parent, callback);
}

function findAncestorInf(target, callback) {
    if (isNullOrUndefined(target)) {
        return null;
    }

    if (callback(target)) {
        return target;
    }

    return findAncestorInf(target.parentElement, callback);
}

function findAncestorIter(target, callback, max) {
    if (isNullOrUndefined(target) || max === 0) {
        return null;
    }

    if (callback(target)) {
        return target;
    }

    return findAncestorIter(target.parentElement, callback, max - 1);
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