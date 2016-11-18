function countWordsMap(input){
	let words = input.join('\n')
												.toLowerCase()
												.split(/[^A-Za-z0-9_]+/)
												.filter(w => w != '')
	let count = new Map()
	for(let word of words){
		if(count.has(word))
			count.set(word, count.get(word) + 1)
		else
			count.set(word, 1)
	}
	let allWords = Array.from(count.keys()).sort()
  	allWords.forEach(w => console.log(`'${w}' -> ${count.get(w)} times`));
}
countWordsMap(['Far too slow, you\'re far too slow.'])