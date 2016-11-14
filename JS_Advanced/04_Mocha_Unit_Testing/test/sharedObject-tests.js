let expect = require('chai').expect;
let jsdom = require('jsdom-global')();
$ = require('jquery');
let sharedObject = require('../sharedObject').sharedObject;

document.body.innerHTML =
            `<div id="wrapper">
                <input type="text" id="name">
                <input type="text" id="income">
            </div>`;

describe('sharedObject', function () {
    //init state
	it('should be object', () => {
	    expect(sharedObject).to.an('object');
	});
	it('should return null on sharedObject.name', () => {
	    expect(sharedObject.name).to.equal(null);
	});
	it('should return null on sharedObject.income', () => {
	    expect(sharedObject.income).to.equal(null);
	});
 
    //changeName()
    describe('test cases for changeName(name) function', function () {
        it('should return null after changeName("")', () => {
            sharedObject.changeName('');
            expect(sharedObject.name).to.equal(null);
        });
        it('should return null changeName("")', () => {
            sharedObject.name = 'pesho';
            sharedObject.changeName('');
            expect(sharedObject.name).to.equal('pesho');
        });
        it('should return test changeName("test")', () => {
            sharedObject.changeName('test');
            expect(sharedObject.name).to.equal('test');
            expect($('#name').val()).to.equal('test');
        });
        it('should return anotherTest after changeName("anotherTest")', () => {
            sharedObject.changeName('anotherTest');
            expect(sharedObject.name).to.equal('anotherTest');
            expect($('#name').val()).to.equal('anotherTest');
        });
    });

    //changeInput()
    describe('test cases for changeIncome(income) function', function () {
        it('should return null after changeIncome("")', () => {
            sharedObject.changeIncome('');
            expect(sharedObject.income).to.equal(null);
        });
        it('should return null after changeIncome("")', () => {
            sharedObject.income = 88;
            sharedObject.changeIncome('');
            expect(sharedObject.income).to.equal(88);
        });
        it('should return null after changeIncome(-20)', () => {
        	sharedObject.income = 100
        	$('#income').val(100)
            sharedObject.changeIncome(-20);
            expect(sharedObject.income).to.equal(100);
            expect($('#income').val()).to.equal('100');
        });
        it('should return 130 after changeIncome(2.5)', () => {
        	sharedObject.income = 130
        	$('#income').val(130) 
            sharedObject.changeIncome(2.5);
            expect(sharedObject.income).to.equal(130);
            expect($('#income').val()).to.equal('130');
        });
         it('should return 20 after changeIncome(0)', () => {
        	sharedObject.income = 20
            sharedObject.changeIncome(0);
            expect(sharedObject.income).to.equal(20);
        });
        it('should return "1" on sharedObject.income after changeIncome("1")', () => {
            sharedObject.changeIncome(1);
            expect(sharedObject.income).to.equal(1);
            expect($('#income').val()).to.equal("1");
        });
        it('should return "50" on sharedObject.income after {1,-5,50}', () => {
            sharedObject.changeIncome(1);
            sharedObject.changeIncome(-5);
            sharedObject.changeIncome(50);
            expect(sharedObject.income).to.equal(50);
            expect($('#income').val()).to.equal("50");
        });
    });

    //updateName()
    describe('test cases for updateName(name) function', function () {
        it('should not change anything on updateName()', () => {
        	sharedObject.name = 'kiro'
        	$('#name').val('kiro')
            sharedObject.updateName('pesho');
            expect(sharedObject.name).to.equal('kiro');
            expect($('#name').val()).to.equal('kiro');
        });
        it('should not change anything on updateName()', () => {
            sharedObject.name = 'kiro';
            $('#name').val('')
            sharedObject.updateName('pesho');
            expect(sharedObject.name).to.equal('kiro');
            expect($('#name').val()).to.equal('');
        });
        it('should update sharedObject.name on updateName()', () => {
            let nameInput = $('#name');
            nameInput.val('pesho');
            sharedObject.updateName();
            expect(sharedObject.name).to.equal('pesho');
            expect(nameInput.val()).to.equal('pesho');
        });
        it('should update sharedObject.name on updateName()', () => {
            sharedObject.name = 'test';
            let nameInput = $('#name');
            nameInput.val('pesho');
            sharedObject.updateName();
            expect(sharedObject.name).to.equal('pesho');
            expect(nameInput.val()).to.equal('pesho');
        });
    });

    //updateIncome()
    describe('test cases for updateIncome() function', function () {
        it('should not change anything on updateIncome()', () => {
        	$('#income').val('')
            sharedObject.updateIncome();
            expect($('#income').val()).to.equal('');
        });
        it('should not change anything on updateIncome()', () => {
            let incomeInput = $('#income');
            incomeInput.val(2.5);
            sharedObject.income = 20
            sharedObject.updateIncome();
            expect(incomeInput.val()).to.equal('2.5');
            expect(sharedObject.income).to.equal(20);
        });
        it('should not change anything on updateIncome()', () => {
            let incomeInput = $('#income');
            incomeInput.val(-2);
            sharedObject.income = 20
            sharedObject.updateIncome();
            expect(incomeInput.val()).to.equal('-2');
            expect(sharedObject.income).to.equal(20);
        });
        it('should not change anything on updateIncome()', () => {
            let incomeInput = $('#income');
            incomeInput.val('test');
            sharedObject.income = 20
            sharedObject.updateIncome();
            expect(incomeInput.val()).to.equal('test');
            expect(sharedObject.income).to.equal(20);
        });
       	it('should not change anything with previously set obj.income', () => {
            sharedObject.income = 65;
            let incomeInput = $('#income');
            incomeInput.val('');
            sharedObject.updateIncome();
            expect(incomeInput.val()).to.equal('');
            expect(sharedObject.income).to.equal(65);
        });
        it('should change income on updateIncome() {50}', () => {
            let incomeInput = $('#income');
            incomeInput.val(50);
            sharedObject.updateIncome();
            expect(incomeInput.val()).to.equal('50');
            expect(sharedObject.income).to.equal(50);
        });
    });
});