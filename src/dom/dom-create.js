import { isNode } from "./dom-parse.js";
import { appendChildren } from "./dom-append.js";
import { addAttributes } from "./element-manip.js";

/**
 * Creates an element
 * @param {string} tagName 
 * @param {object} [_attribute] 
 * @param {Text|HTMLElement|HTMLElement[]} [_children] 
 * @returns {HTMLElement}
 * @private
 */
/* istanbul ignore next */
function create(tagName, _attribute, _children) {
    var element = document.createElement(tagName);
    if (_attribute) {
        addAttributes(element, _attribute);
    }
    if (_children) {
        addContent(element, _children);
    }
    return element;
}

/**
 * Creates a document fragment
 * @function createDocFragment
 * @returns {DocumentFragment}
 * @memberof DOM
 */
export const createDocFragment = () => document.createDocumentFragment();

/**
 * Creates a text node
 * @function createTextNode
 * @param {string} text
 * @returns {Text}
 * @memberof DOM
 */
export const createTextNode = (text) => document.createTextNode(text);

/**
 * Creates a `<link>` element with some attributes
 * @param {string} href 
 * @param {string} rel 
 * @returns {HTMLLinkElement}
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
 * Creates a `<template>` element with some attributes
 * @function createTemplate
 * @param {object} _attribute Global attributes
 * @param {Text|HTMLElement|HTMLElement[]} _children Content
 * @returns {HTMLTemplateElement}
 * @memberof DOM
 */
export const createTemplate = create.bind(null, 'template');

/**
 * Creates a `<header>` element with some attributes
 * @function createHeader
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createHeader = create.bind(null, 'header');

/**
 * Creates an `<footer>` element with some attributes
 * @function createFooter
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createFooter = create.bind(null, 'footer');

/**
 * Creates an `<main>` element with some attributes
 * @function createMain
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createMain = create.bind(null, 'main');

/**
 * Creates an `<article>` element with some attributes
 * @function createArticle
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createArticle = create.bind(null, 'article');

/**
 * Creates an `<section>` element with some attributes
 * @function createSection
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createSection = create.bind(null, 'section');

/**
 * Creates an `<nav>` element with some attributes
 * @function createNav
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createNav = create.bind(null, 'nav');

/**
 * Creates an `<aside>` element with some attributes
 * @function createAside
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createAside = create.bind(null, 'aside');

/**
 * Creates a `<h1>` element with some attributes
 * @function createH1
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLHeadingElement}
 * @memberof DOM
 */
export const createH1 = create.bind(null, 'h1');

/**
 * Creates a `<h2>` element with some attributes
 * @function createH2
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLHeadingElement}
 * @memberof DOM
 */
export const createH2 = create.bind(null, 'h2');

/**
 * Creates a `<h3>` element with some attributes
 * @function createH3
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLHeadingElement}
 * @memberof DOM
 */
export const createH3 = create.bind(null, 'h3');

/**
 * Creates a `<h4>` element with some attributes
 * @function createH4
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLHeadingElement}
 * @memberof DOM
 */
export const createH4 = create.bind(null, 'h4');

/**
 * Creates a `<h5>` element with some attributes
 * @function createH5
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLHeadingElement}
 * @memberof DOM
 */
export const createH5 = create.bind(null, 'h5');

/**
 * Creates a `<h6>` element with some attributes
 * @function createH6
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLHeadingElement}
 * @memberof DOM
 */
export const createH6 = create.bind(null, 'h6');

/**
 * Creates a `<div>` element with some attributes
 * @function createDiv
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLDivElement}
 * @memberof DOM
 */
export const createDiv = create.bind(null, 'div');

/**
 * Creates a `br` element \
 * Line break (carriage-return)
 * @function createLineBreak
 * @memberof DOM
 */
export const createLineBreak = () => create('br');

/**
 * Creates a `hr` element \
 * Thematic break
 * @function createThematicBreak
 * @memberof DOM
 */
export const createThematicBreak = () => create('hr');

