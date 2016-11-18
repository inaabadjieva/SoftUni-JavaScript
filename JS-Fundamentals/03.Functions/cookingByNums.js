function calc(input){
	let num = Number(input[0])
	for(let i=1; i<input.length; i++){
		getOperation(input[i])
		console.log(num)
	}
	function getOperation(input) {
		if(input == 'chop') num /= 2
		if(input == 'dice') num = Math.sqrt(num)
		if(input == 'spice') num += 1
		if(input == 'bake') num *= 3
		if(input == 'fillet') num -= 20*num/100
	}
}
calc([9, 'dice', 'spice', 'chop', 'bake', 'fillet'])