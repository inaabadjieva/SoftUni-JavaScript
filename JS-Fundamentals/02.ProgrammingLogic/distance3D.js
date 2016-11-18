'use strict'
function distance3D (input){
	let x1 = Number(input[0])
	let y1 = Number(input[1])
	let z1 = Number(input[2])
	let x2 = Number(input[3])
	let y2 = Number(input[4])
	let z2 = Number(input[5])
	
	let result = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2) + (z1-z2)*(z1-z2))
	console.log(Math.abs(result))
}
time([3.5, 0, 1, 0, 2, -1])