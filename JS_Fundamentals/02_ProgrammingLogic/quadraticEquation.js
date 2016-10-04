function equation(input){
	let a = Number(input[0])
	let b = Number(input[1])
	let c = Number(input[2])
	let d = b * b - 4 * a * c
	if(d > 0) {
		let x1 = (-b + Math.sqrt(d))/(2 * a)
		let x2 = (-b - Math.sqrt(d))/(2 * a)
		console.log(Math.min(x1,x2))
		console.log(Math.max(x1,x2))
	} else if(d == 0){
		let x = -b/(2*a)
		console.log(x)
	} else {
		console.log('No')
	}
}
equation([6,11,-35])