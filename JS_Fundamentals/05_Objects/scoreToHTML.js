function scoreToHTML([input]){
	let html = '<table>\n'
	html += '  <tr><th>name</th><th>score</th></tr>\n'
	let arr = JSON.parse(input)

	for(let obj of arr){
		let name = htmlEscape(obj['name'])
		let score = obj['score']
		html+=`  <tr><td>${name}</td><td>${score}</td></tr>\n`
	}
	html += '</table>'
	console.log(html)
	function htmlEscape(text) {
	    let map = { '"': '&quot;', '&': '&amp;',
	      "'": '&#39;', '<': '&lt;', '>': '&gt;' };
	    return text.replace(/[\"&'<>]/g, ch => map[ch]);
  	}
}
scoreToHTML(['[{"name":"Pesho & Kiro","score":479},{"name":"Gosho, Maria & Viki","score":205}]'])