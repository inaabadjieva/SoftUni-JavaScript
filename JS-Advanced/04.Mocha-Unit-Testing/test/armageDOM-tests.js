let expect = require('chai').expect;
let jsdom = require('jsdom-global')();
$ = require('jquery');

function nuke(selector1, selector2) {
    if (selector1 === selector2) return;
    $(selector1).filter(selector2).remove();
}

describe('Test calc nuke()', () => {
	beforeEach(() => {
        document.body.innerHTML =
            `<div id="target">
                <div class="nested target">
                    <p>This is some text</p>
                </div>
                <div class="target">
                    <p>Empty div</p>
                </div>
                <div class="inside">
                    <span class="nested">Some more text</span>
                    <span class="target">Some <span>more</span> text</span>
                </div>
            </div>`
    });
	
	//invalid
    describe("invalid input", () => {
           it("Should has no change with only one selector", () => {
            let targetLast = $('#target').html();
            nuke('#target');
            expect($('#target').html()).to.equal(targetLast);
        });
        it("Should has no change with invalid selector", () => {
            let targetLast = $('#target').html();
            nuke([1,2], '.inside');
            expect($('#target').html()).to.equal(targetLast);
        });   
        it("Should has no change with same selectors", () => {
            let targetLast = $('body').html();
            nuke('.target', '.target');
            expect($('body').html()).to.equal(targetLast);
        });
        it("Should has no change with same selectors", () => {
            let targetLast = $('body').html();
            nuke(true, true);
            expect($('body').html()).to.equal(targetLast);
        });
    });
    //valid
    describe("Test valid functionality", () => {
        it("Should remove all elements that have '.nested .target' selectors only", () => {
            let initialTargetCount = $('.target').length;
            let initialNestedCount = $('.nested').length;
            let initialNestedTargetCount = $('.nested').filter('.target').length;
            
            nuke('.nested', '.target');
       
            expect($('.nested').filter('.target').length).to.equal(0);
            expect($('.target').length).to.equal(initialTargetCount - initialNestedTargetCount);
            expect($('.nested').length).to.equal(initialNestedCount - initialNestedTargetCount);
        });
    });
});		