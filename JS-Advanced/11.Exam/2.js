let expect = require('chai').expect;

function createList() {
  let data = [];
  return {
    add: function(item) {
      data.push(item)
    },
    shiftLeft: function() {
      if (data.length > 1) {
        let first = data.shift();
        data.push(first);
      }
    },
    shiftRight: function() {
      if (data.length > 1) {
        let last = data.pop();
        data.unshift(last);
      }
    },
    swap: function(index1, index2) {
      if (!Number.isInteger(index1) || index1 < 0 || index1 >= data.length ||
        !Number.isInteger(index2) || index2 < 0 || index2 >= data.length ||
        index1 === index2) {
        return false;
      }
      let temp = data[index1];
      data[index1] = data[index2];
      data[index2] = temp;
      return true;
    },
    toString: function() {
      return data.join(", ");
    }
  };
}


describe("Test for createList variable", () => {
  let list;
  beforeEach(function() {
      list = createList()
    })
    //init
  it('should be object, instance of list', () => {
    expect(list).to.be.an('object');
  });

  it('should have add, subtract, get functions', () => {
    expect(list.hasOwnProperty('add')).to.be.true;
    expect(list.hasOwnProperty('shiftLeft')).to.be.true;
    expect(list.hasOwnProperty('shiftRight')).to.be.true;
    expect(list.hasOwnProperty('toString')).to.be.true;
  });

  it('should return empty string on list.toString()', () => {
    expect(list.toString()).to.equal('');
  });
  //add
  describe('Testing add() function', function() {
    it('Should add element on empty list', () => {
      list.add(5);
      expect(list.toString()).to.equal('5');
    });

    it('Should add elements correctly', () => {
      list.add('5');
      list.add('hi');
      list.add(100);
      list.add(false);
      expect(list.toString()).to.equal('5, hi, 100, false');
    });
  });
  //shiftLeft
  describe('Testing shiftLeft() function', function() {
    it('Should do nothing on empty list', () => {
      list.shiftLeft();
      expect(list.toString()).to.equal('');
    });

    it('Should do nothing on 1 element list', () => {
      list.add(5);
      list.shiftLeft();
      expect(list.toString()).to.equal('5');
    });

    it('Should correctly shift all elements', () => {
      list.add(5);
      list.add(6);
      list.add(7);

      expect(list.toString()).to.equal('5, 6, 7');
      list.shiftLeft();
      expect(list.toString()).to.equal('6, 7, 5');
    });
  });

  //shiftRight
  describe('Testing shiftRight() function', function() {
    it('Should do nothing on empty list', () => {
      list.shiftRight();
      expect(list.toString()).to.equal('');
    });

    it('Should do nothing on 1 element list', () => {
      list.add(5.2);
      list.shiftRight();
      expect(list.toString()).to.equal('5.2');
    });

    it('Should correctly shift all elements', () => {
      list.add(5.1);
      list.add(6.1);
      list.add(7.1);

      expect(list.toString()).to.equal('5.1, 6.1, 7.1');
      list.shiftRight();
      expect(list.toString()).to.equal('7.1, 5.1, 6.1');
    });
  });

  //swap
  describe('Testing swap() function', function() {
    it('Should swap correctly 2 items and return true', () => {
      list.add(1);
      list.add(2);
      list.add(3);
      let result = list.swap(0, 2);
      expect(list.toString()).to.equal('3, 2, 1');
      expect(result).to.equal(true);
    });

    it('Should swap correctly 2 items and return true', () => {
        list.add(1);
        list.add(2);
        list.add(3);
        let result = list.swap(2, 0);
        expect(list.toString()).to.equal('3, 2, 1');
        expect(result).to.equal(true);
    });

    it('Should NOT swap on same indices', () => {
      list.add(1);
      list.add(2);
      list.add(3);
      let result = list.swap(1, 1);
      expect(list.toString()).to.equal('1, 2, 3');
      expect(result).to.equal(false);
    });

    it('Should NOT swap on negative index', () => {
      list.add(1);
      list.add(2);
      list.add(3);
      let result = list.swap(1, -1);
      expect(list.toString()).to.equal('1, 2, 3');
      expect(result).to.equal(false);
    });

    it('Should NOT swap on non-integer (float) index', () => {
      list.add(1);
      list.add(2);
      list.add(3);
      let result = list.swap(0, 2.1);
      expect(list.toString()).to.equal('1, 2, 3');
      expect(result).to.equal(false);
    });

    it('Should NOT swap on non-integer (other) index', () => {
      list.add(1);
      list.add(2);
      list.add(3);
      let result = list.swap({}, 0);
      expect(list.toString()).to.equal('1, 2, 3');
      expect(result).to.equal(false);
    });

    it('Should NOT swap on out-of-range (edge case: at the exact end) index', () => {
      list.add(1);
      list.add(2);
      list.add(3);
      let result = list.swap(0, 3);
      expect(list.toString()).to.equal('1, 2, 3');
      expect(result).to.equal(false);
    });

    it('Should NOT swap on out-of-range index', () => {
      list.add(1);
      list.add(2);
      list.add(3);
      let result = list.swap(1000, 3);
      expect(list.toString()).to.equal('1, 2, 3');
      expect(result).to.equal(false);
    });
  });
});
