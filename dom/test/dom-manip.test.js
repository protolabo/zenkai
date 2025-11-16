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
const { addAttributes, changeSelectedValue } = require('@dom/dom-manip.js');

describe('Element manipulation helpers', function () {
    before('initialize DOM', function () {
        const html = fs.readFileSync(`${__dirname}/template.html`, 'utf8');
        this.jsdom = jsdom(html);
    });

    after(function () {
        this.jsdom();
    });

    describe('#addAttributes()', function () {
        it("should add multiple class", function () {
            var values = [
                { class: 'one two conflict' },
                { class: ['one', 'two'] },
            ];

            values.forEach(val => {
                var div = document.createElement("div");
                div.className = "conflict";

                addAttributes(div, val);

                for (const key in val) {
                    expect(div.classList.contains("one")).to.be.true;
                    expect(div.classList.contains("two")).to.be.true;
                    expect(div.classList.contains("conflict")).to.be.true;
                    expect(div.classList).to.have.property('length', 3);
                }
            });
        });

        it("should throw an error if the class value is not a string or array", function () {
            var values = [
                { class: 89 },
                { class: true },
                { class: {} }
            ];

            values.forEach(val => {
                var div = document.createElement("div");

                var result = function () { addAttributes(div, val); };

                expect(result).to.throw(TypeError);
            });
        });

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

        it("should not change the element is the attribute is not an object", function () {
            var values = [null, undefined, 89, "string", true, []];

            values.forEach(val => {
                var div = document.createElement("div");

                var result = addAttributes(div, val);

                expect(result).to.be.equal(div);
            });
        });

        it("should throw an error if the element is not valid", function () {
            var values = [null, undefined, [], 23, "", true];
            var attribute = {
                class: 'aclass',
                draggable: false,
                editable: false,
                id: 'anid',
                text: 'lorem ipsum',
                title: 'some title',
            };

            values.forEach(val => {
                var result = function () { addAttributes(val, attribute); };

                expect(result).to.throw(TypeError);
            });
        });

        it("should change the selected value if found in the options", function () {
            var element = document.createElement("select");
            var options = [
                { text: "first", value: "1" },
                { text: "second", value: "5", selected: true },
                { text: "third", value: "3", selected: false },
            ];
            options.map(val => {
                var option = document.createElement("option");
                option.text = val.text;
                option.value = val.value;
                option.selected = val.selected;

                return option;
            }).forEach(option => element.appendChild(option));

            var values = [options[0], options[0].value];

            values.forEach(value => {
                var result = changeSelectedValue(element, value);

                expect(element.value).to.be.equal(options[0].value);
                expect(element.selectedOptions.length).to.be.equal(1);
                expect(result).to.be.true; 
            });
        });

        it("should not change the selected value if not found in the options", function () {
            var element = document.createElement("select");
            var values = [
                { text: "first", value: "1" },
                { text: "second", value: "5", selected: true },
                { text: "third", value: "3", selected: false },
            ];
            values.map(val => {
                var option = document.createElement("option");
                option.text = val.text;
                option.value = val.value;
                option.selected = val.selected;

                return option;
            }).forEach(option => element.appendChild(option));

            var value = "100";

            var result = changeSelectedValue(element, value);

            expect(element.value).to.be.equal(values[1].value);
            expect(result).to.be.false;
        });

        it("should throw an error if the element is not valid", function () {
            var elements = [null, undefined, [], 23, "", true, document.createElement("div")];
            var value = "value";

            elements.forEach(el => {
                var result = function () { changeSelectedValue(el, value); };

                expect(result).to.throw(TypeError);
            });
        });

        it("should throw an error if the value is not valid", function () {
            var element = document.createElement("select");
            var values = [null, undefined, 23, true];

            values.forEach(val => {
                var result = function () { changeSelectedValue(element, val); };

                expect(result).to.throw(TypeError);
            });
        });
    });
});