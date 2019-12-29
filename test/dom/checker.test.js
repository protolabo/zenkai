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
            var values = [100, true, {}, null, undefined];
            values.forEach((val) => {
                var result = isNode(val);
                expect(result).to.be.false;
            });
        });
    });
    after(function () {
        this.jsdom();
    });
});