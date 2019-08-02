import { disable } from './dom-effects.js';
import { isString, valOrDefault } from '@datatype/type-manip.js';

/**
 * Creates an element
 * @param {string} tagName 
 * @param {object} _attribute 
 * @returns {HTMLElement}
 * @private
 */
function create(tagName, _attribute) {
    var element = document.createElement(tagName);
    if (_attribute) {
        addAttributes(element, _attribute);
    }
    return element;
}

/**
 * Creates the element for the specified tagName
 * @param {string} tagName element
 * @returns {HTMLElement}
 * @memberof DOM
 */
export function createElement(tagName, eId, eClass) {
    var el = create(tagName);

    if (eId) {
        el.id = eId;
    }
    if (eClass) {
        setClass(el, eClass);
    }

    return el;
}

/**
 * Creates a document fragment
 * @function
 * @returns {DocumentFragment}
 * @memberof DOM
 */
export const createDocFragment = () => document.createDocumentFragment();

/**
 * Creates a text node
 * @function
 * @param {string} text
 * @returns {Text}
 * @memberof DOM
 */
export const createTextNode = (text) => document.createTextNode(text);

/**
 * Creates a `<link>` element with some attributes
 * @param {string} rel 
 * @param {string} href 
 * @param {object} attr 
 * @memberof DOM
 */
export function createLink(rel, href, attr) {
    var link = create("link");
    if (rel) {
        link.rel = rel;
    }
    if (href) {
        link.href = href;
    }
    if (attr) {
        addAttributes(link, attr);
    }

    return link;
}

//#region Content sectionning

/**
 * Creates a `<header>` element with some attributes
 * @function
 * @param {object} [attribute] 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createHeader = create.bind(null, 'header');

/**
 * Creates an `<footer>` element with some attributes
 * @function
 * @param {Object} [attribute] attributes
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createFooter = create.bind(null, 'footer');

/**
 * Creates an `<main>` element with some attributes
 * @function
 * @param {Object} [attribute] attributes
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createMain = create.bind(null, 'main');

/**
 * Creates an `<article>` element with some attributes
 * @function
 * @param {Object} [attribute] attributes
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createArticle = create.bind(null, 'article');

/**
 * Creates an `<section>` element with some attributes
 * @function
 * @param {Object} [attribute] attributes
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createSection = create.bind(null, 'section');

/**
 * Creates an `<nav>` element with some attributes
 * @function
 * @param {Object} [attribute] attributes
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createNav = create.bind(null, 'nav');

/**
 * Creates an `<aside>` element with some attributes
 * @function
 * @param {Object} [attribute] attributes
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createAside = create.bind(null, 'aside');

/**
 * Creates a `<h1>` element with some attributes
 * @function
 * @param {Object} [attribute] attributes
 * @returns {HTMLHeadingElement}
 * @memberof DOM
 */
export const createH1 = create.bind(null, 'h1');

/**
 * Creates a `<h2>` element with some attributes
 * @function
 * @param {Object} [attribute] attributes
 * @returns {HTMLHeadingElement}
 * @memberof DOM
 */
export const createH2 = create.bind(null, 'h2');

/**
 * Creates a `<h3>` element with some attributes
 * @function
 * @param {Object} [attribute] attributes
 * @returns {HTMLHeadingElement}
 * @memberof DOM
 */
export const createH3 = create.bind(null, 'h3');

/**
 * Creates a `<h4>` element with some attributes
 * @function
 * @param {Object} [attribute] attributes
 * @returns {HTMLHeadingElement}
 * @memberof DOM
 */
export const createH4 = create.bind(null, 'h4');

/**
 * Creates a `<h5>` element with some attributes
 * @function
 * @param {Object} [attribute] attributes
 * @returns {HTMLHeadingElement}
 * @memberof DOM
 */
export const createH5 = create.bind(null, 'h5');

