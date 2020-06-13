import { isNullOrUndefined, isFunction, isObject, valOrDefault, isIterable } from "@std/index.js";
import { isHTMLElement, isDocumentFragment, isNode } from "./dom-parse.js";
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


// TODO: createScript

// TODO: createStyle

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


/******************************************************************************
 * Metadata Element
 *****************************************************************************/

/**
 * Creates an `<base>` element with some attributes
 * @function createBase
 * @param {object} _attribute 
 * @returns {HTMLBaseElement}
 * @memberof DOM
 */
export const createBase = createEmptyElement.bind(null, "base", "href,target");

/**
 * Creates a `<link>` element with some attributes
 * @function createLink
 * @param {object} _attribute Global attributes
 * @returns {HTMLLinkElement}
 * @memberof DOM
 */
export const createLink = createEmptyElement.bind(null, "link", "as,crossorigin,disabled,href,hreflang,media,rel,sizes,type");

/**
 * Creates a `<meta>` element with some attributes
 * @function createLink
 * @param {object} _attribute Global attributes
 * @returns {HTMLMetaElement}
 * @memberof DOM
 */
export const createMeta = createEmptyElement.bind(null, "meta", "charset,content,http-equiv,name");

/**
 * Creates a `<title>` element with some attributes
 * @function createTemplate
 * @param {object} _attribute Global attributes
 * @param {Text|HTMLElement|HTMLElement[]} _children Content
 * @returns {HTMLTitleElement}
 * @memberof DOM
 */
export const createTitle = createElement.bind(null, "title", "html,text");

/**
 * Creates a `<template>` element with some attributes
 * @function createTemplate
 * @param {object} _attribute Global attributes
 * @param {Text|HTMLElement|HTMLElement[]} _children Content
 * @returns {HTMLTemplateElement}
 * @memberof DOM
 */
export const createTemplate = createElement.bind(null, "template", "html,text");


/******************************************************************************
 * Sectionning Element
 *****************************************************************************/

/**
 * Creates a `<header>` element with some attributes
 * @function createHeader
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createHeader = createElement.bind(null, "header", "html,text");

/**
 * Creates an `<footer>` element with some attributes
 * @function createFooter
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createFooter = createElement.bind(null, "footer", "html,text");

/**
 * Creates an `<main>` element with some attributes
 * @function createMain
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createMain = createElement.bind(null, "main", "html,text");

/**
 * Creates an `<article>` element with some attributes
 * @function createArticle
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createArticle = createElement.bind(null, "article", "html,text");

/**
 * Creates an `<section>` element with some attributes
 * @function createSection
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createSection = createElement.bind(null, "section", "html,text");

/**
 * Creates an `<nav>` element with some attributes
 * @function createNav
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createNav = createElement.bind(null, "nav", "html,text");

/**
 * Creates an `<aside>` element with some attributes
 * @function createAside
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createAside = createElement.bind(null, "aside", "html,text");


/******************************************************************************
 * Heading Element
 *****************************************************************************/

/**
 * Creates a `<h1>` element with some attributes
 * @function createH1
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLHeadingElement}
 * @memberof DOM
 */
export const createH1 = createElement.bind(null, "h1", "html,text");

/**
 * Creates a `<h2>` element with some attributes
 * @function createH2
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLHeadingElement}
 * @memberof DOM
 */
export const createH2 = createElement.bind(null, "h2", "html,text");

/**
 * Creates a `<h3>` element with some attributes
 * @function createH3
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLHeadingElement}
 * @memberof DOM
 */
export const createH3 = createElement.bind(null, "h3", "html,text");

/**
 * Creates a `<h4>` element with some attributes
 * @function createH4
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLHeadingElement}
 * @memberof DOM
 */
export const createH4 = createElement.bind(null, "h4", "html,text");

/**
 * Creates a `<h5>` element with some attributes
 * @function createH5
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLHeadingElement}
 * @memberof DOM
 */
export const createH5 = createElement.bind(null, "h5", "html,text");

/**
 * Creates a `<h6>` element with some attributes
 * @function createH6
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLHeadingElement}
 * @memberof DOM
 */
export const createH6 = createElement.bind(null, "h6", "html,text");

/**
 * Creates a `<div>` element with some attributes
 * @function createDiv
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLDivElement}
 * @memberof DOM
 */
