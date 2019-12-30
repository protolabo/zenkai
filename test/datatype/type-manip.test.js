var expect = require('chai').expect;

const { 
    valOrDefault, boolToInt, toBoolean, isEmpty, isInt, isDate, isString, 
    isFunction, isObject, isNull, isUndefined, isNullOrUndefined 
} = require('@datatype/type-manip.js');

describe('Data type general helpers', function () {
    describe('#valOrDefault()', function () {
        it("should return the nullable value if it's not undefined", function () {
            var values = ["hello", 100, true, {}, null];
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
            var values = ["hello", 100, true];
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
    describe('#boolToInt()', function () {
        it("should return 1 if the value is true", function () {
            var value = true;
            var result = boolToInt(value);
            expect(result).to.be.equal(1);
        });
        it("should return 0 if the value is false", function () {
            var value = false;
            var result = boolToInt(value);
            expect(result).to.be.equal(0);
        });
    });
    describe('#toBoolean()', function () {
        it("should return true if the value is true or the string 'true'", function () {
            var values = [true, "true", "TRUE"];
            values.forEach((val) => {
                var result = toBoolean(val);
                expect(result).to.be.true;
            });
        });
        it("should return false if the value is not true or the string 'true'", function () {
            var values = [1, false, {}, " ", null, undefined];
            values.forEach((val) => {
                var result = toBoolean(val);
                expect(result).to.be.false;
            });
        });
    });
    describe('#isInt()', function () {
        it("should return true if the value is an integer", function () {
            var value = 10;
            var result = isInt(value);
            expect(result).to.be.true;

            var isInteger = Number.isInteger;
            Number.isInteger = null;
            result = isInt(value);
            expect(result).to.be.true;
            Number.isInteger = isInteger;
        });
        it("should return false if the value is not an integer", function () {
            var values = [10.1, "", true, {}, null, undefined];
            values.forEach((val) => {
                var result = isInt(val);
                expect(result).to.be.false;
            });

            var isInteger = Number.isInteger;
            Number.isInteger = null;
            values.forEach((val) => {
                var result = isInt(val);
                expect(result).to.be.false;
            });
            Number.isInteger = isInteger;
        });
    });
    describe('#isEmpty()', function () {
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
    describe('#isDate()', function () {
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
    describe('#isString()', function () {
        it("should return true if the value is a string", function () {
            var value = "hello";
            var result = isString(value);
            expect(result).to.be.true;
        });
        it("should return false if the value is not a string", function () {
            var values = [100, true, {}, null, undefined];
            values.forEach((val) => {
                var result = isString(val);
                expect(result).to.be.false;
            });
        });
    });
    describe('#isFunction()', function () {
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
    describe('#isObject()', function () {
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
    describe('#isNull()', function () {
        it("should return true if the value is null", function () {
            var value = null;
            var result = isNull(value);
            expect(result).to.be.true;
        });
        it("should return false if the value is not null", function () {
            var values = ["hello", 100, true, {}, undefined];
            values.forEach((val) => {
                var result = isNull(val);
                expect(result).to.be.false;
            });
        });
    });
    describe('#isUndefined()', function () {
        it("should return true if the value is undefined", function () {
            var value = undefined;
            var result = isUndefined(value);
            expect(result).to.be.true;
        });
        it("should return false if the value is not undefined", function () {
            var values = ["hello", 100, true, {}, null];
            values.forEach((val) => {
                var result = isUndefined(val);
                expect(result).to.be.false;
            });
        });
    });
    describe('#isNullOrUndefined()', function () {
        it("should return true if the value is undefined or null", function () {
            var values = [undefined, null];
            values.forEach((val) => {
                var result = isNullOrUndefined(val);
                expect(result).to.be.true;
            });
        });
        it("should return false if the value is not undefined", function () {
            var values = ["hello", 100, true, {}];
            values.forEach((val) => {
                var result = isNullOrUndefined(val);
                expect(result).to.be.false;
            });
        });
    });
});