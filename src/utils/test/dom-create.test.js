// require jsdom-global and run
require('jsdom-global')();

// require chai for BDD
var expect = require('chai').expect;
var fs = require('fs');

// import our library
var createElement = require('@utils/dom/dom-create.js').createElement;
var createDocFragment = require('@utils/dom/dom-create.js').createDocFragment;
var createTextNode = require('@utils/dom/dom-create.js').createTextNode;
var createLink = require('@utils/dom/dom-create.js').createLink;

describe('DOM helpers', function () {
    describe('#createElement()', function () {
        it("should return an element", function () {
            var result = createElement('p', 'idgen', 'fresh');
            expect(result).to.have.property('id', 'idgen');
            expect(result).to.have.property('className', 'fresh');
        });
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