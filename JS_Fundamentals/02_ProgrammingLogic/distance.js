'use strict'
function time (input){
	let v1 = Number(input[0])*1000/3600
	let v2 = Number(input[1])*1000/3600
	let seconds = Number(input[2])
	let d1 = v1*seconds
	let d2 = v2*seconds
	let result = Math.abs(d1- d2)
	console.log(result)
}
time([11, 10, 120])
