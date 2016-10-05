function stringEnd(input){
	let str = input[0]
	let end = input[1]
	let result = str.endsWith(end)
	console.log(result)
}
stringEnd(['This sentence ends with fun?',
'fun?'])