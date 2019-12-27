import { setClass } from './element-class-manip.js';

/* istanbul ignore next */
function echo(o) { }

/**
 * Sets the attributes of an element
 * @param {HTMLElement} element element
 * @param {Object} attribute attribute
 * @returns {HTMLElement}
 * @memberof DOM
 */
export function addAttributes(element, attribute) {
    const ATTR_MAP = {
        // Global attributes
        accesskey: [assign, 'accessKey'],
        class: [setClass, element],
        data: [Object.assign, element.dataset],
        editable: [assign, 'contenteditable'],
        draggable: [assign],
        hidden: [assign],
        id: [assign],
        lang: [assign],
        html: [assign, 'innerHTML'],
        style: [assign],
        tabindex: [assign, 'tabIndex'],
        title: [assign],
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
