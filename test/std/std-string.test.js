//require jsdom-global and run
require('jsdom-global')();

const expect = require('chai').expect;
const { 
    capitalize, capitalizeFirstLetter, formatCase,
    camelCase, pascalCase, removeAccents 
} = require('@std/std-string.js');

describe('String helpers', function () {
    describe('#capitalize(str)', function () {
        it("should return a string with the first character of each word turn to uppercase", function () {
            var str = "this is a test";
            var result = capitalize(str);
            expect(result).to.be.equal("This Is A Test");
        });
        it("should return the same string if it's null or a sequence of whitespace", function () {
            var values = [null, '  '];
            values.forEach((val) => {
                var result = capitalize(val);
                expect(result).to.be.equal(val);
            });
        });
    });
    describe('#capitalizeFirstLetter(str)', function () {
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
    describe('#camelCase(str)', function () {
        it("should return a string with the first character turn to uppercase", function () {
            var str = "this is a test";
            var result = camelCase(str);
            expect(result).to.be.equal("thisIsATest");
        });
        it("should return the same string if it's null or a sequence of whitespace", function () {
            var values = [null, '  '];
            values.forEach((val) => {
                var result = camelCase(val);
                expect(result).to.be.equal(val);
            });
        });
    });
    describe('#pascalCase(str)', function () {
        it("should return a string with the first character turn to uppercase", function () {
            var str = "this is a test";
            var result = pascalCase(str);
            expect(result).to.be.equal("ThisIsATest");
        });
        it("should return the same string if it's null or a sequence of whitespace", function () {
            var values = [null, '  '];
            values.forEach((val) => {
                var result = pascalCase(val);
                expect(result).to.be.equal(val);
            });
        });
    });
    describe('#formatCase(str)', function () {
        it("should return a string with the first character turn to uppercase", function () {
            var str = "this is a test";
            var result = formatCase(str, 'pascal');
            expect(result).to.be.equal("ThisIsATest");
        });
        it("should return a string with the first character turn to uppercase", function () {
            var str = "this is a test";
            var result = formatCase(str, 'camel');
            expect(result).to.be.equal("thisIsATest");
        });
        it("should return a string with all its characters turn to uppercase", function () {
            var str = "this is a test";
            var result = formatCase(str, 'upper');
            expect(result).to.be.equal("THIS IS A TEST");
        });
        it("should return a string with all its characters turn to lowercase", function () {
            var str = "this IS a TEST";
            var result = formatCase(str, 'lower');
            expect(result).to.be.equal("this is a test");
        });
        it("should return the same string if it's null or a sequence of whitespace", function () {
            var values = [null, '  '];
            values.forEach((val) => {
                var result = formatCase(val);
                expect(result).to.be.equal(val);
            });
        });
        it("should return the same string if the casing is not recognized", function () {
            var values = ["first string", "yet another"];
            values.forEach((val) => {
                var result = formatCase(val, 'standard');
                expect(result).to.be.equal(val);
            });
        });
    });
    describe('#removeAccents(str)', function () {
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