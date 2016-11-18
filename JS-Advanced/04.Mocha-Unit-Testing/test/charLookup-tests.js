let expect = require('chai').expect
let lookupChar = module.require('../charLookup').lookupChar

describe("lookupChar(string, index)", function() {
	it("should return undefined for (12, 5)", function() {
    	expect(lookupChar(12, 5)).to.be.undefined;
  	});
	it("should return undefined for ('pesho', 'pesho')", function() {
    	expect(lookupChar('pesho', 'pesho')).to.be.undefined;
  	});
	it("should return undefined for ('pesho', 3.14)", function() {
    	expect(lookupChar('pesho', 3.14)).to.be.undefined;
  	});
	it("should return Incorrect index for invalid data", function() {
    	expect(lookupChar('pesho', 5)).to.be.equal('Incorrect index');
  	});
	it("should return Incorrect index for invalid data", function() {
    	expect(lookupChar('pesho', -1)).to.be.equal('Incorrect index');
  	});
  	it("should return e for pesho, 1", function() {
    	expect(lookupChar('pesho', 1)).to.be.equal('e');
  	});
  	it("should return h for hi, 0", function() {
    	expect(lookupChar('hi', 0)).to.be.equal('h');
  	});
  	it("should return ' ' for 'hi pesho', 2", function() {
    	expect(lookupChar('hi pesho', 2)).to.be.equal(' ');
  	});
});