function calculate(input){
	let a = Number(input[0])
	let b = Number(input[1])
	let op = input[2]
	let calc = function(a, b, op) {return op(a, b)}
	let add = function(a, b) {return a + b}
	let subtract = function(a, b) {return a - b}
	let multiply = function(a, b) {return a * b}
	let divide = function(a, b) {return a / b}

	switch(op) {
		case '+': return calc(a, b, add) 
			break
		case '-': return calc(a, b, subtract) 
			break
		case '*': return calc(a, b, multiply) 
			break
		case '/': return calc(a, b, divide) 
			break		
	}
}
console.log(calculate(['2', '4', '+']))