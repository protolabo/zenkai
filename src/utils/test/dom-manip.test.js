// require jsdom-global
var jsdom = require('jsdom-global');

// require chai for BDD
var expect = require('chai').expect;
var fs = require('fs');

// import our library
var getElement = require('@utils/dom/dom-manip.js').getElement;
var getElements = require('@utils/dom/dom-manip.js').getElements;
var getTemplate = require('@utils/dom/dom-manip.js').getTemplate;
var cloneTemplate = require('@utils/dom/dom-manip.js').cloneTemplate;

describe('DOM manipulation helpers', function () {
    before('initialize DOM', function () {
        const html = fs.readFileSync(`${__dirname}/common/template.html`, 'utf8');
        this.jsdom = jsdom(html);
    });
    describe('#getElement()', function () {
        it("should return an element", function () {
            var result = getElement('#body', this.jsdom.document);
            expect(result).to.be.an.instanceOf(HTMLElement);
            expect(result).to.have.property('id', 'body');
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