export const createDiv = createElement.bind(null, "div", "html,text");



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
export const createParagraph = createElement.bind(null, "p", "html,text");


/**
 * Creates a `<blockquote>` element with some attributes
 * @function createBlockQuotation
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLQuoteElement}
 * @memberof DOM
 */
export const createBlockQuotation = createElement.bind(null, "blockquote", "cite,html,text");

const listItemResolver = (item) => isHTMLElement(item, "li") ? item : createListItem(null, item);

/**
 * Creates a `<ul>` element with some attributes
 * @function createUnorderedList
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLUListElement}
 * @memberof DOM
 */
export const createUnorderedList = createElementX.bind(null, "ul", "html", listItemResolver);

/**
 * Creates a `<ol>` element with some attributes
 * @function createOrderedList
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLOListElement}
 * @memberof DOM
 */
export const createOrderedList = createElementX.bind(null, "ol", "html,reversed,start,type", listItemResolver);

/**
 * Creates a `<li>` element with some attributes
 * @function createListItem
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLLIElement}
 * @memberof DOM
 */
export const createListItem = createElement.bind(null, "li", "html,text,value");


// const descriptionContentResolver = (item) => isHTMLElement(item, ["dt", "dd"]) ? item : createListItem(null, item);

/**
 * Creates a `<dl>` element with some attributes
 * @function createDescriptionList
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLDListElement}
 * @memberof DOM
 */
export const createDescriptionList = createElement.bind(null, "dl", "html");

/**
 * Creates a `<dt>` element with some attributes
 * @function createDescriptionTerm
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createDescriptionTerm = createElement.bind(null, "dt", "html,text");

/**
 * Creates a `<dd>` element with some attributes
 * @function createDescriptionDetails
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createDescriptionDetails = createElement.bind(null, "dd", "html,text");

/******************************************************************************
 * Inline Element
 *****************************************************************************/

/**
 * Creates an `<a>` element with some attributes
 * @function createAnchor
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLAnchorElement}
 * @memberof DOM
 */
export const createAnchor = createElement.bind(null, "a", "download,href,hreflang,html,ping,rel,target,text,type");

/**
 * Creates an `<area>` element with some attributes
 * @function createArea
 * @param {object} _attribute 
 * @returns {HTMLAreaElement}
 * @memberof DOM
 */
export const createArea = createEmptyElement.bind(null, "area", "alt,coords,download,href,hreflang,media,ping,rel,shape,target");


/******************************************************************************
 * Embedded Element
 *****************************************************************************/

/**
 * Creates a `<audio>` element with some attributes
 * @function createAudio
 * @param {object} _attribute
 * @param {Text|HTMLElement|HTMLElement[]} _children
 * @returns {HTMLAudioElement}
 * @memberof DOM
 */
export const createAudio = createElement.bind(null, "audio", "autoplay,controls,crossorigin,html,loop,muted,preload,src,text");

/**
 * Creates a `<img>` element with some attributes
 * @function createImage
 * @param {object} _attribute 
 * @returns {HTMLImageElement}
 * @memberof DOM
 */
export const createImage = createEmptyElement.bind(null, "img", "alt,crossorigin,decoding,height,ismap,loading,sizes,src,srcset,usemap,width");

/**
 * Creates a `<embed>` element with some attributes
 * @function createEmbed
 * @param {object} _attribute 
 * @returns {HTMLEmbedElement}
 * @memberof DOM
 */
export const createEmbed = createEmptyElement.bind(null, "embed", "height,src,type,width");

/**
 * Creates a `<figure>` element with some attributes
 * @function createFigure
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createFigure = createElement.bind(null, "figure", "html,text");

/**
 * Creates a `<figcaption>` element with some attributes
 * @function createFigureCaption
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createFigureCaption = createElement.bind(null, "figcaption", "html,text");

/**
 * Creates a `<object>` element with some attributes
 * @function createObject
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLObjectElement}
 * @memberof DOM
 */
export const createObject = createElement.bind(null, "object", "data,height,html,name,text,type,usemap,width");

/**
 * Creates a `<picture>` element with some attributes
 * @function createPicture
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLPictureElement}
 * @memberof DOM
 */
export const createPicture = createElement.bind(null, "picture", "html");

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
 * Creates a `<video>` element with some attributes
 * @function createVideo
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLVideoElement}
 * @memberof DOM
 */
