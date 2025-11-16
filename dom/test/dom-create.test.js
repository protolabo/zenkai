// require jsdom-global and run
var jsdom = require('jsdom-global');

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
    createDocFragment, createTextNode, createLink, createTemplate, createTitle, createMeta,
    // Sectionning element
    createHeader, createMain, createArticle, createSection, createNav, createAside, createFooter,
    createH1, createH2, createH3, createH4, createH5, createH6,
    // Content element
    createDiv, createLineBreak, createThematicBreak, createObject, createBlockQuotation,
    createParagraph, createUnorderedList, createOrderedList, createListItem,
    createDescriptionList, createDescriptionTerm, createDescriptionDetails,
    // Inline element
    createAnchor, createArea, createBase, createImage, createSpan, createStrong, createEmphasis,
    createMark, createSample, createSubscript, createSuperscript, createDeletedPart, createInsertedPart,
    createAbbreviation, createB, createI, createS, createU, createQuote, createCite, createTime,
    createCode, createEmbed,
    createAudio, createVideo, createSource, createTrack, createPicture, createFigure, createFigureCaption,
    // Forms element
    createForm, createFieldset, createLegend, createInput, createLabel,
    createDataList, createSelect, createOption, createOptionGroup, createTextArea,
    createMeter, createProgress, createOutput, createButton,
    // Table element
    createTable, createCaption, createTableHeader, createTableBody, createTableFooter,
    createTableColumn, createTableColumnGroup, createTableRow, createTableHeaderCell, createTableCell
} = require('@dom/dom-create.js');

const ATTRIBUTE_MAPPER = {
    accesskey: 'accessKey',
    autocapitalize: 'autocapitalize',
    class: 'className',
    draggable: 'draggable',
    editable: 'contentEditable',
    hidden: 'hidden',
    id: 'id',
    inputmode: 'inputMode',
    lang: 'lang',
    html: 'innerHTML',
    tabindex: 'tabIndex',
    text: 'textContent',
    title: 'title',
};

function random(min, max) {
    if (max == null) {
        max = min;
        min = 0;
    }

    return min + Math.floor(Math.random() * (max - min + 1));
}

function randomDigitOrLetter() {
    return random(1) ? randomDigit() : randomLetter();
}

function randomDigit() {
    return String.fromCharCode(random(48, 57));
}

function randomLetter() {
    return String.fromCharCode(random(97, 122));
}

function createAttribute() {
    const attributes = [
        'accesskey:char',
        'autocapitalize:autocapitalize',
        'class',
        'draggable:boolean',
        'editable:boolean',
        'hidden:boolean',
        'id',
        'inputmode',
        'lang',
        'tabindex:number',
        'title',
    ];

    var result = {};

    const ENUM_AUTOCAPITALIZE = ["off", "none", "on", "sentences", "words", "characters"];
    const ENUM_BOOLEAN = [true, false];

    for (let i = 0; i < attributes.length; i++) {
        if (random(1) === 1) {
            var attr = attributes[i].split(':');
            switch (attr[1]) {
                case 'autocapitalize':
                    result[attr[0]] = ENUM_AUTOCAPITALIZE[random(0, ENUM_AUTOCAPITALIZE.length - 1)];
                    break;
                case 'boolean':
                    result[attr[0]] = ENUM_BOOLEAN[random(0, ENUM_BOOLEAN.length - 1)];
                    break;
                case 'char':
                    result[attr[0]] = randomDigitOrLetter();
                    break;
                case 'number':
                    result[attr[0]] = random(1, 100);
                    break;
                default:
                    result[attr[0]] = "value";
            }
        }
    }

    return result;
}

function createTextOrHTML() {
    const attributes = ['html', 'text',];

    var result = {};

    result[attributes[random(1)]] = "value";

    return result;
}

