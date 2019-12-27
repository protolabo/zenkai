// require jsdom-global
var jsdom = require('jsdom-global');
var fs = require('fs');

// require chai for BDD
var expect = require('chai').expect;

const ATTRIBUTE_MAPPER = {
    accesskey: 'accessKey',
    class: 'className',
    // data: 'dataset',
    draggable: 'draggable',
    editable: 'contenteditable',
    hidden: 'hidden',
    id: 'id',
    lang: 'lang',
    placeholder: 'placeholder',
    readonly: 'readOnly',
    tabindex: 'tabIndex',
    title: 'title',
    value: 'value',
};

// import the library under test
const { appendChildren } = require('@dom/dom-append.js');

describe('DOM manipulation helpers', function () {
    before('initialize DOM', function () {
        const html = fs.readFileSync(`${__dirname}/template.html`, 'utf8');
        this.jsdom = jsdom(html);
    });

    after(function () {
        this.jsdom();
    });
    describe('#appendChildren()', function () {
        it("should return append the children to an element", function () {
            var div = document.createElement("div");
            var children = [document.createElement("span"), document.createElement("p"), document.createElement("div")];

            var result = appendChildren(div, children);

            expect(result.childElementCount).to.be.equal(children.length);
        });
    });
});