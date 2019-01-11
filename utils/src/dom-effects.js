import { DOMUtils as $ } from './dom-utils.js';

const Elements = ['BUTTON', 'COMMAND', 'FIELDSET', 'INPUT', 'KEYGEN', 'OPTGROUP', 'OPTION', 'SELECT', 'TEXTAREA'];

const UI = {
    COLLAPSE: 'collapse',
    CHECKED: 'checked',
    DISABLED: 'disabled',
    EMPTY: 'empty',
    HIDDEN: 'hidden',
    SELECTED: 'selected',
}

/**
 * Shows an element
 * @param {Element} el Element
 */
export const show = function (el) { $.removeClass(el, UI.HIDDEN); };

/**
 * Hides an element
 * @param {Element} el element
 */
export const hide = function (el) { $.addClass(el, UI.HIDDEN); };

/**
 * Moves an element out of screen
 * @param {HTMLElement} el Element
 */
export const fakeHide = function (el) { return Object.assign(el, { position: 'absolute', top: '-9999px', left: '-9999px' }); };

/**
 * Applies highlighting style to an element
 * @param {HTMLElement} el Element
 */
export const highlight = function (el) { $.addClass(el, UI.SELECTED); };

/**
 * Removes highlighting style of an element
 * @param {HTMLElement} el Element
 */
export const unhighlight = function (el) { $.removeClass(el, UI.SELECTED); };

/**
 * Enable an element
 * @param {HTMLElement} el Element
 */
export const enable = function (el, val) {
    if (Elements.indexOf(el.tagName) !== -1) {
        el.disabled = val === false;
    }

    el.dataset.disabled = val === false;
};

/**
 * Disable an element
 * @param {HTMLElement} el 
 */
export const disable = function (el, val) {
    if (Elements.indexOf(el.tagName) !== -1) {
        el.disabled = val !== false;
    }

    el.dataset.disabled = val !== false;
};
