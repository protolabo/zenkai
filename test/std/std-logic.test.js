var fs = require('fs');

const expect = require('chai').expect;
const { some, all, one, no, lone, assert } = require('@std/std-logic.js');

function isPositive(val) {
    return val > 0;
}

describe('Quantifier helpers', function () {
    describe('#assert(values, pred, min, max)', function () {
        it("should return true if at least 2 of the values are positive", function () {
            var values = [5, 100, 40, null];
            
            var result = assert(values, isPositive, 2);
            
            expect(result).to.be.true;
        });
        it("should return true if at most 2 of the values are positive", function () {
            var values = [5, 100, "string", null];
            
            var result = assert(values, isPositive, null, 2);
            
            expect(result).to.be.true;
        });
        it("should return true if at most 2 and at least 1 of the values are positive", function () {
            var values = [5, 100, "string", null];

            var result = assert(values, isPositive, 1, 2);
            
            expect(result).to.be.true;
        });
        it("should return false if none of the values are positive", function () {
            var values = ["hello", -100, {}, undefined];
            
            var result = assert(values, isPositive);
            
            expect(result).to.be.false;
        });
        it("should throw an error if the max value is lower than the min value", function () {
            var values = [5, 100, "string", null];

            var result = function () { assert(values, isPositive, 3, 2); };

            expect(result).to.throw(Error);
        });
        it("should throw an error if it doesn't receive an array", function () {
            var values = '';

            var result = function () { assert(values, isPositive); };

            expect(result).to.throw(TypeError);
        });
        it("should throw an error if it doesn't receive a predicate", function () {
            var values = [5, 100, "string", null];

            var result = function () { assert(values, null); };

            expect(result).to.throw(TypeError);
        });
    });

    describe('#some(values, pred)', function () {
        it("should return true if some of the values are null", function () {
            var values = [5, 100, "string", null];
            
            var result = some(values, isPositive);
            
            expect(result).to.be.true;
        });
        it("should return false if all of the values are not null", function () {
            var values = ["hello", -100, {}, undefined];
            
            var result = some(values, isPositive);
            
            expect(result).to.be.false;
        });
        it("should throw an error if it doesn't receive an array", function () {
            var values = '';

            var result = function () { some(values, isPositive); };

            expect(result).to.throw(TypeError);
        });
        it("should throw an error if it doesn't receive a predicate", function () {
            var values = [5, 100, "40", null];

            var result = function () { some(values, null); };

            expect(result).to.throw(TypeError);
        });
    });

    describe('#all(values, pred)', function () {
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
        it("should throw an error if it doesn't receive an array", function () {
            var values = '';

            var result = function () { all(values, isPositive); };

            expect(result).to.throw(TypeError);
        });
        it("should throw an error if it doesn't receive a predicate", function () {
            var values = [5, 100, "40", null];

            var result = function () { all(values, null); };

            expect(result).to.throw(TypeError);
        });
    });

    describe('#one(values, pred)', function () {
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
        it("should throw an error if it doesn't receive an array", function () {
            var values = '';

            var result = function () { one(values, isPositive); };

            expect(result).to.throw(TypeError);
        });
        it("should throw an error if it doesn't receive a predicate", function () {
            var values = [5, 100, "string", null];

            var result = function () { one(values, null); };

            expect(result).to.throw(TypeError);
        });
    });

    describe('#lone(values, pred)', function () {
        it("should return true if none of the values are positive", function () {
            var values = [-1, -5, null];
            
            var result = lone(values, isPositive);
            
            expect(result).to.be.true;
        });
        it("should return true if exactly one of the values is positive", function () {
            var values = [5, -5, null];
            
            var result = lone(values, isPositive);
            
            expect(result).to.be.true;
        });
        it("should return false if more than one of the values is positive", function () {
            var values = ["hello", 9, true, 30];
            
            var result = lone(values, isPositive);
            
            expect(result).to.be.false;
        });
        it("should throw an error if it doesn't receive an array", function () {
            var values = '';

            var result = function () { lone(values, isPositive); };

            expect(result).to.throw(TypeError);
        });
        it("should throw an error if it doesn't receive a predicate", function () {
            var values = [5, 100, "string", null];

            var result = function () { lone(values, null); };

            expect(result).to.throw(TypeError);
        });
    });

    describe('#no(values, pred)', function () {
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
        it("should throw an error if it doesn't receive an array", function () {
            var values = '';

            var result = function () { no(values, isPositive); };

            expect(result).to.throw(TypeError);
        });
        it("should throw an error if it doesn't receive a predicate", function () {
            var values = [5, 100, "string", null];

            var result = function () { no(values, null); };

            expect(result).to.throw(TypeError);
        });
    });
});