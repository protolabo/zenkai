//require jsdom-global and run
require('jsdom-global')();

// import our library
//var jsLabo = require('./../src/index.js');

var expect = require('chai').expect;
var insert = require('@datatype/type-array.js').insert;
var last = require('@datatype/type-array.js').last;

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
    });
    describe('#last()', function () {
        it("should return the element at the end of the array", function () {
            var arr = [1, 2];
            var result = last(arr);
            expect(result).to.be.equal(2);
        });
        it("should return undefined if the array is empty", function () {
            var arr = [];
            var result = last(arr);
            expect(result).to.be.undefined;
        });
        it("should return undefined if it doesn't receive an array", function () {
            var arr = '';
            var result = last(arr);
            expect(result).to.be.undefined;
        });
    });
});