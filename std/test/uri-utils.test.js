//require jsdom-global and run
var jsdom = require('jsdom-global');
var fs = require('fs');

const expect = require('chai').expect;
const { getRootUrl, getUrlParams, queryBuilder } = require('@utils/uri-utils.js');

describe('URI helpers', function () {
    describe('#getUrlParams()', function () {
        it("should return null if there is a no query parameters in the url", function () {
            this.jsdom = jsdom(``, {
                url: "https://superwebsite.com",
                referrer: "https://example.com/",
                contentType: "text/html",
                includeNodeLocations: true,
                storageQuota: 10000000
            });
            var result = getUrlParams();
            expect(result).to.be.null;
        });
        it("should return the parameters and their value", function () {
            this.jsdom = jsdom(``, {
                url: "https://johnyboy.com?name=john&age=19",
                referrer: "https://example.com/",
                contentType: "text/html",
                includeNodeLocations: true,
                storageQuota: 10000000
            });
            var result = getUrlParams();
            expect(result).to.be.deep.equal({
                name: 'john',
                age: '19'
            });

            var _URLSearchParams = window.URLSearchParams;
            window.URLSearchParams = null;
            result = getUrlParams();
            expect(result).to.be.deep.equal({
                name: 'john',
                age: '19'
            });
            window.URLSearchParams = _URLSearchParams;
        });
        it("should return the searched parameter value", function () {
            this.jsdom = jsdom(``, {
                url: "https://johnyboy.com?name=john&age=19",
                referrer: "https://example.com/",
                contentType: "text/html",
                includeNodeLocations: true,
                storageQuota: 10000000
            });
            var result = getUrlParams('name');
            expect(result).to.be.equal('john');

            
            var _URLSearchParams = window.URLSearchParams;
            window.URLSearchParams = null;
            result = getUrlParams('name');
            expect(result).to.be.equal('john');
            window.URLSearchParams = _URLSearchParams;
        });

        // it("should return false if the value is not a string", function () {
        //     var values = [5, true, {}, []];
        //     values.forEach((val) => {
        //         var result = isNullOrWhitespace(val);
        //         expect(result).to.be.false;
        //     });
        // });
    });
    describe('#getRootUrl()', function () {
        it("should return the root of the url", function () {
            var url = "https://stackoverflow.com/questions/32422867/when-do-i-need-to-use-hasownproperty";
            var result = getRootUrl(url);
            expect(result).to.be.equal("https://stackoverflow.com");
        });
    });
    describe('#queryBuilder()', function () {
        it("should return a string with the first character turn to uppercase", function () {
            var query = {
                id: 23,
                name: 'john',
                middleName: ''
            };
            var result = queryBuilder(query);
            expect(result).to.be.equal("id=23&name=john&middleName=");
        });
        it("should return the same string if it's null or a sequence of whitespace", function () {
            var query = {
                id: 23,
                middleName: '',
                name: 'john',
                friends: null
            };
            var result = queryBuilder(query, true);
            expect(result).to.be.equal("id=23&name=john");
        });
    });
});