var expect = require('chai').expect;

const {
    valOrDefault, isDate, isString, isFunction, isObject, isIterable, isCollection,
    isEmpty, isNull, isNullOrWhitespace, isUndefined, isNullOrUndefined
} = require('@std/std-parse.js');

describe('Data type parse helpers', function () {
    describe('#valOrDefault(arg, value, isNullable)', function () {
        it("should return the nullable value if it's not undefined", function () {
            var values = ["lorem ipsum", 100, true, {}, null];
            var defaultValue = "fallback";

            values.forEach((val) => {
                var result = valOrDefault(val, defaultValue, true);

                expect(result).to.be.equal(val);
            });
        });
        it("should return the default value if the nullable value is undefined", function () {
            var value = undefined;
            var defaultValue = "all good";

            var result = valOrDefault(value, defaultValue, true);

            expect(result).to.be.equal(defaultValue);
        });
        it("should return the value if it's not undefined or null", function () {
            var values = ["lorem ipsum", 100, true];
            var defaultValue = 65;

            values.forEach((val) => {
                var result = valOrDefault(val, defaultValue);

                expect(result).to.be.equal(val);
            });
        });
        it("should return the default value if the value is undefined or null", function () {
            var values = [undefined, null];
            var defaultValue = 65;

            values.forEach((val) => {
                var result = valOrDefault(val, defaultValue);

                expect(result).to.be.equal(defaultValue);
            });
        });
    });
    describe('#isEmpty(obj)', function () {
        it("should return true if the value is empty", function () {
            var values = ["", []];

            values.forEach((val) => {
                var result = isEmpty(val);

                expect(result).to.be.true;
            });
        });
        it("should return false if the value is not empty", function () {
            var values = [" ", [undefined], 0, {}, null, undefined];

            values.forEach((val) => {
                var result = isEmpty(val);

                expect(result).to.be.false;
            });
        });
    });
    describe('#isDate(value)', function () {
        it("should return true if the value is a date", function () {
            var values = [new Date()];

            values.forEach((val) => {
                var result = isDate(val);

                expect(result).to.be.true;
            });
        });
        it("should return false if the value is not a date", function () {
            var values = ["2019-05-26", 1558892606068];

            values.forEach((val) => {
                var result = isDate(val);

                expect(result).to.be.false;
            });
        });
    });
    describe('#isString(value)', function () {
        it("should return true if the value is a string", function () {
            var value = "lorem ipsum";

            var result = isString(value);

            expect(result).to.be.true;
        });
        it("should return false if the value is not a string", function () {
            var values = [100, true, {}, null, undefined, []];

            values.forEach((val) => {
                var result = isString(val);

                expect(result).to.be.false;
            });
        });
    });
    describe('#isFunction(value)', function () {
        it("should return true if the value is a function", function () {
            var value = function () { };

            var result = isFunction(value);

            expect(result).to.be.true;
        });
        it("should return false if the value is not a function", function () {
            var values = [[], {}, null, undefined];

            values.forEach((val) => {
                var result = isFunction(val);

                expect(result).to.be.false;
            });
        });
    });
    describe('#isObject(value)', function () {
        it("should return true if the value is an object", function () {
            var values = [{}, []];

            values.forEach((val) => {
                var result = isObject(val);

                expect(result).to.be.true;
            });
        });
        it("should return false if the value is not an object", function () {
            var values = [100, true, "", null];

            values.forEach((val) => {
                var result = isObject(val);

                expect(result).to.be.false;
            });
        });
    });
    describe('#isIterable(obj)', function () {
        it("should return true if the value is iterable", function () {
            var values = [[], new Map(), new Set(), "lorem ipsum"];

            values.forEach((val) => {
                var result = isIterable(val);

                expect(result).to.be.true;
            });
        });
        it("should return false if the value is not iterable", function () {
            var values = [100, true, null, undefined, {}];
            values.forEach((val) => {
                var result = isIterable(val);

                expect(result).to.be.false;
            });
        });
    });
    describe('#isCollection(obj)', function () {
        it("should return true if the value is a collection", function () {
            var values = [[], new Map(), new Set()];

            values.forEach((val) => {
                var result = isCollection(val);

                expect(result).to.be.true;
            });
        });
        it("should return false if the value is not a collection", function () {
            var values = [100, true, null, undefined, "string", {}];
            values.forEach((val) => {
                var result = isCollection(val);

                expect(result).to.be.false;
            });
        });
    });
    describe('#isNull(value)', function () {
        it("should return true if the value is null", function () {
            var value = null;

            var result = isNull(value);

            expect(result).to.be.true;
        });
        it("should return false if the value is not null", function () {
            var values = ["lorem ipsum", 100, true, {}, undefined];

            values.forEach((val) => {
                var result = isNull(val);

                expect(result).to.be.false;
            });
        });
    });
    describe('#isNullOrWhitespace(value)', function () {
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
    describe('#isUndefined(value)', function () {
        it("should return true if the value is undefined", function () {
            var value = undefined;

            var result = isUndefined(value);

            expect(result).to.be.true;
        });
        it("should return false if the value is not undefined", function () {
            var values = ["lorem ipsum", 100, true, {}, null];

            values.forEach((val) => {
                var result = isUndefined(val);

                expect(result).to.be.false;
            });
        });
    });
    describe('#isNullOrUndefined(value)', function () {
        it("should return true if the value is undefined or null", function () {
            var values = [undefined, null];

            values.forEach((val) => {
                var result = isNullOrUndefined(val);

                expect(result).to.be.true;
            });
        });
        it("should return false if the value is not undefined", function () {
            var values = ["lorem ipsum", 100, true, {}];

            values.forEach((val) => {
                var result = isNullOrUndefined(val);

                expect(result).to.be.false;
            });
        });
    });
});