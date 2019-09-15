import { isNullOrUndefined, isString } from "@datatype/index.js";
import { isElement } from "./checker.js";

/**
 * Creates an element
 * @param {string} tagName 
 * @param {object} _attribute 
 * @param {HTMLElement|HTMLElement[]} _elements 
 * @returns {HTMLElement}
 * @private
 */
/* istanbul ignore next */
function create(tagName, _attribute, _elements) {
    var element = document.createElement(tagName);
    if (_attribute) {
        addAttributes(element, _attribute);
    }
    if (_elements) {
        addChildren(element, _elements);
    }
    return element;
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
 * @param {string} href 
 * @param {string} rel 
 * @memberof DOM
 */
export function createLink(href, rel) {
    var link = create("link");

    if (href) {
        link.href = href;
    }
    if (rel) {
        link.rel = rel;
    }

    return link;
}


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
export const createParagraph = create.bind(null, 'p');


/**
 * Creates a `<blockquote>` element with some attributes
 * @function
 * @param {Object} [attr] attributes
 * @returns {HTMLQuoteElement}
 * @memberof DOM
 */
export function createBlockQuotation(cite, attr, el) {
    var element = create('blockquote', attr, el);

    if (cite) {
        element.cite = cite;
    }

    return element;
}

/**
 * Creates a `<ul>` element with some attributes
 * @param {Object} [attr] attributes
 * @returns {HTMLUListElement}
 * @memberof DOM
 */
export const createUnorderedList = create.bind(null, 'ul');

/**
 * Creates a `<ol>` element with some attributes
 * @param {Object} [attr] attributes
 * @returns {HTMLUListElement}
 * @memberof DOM
 */
export const createOrderedList = create.bind(null, 'ol');

/**
 * Creates a `<li>` element with some attributes
 * @param {Object} [attr] attributes
 * @memberof DOM
 */
export const createListItem = create.bind(null, 'li');

/**
 * Creates a `<dl>` element with some attributes
 * @param {Object} [attr] attributes
 * @returns {HTMLDListElement}
 * @memberof DOM
 */
export const createDescriptionList = create.bind(null, 'dl');

/**
 * Creates a `<dt>` element with some attributes
 * @param {Object} [attr] attributes
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createDescriptionTerm = create.bind(null, 'dt');

/**
 * Creates a `<dd>` element with some attributes
 * @param {Object} [attr] attributes
 * @memberof DOM
 */
export const createDescriptionDetails = create.bind(null, 'dd');

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
  * Creates a `<audio>` element with some attributes
  * @param {string} src
  * @param {Object} [attr] attributes
  * @returns {HTMLAudioElement}
  * @memberof DOM
  */
export function createAudio(src, attr) {
    var audio = create('audio', attr);

    if (src) {
        audio.src = src;
    }

    return audio;
}

/**
  * Creates a `<video>` element with some attributes
  * @param {string} src
  * @param {Object} [attr] attributes
  * @returns {HTMLVideoElement}
  * @memberof DOM
  */
export function createVideo(src, attr) {
    var video = create('video', attr);

    if (src) {
        video.src = src;
    }

    return video;
}

/**
 * Creates a `<source>` element with some attributes
 * @function
 * @param {Object} [attr] attributes
 * @returns {HTMLSourceElement}
 * @memberof DOM
 */
export const createSource = create.bind(null, "source");

/**
 * Creates a `<picture>` element with some attributes
 * @function
 * @param {Object} [attr] attributes
 * @returns {HTMLPictureElement}
 * @memberof DOM
 */
export const createPicture = create.bind(null, "picture");

/**
 * Creates a `<figure>` element with some attributes
 * @function
 * @param {Object} [attr] attributes
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createFigure = create.bind(null, "figure");

/**
 * Creates a `<figcaption>` element with some attributes
 * @function
 * @param {Object} [attr] attributes
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createFigureCaption = create.bind(null, "figcaption");

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
export const createEmphasis = create.bind(null, "em");

/**
 * Creates a `<mark>` element with some attributes
 * @function
 * @param {Object} [attr] attributes
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createMark = create.bind(null, "mark");

/**
 * Creates a `<samp>` element with some attributes
 * @function
 * @param {Object} [attr] attributes
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createSample = create.bind(null, "samp");

/**
 * Creates a `<sub>` element with some attributes
 * @function
 * @param {Object} [attr] attributes
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createSubscript = create.bind(null, "sub");

/**
 * Creates a `<sup>` element with some attributes
 * @function
 * @param {Object} [attr] attributes
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createSuperscript = create.bind(null, "sup");


/**
 * Creates a `<q>` element with some attributes
 * @function
 * @param {Object} [attr] attributes
 * @returns {HTMLQuoteElement}
 * @memberof DOM
 */
export function createQuote(cite, attr) {
    var quote = create('q', attr);

    if (cite) {
        quote.cite = cite;
    }

    return quote;
}

/**
 * Creates a `<abbr>` element with some attributes
 * @function
 * @param {Object} [attr] attributes
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createAbbreviation = create.bind(null, "abbr");

/**
 * Creates a `<b>` element with some attributes
 * @function
 * @param {Object} [attr] attributes
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createB = create.bind(null, "b");

/**
 * Creates a `<i>` element with some attributes
 * @function
 * @param {Object} [attr] attributes
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createI = create.bind(null, "i");

/**
 * Creates a `<s>` element with some attributes
 * @function
 * @param {Object} [attr] attributes
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createS = create.bind(null, 's');

/**
 * Creates a `<u>` element with some attributes
 * @function
 * @param {Object} [attr] attributes
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createU = create.bind(null, 'u');

/**
 * Creates a `<cite>` element with some attributes
 * @function
 * @param {Object} [attr] attributes
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createCite = create.bind(null, "cite");


/**
 * Creates a `<q>` element with some attributes
 * @function
 * @param {Object} [attr] attributes
 * @returns {HTMLTimeElement}
 * @memberof DOM
 */
export function createTime(datetime, attr) {
    var element = create('time', attr);

    if (datetime) {
        element.datetime = datetime;
    }

    return element;
}

/**
 * Creates a `<code>` element with some attributes
 * @function
 * @param {Object} [attr] attributes
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createCode = create.bind(null, "code");


/**
 * Creates a `<form>` element with some attributes
 * @function
 * @param {Object} [attr] attributes
 * @returns {HTMLLabelElement}
 * @memberof DOM
 */
export const createForm = create.bind(null, 'form');


/* istanbul ignore next */
function createInputAs(type, attr, el) {
    var input = create('input', attr, el);
    input.type = type;

    return input;
}


/**
 * Creates a `<input>` element with some attributes
 * @param {Object} [attr] attributes
 * @returns {HTMLInputElement}
 * @memberof DOM
 */
export const createInput = createInputAs.bind(null, "text");


["button", "checkbox", "color", "date", "datetime-local", "email", "file",
    "hidden", "image", "month", "number", "password", "radio", "range", "reset",
    "search", "submit", "tel", "text", "time", "url", "week"].forEach(function (type) {
    createInput[type] = createInputAs.bind(null, type);
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

/* istanbul ignore next */
function createButtonAs(type, attr, el) {
    var btn = create("button", attr, el);
    btn.type = type;

    return btn;
}

/**
 * Creates a `<button>` element with some attributes
 * @param {Object} [attr] attributes
 * @memberof DOM
 */
export const createButton = createButtonAs.bind(null, "button");
["submit", "reset", "button"].forEach(function (type) {
    createButton[type] = createButtonAs.bind(null, type);
});


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

/* istanbul ignore next */
function echo(o) { }

/**
 * 
 * @param {HTMLElement} element 
 * @param {string|string[]} c classes 
 * @private
 */
/* istanbul ignore next */
const setClass = (element, c) => {
    if (!isNullOrUndefined(c)) {
        // If c is an Array => Format c as a space-separated string
        if (Array.isArray(c)) {
            c = c.join(' ');
        }

        element.className = String(c);
    }

    return element;
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
        class: [setClass, element],
        data: [Object.assign, element.dataset],
        disabled: [assign],
        draggable: [assign],
        editable: [assign, 'contenteditable'],
        html: [assign, 'innerHTML'],
        id: [assign],
        placeholder: [assign],
        readonly: [assign, 'readOnly'],
        style: [assign],
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
 * @param {HTMLElement} element element
 * @param {HTMLCollection} children children elements
 * @private
 * @memberof DOM
 */
/* istanbul ignore next */
function addChildren(element, children) {
    if (Array.isArray(children)) {
        appendChildren(element, children);
    } else if (isElement(children)) {
        element.appendChild(children);
    } else if (isString(children)) {
        element.textContent = children;
    }

    return element;
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
        fragment.appendChild(isString(element) ? createTextNode(element) : element);
    });
    parent.appendChild(fragment);
    fragment = null;

    return parent;
}


export const EL = {
    'article': createArticle,
    'aside': createAside,
    'br': createLineBreak,
    'div': createDiv,
    'dl': createDescriptionList,
    'footer': createFooter,
    'h1': createH1,
    'h2': createH2,
    'h3': createH3,
    'h4': createH4,
    'h5': createH5,
    'h6': createH6,
    'header': createHeader,
    'hr': createThematicBreak,
    'i': createI,
    'input': createInput,
    'inbutton': createInput['button'],
    'incheckbox': createInput['checkbox'],
    'incolor': createInput['color'],
    'indate': createInput['date'],
    'indatetime': createInput['datetime-local'],
    'inemail': createInput['email'],
    'infile': createInput['file'],
    'inhidden': createInput['hidden'],
    'inimage': createInput['image'],
    'inmonth': createInput['month'],
    'innumber': createInput['number'],
    'inpassword': createInput['password'],
    'inradio': createInput['radio'],
    'inrange': createInput['range'],
    'inreset': createInput['reset'],
    'insearch': createInput['search'],
    'insubmit': createInput['submit'],
    'intel': createInput['tel'],
    'intext': createInput['text'],
    'intime': createInput['time'],
    'inurl': createInput['url'],
    'inweek': createInput['week'],
    'li': createListItem,
    'main': createMain,
    'nav': createNav,
    'ol': createOrderedList,
    'p': createParagraph,
    'section': createSection,
    'ul': createUnorderedList,
    'dt': createDescriptionTerm,
    'dd': createDescriptionDetails,
    'source': createSource,
    'picture': createPicture,
    'figure': createFigure,
    'figcaption': createFigureCaption,
    'span': createSpan,
    'strong': createStrong,
    'em': createEmphasis,
    'mark': createMark,
    'samp': createSample,
    'sub': createSubscript,
    'sup': createSuperscript,
    'abbr': createAbbreviation,
    'b': createB,
    's': createS,
    'u': createU,
    'cite': createCite,
    'code': createCode,
    'form': createForm,
    'label': createLabel,
    'fieldset': createFieldset,
    'legend': createLegend,
    'datalist': createDataList,
    'select': createSelect,
    'option': createOption,
    'optgroup': createOptionGroup,
    'textarea': createTextArea,
    'meter': createMeter,
    'progress': createProgress,
    'output': createOutput,
    'button': createButton,
    'btnbutton': createButton['button'],
    'btnreset': createButton['reset'],
    'btnsubmit': createButton['submit'],
    'table': createTable,
    'caption': createCaption,
    'thead': createTableHeader,
    'tbody': createTableBody,
    'tfoot': createTableFooter,
    'col': createTableColumn,
    'colgroup': createTableColumnGroup,
    'tr': createTableRow,
    'th': createTableHeaderCell,
    'td': createTableCell,
};

const ElementBuilder = {
    result: null,
    create(element) {
        this.result = element;
    },
    validate() { },
    build() {
        return this.result;
    }
};