function countWords(input){
	let count = {}
	let regex = /[^a-zA-Z0-9_]+/
	let words = input[0].split(regex).filter(w => w != '')
	for(let word of words){
		if(count[word] === undefined)
			count[word] = 1
		else
			count[word] +=1
	}
	console.log(JSON.stringify(count))
}
countWords(['Far too slow, you\'re far too slow.'])