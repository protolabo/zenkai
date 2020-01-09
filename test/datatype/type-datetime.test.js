//require jsdom-global and run
require('jsdom-global')();

const expect = require('chai').expect;
const { compareTime, shortDate, shortDateTime, parseTime, timeAgo } = require('@datatype/type-datetime.js');

describe('Datetime helpers', function () {
    describe('#compareTime(t1, t2)', function () {
        it("should return 1 if the second time is greater than the first time", function () {
            var values = [
                { t1: "13:30", t2: "14:00" },
                { t1: "13:30", t2: "13:50" },
                { t1: "13:30:25", t2: "13:30:45" },
            ];
            values.forEach((val) => {
                var result = compareTime(val.t1, val.t2);

                expect(result).to.be.equal(-1);
            });
        });
        it("should return -1 if the second time is less than the first time", function () {
            var values = [
                { t1: "14:30", t2: "12:00" },
                { t1: "14:30", t2: "14:00" },
                { t1: "14:30:10", t2: "14:30:05" },
            ];
            values.forEach((val) => {
                var result = compareTime(val.t1, val.t2);

                expect(result).to.be.equal(1);
            });
        });
        it("should return 0 if the second time is equal to the first time", function () {
            var values = [
                { t1: "12:30", t2: "12:30" },
                { t1: "12:30:15", t2: "12:30:15" },
            ];
            values.forEach((val) => {
                var result = compareTime(val.t1, val.t2);

                expect(result).to.be.equal(0);
            });
        });
    });
    describe('#shortDate(d)', function () {
        it("should return 0 if the second time is equal to the first time", function () {
            var values = [
                { date: "2019-10-23", shortDate: "2019-10-23" },
                { date: "2005-03-18 18:34", shortDate: "2005-03-18" },
            ];
            values.forEach((val) => {
                var result = shortDate(val.date);

                expect(result).to.be.equal(val.shortDate);
            });
        });
    });
});