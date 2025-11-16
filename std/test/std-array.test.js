var expect = require('chai').expect;

// import our library
const { insert, last, first } = require('@std/std-array.js');

describe('Array helpers', function () {
    describe('#insert()', function () {
        it("should  return an array containing one more element", function () {
            var arr = [1, 2];
            var oldLength = arr.length;

            var result = insert(arr, 0, 5);

            expect(result).to.be.equal(oldLength + 1);
        });
        it("should return an array containing an element at the indicated position", function () {
            var arr = [1, 2];

            insert(arr, 1, 5);

            expect(arr.indexOf(5)).to.be.equal(1);
        });
        it("should throw an error if it doesn't receive an array", function () {
            var args = [[''], [[1, 2], "bad"], [[5], 2.34]];

            args.forEach((arg) => {
                var result = function () { insert(...arg); };

                expect(result).to.throw(TypeError);
            });
        });
    });
    describe('#last()', function () {
        it("should return the element at the end of the array", function () {
            var arr = [1];
            const lastValue = 2;
            arr.push(lastValue);

            var result = last(arr);

            expect(result).to.be.equal(lastValue);
        });
        it("should return undefined if the array is empty", function () {
            var arr = [];

            var result = last(arr);

            expect(result).to.be.undefined;
        });
        it("should throw an error if it doesn't receive an array", function () {
            var arr = '';

            var result = function () { last(arr); };

            expect(result).to.throw(TypeError);
        });
    });
    describe('#first()', function () {
        it("should return the element at the start of the array", function () {
            var arr = [1, 2];

            var result = first(arr);

            expect(result).to.be.equal(arr[0]);
        });
        it("should return undefined if the array is empty", function () {
            var arr = [];

            var result = first(arr);

            expect(result).to.be.undefined;
        });
        it("should throw an error if it doesn't receive an array", function () {
            var arr = '';

            var result = function () { first(arr); };

            expect(result).to.throw(TypeError);
        });
    });
});