// require jsdom-global and run
require('jsdom-global')();

// require chai for BDD
var expect = require('chai').expect;
var fs = require('fs');

const EMPTY_STRING = '';
const NodeType = {
    ELEMENT_NODE: 1,
    TEXT_NODE: 3,
    CDATA_SECTION_NODE: 4,
    PROCESSING_INSTRUCTION_NODE: 7,
    COMMENT_NODE: 8,
    DOCUMENT_NODE: 9,
    DOCUMENT_TYPE_NODE: 10,
    DOCUMENT_FRAGMENT_NODE: 11
};


// import our library
const {
    createElement, createDocFragment, createTextNode, createLink,
    // Sectionning element
    createHeader, createMain, createArticle, createSection, createNav, createAside, createFooter,
    createH1, createH2, createH3, createH4, createH5, createH6,
    // Content element
    createDiv, createLineBreak, createThematicBreak,
    createP, createUl, createOl, createLi,
    // Inline element
    createAnchor, createImage, createSpan, createStrong, createEm,
    // Forms element
    createForm, createFieldset, createLegend, createInput, createLabel,
    createDataList, createSelect, createOption, createOptionGroup, createTextArea,
    createMeter, createProgress, createOutput, createButton,
    // Table element
    createTable, createCaption, createTableHeader, createTableBody, createTableFooter,
    createTableColumn, createTableColumnGroup, createTableRow, createTableHeaderCell, createTableCell,
    // Helpers
    addAttributes, appendChildren
} = require('@dom/dom-create.js');

const ATTRIBUTE_MAPPER = {
    accept: 'accept',
    class: 'className',
    draggable: 'draggable',
    editable: 'contenteditable',
    html: 'innerHTML',
    id: 'id',
    placeholder: 'placeholder',
    readonly: 'readOnly',
    text: 'textContent',
    title: 'title',
    value: 'value',
};

function createAttribute() {
    const attributes = [
        'accept',
        'class',
        'draggable:boolean',
        'editable:boolean',
        'html',
        'id',
        'placeholder',
        'readonly:boolean',
        'text',
        'title',
    ];
    var result = {};
    for (let i = 0; i < attributes.length; i++) {
        if (Math.floor(Math.random() * 2) === 1) {
            var attr = attributes[i].split(':');
            result[attr[0]] = attr[1] === 'boolean' ? true : "some value";
        }
    }

    return result;
}

