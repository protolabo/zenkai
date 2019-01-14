/** @module dom/dom-create */

import { addClass, appendChildren } from './dom-manip.js';
import { disable } from './dom-effects.js';

/** @type {document} */
const DOC = typeof module !== 'undefined' && module.exports ? {} : document;

/**
 * Creates the element for the specified tagName
 * @param {string} tagName element
 * @returns {HTMLElement}
 */
export function createElement(tagName, eId, eClass) {
    var el = DOC.createElement(tagName);
    if (eId) {
        el.id = eId;
    }
    if (eClass) {
        addClass(el, eClass);
    }

    return el;
}

/**
 * Creates a document fragment
 */
export function createDocFragment() { return DOC.createDocumentFragment(); }

export function createLineBreak() { return createElement('br'); }

export function createTextNode(str) { return DOC.createTextNode(str); }
/**
 * Creates a <link> element with some attributes
 * @param {string} rel 
 * @param {string} href 
 * @param {object} attr 
 */
export function createLink(rel, href, attr) {
    var link = createElement("link");
    link.rel = rel;
    link.href = href;

    if (attr) {
        addAttributes(link, attr);
    }

    return link;
}

/**
 * Creates an <a> (hyperlink) element with some attributes
 * @param {string} href URL or a URL fragment that the hyperlink points to
 * @param {Object} [attr] attributes
 * @returns {HTMLAnchorElement}
 */
export function createAnchor(href, attr) {
    var a = createElement('a');
    if (href) {
        a.href = href;
    }
    if (attr) {
        addAttributes(a, attr);
    }

    return a;
}

/**
  * Creates a <img> element with some attributes
  * @param {string} src
  * @param {string} alt
  * @param {Object} [attr] attributes
  * @returns {HTMLImageElement}
  */
export function createImage(src, alt, attr) {
    var img = createElement('img');

    if (src) {
        img.src = src;
    }
    if (alt) {
        img.alt = alt;
    }
    if (attr) {
        addAttributes(img, attr);
    }

    return img;
}

/**
 * Creates a <div> element with some attributes
 * @param {Object} [attr] attributes
 * @returns {HTMLDivElement}
 */
export function createDiv(attr) {
    var div = createElement("div");

    if (attr) {
        addAttributes(div, attr);
    }

    return div;
}

/**
 * Creates a <div> element with some attributes
 * @param {Object} [attr] attributes
 * @ignore
 */
function createDivX(attr, children) {
    var div = createDiv(attr);

    if (Array.isArray(children)) {
        appendChildren(div, children);
    } else if (children instanceof Element) {
        div.appendChild(children);
    }

    return div;
}

/**
 * Creates a <h[1..6]> (heading) element with some attributes
 * @param {string} lvl Level
 * @param {Object} [attr] attributes
 * @returns {HTMLHeadingElement}
 */
export function createHeading(lvl, attr) {
    var h = createElement(lvl);

    if (attr) {
        addAttributes(h, attr);
    }

    return h;
}

/**
 * Creates an `<aside>` element with some attributes
 * @param {Object} [attr] attributes
 * @returns {HTMLElement}
 */
export function createAside(attr) {
    var aside = createElement('aside');

    if (attr) {
        addAttributes(aside, attr);
    }

    return aside;
}

/**
 * Creates a <ul> element with some attributes
 * @param {Object} [attr] attributes
 * @returns {HTMLUListElement}
 */
export function createUl(attr) {
    var ul = createElement("ul");

    if (attr) {
        addAttributes(ul, attr);
    }

    return ul;
}

/**
 * Creates a <li> element with some attributes
 * @param {Object} [attr] attributes
 */
export function createLi(attr, el) {
    var li = this.createElement('li');

    if (attr) {
        this.addAttributes(li, attr);
    }

    if (Array.isArray(el)) {
        appendChildren(li, el);
    } else if (el instanceof Element) {
        li.appendChild(el);
    }

    return li;
}

/**
 * Creates a <p> element with some attributes
 * @param {Object} [attr] attributes
 * @returns {HTMLParagraphElement}
 */
export function createP(attr) {
    var p = createElement("p");

    if (attr) {
        addAttributes(p, attr);
    }

    return p;
}

export function createHeader(attr) {
    var header = createElement('header');

    if (attr) {
        addAttributes(header, attr);
    }

    return header;
}

/**
 * Creates a <input.checkbox> element with some attributes
 * @param {Object} [attr] attributes
 * @returns {HTMLInputElement}
 */
export function createCheckbox(attr) {
    var chk = createElement("input");
    chk.type = "checkbox";

    if (attr) {
        addAttributes(chk, attr);
    }

    return chk;
}

