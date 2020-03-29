var expect = require('chai').expect;

const { boolToInt, toBoolean } = require('@std/std-convert.js');

describe('Data type general helpers', function () {
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
});