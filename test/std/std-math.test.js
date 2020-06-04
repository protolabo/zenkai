var fs = require('fs');

const expect = require('chai').expect;
const { random } = require('@std/std-math.js');

describe('Math helpers', function () {
    describe('#random(min, max)', function () {
        it("should return a value between the min and max value", function () {
            var min = 1;
            var max = 10;
            var result = random(min, max);
            expect(result).to.be.within(min, max);
        });
        it("should return a value between 0 and the passed value if no max is provided", function () {
            var max = 10;
            var result = random(max);
            expect(result).to.be.within(0, max);
        });
        it("should throw an error if min is greater than max", function () {
            var min = 5;
            var max = 4;

            var result = function () { random(min, max); };

            expect(result).to.throw(Error);
        });
        it("should throw an error if min is not an integer number", function () {
            var args = [1.2, null, undefined, "", true, {}];

            args.forEach((arg) => {
                var result = function () { random(arg); };

                expect(result).to.throw(TypeError);
            });
        });
    });
});