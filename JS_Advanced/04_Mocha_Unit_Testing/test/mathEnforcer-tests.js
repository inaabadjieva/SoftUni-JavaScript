let expect = require('chai').expect
let mathEnforcer = module.require('../mathEnforcer').mathEnforcer

describe("Test for mathEnforcer variable", () => {
    describe("Test for addFive(num) function", () => {
        it("Should return undefined for ()", () => {
            expect(mathEnforcer.addFive()).to.be.undefined;
        });
        it("Should return undefined for ('5')", () => {
            expect(mathEnforcer.addFive('5')).to.be.undefined;
        });
        it("Should return 10 for (5)", () => {
            expect(mathEnforcer.addFive(5)).to.equal(10);
        });
        it("Should return 10.5 for (5.5)", () => {
            expect(mathEnforcer.addFive(5.5)).to.equal(10.5);
        });
        it("Should return -2 for (-7)", () => {
            expect(mathEnforcer.addFive(-7)).to.equal(-2);
        });
    });
    describe("Test for subtractTen(num) function", () => {
        it("Should return undefined for ()", () => {
            expect(mathEnforcer.subtractTen()).to.be.undefined;
        });
        it("Should return undefined for ('5')", () => {
            expect(mathEnforcer.subtractTen('5')).to.be.undefined;
        });
        it("Should return 5 for (15)", () => {
            expect(mathEnforcer.subtractTen(15)).to.equal(5);
        });
        it("Should return -5.5 for (5.5)", () => {
            expect(mathEnforcer.subtractTen(5.5)).to.equal(-4.5);
        });
        it("Should return -17 for (-7)", () => {
            expect(mathEnforcer.subtractTen(-7)).to.equal(-17);
        });
    });
    describe("Test for sum(num1, num2) function", () => {
        describe("Argument validation tests", () => {
            it("Should return undefined for ()", () => {
                expect(mathEnforcer.sum()).to.be.undefined;
            });
            it("Should return undefined for ('2', 2)", () => {
                expect(mathEnforcer.sum('2', 2)).to.be.undefined;
            });
            it("Should return undefined for (2, '2')", () => {
                expect(mathEnforcer.sum(2, '2')).to.be.undefined;
            });
            it("Should return undefined for (2)", () => {
                expect(mathEnforcer.sum(2)).to.be.undefined;
            });
            it("Should return 22 for (10, 12)", () => {
                expect(mathEnforcer.sum(10, 12)).to.equal(22);
            });
            it("Should return 22 for (10.4, 12.6)", () => {
                expect(mathEnforcer.sum(10.4, 12.6)).to.equal(23);
            });
            it("Should return 2 for (-10, 12)", () => {
                expect(mathEnforcer.sum(-10, 12)).to.equal(2);
            });
        });
    });
});