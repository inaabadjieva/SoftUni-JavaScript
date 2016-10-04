function extractText([str]){
	let result = []
	let start = str.indexOf('(')
	while(start > -1) {
		let end = str.indexOf(')', start)
		if(end == -1)
			break
		let found = str.substring(start + 1, end)
		result.push(found)
		start = str.indexOf('(', end)
	}
	console.log(result.join(', '))
}
extractText(['Rakiya (Bulgarian brandy) is self-made liquor (alcoholic drink)'])