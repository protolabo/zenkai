import { isNullOrUndefined } from '@std/index.js';
import { isHTMLElement } from './dom-parse.js';

/**
 * Copies selected content to clipboard
 * @param {HTMLElement|string} value
 * @returns {boolean} Value indicating whether the content has been succesfully copied to the clipboard
 * @memberof DOM
 */
export function copyToClipboard(value) {
    if (isNullOrUndefined(value)) {
        return false;
    }

    let text = isHTMLElement(value) ? value.textContent : value.toString();
    
    navigator.clipboard.writeText(text)
    .then(() => {
        console.log('Text copied to clipboard successfully:', text);
    })
    .catch(err => {
        console.error('Unable to copy text to clipboard:', err);
    });

    return true;
}