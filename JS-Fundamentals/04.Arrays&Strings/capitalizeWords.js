function capitalizeWords(input){
	let words = input[0].split(' ')
	let result = ''
	let letter = ''
	for(let word of words){
		for(let i=0; i < word.length; i++){
			if(i === 0){
				letter = word[i].toUpperCase()
				result+=letter
			} else {
				letter = word[i].toLowerCase()
				result+=letter
			}
		}
		result+=' '
	}
	console.log(result)
}
capitalizeWords(['Was that Easy? tRY thIs onE for SiZe!'])