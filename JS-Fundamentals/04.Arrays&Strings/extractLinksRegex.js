function extractLinksRegex(input){
	let regex =/www\.[A-Za-z0-9\-]+\.[a-z]+(?:\.[a-z]+)*/g
	let result = []
	for(let line of input){
		let match = line.match(regex)
		if(match != null){
			for(let count of match){
				result.push(count)
			}
		}
	}
	console.log(result.join('\n'))
}
extractLinksRegex(['Join WebStars now for free, at www.web-stars.com',
'You can also support our partners:',
'Internet - www.internet.com',
'WebSpiders - www.webspiders101.com',
'Sentinel - www.sentinel.-ko'])