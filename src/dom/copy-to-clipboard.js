import { isNullOrUndefined } from '@std/index.js';
import { createTextArea } from './dom-create.js';
import { isHTMLElement } from './dom-parse.js';

/**
 * Copies selected content to clipboard
 * @param {HTMLElement|string} value
 * @returns {boolean} Value indicating whether the content has been succesfully copied to the clipboard
 * @memberof DOM
 */
export function copytoClipboard(value) {
    if (isNullOrUndefined(value)) {
        return false;
    }

    var element = createTextArea({
        value: isHTMLElement(value) ? value.textContent : value.toString(),
        readonly: true
    });

    if(!isHTMLElement(element)) {
        return false;
    }

    document.body.appendChild(element);
    element.select();
    document.execCommand('copy');
    element.remove();

    return true;
}