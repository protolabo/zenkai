//require jsdom-global and run
require('jsdom-global')()

// import our library
var jsLabo = require('./../src/index.js');

var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();

it('should return true if valid user id', function () {
    var isValid = 1 == 1;
    // assert.equal(isValid, true);
    expect(isValid).to.be.true;
});

it('should return false if invalid user id', function () {
    var isValid = 1 == 'one';
    // assert.equal(isValid, false);
    isValid.should.equal(false);
});