// require jsdom-global
var jsdom = require('jsdom-global');
var fs = require('fs');

// require chai for BDD
var expect = require('chai').expect;

// import the library under test
const { isNode, isElement, isHTMLElement, isHTMLCollection, isDocumentFragment } = require('@dom/checker.js');

describe('DOM manipulation helpers', function () {
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
    after(function () {
        this.jsdom();
    });
});