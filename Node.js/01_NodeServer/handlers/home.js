let fs = require('fs')
let query = require('querystring')

let data = []

module.exports = function(req, res){	
	if(req.method === 'GET'){
		res.writeHead(200);
		fs.createReadStream('./content/index.html', 'UTF-8').pipe(res)
	} else if(req.method === 'POST') {
		let body = []
		req.on('error', function(err) {
	    	console.error(err);
	  	}).on('data', function(chunk) {
			body.push(chunk) 
		}).on('end', function() {
			body = Buffer.concat(body).toString()			
			data.push(query.parse(body))
			if(data[data.length-1].name === '' || data[data.length-1].url === '') {
				res.writeHead(400, {'Content-Type': 'text/html'})
				res.write('Fill all the fields')
				res.write('<br>')
				res.write('<a href="/">Back</a>')
				res.end()
			} else {
				res.writeHead(200, {'Content-Type': 'text/html'})
				res.end(buildHtml(data))
			}
		})
	} else {
		return true
	}	
}

function buildHtml(data) {
		var body = '<ul>'
		data.forEach(function(entry) {
			body += `<li>${entry.name} - ${entry.url}</li>`
		});
		body += '</ul>'
		body+='<a href="/">Back</a>'
	  	var html = '<!DOCTYPE html>'
	       + '<html><head></head><body>' + body + '</body></html>'

	  	return html
	}