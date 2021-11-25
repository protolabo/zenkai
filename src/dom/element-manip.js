import { isObject, isNullOrUndefined, isIterable, isNullOrWhitespace, isString } from '@std/index.js';
import { isHTMLElement } from './dom-parse.js';


/**
 * Removes additional spaces in class attribute
 * @param {string} val class attribute's value
 * @returns {string} formatted value
 * @private
 */
const formatClass = (val) => val.replace(/\s+/g, ' ').trim();


/**
 * Add classes to an element
 * @param {HTMLElement} element 
 * @param {string|string[]} value 
 * @private
 * @memberof DOM
 */
function addClass(element, value) {
    if (!isIterable(value)) {
        throw new TypeError("Bad argument: The passed `value` argument is not a string or array");
    }

    if (Array.isArray(value)) {
        element.classList.add(...value);
    } else {
        let formattedValue = formatClass(value);

        if (isNullOrWhitespace(element.className)) {
            element.className = formattedValue;
        } else {
            addClass(element, formattedValue.split(' '));
        }
    }

    return element;
}

/**
 * Assigns a value to an attribute
 * @param {HTMLElement} element 
 * @param {string} key 
 * @param {string} value 
 * @private
 */
function assign(element, key, value) {
    element[key] = value;
}

/**
 * Assigns a value to an attribute
 * @param {HTMLElement} element 
 * @param {string} key 
 * @param {Object} value 
 * @private
 */
function assignObject(element, key, value) {
    Object.assign(element[key], value);
}

/**
 * Assigns a value to an attribute
 * @param {HTMLElement} element 
 * @param {string} key 
 * @param {Object} value 
 * @private
 */
function assignAttribute(element, key, value) {
    element.setAttribute(key, value);
}

const GLOBAL_ATTRIBUTES = "accesskey,autocapitalize,class,dataset,editable,draggable,hidden,id,inputmode,lang,style,tabindex,title";

const AttributeHandler = {
    // Global attributes
    accesskey: [assign, 'accessKey'],
    autocapitalize: [assign, 'autocapitalize'],
    class: [addClass],
    dataset: [assignObject, 'dataset'],
    draggable: [assign, 'draggable'],
    editable: [assign, 'contentEditable'],
    hidden: [assign, 'hidden'],
    id: [assign, 'id'],
    inputmode: [assign, 'inputMode'],
    lang: [assign, 'lang'],
    html: [assign, 'innerHTML'],
    style: [assign, 'style'],
    tabindex: [assign, 'tabIndex'],
    text: [assign, 'textContent'],
    title: [assign, 'title'],
    // Anchor attributes
    download: [assign, 'download'],
    ping: [assign, 'ping'],
    target: [assign, 'target'],
    // Area attributes
    coords: [assign, 'coords'],
    shape: [assign, 'shape'],
    // Audio/Video attributes
    autoplay: [assign, 'autoplay'],
    buffered: [assign, 'buffered'],
    controls: [assign, 'controls'],
    loop: [assign, 'loop'],
    muted: [assign, 'muted'],
    playsinline: [assignAttribute, 'playsinline'],
    poster: [assign, 'poster'],
    preload: [assign, 'preload'],
    // Form attributes
    accept: [assign, 'accept'],
    "accept-charset": [assign, 'acceptCharset'],
    action: [assign, 'action'],
    autocomplete: [assign, 'autocomplete'],
    autofocus: [assign, 'autofocus'],
    capture: [assign, 'capture'],
    checked: [assign, 'checked'],
    cols: [assign, 'cols'],
    disabled: [assign, 'disabled'],
    dirname: [assign, 'dirName'],
    enctype: [assign, 'enctype'],
    for: [assign, 'htmlFor'],
    form: [assign, 'form'],
    formaction: [assign, 'formAction'],
    formenctype: [assign, 'formEnctype'],
    formmethod: [assign, 'formMethod'],
    formnovalidate: [assign, 'formNoValidate'],
    formtarget: [assign, 'formTarget'],
    high: [assign, 'high'],
    label: [assign, 'label'],
    list: [assign, 'list'],
    low: [assign, 'low'],
    max: [assign, 'max'],
    maxlength: [assign, 'maxLength'],
    method: [assign, 'method'],
    min: [assign, 'min'],
    minlength: [assign, 'minLength'],
    multiple: [assign, 'multiple'],
    novalidate: [assign, 'noValidate'],
    optimum: [assign, 'optimum'],
    pattern: [assign, 'pattern'],
    placeholder: [assign, 'placeholder'],
    readonly: [assign, 'readOnly'],
    required: [assign, 'required'],
    rows: [assign, 'rows'],
    selected: [assign, 'selected'],
    size: [assign, 'size'],
    spellcheck: [assignAttribute, 'spellcheck'],
    step: [assign, 'step'],
    wrap: [assign, 'wrap'],
    // Image attributes
    crossorigin: [assign, 'crossOrigin'],
    decoding: [assign, 'decoding'],
    height: [assign, 'height'],
    ismap: [assign, 'isMap'],
    loading: [assign, 'loading'],
    srcset: [assign, 'srcset'],
    width: [assign, 'width'],
    // Link attributes
    alt: [assign, 'alt'],
    as: [assign, 'as'],
    media: [assign, 'media'],
    rel: [assign, 'rel'],
    src: [assign, 'src'],
    sizes: [assign, 'sizes'],
    // List attributes
    reversed: [assign, 'reversed'],
    start: [assign, 'start'],
    // Meta attributes
    charset: [assignAttribute, 'charset'],
    content: [assign, 'content'],
    "http-equiv": [assign, 'httpEquiv'],
    // Object attributes
    data: [assign, 'data'],
    // Quote attributes
    cite: [assign, 'cite'],
    // Table attributes
    abbr: [assign, 'abbr'],
    colspan: [assign, 'colSpan'],
    span: [assign, 'span'],
    rowspan: [assign, 'rowSpan'],
    scope: [assign, 'scope'],
    // Track attributes
    default: [assign, 'default'],
    kind: [assign, 'kind'],
    srclang: [assign, 'srclang'],
    // Mix attributes
    href: [assign, 'href'],
    hreflang: [assign, 'hreflang'],
    datetime: [assign, 'dateTime'],
    name: [assign, 'name'],
    type: [assign, 'type'],
    value: [assign, 'value'],
    usemap: [assign, 'useMap'],
};


