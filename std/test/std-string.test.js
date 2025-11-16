//require jsdom-global and run
require('jsdom-global')();

const expect = require('chai').expect;
const {
    capitalize, capitalizeFirstLetter, formatCase, camelCase, pascalCase,
    isVowel, isConsonant, isUpperCase, isLowerCase, removeAccents
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
    describe('#isVowel(char)', function () {
        it("should return true if the char is a vowel", function () {
            var values = ["a", "e", "i", "o", "u"];

            values.forEach((val) => {
                var result = isVowel(val);

                expect(result).to.be.true;
            });
        });
        it("should return false if the value is not a char", function () {
            var values = [100, true, {}, null, undefined, []];

            values.forEach((val) => {
                var result = isVowel(val);

                expect(result).to.be.false;
            });
        });
        it("should return false if the value is not a vowel", function () {
            var values = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z", "0", "1", "2", "3"];

            values.forEach((val) => {
                var result = isVowel(val);

                expect(result).to.be.false;
            });
        });
    });
    describe('#isConsonant(char)', function () {
        it("should return true if the char is a consonant", function () {
            var values = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z"];

            values.forEach((val) => {
                var result = isConsonant(val);

                expect(result).to.be.true;
            });
        });
        it("should return false if the value is not a char", function () {
            var values = [100, true, {}, null, undefined, []];

            values.forEach((val) => {
                var result = isConsonant(val);

                expect(result).to.be.false;
            });
        });
        it("should return false if the value is not a consonant", function () {
            var values = ["a", "e", "i", "o", "u"];

            values.forEach((val) => {
                var result = isConsonant(val);

                expect(result).to.be.false;
            });
        });
    });
    describe('#isUpperCase(char)', function () {
        it("should return true if the char is in uppercase", function () {
            var values = ["A", "E", "I", "O", "U", "B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Y", "Z"];

            values.forEach((val) => {
                var result = isUpperCase(val);

                expect(result).to.be.true;
            });
        });
        it("should return false if the value is not a char", function () {
            var values = [100, true, {}, null, undefined, []];

            values.forEach((val) => {
                var result = isUpperCase(val);

                expect(result).to.be.false;
            });
        });
        it("should return false if the value is not in uppercase", function () {
            var values = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

            values.forEach((val) => {
                var result = isUpperCase(val);

                expect(result).to.be.false;
            });
        });
    });
    describe('#isLowerCase(char)', function () {
        it("should return true if the char is in lowercase", function () {
            var values = ["a", "e", "i", "o", "u", "b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z"];

            values.forEach((val) => {
                var result = isLowerCase(val);

                expect(result).to.be.true;
            });
        });
        it("should return false if the value is not a char", function () {
            var values = [100, true, {}, null, undefined, []];

            values.forEach((val) => {
                var result = isLowerCase(val);

                expect(result).to.be.false;
            });
        });
        it("should return false if the value is not in lowercase", function () {
            var values = ["B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

            values.forEach((val) => {
                var result = isLowerCase(val);

                expect(result).to.be.false;
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