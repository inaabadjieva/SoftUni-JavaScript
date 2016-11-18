'use strict'
function oddOrEven (input) {
	let num = Number(input[0]);
	let rem = num % 2;
	if(rem == 0){
		console.log('even');
	} else if(rem == Math.round(rem)) {
		console.log('odd');
	} else {
		console.log('invalid');
	}
}
oddOrEven([2.5]);