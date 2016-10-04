'use strict'
function interest (input){
	let p = Number(input[0])
	let i = Number(input[1])/100
	let n = 12/Number(input[2])
	let t = Number(input[3])

	let result = p * (Math.pow((1 + i/n), n*t))
	console.log(result.toFixed(2))
}
interest([100000, 5, 12, 25])