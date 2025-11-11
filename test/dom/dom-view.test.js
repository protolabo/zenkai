// require jsdom-global
var jsdom = require('jsdom-global');
var fs = require('fs');

// require chai for BDD
var expect = require('chai').expect;

// import the library under test
const {
    isInViewport, isInElement, getVisibleElement, getClosest,
    getElementTop, getElementLeft, getElementRight, getElementBottom,
    getTopElement, getLeftElement, getRightElement, getBottomElement
} = require('@dom/dom-view.js');

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

    describe('#isInViewport(obj)', function () {
        it("should return true if the value is a node", function () {
            var values = [
                document.createTextNode("hello"),
                document.createElement("div"),
                document.createDocumentFragment(),
            ];

            values.forEach(value => {
                var result = isNode(value);

                expect(result).to.be.true;
            });
        });
        it("should return false if the value is not a node", function () {
            var values = [100, true, {}, null, undefined, "hello"];

            values.forEach((val) => {
                var result = isNode(val);

                expect(result).to.be.false;
            });
        });
    });

    describe('#isInElement(obj)', function () {
        it("should return true if the value is an element", function () {
            var values = [
                document.createElement("div"),
                document.createElement("span"),
            ];

            values.forEach(value => {
                var result = isElement(value);

                expect(result).to.be.true;
            });
        });
        it("should return false if the value is not an element", function () {
            var values = [100, true, {}, null, undefined, document.createTextNode("hello")];

            values.forEach((val) => {
                var result = isElement(val);

                expect(result).to.be.false;
            });
        });
    });


    after(function () {
        this.jsdom();
    });
});