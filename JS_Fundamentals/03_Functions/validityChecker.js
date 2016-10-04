function calc(input) {
	let x1 = Number(input[0])
	let y1 = Number(input[1])
	let x2 = Number(input[2])
	let y2 = Number(input[3])

	var distance1 = Math.sqrt((x1)*(x1) + (y1)*(y1))
	var distance2 = Math.sqrt((x2)*(x2) + (y2)*(y2))
	var distance3 = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2))
	
	if(isValid(distance1)) console.log(`{${x1}, ${y1}} to {0, 0} is valid`)
	else console.log(`{${x1}, ${y1}} to {0, 0} is invalid`)

	if(isValid(distance2)) console.log(`{${x2}, ${y2}} to {0, 0} is valid`)
	else console.log(`{${x2}, ${y2}} to {0, 0} is invalid`)

	if(isValid(distance3)) console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is valid`)
	else console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is invalid`)

	function isValid(num) {
		if(Number.isInteger(num)){
			return true
		} 
		return false
	}	
}
calc([3, 0, 1, 1.5])