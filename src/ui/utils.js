import { isHTMLElement } from "@dom/index.js";

/**
 * Shows an element
 * @param {HTMLElement} element
 */
export function show(element) {
    if (!isHTMLElement(element)) {
        throw new TypeError("Bad argument. The given `element` is not a valid HTMLElement");
    }

    element.style.display = "block";
}

/**
 * Hides an element
 * @param {HTMLElement} element
 */
export function hide(element) {
    if (!isHTMLElement(element)) {
        throw new TypeError("Bad argument. The given `element` is not a valid HTMLElement");
    }

    element.style.display = "none";
}