// require jsdom-global
var jsdom = require('jsdom-global');
var fs = require('fs');

// require chai for BDD
var expect = require('chai').expect;

// import the library under test
const { getElement, getElements, getTemplate, cloneTemplate, getPreviousElementSibling, getNextElementSibling, findAncestor } = require('@dom/dom-query.js');

describe('DOM manipulation helpers', function () {
    before('initialize DOM', function () {
        const html = fs.readFileSync(`${__dirname}/template.html`, 'utf8');
        this.jsdom = jsdom(html);
    });
    describe('#getElement(selector, _container)', function () {
        it("should return an element", function () {
            var result = getElement('#body', this.jsdom.document);

            expect(result).to.be.an.instanceOf(HTMLElement);
            expect(result).to.have.property('id', 'body');
        });
    });
    describe('#getElements(selector, _container)', function () {
        it("should return an element", function () {
            var result = getElements('.list-item', this.jsdom.document);

            expect(result).to.be.an.instanceOf(HTMLCollection);
            expect(result.length).to.be.equal(3);
        });
    });
    describe('#getTemplate(selector, _container)', function () {
        it("should return a template", function () {
            var result = getTemplate('#siteFooter', this.jsdom.document);

            expect(result).to.be.an.instanceOf(HTMLTemplateElement);
            expect(result).to.have.property('id', 'siteFooter');
        });
    });
    describe('#cloneTemplate(template, deep)', function () {
        it("should return a clone of the template element", function () {
            var template = getTemplate('#siteFooter', this.jsdom.document);

            var result = cloneTemplate(template);

            expect(result).to.be.an.instanceOf(DocumentFragment);
            expect(result.childElementCount).to.be.equal(1);
            expect(result.firstElementChild).to.be.an.instanceOf(HTMLDivElement);
            expect(result.firstElementChild.id).to.be.equal('site-footer');
        });
    });
    describe('#getPreviousElementSibling(el, predCb)', function () {
        it("should return an element", function () {
            var element = document.querySelector('#body');

            var result = getPreviousElementSibling(element);

            expect(result).to.be.equal(element.previousElementSibling);
        });
        it("should return an element with predicate", function () {
            var element = document.querySelector('#body');
            var predicate = function (el) {
                return el.className.split(" ").includes('sub-title');
            };

            var result = getPreviousElementSibling(element, predicate);

            expect(result).to.be.an.instanceOf(HTMLElement);
            expect(result.className).to.include('sub-title');
        });
    });
    describe('#getNextElementSibling(el, predCb)', function () {
        it("should return an element", function () {
            var element = document.querySelector('#body');

            var result = getNextElementSibling(element);

            expect(result).to.be.equal(element.nextElementSibling);
        });
        it("should return an element with predicate", function () {
            var element = document.querySelector('.list-item.first');
            var predicate = function (el) {
                return el.className.split(" ").includes('third');
            };

            var result = getNextElementSibling(element, predicate);

            expect(result).to.be.an.instanceOf(HTMLElement);
            expect(result.className).to.include('third');
        });
    });
    describe('#findAncestor(target, callback, max)', function () {
        it("should return an element", function () {
            var target = document.querySelector('.list-item.first');
            var callback = function (el) { 
                return el.id === 'body'; 
            };

            var result = findAncestor(target, callback);

            expect(result).to.be.an.instanceOf(HTMLElement);
            expect(result.id).to.be.equal('body');
        });
        it("should return null", function () {
            var target = document.querySelector('.list-item.first');
            var callback = function (el) { 
                return el.id === 'body'; 
            };
            var max = 2;

            var result = findAncestor(target, callback, max);

            expect(result).to.be.null;
        });
        it("should abort the operation and return null if the target is not valid", function () {
            var target = document.querySelector('.body-introduction');

            var result = findAncestor(target, null);

            expect(result).to.be.null;
        });
        it("should abort the operation and return null if the callback is not valid", function () {
            var callback = function () { return true; };

            var result = findAncestor("target", callback);

            expect(result).to.be.null;
        });
    });
    after(function () {
        this.jsdom();
    });
});