function format(input) {
	let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<quiz>\n'
	for(let i=0; i<input.length; i+=2){
		let question = input[i]
		let answer = input[i + 1]
		xml+= `<question>\n${question}\n</question>\n<answer>\n${answer}\n</answer>\n`
	}
	xml += '</quiz>'
	console.log(xml)

}
format(["Who was the forty-second president of the U.S.A.?",
"William Jefferson Clinton"])