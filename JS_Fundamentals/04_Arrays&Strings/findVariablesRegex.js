function findVariablesRegex(input){
	let str = input[0]
	let regex = /\b_[A-Za-z0-9]+\b/g  
	let variables = str.match(regex)
	let result = []
	for(let item of variables){
		result.push(item.slice(1))
	}
	console.log(result.join(','))
}
findVariablesRegex(['__invalidVariable _evenMore_InvalidVariable_ _validVariable'])