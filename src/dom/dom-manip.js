import { createTextArea } from './dom-create.js';
import { isHTMLElement } from './checker.js';

/**
 * Gets the window's width
 * @memberof DOM
 */
export function windowWidth() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}


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
 * Moves an element out of screen
 * @param {HTMLElement} element Element
 * @memberof DOM
 */
export function conceal(element) { 
    Object.assign(element.style, { 
        position: 'absolute', 
        top: '-9999px', 
        left: '-9999px' 
    }); 
    
    return element;
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
 * Copy to clipboard
 * @param {HTMLElement|string} value 
 * @returns {boolean} Value indicating whether the the content has been succesfully copied to the clipboard
 * @memberof DOM
 */
export function copytoClipboard(value) {
    var element = createTextArea({
        value: isHTMLElement(value) ? value.textContent : value,
        readonly: true
    });
    document.body.appendChild(element);
    element.select();
    document.execCommand('copy');
    element.remove();

    return true;
}