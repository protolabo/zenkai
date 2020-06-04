import { isNullOrUndefined, isFunction, isObject, valOrDefault } from "@std/index.js";
import { isHTMLElement } from "./dom-parse.js";
import { appendChildren } from "./dom-append.js";
import { addAttributes } from "./element-manip.js";


/**
 * Creates an empty element with attributes
 * @param {string} tagName 
 * @param {string} [_validAttributes] 
 * @param {object} [_attributes] 
 * @returns {HTMLElement}
 * @private
 */
/* istanbul ignore next */
function createEmptyElement(tagName, _validAttributes, _attributes) {
    var element = document.createElement(tagName);

    if (!isHTMLElement(element)) {
        return null;
    }

    if (isObject(_attributes)) {
        addAttributes(element, _attributes, valOrDefault(_validAttributes, ""));
    }

    return element;
}

/**
 * Creates an element with attributes and content
 * @param {string} tagName 
 * @param {string} [_validAttributes] 
 * @param {Function} [contentResolver] 
 * @param {object} [_attributes] 
 * @param {Text|HTMLElement|HTMLElement[]} [_content] 
 * @returns {HTMLElement}
 * @private
 */
/* istanbul ignore next */
function createElement(tagName, _validAttributes, _attributes, _content) {
    var element = createEmptyElement(tagName, _validAttributes, _attributes);

    if (!isHTMLElement(element)) {
        return null;
    }

    if (!isNullOrUndefined(_content)) {
        addContent(element, _content);
    }

    return element;
}

/**
 * Creates an element with attributes and content
 * @param {string} tagName 
 * @param {string} [_validAttributes] 
 * @param {Function} [contentResolver] 
 * @param {object} [_attributes] 
 * @param {Text|HTMLElement|HTMLElement[]} [_content] 
 * @returns {HTMLElement}
 * @private
 */