/**
 * Creates a `<p>` element with some attributes
 * @function createParagraph
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLParagraphElement}
 * @memberof DOM
 */
export const createParagraph = create.bind(null, 'p');


/**
 * Creates a `<blockquote>` element with some attributes
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLQuoteElement}
 * @memberof DOM
 */
export function createBlockQuotation(cite, attribute, children) {
    var element = create('blockquote', attribute, children);

    if (cite) {
        element.cite = cite;
    }

    return element;
}

/**
 * Creates a `<ul>` element with some attributes
 * @function createUnorderedList
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLUListElement}
 * @memberof DOM
 */
export const createUnorderedList = create.bind(null, 'ul');

/**
 * Creates a `<ol>` element with some attributes
 * @function createOrderedList
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLOListElement}
 * @memberof DOM
 */
export const createOrderedList = create.bind(null, 'ol');

/**
 * Creates a `<li>` element with some attributes
 * @function createListItem
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLLIElement}
 * @memberof DOM
 */
export const createListItem = create.bind(null, 'li');

/**
 * Creates a `<dl>` element with some attributes
 * @function createDescriptionList
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLDListElement}
 * @memberof DOM
 */
export const createDescriptionList = create.bind(null, 'dl');

/**
 * Creates a `<dt>` element with some attributes
 * @function createDescriptionTerm
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createDescriptionTerm = create.bind(null, 'dt');

/**
 * Creates a `<dd>` element with some attributes
 * @function createDescriptionDetails
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createDescriptionDetails = create.bind(null, 'dd');

// Inline Element

/**
 * Creates an `<a>` element with some attributes
 * @param {string} href URL or a URL fragment that the hyperlink points to
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLAnchorElement}
 * @memberof DOM
 */
export function createAnchor(href, _attribute, _children) {
    var a = create('a', _attribute, _children);

    if (href) {
        a.href = href;
    }

    return a;
}

/**
  * Creates a `<img>` element with some attributes
  * @param {string} src
  * @param {string} alt
  * @param {object} _attribute 
  * @param {Text|HTMLElement|HTMLElement[]} _children 
  * @returns {HTMLImageElement}
  * @memberof DOM
  */