export const createVideo = createElement.bind(null, "video", "autoplay,controls,crossorigin,height,html,loop,muted,playsinline,poster,preload,src,text,width");


/**
 * Creates a `<span>` element with some attributes
 * @function createSpan
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLSpanElement}
 * @memberof DOM
 */
export const createSpan = createElement.bind(null, "span", "html,text");

/**
 * Creates a `<strong>` element with some attributes
 * @function createStrong
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createStrong = createElement.bind(null, "strong", "html,text");

/**
 * Creates a `<em>` element with some attributes
 * @function createEmphasis
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createEmphasis = createElement.bind(null, "em", "html,text");

/**
 * Creates a `<mark>` element with some attributes
 * @function createMark
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createMark = createElement.bind(null, "mark", "html,text");

/**
 * Creates a `<samp>` element with some attributes
 * @function createSample
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createSample = createElement.bind(null, "samp", "html,text");

/**
 * Creates a `<sub>` element with some attributes
 * @function createSubscript
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createSubscript = createElement.bind(null, "sub", "html,text");

/**
 * Creates a `<sup>` element with some attributes
 * @function createSuperscript
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createSuperscript = createElement.bind(null, "sup", "html,text");

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
export const createQuote = createElement.bind(null, "q", "cite,html,text");

/**
 * Creates a `<abbr>` element with some attributes
 * @function createAbbreviation
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createAbbreviation = createElement.bind(null, "abbr", "html,text");

/**
 * Creates a `<b>` element with some attributes
 * @function createB
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createB = createElement.bind(null, "b", "html,text");

/**
 * Creates a `<i>` element with some attributes
 * @function createI
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createI = createElement.bind(null, "i", "html,text");

/**
 * Creates a `<s>` element with some attributes
 * @function createS
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createS = createElement.bind(null, "s", "html,text");

/**
 * Creates a `<u>` element with some attributes
 * @function createU
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createU = createElement.bind(null, "u", "html,text");

/**
 * Creates a `<cite>` element with some attributes
 * @function createCite
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createCite = createElement.bind(null, "cite", "html,text");

/**
 * Creates a `<time>` element with optionally some attributes
 * @function createTime
 * @param {object} _attribute 
 * @returns {HTMLTimeElement}
 * @memberof DOM
 */
export const createTime = createElement.bind(null, "time", "datetime,html,text");

/**
 * Creates a `<code>` element with some attributes
 * @function createCode
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLElement}
 * @memberof DOM
 */
export const createCode = createElement.bind(null, "code", "html,text");

/**
 * Creates a `<form>` element with some attributes
 * @function createForm
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLFormElement}
 * @memberof DOM
 */
export const createForm = createElement.bind(null, "form", "accept-charset,action,autocomplete,enctype,html,method,name,novalidate,rel,target,text");

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
export const createTextArea = createElement.bind(null, "textarea", "autocomplete,autofocus,cols,disabled,html,maxlength,minlength,name,placeholder,readonly,required,rows,spellcheck,text,value,wrap");

/**
 * Creates a `<label>` element with some attributes
 * @function createLabel
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLLabelElement}
 * @memberof DOM
 */
export const createLabel = createElement.bind(null, "label", "for,html,text");

/**
 * Resolves a select element content
 * @param {*} item 
 * @returns {HTMLOptionElement|HTMLOptGroupElement}
 * @private
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
export const createSelect = createElementX.bind(null, 'select', "autocomplete,autofocus,disabled,html,multiple,name,required,size", selectContentResolver);

/**
 * Creates a `<option>` element with some attributes
 * @function createOption
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLOptionElement}
 * @memberof DOM
 */
export const createOption = createElement.bind(null, "option", "disabled,html,label,selected,text,value");

const optiongroupContentResolver = (item) => isHTMLElement(item, "option") ? item : createOption(null, item);

/**
 * Creates a `<optgroup>` element with some attributes
 * @function createOptionGroup
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLOptGroupElement}
 * @memberof DOM
 */
export const createOptionGroup = createElementX.bind(null, "optgroup", "disabled,html,label", optiongroupContentResolver);

/**
 * Creates a `<fieldset>` element with some attributes
 * @function createFieldset
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLFieldSetElement}
 * @memberof DOM
 */
export const createFieldset = createElement.bind(null, "fieldset", "disabled,html,name,text");

