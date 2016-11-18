let expect = require('chai').expect;
// let list = require('../2_addDeleteList').list;

function result () {
    let data = [];
    return {
        add: function(item) {
            data.push(item);
        },
        delete: function(index) {
            if (Number.isInteger(index) && index >= 0 && index < data.length) {
                return data.splice(index, 1)[0];
            } else {
                return undefined;
            }
        },
        toString: function() {
            return data.join(", ");
        }
    };
}


describe("Test for list variable", () => {
	let list;
	beforeEach(function(){
		list = result()
	})
    //init
    it('should be object, instance of list', () => {
        expect(list).to.be.an('object');
    });

    it('should have add, subtract, get functions', () => {
        expect(list.hasOwnProperty('add')).to.be.true;
        expect(list.hasOwnProperty('delete')).to.be.true;
        expect(list.hasOwnProperty('toString')).to.be.true;
    });

    it('should return empty string on list.toString()', () => {
       expect(list.toString()).to.equal('');
    });

    describe("add(item) function", () => {
       it("Should return 5 for add(5)", () => {
       	list.add(5)
           expect(list.toString()).to.equal('5');
       });
       it("Should return pesho for add('pesho')", () => {
       	list.add('pesho')
           expect(list.toString()).to.equal('pesho');
       });
          it("Should return 2, 0, -1, 20", () => {
       	list.add(2)
       	list.add(0)
       	list.add(-1)
       	list.add(20)
           expect(list.toString()).to.equal('2, 0, -1, 20');
       });
   });

    describe("delete(index) function", () => {
       it("Should return undefined if index not Integer", () => {
           expect(list.delete(3.14)).to.equal(undefined);
       });
       it("Should return undefined if index negative", () => {
           expect(list.delete(-1)).to.equal(undefined);
       });
       it("Should return undefined if index more than length", () => {
       	list.add('pesho')
       	list.add('stamat')
       	list.add('gosho')
           expect(list.delete(3)).to.equal(undefined);
       });
       it("Should return zero element if index = 0", () => {
       	list.add('pesho')
       	list.add('stamat')
       	list.add('gosho')
           expect(list.delete(0)).to.equal('pesho');
       });
      	it("Should return 0, -1, 20", () => {
       	list.add(2)
       	list.add(0)
       	list.add(-1)
       	list.add(20)
       	list.delete(0)
           expect(list.toString()).to.equal('0, -1, 20');
       });
   });
});
