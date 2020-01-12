// require jsdom-global
var jsdom = require('jsdom-global');
var fs = require('fs');

// require chai for BDD
var expect = require('chai').expect;

// import the library under test
const {
    isNode, isElement, isHTMLElement, isHTMLCollection, isDocumentFragment,
    htmlToElement, htmlToElements
} = require('@dom/dom-parse.js');

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

describe('DOM parse helpers', function () {
    before('initialize DOM', function () {
        const html = fs.readFileSync(`${__dirname}/template.html`, 'utf8');
        this.jsdom = jsdom(html);
    });
    describe('#isNode(obj)', function () {
        it("should return true if the value is a node", function () {
            var value = document.createTextNode("hello");
            var result = isNode(value);
            expect(result).to.be.true;
        });
        it("should return false if the value is not a node", function () {
            var values = [100, true, {}, null, undefined, "hello"];
            values.forEach((val) => {
                var result = isNode(val);
                expect(result).to.be.false;
            });
        });
    });
    describe('#isElement(obj)', function () {
        it("should return true if the value is an element", function () {
            var value = document.createElement("div");
            var result = isElement(value);
            expect(result).to.be.true;
        });
        it("should return false if the value is not an element", function () {
            var values = [100, true, {}, null, undefined];
            values.forEach((val) => {
                var result = isElement(val);
                expect(result).to.be.false;
            });
        });
    });
    describe('#isHTMLElement(obj)', function () {
        it("should return true if the value is an HTML elemnt", function () {
            var value = document.createElement("span");
            var result = isHTMLElement(value);
            expect(result).to.be.true;
        });
        it("should return false if the value is not an HTML element", function () {
            var values = [100, true, {}, null, undefined];
            values.forEach((val) => {
                var result = isHTMLElement(val);
                expect(result).to.be.false;
            });
        });
    });
    describe('#isHTMLCollection(obj)', function () {
        it("should return true if the value is an HTML collection", function () {
            var value = document.forms;
            var result = isHTMLCollection(value);
            expect(result).to.be.true;
        });
        it("should return false if the value is not an HTML collection", function () {
            var values = [100, true, {}, null, undefined];
            values.forEach((val) => {
                var result = isHTMLCollection(val);
                expect(result).to.be.false;
            });
        });
    });
    describe('#isDocumentFragment(obj)', function () {
        it("should return true if the value is a document fragment", function () {
            var value = document.createDocumentFragment();
            var result = isDocumentFragment(value);
            expect(result).to.be.true;
        });
        it("should return false if the value is not a document fragment", function () {
            var values = [100, true, {}, null, undefined];
            values.forEach((val) => {
                var result = isDocumentFragment(val);
                expect(result).to.be.false;
            });
        });
    });
    describe('#htmlToElement(html)', function () {
        it("should return the first html element", function () {
            var values = [
                { html: "<div></div>", nodeName: "DIV", nodeType: NodeType.ELEMENT_NODE, children: 0 },
                { html: "<div><td></td></div>", nodeName: "DIV", nodeType: NodeType.ELEMENT_NODE, children: 0 },
                { html: "<ul><li></li></ul><p></p>", nodeName: "UL", nodeType: NodeType.ELEMENT_NODE, children: 1 },
                { html: "<div>", nodeName: "DIV", nodeType: NodeType.ELEMENT_NODE, children: 0 },
                { html: "lorem ipsum", nodeName: "#text", nodeType: NodeType.TEXT_NODE, children: undefined }
            ];
            values.forEach((val) => {
                var result = htmlToElement(val.html);

                expect(result).to.have.property('nodeName', val.nodeName);
                expect(result).to.have.property('nodeType', val.nodeType);
                expect(result.childElementCount).to.be.equal(val.children);
            });
        });
        it("should return null if the html is not a string", function () {
            var values = [348, null, undefined, true];
            values.forEach((val) => {
                var result = htmlToElement(val);

                expect(result).to.be.null;
            });
        });
    });
    describe('#htmlToElements(html)', function () {
        it("should return all html elements", function () {
            var values = [
                { html: "<div></div>", children: ["DIV"], length: 1 },
                { html: "<div><span></span></div>", children: ["DIV"], length: 1 },
                { html: "<div><span></span></div><p></p>", children: ["DIV", "P"], length: 2 }
            ];
            values.forEach((val) => {
                var result = htmlToElements(val.html);
                expect(result).to.be.an.instanceOf(NodeList);
                expect(result.length).to.be.equal(val.length);

                for (let i = 0; i < result.length; i++) {
                    const item = result[i];
                    expect(item).to.have.property('nodeName', val.children[i]);
                    expect(item).to.have.property('nodeType', NodeType.ELEMENT_NODE);
                }
            });
        });
        it("should return null if the html is not a string", function () {
            var values = [348, null, undefined, true];
            values.forEach((val) => {
                var result = htmlToElement(val);

                expect(result).to.be.null;
            });
        });
    });
    after(function () {
        this.jsdom();
    });
});