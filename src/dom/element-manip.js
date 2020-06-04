import { isObject, isNullOrUndefined } from '@std/index.js';
import { isHTMLElement } from './dom-parse.js';

/**
 * Add classes to an element
 * @param {HTMLElement} element 
 * @param {string|string[]} value 
 */
function addClass(element, value) {
    if (!isHTMLElement(element)) {
        throw new Error("Bad argument: The passed `element` argument is not a valid HTML Element");
    }

    element.classList.add(...(Array.isArray(value) ? value : [value]));

    return element;
}

/**
 * Assigns a value to an attribute
 * @param {HTMLElement} element 
 * @param {string} key 
 * @param {string} value 
 */
function assign(element, key, value) {
    element[key] = value;
}

/**
 * Assigns a value to an attribute
 * @param {HTMLElement} element 
 * @param {string} key 
 * @param {Object} value 
 */
function assignObject(element, key, value) {
    Object.assign(element[key], value);
}

/**
 * Assigns a value to an attribute
 * @param {HTMLElement} element 
 * @param {string} key 
 * @param {Object} value 
 */
function assignAttribute(element, key, value) {
    element.setAttribute(key, value);
}

const GLOBAL_ATTRIBUTES = "accesskey,autocapitalize,class,dataset,editable,draggable,hidden,id,inputmode,lang,html,style,tabindex,text,title";

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
    // Object attributes
    data: [assign, 'data'],
    // Quote attributes
    cite: [assign, 'cite'],
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
    for: [assign, 'for'],
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
    name: [assign, 'name'],
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
    // Track attributes
    default: [assign, 'default'],
    kind: [assign, 'kind'],
    srclang: [assign, 'srclang'],
    // Table attributes
    abbr: [assign, 'abbr'],
    colspan: [assign, 'colSpan'],
    span: [assign, 'span'],
    rowspan: [assign, 'rowSpan'],
    scope: [assign, 'scope'],
    // Mix attributes
    href: [assign, 'href'],
    hreflang: [assign, 'hreflang'],
    datetime: [assign, 'dateTime'],
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
export function addAttributes(element, attribute, validAttributes = "") {
    if (!isHTMLElement(element)) {
        throw new Error("Bad argument: The given element argument is not a valid HTML Element");
    }

    if (!isObject(attribute)) {
        return element;
    }

    const isValid = (key) => GLOBAL_ATTRIBUTES.includes(key) || validAttributes.includes(key);

    // HTML attributes
    for (const key of Object.keys(attribute)) {
        if (isValid(key)) {
            let value = attribute[key];
            let args = AttributeHandler[key].slice(0);
            let fn = args.shift();
            fn(element, ...args, value);
        }
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
        throw new Error("Bad argument: The given select argument is not a valid HTML Select element");
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