/**
 * Sets the attributes of an element
 * @param {!HTMLElement} element element
 * @param {Object} attribute attribute
 * @returns {HTMLElement}
 * @memberof DOM
 */
export function addAttributes(element, attribute, validAttributes) {
    if (!isHTMLElement(element)) {
        throw new TypeError("Bad argument: The given 'element' argument is not a valid HTML Element");
    }

    if (!isObject(attribute)) {
        return element;
    }

    const isValid = (key) => GLOBAL_ATTRIBUTES.includes(key) || isNullOrUndefined(validAttributes) || validAttributes.includes(key);

    for (const key of Object.keys(attribute)) {
        if (isValid(key)) {
            let value = attribute[key];
            let args = AttributeHandler[key].slice(0);
            let fn = args.shift();

            if (!isNullOrUndefined(value)) {
                fn(element, ...args, value);
            }
        }
    }

    return element;
}

/**
 * Changes the selected option of a `<select>` element
 * @param {!HTMLSelectElement} select
 * @param {!string} optValue option value to select
 * @returns {boolean} value indicating whether the option was found and selected
 * @memberof DOM
 */
export function changeSelectedValue(select, optValue) {
    if (!isHTMLElement(select, "select")) {
        throw new TypeError("Bad argument: The given 'select' argument is not a valid HTML Select element");
    }

    if (!(isString(optValue) || isObject(optValue))) {
        throw new TypeError("Bad argument: The given 'optValue' argument is a null or undefined");
    }

    /**
     * Object equality
     * @param {HTMLOptionElement} option 
     * @param {*} obj 
     */
    const objectEq = (option, obj) => option.value === obj.value || option.text === obj.text;

    /**
     * String equality
     * @param {HTMLOptionElement} option 
     * @param {string} obj 
     */
    const stringEq = (option, value) => option.value === value;

    const eqHandler = isString(optValue) ? stringEq : objectEq;

    const { options, multiple } = select;

    for (let i = 0; i < options.length; i++) {
        let option = options[i];

        if (eqHandler(option, optValue)) {
            if (!multiple) {
                Array.from(select.selectedOptions).forEach(opt => opt.selected = false);
            }
            option.selected = true;

            return true;
        }
    }

    return false;
}