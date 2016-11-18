function table(input){
	let html = '<table>\n'

	for(let line of input){
		html+=' <tr>\n'
		let arr = JSON.parse(line)
		for(let key of Object.keys(arr)){
			let param = htmlEscape(arr[key].toString())
			html+=`  <td>${param}</td>\n`
		}
		html += ' <tr>\n'
		}
	html += '</table>'
	console.log(html)

	function htmlEscape(text) {
	    let map = { '"': '&quot;', '&': '&amp;',"'": '&#39;', '<': '&lt;', '>': '&gt;' }
	    return text.replace(/[\"&'<>]/g, ch => map[ch])
  	}
}
table(['{"name":"Pesho","position":"Promenliva","salary":100000}',
	'{"name":"Teo","position":"Lecturer","salary":1000}',
	'{"name":"Georgi","position":"Lecturer","salary":1000}'])