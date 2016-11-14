let expect = require('chai').expect
let isOddOrEven = module.require('../evenOrOdd').isOddOrEven

describe("isOddOrEven(string) ", function() {
	it("should return undefined for invalid data", function() {
    	expect(isOddOrEven({a:5})).to.be.undefined;
  	});
	it("should return undefined for invalid data", function() {
    	expect(isOddOrEven(13)).to.be.undefined;
  	});
  	it("should return odd for bag", function() {
    	expect(isOddOrEven('bag')).to.be.equal('odd');
  	});
  	it("should return even for hi", function() {
    	expect(isOddOrEven('hi')).to.be.equal('even');
  	});
  	it("should return even for empty", function() {
    	expect(isOddOrEven('')).to.be.equal('even');
  	});
});