describe('DOM helpers', function () {
    describe('#createElement()', function () {
        it("should return an element", function () {
            var id = 'idgen';
            var className = 'fresh';
            var result = createElement('p', id, className);

            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('id', id);
            expect(result).to.have.property('className', className);
        });
        it("should return an element with an id", function () {
            var id = 'anid';
            var result = createElement('div', id);

            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('id', id);
            expect(result).to.have.property('className', EMPTY_STRING);
        });
        it("should return an element with a class", function () {
            var className = 'aclass';
            var result = createElement('span', null, className);

            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('id', EMPTY_STRING);
            expect(result).to.have.property('className', className);
        });
    });
    describe('#createDocFragment()', function () {
        it("should return a document fragment", function () {
            var result = createDocFragment();

            expect(result).to.have.property('nodeName', '#document-fragment');
            expect(result).to.have.property('nodeType', NodeType.DOCUMENT_FRAGMENT_NODE);
        });
    });
    describe('#createTextNode()', function () {
        it("should return a text node", function () {
            var result = createTextNode();

            expect(result).to.have.property('nodeName', '#text');
            expect(result).to.have.property('nodeType', NodeType.TEXT_NODE);
        });
        it("should return a text node with content", function () {
            var lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, praesentium maiores. Facilis fugiat eos beatae magni et non in accusantium provident, dignissimos facere earum quia cupiditate harum quasi nisi labore.';
            var result = createTextNode(lorem);

            expect(result).to.have.property('nodeName', '#text');
            expect(result).to.have.property('nodeType', NodeType.TEXT_NODE);
            expect(result).to.have.property('wholeText', lorem);
        });
    });
    describe('#createHeader()', function () {
        it("should return a header element", function () {
            var result = createHeader();

            expect(result).to.have.property('nodeName', 'HEADER');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a header element with the attributes set", function () {
            var attribute = createAttribute();
            var result = createHeader(attribute);

            expect(result).to.have.property('nodeName', 'HEADER');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
    });
    describe('#createDiv()', function () {
        it("should return a div element", function () {
            var result = createDiv();

            expect(result).to.have.property('nodeName', 'DIV');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a div element with the attributes set", function () {
            var attribute = createAttribute();

            var result = createDiv(attribute);

            expect(result).to.have.property('nodeName', 'DIV');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
    });
    describe('#createSection()', function () {
        it("should return a section element", function () {
            var result = createSection();

            expect(result).to.have.property('nodeName', 'SECTION');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a section element with the attributes set", function () {
            var attribute = createAttribute();

            var result = createSection(attribute);

            expect(result).to.have.property('nodeName', 'SECTION');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
    });
    describe('#createMain()', function () {
        it("should return a main element", function () {
            var result = createMain();

            expect(result).to.have.property('nodeName', 'MAIN');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a main element with the attributes set", function () {
            var attribute = createAttribute();

            var result = createMain(attribute);

            expect(result).to.have.property('nodeName', 'MAIN');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
    });
    describe('#createAside()', function () {
        it("should return an aside element", function () {
            var result = createAside();

            expect(result).to.have.property('nodeName', 'ASIDE');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return an aside element with the attributes set", function () {
            var attribute = createAttribute();

            var result = createAside(attribute);

            expect(result).to.have.property('nodeName', 'ASIDE');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
    });
    describe('#createArticle()', function () {
        it("should return an article element", function () {
            var result = createArticle();

            expect(result).to.have.property('nodeName', 'ARTICLE');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return an article element with the attributes set", function () {
            var attribute = createAttribute();

            var result = createArticle(attribute);

            expect(result).to.have.property('nodeName', 'ARTICLE');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
    });
    describe('#createNav()', function () {
        it("should return a nav element", function () {
            var result = createNav();

            expect(result).to.have.property('nodeName', 'NAV');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a nav element with the attributes set", function () {
            var attribute = createAttribute();

            var result = createNav(attribute);

            expect(result).to.have.property('nodeName', 'NAV');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
    });
    describe('#createFooter()', function () {
        it("should return a footer element", function () {
            var result = createFooter();

            expect(result).to.have.property('nodeName', 'FOOTER');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a footer element with the attributes set", function () {
            var attribute = createAttribute();

            var result = createFooter(attribute);

            expect(result).to.have.property('nodeName', 'FOOTER');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
    });
    describe('#createLineBreak()', function () {
        it("should return a line break element", function () {
            var result = createLineBreak();

            expect(result).to.have.property('nodeName', 'BR');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
    });
    describe('#createThematicBreak()', function () {
        it("should return a thematic break element", function () {
            var result = createThematicBreak();

            expect(result).to.have.property('nodeName', 'HR');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
    });
    describe('#createLink()', function () {
        it("should return a link element", function () {
            var result = createLink();

            expect(result).to.have.property('nodeName', 'LINK');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('rel', EMPTY_STRING);
            expect(result).to.have.property('href', EMPTY_STRING);
        });
        it("should return a link element with a rel", function () {
            var rel = 'stylesheet';
            var result = createLink(rel);

            expect(result).to.have.property('nodeName', 'LINK');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('rel', rel);
            expect(result).to.have.property('href', EMPTY_STRING);
        });
        it("should return a link element with an href", function () {
            var href = 'mylink';
            var result = createLink(null, href);

            expect(result).to.have.property('nodeName', 'LINK');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('rel', EMPTY_STRING);
            expect(result).to.have.property('href', href);
        });
    });
    describe('#createH1()', function () {
        it("should return a heading (level 1) element", function () {
            var result = createH1();

            expect(result).to.have.property('nodeName', 'H1');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a heading (level 1) element with the attributes set", function () {
            var attribute = createAttribute();

            var result = createH1(attribute);

            expect(result).to.have.property('nodeName', 'H1');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
    });
    describe('#createH2()', function () {
        it("should return a heading (level 2) element", function () {
            var result = createH2();

            expect(result).to.have.property('nodeName', 'H2');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a heading (level 2) element with the attributes set", function () {
            var attribute = createAttribute();

            var result = createH2(attribute);

            expect(result).to.have.property('nodeName', 'H2');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
    });
    describe('#createH3()', function () {
        it("should return a heading (level 3) element", function () {
            var result = createH3();

            expect(result).to.have.property('nodeName', 'H3');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a heading (level 3) element with the attributes set", function () {
            var attribute = createAttribute();

            var result = createH3(attribute);

            expect(result).to.have.property('nodeName', 'H3');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
    });
    describe('#createH4()', function () {
        it("should return a heading (level 4) element", function () {
            var result = createH4();

            expect(result).to.have.property('nodeName', 'H4');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a heading (level 4) element with the attributes set", function () {
            var attribute = createAttribute();

            var result = createH4(attribute);

            expect(result).to.have.property('nodeName', 'H4');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
    });
    describe('#createH5()', function () {
        it("should return a heading (level 5) element", function () {
            var result = createH5();

            expect(result).to.have.property('nodeName', 'H5');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a heading (level 5) element with the attributes set", function () {
            var attribute = createAttribute();

            var result = createH5(attribute);

            expect(result).to.have.property('nodeName', 'H5');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
    });
    describe('#createH6()', function () {
        it("should return a heading (level 6) element", function () {
            var result = createH6();

            expect(result).to.have.property('nodeName', 'H6');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a heading (level 6) element with the attributes set", function () {
            var attribute = createAttribute();

            var result = createH6(attribute);

            expect(result).to.have.property('nodeName', 'H6');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
    });
    describe('#createP()', function () {
        it("should return a paragraph element", function () {
            var result = createP();

            expect(result).to.have.property('nodeName', 'P');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a paragraph element with the attributes set", function () {
            var attribute = createAttribute();

            var result = createP(attribute);

            expect(result).to.have.property('nodeName', 'P');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
    });
    describe('#createUl()', function () {
        it("should return an unordered list element", function () {
            var result = createUl();

            expect(result).to.have.property('nodeName', 'UL');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a unordered list element with the attributes set", function () {
            var attribute = createAttribute();

            var result = createUl(attribute);

            expect(result).to.have.property('nodeName', 'UL');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
    });
    describe('#createOl()', function () {
        it("should return an ordered list element", function () {
            var result = createOl();

            expect(result).to.have.property('nodeName', 'OL');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a ordered list element with the attributes set", function () {
            var attribute = createAttribute();

            var result = createOl(attribute);

            expect(result).to.have.property('nodeName', 'OL');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
    });
    describe('#createLi()', function () {
        it("should return a list item element", function () {
            var result = createLi();

            expect(result).to.have.property('nodeName', 'LI');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a list item element with the attributes set", function () {
            var attribute = createAttribute();

            var result = createLi(attribute);

            expect(result).to.have.property('nodeName', 'LI');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
    });
    describe('#createAnchor()', function () {
        it("should return an anchor element", function () {
            var result = createAnchor();

            expect(result).to.have.property('nodeName', 'A');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return an anchor element with the attributes set", function () {
            var attribute = createAttribute();


            var result = createAnchor(null, attribute);

            expect(result).to.have.property('nodeName', 'A');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return an anchor element with a href", function () {
            var href = "alink";
            var result = createAnchor(href);

            expect(result).to.have.property('nodeName', 'A');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('href', href);
        });
    });
    describe('#createImage()', function () {
        it("should return an image element", function () {
            var result = createImage();

            expect(result).to.have.property('nodeName', 'IMG');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return an image element with the attributes set", function () {
            var attribute = createAttribute();

            var result = createImage(null, null, attribute);

            expect(result).to.have.property('nodeName', 'IMG');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return an image element with a src", function () {
            var src = "alink";

            var result = createImage(src);

            expect(result).to.have.property('nodeName', 'IMG');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('src', src);
        });
        it("should return an image element with an alt", function () {
            var alt = "an alternative text";

            var result = createImage(null, alt);

            expect(result).to.have.property('nodeName', 'IMG');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('alt', alt);
        });
    });
    describe('#createSpan()', function () {
        it("should return a span element", function () {
            var result = createSpan();

            expect(result).to.have.property('nodeName', 'SPAN');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a span element with the attributes set", function () {
            var attribute = createAttribute();

            var result = createSpan(attribute);

            expect(result).to.have.property('nodeName', 'SPAN');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
    });
    describe('#createStrong()', function () {
        it("should return a strong element", function () {
            var result = createStrong();

            expect(result).to.have.property('nodeName', 'STRONG');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a strong element with the attributes set", function () {
            var attribute = createAttribute();

            var result = createStrong(attribute);

            expect(result).to.have.property('nodeName', 'STRONG');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
    });
    describe('#createEm()', function () {
        it("should return an em element", function () {
            var result = createEm();

            expect(result).to.have.property('nodeName', 'EM');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return an em element with the attributes set", function () {
            var attribute = createAttribute();

            var result = createEm(attribute);

            expect(result).to.have.property('nodeName', 'EM');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
    });
    describe('#createForm()', function () {
        it("should return a form element", function () {
            var result = createForm();

            expect(result).to.have.property('nodeName', 'FORM');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a form element with the attributes set", function () {
            var attribute = createAttribute();

            var result = createForm(attribute);

            expect(result).to.have.property('nodeName', 'FORM');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
    });
    describe('#createFieldset()', function () {
        it("should return a fieldset element", function () {
            var result = createFieldset();

            expect(result).to.have.property('nodeName', 'FIELDSET');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a fieldset element with the attributes set", function () {
            var attribute = createAttribute();

            var result = createFieldset(attribute);

            expect(result).to.have.property('nodeName', 'FIELDSET');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
    });
    describe('#createLegend()', function () {
        it("should return a legend element", function () {
            var result = createLegend();

            expect(result).to.have.property('nodeName', 'LEGEND');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a legend element with the attributes set", function () {
            var attribute = createAttribute();

            var result = createLegend(attribute);

            expect(result).to.have.property('nodeName', 'LEGEND');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
    });
    describe('#createInput()', function () {
        it("should return an input element", function () {
            var result = createInput();

            expect(result).to.have.property('nodeName', 'INPUT');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('type', 'text');
        });
        it("should return an input element with the specified type", function () {
            var values = ["button", "checkbox", "color", "date", "datetime-local", "email", "file", "hidden", "image", "month", "number", "password", "radio", "range", "reset", "search", "submit", "tel", "text", "time", "url", "week"];
            values.forEach((val) => {
                var result = createInput[val]();

                expect(result).to.have.property('nodeName', 'INPUT');
                expect(result).to.have.property('type', val);
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            });
        });
        it("should return an input element with the attributes set", function () {
            var attribute = createAttribute();

            var result = createInput(null, attribute);

            expect(result).to.have.property('nodeName', 'INPUT');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('type', 'text');
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return an input element with  the specified type and the attributes set", function () {
            var attribute = createAttribute();

            var values = ["button", "checkbox", "color", "date", "datetime-local", "email", "file", "hidden", "image", "month", "number", "password", "radio", "range", "reset", "search", "submit", "tel", "text", "time", "url", "week"];
            values.forEach((val) => {
                var result = createInput[val](attribute);

                expect(result).to.have.property('nodeName', 'INPUT');
                expect(result).to.have.property('type', val);
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                for (const key in attribute) {
                    expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
                }
            });
        });
    });
    describe('#createLabel()', function () {
        it("should return a label element", function () {
            var result = createLabel();

            expect(result).to.have.property('nodeName', 'LABEL');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a label element with the attributes set", function () {
            var attribute = createAttribute();

            var result = createLabel(attribute);

            expect(result).to.have.property('nodeName', 'LABEL');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
    });
    describe('#createDataList()', function () {
        it("should return a datalist element", function () {
            var result = createDataList();

            expect(result).to.have.property('nodeName', 'DATALIST');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a datalist element with the attributes set", function () {
            var attribute = createAttribute();

            var result = createDataList(attribute);

            expect(result).to.have.property('nodeName', 'DATALIST');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
    });
    describe('#createSelect()', function () {
        it("should return a select element", function () {
            var result = createSelect();

            expect(result).to.have.property('nodeName', 'SELECT');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a select element with the attributes set", function () {
            var attribute = createAttribute();

            var result = createSelect(attribute);

            expect(result).to.have.property('nodeName', 'SELECT');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
    });
    describe('#createOption()', function () {
        it("should return an option element", function () {
            var result = createOption();

            expect(result).to.have.property('nodeName', 'OPTION');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return an option element with the attributes set", function () {
            var attribute = createAttribute();

            var result = createOption(attribute);

            expect(result).to.have.property('nodeName', 'OPTION');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
    });
    describe('#createOptionGroup()', function () {
        it("should return an option group element", function () {
            var result = createOptionGroup();

            expect(result).to.have.property('nodeName', 'OPTGROUP');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return an option group element with the attributes set", function () {
            var attribute = createAttribute();

            var result = createOptionGroup(attribute);

            expect(result).to.have.property('nodeName', 'OPTGROUP');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
    });
    describe('#createTextArea()', function () {
        it("should return a textarea element", function () {
            var result = createTextArea();

            expect(result).to.have.property('nodeName', 'TEXTAREA');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a textarea element with the attributes set", function () {
            var attribute = createAttribute();

            var result = createTextArea(attribute);

            expect(result).to.have.property('nodeName', 'TEXTAREA');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
    });
    describe('#createButton()', function () {
        it("should return a button element", function () {
            var result = createButton();

            expect(result).to.have.property('nodeName', 'BUTTON');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('type', 'button');
        });
        it("should return a button element with the specified type", function () {
            var values = ["submit", "reset", "button"];
            values.forEach((val) => {
                var result = createButton[val]();

                expect(result).to.have.property('nodeName', 'BUTTON');
                expect(result).to.have.property('type', val);
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            });
        });
        it("should return a button element with the attributes set", function () {
            var attribute = createAttribute();

            var result = createButton(null, attribute);

            expect(result).to.have.property('nodeName', 'BUTTON');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('type', 'button');
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a button element with  the specified type and the attributes set", function () {
            var attribute = createAttribute();

            var values = ["submit", "reset", "button"];
            values.forEach((val) => {
                var result = createButton[val](attribute);

                expect(result).to.have.property('nodeName', 'BUTTON');
                expect(result).to.have.property('type', val);
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                for (const key in attribute) {
                    expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
                }
            });
        });
    });
    describe('#createMeter()', function () {
        it("should return a meter element", function () {
            var result = createMeter();

            expect(result).to.have.property('nodeName', 'METER');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a meter element with the attributes set", function () {
            var attribute = createAttribute();

            var result = createMeter(attribute);

            expect(result).to.have.property('nodeName', 'METER');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
    });
    describe('#createProgress()', function () {
        it("should return a progress element", function () {
            var result = createProgress();

            expect(result).to.have.property('nodeName', 'PROGRESS');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a progress element with the attributes set", function () {
            var attribute = createAttribute();

            var result = createProgress(attribute);

            expect(result).to.have.property('nodeName', 'PROGRESS');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
    });
    describe('#createOutput()', function () {
        it("should return an output element", function () {
            var result = createOutput();

            expect(result).to.have.property('nodeName', 'OUTPUT');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return an output element with the attributes set", function () {
            var attribute = createAttribute();

            var result = createOutput(attribute);

            expect(result).to.have.property('nodeName', 'OUTPUT');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
    });
    // createTable, createTableHeader, createTableBody, createTableFooter,
    // createTableRow, createTableHeaderCell, createTableCell,
});