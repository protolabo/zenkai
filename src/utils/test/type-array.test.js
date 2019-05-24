//require jsdom-global and run
require('jsdom-global')();

// import our library
//var jsLabo = require('./../src/index.js');

var expect = require('chai').expect;
var should = require('chai').should;
var insert = require('@utils/datatype/type-array.js').insert;
var last = require('@utils/datatype/type-array.js').last;

describe('Array helpers', function () {
    describe('#insert()', function () {
        it('should have one more item after the value is inserted', function () {
            var arr = [1, 2];
            var arrLength = arr.length;
            insert(arr, 0, 5);
            expect(arr.length).to.be.equal(arrLength + 1);
        });
        it('should have an item at the indicated position', function () {
            var arr = [1, 2];
            insert(arr, 1, 5);
            expect(arr.indexOf(5)).to.be.equal(1);
        });
    });
    describe('#last()', function () {
        it('should return -1 when the value is not present', function () {
            var arr = [1, 2];
            var val = last(arr);
            expect(val).to.be.equal(2);
        });
    });
});