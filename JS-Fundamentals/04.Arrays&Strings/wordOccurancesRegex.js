function wordOccurancesRegex(input){
	let str = input[0]
	let word = input[1]
	let regex = new RegExp(`\\b${word}\\b`, 'gi')
	let count = 0
	let match = regex.exec(str)
	while(match){
		count++
		match = regex.exec(str)
	}
	console.log(count)
}
wordOccurancesRegex(['There was one. Therefore I bought it. I wouldn’t buy it otherwise.',
'there'])