/**
 * Creates a `<h6>` element with some attributes
 * @function
 * @param {Object} [attribute] attributes
 * @returns {HTMLHeadingElement}
 * @memberof DOM
 */
export const createH6 = create.bind(null, 'h6');

//#endregion

/**
 * Creates a `<div>` element with some attributes
 * @function
 * @param {Object} [attribute] attributes
 * @returns {HTMLDivElement}
 * @memberof DOM
 */
export const createDiv = create.bind(null, 'div');

/**
 * Creates a `br` element \
 * Line break (carriage-return)
 * @function
 * @memberof DOM
 */
export const createLineBreak = () => create('br');

/**
 * Creates a `hr` element \
 * Thematic break
 * @function
 * @memberof DOM
 */
export const createThematicBreak = () => create('hr');

/**
 * Creates a `<p>` element with some attributes
 * @param {Object} [attr] attributes
 * @returns {HTMLParagraphElement}
 * @memberof DOM
 */
export const createP = create.bind(null, 'p');

/**
 * Creates a `<ul>` element with some attributes
 * @param {Object} [attr] attributes
 * @returns {HTMLUListElement}
 * @memberof DOM
 */
export const createUl = create.bind(null, 'ul');

/**
 * Creates a `<ol>` element with some attributes
 * @param {Object} [attr] attributes
 * @returns {HTMLUListElement}
 * @memberof DOM
 */
export const createOl = create.bind(null, 'ol');

/**
 * Creates a `<li>` element with some attributes
 * @param {Object} [attr] attributes
 * @memberof DOM
 */
export const createLi = create.bind(null, 'li');

// Inline Element

/**
 * Creates an `<a>` element with some attributes
 * @param {string} href URL or a URL fragment that the hyperlink points to
 * @param {Object} [attr] attributes
 * @returns {HTMLAnchorElement}
 * @memberof DOM
 */
export function createAnchor(href, attr) {
    var a = create('a', attr);
    if (href) {
        a.href = href;
    }

    return a;
}

/**
  * Creates a `<img>` element with some attributes
  * @param {string} src
  * @param {string} alt
  * @param {Object} [attr] attributes
  * @returns {HTMLImageElement}
  * @memberof DOM
  */
export function createImage(src, alt, attr) {
    var img = create('img', attr);

    if (src) {
        img.src = src;
    }
    if (alt) {
        img.alt = alt;
    }

    return img;
}

/**
  * Creates a `<img>` element with some attributes
  * @param {string} src
  * @param {string} alt
  * @param {Object} [attr] attributes
  * @returns {HTMLAudioElement}
  * @memberof DOM
  */
export function createAudio(src, alt, attr) {
    var img = create('audio', attr);

    if (src) {
        img.src = src;
    }
    if (alt) {
        img.alt = alt;
    }

    return img;
}

/**
  * Creates a `<video>` element with some attributes
  * @param {string} src
  * @param {string} alt
  * @param {Object} [attr] attributes
  * @returns {HTMLVideoElement}
  * @memberof DOM
  */
export function createVideo(src, alt, attr) {
    var img = create('video', attr);

    if (src) {
        img.src = src;
    }
    if (alt) {
        img.alt = alt;
    }

    return img;
}

/**
 * Creates a `<span>` element with some attributes
 * @function
 * @param {Object} [attr] attributes
 * @returns {HTMLSpanElement}
 * @memberof DOM
 */
export const createSpan = create.bind(null, "span");

/**
 * Creates a `<strong>` element with some attributes
 * @function
 * @param {Object} [attr] attributes
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createStrong = create.bind(null, "strong");

/**
 * Creates a `<em>` element with some attributes
 * @function
 * @param {Object} [attr] attributes
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createEm = create.bind(null, "em");

//#region Form-associated Element

/**
 * Creates a `<form>` element with some attributes
 * @function
 * @param {Object} [attr] attributes
 * @returns {HTMLLabelElement}
 * @memberof DOM
 */
