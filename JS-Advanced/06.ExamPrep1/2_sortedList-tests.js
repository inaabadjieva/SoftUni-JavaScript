let expect = require('chai').expect;
let SortedList = require('./sortedList').SortedList;

describe('SortedList', function () {
    let myList = {}
    beforeEach(function(){
        myList = new SortedList()
    })

    //init state
    it('should have a constructor and properties', () => {
        expect(typeof SortedList).to.equal('function');
        expect(SortedList.prototype.hasOwnProperty('add')).to.equal(true);
        expect(SortedList.prototype.hasOwnProperty('get')).to.equal(true);
        expect(SortedList.prototype.hasOwnProperty('remove')).to.equal(true);
        expect(SortedList.prototype.hasOwnProperty('size')).to.equal(true);
    });

    //Check add()
    it('should return length = 1 if add()', () => {
        myList.add(5)
        expect(myList.size).to.equal(1);
    });
     it('should return 5 at index 0', () => {
        myList.add(5)
        expect(myList.get(0)).to.equal(5);
    });

    //Check remove()
    it('should return length = 3 if remove()', () => {
        myList.add(5)
        myList.add(28.43)
        myList.add(-15)
        myList.remove(2)
        expect(myList.get(0)).to.equal(-15);
        expect(myList.get(1)).to.equal(5);
        expect(myList.size).to.equal(2);
    });

    //Check sorting
    it('should return sorted list', () => {
        myList.add(5)
        myList.add(276)
        myList.add(0)
        myList.add(-1)
        expect(myList.get(0)).to.equal(-1);
        expect(myList.get(1)).to.equal(0);
        expect(myList.get(2)).to.equal(5);
        expect(myList.get(3)).to.equal(276);
    });
     it('should return sorted list', () => {
        myList.add(5)
        myList.add(32)
        myList.remove(0)
        myList.add(31)
        expect(myList.get(0)).to.equal(31);
        expect(myList.get(1)).to.equal(32);
    });
     //Check errors
     it('should return error if negative index', () => {
        myList.add(5)
        myList.add(32)
        expect(() => myList.get(-1)).to.throw(Error);
        expect(() => myList.remove(-2)).to.throw(Error);
    });
     it('should return error if bigger index', () => {
        myList.add(5)
        myList.add(32)
        expect(() => myList.get(2)).to.throw(Error);
        expect(() => myList.remove(2)).to.throw(Error);
    });
     it('should return error if empty', () => {
        expect(() => myList.get(0)).to.throw(Error);
        expect(() => myList.remove(0)).to.throw(Error);
    });
    //Check size()
    it('should return 0 if empty', () => {
        expect(myList.size).to.equal(0);
    });
    it('should return 2 if has 2 elements', () => {
        myList.add(5)
        myList.add(10)
        expect(myList.size).to.equal(2);
    });

});
