function JSONtoHTMLtable([input]){
	let arr = JSON.parse(input)
	let html = '<table>\n'
	html += '  <tr>'
	let keys = []
	for(let key of Object.keys(arr[0])){
		html += `<th>${htmlEscape(key)}</th>`
		keys.push(key)
	}
	html += '</tr>\n'

	for(let obj of arr){
		html+='  <tr>'
		for(let key of keys){
			let param = htmlEscape(obj[key].toString())
			html+=`<td>${param}</td>`
		}
		html += '</tr>\n'
		}
	html += '</table>'
	console.log(html)

	function htmlEscape(text) {
	    let map = { '"': '&quot;', '&': '&amp;',"'": '&#39;', '<': '&lt;', '>': '&gt;' }
	    return text.replace(/[\"&'<>]/g, ch => map[ch])
  	}
}
JSONtoHTMLtable(['[{"Name":"Tomatoes & Chips","Price":2.35},{"Name":"J&B Chocolate","Price":0.96}]'])