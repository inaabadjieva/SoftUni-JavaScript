function expressionSplit(str){
	let regex = /[\s. ();,]+/g
	let result = str[0].split(regex)
	console.log(result.join('\n'))
}
expressionSplit('let sum = 4 * 4,b = "wow";')