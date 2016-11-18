'use strict'
function isLeapYear (input) {
	let year = Number(input[0]);
	if(year % 4 == 0 && year % 100 != 0 || year % 400 == 0){
		console.log('yes');
	} else {
		console.log('no');
	}
}
isLeapYear([2000]);
