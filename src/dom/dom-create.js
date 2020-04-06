import { isNullOrUndefined } from "@std/index.js";
import { isNode, isHTMLElement } from "./dom-parse.js";
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
function create(tagName, validAttributes, _attribute, _children) {
    var element = document.createElement(tagName);

    if (!isHTMLElement(element)) {
        return null;
    }

    if (!isNullOrUndefined(_attribute)) {
        addAttributes(element, _attribute, validAttributes);
    }

    if (!isNullOrUndefined(_children)) {
        addContent(element, _children);
    }

    return element;
}

// TODO: createMeta

// TODO: createScript

// TODO: createStyle

// TODO: createTitle

/**
 * Creates a document fragment
 * @function createDocFragment
 * @returns {DocumentFragment}
 * @memberof DOM
 */
export function createDocFragment(_children) {
    var fragment = document.createDocumentFragment();

    if (!isNullOrUndefined(_children)) {
        addContent(fragment, _children);
    }

    return fragment;
}

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
 * @function createLink
 * @param {object} _attribute Global attributes
 * @returns {HTMLLinkElement}
 * @memberof DOM
 */
export const createLink = create.bind(null, "link", "as,crossorigin,disabled,href,hreflang,media,rel,sizes,type");

/**
 * Creates a `<template>` element with some attributes
 * @function createTemplate
 * @param {object} _attribute Global attributes
 * @param {Text|HTMLElement|HTMLElement[]} _children Content
 * @returns {HTMLTemplateElement}
 * @memberof DOM
 */
export const createTemplate = create.bind(null, "template");

/**
 * Creates a `<header>` element with some attributes
 * @function createHeader
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createHeader = create.bind(null, "header");

/**
 * Creates an `<footer>` element with some attributes
 * @function createFooter
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createFooter = create.bind(null, "footer");

/**
 * Creates an `<main>` element with some attributes
 * @function createMain
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createMain = create.bind(null, "main");

/**
 * Creates an `<article>` element with some attributes
 * @function createArticle
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createArticle = create.bind(null, "article");

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
export const createNav = create.bind(null, "nav");

/**
 * Creates an `<aside>` element with some attributes
 * @function createAside
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createAside = create.bind(null, "aside");

/**
 * Creates a `<h1>` element with some attributes
 * @function createH1
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLHeadingElement}
 * @memberof DOM
 */
export const createH1 = create.bind(null, "h1");

/**
 * Creates a `<h2>` element with some attributes
 * @function createH2
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLHeadingElement}
 * @memberof DOM
 */
export const createH2 = create.bind(null, "h2");

/**
 * Creates a `<h3>` element with some attributes
 * @function createH3
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLHeadingElement}
 * @memberof DOM
 */
export const createH3 = create.bind(null, "h3");

/**
 * Creates a `<h4>` element with some attributes
 * @function createH4
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLHeadingElement}
 * @memberof DOM
 */
export const createH4 = create.bind(null, "h4");

/**
 * Creates a `<h5>` element with some attributes
 * @function createH5
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLHeadingElement}
 * @memberof DOM
 */
export const createH5 = create.bind(null, "h5");

/**
 * Creates a `<h6>` element with some attributes
 * @function createH6
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLHeadingElement}
 * @memberof DOM
 */
export const createH6 = create.bind(null, "h6");

/**
 * Creates a `<div>` element with some attributes
 * @function createDiv
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLDivElement}
 * @memberof DOM
 */
export const createDiv = create.bind(null, "div");

/**
 * Creates a `<object>` element with some attributes
 * @function createObject
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLObjectElement}
 * @memberof DOM
 */
export const createObject = create.bind(null, "object", "data,form,name,type,usemap");

/**
 * Creates a `<embed>` element with some attributes
 * @function createEmbed
 * @param {object} _attribute 
 * @returns {HTMLEmbedElement}
 * @memberof DOM
 */
export const createEmbed = create.bind(null, "embed", "src,type");

/**
 * Creates a `br` element \
 * Line break (carriage-return)
 * @function createLineBreak
 * @returns {HTMLBRElement}
 * @memberof DOM
 */
export const createLineBreak = () => create("br");

/**
 * Creates a `hr` element \
 * Thematic break
 * @function createThematicBreak
 * @returns {HTMLHRElement}
 * @memberof DOM
 */
export const createThematicBreak = () => create("hr");

/**
 * Creates a `<p>` element with some attributes
 * @function createParagraph
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLParagraphElement}
 * @memberof DOM
 */
export const createParagraph = create.bind(null, "p");


/**
 * Creates a `<blockquote>` element with some attributes
 * @function createBlockQuotation
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLQuoteElement}
 * @memberof DOM
 */
export const createBlockQuotation = create.bind(null, "blockquote", "cite");

/**
 * Creates a `<ul>` element with some attributes
 * @function createUnorderedList
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLUListElement}
 * @memberof DOM
 */