export const createForm = create.bind(null, 'form');

/**
 * Creates a `<input>` element with some attributes
 * @param {Object} [attr] attributes
 * @returns {HTMLInputElement}
 * @memberof DOM
 */
export function createInput(type, attr) {
    var input = create('input', attr);
    input.type = valOrDefault(type, "text");

    return input;
}

["button", "checkbox", "color", "date", "datetime-local", "email", "file", "hidden", "image", "month", "number", "password", "radio", "range", "reset", "search", "submit", "tel", "text", "time", "url", "week"].forEach(function (type) {
    createInput[type] = createInput.bind(null, type);
});

/**
 * Creates a `<label>` element with some attributes
 * @function
 * @param {Object} [attr] attributes
 * @returns {HTMLLabelElement}
 * @memberof DOM
 */
export const createLabel = create.bind(null, 'label');

/**
 * Creates a `<fieldset>` element with some attributes
 * @function
 * @param {Object} [attr] attributes
 * @returns {HTMLLabelElement}
 * @memberof DOM
 */
export const createFieldset = create.bind(null, 'fieldset');

/**
 * Creates a `<legend>` element with some attributes
 * @function
 * @param {Object} [attr] attributes
 * @returns {HTMLLabelElement}
 * @memberof DOM
 */
export const createLegend = create.bind(null, 'legend');

/**
 * Creates a `<datalist>` element with some attributes
 * @function
 * @param {Object} [attr] attributes
 * @returns {HTMLTextAreaElement}
 * @memberof DOM
 */
export const createDataList = create.bind(null, 'datalist');

/**
 * Creates a `<select>` element with some attributes
 * @function
 * @param {Object} [attr] attributes
 * @returns {HTMLLabelElement}
 * @memberof DOM
 */
export const createSelect = create.bind(null, 'select');

/**
 * Creates a `<option>` element with some attributes
 * @function
 * @param {Object} [attr] attributes
 * @returns {HTMLLabelElement}
 * @memberof DOM
 */
export const createOption = create.bind(null, 'option');

/**
 * Creates a `<optgroup>` element with some attributes
 * @function
 * @param {Object} [attr] attributes
 * @returns {HTMLLabelElement}
 * @memberof DOM
 */
export const createOptionGroup = create.bind(null, 'optgroup');

/**
 * Creates a `<textarea>` element with some attributes
 * @function
 * @param {Object} [attr] attributes
 * @returns {HTMLTextAreaElement}
 * @memberof DOM
 */
export const createTextArea = create.bind(null, 'textarea');

/**
 * Creates a `<meter>` element with some attributes
 * @function
 * @param {Object} [attr] attributes
 * @returns {HTMLTextAreaElement}
 * @memberof DOM
 */
export const createMeter = create.bind(null, 'meter');

/**
 * Creates a `<progress>` element with some attributes
 * @function
 * @param {Object} [attr] attributes
 * @returns {HTMLTextAreaElement}
 * @memberof DOM
 */
export const createProgress = create.bind(null, 'progress');

/**
 * Creates a `<output>` element with some attributes
 * @function
 * @param {Object} [attr] attributes
 * @returns {HTMLTextAreaElement}
 * @memberof DOM
 */
export const createOutput = create.bind(null, 'output');


/**
 * Creates a `<button>` element with some attributes
 * @param {Object} [attr] attributes
 * @memberof DOM
 */
export function createButton(type, attr) {
    var btn = create("button", attr);
    btn.type = valOrDefault(type, "button");

    return btn;
}
["submit", "reset", "button"].forEach(function (type) {
    createButton[type] = createButton.bind(null, type);
});

//#endregion

//#region Table Element

/**
 * Creates a `<table>` element with some attributes
 * @function
 * @param {Object} [attr] attributes
 * @returns {HTMLTableElement}
 * @memberof DOM
 */