export function createImage(src, alt, _attribute) {
    var img = create('img', _attribute);

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
  * @param {object} attribute 
  * @param {Text|HTMLElement|HTMLElement[]} children 
  * @returns {HTMLAudioElement}
  * @memberof DOM
  */
export function createAudio(src, attribute, children) {
    var audio = create('audio', attribute, children);

    if (src) {
        audio.src = src;
    }

    return audio;
}

/**
  * Creates a `<video>` element with some attributes
  * @param {string} src
  * @param {object} attribute 
  * @param {Text|HTMLElement|HTMLElement[]} children 
  * @returns {HTMLVideoElement}
  * @memberof DOM
  */
export function createVideo(src, attribute, children) {
    var video = create('video', attribute, children);

    if (src) {
        video.src = src;
    }

    return video;
}

/**
 * Creates a `<source>` element with some attributes
 * @function createSource
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLSourceElement}
 * @memberof DOM
 */
export const createSource = create.bind(null, "source");

/**
 * Creates a `<picture>` element with some attributes
 * @function createPicture
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLPictureElement}
 * @memberof DOM
 */
export const createPicture = create.bind(null, "picture");

/**
 * Creates a `<figure>` element with some attributes
 * @function createFigure
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createFigure = create.bind(null, "figure");

/**
 * Creates a `<figcaption>` element with some attributes
 * @function createFigureCaption
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createFigureCaption = create.bind(null, "figcaption");

/**
 * Creates a `<span>` element with some attributes
 * @function createSpan
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLSpanElement}
 * @memberof DOM
 */
export const createSpan = create.bind(null, "span");

/**
 * Creates a `<strong>` element with some attributes
 * @function createStrong
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createStrong = create.bind(null, "strong");

/**
 * Creates a `<em>` element with some attributes
 * @function createEmphasis
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createEmphasis = create.bind(null, "em");

/**
 * Creates a `<mark>` element with some attributes
 * @function createMark
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createMark = create.bind(null, "mark");

/**
 * Creates a `<samp>` element with some attributes
 * @function createSample
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createSample = create.bind(null, "samp");

/**
 * Creates a `<sub>` element with some attributes
 * @function createSubscript
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createSubscript = create.bind(null, "sub");

/**
 * Creates a `<sup>` element with some attributes
 * @function createSuperscript
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createSuperscript = create.bind(null, "sup");

/**
 * Creates a `<q>` element with some attributes
 * @function createQuote
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLQuoteElement}
 * @memberof DOM
 */
export function createQuote(cite, _attribute, children) {
    var quote = create('q', _attribute, children);

    if (cite) {
        quote.cite = cite;
    }

    return quote;
}

/**
 * Creates a `<abbr>` element with some attributes
 * @function createAbbreviation
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createAbbreviation = create.bind(null, "abbr");

/**
 * Creates a `<b>` element with some attributes
 * @function createB
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createB = create.bind(null, "b");

/**
 * Creates a `<i>` element with some attributes
 * @function createI
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createI = create.bind(null, "i");

/**
 * Creates a `<s>` element with some attributes
 * @function createS
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createS = create.bind(null, 's');

/**
 * Creates a `<u>` element with some attributes
 * @function createU
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createU = create.bind(null, 'u');

/**
 * Creates a `<cite>` element with some attributes
 * @function createCite
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createCite = create.bind(null, "cite");

/**
 * Creates a `<time>` element with optionally some attributes
 * @param {string} datetime 
 * @param {object} attribute 
 * @returns {HTMLTimeElement}
 * @memberof DOM
 */
export function createTime(datetime, _attribute) {
    var element = create('time', _attribute);

    if (datetime) {
        element.datetime = datetime;
    }

    return element;
}

/**
 * Creates a `<code>` element with some attributes
 * @function createCode
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createCode = create.bind(null, "code");

/**
 * Creates a `<form>` element with some attributes
 * @function createForm
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLLabelElement}
 * @memberof DOM
 */
export const createForm = create.bind(null, 'form');


/**
 * Creates an `<input>` element with a specified type and 
 * optionally some attributes
 * @param {string} type
 * @param {object} _attribute 
 * @memberof DOM
 */
export function createInputAs(type, _attribute) {
    if (!["button", "checkbox", "color", "date", "datetime-local", "email", "file",
        "hidden", "image", "month", "number", "password", "radio", "range", "reset",
        "search", "submit", "tel", "text", "time", "url", "week"].includes(type)) {
        console.error(`Input could not be created: the given type ${type} is not valid.`);
        return null;
    }

    var input = create('input', _attribute);
    input.type = type;

    return input;
}

/**
 * Creates an `<input>` element with some attributes
 * @function createInput
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLInputElement}
 * @memberof DOM
 */
export const createInput = createInputAs.bind(null, "text");

/**
 * Creates a `<label>` element with some attributes
 * @function createLabel
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLLabelElement}
 * @memberof DOM
 */
export const createLabel = create.bind(null, 'label');

/**
 * Creates a `<fieldset>` element with some attributes
 * @function createFieldset
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLLabelElement}
 * @memberof DOM
 */
export const createFieldset = create.bind(null, 'fieldset');

/**
 * Creates a `<legend>` element with some attributes
 * @function createLegend
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLLabelElement}
 * @memberof DOM
 */
export const createLegend = create.bind(null, 'legend');

/**
 * Creates a `<datalist>` element with some attributes
 * @function createDataList
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLTextAreaElement}
 * @memberof DOM
 */
export const createDataList = create.bind(null, 'datalist');

/**
 * Creates a `<select>` element with some attributes
 * @function createSelect
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLLabelElement}
 * @memberof DOM
 */
export const createSelect = create.bind(null, 'select');

/**
 * Creates a `<option>` element with some attributes
 * @function createOption
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLLabelElement}
 * @memberof DOM
 */
export const createOption = create.bind(null, 'option');

/**
 * Creates a `<optgroup>` element with some attributes
 * @function createOptionGroup
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLLabelElement}
 * @memberof DOM
 */
export const createOptionGroup = create.bind(null, 'optgroup');

/**
 * Creates a `<textarea>` element with some attributes
 * @function createTextArea
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLTextAreaElement}
 * @memberof DOM
 */
export const createTextArea = create.bind(null, 'textarea');

/**
 * Creates a `<meter>` element with some attributes
 * @function createMeter
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLTextAreaElement}
 * @memberof DOM
 */
export const createMeter = create.bind(null, 'meter');

/**
 * Creates a `<progress>` element with some attributes
 * @function createProgress
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLTextAreaElement}
 * @memberof DOM
 */
export const createProgress = create.bind(null, 'progress');

/**
 * Creates a `<output>` element with optionally some attributes and children elements
 * @function createOutput
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLTextAreaElement}
 * @memberof DOM
 */
export const createOutput = create.bind(null, 'output');


/**
 * Creates a `<button>` element with a specified type and 
 * optionally some attributes and children elements
 * @param {string} type
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @memberof DOM
 */
export function createButtonAs(type, _attribute, _children) {
    if (!["submit", "reset", "button"].includes(type)) {
        console.error(`Button could not be created: the given type ${type} is not valid.`);
        return null;
    }

    var button = create("button", _attribute, _children);
    button.type = type;

    return button;
}

/**
 * Creates a `<button>` element with some attributes
 * @function createButton
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @memberof DOM
 */
export const createButton = createButtonAs.bind(null, "button");

/**
 * Creates a `<table>` element with some attributes
 * @function createTable
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLTableElement}
 * @memberof DOM
 */
export const createTable = create.bind(null, "table");

/**
 * Creates a `<caption>` element with some attributes
 * @function createCaption
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLTableCaptionElement}
 * @memberof DOM
 */
export const createCaption = create.bind(null, "caption");

/**
 * Creates a `<thead>` element with some attributes
 * @function createTableHeader
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLTableSectionElement}
 * @memberof DOM
 */
export const createTableHeader = create.bind(null, "thead");

/**
 * Creates a `<tbody>` element with some attributes
 * @function createTableBody
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLTableSectionElement}
 * @memberof DOM
 */
export const createTableBody = create.bind(null, "tbody");

/**
 * Creates a `<tfoot>` element with some attributes
 * @function createTableFooter
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLTableSectionElement}
 * @memberof DOM
 */
export const createTableFooter = create.bind(null, "tfoot");

/**
 * Creates a `<col>` element with some attributes
 * @function createTableColumn
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLTableColElement}
 * @memberof DOM
 */
export const createTableColumn = create.bind(null, "col");

/**
 * Creates a `<colgroup>` element with some attributes
 * @function createTableColumnGroup
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLTableColElement}
 * @memberof DOM
 */
export const createTableColumnGroup = create.bind(null, "colgroup");

/**
 * Creates a `<tr>` element with some attributes
 * @function createTableRow
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLTableRowElement}
 * @memberof DOM
 */
export const createTableRow = create.bind(null, "tr");

/**
 * Creates a `<th>` element with some attributes
 * @function createTableHeaderCell
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLTableHeaderCellElement}
 * @memberof DOM
 */
export const createTableHeaderCell = create.bind(null, "th");

/**
 * Creates a `<td>` element with some attributes
 * @function createTableCell
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLTableDataCellElement}
 * @memberof DOM
 */
export const createTableCell = create.bind(null, "td");

/**
 * Appends the children to the element
 * @param {HTMLElement} element element
 * @param {HTMLCollection} children children elements
 * @private
 * @memberof DOM
 */
/* istanbul ignore next */
function addContent(element, children) {
    if (Array.isArray(children)) {
        appendChildren(element, children);
    } else if (isNode(children)) {
        element.appendChild(children);
    } else {
        element.textContent = children.toString();
    }

    return element;
}