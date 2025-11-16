//require jsdom-global and run
require('jsdom-global')();

const expect = require('chai').expect;
const { hasOwn, isDerivedOf, cloneObject } = require('@std/std-object.js');

describe('Object helpers', function () {
    describe('#hasOwn(obj, key)', function () {
        it("should return true if the object has the searched property", function () {
            var obj = {
                fname: "Bob",
                lname: "White",
                email: "bob.white@email.com"
            };
            ['fname', 'lname', 'email'].forEach((val) => {
                var result = hasOwn(obj, val);
                expect(result).to.be.true;
            });
        });
        it("should return false if the object doesn't have the searched property", function () {
            var obj = {
                fname: "Bob",
                lname: "White",
                email: "bob.white@email.com"
            };
            ['age', null, 2930].forEach((val) => {
                var result = hasOwn(obj, val);
                expect(result).to.be.false;
            });
        });
    });
    describe('#isDerivedOf(child, parent)', function () {
        it("should return true if the object is directly derived from the other", function () {
            var Animal = {
                create(args) {
                    var instance = Object.create(this);

                    Object.assign(instance, args);

                    return instance;
                }
            };

            var Dog = Animal.create({
                bark() { }
            });

            var champion = Dog.create();

            var result = isDerivedOf(champion, Animal);

            expect(result).to.be.true;
        });
        it("should return false if the object is not directly derived from the other", function () {
            var Animal = {
                create(args) {
                    var instance = Object.create(this);
                    Object.assign(instance, args);
                    return instance;
                }
            };

            var Dog = Animal.create({
                bark() { }
            });

            var result = isDerivedOf(Dog, Animal);

            expect(result).to.be.false;
        });
    });
    describe('#cloneObject(obj)', function () {
        it("should return a clone of the object", function () {
            var obj = {
                fname: "Bob",
                lname: "White",
                phones: ["555-222-3322", "999-000-2288"],
                addresses: [
                    {
                        stname: "bourassas",
                        city: "montreal"
                    },
                    {
                        stname: "acadie",
                        city: "montreal"
                    }
                ]
            };

            var result = cloneObject(obj);
            
            expect(result).to.be.deep.equal(obj);
        });
    });
});