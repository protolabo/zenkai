//require jsdom-global and run
var jsdom = require('jsdom-global');
var fs = require('fs');

const expect = require('chai').expect;
const { some, all, one, no } = require('@std/std-logic.js');

function isPositive(val) {
    return val > 0;
}

describe('Quantifier helpers', function () {
    describe('#some(values, fn, min = 1)', function () {
        it("should return true if some of the values are null", function () {
            var values = [5, 100, "40", null];
            var result = some(values, isPositive);
            expect(result).to.be.true;
        });
        it("should return true if at least 2 of the values are positive", function () {
            var values = [5, 100, "40", null];
            var result = some(values, isPositive, 2);
            expect(result).to.be.true;
        });
        it("should return false if all of the values are not null", function () {
            var values = ["hello", -100, {}, undefined];
            var result = some(values, isPositive);
            expect(result).to.be.false;
        });
    });

    describe('#all(values, fn)', function () {
        it("should return true if all of the values are positive", function () {
            var values = [5, 100, 46];
            var result = all(values, isPositive);
            expect(result).to.be.true;
        });
        it("should return false if some of the values are not positive", function () {
            var values = [5, 100, null];
            var result = all(values, isPositive);
            expect(result).to.be.false;
        });
    });

    describe('#one(values, fn)', function () {
        it("should return true if exactly one of the values is positive", function () {
            var values = [5, -5, null];
            var result = one(values, isPositive);
            expect(result).to.be.true;
        });
        it("should return false if not exactly one of the values is positive", function () {
            var values = ["hello", 9, true, 30];
            var result = one(values, isPositive);
            expect(result).to.be.false;
        });
    });

    describe('#no(values, fn)', function () {
        it("should return true if none of the values are positive", function () {
            var values = [0, false, null];
            var result = no(values, isPositive);
            expect(result).to.be.true;
        });
        it("should return false if at least one of the values is positive", function () {
            var values = ["hello", 8, true, null];
            var result = no(values, isPositive);
            expect(result).to.be.false;
        });
    });
});