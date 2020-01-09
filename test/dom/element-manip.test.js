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
                readonly: false,
                title: 'some title'
            };

            var div = document.createElement("div");
            addAttributes(div, attribute);

            for (const key in attribute) {
                expect(div).to.have.property(ATTRIBUTE_MAPPER[key], attribute[key]);
            }
        });
    });
});