export const createUnorderedList = create.bind(null, "ul");

/**
 * Creates a `<ol>` element with some attributes
 * @function createOrderedList
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLOListElement}
 * @memberof DOM
 */
export const createOrderedList = create.bind(null, "ol", "reversed,start,type");

/**
 * Creates a `<li>` element with some attributes
 * @function createListItem
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLLIElement}
 * @memberof DOM
 */
export const createListItem = create.bind(null, "li", "value");

/**
 * Creates a `<dl>` element with some attributes
 * @function createDescriptionList
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLDListElement}
 * @memberof DOM
 */
export const createDescriptionList = create.bind(null, "dl");

/**
 * Creates a `<dt>` element with some attributes
 * @function createDescriptionTerm
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createDescriptionTerm = create.bind(null, "dt");

/**
 * Creates a `<dd>` element with some attributes
 * @function createDescriptionDetails
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createDescriptionDetails = create.bind(null, "dd");

// Inline Element

/**
 * Creates an `<a>` element with some attributes
 * @function createAnchor
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLAnchorElement}
 * @memberof DOM
 */
export const createAnchor = create.bind(null, "a", "download,href,hreflang,ping,rel,target,type");

/**
 * Creates an `<area>` element with some attributes
 * @function createArea
 * @param {object} _attribute 
 * @returns {HTMLAreaElement}
 * @memberof DOM
 */
export const createArea = create.bind(null, "area", "alt,coords,download,href,hreflang,media,ping,rel,shape,target");

/**
 * Creates an `<base>` element with some attributes
 * @function createBase
 * @param {object} _attribute 
 * @returns {HTMLBaseElement}
 * @memberof DOM
 */
export const createBase = create.bind(null, "base", "href,target");

/**
  * Creates a `<img>` element with some attributes
  * @function createImage
  * @param {object} _attribute 
  * @returns {HTMLImageElement}
  * @memberof DOM
  */
export const createImage = create.bind(null, "img", "alt,crossorigin,decoding,height,ismap,loading,src,srcset,usemap,width");

/**
  * Creates a `<audio>` element with some attributes
  * @function createAudio
  * @param {object} _attribute
  * @param {Text|HTMLElement|HTMLElement[]} _children
  * @returns {HTMLAudioElement}
  * @memberof DOM
  */
export const createAudio = create.bind(null, "audio", "autoplay,buffered,controls,crossorigin,loop,muted,preload,src");

/**
  * Creates a `<video>` element with some attributes
  * @function createVideo
  * @param {object} _attribute 
  * @param {Text|HTMLElement|HTMLElement[]} _children 
  * @returns {HTMLVideoElement}
  * @memberof DOM
  */
export const createVideo = create.bind(null, "video", "autoplay,buffered,controls,crossorigin,loop,muted,poster,preload,src");

/**
 * Creates a `<source>` element with some attributes
 * @function createSource
 * @param {object} _attribute
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLSourceElement}
 * @memberof DOM
 */
export const createSource = create.bind(null, "source", "media,sizes,src,srcset,type");

/**
 * Creates a `<track>` element with some attributes
 * @function createTrack
 * @param {object} _attribute 
 * @returns {HTMLTrackElement}
 * @memberof DOM
 */
export const createTrack = create.bind(null, "track", "default,kind,label,src,srclang");

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
 * Creates a `<del>` element with some attributes
 * @function createDeletedPart
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLModElement}
 * @memberof DOM
 */
export const createDeletedPart = create.bind(null, "del", "cite,datetime");

/**
 * Creates a `<ins>` element with some attributes
 * @function createInsertedPart
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLModElement}
 * @memberof DOM
 */
export const createInsertedPart = create.bind(null, "ins", "cite,datetime");

/**
 * Creates a `<q>` element with some attributes
 * @function createQuote
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLQuoteElement}
 * @memberof DOM
 */
export const createQuote = create.bind(null, "q", "cite");

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
 * @function createTime
 * @param {object} _attribute 
 * @returns {HTMLTimeElement}
 * @memberof DOM
 */
export const createTime = create.bind(null, "time", "cite");

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
 * @returns {HTMLFormElement}
 * @memberof DOM
 */
export const createForm = create.bind(null, "form", "accept,action,autocomplete,enctype,method,name,novalidate,target");

const inputTypes = ["button", "checkbox", "color", "date", "datetime-local", "email", "file",
    "hidden", "image", "month", "number", "password", "radio", "range", "reset",
    "search", "submit", "tel", "text", "time", "url", "week"];

/**
 * Creates an `<input>` element with a specified type and 
 * optionally some attributes
 * @param {string} type
 * @param {object} _attribute 
 * @memberof DOM
 */
