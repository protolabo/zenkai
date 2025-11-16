import { isNullOrUndefined, isString, isIterable, hasOwn, pascalCase, isEmpty, isCollection, isUndefined } from '@protolabo/zenjs';

/**
 * Checks if object is an Element node
 * @private
 */
const isElementNode = (obj: any): boolean =>
    !isNullOrUndefined(obj) && obj.nodeType === Node.ELEMENT_NODE;

/**
 * Checks if object is a DocumentFragment node
 * @private
 */
const isDocumentFragmentNode = (obj: any): boolean =>
    !isNullOrUndefined(obj) && obj.nodeType === Node.DOCUMENT_FRAGMENT_NODE;

/**
 * Verifies that an object is a Node
 * @param obj - Object to check
 * @returns Value indicating whether the object is a Node
 */
export function isNode(obj: any): obj is Node {
    return obj instanceof Node;
}

/**
 * Verifies that an object is a NodeList
 * @param obj - Object to check
 * @returns Value indicating whether the object is a NodeList
 */
export function isNodeList(obj: any): obj is NodeList {
    return obj instanceof NodeList;
}

/**
 * Verifies that an object is an Element
 * @param obj - Object to check
 * @returns Value indicating whether the object is an Element
 */
export function isElement(obj: any): obj is Element {
    return isElementNode(obj) && obj instanceof Element;
}

/**
 * Tag name to HTML interface mapping
 * @private
 */
const TagNameMapping: Record<string, string> = {
    'a': "Anchor",
    'br': "BR",
    'dl': "DList",
    'datalist': "DataList",
    'fieldset': "FieldSet",
    'frameset': "FrameSet",
    'hr': "HR",
    'h1': "Heading",
    'h2': "Heading",
    'h3': "Heading",
    'h4': "Heading",
    'h5': "Heading",
    'h6': "Heading",
    'li': "LI",
    'ol': "OList",
    'optgroup': "OptGroup",
    'p': "Paragraph",
    'q': "Quote",
    'blockquote': "Quote",
    'caption': "TableCaption",
    'td': "TableCell",
    'th': "TableCell",
    'col': "TableCol",
    'tr': "TableRow",
    'tbody': "TableSection",
    'thead': "TableSection",
    'tfoot': "TableSection",
    'textarea': "TextArea",
    'ul': "UList",
};

/**
 * Element kind specification type
 */

type ElementKindTuple = [string, string | string[]];
type ElementKind = string | ElementKindTuple;

// runtime guard: is this a single tuple-kind like ["input", "text"]?
function isKindTuple(x: unknown): x is ElementKindTuple {
    return Array.isArray(x)
        && x.length === 2
        && typeof x[0] === "string"
        && (typeof x[1] === "string" || Array.isArray(x[1]));
}

/** Normalize to an array of ElementKind (never confuses tuple-kind with array-of-kinds) */
function toKindArray(kind?: ElementKind | readonly ElementKind[]): ElementKind[] {
    if (kind === undefined) return [];
    if (Array.isArray(kind) && !isKindTuple(kind)) {
        // This is an array-of-kinds (e.g., ["div", ["input", "text"]])
        return kind as ElementKind[];
    }
    // Single kind (string or tuple-kind)
    return [kind as ElementKind];
}

/**
 * Verifies that an object is an HTML Element
 * @param obj - Object to check
 * @param kind - Optional tag name or [tag, type] to check
 * @returns Value indicating whether the object is an HTMLElement
 */
export function isHTMLElement(obj: any, kind?: ElementKind | ElementKind[]): obj is HTMLElement {
    if (!(isElementNode(obj) && obj instanceof HTMLElement)) {
        return false;
    }

    if (!isUndefined(kind)) {
        const kinds = toKindArray(kind);
        return isHTMLElementKind(obj, kinds);
    }

    return true;
}

/**
 * Verifies the tag of an HTML Element
 * @param element - Element to check
 * @param kinds - Array of element kinds to match
 * @returns boolean indicating if element matches any kind
 * @private
 */
function isHTMLElementKind(element: HTMLElement, kinds: ElementKind[]): boolean {
    const isInstanceOf = (obj: any): boolean => element instanceof obj;
    const hasTag = (tag: string): boolean => element.tagName === tag.toUpperCase();
    const isOfType = (type: string | string[]): boolean =>
        Array.isArray(type) ? type.includes((element as any).type) : (element as any).type === type;

    return kinds.some((kind) => {
        if (!isIterable(kind)) {
            return false;
        }

        let name: string = kind as string;
        let type: string | string[] | null = null;

        if (Array.isArray(kind)) {
            [name, type] = kind;
        }

        name = name.toLowerCase();
        const interfaceName = `HTML${hasOwn(TagNameMapping, name) ? TagNameMapping[name] : pascalCase(name)}Element`;

        if (!(isInstanceOf((window as any)[interfaceName]) || hasTag(name))) {
            return false;
        }

        if (isCollection(type) && !isEmpty(type as any)) {
            return isOfType(type);
        }

        return true;
    });
}

/**
 * Verifies that an object is an HTMLCollection
 * @param obj - Object to check
 * @returns Value indicating whether the object is an HTMLCollection
 */
export function isHTMLCollection(obj: any): obj is HTMLCollection {
    return obj instanceof HTMLCollection;
}

/**
 * Verifies that an object is a DocumentFragment
 * @param obj - Object to check
 * @returns Value indicating whether the object is a DocumentFragment
 */
export function isDocumentFragment(obj: any): obj is DocumentFragment {
    return isDocumentFragmentNode(obj) && obj instanceof DocumentFragment;
}

/**
 * Converts an html string to an HTML Element or a list of HTML Elements
 * @param prop - Property to access on template content
 * @param html - HTML string
 * @returns Node or NodeList
 * @private
 */
function _htmlToElement(prop: 'firstChild' | 'childNodes', html: string): Node | NodeList | null {
    if (!isString(html)) {
        return null;
    }

    const template = document.createElement('template');
    template.innerHTML = html.trim();

    return template.content[prop];
}

/**
 * Converts an html string to an HTML Element
 * @param html - HTML string
 * @returns Node or null
 */
export function htmlToElement(html: string): Node | null {
    return _htmlToElement('firstChild', html) as Node | null;
}

/**
 * Converts an html string to a list of HTML Elements
 * @param html - HTML string
 * @returns NodeList or null
 */
export function htmlToElements(html: string): NodeList | null {
    return _htmlToElement('childNodes', html) as NodeList | null;
}
