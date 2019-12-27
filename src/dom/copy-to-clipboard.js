import { createTextArea } from './dom-create.js';
import { isHTMLElement } from './checker.js';

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