/* istanbul ignore next */
function createElementX(tagName, _validAttributes, contentResolver, _attributes, _content) {
    var element = createEmptyElement(tagName, _validAttributes, _attributes);

    if (!isHTMLElement(element)) {
        return null;
    }

    if (!isNullOrUndefined(_content)) {
        addContent(element, _content, contentResolver);
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
export const createLink = createEmptyElement.bind(null, "link", "as,crossorigin,disabled,href,hreflang,media,rel,sizes,type");

/**
 * Creates a `<template>` element with some attributes
 * @function createTemplate
 * @param {object} _attribute Global attributes
 * @param {Text|HTMLElement|HTMLElement[]} _children Content
 * @returns {HTMLTemplateElement}
 * @memberof DOM
 */
export const createTemplate = createElement.bind(null, "template", "");

/**
 * Creates a `<header>` element with some attributes
 * @function createHeader
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createHeader = createElement.bind(null, "header", "");

/**
 * Creates an `<footer>` element with some attributes
 * @function createFooter
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createFooter = createElement.bind(null, "footer", "");

/**
 * Creates an `<main>` element with some attributes
 * @function createMain
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createMain = createElement.bind(null, "main", "");

/**
 * Creates an `<article>` element with some attributes
 * @function createArticle
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createArticle = createElement.bind(null, "article", "");

/**
 * Creates an `<section>` element with some attributes
 * @function createSection
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createSection = createElement.bind(null, "section", "");

/**
 * Creates an `<nav>` element with some attributes
 * @function createNav
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createNav = createElement.bind(null, "nav", "");

/**
 * Creates an `<aside>` element with some attributes
 * @function createAside
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createAside = createElement.bind(null, "aside", "");

/**
 * Creates a `<h1>` element with some attributes
 * @function createH1
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLHeadingElement}
 * @memberof DOM
 */
export const createH1 = createElement.bind(null, "h1", "");

/**
 * Creates a `<h2>` element with some attributes
 * @function createH2
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLHeadingElement}
 * @memberof DOM
 */
export const createH2 = createElement.bind(null, "h2", "");

/**
 * Creates a `<h3>` element with some attributes
 * @function createH3
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLHeadingElement}
 * @memberof DOM
 */
export const createH3 = createElement.bind(null, "h3", "");

/**
 * Creates a `<h4>` element with some attributes
 * @function createH4
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLHeadingElement}
 * @memberof DOM
 */
export const createH4 = createElement.bind(null, "h4", "");

/**
 * Creates a `<h5>` element with some attributes
 * @function createH5
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLHeadingElement}
 * @memberof DOM
 */
export const createH5 = createElement.bind(null, "h5", "");

/**
 * Creates a `<h6>` element with some attributes
 * @function createH6
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLHeadingElement}
 * @memberof DOM
 */
export const createH6 = createElement.bind(null, "h6", "");

/**
 * Creates a `<div>` element with some attributes
 * @function createDiv
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLDivElement}
 * @memberof DOM
 */
export const createDiv = createElement.bind(null, "div", "");

/**
 * Creates a `<object>` element with some attributes
 * @function createObject
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLObjectElement}
 * @memberof DOM
 */
export const createObject = createElement.bind(null, "object", "data,height,name,type,usemap,width");

/**
 * Creates a `<embed>` element with some attributes
 * @function createEmbed
 * @param {object} _attribute 
 * @returns {HTMLEmbedElement}
 * @memberof DOM
 */
export const createEmbed = createEmptyElement.bind(null, "embed", "height,src,type,width");

/**
 * Creates a `<br>` element \
 * Line break (carriage-return)
 * @function createLineBreak
 * @returns {HTMLBRElement}
 * @memberof DOM
 */
export const createLineBreak = createEmptyElement.bind(null, "br", "");

/**
 * Creates a `<hr>` element \
 * Thematic break
 * @function createThematicBreak
 * @returns {HTMLHRElement}
 * @memberof DOM
 */
export const createThematicBreak = createEmptyElement.bind(null, "hr", "");

/**
 * Creates a `<p>` element with some attributes
 * @function createParagraph
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLParagraphElement}
 * @memberof DOM
 */
export const createParagraph = createElement.bind(null, "p", "");


/**
 * Creates a `<blockquote>` element with some attributes
 * @function createBlockQuotation
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLQuoteElement}
 * @memberof DOM
 */
export const createBlockQuotation = createElement.bind(null, "blockquote", "cite");

const listItemResolver = (item) => isHTMLElement(item, "li") ? item : createListItem(null, item);

/**
 * Creates a `<ul>` element with some attributes
 * @function createUnorderedList
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLUListElement}
 * @memberof DOM
 */
export const createUnorderedList = createElementX.bind(null, "ul", "", listItemResolver);

/**
 * Creates a `<ol>` element with some attributes
 * @function createOrderedList
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLOListElement}
 * @memberof DOM
 */
export const createOrderedList = createElementX.bind(null, "ol", "reversed,start,type", listItemResolver);

/**
 * Creates a `<li>` element with some attributes
 * @function createListItem
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLLIElement}
 * @memberof DOM
 */
export const createListItem = createElement.bind(null, "li", "value");


// const descriptionContentResolver = (item) => isHTMLElement(item, ["dt", "dd"]) ? item : createListItem(null, item);

/**
 * Creates a `<dl>` element with some attributes
 * @function createDescriptionList
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLDListElement}
 * @memberof DOM
 */
export const createDescriptionList = createElement.bind(null, "dl", "");

/**
 * Creates a `<dt>` element with some attributes
 * @function createDescriptionTerm
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createDescriptionTerm = createElement.bind(null, "dt", "");

/**
 * Creates a `<dd>` element with some attributes
 * @function createDescriptionDetails
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createDescriptionDetails = createElement.bind(null, "dd", "");

// Inline Element
//-----------------------------------------------------------------------------

/**
 * Creates an `<a>` element with some attributes
 * @function createAnchor
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLAnchorElement}
 * @memberof DOM
 */
export const createAnchor = createElement.bind(null, "a", "download,href,hreflang,ping,rel,target,type");

/**
 * Creates an `<area>` element with some attributes
 * @function createArea
 * @param {object} _attribute 
 * @returns {HTMLAreaElement}
 * @memberof DOM
 */
export const createArea = createEmptyElement.bind(null, "area", "alt,coords,download,href,hreflang,media,ping,rel,shape,target");

/**
 * Creates an `<base>` element with some attributes
 * @function createBase
 * @param {object} _attribute 
 * @returns {HTMLBaseElement}
 * @memberof DOM
 */
export const createBase = createEmptyElement.bind(null, "base", "href,target");

/**
  * Creates a `<img>` element with some attributes
  * @function createImage
  * @param {object} _attribute 
  * @returns {HTMLImageElement}
  * @memberof DOM
  */
export const createImage = createEmptyElement.bind(null, "img", "alt,crossorigin,decoding,height,ismap,loading,sizes,src,srcset,usemap,width");

/**
  * Creates a `<audio>` element with some attributes
  * @function createAudio
  * @param {object} _attribute
  * @param {Text|HTMLElement|HTMLElement[]} _children
  * @returns {HTMLAudioElement}
  * @memberof DOM
  */
export const createAudio = createElement.bind(null, "audio", "autoplay,controls,crossorigin,loop,muted,preload,src");

/**
  * Creates a `<video>` element with some attributes
  * @function createVideo
  * @param {object} _attribute 
  * @param {Text|HTMLElement|HTMLElement[]} _children 
  * @returns {HTMLVideoElement}
  * @memberof DOM
  */
export const createVideo = createElement.bind(null, "video", "autoplay,controls,crossorigin,height,loop,muted,playsinline,poster,preload,src,width");

/**
 * Creates a `<source>` element with some attributes
 * @function createSource
 * @param {object} _attribute
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLSourceElement}
 * @memberof DOM
 */
export const createSource = createEmptyElement.bind(null, "source", "media,sizes,src,srcset,type");

/**
 * Creates a `<track>` element with some attributes
 * @function createTrack
 * @param {object} _attribute 
 * @returns {HTMLTrackElement}
 * @memberof DOM
 */
export const createTrack = createEmptyElement.bind(null, "track", "default,kind,label,src,srclang");

/**
 * Creates a `<picture>` element with some attributes
 * @function createPicture
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLPictureElement}
 * @memberof DOM
 */
export const createPicture = createElement.bind(null, "picture", "");

/**
 * Creates a `<figure>` element with some attributes
 * @function createFigure
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createFigure = createElement.bind(null, "figure", "");

/**
 * Creates a `<figcaption>` element with some attributes
 * @function createFigureCaption
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createFigureCaption = createElement.bind(null, "figcaption", "");

/**
 * Creates a `<span>` element with some attributes
 * @function createSpan
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLSpanElement}
 * @memberof DOM
 */
export const createSpan = createElement.bind(null, "span", "");

/**
 * Creates a `<strong>` element with some attributes
 * @function createStrong
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createStrong = createElement.bind(null, "strong", "");

/**
 * Creates a `<em>` element with some attributes
 * @function createEmphasis
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createEmphasis = createElement.bind(null, "em", "");

/**
 * Creates a `<mark>` element with some attributes
 * @function createMark
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createMark = createElement.bind(null, "mark", "");

/**
 * Creates a `<samp>` element with some attributes
 * @function createSample
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createSample = createElement.bind(null, "samp", "");

/**
 * Creates a `<sub>` element with some attributes
 * @function createSubscript
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createSubscript = createElement.bind(null, "sub", "");

/**
 * Creates a `<sup>` element with some attributes
 * @function createSuperscript
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createSuperscript = createElement.bind(null, "sup", "");

/**
 * Creates a `<del>` element with some attributes
 * @function createDeletedPart
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLModElement}
 * @memberof DOM
 */
export const createDeletedPart = createElement.bind(null, "del", "cite,datetime");

/**
 * Creates a `<ins>` element with some attributes
 * @function createInsertedPart
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLModElement}
 * @memberof DOM
 */
export const createInsertedPart = createElement.bind(null, "ins", "cite,datetime");

/**
 * Creates a `<q>` element with some attributes
 * @function createQuote
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLQuoteElement}
 * @memberof DOM
 */
export const createQuote = createElement.bind(null, "q", "cite");

/**
 * Creates a `<abbr>` element with some attributes
 * @function createAbbreviation
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createAbbreviation = createElement.bind(null, "abbr", "");

/**
 * Creates a `<b>` element with some attributes
 * @function createB
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createB = createElement.bind(null, "b", "");

/**
 * Creates a `<i>` element with some attributes
 * @function createI
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createI = createElement.bind(null, "i", "");

/**
 * Creates a `<s>` element with some attributes
 * @function createS
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createS = createElement.bind(null, "s", "");

/**
 * Creates a `<u>` element with some attributes
 * @function createU
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createU = createElement.bind(null, "u", "");

/**
 * Creates a `<cite>` element with some attributes
 * @function createCite
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createCite = createElement.bind(null, "cite", "");

/**
 * Creates a `<time>` element with optionally some attributes
 * @function createTime
 * @param {object} _attribute 
 * @returns {HTMLTimeElement}
 * @memberof DOM
 */
export const createTime = createElement.bind(null, "time", "datetime");

/**
 * Creates a `<code>` element with some attributes
 * @function createCode
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createCode = createElement.bind(null, "code", "");

/**
 * Creates a `<form>` element with some attributes
 * @function createForm
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLFormElement}
 * @memberof DOM
 */
export const createForm = createElement.bind(null, "form", "accept-charset,action,autocomplete,enctype,method,name,novalidate,rel,target");

const inputTypes = ["button", "checkbox", "color", "date", "datetime-local", "email", "file",
    "hidden", "image", "month", "number", "password", "radio", "range", "reset",
    "search", "submit", "tel", "text", "time", "url", "week"];

/**
 * Creates an `<input>` element with some attributes
 * @function createInput
 * @param {object} _attribute 
 * @returns {HTMLInputElement}
 * @memberof DOM
 */
export const createInput = createEmptyElement.bind(null, "input", "accept,alt,autocomplete,autofocus,capture,checked,dirname,disabled,height,max,maxlength,minlength,min,multiple,name,pattern,placeholder,readonly,required,size,src,step,type,value,width");

/**
 * Creates a `<textarea>` element with some attributes
 * @function createTextArea
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLTextAreaElement}
 * @memberof DOM
 */
export const createTextArea = createElement.bind(null, "textarea", "autocomplete,autofocus,cols,disabled,maxlength,minlength,name,placeholder,readonly,required,rows,spellcheck,value,wrap");

/**
 * Creates a `<label>` element with some attributes
 * @function createLabel
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLLabelElement}
 * @memberof DOM
 */
export const createLabel = createElement.bind(null, "label", "for");

/**
 * Resolves a select element content
 * @param {*} item 
 * @returns {HTMLOptionElement|HTMLOptGroupElement}
 */
const selectContentResolver = (item) => {
    if (isHTMLElement(item, ["option", "optgroup"])) {
        return item;
    }

    if (Array.isArray(item)) {
        return createOptionGroup(null, item);
    }

    return createOption(null, item);
};

/**
 * Creates a `<select>` element with some attributes
 * @function createSelect
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLSelectElement}
 * @memberof DOM
 */
export const createSelect = createElementX.bind(null, 'select', "autocomplete,autofocus,disabled,multiple,name,required,size", selectContentResolver);

/**
 * Creates a `<option>` element with some attributes
 * @function createOption
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLOptionElement}
 * @memberof DOM
 */
export const createOption = createElement.bind(null, "option", "disabled,label,selected,value");

const optiongroupContentResolver = (item) => isHTMLElement(item, "option") ? item : createOption(null, item);

/**
 * Creates a `<optgroup>` element with some attributes
 * @function createOptionGroup
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLOptGroupElement}
 * @memberof DOM
 */
export const createOptionGroup = createElementX.bind(null, "optgroup", "disabled,label", optiongroupContentResolver);

/**
 * Creates a `<fieldset>` element with some attributes
 * @function createFieldset
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLFieldSetElement}
 * @memberof DOM
 */
export const createFieldset = createElement.bind(null, "fieldset", "disabled,name");

/**
 * Creates a `<legend>` element with some attributes
 * @function createLegend
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLLabelElement}
 * @memberof DOM
 */
export const createLegend = createElement.bind(null, "legend", "");

/**
 * Creates a `<datalist>` element with some attributes
 * @function createDataList
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLTextAreaElement}
 * @memberof DOM
 */
export const createDataList = createElementX.bind(null, "datalist", "", optiongroupContentResolver);

/**
 * Creates a `<meter>` element with some attributes
 * @function createMeter
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLTextAreaElement}
 * @memberof DOM
 */
export const createMeter = createElement.bind(null, "meter", "high,low,max,min,optimum,value");

/**
 * Creates a `<progress>` element with some attributes
 * @function createProgress
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLTextAreaElement}
 * @memberof DOM
 */
export const createProgress = createElement.bind(null, "progress", "max,value");

/**
 * Creates a `<output>` element with optionally some attributes and children elements
 * @function createOutput
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLTextAreaElement}
 * @memberof DOM
 */
export const createOutput = createElement.bind(null, "output", "name,value");

const buttonTypes = ["button", "submit", "reset"];

/**
 * Creates a `<button>` element with optionally some attributes and children elements
 * @function createButton
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLButtonElement}
 * @memberof DOM
 */
export const createButton = createElement.bind(null, "button", "autofocus,disabled,formaction,formenctype,formmethod,formnovalidate,formtarget,name,type,value");

/**
 * Creates a `<table>` element with some attributes
 * @function createTable
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLTableElement}
 * @memberof DOM
 */
export const createTable = createElement.bind(null, "table", "");

/**
 * Creates a `<caption>` element with some attributes
 * @function createCaption
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLTableCaptionElement}
 * @memberof DOM
 */
export const createCaption = createElement.bind(null, "caption", "");

const tablerowContentResolver = (item) => isHTMLElement(item, "tr") ? item : createTableRow(null, item);

/**
 * Creates a `<thead>` element with some attributes
 * @function createTableHeader
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLTableSectionElement}
 * @memberof DOM
 */
export const createTableHeader = createElementX.bind(null, "thead", "", tablerowContentResolver);

/**
 * Creates a `<tbody>` element with some attributes
 * @function createTableBody
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLTableSectionElement}
 * @memberof DOM
 */
export const createTableBody = createElementX.bind(null, "tbody", "", tablerowContentResolver);

/**
 * Creates a `<tfoot>` element with some attributes
 * @function createTableFooter
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLTableSectionElement}
 * @memberof DOM
 */
export const createTableFooter = createElementX.bind(null, "tfoot", "", tablerowContentResolver);

/**
 * Creates a `<col>` element with some attributes
 * @function createTableColumn
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLTableColElement}
 * @memberof DOM
 */
export const createTableColumn = createEmptyElement.bind(null, "col", "span");

const tablecolContentResolver = (item) => isHTMLElement(item, "col") ? item : null;

/**
 * Creates a `<colgroup>` element with some attributes
 * @function createTableColumnGroup
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLTableColElement}
 * @memberof DOM
 */
export const createTableColumnGroup = createElementX.bind(null, "colgroup", "span", tablecolContentResolver);

const tablecellContentResolver = (item) => isHTMLElement(item, ["th", "td"]) ? item : createTableCell(null, item);

/**
 * Creates a `<tr>` element with some attributes
 * @function createTableRow
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLTableRowElement}
 * @memberof DOM
 */
export const createTableRow = createElementX.bind(null, "tr", "", tablecellContentResolver);

/**
 * Creates a `<th>` element with some attributes
 * @function createTableHeaderCell
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLTableCellElement}
 * @memberof DOM
 */
export const createTableHeaderCell = createElement.bind(null, "th", "abbr,colspan,rowspan,scope");

/**
 * Creates a `<td>` element with some attributes
 * @function createTableCell
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLTableCellElement}
 * @memberof DOM
 */
export const createTableCell = createElement.bind(null, "td", "colspan,rowspan");

/**
 * Appends the children to the element
 * @param {Node} element element
 * @param {HTMLCollection} content children elements
 * @private
 * @memberof DOM
 */
/* istanbul ignore next */
function addContent(element, content, resolver) {
    var children = Array.isArray(content) ? content : [content];

    if (isFunction(resolver)) {
        children = children.map(child => resolver(child));
    }

    appendChildren(element, children);

    return element;
}