// require jsdom-global
var jsdom = require('jsdom-global');
var fs = require('fs');

// require chai for BDD
var expect = require('chai').expect;

const ATTRIBUTE_MAPPER = {
    accesskey: 'accessKey',
    autocapitalize: 'autocapitalize',
    class: 'className',
    draggable: 'draggable',
    editable: 'contentEditable',
    hidden: 'hidden',
    id: 'id',
    inputmode: 'inputMode',
    lang: 'lang',
    html: 'innerHTML',
    tabindex: 'tabIndex',
    text: 'textContent',
    title: 'title',
};

// import the library under test
const { addAttributes } = require('@dom/element-manip.js');

describe('Element manipulation helpers', function () {
    before('initialize DOM', function () {
        const html = fs.readFileSync(`${__dirname}/template.html`, 'utf8');
        this.jsdom = jsdom(html);
    });

    after(function () {
        this.jsdom();
    });

    describe('#addAttributes()', function () {
        it("should add attributes to an element", function () {
            var attribute = {
                class: 'aclass',
                draggable: false,
                editable: false,
                id: 'anid',
                text: 'lorem ipsum',
                title: 'some title',
            };

            var div = document.createElement("div");
            addAttributes(div, attribute);

            for (const key in attribute) {
                expect(div).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
    });
});