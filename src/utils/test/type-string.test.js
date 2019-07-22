//require jsdom-global and run
require('jsdom-global')();

// import our library
//var jsLabo = require('./../src/index.js');

var expect = require('chai').expect;
var isNullOrWhitespace = require('@datatype/type-string.js').isNullOrWhitespace;
var capitalize = require('@datatype/type-string.js').capitalize;
var capitalizeFirstLetter = require('@datatype/type-string.js').capitalizeFirstLetter;
var removeAccents = require('@datatype/type-string.js').removeAccents;

describe('String helpers', function () {
    describe('#isNullOrWhitespace()', function () {
        it("should return true if the value is null", function () {
            var result = isNullOrWhitespace(null);
            expect(result).to.be.true;
        });
        it("should return true if the value is a sequence of whitespace", function () {
            var result = isNullOrWhitespace('  ');
            expect(result).to.be.true;
        });
        it("should return false if the value is not a string", function () {
            var values = [5, true, {}, []];
            values.forEach((val) => {
                var result = isNullOrWhitespace(val);
                expect(result).to.be.false;
            });
        });
    });
    describe('#capitalize()', function () {
        it("should return a string with the first character of each word turn to uppercase", function () {
            var str = "this is a test";
            var result = capitalize(str);
            expect(result).to.be.equal("This Is A Test");
        });
    });
    describe('#capitalizeFirstLetter()', function () {
        it("should return a string with the first character turn to uppercase", function () {
            var str = "this is a test";
            var result = capitalizeFirstLetter(str);
            expect(result).to.be.equal("This is a test");
        });
        it("should return the same string if it's null or a sequence of whitespace", function () {
            var values = [null, '  '];
            values.forEach((val) => {
                var result = capitalizeFirstLetter(val);
                expect(result).to.be.equal(val);
            });
        });
    });
    describe('#removeAccents()', function () {
        it("should return a string with no accents", function () {
            var str = "l'été à Paris ça va être très tôt";

            var strNormalize = removeAccents(str);
            var result = /[àâäæçéèêîïôœùûü]/gi.test(strNormalize);
            expect(result).to.be.false;

            var normalize = String.prototype.normalize;
            String.prototype.normalize = null;
            var strReplace = removeAccents(str);
            result = /[àâäæçéèêîïôœùûü]/gi.test(strReplace);
            expect(result).to.be.false;
            String.prototype.normalize = normalize;
        });
    });
});