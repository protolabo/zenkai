// require jsdom-global
var jsdom = require('jsdom-global');

// require chai for BDD
var expect = require('chai').expect;
var fs = require('fs');

// import the library under test
const {
    getElement, getElements, getTemplate, cloneTemplate, windowWidth, getPreviousElementSibling, getNextElementSibling,
    insertBeforeElement, insertAfterElement, preprendChild, hasClass, removeClass, addClass,toggleClass
} = require('@dom/dom-manip.js');

describe('DOM manipulation helpers', function () {
    before('initialize DOM', function () {
        const html = fs.readFileSync(`${__dirname}/template.html`, 'utf8');
        this.jsdom = jsdom(html);
    });
    describe('#getElement()', function () {
        it("should return an element", function () {
            var result = getElement('#body', this.jsdom.document);
            expect(result).to.be.an.instanceOf(HTMLElement);
            expect(result).to.have.property('id', 'body');
        });
    });
    describe('#getElements()', function () {
        it("should return an element", function () {
            var result = getElements('.list-item', this.jsdom.document);
            expect(result).to.be.an.instanceOf(HTMLCollection);
            expect(result.length).to.be.equal(3);
        });
    });
    describe('#getTemplate()', function () {
        it("should return a template", function () {
            var result = getTemplate('#siteFooter', this.jsdom.document);
            expect(result).to.be.an.instanceOf(HTMLTemplateElement);
            expect(result).to.have.property('id', 'siteFooter');
        });
    });
    describe('#cloneTemplate()', function () {
        it("should return a clone of the template element", function () {
            var template = getTemplate('#siteFooter', this.jsdom.document);
            var result = cloneTemplate(template);
            expect(result).to.be.an.instanceOf(DocumentFragment);
            expect(result.childElementCount).to.be.equal(1);
            expect(result.firstElementChild).to.be.an.instanceOf(HTMLDivElement);
            expect(result.firstElementChild.id).to.be.equal('site-footer');
        });
    });

    after(function () {
        this.jsdom();
    });
    // describe('#capitalize()', function () {
    //     it("should return a string with the first character of each word turn to uppercase", function () {
    //         var str = "this is a test";
    //         var result = capitalize(str);
    //         expect(result).to.be.equal("This Is A Test");
    //     });
    // });
    // describe('#capitalizeFirstLetter()', function () {
    //     it("should return a string with the first character turn to uppercase", function () {
    //         var str = "this is a test";
    //         var result = capitalizeFirstLetter(str);
    //         expect(result).to.be.equal("This is a test");
    //     });
    //     it("should return the same string if it's null or a sequence of whitespace", function () {
    //         var values = [null, '  '];
    //         values.forEach((val) => {
    //             var result = capitalizeFirstLetter(val);
    //             expect(result).to.be.equal(val);
    //         });
    //     });
    // });
    // describe('#removeAccents()', function () {
    //     it("should return a string with no accents", function () {
    //         var str = "l'été à Paris ça va être très tôt";

    //         var strNormalize = removeAccents(str);
    //         var result = /[àâäæçéèêîïôœùûü]/gi.test(strNormalize);
    //         expect(result).to.be.false;

    //         var normalize = String.prototype.normalize;
    //         String.prototype.normalize = null;
    //         var strReplace = removeAccents(str);
    //         result = /[àâäæçéèêîïôœùûü]/gi.test(strReplace);
    //         expect(result).to.be.false;
    //         String.prototype.normalize = normalize;
    //     });
    // });
});