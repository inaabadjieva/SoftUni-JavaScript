function matchAllWords(input){
	let splitPattern = /[ ,();.`!@#$%^&*+~?{}:'<>]+/g
	let text = input[0].split(splitPattern)
	let result = []
	let regex = /[a-zA-Z0-9_]+/
	for(let word of text){
		let res = regex.test(word)
		if(res)
			result.push(word)
	}
	console.log(result.join('|'))
}
matchAllWords(['_(Underscores) are also word characters'])
matchAllWords(['A Regular Expression needs to have the global flag in order to match all occurrences in the text'])