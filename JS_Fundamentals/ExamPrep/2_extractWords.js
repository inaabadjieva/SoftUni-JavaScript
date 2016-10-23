function extract(input){
	let first = input[0].toLowerCase()
	let second = input[1]
	let pattern = /\b([a-zA-Z]+)\b/gi
	let words = first.match(pattern)
	let sorted = words.sort()

	let count = 1
	let repeated = []
	for(let i=0; i<sorted.length-1; i++){
		if(sorted[i] === sorted[i+1]){
			count++
			if(count == 3){
				repeated.push(sorted[i])
			}
		} else {
			count = 1
		}
	}
	if(repeated.length == 0){
		console.log('No words');
	} else{
		let printed  = 0
		let delimitersPattern = /[.!?]/g
		let delimiters = second.match(delimitersPattern)
		let sentences = second.split(delimitersPattern)
		let sentenceNum = 0
		for(let sentence of sentences){
			sentence = sentence.trim()
			let words = sentence.toLowerCase().match(pattern)
			count = 0
			if(words != null){
				for(let w of words){
					for(let word of repeated){
						if(w == word){
							count++
						} 
					}
				}	
			}
			
			if(count >= 2){
				printed ++
				console.log(sentence + delimiters[sentenceNum]);
			}
			sentenceNum++
		}
		if(printed == 0){
			console.log('No sentences');
		}
	}	
}
extract(['The words: the and are, are repeated more than three thimes. Look in the second text are there sentences with those words',
'Yup there are no such sentences.'])