/**
 * Creates a `<legend>` element with some attributes
 * @function createLegend
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLLabelElement}
 * @memberof DOM
 */
export const createLegend = createElement.bind(null, "legend", "html,text");

/**
 * Creates a `<datalist>` element with some attributes
 * @function createDataList
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLTextAreaElement}
 * @memberof DOM
 */
export const createDataList = createElementX.bind(null, "datalist", "html", optiongroupContentResolver);

/**
 * Creates a `<meter>` element with some attributes
 * @function createMeter
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLTextAreaElement}
 * @memberof DOM
 */
export const createMeter = createElement.bind(null, "meter", "high,html,low,max,min,optimum,text,value");

/**
 * Creates a `<progress>` element with some attributes
 * @function createProgress
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLTextAreaElement}
 * @memberof DOM
 */
export const createProgress = createElement.bind(null, "progress", "html,max,text,value");

/**
 * Creates a `<output>` element with optionally some attributes and children elements
 * @function createOutput
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLTextAreaElement}
 * @memberof DOM
 */
export const createOutput = createElement.bind(null, "output", "html,name,text,value");

const buttonTypes = ["button", "submit", "reset"];

/**
 * Creates a `<button>` element with optionally some attributes and children elements
 * @function createButton
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLButtonElement}
 * @memberof DOM
 */
export const createButton = createElement.bind(null, "button", "autofocus,disabled,formaction,formenctype,formmethod,formnovalidate,formtarget,html,name,text,type,value");

/**
 * Creates a `<table>` element with some attributes
 * @function createTable
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLTableElement}
 * @memberof DOM
 */
export const createTable = createElement.bind(null, "table", "html");

/**
 * Creates a `<caption>` element with some attributes
 * @function createCaption
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLTableCaptionElement}
 * @memberof DOM
 */
export const createCaption = createElement.bind(null, "caption", "html,text");

const tablerowContentResolver = (item) => isHTMLElement(item, "tr") ? item : createTableRow(null, item);

/**
 * Creates a `<thead>` element with some attributes
 * @function createTableHeader
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLTableSectionElement}
 * @memberof DOM
 */
export const createTableHeader = createElementX.bind(null, "thead", "html", tablerowContentResolver);

/**
 * Creates a `<tbody>` element with some attributes
 * @function createTableBody
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLTableSectionElement}
 * @memberof DOM
 */
export const createTableBody = createElementX.bind(null, "tbody", "html", tablerowContentResolver);

/**
 * Creates a `<tfoot>` element with some attributes
 * @function createTableFooter
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLTableSectionElement}
 * @memberof DOM
 */
export const createTableFooter = createElementX.bind(null, "tfoot", "html", tablerowContentResolver);

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
export const createTableColumnGroup = createElementX.bind(null, "colgroup", "html,span", tablecolContentResolver);

const tablecellContentResolver = (item) => isHTMLElement(item, ["th", "td"]) ? item : createTableCell(null, item);

/**
 * Creates a `<tr>` element with some attributes
 * @function createTableRow
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLTableRowElement}
 * @memberof DOM
 */
export const createTableRow = createElementX.bind(null, "tr", "html", tablecellContentResolver);

/**
 * Creates a `<th>` element with some attributes
 * @function createTableHeaderCell
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children 
 * @returns {HTMLTableCellElement}
 * @memberof DOM
 */
export const createTableHeaderCell = createElement.bind(null, "th", "abbr,colspan,html,rowspan,scope,text");

/**
 * Creates a `<td>` element with some attributes
 * @function createTableCell
 * @param {object} _attribute 
 * @param {Text|HTMLElement|HTMLElement[]} _children
 * @returns {HTMLTableCellElement}
 * @memberof DOM
 */
export const createTableCell = createElement.bind(null, "td", "colspan,html,rowspan,text");

/**
 * Appends the children to the element
 * @param {Node} element element
 * @param {HTMLCollection} content children elements
 * @private
 * @memberof DOM
 */
/* istanbul ignore next */
function addContent(element, content, resolver) {
    if (!(isNode(content) || isIterable(content))) {
        return element;
    }

    if (isDocumentFragment(content)) {
        element.appendChild(content);
    } else {
        let children = Array.isArray(content) ? content : [content];

        if (isFunction(resolver)) {
            children = children.map(child => resolver(child));
        }

        appendChildren(element, children);
    }

    return element;
}