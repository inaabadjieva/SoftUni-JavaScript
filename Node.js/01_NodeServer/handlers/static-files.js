let fs = require('fs')
let url = require('url')

function getContentType(url) {
	let contentType = 'text/plain'
	if(url.endsWith('.css')) {
		contentType = 'text/css'
	} else if(url.endsWith('.js')) {
		contentType = 'application/javascript'
	}
	return contentType
}
module.exports = function(req, res) {
	req.pathname = req.pathname || url.parse(req.url).pathname
	if(req.pathname.substring(0, 8) === "/content" && 
		(req.pathname.endsWith('.html') ||
		req.pathname.endsWith('.css') ||
		req.pathname.endsWith('.js') ||
		req.pathname.endsWith('.jpg'))) {
			fs.readFile('.' + req.pathname, function(err, data) {
				if(err) {
					res.writeHead(404)
					res.write('404 Not found')
					res.end()
					return true
				}		
				let contentType = getContentType(req.pathname)
				res.writeHead(200, {'Content-Type': contentType})
				res.write(data)
				res.end()
			})	
	} else {
		res.writeHead(404)
		res.write('404 Not found')
		res.end()
	}
} 
