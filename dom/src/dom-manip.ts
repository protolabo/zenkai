import { isObject, isNullOrUndefined, isIterable, isNullOrWhitespace, isString } from "@protolabo/zenjs";
import { isHTMLElement } from './dom-parse';

/**
 * Attribute value type
 */
type AttributeValue = string | number | boolean | Record<string, any> | string[];

/**
 * Attributes object type
 */
type Attributes = Record<string, AttributeValue>;

/**
 * Removes additional spaces in class attribute
 * @param val - class attribute's value
 * @returns formatted value
 * @private
 */
const formatClass = (val: string): string => val.replace(/\s+/g, ' ').trim();

/**
 * Add classes to an element
 * @param element - Element to add classes to
 * @param value - Class name(s) to add
 * @returns The element (for chaining)
 * @private
 */
function addClass(element: HTMLElement, value: string | string[]): HTMLElement {
    if (!isIterable(value)) {
        throw new TypeError("addClass: value must be a string or array");
    }

    if (Array.isArray(value)) {
        element.classList.add(...value);
    } else {
        const formattedValue = formatClass(value);

        if (isNullOrWhitespace(element.className)) {
            element.className = formattedValue;
        } else {
            addClass(element, formattedValue.split(' '));
        }
    }

    return element;
}

/**
 * Assigns a value to an element property
 * @param element - Element
 * @param key - Property name
 * @param value - Value to assign
 * @private
 */
function assign(element: HTMLElement, key: string, value: any): void {
    (element as any)[key] = value;
}

/**
 * Assigns an object to an element property
 * @param element - Element
 * @param key - Property name
 * @param value - Object to assign
 * @private
 */
function assignObject(element: HTMLElement, key: string, value: Record<string, any>): void {
    Object.assign((element as any)[key], value);
}

/**
 * Sets an attribute using setAttribute
 * @param element - Element
 * @param key - Attribute name
 * @param value - Attribute value
 * @private
 */
function assignAttribute(element: HTMLElement, key: string, value: string): void {
    element.setAttribute(key, value);
}

/**
 * Global HTML attributes that are valid for all elements
 * @private
 */
const GLOBAL_ATTRIBUTES = "accesskey,autocapitalize,class,dataset,editable,draggable,hidden,id,inputmode,lang,style,tabindex,title";

/**
 * Attribute handler function type
 */
type AttributeHandler = [(element: HTMLElement, ...args: any[]) => void, ...string[]];

/**
 * Attribute handlers mapping
 * Maps attribute names to [handler function, property name (if different)]
 * @private
 */
const AttributeHandler: Record<string, AttributeHandler> = {
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
 * @param element - Element to add attributes to
 * @param attribute - Object containing attribute key-value pairs
 * @param validAttributes - Comma-separated string or array of valid attribute names (optional)
 * @returns The element (for chaining)
 * @memberof DOM
 */
export function addAttributes(
    element: HTMLElement, 
    attribute: Attributes, 
    validAttributes?: string | string[]
): HTMLElement {
    if (!isHTMLElement(element)) {
        throw new TypeError("addAttributes: element must be a valid HTML Element");
    }

    if (!isObject(attribute)) {
        return element;
    }

    // Convert validAttributes to array if it's a string
    const validAttrs = typeof validAttributes === 'string' 
        ? validAttributes.split(',')
        : validAttributes;

    const isValid = (key: string): boolean => 
        GLOBAL_ATTRIBUTES.includes(key) || 
        isNullOrUndefined(validAttrs) || 
        validAttrs.includes(key);

    for (const key of Object.keys(attribute)) {
        if (isValid(key)) {
            const value = attribute[key];
            const handler = AttributeHandler[key];

            if (!handler) {
                // If no handler defined, use setAttribute
                if (!isNullOrUndefined(value)) {
                    element.setAttribute(key, String(value));
                }
                continue;
            }

            const args = handler.slice(0) as [Function, ...string[]];
            const fn = args.shift() as Function;

            if (!isNullOrUndefined(value)) {
                fn(element, ...args, value);
            }
        }
    }

    return element;
}

/**
 * Object equality comparison for options
 * @param option - Option element
 * @param obj - Object to compare
 * @returns boolean indicating equality
 * @private
 */
const objectEq = (option: HTMLOptionElement, obj: { value?: string; text?: string }): boolean => 
    option.value === obj.value || option.text === obj.text;

/**
 * String equality comparison for options
 * @param option - Option element
 * @param value - String to compare
 * @returns boolean indicating equality
 * @private
 */
const stringEq = (option: HTMLOptionElement, value: string): boolean => 
    option.value === value;

/**
 * Changes the selected option of a <select> element
 * @param select - Select element
 * @param optValue - Option value to select (string or object with value/text)
 * @returns boolean indicating whether the option was found and selected
 * @memberof DOM
 */
export function changeSelectedValue(
    select: HTMLSelectElement, 
    optValue: string | { value?: string; text?: string }
): boolean {
    if (!isHTMLElement(select, 'select')) {
        throw new TypeError("changeSelectedValue: select must be a valid HTML Select element");
    }

    if (!(isString(optValue) || isObject(optValue))) {
        throw new TypeError("changeSelectedValue: optValue must be a string or object");
    }

    const eqHandler = isString(optValue) ? stringEq : objectEq;
    const { options, multiple } = select;

    for (let i = 0; i < options.length; i++) {
        const option = options[i];

        if (eqHandler(option, optValue as any)) {
            if (!multiple) {
                Array.from(select.selectedOptions).forEach(opt => opt.selected = false);
            }
            option.selected = true;

            return true;
        }
    }

    return false;
}