describe('DOM create helpers', function () {
    before('initialize DOM', function () {
        const html = fs.readFileSync(`${__dirname}/template.html`, 'utf8');
        this.jsdom = jsdom(html);
    });

    after(function () {
        this.jsdom();
    });

    describe('#createDocFragment(children)', function () {
        it("should return a document fragment", function () {
            var result = createDocFragment();

            expect(result).to.have.property('nodeName', '#document-fragment');
            expect(result).to.have.property('nodeType', NodeType.DOCUMENT_FRAGMENT_NODE);
        });
        it("should return a document fragment with children", function () {
            var content = document.createElement("div");

            var result = createDocFragment(content);

            expect(result).to.have.property('nodeName', '#document-fragment');
            expect(result).to.have.property('nodeType', NodeType.DOCUMENT_FRAGMENT_NODE);
            expect(result).to.have.property('childElementCount', 1);
        });
    });

    describe('#createTextNode(children)', function () {
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

    describe('#createLink(attribute)', function () {
        it("should return a link element", function () {
            var result = createLink();

            expect(result).to.have.property('nodeName', 'LINK');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a link element with an as attribute set", function () {
            var values = ["audio", "document", "embed", "fetch", "font", "image", "object", "script", "style", "track", "video", "worker"];
            values.forEach(value => {
                var result = createLink({ as: value });

                expect(result).to.have.property('nodeName', 'LINK');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('as', value);
            });
        });
        it("should return a link element with a crossorigin attribute set", function () {
            var values = ["anonymous", "use-credentials"];
            values.forEach(value => {
                var result = createLink({ crossorigin: value });

                expect(result).to.have.property('nodeName', 'LINK');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('crossOrigin', value);
            });
        });
        it("should return a link element with a disabled attribute set", function () {
            var values = [true, false];
            values.forEach(value => {
                var result = createLink({ disabled: value });

                expect(result).to.have.property('nodeName', 'LINK');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('disabled', value);
            });
        });
        it("should return a link element with a href attribute set", function () {
            var href = "mylink";
            var result = createLink({ href: href });

            expect(result).to.have.property('nodeName', 'LINK');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('href', href);
        });
        it("should return a link element with a hreflang attribute set", function () {
            var values = ["fr", "fr-ca", "en", "en-us", "it", "ru"];
            values.forEach(value => {
                var result = createLink({ hreflang: value });

                expect(result).to.have.property('nodeName', 'LINK');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('hreflang', value);
            });
        });
        it("should return a link element with a rel attribute set", function () {
            var values = ["alternate", "author", "canonical", "help", "icon", "license", "manifest", "next", "pingback", "prefetch", "preload", "prev", "search", "shortlink", "stylesheet"];

            values.forEach(value => {
                var result = createLink({ rel: value });

                expect(result).to.have.property('nodeName', 'LINK');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('rel', value);
            });
        });
        it("should return a link element with a type attribute set", function () {
            var values = ["application/javascript", "application/json", "application/pdf", "application/xml", "application/zip", "application/x-www-form-urlencoded", "audio/mpeg", "audio/ogg", "image/gif", "image/jpeg", "image/png", "multipart/form-data", "text/css", "text/csv", "text/html", "text/plain", "text/xml"];

            values.forEach(value => {
                var result = createLink({ type: value });

                expect(result).to.have.property('nodeName', 'LINK');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('type', value);
            });
        });
    });

    describe('#createTitle(attribute)', function () {
        it("should return a title element", function () {
            var result = createTitle();

            expect(result).to.have.property('nodeName', 'TITLE');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a title element", function () {
            var attribute = createTextOrHTML();

            var result = createTitle(attribute);

            expect(result).to.have.property('nodeName', 'TITLE');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a title element with text", function () {
            var content = "lorem ipsum";

            var result = createTitle(null, content);

            expect(result).to.have.property('nodeName', 'TITLE');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('textContent', content);
        });
    });

    describe('#createMeta(attribute)', function () {
        it("should return a meta element", function () {
            var result = createMeta();

            expect(result).to.have.property('nodeName', 'META');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a meta element with a charset attribute set", function () {
            var charset = "utf-8";
            var result = createMeta({ charset: charset });

            expect(result).to.have.property('nodeName', 'META');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result.getAttribute('charset')).to.be.equal(charset);
        });
        it("should return a meta element with a content attribute set", function () {
            var content = "aDOMString";
            var result = createMeta({ content: content });

            expect(result).to.have.property('nodeName', 'META');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('content', content);
        });
        it("should return a meta element with a http-equiv attribute set", function () {
            var values = ["content-security-policy", "content-type", "default-style", "x-ua-compatible", "refresh"];

            values.forEach(value => {
                var result = createMeta({ "http-equiv": value });

                expect(result).to.have.property('nodeName', 'META');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('httpEquiv', value);
            });
        });
        it("should return a meta element with a name attribute set", function () {
            var name = "aDOMString";
            var result = createMeta({ name: name });

            expect(result).to.have.property('nodeName', 'META');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('name', name);
        });
    });

    describe('#createTemplate(attribute, children)', function () {
        it("should return a template", function () {
            var result = createTemplate();

            expect(result).to.have.property('nodeName', 'TEMPLATE');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a header element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createTemplate(attribute);

            expect(result).to.have.property('nodeName', 'TEMPLATE');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a document fragment with children", function () {
            var content = document.createElement("div");

            var result = createTemplate(null, content);

            expect(result).to.have.property('nodeName', 'TEMPLATE');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 1);
        });
    });

    describe('#createHeader(attribute, children)', function () {
        it("should return a header element", function () {
            var result = createHeader();

            expect(result).to.have.property('nodeName', 'HEADER');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a header element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createHeader(attribute);

            expect(result).to.have.property('nodeName', 'HEADER');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a header element with children", function () {
            var content = document.createElement("div");

            var result = createHeader(null, content);

            expect(result).to.have.property('nodeName', 'HEADER');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 1);
        });
    });

    describe('#createFooter(attribute, children)', function () {
        it("should return a footer element", function () {
            var result = createFooter();

            expect(result).to.have.property('nodeName', 'FOOTER');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a footer element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createFooter(attribute);

            expect(result).to.have.property('nodeName', 'FOOTER');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a footer element with children", function () {
            var content = document.createElement("div");

            var result = createFooter(null, content);

            expect(result).to.have.property('nodeName', 'FOOTER');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 1);
        });
    });

    describe('#createSection(attribute, children)', function () {
        it("should return a section element", function () {
            var result = createSection();

            expect(result).to.have.property('nodeName', 'SECTION');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a section element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createSection(attribute);

            expect(result).to.have.property('nodeName', 'SECTION');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a section element with children", function () {
            var content = document.createElement("div");

            var result = createSection(null, content);

            expect(result).to.have.property('nodeName', 'SECTION');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 1);
        });
    });

    describe('#createMain(attribute, children)', function () {
        it("should return a main element", function () {
            var result = createMain();

            expect(result).to.have.property('nodeName', 'MAIN');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a main element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createMain(attribute);

            expect(result).to.have.property('nodeName', 'MAIN');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a main element with children", function () {
            var content = document.createElement("div");

            var result = createMain(null, content);

            expect(result).to.have.property('nodeName', 'MAIN');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 1);
        });
    });

    describe('#createAside(attribute, children)', function () {
        it("should return an aside element", function () {
            var result = createAside();

            expect(result).to.have.property('nodeName', 'ASIDE');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return an aside element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createAside(attribute);

            expect(result).to.have.property('nodeName', 'ASIDE');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a aside element with children", function () {
            var content = document.createElement("div");

            var result = createAside(null, content);

            expect(result).to.have.property('nodeName', 'ASIDE');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 1);
        });
    });

    describe('#createArticle(attribute, children)', function () {
        it("should return an article element", function () {
            var result = createArticle();

            expect(result).to.have.property('nodeName', 'ARTICLE');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return an article element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createArticle(attribute);

            expect(result).to.have.property('nodeName', 'ARTICLE');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a article element with children", function () {
            var content = document.createElement("div");

            var result = createArticle(null, content);

            expect(result).to.have.property('nodeName', 'ARTICLE');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 1);
        });
    });

    describe('#createNav(attribute, children)', function () {
        it("should return a nav element", function () {
            var result = createNav();

            expect(result).to.have.property('nodeName', 'NAV');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a nav element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createNav(attribute);

            expect(result).to.have.property('nodeName', 'NAV');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a nav element with children", function () {
            var content = document.createElement("div");

            var result = createNav(null, content);

            expect(result).to.have.property('nodeName', 'NAV');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 1);
        });
    });

    describe('#createLineBreak(attribute)', function () {
        it("should return a line break element", function () {
            var result = createLineBreak();

            expect(result).to.have.property('nodeName', 'BR');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return an line break element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createLineBreak(attribute);

            expect(result).to.have.property('nodeName', 'BR');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
    });

    describe('#createThematicBreak(attribute)', function () {
        it("should return a thematic break element", function () {
            var result = createThematicBreak();

            expect(result).to.have.property('nodeName', 'HR');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return an thematic break element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createThematicBreak(attribute);

            expect(result).to.have.property('nodeName', 'HR');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
    });

    describe('#createH1(attribute, children)', function () {
        it("should return a heading (level 1) element", function () {
            var result = createH1();

            expect(result).to.have.property('nodeName', 'H1');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a heading (level 1) element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createH1(attribute);

            expect(result).to.have.property('nodeName', 'H1');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a heading (level 1) element with children", function () {
            var content = document.createElement("span");

            var result = createH1(null, content);

            expect(result).to.have.property('nodeName', 'H1');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 1);
        });
    });

    describe('#createH2(attribute, children)', function () {
        it("should return a heading (level 2) element", function () {
            var result = createH2();

            expect(result).to.have.property('nodeName', 'H2');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a heading (level 2) element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createH2(attribute);

            expect(result).to.have.property('nodeName', 'H2');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a heading (level 2) element with children", function () {
            var content = document.createElement("span");

            var result = createH2(null, content);

            expect(result).to.have.property('nodeName', 'H2');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 1);
        });
    });

    describe('#createH3(attribute, children)', function () {
        it("should return a heading (level 3) element", function () {
            var result = createH3();

            expect(result).to.have.property('nodeName', 'H3');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a heading (level 3) element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createH3(attribute);

            expect(result).to.have.property('nodeName', 'H3');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a heading (level 3) element with children", function () {
            var content = document.createElement("span");

            var result = createH3(null, content);

            expect(result).to.have.property('nodeName', 'H3');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 1);
        });
    });

    describe('#createH4(attribute, children)', function () {
        it("should return a heading (level 4) element", function () {
            var result = createH4();

            expect(result).to.have.property('nodeName', 'H4');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a heading (level 4) element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createH4(attribute);

            expect(result).to.have.property('nodeName', 'H4');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a heading (level 4) element with children", function () {
            var content = document.createElement("span");

            var result = createH4(null, content);

            expect(result).to.have.property('nodeName', 'H4');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 1);
        });
    });

    describe('#createH5(attribute, children)', function () {
        it("should return a heading (level 5) element", function () {
            var result = createH5();

            expect(result).to.have.property('nodeName', 'H5');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a heading (level 5) element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createH5(attribute);

            expect(result).to.have.property('nodeName', 'H5');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a heading (level 5) element with children", function () {
            var content = document.createElement("span");

            var result = createH5(null, content);

            expect(result).to.have.property('nodeName', 'H5');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 1);
        });
    });

    describe('#createH6(attribute, children)', function () {
        it("should return a heading (level 6) element", function () {
            var result = createH6();

            expect(result).to.have.property('nodeName', 'H6');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a heading (level 6) element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createH6(attribute);

            expect(result).to.have.property('nodeName', 'H6');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a heading (level 6) element with children", function () {
            var content = document.createElement("span");

            var result = createH6(null, content);

            expect(result).to.have.property('nodeName', 'H6');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 1);
        });
    });

    describe('#createDiv(attribute, children)', function () {
        it("should return a div element", function () {
            var result = createDiv();

            expect(result).to.have.property('nodeName', 'DIV');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a div element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createDiv(attribute);

            expect(result).to.have.property('nodeName', 'DIV');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a div element with children", function () {
            var content = document.createElement("span");

            var result = createDiv(null, content);

            expect(result).to.have.property('nodeName', 'DIV');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 1);
        });
    });

    describe('#createParagraph(attribute, children)', function () {
        it("should return a paragraph element", function () {
            var result = createParagraph();

            expect(result).to.have.property('nodeName', 'P');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a paragraph element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createParagraph(attribute);

            expect(result).to.have.property('nodeName', 'P');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a paragraph element with children", function () {
            var content = document.createElement("span");

            var result = createParagraph(null, content);

            expect(result).to.have.property('nodeName', 'P');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 1);
        });
    });

    describe('#createObject(attribute, children)', function () {
        it("should return an object element", function () {
            var result = createObject();

            expect(result).to.have.property('nodeName', 'OBJECT');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return an object element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createObject(attribute);

            expect(result).to.have.property('nodeName', 'OBJECT');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return an object element with a data attribute set", function () {
            var data = "mylink";
            var result = createObject({ data: data });

            expect(result).to.have.property('nodeName', 'OBJECT');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('data', data);
        });
        it("should return an object element with a height attribute set", function () {
            var height = "100";
            var result = createObject({ height: height });

            expect(result).to.have.property('nodeName', 'OBJECT');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('height', height);
        });
        it("should return an object element with a name attribute set", function () {
            var name = "aname";
            var result = createObject({ name: name });

            expect(result).to.have.property('nodeName', 'OBJECT');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('name', name);
        });
        it("should return an object element with a type attribute set", function () {
            var values = ["application/javascript", "application/json", "application/pdf", "application/xml", "application/zip", "application/x-www-form-urlencoded", "audio/mpeg", "audio/ogg", "image/gif", "image/jpeg", "image/png", "multipart/form-data", "text/css", "text/csv", "text/html", "text/plain", "text/xml"];

            values.forEach(value => {
                var result = createObject({ type: value });

                expect(result).to.have.property('nodeName', 'OBJECT');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('type', value);
            });
        });
        it("should return an object element with an usemap attribute set", function () {
            var usemap = '#amapid';
            var result = createObject({ usemap: usemap });

            expect(result).to.have.property('nodeName', 'OBJECT');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('useMap', usemap);
        });
        it("should return an object element with a width attribute set", function () {
            var width = "100";
            var result = createObject({ width: width });

            expect(result).to.have.property('nodeName', 'OBJECT');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('width', width);
        });
        it("should return an object element with children", function () {
            var content = document.createElement("span");

            var result = createObject(null, content);

            expect(result).to.have.property('nodeName', 'OBJECT');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 1);
        });
    });

    describe('#createEmbed(attribute)', function () {
        it("should return an embed element", function () {
            var result = createEmbed();

            expect(result).to.have.property('nodeName', 'EMBED');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return an embed element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createEmbed(attribute);

            expect(result).to.have.property('nodeName', 'EMBED');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return an embed element with a height attribute set", function () {
            var height = "100";
            var result = createEmbed({ height: height });

            expect(result).to.have.property('nodeName', 'EMBED');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('height', height);
        });
        it("should return an embed element with a src attribute set", function () {
            var src = "mylink";
            var result = createEmbed({ src: src });

            expect(result).to.have.property('nodeName', 'EMBED');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('src', src);
        });
        it("should return an embed element with a type attribute set", function () {
            var values = ["application/javascript", "application/json", "application/pdf", "application/xml", "application/zip", "application/x-www-form-urlencoded", "audio/mpeg", "audio/ogg", "image/gif", "image/jpeg", "image/png", "multipart/form-data", "text/css", "text/csv", "text/html", "text/plain", "text/xml"];

            values.forEach(value => {
                var result = createEmbed({ type: value });

                expect(result).to.have.property('nodeName', 'EMBED');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('type', value);
            });
        });
        it("should return an embed element with a width attribute set", function () {
            var width = "100";
            var result = createEmbed({ width: width });

            expect(result).to.have.property('nodeName', 'EMBED');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('width', width);
        });
    });

    describe('#createBlockQuotation(attribute, children)', function () {
        it("should return a block quotation element", function () {
            var result = createBlockQuotation();

            expect(result).to.have.property('nodeName', 'BLOCKQUOTE');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a block quotation element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createBlockQuotation(attribute);

            expect(result).to.have.property('nodeName', 'BLOCKQUOTE');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a block quotation element with a cite attribute set", function () {
            var cite = "areflink";
            var result = createBlockQuotation({ cite: cite });

            expect(result).to.have.property('nodeName', 'BLOCKQUOTE');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('cite', cite);
        });
        it("should return a block quotation element with children", function () {
            var content = document.createElement("span");

            var result = createBlockQuotation(null, content);

            expect(result).to.have.property('nodeName', 'BLOCKQUOTE');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 1);
        });
    });

    describe('#createUnorderedList(attribute, children)', function () {
        it("should return an unordered list element", function () {
            var result = createUnorderedList();

            expect(result).to.have.property('nodeName', 'UL');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return an unordered list element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createUnorderedList(attribute);

            expect(result).to.have.property('nodeName', 'UL');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return an unordered list element with children", function () {
            var contents = [
                { value: document.createElement("li"), count: 1 },
                { value: [document.createElement("li"), document.createElement("li")], count: 2 },
            ];

            contents.forEach(content => {
                var result = createUnorderedList(null, content.value);

                expect(result).to.have.property('nodeName', 'UL');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('childElementCount', content.count);
            });
        });
    });

    describe('#createOrderedList(attribute, children)', function () {
        it("should return an ordered list element", function () {
            var result = createOrderedList();

            expect(result).to.have.property('nodeName', 'OL');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return an ordered list element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createOrderedList(attribute);

            expect(result).to.have.property('nodeName', 'OL');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return an ordered list element with a reversed attribute set", function () {
            var reversed = true;
            var result = createOrderedList({ reversed: reversed });

            expect(result).to.have.property('nodeName', 'OL');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('reversed', reversed);
        });
        it("should return an ordered list element with a start attribute set", function () {
            var start = 3;
            var result = createOrderedList({ start: start });

            expect(result).to.have.property('nodeName', 'OL');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('start', start);
        });
        it("should return an ordered list element with a type attribute set", function () {
            var types = ["a", "A", "i", "I", "1"];

            types.forEach(type => {
                var result = createOrderedList({ type: type });

                expect(result).to.have.property('nodeName', 'OL');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('type', type);
            });
        });
        it("should return an unordered list element with children", function () {
            var contents = [
                { value: document.createElement("li"), count: 1 },
                { value: [document.createElement("li"), document.createElement("li")], count: 2 },
            ];

            contents.forEach(content => {
                var result = createOrderedList(null, content.value);

                expect(result).to.have.property('nodeName', 'OL');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('childElementCount', content.count);
            });
        });
    });

    describe('#createListItem(attribute, children)', function () {
        it("should return a list item element", function () {
            var result = createListItem();

            expect(result).to.have.property('nodeName', 'LI');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a list item element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createListItem(attribute);

            expect(result).to.have.property('nodeName', 'LI');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a list item element with a value attribute set", function () {
            var value = 1;

            var result = createListItem({ value: value });

            expect(result).to.have.property('nodeName', 'LI');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('value', value);
        });
        it("should return a list item element with children", function () {
            var content = document.createElement("span");

            var result = createListItem(null, content);

            expect(result).to.have.property('nodeName', 'LI');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 1);
        });
    });

    describe('#createDescriptionList(attribute, children)', function () {
        it("should return a description list element", function () {
            var result = createDescriptionList();

            expect(result).to.have.property('nodeName', 'DL');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a description list element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createDescriptionList(attribute);

            expect(result).to.have.property('nodeName', 'DL');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a description list element with children", function () {
            var content = [
                document.createElement("dt"),
                document.createElement("dd"),
            ];

            var result = createDescriptionList(null, content);

            expect(result).to.have.property('nodeName', 'DL');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 2);
        });
    });

    describe('#createDescriptionTerm(attribute, children)', function () {
        it("should return a description term element", function () {
            var result = createDescriptionTerm();

            expect(result).to.have.property('nodeName', 'DT');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a description term element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createDescriptionTerm(attribute);

            expect(result).to.have.property('nodeName', 'DT');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a description term element with children", function () {
            var content = document.createElement("span");

            var result = createDescriptionTerm(null, content);

            expect(result).to.have.property('nodeName', 'DT');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 1);
        });
    });

    describe('#createDescriptionDetails(attribute, children)', function () {
        it("should return a description details element", function () {
            var result = createDescriptionDetails();

            expect(result).to.have.property('nodeName', 'DD');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a description details element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createDescriptionDetails(attribute);

            expect(result).to.have.property('nodeName', 'DD');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a description details element with children", function () {
            var content = document.createElement("span");

            var result = createDescriptionDetails(null, content);

            expect(result).to.have.property('nodeName', 'DD');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 1);
        });
    });

    describe('#createAnchor(attribute, children)', function () {
        it("should return an anchor element", function () {
            var result = createAnchor();

            expect(result).to.have.property('nodeName', 'A');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return an anchor element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createAnchor(attribute);

            expect(result).to.have.property('nodeName', 'A');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return an anchor element with a download attribute set", function () {
            var download = "alink";
            var result = createAnchor({ download: download });

            expect(result).to.have.property('nodeName', 'A');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('download', download);
        });
        it("should return an anchor element with a href attribute set", function () {
            var href = "alink";
            var result = createAnchor({ href: href });

            expect(result).to.have.property('nodeName', 'A');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('href', href);
        });
        it("should return an anchor element with an hreflang attribute set", function () {
            var values = ["fr", "fr-ca", "en", "en-us", "it", "ru"];
            values.forEach(value => {
                var result = createAnchor({ hreflang: value });

                expect(result).to.have.property('nodeName', 'A');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('hreflang', value);
            });
        });
        it("should return an anchor element with an ping attribute set", function () {
            var ping = "mylink";
            var result = createAnchor({ ping: ping });

            expect(result).to.have.property('nodeName', 'A');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('ping', ping);
        });
        it("should return an anchor element with a rel attribute set", function () {
            var values = ["alternate", "author", "canonical", "help", "icon", "license", "manifest", "next", "pingback", "prefetch", "preload", "prev", "search", "shortlink", "stylesheet"];

            values.forEach(value => {
                var result = createAnchor({ rel: value });

                expect(result).to.have.property('nodeName', 'A');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('rel', value);
            });
        });
        it("should return an anchor element with a target attribute set", function () {
            var values = ["_self", "_blank", "_parent", "_top"];

            values.forEach(value => {
                var result = createAnchor({ target: value });

                expect(result).to.have.property('nodeName', 'A');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('target', value);
            });
        });
        it("should return an anchor element with a type attribute set", function () {
            var values = ["application/javascript", "application/json", "application/pdf", "application/xml", "application/zip", "application/x-www-form-urlencoded", "audio/mpeg", "audio/ogg", "image/gif", "image/jpeg", "image/png", "multipart/form-data", "text/css", "text/csv", "text/html", "text/plain", "text/xml"];

            values.forEach(value => {
                var result = createAnchor({ type: value });

                expect(result).to.have.property('nodeName', 'A');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('type', value);
            });
        });
        it("should return an anchor element with children", function () {
            var content = document.createElement("span");

            var result = createAnchor(null, content);

            expect(result).to.have.property('nodeName', 'A');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 1);
        });
    });

    describe('#createArea(attribute)', function () {
        it("should return an area element", function () {
            var result = createArea();

            expect(result).to.have.property('nodeName', 'AREA');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return an area element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createArea(attribute);

            expect(result).to.have.property('nodeName', 'AREA');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return an area element with a alt attribute set", function () {
            var alt = "astring";
            var result = createArea({ alt: alt });

            expect(result).to.have.property('nodeName', 'AREA');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('alt', alt);
        });
        it("should return an area element with a coords attribute set", function () {
            var coords = "3,4";
            var result = createArea({ coords: coords });

            expect(result).to.have.property('nodeName', 'AREA');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('coords', coords);
        });
        it("should return an area element with a download attribute set", function () {
            var download = "alink";
            var result = createArea({ download: download });

            expect(result).to.have.property('nodeName', 'AREA');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('download', download);
        });
        it("should return an area element with a href attribute set", function () {
            var href = "alink";
            var result = createArea({ href: href });

            expect(result).to.have.property('nodeName', 'AREA');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('href', href);
        });
        it("should return an area element with an hreflang attribute set", function () {
            var values = ["fr", "fr-ca", "en", "en-us", "it", "ru"];
            values.forEach(value => {
                var result = createArea({ hreflang: value });

                expect(result).to.have.property('nodeName', 'AREA');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('hreflang', value);
            });
        });
        it("should return an area element with an ping attribute set", function () {
            var ping = "mylink";
            var result = createArea({ ping: ping });

            expect(result).to.have.property('nodeName', 'AREA');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('ping', ping);
        });
        it("should return an area element with a rel attribute set", function () {
            var values = ["alternate", "author", "canonical", "help", "icon", "license", "manifest", "next", "pingback", "prefetch", "preload", "prev", "search", "shortlink", "stylesheet"];

            values.forEach(value => {
                var result = createArea({ rel: value });

                expect(result).to.have.property('nodeName', 'AREA');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('rel', value);
            });
        });
        it("should return an area element with a shape attribute set", function () {
            var values = ["rect", "rectangle", "circle", "poly", "polygon"];

            values.forEach(value => {
                var result = createArea({ shape: value });

                expect(result).to.have.property('nodeName', 'AREA');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('shape', value);
            });
        });
        it("should return an area element with a target attribute set", function () {
            var values = ["_self", "_blank", "_parent", "_top"];

            values.forEach(value => {
                var result = createArea({ target: value });

                expect(result).to.have.property('nodeName', 'AREA');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('target', value);
            });
        });
    });

    describe('#createBase(attribute)', function () {
        it("should return a base element", function () {
            var result = createBase();

            expect(result).to.have.property('nodeName', 'BASE');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a base element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createBase(attribute);

            expect(result).to.have.property('nodeName', 'BASE');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a base element with a href attribute set", function () {
            var href = "alink";
            var result = createBase({ href: href });

            expect(result).to.have.property('nodeName', 'BASE');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('href', href);
        });
        it("should return a base element with a target attribute set", function () {
            var values = ["_self", "_blank", "_parent", "_top"];

            values.forEach(value => {
                var result = createBase({ target: value });

                expect(result).to.have.property('nodeName', 'BASE');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('target', value);
            });
        });
    });

    describe('#createImage(attribute)', function () {
        it("should return an image element", function () {
            var result = createImage();

            expect(result).to.have.property('nodeName', 'IMG');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return an image element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createImage(attribute);

            expect(result).to.have.property('nodeName', 'IMG');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return an image element with an alt attribute set", function () {
            var alt = "an alternative text";

            var result = createImage({ alt: alt });

            expect(result).to.have.property('nodeName', 'IMG');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('alt', alt);
        });
        it("should return an image element with a crossorigin attribute set", function () {
            var values = ["anonymous", "use-credentials"];
            values.forEach(value => {
                var result = createImage({ crossorigin: value });

                expect(result).to.have.property('nodeName', 'IMG');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('crossOrigin', value);
            });
        });
        it("should return an image element with a decoding attribute set", function () {
            var values = ["sync", "async", "auto"];
            values.forEach(value => {
                var result = createImage({ decoding: value });

                expect(result).to.have.property('nodeName', 'IMG');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('decoding', value);
            });
        });
        it("should return an image element with a height attribute set", function () {
            var height = 100;
            var result = createImage({ height: height });

            expect(result).to.have.property('nodeName', 'IMG');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('height', height);
        });
        it("should return an image element with a ismap attribute set", function () {
            var ismap = true;

            var result = createImage({ ismap: ismap });

            expect(result).to.have.property('nodeName', 'IMG');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('isMap', ismap);
        });
        it("should return an image element with a loading attribute set", function () {
            var values = ["eager", "lazy"];
            values.forEach(value => {
                var result = createImage({ loading: value });

                expect(result).to.have.property('nodeName', 'IMG');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('loading', value);
            });
        });
        it("should return an image element with a src attribute set", function () {
            var src = "alink";

            var result = createImage({ src: src });

            expect(result).to.have.property('nodeName', 'IMG');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('src', src);
        });
        it("should return an image element with a srcset attribute set", function () {
            var src = "alink";

            var result = createImage({ srcset: src });

            expect(result).to.have.property('nodeName', 'IMG');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('srcset', src);
        });
        it("should return an image element with an usemap attribute set", function () {
            var usemap = '#amapid';
            var result = createImage({ usemap: usemap });

            expect(result).to.have.property('nodeName', 'IMG');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('useMap', usemap);
        });
        it("should return an image element with a width attribute set", function () {
            var width = 100;
            var result = createImage({ width: width });

            expect(result).to.have.property('nodeName', 'IMG');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('width', width);
        });
    });

    describe('#createAudio(attribute, children)', function () {
        it("should return an audio element", function () {
            var result = createAudio();

            expect(result).to.have.property('nodeName', 'AUDIO');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return an audio element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createAudio(attribute);

            expect(result).to.have.property('nodeName', 'AUDIO');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return an audio element with a autoplay attribute set", function () {
            var autoplay = true;

            var result = createAudio({ autoplay: autoplay });

            expect(result).to.have.property('nodeName', 'AUDIO');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('autoplay', autoplay);
        });
        it("should return an audio element with a controls attribute set", function () {
            var controls = true;

            var result = createAudio({ controls: controls });

            expect(result).to.have.property('nodeName', 'AUDIO');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('controls', controls);
        });
        it("should return an audio element with a crossorigin attribute set", function () {
            var values = ["anonymous", "use-credentials"];
            values.forEach(value => {
                var result = createAudio({ crossorigin: value });

                expect(result).to.have.property('nodeName', 'AUDIO');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('crossOrigin', value);
            });
        });
        it("should return an audio element with a loop attribute set", function () {
            var loop = true;

            var result = createAudio({ loop: loop });

            expect(result).to.have.property('nodeName', 'AUDIO');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('loop', loop);
        });
        it("should return an audio element with a muted attribute set", function () {
            var muted = true;

            var result = createAudio({ muted: muted });

            expect(result).to.have.property('nodeName', 'AUDIO');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('muted', muted);
        });
        it("should return an audio element with a preload", function () {
            var values = ["none", "metadata", "auto", ""];
            values.forEach(value => {
                var result = createAudio({ preload: value });

                expect(result).to.have.property('nodeName', 'AUDIO');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('preload', value);
            });
        });
        it("should return an audio element with a src attribute set", function () {
            var src = "alink";

            var result = createAudio({ src: src });

            expect(result).to.have.property('nodeName', 'AUDIO');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('src', src);
        });
        it("should return an audio element with children", function () {
            var content = [
                document.createElement("source"),
                document.createElement("track"),
            ];

            var result = createAudio(null, content);

            expect(result).to.have.property('nodeName', 'AUDIO');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 2);
        });
    });

    describe('#createVideo(attribute, children)', function () {
        it("should return a video element", function () {
            var result = createVideo();

            expect(result).to.have.property('nodeName', 'VIDEO');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a video element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createVideo(attribute);

            expect(result).to.have.property('nodeName', 'VIDEO');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a video element with a autoplay attribute set", function () {
            var autoplay = true;

            var result = createVideo({ autoplay: autoplay });

            expect(result).to.have.property('nodeName', 'VIDEO');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('autoplay', autoplay);
        });
        it("should return an video element with a controls attribute set", function () {
            var controls = true;

            var result = createVideo({ controls: controls });

            expect(result).to.have.property('nodeName', 'VIDEO');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('controls', controls);
        });
        it("should return a video element with a crossorigin attribute set", function () {
            var values = ["anonymous", "use-credentials"];
            values.forEach(value => {
                var result = createVideo({ crossorigin: value });

                expect(result).to.have.property('nodeName', 'VIDEO');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('crossOrigin', value);
            });
        });
        it("should return a video element with a height attribute set", function () {
            var height = 100;
            var result = createVideo({ height: height });

            expect(result).to.have.property('nodeName', 'VIDEO');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('height', height);
        });
        it("should return a video element with a loop attribute set", function () {
            var loop = true;

            var result = createVideo({ loop: loop });

            expect(result).to.have.property('nodeName', 'VIDEO');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('loop', loop);
        });
        it("should return a video element with a muted attribute set", function () {
            var muted = true;

            var result = createVideo({ muted: muted });

            expect(result).to.have.property('nodeName', 'VIDEO');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('muted', muted);
        });
        it("should return a video element with a playsinline attribute set", function () {
            var playsinline = true;

            var result = createVideo({ playsinline: playsinline });

            expect(result).to.have.property('nodeName', 'VIDEO');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result.getAttribute('playsinline')).to.be.equal("true");
        });
        it("should return a video element with a preload", function () {
            var values = ["none", "metadata", "auto", ""];
            values.forEach(value => {
                var result = createVideo({ preload: value });

                expect(result).to.have.property('nodeName', 'VIDEO');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('preload', value);
            });
        });
        it("should return a video element with a poster attribute set", function () {
            var poster = "alink";

            var result = createVideo({ poster: poster });

            expect(result).to.have.property('nodeName', 'VIDEO');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('poster', poster);
        });
        it("should return a video element with a src attribute set", function () {
            var src = "alink";

            var result = createVideo({ src: src });

            expect(result).to.have.property('nodeName', 'VIDEO');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('src', src);
        });
        it("should return a video element with children", function () {
            var content = [
                document.createElement("source"),
                document.createElement("track"),
            ];

            var result = createVideo(null, content);

            expect(result).to.have.property('nodeName', 'VIDEO');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 2);
        });
        it("should return a video element with a width attribute set", function () {
            var width = 100;
            var result = createVideo({ width: width });

            expect(result).to.have.property('nodeName', 'VIDEO');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('width', width);
        });
    });

    describe('#createSource(attribute)', function () {
        it("should return a source element", function () {
            var result = createSource();

            expect(result).to.have.property('nodeName', 'SOURCE');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a source element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createSource(attribute);

            expect(result).to.have.property('nodeName', 'SOURCE');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a source element with a media attribute set", function () {
            var media = "aDomString";

            var result = createSource({ media: media });

            expect(result).to.have.property('nodeName', 'SOURCE');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('media', media);
        });
        it("should return a source element with a sizes attribute set", function () {
            var sizes = "320,460";

            var result = createSource({ sizes: sizes });

            expect(result).to.have.property('nodeName', 'SOURCE');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('sizes', sizes);
        });
        it("should return a source element with a src attribute set", function () {
            var src = "alink";

            var result = createSource({ src: src });

            expect(result).to.have.property('nodeName', 'SOURCE');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('src', src);
        });
        it("should return a source element with a srcset attribute set", function () {
            var src = "alink";

            var result = createSource({ srcset: src });

            expect(result).to.have.property('nodeName', 'SOURCE');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('srcset', src);
        });
        it("should return a source element with a type attribute set", function () {
            var values = ["application/javascript", "application/json", "application/pdf", "application/xml", "application/zip", "application/x-www-form-urlencoded", "audio/mpeg", "audio/ogg", "image/gif", "image/jpeg", "image/png", "multipart/form-data", "text/css", "text/csv", "text/html", "text/plain", "text/xml"];

            values.forEach(value => {
                var result = createSource({ type: value });

                expect(result).to.have.property('nodeName', 'SOURCE');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('type', value);
            });
        });
    });

    describe('#createTrack(attribute)', function () {
        it("should return a track element", function () {
            var result = createTrack();

            expect(result).to.have.property('nodeName', 'TRACK');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a track element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createTrack(attribute);

            expect(result).to.have.property('nodeName', 'TRACK');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a track element with a default attribute set", function () {
            var deft = true;

            var result = createTrack({ default: deft });

            expect(result).to.have.property('nodeName', 'TRACK');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('default', deft);
        });
        it("should return a track element with a kind attribute set", function () {
            var values = ["subtitles", "captions", "descriptions", "chapters", "metadata"];

            values.forEach(value => {
                var result = createTrack({ kind: value });

                expect(result).to.have.property('nodeName', 'TRACK');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('kind', value);
            });
        });
        it("should return a track element with a label attribute set", function () {
            var label = "aDomString";

            var result = createTrack({ label: label });

            expect(result).to.have.property('nodeName', 'TRACK');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('label', label);
        });
        it("should return a track element with a src attribute set", function () {
            var src = "alink";

            var result = createTrack({ src: src });

            expect(result).to.have.property('nodeName', 'TRACK');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('src', src);
        });
        it("should return a track element with a srclang attribute set", function () {
            var values = ["fr", "fr-ca", "en", "en-us", "it", "ru"];

            values.forEach(value => {
                var result = createTrack({ srclang: value });

                expect(result).to.have.property('nodeName', 'TRACK');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('srclang', value);
            });
        });
    });

    describe('#createPicture(attribute, children)', function () {
        it("should return a picture element", function () {
            var result = createPicture();

            expect(result).to.have.property('nodeName', 'PICTURE');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a picture element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createPicture(attribute);

            expect(result).to.have.property('nodeName', 'PICTURE');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a picture element with children", function () {
            var content = [
                document.createElement("source"),
                document.createElement("img"),
            ];

            var result = createPicture(null, content);

            expect(result).to.have.property('nodeName', 'PICTURE');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 2);
        });
    });

    describe('#createFigure(attribute, children)', function () {
        it("should return a figure element", function () {
            var result = createFigure();

            expect(result).to.have.property('nodeName', 'FIGURE');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a figure element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createFigure(attribute);

            expect(result).to.have.property('nodeName', 'FIGURE');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a figure element with children", function () {
            var content = [
                document.createElement("figcaption"),
                document.createElement("span")
            ];

            var result = createFigure(null, content);

            expect(result).to.have.property('nodeName', 'FIGURE');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 2);
        });
    });

    describe('#createFigureCaption(attribute, children)', function () {
        it("should return a figure caption element", function () {
            var result = createFigureCaption();

            expect(result).to.have.property('nodeName', 'FIGCAPTION');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a figure caption element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createFigureCaption(attribute);

            expect(result).to.have.property('nodeName', 'FIGCAPTION');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a figure caption element with children", function () {
            var content = document.createElement("span");

            var result = createFigureCaption(null, content);

            expect(result).to.have.property('nodeName', 'FIGCAPTION');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 1);
        });
    });

    describe('#createSpan(attribute, children)', function () {
        it("should return a span element", function () {
            var result = createSpan();

            expect(result).to.have.property('nodeName', 'SPAN');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a span element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createSpan(attribute);

            expect(result).to.have.property('nodeName', 'SPAN');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a span element with children", function () {
            var content = document.createElement("span");

            var result = createSpan(null, content);

            expect(result).to.have.property('nodeName', 'SPAN');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 1);
        });
    });

    describe('#createStrong(attribute, children)', function () {
        it("should return a strong element", function () {
            var result = createStrong();

            expect(result).to.have.property('nodeName', 'STRONG');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a strong element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createStrong(attribute);

            expect(result).to.have.property('nodeName', 'STRONG');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a strong element with children", function () {
            var content = document.createElement("span");

            var result = createStrong(null, content);

            expect(result).to.have.property('nodeName', 'STRONG');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 1);
        });
    });

    describe('#createEmphasis(attribute, children)', function () {
        it("should return an emphasis element", function () {
            var result = createEmphasis();

            expect(result).to.have.property('nodeName', 'EM');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return an emphasis element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createEmphasis(attribute);

            expect(result).to.have.property('nodeName', 'EM');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return an emphasis element with children", function () {
            var content = document.createElement("span");

            var result = createEmphasis(null, content);

            expect(result).to.have.property('nodeName', 'EM');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 1);
        });
    });

    describe('#createMark(attribute, children)', function () {
        it("should return a mark element", function () {
            var result = createMark();

            expect(result).to.have.property('nodeName', 'MARK');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a mark element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createMark(attribute);

            expect(result).to.have.property('nodeName', 'MARK');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a mark element with children", function () {
            var content = document.createElement("span");

            var result = createMark(null, content);

            expect(result).to.have.property('nodeName', 'MARK');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 1);
        });
    });

    describe('#createSample(attribute, children)', function () {
        it("should return a sample element", function () {
            var result = createSample();

            expect(result).to.have.property('nodeName', 'SAMP');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a sample element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createSample(attribute);

            expect(result).to.have.property('nodeName', 'SAMP');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a sample element with children", function () {
            var content = document.createElement("span");

            var result = createSample(null, content);

            expect(result).to.have.property('nodeName', 'SAMP');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 1);
        });
    });

    describe('#createSubscript(attribute, children)', function () {
        it("should return a subscript element", function () {
            var result = createSubscript();

            expect(result).to.have.property('nodeName', 'SUB');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a subscript element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createSubscript(attribute);

            expect(result).to.have.property('nodeName', 'SUB');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a subscript element with children", function () {
            var content = document.createElement("span");

            var result = createSubscript(null, content);

            expect(result).to.have.property('nodeName', 'SUB');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 1);
        });
    });

    describe('#createSuperscript(attribute, children)', function () {
        it("should return a superscript element", function () {
            var result = createSuperscript();

            expect(result).to.have.property('nodeName', 'SUP');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a superscript element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createSuperscript(attribute);

            expect(result).to.have.property('nodeName', 'SUP');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a superscript element with children", function () {
            var content = document.createElement("span");

            var result = createSuperscript(null, content);

            expect(result).to.have.property('nodeName', 'SUP');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 1);
        });
    });

    describe('#createDeletedPart(attribute, children)', function () {
        it("should return a deleted element", function () {
            var result = createDeletedPart();

            expect(result).to.have.property('nodeName', 'DEL');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a deleted element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createDeletedPart(attribute);

            expect(result).to.have.property('nodeName', 'DEL');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a deleted element with a cite attribute set", function () {
            var cite = "areflink";
            var result = createDeletedPart({ cite: cite });

            expect(result).to.have.property('nodeName', 'DEL');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('cite', cite);
        });
        it("should return a deleted element with a datetime attribute set", function () {
            var datetime = "2019-09-11";
            var result = createDeletedPart({ datetime: datetime });

            expect(result).to.have.property('nodeName', 'DEL');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('dateTime', datetime);
        });
        it("should return a deleted element with children", function () {
            var content = document.createElement("span");

            var result = createDeletedPart(null, content);

            expect(result).to.have.property('nodeName', 'DEL');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 1);
        });
    });

    describe('#createInsertedPart(attribute, children)', function () {
        it("should return an inserted element", function () {
            var result = createInsertedPart();

            expect(result).to.have.property('nodeName', 'INS');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return an inserted element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createInsertedPart(attribute);

            expect(result).to.have.property('nodeName', 'INS');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a inserted element with a cite attribute set", function () {
            var cite = "areflink";
            var result = createInsertedPart({ cite: cite });

            expect(result).to.have.property('nodeName', 'INS');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('cite', cite);
        });
        it("should return a inserted element with a datetime attribute set", function () {
            var datetime = "2019-09-11";
            var result = createInsertedPart({ datetime: datetime });

            expect(result).to.have.property('nodeName', 'INS');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('dateTime', datetime);
        });
        it("should return a inserted element with children", function () {
            var content = document.createElement("span");

            var result = createInsertedPart(null, content);

            expect(result).to.have.property('nodeName', 'INS');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 1);
        });
    });

    describe('#createAbbreviation(attribute, children)', function () {
        it("should return an abbreviation element", function () {
            var result = createAbbreviation();

            expect(result).to.have.property('nodeName', 'ABBR');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return an abbreviation element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createAbbreviation(attribute);

            expect(result).to.have.property('nodeName', 'ABBR');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a abbreviation element with children", function () {
            var content = document.createElement("span");

            var result = createAbbreviation(null, content);

            expect(result).to.have.property('nodeName', 'ABBR');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 1);
        });
    });

    describe('#createB(attribute, children)', function () {
        it("should return a bold element", function () {
            var result = createB();

            expect(result).to.have.property('nodeName', 'B');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a bold element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createB(attribute);

            expect(result).to.have.property('nodeName', 'B');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a bold element with children", function () {
            var content = document.createElement("span");

            var result = createB(null, content);

            expect(result).to.have.property('nodeName', 'B');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 1);
        });
    });

    describe('#createI(attribute, children)', function () {
        it("should return an italic superscript element", function () {
            var result = createI();

            expect(result).to.have.property('nodeName', 'I');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return an italic element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createI(attribute);

            expect(result).to.have.property('nodeName', 'I');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return an italic element with children", function () {
            var content = document.createElement("span");

            var result = createI(null, content);

            expect(result).to.have.property('nodeName', 'I');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 1);
        });
    });

    describe('#createS(attribute, children)', function () {
        it("should return a strikethrough element", function () {
            var result = createS();

            expect(result).to.have.property('nodeName', 'S');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a strikethrough element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createS(attribute);

            expect(result).to.have.property('nodeName', 'S');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a strikethrough element with children", function () {
            var content = document.createElement("span");

            var result = createS(null, content);

            expect(result).to.have.property('nodeName', 'S');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 1);
        });
    });

    describe('#createU(attribute, children)', function () {
        it("should return an underlined element", function () {
            var result = createU();

            expect(result).to.have.property('nodeName', 'U');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return an underlined element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createU(attribute);

            expect(result).to.have.property('nodeName', 'U');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return an underlined element with children", function () {
            var content = document.createElement("span");

            var result = createU(null, content);

            expect(result).to.have.property('nodeName', 'U');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 1);
        });
    });

    describe('#createCode(attribute, children)', function () {
        it("should return a code element", function () {
            var result = createCode();

            expect(result).to.have.property('nodeName', 'CODE');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a code element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createCode(attribute);

            expect(result).to.have.property('nodeName', 'CODE');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a code element with children", function () {
            var content = document.createElement("span");

            var result = createCode(null, content);

            expect(result).to.have.property('nodeName', 'CODE');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 1);
        });
    });

    describe('#createQuote(attribute, children)', function () {
        it("should return a quote element", function () {
            var result = createQuote();

            expect(result).to.have.property('nodeName', 'Q');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a quote element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createQuote(attribute);

            expect(result).to.have.property('nodeName', 'Q');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a quote element with a cite attribute", function () {
            var cite = "areflink";
            var result = createQuote({ cite: cite });

            expect(result).to.have.property('nodeName', 'Q');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('cite', cite);
        });
        it("should return a quote element with children", function () {
            var content = document.createElement("span");

            var result = createQuote(null, content);

            expect(result).to.have.property('nodeName', 'Q');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 1);
        });
    });

    describe('#createCite(attribute, children)', function () {
        it("should return a cite element", function () {
            var result = createCite();

            expect(result).to.have.property('nodeName', 'CITE');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a cite element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createCite(attribute);

            expect(result).to.have.property('nodeName', 'CITE');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a cite element with children", function () {
            var content = document.createElement("span");

            var result = createCite(null, content);

            expect(result).to.have.property('nodeName', 'CITE');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 1);
        });
    });

    describe('#createTime(attribute, children)', function () {
        it("should return a time element", function () {
            var result = createTime();

            expect(result).to.have.property('nodeName', 'TIME');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a time element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createTime(attribute);

            expect(result).to.have.property('nodeName', 'TIME');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a time element with a datetime attribute", function () {
            var datetime = "2019-09-11";
            var result = createTime({ datetime: datetime });

            expect(result).to.have.property('nodeName', 'TIME');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('dateTime', datetime);
        });
        it("should return a time element with children", function () {
            var content = document.createElement("span");

            var result = createTime(null, content);

            expect(result).to.have.property('nodeName', 'TIME');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 1);
        });
    });

    /**
     * FORM ELEMENTS
    --------------------------------------------------------------------------- */

    describe('#createForm(attribute, children)', function () {
        it("should return a form element", function () {
            var result = createForm();

            expect(result).to.have.property('nodeName', 'FORM');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a form element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createForm(attribute);

            expect(result).to.have.property('nodeName', 'FORM');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a form element with an accept-charset attribute set", function () {
            var accept = "aDOMString";
            var result = createForm({ "accept-charset": accept });

            expect(result).to.have.property('nodeName', 'FORM');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('acceptCharset', accept);
        });
        it("should return a form element with an action attribute set", function () {
            var action = "mylink";
            var result = createForm({ action: action });

            expect(result).to.have.property('nodeName', 'FORM');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('action', action);
        });
        it("should return a form element with an autocomplete attribute set", function () {
            var values = ["on", "off"];
            values.forEach(value => {
                var result = createForm({ autocomplete: value });

                expect(result).to.have.property('nodeName', 'FORM');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('autocomplete', value);
            });
        });
        it("should return a form element with an enctype attribute set", function () {
            var values = ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"];
            values.forEach(value => {
                var result = createForm({ enctype: value });

                expect(result).to.have.property('nodeName', 'FORM');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('enctype', value);
            });
        });
        it("should return a form element with a method attribute set", function () {
            var values = ["post", "get", "dialog"];
            values.forEach(value => {
                var result = createForm({ method: value });

                expect(result).to.have.property('nodeName', 'FORM');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('method', value);
            });
        });
        it("should return a form element with a name attribute set", function () {
            var name = "astring";
            var result = createForm({ name: name });

            expect(result).to.have.property('nodeName', 'FORM');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('name', name);
        });
        it("should return a form element with a novalidate attribute set", function () {
            var values = [true, false];
            values.forEach(value => {
                var result = createForm({ novalidate: value });

                expect(result).to.have.property('nodeName', 'FORM');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('noValidate', value);
            });
        });
        it("should return a form element with a rel attribute set", function () {
            var values = ["external", "help", "license", "next", "nofollow", "noopener", "noreferrer", "opener", "prev", "search"];

            values.forEach(value => {
                var result = createForm({ rel: value });

                expect(result).to.have.property('nodeName', 'FORM');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('rel', value);
            });
        });
        it("should return a form element with a target attribute set", function () {
            var values = ["_self", "_blank", "_parent", "_top"];

            values.forEach(value => {
                var result = createForm({ target: value });

                expect(result).to.have.property('nodeName', 'FORM');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('target', value);
            });
        });
        it("should return a form element with children", function () {
            var content = document.createElement("input");

            var result = createForm(null, content);

            expect(result).to.have.property('nodeName', 'FORM');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 1);
        });
    });

    describe('#createFieldset(attribute, children)', function () {
        it("should return a fieldset element", function () {
            var result = createFieldset();

            expect(result).to.have.property('nodeName', 'FIELDSET');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a fieldset element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createFieldset(attribute);

            expect(result).to.have.property('nodeName', 'FIELDSET');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a fieldset element with a disabled attribute set", function () {
            var values = [true, false];
            values.forEach(value => {
                var result = createFieldset({ disabled: value });

                expect(result).to.have.property('nodeName', 'FIELDSET');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('disabled', value);
            });
        });
        it("should return a fieldset element with a name attribute set", function () {
            var name = "astring";
            var result = createFieldset({ name: name });

            expect(result).to.have.property('nodeName', 'FIELDSET');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('name', name);
        });
        it("should return a fieldset element with children", function () {
            var content = document.createElement("input");

            var result = createFieldset(null, content);

            expect(result).to.have.property('nodeName', 'FIELDSET');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 1);
        });
    });

    describe('#createLegend(attribute, children)', function () {
        it("should return a legend element", function () {
            var result = createLegend();

            expect(result).to.have.property('nodeName', 'LEGEND');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a legend element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createLegend(attribute);

            expect(result).to.have.property('nodeName', 'LEGEND');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a legend element with children", function () {
            var content = document.createElement("span");

            var result = createLegend(null, content);

            expect(result).to.have.property('nodeName', 'LEGEND');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 1);
        });
    });

    describe('#createInput(attribute)', function () {
        it("should return an input element", function () {
            var result = createInput();

            expect(result).to.have.property('nodeName', 'INPUT');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return an input element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createInput(attribute);

            expect(result).to.have.property('nodeName', 'INPUT');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return an input element with an accept attribute set", function () {
            var accept = "aDOMString";
            var result = createInput({ "accept": accept });

            expect(result).to.have.property('nodeName', 'INPUT');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('accept', accept);
        });
        it("should return an input element with an alt attribute set", function () {
            var alt = "aDOMString";
            var result = createInput({ alt: alt });

            expect(result).to.have.property('nodeName', 'INPUT');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('alt', alt);
        });
        it("should return an input element with an autocomplete attribute set", function () {
            var values = ["on", "off"];
            values.forEach(value => {
                var result = createInput({ autocomplete: value });

                expect(result).to.have.property('nodeName', 'INPUT');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('autocomplete', value);
            });
        });
        it("should return an input element with an autofocus attribute set", function () {
            var values = [true, false];
            values.forEach(value => {
                var result = createInput({ autofocus: value });

                expect(result).to.have.property('nodeName', 'INPUT');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('autofocus', value);
            });
        });
        it("should return an input element with an checked attribute set", function () {
            var values = [true, false];
            values.forEach(value => {
                var result = createInput({ checked: value });

                expect(result).to.have.property('nodeName', 'INPUT');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('checked', value);
            });
        });
        it("should return an input element with an disabled attribute set", function () {
            var values = [true, false];
            values.forEach(value => {
                var result = createInput({ disabled: value });

                expect(result).to.have.property('nodeName', 'INPUT');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('disabled', value);
            });
        });
        it("should return an input element with a dirname attribute set", function () {
            var dirname = "directory";
            var result = createInput({ dirname: dirname });

            expect(result).to.have.property('nodeName', 'INPUT');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('dirName', dirname);
        });
        it("should return an input element with a height attribute set", function () {
            var height = "100";
            var result = createInput({ height: height });

            expect(result).to.have.property('nodeName', 'INPUT');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('height', height);
        });
        it("should return an input element with a max attribute set", function () {
            var max = "50";
            var result = createInput({ max: max });

            expect(result).to.have.property('nodeName', 'INPUT');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('max', max);
        });
        it("should return an input element with a maxlength attribute set", function () {
            var maxlength = 50;
            var result = createInput({ maxlength: maxlength });

            expect(result).to.have.property('nodeName', 'INPUT');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('maxLength', maxlength);
        });
        it("should return an input element with a minlength attribute set", function () {
            var minlength = 50;
            var result = createInput({ minlength: minlength });

            expect(result).to.have.property('nodeName', 'INPUT');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('minLength', minlength);
        });
        it("should return an input element with a min attribute set", function () {
            var min = "50";
            var result = createInput({ min: min });

            expect(result).to.have.property('nodeName', 'INPUT');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('min', min);
        });
        it("should return an input element with a multiple attribute set", function () {
            var values = [true, false];
            values.forEach(value => {
                var result = createInput({ multiple: value });

                expect(result).to.have.property('nodeName', 'INPUT');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('multiple', value);
            });
        });
        it("should return an input element with a name attribute set", function () {
            var name = "astring";
            var result = createInput({ name: name });

            expect(result).to.have.property('nodeName', 'INPUT');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('name', name);
        });
        it("should return an input element with a pattern attribute set", function () {
            var pattern = "astring";
            var result = createInput({ pattern: pattern });

            expect(result).to.have.property('nodeName', 'INPUT');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('pattern', pattern);
        });
        it("should return an input element with a placeholder attribute set", function () {
            var placeholder = "astring";
            var result = createInput({ placeholder: placeholder });

            expect(result).to.have.property('nodeName', 'INPUT');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('placeholder', placeholder);
        });
        it("should return an input element with a readonly attribute set", function () {
            var values = [true, false];
            values.forEach(value => {
                var result = createInput({ readonly: value });

                expect(result).to.have.property('nodeName', 'INPUT');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('readOnly', value);
            });
        });
        it("should return an input element with a required attribute set", function () {
            var values = [true, false];
            values.forEach(value => {
                var result = createInput({ required: value });

                expect(result).to.have.property('nodeName', 'INPUT');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('required', value);
            });
        });
        it("should return an input element with a size attribute set", function () {
            var size = 123;
            var result = createInput({ size: size });

            expect(result).to.have.property('nodeName', 'INPUT');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('size', size);
        });
        it("should return an input element with a src attribute set", function () {
            var src = "alink";
            var result = createInput({ src: src });

            expect(result).to.have.property('nodeName', 'INPUT');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('src', src);
        });
        it("should return an input element with a step attribute set", function () {
            var step = "12";
            var result = createInput({ step: step });

            expect(result).to.have.property('nodeName', 'INPUT');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('step', step);
        });
        it("should return an input element with a type attribute set", function () {
            var values = ["button", "checkbox", "color", "date", "datetime-local", "email", "file",
                "hidden", "image", "month", "number", "password", "radio", "range", "reset",
                "search", "submit", "tel", "text", "time", "url", "week"];

            values.forEach(value => {
                var result = createInput({ type: value });

                expect(result).to.have.property('nodeName', 'INPUT');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('type', value);
            });
        });
        it("should return an input element with a value attribute set", function () {
            var value = "12";
            var result = createInput({ value: value });

            expect(result).to.have.property('nodeName', 'INPUT');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('value', value);
        });
        it("should return an input element with a width attribute set", function () {
            var width = "100";
            var result = createInput({ width: width });

            expect(result).to.have.property('nodeName', 'INPUT');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('width', width);
        });
    });

    describe('#createLabel(attribute, children)', function () {
        it("should return a label element", function () {
            var result = createLabel();

            expect(result).to.have.property('nodeName', 'LABEL');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a label element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createLabel(attribute);

            expect(result).to.have.property('nodeName', 'LABEL');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a label element with a for attribute set", function () {
            var value = "inputID";

            var result = createLabel({ for: value });

            expect(result).to.have.property('nodeName', 'LABEL');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('htmlFor', value);
        });
        it("should return a label element with children", function () {
            var content = document.createElement("span");

            var result = createLabel(null, content);

            expect(result).to.have.property('nodeName', 'LABEL');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 1);
        });
    });

    describe('#createDataList(attribute, children)', function () {
        it("should return a datalist element", function () {
            var result = createDataList();

            expect(result).to.have.property('nodeName', 'DATALIST');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a datalist element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createDataList(attribute);

            expect(result).to.have.property('nodeName', 'DATALIST');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a datalist element with children", function () {
            var contents = [
                { value: document.createElement("option"), count: 1 },
                { value: [document.createElement("option"), document.createElement("option")], count: 2 },
            ];

            contents.forEach(content => {
                var result = createDataList(null, content.value);

                expect(result).to.have.property('nodeName', 'DATALIST');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('childElementCount', content.count);
            });
        });
    });

    describe('#createSelect(attribute, children)', function () {
        it("should return a select element", function () {
            var result = createSelect();

            expect(result).to.have.property('nodeName', 'SELECT');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a select element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createSelect(attribute);

            expect(result).to.have.property('nodeName', 'SELECT');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a select element with an autocomplete attribute set", function () {
            var values = ["on", "off"];
            values.forEach(value => {
                var result = createSelect({ autocomplete: value });

                expect(result).to.have.property('nodeName', 'SELECT');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('autocomplete', value);
            });
        });
        it("should return a select element with an autofocus attribute set", function () {
            var values = [true, false];
            values.forEach(value => {
                var result = createSelect({ autofocus: value });

                expect(result).to.have.property('nodeName', 'SELECT');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('autofocus', value);
            });
        });
        it("should return a select element with an disabled attribute set", function () {
            var values = [true, false];
            values.forEach(value => {
                var result = createSelect({ disabled: value });

                expect(result).to.have.property('nodeName', 'SELECT');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('disabled', value);
            });
        });
        it("should return a select element with a multiple attribute set", function () {
            var values = [true, false];
            values.forEach(value => {
                var result = createSelect({ multiple: value });

                expect(result).to.have.property('nodeName', 'SELECT');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('multiple', value);
            });
        });
        it("should return a select element with a name attribute set", function () {
            var name = "astring";
            var result = createSelect({ name: name });

            expect(result).to.have.property('nodeName', 'SELECT');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('name', name);
        });
        it("should return a select element with a required attribute set", function () {
            var values = [true, false];
            values.forEach(value => {
                var result = createSelect({ required: value });

                expect(result).to.have.property('nodeName', 'SELECT');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('required', value);
            });
        });
        it("should return a select element with a size attribute set", function () {
            var size = 123;
            var result = createSelect({ size: size });

            expect(result).to.have.property('nodeName', 'SELECT');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('size', size);
        });
        it("should return a select element with option children", function () {
            var contents = [
                { value: document.createElement("option"), count: 1 },
                { value: [document.createElement("option"), document.createElement("option")], count: 2 },
                { value: [document.createElement("option"), document.createElement("option"), document.createElement("option")], count: 3 },
            ];

            contents.forEach(content => {
                var result = createSelect(null, content.value);

                expect(result).to.have.property('nodeName', 'SELECT');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('childElementCount', content.count);
            });
        });
    });

    describe('#createOption(attribute, children)', function () {
        it("should return an option element", function () {
            var result = createOption();

            expect(result).to.have.property('nodeName', 'OPTION');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return an option element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createOption(attribute);

            expect(result).to.have.property('nodeName', 'OPTION');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return an option element with an disabled attribute set", function () {
            var values = [true, false];
            values.forEach(value => {
                var result = createOption({ disabled: value });

                expect(result).to.have.property('nodeName', 'OPTION');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('disabled', value);
            });
        });
        it("should return an option element with a label attribute set", function () {
            var label = "DOMString";
            var result = createOption({ label: label });

            expect(result).to.have.property('nodeName', 'OPTION');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('label', label);
        });
        it("should return an option element with a selected attribute set", function () {
            var values = [true, false];
            values.forEach(value => {
                var result = createOption({ selected: value });

                expect(result).to.have.property('nodeName', 'OPTION');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('selected', value);
            });
        });
        it("should return an option element with a value attribute set", function () {
            var value = "12";
            var result = createOption({ value: value });

            expect(result).to.have.property('nodeName', 'OPTION');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('value', value);
        });
        it("should return an option element with children", function () {
            var content = "lorem ipsum";

            var result = createOption(null, content);

            expect(result).to.have.property('nodeName', 'OPTION');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('textContent', content);
        });
    });

    describe('#createOptionGroup(attribute, children)', function () {
        it("should return an option group element", function () {
            var result = createOptionGroup();

            expect(result).to.have.property('nodeName', 'OPTGROUP');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return an option group element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createOptionGroup(attribute);

            expect(result).to.have.property('nodeName', 'OPTGROUP');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return an option group element with an disabled attribute set", function () {
            var values = [true, false];
            values.forEach(value => {
                var result = createOptionGroup({ disabled: value });

                expect(result).to.have.property('nodeName', 'OPTGROUP');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('disabled', value);
            });
        });
        it("should return an option group element with a label attribute set", function () {
            var label = "DOMString";
            var result = createOptionGroup({ label: label });

            expect(result).to.have.property('nodeName', 'OPTGROUP');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('label', label);
        });
        it("should return an option group element with children", function () {
            var contents = [
                { value: document.createElement("option"), count: 1 },
                { value: [document.createElement("option"), document.createElement("option")], count: 2 },
                { value: [document.createElement("option"), document.createElement("option"), document.createElement("option")], count: 3 },
            ];

            contents.forEach(content => {
                var result = createOptionGroup(null, content.value);

                expect(result).to.have.property('nodeName', 'OPTGROUP');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('childElementCount', content.count);
            });
        });
    });

    describe('#createTextArea(attribute, children)', function () {
        it("should return a textarea element", function () {
            var result = createTextArea();

            expect(result).to.have.property('nodeName', 'TEXTAREA');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a textarea element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createTextArea(attribute);

            expect(result).to.have.property('nodeName', 'TEXTAREA');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a textarea element with an autocomplete attribute set", function () {
            var values = ["on", "off"];
            values.forEach(value => {
                var result = createTextArea({ autocomplete: value });

                expect(result).to.have.property('nodeName', 'TEXTAREA');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('autocomplete', value);
            });
        });
        it("should return a textarea element with an autofocus attribute set", function () {
            var values = [true, false];
            values.forEach(value => {
                var result = createTextArea({ autofocus: value });

                expect(result).to.have.property('nodeName', 'TEXTAREA');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('autofocus', value);
            });
        });
        it("should return a textarea element with a cols attribute set", function () {
            var cols = 100;
            var result = createTextArea({ cols: cols });

            expect(result).to.have.property('nodeName', 'TEXTAREA');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('cols', cols);
        });
        it("should return a textarea element with an disabled attribute set", function () {
            var values = [true, false];
            values.forEach(value => {
                var result = createTextArea({ disabled: value });

                expect(result).to.have.property('nodeName', 'TEXTAREA');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('disabled', value);
            });
        });
        it("should return a textarea element with a maxlength attribute set", function () {
            var maxlength = 50;
            var result = createTextArea({ maxlength: maxlength });

            expect(result).to.have.property('nodeName', 'TEXTAREA');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('maxLength', maxlength);
        });
        it("should return a textarea element with a minlength attribute set", function () {
            var minlength = 50;
            var result = createTextArea({ minlength: minlength });

            expect(result).to.have.property('nodeName', 'TEXTAREA');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('minLength', minlength);
        });
        it("should return a textarea element with a name attribute set", function () {
            var name = "astring";
            var result = createTextArea({ name: name });

            expect(result).to.have.property('nodeName', 'TEXTAREA');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('name', name);
        });
        it("should return a textarea element with a placeholder attribute set", function () {
            var placeholder = "astring";
            var result = createTextArea({ placeholder: placeholder });

            expect(result).to.have.property('nodeName', 'TEXTAREA');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('placeholder', placeholder);
        });
        it("should return a textarea element with a readonly attribute set", function () {
            var values = [true, false];
            values.forEach(value => {
                var result = createTextArea({ readonly: value });

                expect(result).to.have.property('nodeName', 'TEXTAREA');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('readOnly', value);
            });
        });
        it("should return a textarea element with a required attribute set", function () {
            var values = [true, false];
            values.forEach(value => {
                var result = createTextArea({ required: value });

                expect(result).to.have.property('nodeName', 'TEXTAREA');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('required', value);
            });
        });
        it("should return a textarea element with a rows attribute set", function () {
            var rows = 100;
            var result = createTextArea({ rows: rows });

            expect(result).to.have.property('nodeName', 'TEXTAREA');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('rows', rows);
        });
        it("should return a textarea element with a spellcheck attribute set", function () {
            var values = ["true", "default", "false"];
            values.forEach(value => {
                var result = createTextArea({ spellcheck: value });

                expect(result).to.have.property('nodeName', 'TEXTAREA');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result.getAttribute('spellcheck')).to.be.equal(value);
            });
        });
        it("should return a textarea element with a wrap attribute set", function () {
            var values = ["hard", "soft", "off"];
            values.forEach(value => {
                var result = createTextArea({ wrap: value });

                expect(result).to.have.property('nodeName', 'TEXTAREA');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('wrap', value);
            });
        });
        it("should return a textarea element with a value attribute set", function () {
            var value = "12";
            var result = createTextArea({ value: value });

            expect(result).to.have.property('nodeName', 'TEXTAREA');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('value', value);
        });
        it("should return a textarea element with children", function () {
            var content = "lorem ipsum";

            var result = createTextArea(null, content);

            expect(result).to.have.property('nodeName', 'TEXTAREA');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('textContent', content);
        });
    });

    describe('#createButton(attribute, children)', function () {
        it("should return a button element", function () {
            var result = createButton();

            expect(result).to.have.property('nodeName', 'BUTTON');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a button element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createButton(attribute);

            expect(result).to.have.property('nodeName', 'BUTTON');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a button element with an autofocus attribute set", function () {
            var values = [true, false];
            values.forEach(value => {
                var result = createButton({ autofocus: value });

                expect(result).to.have.property('nodeName', 'BUTTON');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('autofocus', value);
            });
        });
        it("should return a button element with an formaction attribute set", function () {
            var action = "mylink";
            var result = createButton({ formaction: action });

            expect(result).to.have.property('nodeName', 'BUTTON');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('formAction', action);
        });
        it("should return a button element with an formenctype attribute set", function () {
            var values = ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"];
            values.forEach(value => {
                var result = createButton({ formenctype: value });

                expect(result).to.have.property('nodeName', 'BUTTON');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('formEnctype', value);
            });
        });
        it("should return a button element with a formmethod attribute set", function () {
            var values = ["post", "get", "dialog"];
            values.forEach(value => {
                var result = createButton({ formmethod: value });

                expect(result).to.have.property('nodeName', 'BUTTON');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('formMethod', value);
            });
        });
        it("should return a button element with a formnovalidate attribute set", function () {
            var values = [true, false];
            values.forEach(value => {
                var result = createButton({ formnovalidate: value });

                expect(result).to.have.property('nodeName', 'BUTTON');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('formNoValidate', value);
            });
        });
        it("should return a button element with a formtarget attribute set", function () {
            var values = ["_self", "_blank", "_parent", "_top"];

            values.forEach(value => {
                var result = createButton({ formtarget: value });

                expect(result).to.have.property('nodeName', 'BUTTON');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('formTarget', value);
            });
        });
        it("should return a button element with an disabled attribute set", function () {
            var values = [true, false];
            values.forEach(value => {
                var result = createButton({ disabled: value });

                expect(result).to.have.property('nodeName', 'BUTTON');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('disabled', value);
            });
        });
        it("should return a button element with a name attribute set", function () {
            var name = "astring";
            var result = createButton({ name: name });

            expect(result).to.have.property('nodeName', 'BUTTON');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('name', name);
        });
        it("should return a button element with a type attribute set", function () {
            var values = ["button", "submit", "reset"];

            values.forEach(value => {
                var result = createButton({ type: value });

                expect(result).to.have.property('nodeName', 'BUTTON');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('type', value);
            });
        });
        it("should return a button element with a value attribute set", function () {
            var value = "12";
            var result = createButton({ value: value });

            expect(result).to.have.property('nodeName', 'BUTTON');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('value', value);
        });
        it("should return a button element with children", function () {
            var content = document.createElement("span");

            var result = createButton(null, content);

            expect(result).to.have.property('nodeName', 'BUTTON');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 1);
        });
    });

    describe('#createMeter(attribute, children)', function () {
        it("should return a meter element", function () {
            var result = createMeter();

            expect(result).to.have.property('nodeName', 'METER');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a meter element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createMeter(attribute);

            expect(result).to.have.property('nodeName', 'METER');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a meter element with a high attribute set", function () {
            var high = 1;
            var result = createMeter({ high: high });

            expect(result).to.have.property('nodeName', 'METER');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('high', high);
        });
        it("should return a meter element with a low attribute set", function () {
            var low = 0.2;
            var result = createMeter({ low: low });

            expect(result).to.have.property('nodeName', 'METER');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('low', low);
        });
        it("should return a meter element with a max attribute set", function () {
            var max = 5.5;
            var result = createMeter({ max: max });

            expect(result).to.have.property('nodeName', 'METER');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('max', max);
        });
        it("should return a meter element with a min attribute set", function () {
            var min = 0.3;
            var result = createMeter({ min: min });

            expect(result).to.have.property('nodeName', 'METER');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('min', min);
        });
        it("should return a meter element with a optimum attribute set", function () {
            var optimum = 1;
            var result = createMeter({ optimum: optimum });

            expect(result).to.have.property('nodeName', 'METER');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('optimum', optimum);
        });
        it("should return a meter element with a value attribute set", function () {
            var value = 0.6;
            var result = createMeter({ value: value });

            expect(result).to.have.property('nodeName', 'METER');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('value', value);
        });
        it("should return a meter element with children", function () {
            var content = document.createElement("span");

            var result = createMeter(null, content);

            expect(result).to.have.property('nodeName', 'METER');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 1);
        });
    });

    describe('#createProgress(attribute, children)', function () {
        it("should return a progress element", function () {
            var result = createProgress();

            expect(result).to.have.property('nodeName', 'PROGRESS');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a progress element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createProgress(attribute);

            expect(result).to.have.property('nodeName', 'PROGRESS');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a progress element with a max attribute set", function () {
            var max = 50;
            var result = createProgress({ max: max });

            expect(result).to.have.property('nodeName', 'PROGRESS');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('max', max);
        });
        it("should return a progress element with a value attribute set", function () {
            var value = 0.6;
            var result = createProgress({ value: value });

            expect(result).to.have.property('nodeName', 'PROGRESS');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('value', value);
        });
        it("should return a progress element with children", function () {
            var content = document.createElement("span");

            var result = createProgress(null, content);

            expect(result).to.have.property('nodeName', 'PROGRESS');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 1);
        });
    });

    describe('#createOutput(attribute, children)', function () {
        it("should return an output element", function () {
            var result = createOutput();

            expect(result).to.have.property('nodeName', 'OUTPUT');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return an output element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createOutput(attribute);

            expect(result).to.have.property('nodeName', 'OUTPUT');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return an output element with a name attribute set", function () {
            var name = "DOMString";
            var result = createOutput({ name: name });

            expect(result).to.have.property('nodeName', 'OUTPUT');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('name', name);
        });
        it("should return an output element with a value attribute set", function () {
            var value = "12";
            var result = createOutput({ value: value });

            expect(result).to.have.property('nodeName', 'OUTPUT');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('value', value);
        });
        it("should return an output element with children", function () {
            var content = document.createElement("span");

            var result = createOutput(null, content);

            expect(result).to.have.property('nodeName', 'OUTPUT');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 1);
        });
    });

    /**
     * TABLE ELEMENTS
    --------------------------------------------------------------------------- */

    describe('#createTable(attribute, children)', function () {
        it("should return a table element", function () {
            var result = createTable();

            expect(result).to.have.property('nodeName', 'TABLE');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a table element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createTable(attribute);

            expect(result).to.have.property('nodeName', 'TABLE');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a table element with children", function () {
            var values = [
                {
                    content: [
                        document.createElement("tr"),
                    ]
                },
                {
                    content: [
                        document.createElement("caption"),
                        document.createElement("thead"),
                        document.createElement("tr"),
                        document.createElement("tr"),
                        document.createElement("tfoot"),
                    ]
                },
                {
                    content: [
                        document.createElement("caption"),
                        document.createElement("colgroup"),
                        document.createElement("colgroup"),
                        document.createElement("thead"),
                        document.createElement("tr"),
                        document.createElement("thead"),
                    ]
                },
                {
                    content: [
                        document.createElement("caption"),
                        document.createElement("thead"),
                        document.createElement("tbody"),
                        document.createElement("tfoot"),
                    ],
                },
            ];

            values.forEach(value => {
                var result = createTable(null, value.content);

                expect(result).to.have.property('nodeName', 'TABLE');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('childElementCount', value.content.length);
                value.content.forEach(element => {
                    var isDescendant = result.contains(element);
                    expect(isDescendant).to.be.true;
                });
            });
        });
    });

    describe('#createCaption(attribute, children)', function () {
        it("should return a caption element", function () {
            var result = createCaption();

            expect(result).to.have.property('nodeName', 'CAPTION');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a caption element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createCaption(attribute);

            expect(result).to.have.property('nodeName', 'CAPTION');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a caption element with children", function () {
            var content = document.createElement("span");

            var result = createCaption(null, content);

            expect(result).to.have.property('nodeName', 'CAPTION');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 1);
        });
    });

    describe('#createTableHeader(attribute, children)', function () {
        it("should return a table header element", function () {
            var result = createTableHeader();

            expect(result).to.have.property('nodeName', 'THEAD');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a table header element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createTableHeader(attribute);

            expect(result).to.have.property('nodeName', 'THEAD');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a table header element with children", function () {
            var contents = [
                { value: document.createElement("tr"), count: 1 },
                { value: [document.createElement("tr"), document.createElement("tr")], count: 2 },
            ];

            contents.forEach(content => {
                var result = createTableHeader(null, content.value);

                expect(result).to.have.property('nodeName', 'THEAD');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('childElementCount', content.count);

                for (let i = 0; i < result.children.length; i++) {
                    const element = result.children[i];

                    expect(element).to.have.property('nodeName', 'TR');
                    expect(element).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                }
            });
        });
    });

    describe('#createTableBody(attribute, children)', function () {
        it("should return a table body element", function () {
            var result = createTableBody();

            expect(result).to.have.property('nodeName', 'TBODY');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return an table body element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createTableBody(attribute);

            expect(result).to.have.property('nodeName', 'TBODY');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a table body element with children", function () {
            var contents = [
                { value: document.createElement("tr"), count: 1 },
                { value: [document.createElement("tr"), document.createElement("tr")], count: 2 },
            ];

            contents.forEach(content => {
                var result = createTableBody(null, content.value);

                expect(result).to.have.property('nodeName', 'TBODY');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('childElementCount', content.count);
            });
        });
    });

    describe('#createTableFooter(attribute, children)', function () {
        it("should return a table footer element", function () {
            var result = createTableFooter();

            expect(result).to.have.property('nodeName', 'TFOOT');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a table footer element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createTableFooter(attribute);

            expect(result).to.have.property('nodeName', 'TFOOT');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a table footer element with children", function () {
            var contents = [
                { value: document.createElement("tr"), count: 1 },
                { value: [document.createElement("tr"), document.createElement("tr")], count: 2 },
            ];

            contents.forEach(content => {
                var result = createTableFooter(null, content.value);

                expect(result).to.have.property('nodeName', 'TFOOT');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('childElementCount', content.count);
            });
        });
    });

    describe('#createTableColumn(attribute)', function () {
        it("should return a table column output element", function () {
            var result = createTableColumn();

            expect(result).to.have.property('nodeName', 'COL');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a table column element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createTableColumn(attribute);

            expect(result).to.have.property('nodeName', 'COL');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return an output element with a span attribute set", function () {
            var span = 2;
            var result = createTableColumn({ span: span });

            expect(result).to.have.property('nodeName', 'COL');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('span', span);
        });
    });

    describe('#createTableColumnGroup(attribute, children)', function () {
        it("should return a table column group element", function () {
            var result = createTableColumnGroup();

            expect(result).to.have.property('nodeName', 'COLGROUP');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a table column group element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createTableColumnGroup(attribute);

            expect(result).to.have.property('nodeName', 'COLGROUP');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a table column group element with a span attribute set", function () {
            var span = 2;
            var result = createTableColumnGroup({ span: span });

            expect(result).to.have.property('nodeName', 'COLGROUP');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('span', span);
        });
        it("should return a table column group element with children", function () {
            var element = document.createElement("col");

            var result = createTableColumnGroup(null, element);
            var isDescendant = result.contains(element);

            expect(result).to.have.property('nodeName', 'COLGROUP');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 1);
            expect(result.firstElementChild).to.have.property('nodeName', 'COL');
            expect(result.firstElementChild).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(isDescendant).to.be.true;
        });
    });

    describe('#createTableRow(attribute, children)', function () {
        it("should return a table row element", function () {
            var result = createTableRow();

            expect(result).to.have.property('nodeName', 'TR');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a table row element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createTableRow(attribute);

            expect(result).to.have.property('nodeName', 'TR');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a table row element with children", function () {
            var contents = [
                { value: document.createElement("th"), nodeName: "TH", count: 1 },
                { value: document.createElement("td"), nodeName: "TD", count: 1 },
                { value: [document.createElement("td"), document.createElement("td")], nodeName: "TD", count: 2 },
            ];

            contents.forEach(content => {
                var result = createTableRow(null, content.value);

                expect(result).to.have.property('nodeName', 'TR');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('childElementCount', content.count);
            });
        });
    });

    describe('#createTableHeaderCell(attribute, children)', function () {
        it("should return a table header cell element", function () {
            var result = createTableHeaderCell();

            expect(result).to.have.property('nodeName', 'TH');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a table header cell element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createTableHeaderCell(attribute);

            expect(result).to.have.property('nodeName', 'TH');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a table header cell element with a abbr attribute set", function () {
            var abbr = "DOMString";

            var result = createTableHeaderCell({ abbr: abbr });

            expect(result).to.have.property('nodeName', 'TH');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('abbr', abbr);
        });
        it("should return a table header cell element with a colspan attribute set", function () {
            var colspan = 2;

            var result = createTableHeaderCell({ colspan: colspan });

            expect(result).to.have.property('nodeName', 'TH');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('colSpan', colspan);
        });
        it("should return a table header cell element with a rowspan attribute set", function () {
            var rowspan = 2;

            var result = createTableHeaderCell({ rowspan: rowspan });

            expect(result).to.have.property('nodeName', 'TH');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('rowSpan', rowspan);
        });
        it("should return a table header cell element with a scope attribute set", function () {
            var values = ["row", "col", "rowgroup", "colgroup", ""];

            values.forEach(value => {
                var result = createTableHeaderCell({ scope: value });

                expect(result).to.have.property('nodeName', 'TH');
                expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                expect(result).to.have.property('scope', value);
            });
        });
        it("should return a table header cell element with children", function () {
            var content = document.createElement("span");

            var result = createTableHeaderCell(null, content);

            expect(result).to.have.property('nodeName', 'TH');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 1);
        });
    });

    describe('#createTableCell(attribute, children)', function () {
        it("should return a table cell element", function () {
            var result = createTableCell();

            expect(result).to.have.property('nodeName', 'TD');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
        });
        it("should return a table cell element with the global attributes set", function () {
            var attribute = createAttribute();

            var result = createTableCell(attribute);

            expect(result).to.have.property('nodeName', 'TD');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            for (const key in attribute) {
                expect(result).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
        it("should return a table cell element with a colspan attribute set", function () {
            var colspan = 2;

            var result = createTableCell({ colspan: colspan });

            expect(result).to.have.property('nodeName', 'TD');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('colSpan', colspan);
        });
        it("should return a table cell element with a rowspan attribute set", function () {
            var rowspan = 2;

            var result = createTableCell({ rowspan: rowspan });

            expect(result).to.have.property('nodeName', 'TD');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('rowSpan', rowspan);
        });
        it("should return a table cell element with children", function () {
            var content = document.createElement("span");

            var result = createTableCell(null, content);

            expect(result).to.have.property('nodeName', 'TD');
            expect(result).to.have.property('nodeType', NodeType.ELEMENT_NODE);
            expect(result).to.have.property('childElementCount', 1);
        });
    });
});