export const createTable = create.bind(null, "table");

/**
 * Creates a `<caption>` element with some attributes
 * @function
 * @param {Object} [attr] attributes
 * @returns {HTMLTableCaptionElement}
 * @memberof DOM
 */
export const createCaption = create.bind(null, "caption");

/**
 * Creates a `<thead>` element with some attributes
 * @function
 * @param {Object} [attr] attributes
 * @returns {HTMLTableSectionElement}
 * @memberof DOM
 */
export const createTableHeader = create.bind(null, "thead");

/**
 * Creates a `<tbody>` element with some attributes
 * @function
 * @param {Object} [attr] attributes
 * @returns {HTMLTableSectionElement}
 * @memberof DOM
 */
export const createTableBody = create.bind(null, "tbody");

/**
 * Creates a `<tfoot>` element with some attributes
 * @function
 * @param {Object} [attr] attributes
 * @returns {HTMLTableSectionElement}
 * @memberof DOM
 */
export const createTableFooter = create.bind(null, "tfoot");

/**
 * Creates a `<col>` element with some attributes
 * @function
 * @param {Object} [attr] attributes
 * @returns {HTMLTableColElement}
 * @memberof DOM
 */
export const createTableColumn = create.bind(null, "col");
/**
 * Creates a `<colgroup>` element with some attributes
 * @function
 * @param {Object} [attr] attributes
 * @returns {HTMLTableColElement}
 * @memberof DOM
 */
export const createTableColumnGroup = create.bind(null, "colgroup");

/**
 * Creates a `<tr>` element with some attributes
 * @param {Object} [attr] attributes
 * @returns {HTMLTableRowElement}
 * @memberof DOM
 */
export const createTableRow = create.bind(null, "tr");

/**
 * Creates a `<th>` element with some attributes
 * @function
 * @param {Object} [attr] attributes
 * @returns {HTMLTableHeaderCellElement}
 * @memberof DOM
 */
export const createTableHeaderCell = create.bind(null, "th");

/**
 * Creates a `<td>` element with some attributes
 * @function
 * @param {Object} [attr] attributes
 * @returns {HTMLTableDataCellElement}
 * @memberof DOM
 */
export const createTableCell = create.bind(null, "td");

//#endregion

function echo(o) { o; }

const setClass = (el, c) => {
    // If c is an Array => Format c as a space-separated string
    if (Array.isArray(c)) {
        c = c.join(' ');
    }
    if (isString(c)) {
        el.className = c;
    }
};

/**
 * Sets the attributes of an element
 * @param {HTMLElement} element element
 * @param {Object} attribute attribute
 * @memberof DOM
 */
export function addAttributes(element, attribute) {
    const ATTR_MAP = {
        accept: [assign],
        children: [addChildren, element],
        class: [setClass, element],
        data: [Object.assign, element.dataset],
        disabled: [disable, element],
        draggable: [assign],
        editable: [assign, 'contenteditable'],
        html: [assign, 'innerHTML'],
        id: [assign],
        placeholder: [assign],
        readonly: [assign, 'readOnly'],
        style: [assign],
        text: [assign, 'textContent'],
        title: [assign],
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
}

/**
 * Appends the children to the element
 * @param {HTMLElement} el element
 * @param {HTMLCollection} children children elements
 * @private
 * @memberof DOM
 */
function addChildren(el, children) {
    if (Array.isArray(children)) {
        appendChildren(el, children);
    } else if (children instanceof Element) {
        el.appendChild(children);
    }

    return el;
}

/**
 * Append a list of elements to a node.
 * @param {HTMLElement} parent
 * @param {HTMLElement[]} children
 * @memberof DOM
 */
export function appendChildren(parent, children) {
    var fragment = createDocFragment();

    children.forEach(element => {
        fragment.appendChild(element);
    });
    parent.appendChild(fragment);
    fragment = null;

    return parent;
}