export function createInputAs(type, _attribute) {
    if (!inputTypes.includes(type)) {
        return null;
    }

    var input = create('input', "accept,alt,autocomplete,autofocus,checked,disabled,form,list,max,maxlength,minlength,min,multiple,name,pattern,placeholder,readonly,required,size,src,step,type,usemap,value", _attribute);
    input.type = type;

    return input;
}

/**
 * Creates an `<input>` element with some attributes
 * @function createInput
 * @param {object} _attribute 
 * @returns {HTMLInputElement}
 * @memberof DOM
 */
export const createInput = createInputAs.bind(null, "text");

/**
 * Creates a `<textarea>` element with some attributes
 * @function createTextArea
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLTextAreaElement}
 * @memberof DOM
 */
export const createTextArea = create.bind(null, "textarea", "autocomplete,autofocus,cols,disabled,form,inputmode,maxlength,minlength,name,placeholder,readonly,required,rows,wrap");

/**
 * Creates a `<label>` element with some attributes
 * @function createLabel
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLLabelElement}
 * @memberof DOM
 */
export const createLabel = create.bind(null, "label", "for,form");

/**
 * Creates a `<select>` element with some attributes
 * @function createSelect
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLSelectElement}
 * @memberof DOM
 */
export const createSelect = create.bind(null, 'select', "autocomplete,autofocus,disabled,form,multiple,name,required,size");

/**
 * Creates a `<option>` element with some attributes
 * @function createOption
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLOptionElement}
 * @memberof DOM
 */
export const createOption = create.bind(null, "option", "disabled,label,selected,value");

/**
 * Creates a `<optgroup>` element with some attributes
 * @function createOptionGroup
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLOptGroupElement}
 * @memberof DOM
 */
export const createOptionGroup = create.bind(null, "optgroup", "disabled,label");

/**
 * Creates a `<fieldset>` element with some attributes
 * @function createFieldset
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLFieldSetElement}
 * @memberof DOM
 */
export const createFieldset = create.bind(null, "fieldset", "disabled,form,name");

/**
 * Creates a `<legend>` element with some attributes
 * @function createLegend
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLLabelElement}
 * @memberof DOM
 */
export const createLegend = create.bind(null, "legend");

/**
 * Creates a `<datalist>` element with some attributes
 * @function createDataList
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLTextAreaElement}
 * @memberof DOM
 */
export const createDataList = create.bind(null, "datalist");

/**
 * Creates a `<meter>` element with some attributes
 * @function createMeter
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLTextAreaElement}
 * @memberof DOM
 */
export const createMeter = create.bind(null, "meter", "form,high,low,max,min,optimum,value");

/**
 * Creates a `<progress>` element with some attributes
 * @function createProgress
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLTextAreaElement}
 * @memberof DOM
 */
export const createProgress = create.bind(null, "progress", "form,max,value");

/**
 * Creates a `<output>` element with optionally some attributes and children elements
 * @function createOutput
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLTextAreaElement}
 * @memberof DOM
 */
export const createOutput = create.bind(null, "output", "for,form,name");

const buttonTypes = ["button", "submit", "reset"];

/**
 * Creates a `<button>` element with a specified type and 
 * optionally some attributes and children elements
 * @param {string} type
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLButtonElement}
 * @memberof DOM
 */
export function createButtonAs(type, _attribute, _children) {
    if (!buttonTypes.includes(type)) {
        return null;
    }

    var button = create("button", "autofocus,disabled,form,name,type,value", _attribute, _children);
    button.type = type;

    return button;
}

/**
 * Creates a `<button>` element with some attributes
 * @function createButton
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLButtonElement}
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
export const createTable = create.bind(null, "table", "summary");

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
export const createTableColumn = create.bind(null, "col", "span");

/**
 * Creates a `<colgroup>` element with some attributes
 * @function createTableColumnGroup
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLTableColElement}
 * @memberof DOM
 */
export const createTableColumnGroup = create.bind(null, "colgroup", "span");

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
 * @returns {HTMLTableCellElement}
 * @memberof DOM
 */
export const createTableHeaderCell = create.bind(null, "th", "colspan,headers,rowspan,scope");

/**
 * Creates a `<td>` element with some attributes
 * @function createTableCell
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLTableCellElement}
 * @memberof DOM
 */
export const createTableCell = create.bind(null, "td", "colspan,headers,rowspan");

/**
 * Appends the children to the element
 * @param {HTMLElement} element element
 * @param {HTMLCollection} children children elements
 * @private
 * @memberof DOM
 */
/* istanbul ignore next */
function addContent(element, children) {
    if (!isHTMLElement(element)) {
        throw new Error("The given element is not a valid HTML Element");
    }

    if (isNullOrUndefined(children)) {
        return element;
    }

    if (Array.isArray(children)) {
        appendChildren(element, children);
    } else if (isNode(children)) {
        element.appendChild(children);
    } else {
        element.textContent = children.toString();
    }

    return element;
}