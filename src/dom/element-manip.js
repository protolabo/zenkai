import { isObject, isNullOrUndefined } from '@std/index.js';
import { isHTMLElement } from './dom-parse.js';
import { setClass } from './element-class-manip.js';

/* istanbul ignore next */
function echo(o) { }


/**
 * Sets the attributes of an element
 * @param {!HTMLElement} element element
 * @param {Object} attribute attribute
 * @returns {HTMLElement}
 * @memberof DOM
 */
export function addAttributes(element, attribute) {
    if (!isHTMLElement(element)) {
        throw new Error("The given element parameter is not a valid HTML Element");
    }

    if (!isObject(attribute)) {
        return element;
    }

    const ATTR_MAP = {
        // Global attributes
        accesskey: [assign, 'accessKey'],
        class: [setClass, element],
        data: [Object.assign, element.dataset],
        editable: [assign, 'contentEditable'],
        draggable: [assign],
        hidden: [assign],
        id: [assign],
        lang: [assign],
        html: [assign, 'innerHTML'],
        style: [assign],
        target: [assign],
        tabindex: [assign, 'tabIndex'],
        text: [assign, 'textContent'],
        title: [assign],
        // Quote attributes
        cite: [assign],
        // Anchor attributes
        href: [assign],
        // Link attributes
        alt: [assign],
        src: [assign],
        // Form attributes
        accept: [assign],
        disabled: [assign],
        placeholder: [assign],
        readonly: [assign, 'readOnly'],
        value: [assign],
    };
    const DEFAULT_MAP = [echo, ''];

    // HTML attributes
    for (const key of Object.keys(attribute)) {
        var val = ATTR_MAP[key] || DEFAULT_MAP;
        val[0](val[1] || key, attribute[key]);
    }

    function assign(key, val) {
        element[key] = val;
    }

    return element;
}

/**
 * Changes the selected option of a `<select>` element
 * @param {!HTMLSelectElement} select
 * @param {string} value option value to select
 * @returns {boolean} value indicating whether the option was found and selected
 * @memberof DOM
 */
export function changeSelectValue(select, value) {
    if (!isHTMLElement(select, "select")) {
        throw new Error("The given select parameter is not a valid HTML Select element");
    }

    if (isNullOrUndefined(value)) {
        throw new Error("The given value parameter is a null or undefined");
    }

    var options = select.options;
    for (let i = 0; i < options.length; i++) {
        let option = options[i];

        if (option.value === value.toString()) {
            option.selected = true;
            return true;
        }
    }

    return false;
}