/**
 * Creates a <input:hidden> element with some attributes
 * @param {Object} [attr] attributes
 * @returns {HTMLInputElement}
 */
export function createHiddenInput(attr) {
    var input = createElement('input');
    input.type = 'hidden';

    if (attr) {
        addAttributes(input, attr);
    }

    return input;
}

/**
 * Creates a <input.file> element with some attributes
 * @param {Object} [attr] attributes
 * @returns {HTMLInputElement}
 */
export function createFileInput(attr) {
    var fileInput = this.createElement('input');
    fileInput.type = "file";

    if (attr) {
        this.addAttributes(fileInput, attr);
    }

    return fileInput;
}

/**
 * Creates a <label> element with some attributes
 * @param {Object} [attr] attributes
 * @returns {HTMLLabelElement}
 */
export function createLabel(attr) {
    var label = this.createElement('label');

    if (attr) {
        this.addAttributes(label, attr);
    }

    return label;
}

/**
 * Creates a <textarea> element with some attributes
 * @param {Object} [attr] attributes
 * @returns {HTMLTextAreaElement}
 */
export function createTextArea(attr) {
    var textArea = this.createElement('textarea');

    if (attr) {
        this.addAttributes(textArea, attr);
    }

    return textArea;
}

/**
 * Creates a <span> element with some attributes
 * @param {Object} [attr] attributes
 */
export function createSpan(attr) {
    var span = this.createElement("span");

    if (attr) {
        this.addAttributes(span, attr);
    }

    return span;
}

/**
 * Creates a <strong> element with some attributes
 * @param {Object} [attr] attributes
 */
export function createStrong(attr) {
    var strong = this.createElement("strong");

    if (attr) {
        this.addAttributes(strong, attr);
    }

    return strong;
}

/**
 * Creates a <em> element with some attributes
 * @param {Object} [attr] attributes
 */
export function createEm(attr) {
    var em = this.createElement("em");

    if (attr) {
        this.addAttributes(em, attr);
    }

    return em;
}

/**
 * Creates a <button> element with some attributes
 * @param {Object} [attr] attributes
 */
export function createButton(attr) {
    var btn = this.createElement("button");
    btn.type = "button";

    if (attr) {
        this.addAttributes(btn, attr);
    }

    return btn;
}

/**
 * Creates a <table> element with some attributes
 * @param {Object} [attr] attributes
 */
export function createTable(attr) {
    var table = this.createElement("table");

    if (attr) {
        this.addAttributes(table, attr);
    }

    return table;
}

/**
 * Creates a <thead> element with some attributes
 * @param {Object} [attr] attributes
 */
export function createTableHeader(attr) {
    var thead = this.createElement("thead");

    if (attr) {
        this.addAttributes(thead, attr);
    }

    return thead;
}

/**
 * Creates a <tbody> element with some attributes
 * @param {Object} [attr] attributes
 */
export function createTableBody(attr) {
    var tbody = this.createElement("tbody");

    if (attr) {
        this.addAttributes(tbody, attr);
    }

    return tbody;
}

/**
 * Creates a <tfoot> element with some attributes
 * @param {Object} [attr] attributes
 */
export function createTableFooter(attr) {
    var tfoot = this.createElement("tfoot");

    if (attr) {
        this.addAttributes(tfoot, attr);
    }

    return tfoot;
}

/**
 * Creates a <tr> element with some attributes
 * @param {Object} [attr] attributes
 */
export function createTableRow(attr) {
    var tr = this.createElement("tr");

    if (attr) {
        this.addAttributes(tr, attr);
    }

    return tr;
}

/**
 * Creates a <td> element with some attributes
 * @param {Object} [attr] attributes
 */
export function createTableCell(attr) {
    var td = this.createElement("td");

    if (attr) {
        this.addAttributes(td, attr);
    }

    return td;
}

/**
 * Sets the attributes of an element
 * @param {HTMLElement} el element
 * @param {Object} attr attribute
 */
export function addAttributes(el, attr) {
    const ATTR_MAP = {
        id: [assign],
        text: [assign, 'textContent'],
        html: [assign, 'innerHTML'],
        accept: [assign],
        disabled: [disable, el],
        class: [addClass, el],
        value: [assign],
        placeholder: [assign],
        readonly: [assign, 'readOnly'],
        data: [Object.assign, el.dataset]
    };
    const DEFAULT_MAP = [echo, ''];

    // HTML attributes
    for (const key of Object.keys(attr)) {
        var val = ATTR_MAP[key] || DEFAULT_MAP;
        val[0](val[1] || key, attr[key]);
    }

    function assign(key, val) {
        el[key] = val;
    }
}

function echo(o) { o; }