// require jsdom-global
var jsdom = require('jsdom-global');
var fs = require('fs');

// require chai for BDD
var expect = require('chai').expect;

// import the library under test
const { removeChildren } = require('@dom/dom-remove.js');

describe('DOM remove helpers', function () {
    beforeEach('initialize DOM', function () {
        const html = fs.readFileSync(`${__dirname}/template.html`, 'utf8');
        this.jsdom = jsdom(html);
    });
    describe('#removeChildren(node, callback)', function () {
        it("should remove all children elements of an element", function () {
            var target = document.querySelector('#body');
    
            var result = removeChildren(target);

            expect(result).to.be.equal(target);
            expect(result.hasChildNodes()).to.be.false;
        });
        it("should remove all children elements of an element that satisfies the condition", function () {
            var target = document.querySelector('#body');
            var predicate = function(node) {
                return node.className && node.className.split(" ").includes('list');
            };
    
            var result = removeChildren(target, predicate);

            expect(result).to.be.equal(target);
        });
        it("should abort the operation and return null if the node is not valid", function () {
            var target = '#body';
    
            var result = removeChildren(target);

            expect(result).to.be.null;
        });
    });
    after(function () {
        this.jsdom();
    });
});