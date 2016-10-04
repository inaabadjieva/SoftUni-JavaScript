'use strict'
function rounding (input){
	let num = Number(input[0])
	let precision = Number(input[1])
	if(precision>15) precision=15
	console.log(parseFloat(num.toFixed(precision)))
}
rounding([10.5, 3])